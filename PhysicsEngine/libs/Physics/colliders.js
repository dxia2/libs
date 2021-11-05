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
                // console.log("A");
                if(CollisionManager.checkCollision(CollisionManager.colliders[a], CollisionManager.colliders[b])){
                    CollisionManager.colliders[a].collisionFunctions.onCollision(CollisionManager.colliders[b]);
                    CollisionManager.colliders[b].collisionFunctions.onCollision(CollisionManager.colliders[a]);
                }else{
                    CollisionManager.colliders[a].collisionFunctions.onNotCollision(CollisionManager.colliders[b]);
                    CollisionManager.colliders[b].collisionFunctions.onNotCollision(CollisionManager.colliders[a]);
                }
                
            }
        }
    }
    static checkCollision(collider1, collider2){
        for(let i = 0; i < collider1.edges.length; i++){
            let axes1 = collider1.edges[i].getPerpendicularAxis();
            let proj1, proj2 = 0;

            proj1 = ExtendedMath.projShapeOntoAxis(axes1, collider1);
            proj2 = ExtendedMath.projShapeOntoAxis(axes1, collider2);
            let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);

            if(overlap < 0){
                return false;
            }
        }
        for(let i = 0; i < collider2.edges.length; i++){
            let axes2 = collider2.edges[i].getPerpendicularAxis();
            let proj1, proj2 = 0;

            proj1 = ExtendedMath.projShapeOntoAxis(axes2, collider1);
            proj2 = ExtendedMath.projShapeOntoAxis(axes2, collider2);
            let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
            if(overlap < 0){
                return false;
            }
        }
        

        return true;
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
    constructor(gameObject, position = new Vector2(0, 0), size = new Vector2(0, 0)){
        this.gameObject = gameObject;
        this.position = position;
        this.size = size;


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
}

// for(let a = 0; a < collider1.edges.length; a++){
        //     let collider1PerpAxis = collider1.edges[a].getPerpendicularAxis();
        //     let collider1Min = ExtendedMath.vector2DotProduct(collider1PerpAxis, collider1.vertices[0]);
        //     let collider1Max = collider1Min;

        //     let collider2Min = ExtendedMath.vector2DotProduct(collider1PerpAxis, collider2.vertices[0]);
        //     let collider2Max = collider2Min;

        //     for(let i = 0; i < collider1.vertices.length; i++){
        //         let dot = ExtendedMath.vector2DotProduct(collider1PerpAxis, collider1.vertices[i]);
        //         collider1Min = Math.min(collider1Min, dot);
        //         collider1Max = Math.max(collider1Max, dot);

        //         let vOffset = new Vector2(collider1.position.x - collider2.position.x, collider1.position.y - collider2.position.y);
        //         let sOffset = ExtendedMath.vector2DotProduct(collider1PerpAxis, vOffset);

        //         collider1Min += sOffset;
        //         collider1Max += sOffset;
        //     }

        //     for(let i = 0; i < collider2.vertices.length; i++){
        //         let dot = ExtendedMath.vector2DotProduct(collider1PerpAxis, collider1.vertices[i]);
        //         collider2Min = Math.min(collider2Min, dot);
        //         collider2Max = Math.max(collider2Max, dot);

        //         let vOffset = new Vector2(collider2.position.x - collider2.position.x, collider2.position.y - collider2.position.y);
        //         let sOffset = ExtendedMath.vector2DotProduct(collider1PerpAxis, vOffset);

        //         collider2Min += sOffset;
        //         collider2Max += sOffset;
        //     }
        //     if(collider1Min - collider2Max > 0 || collider2Min - collider1Max > 0){

        //         return false;
        //     }
        // }
        // // DO it for the second collider

        // for(let a = 0; a < collider2.edges.length; a++){
        //     let collider2PerpAxis = collider2.edges[a].getPerpendicularAxis();
        //     let collider1Min = ExtendedMath.vector2DotProduct(collider2PerpAxis, collider1.vertices[0]);
        //     let collider1Max = collider1Min;


        //     let collider2Min = ExtendedMath.vector2DotProduct(collider2PerpAxis, collider2.vertices[0]);
        //     let collider2Max = collider2Min;

        //     for(let i = 0; i < collider1.vertices.length; i++){
        //         let dot = ExtendedMath.vector2DotProduct(collider2PerpAxis, collider1.vertices[i]);
        //         collider1Min = Math.min(collider1Min, dot);
        //         collider1Max = Math.max(collider1Max, dot);

        //         let vOffset = new Vector2(collider1.position.x - collider2.position.x, collider1.position.y - collider2.position.y);
        //         let sOffset = ExtendedMath.vector2DotProduct(collider2PerpAxis, vOffset);

        //         collider1Min += sOffset;
        //         collider1Max += sOffset;
        //     }

        //     for(let i = 0; i < collider2.vertices.length; i++){
        //         let dot = ExtendedMath.vector2DotProduct(collider2PerpAxis, collider1.vertices[i]);
        //         collider2Min = Math.min(collider2Min, dot);
        //         collider2Max = Math.max(collider2Max, dot);

        //         let vOffset = new Vector2(collider2.position.x - collider2.position.x, collider2.position.y - collider2.position.y);
        //         let sOffset = ExtendedMath.vector2DotProduct(collider2PerpAxis, vOffset);

        //         collider2Min += sOffset;
        //         collider2Max += sOffset;
        //     }

        //     if(collider1Min - collider2Max > 0 || collider2Min - collider1Max > 0){
        //         return false;
        //     }
        // }
        // // console.log("PLS WRKO");
        // return true;