class CollisionManager{
    static colliders = [];

    static updateColliders(){
        for(let i = 0; i < this.colliders.length; i++){
            CollisionManager.colliders[i].update();
        }
    }
    // Check all colliders against each other
    static checkAllCollisions(){
        for(let a = 0; a < CollisionManager.colliders.length; a++){
            for(let b = a + 1; b < CollisionManager.colliders.length; b++){
                // console.log("A")
                let collisionData = CollisionManager.checkCollision(CollisionManager.colliders[a], CollisionManager.colliders[b]);
                if(collisionData.colliding){
                    // Call the on collision functions and rigidbody of the 2 colliders if they touch
                    CollisionManager.colliders[a].collisionFunctions.onCollision(CollisionManager.colliders[b]);
                    CollisionManager.colliders[b].collisionFunctions.onCollision(CollisionManager.colliders[a]);
                    CollisionManager.colliders[a].checkRigidbody(CollisionManager.colliders[b], true, collisionData.smallestAxis, collisionData.contactVertex);
                    CollisionManager.colliders[b].checkRigidbody(CollisionManager.colliders[a], false, collisionData.smallestAxis, collisionData.contactVertex);
                }else{
                    CollisionManager.colliders[a].collisionFunctions.onNotCollision(CollisionManager.colliders[b]);
                    CollisionManager.colliders[b].collisionFunctions.onNotCollision(CollisionManager.colliders[a]);
                }
                
            }
        }
    }
    // Uses SAT
    static checkCollision(collider1, collider2){
        let minOverlap = null;
        let smallestAxis;
        let vertexObj;

        for(let i = 0; i < collider1.edges.length; i++){
            let axes1 = collider1.edges[i].getPerpendicularAxis();
            let proj1, proj2 = 0;

            proj1 = ExtendedMath.projShapeOntoAxis(axes1, collider1);
            proj2 = ExtendedMath.projShapeOntoAxis(axes1, collider2);
            let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);

            if(overlap < 0){
                return {
                    colliding: false,
                    smallestAxis: null,
                    contactVertex: null
                };
            }

            if((proj1.max > proj2.max && proj1.min < proj2.min) ||
            (proj1.max < proj2.max && proj1.min > proj2.min)){
                let mins = Math.abs(proj1.min - proj2.min);
                let maxs = Math.abs(proj1.max - proj2.max);
                if(mins < maxs){
                    overlap += mins;
                }else{
                    overlap += maxs;
                    axes1 = Vector2.multiply(axes1, -1);
                }
            }

            if(overlap < minOverlap || minOverlap === null){
                minOverlap = overlap;
                smallestAxis = axes1;
                vertexObj = collider2;
                if(proj1.max > proj2.max){
                    smallestAxis = Vector2.multiply(axes1, -1);
                }
            }
        }
        for(let i = 0; i < collider2.edges.length; i++){
            let axes2 = collider2.edges[i].getPerpendicularAxis();
            let proj1, proj2 = 0;

            proj1 = ExtendedMath.projShapeOntoAxis(axes2, collider1);
            proj2 = ExtendedMath.projShapeOntoAxis(axes2, collider2);
            let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
            if(overlap < 0){
                return {
                    colliding: false,
                    smallestAxis: null,
                    contactVertex: null
                };
            }

            if((proj1.max > proj2.max && proj1.min < proj2.min) ||
            (proj1.max < proj2.max && proj1.min > proj2.min)){
                let mins = Math.abs(proj1.min - proj2.min);
                let maxs = Math.abs(proj1.max - proj2.max);
                if(mins < maxs){
                    overlap += mins;
                }else{
                    overlap += maxs;
                    axes2 = Vector2.multiply(axes2, -1);
                }
            }

            if(overlap < minOverlap || minOverlap === null){
                minOverlap = overlap;
                smallestAxis = axes2;
                vertexObj = collider1;
                if(proj1.max < proj2.max){
                    smallestAxis = Vector2.multiply(axes2, -1);
                }
            }
        }

        let contactVertex = ExtendedMath.projShapeOntoAxis(smallestAxis, vertexObj).collVertex;
        return {
            colliding: true,
            smallestAxis: smallestAxis,
            contactVertex: contactVertex
        };
    }

    
}
class Edge{
    vertices;
    constructor(vertex1, vertex2){
        this.vertices = [vertex1, vertex2];
    }

    getPerpendicularAxis(){
        let axis = new Vector2(-(this.vertices[1].y - this.vertices[0].y),
        this.vertices[1].x - this.vertices[0].x
        );
        return axis.getNormalizedVector();
    }
}
class CollisionFunctions{
    onCollisionEnterFunctions = [];
    onCollisionStayFunctions = [];
    onCollisionExitFunctions = [];

    otherCollidersTouching = [];

    onCollision(otherCollider){
        for(let i = 0; i < this.otherCollidersTouching.length; i++){
            // call on collision stay if we are touching the same collider as before
            if(this.otherCollidersTouching[i] === otherCollider){

                for(let i = 0; i < this.onCollisionStayFunctions.length; i++){
                    this.onCollisionStayFunctions[i](otherCollider);
                }
            }
        }

        if(!this.otherCollidersTouching.includes(otherCollider)){
            for(let i = 0; i < this.onCollisionEnterFunctions.length; i++){
                this.onCollisionEnterFunctions[i](otherCollider);
            }
            this.otherCollidersTouching.push(otherCollider);
        }
    }

    onNotCollision(otherCollider){
        if(this.otherCollidersTouching.includes(otherCollider)){
            for(let i = 0; i < this.onCollisionExitFunctions.length; i++){
                this.onCollisionExitFunctions[i](otherCollider);
            }
            this.otherCollidersTouching.splice(this.otherCollidersTouching.indexOf(otherCollider), 1);
        }
    }
}
class BoxCollider{
    gameObject;
    gameObjectLastRotation;
    position;
    size;
    // The positions of the vertices relative to the position of the collider
    vertices;
    originalVerticesPos;
    edges;
    collisionFunctions;
    rigidbody;
    constructor(gameObject, position = new Vector2(0, 0), size = new Vector2(0, 0), rigidbody){
        this.gameObject = gameObject;
        this.position = position;
        this.size = size;
        this.rigidbody = rigidbody;

        this.vertices = [new Vector2(this.size.x / 2, this.size.y / 2), // Top right vertex
            new Vector2(this.size.x / 2, -this.size.y / 2), // Bottom right vertex
            new Vector2(-this.size.x / 2, -this.size.y / 2), // Bottom left vertex
            new Vector2(-this.size.x / 2, this.size.y / 2) // Top left vertex
        ];
        this.originalVerticesPos = [new Vector2(this.size.x / 2, this.size.y / 2), // Top right vertex
            new Vector2(this.size.x / 2, -this.size.y / 2), // Bottom right vertex
            new Vector2(-this.size.x / 2, -this.size.y / 2), // Bottom left vertex
            new Vector2(-this.size.x / 2, this.size.y / 2) // Top left vertex
        ];

        this.edges = [new Edge(this.vertices[0], this.vertices[1]),
        new Edge(this.vertices[1], this.vertices[2]),
        new Edge(this.vertices[2], this.vertices[3]),
        new Edge(this.vertices[3], this.vertices[0])
        ];

        this.collisionFunctions = new CollisionFunctions();

        CollisionManager.colliders.push(this);
    }
    update(){
        this.calculateNewVertexPositions();
        this.gameObjectLastRotation = this.gameObject.transform.rotation;
    }
    calculateNewVertexPositions(){
        // DOn't calculate if the rotation didnt change
        if(this.gameObject.transform.rotation === this.gameObjectLastRotation){
            return;
        }
        for(let i = 0; i < this.vertices.length; i++){
            this.vertices[i] = ExtendedMath.rotatePoint(Vector2.zero(), this.originalVerticesPos[i], this.gameObject.transform.rotation);
        }
        this.edges = [new Edge(this.vertices[0], this.vertices[1]),
        new Edge(this.vertices[1], this.vertices[2]),
        new Edge(this.vertices[2], this.vertices[3]),
        new Edge(this.vertices[3], this.vertices[0])
        ];
    }

    getVertexWorldPos(index){
        return new Vector2(this.vertices[index].x + this.position.x, this.vertices[index].y + this.position.y);
    }

    drawBox(){
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgb(0, 0, 255)";
        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x + this.position.x - (Camera.position.x - Camera.size.x / 2), -(this.vertices[0].y + this.position.y - Camera.position.y - Camera.size.y / 2));
        for(let i = 1; i < this.vertices.length; i++){
            ctx.lineTo(this.vertices[i].x + this.position.x - (Camera.position.x - Camera.size.x / 2), -(this.vertices[i].y + this.position.y - Camera.position.y - Camera.size.y / 2));
        }
        ctx.lineTo(this.vertices[0].x + this.position.x - (Camera.position.x - Camera.size.x / 2), -(this.vertices[0].y + this.position.y - Camera.position.y - Camera.size.y / 2));
        ctx.stroke();
    }

    checkRigidbody(otherCollider, transferForce, smallestAxis, contactVertex){
        if(this.rigidbody != undefined){
            this.rigidbody.onCollision(otherCollider, transferForce, smallestAxis, contactVertex);
        }
    }
}
