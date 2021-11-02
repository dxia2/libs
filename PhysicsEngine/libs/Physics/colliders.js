class CollisionManager{
    static colliders = [];

    //put 
    // CollisionManager.updateColliders();
    // CollisionManager.checkAllCollisions();
    //at start of drawanimationframe
    static updateColliders(){
        for(let i = 0; i < this.colliders.length; i++){
            CollisionManager.colliders[i].update();
        }
    }
    // Check all colliders against each other
    static checkAllCollisions(){
        for(let a = 0; a < CollisionManager.colliders.length; a++){
            for(let b = a + 1; b < CollisionManager.colliders.length; b++){
                if(CollisionManager.checkCollision(CollisionManager.colliders[a], CollisionManager.colliders[b])){
                    CollisionManager.colliders[a].onCollision;
                    CollisionManager.colliders[b].onCollision;
                }
                
            }
        }
    }
    static checkCollision(collider1, collider2){

        for(let a = 0; a < collider1.edges.length; a++){
            let collider1PerpAxis = collider1.edges[a].getPerpendicularAxis();
            let collider1Min = ExtendedMath.vector2DotProduct(collider1PerpAxis, collider1.vertices[0]);
            let collider1Max = collider1Min;

            let collider2Min = ExtendedMath.vector2DotProduct(collider1PerpAxis, collider2.vertices[0]);
            let collider2Max = collider2Min;

            for(let i = 0; i < collider1.vertices.length; i++){
                let dot = collider1.vertices[i];
                collider1Min = Math.min(collider1Min, dot);
                collider1Max = Math.max(collider1Max, dot);

                let vOffset = new Vector2(collider1.position.x - collider2.position.x, collider1.position.y - collider2.position.y);
                let sOffset = ExtendedMath.vector2DotProduct(axis, vOffset);

                collider1Min += sOffset;
                collider1Max += sOffset;
            }

            for(let i = 0; i < collider2.vertices.length; i++){
                let dot = collider2.vertices[i];
                collider2Min = Math.min(collider2Min, dot);
                collider2Max = Math.max(collider2Max, dot);

                let vOffset = new Vector2(collider2.position.x - collider2.position.x, collider2.position.y - collider2.position.y);
                let sOffset = ExtendedMath.vector2DotProduct(axis, vOffset);

                collider2Min += sOffset;
                collider2Max += sOffset;
            }

            if(collider1Min - collider2Max > 0 || collider2Min - collider1Max > 0){
                return false;
            }
        }
        // DO it for the second collider

        for(let a = 0; a < collider2.edges.length; a++){
            let collider2PerpAxis = collider2.edges[a].getPerpendicularAxis();
            let collider1Min = ExtendedMath.vector2DotProduct(collider2PerpAxis, collider1.vertices[0]);
            let collider1Max = collider1Min;


            let collider2Min = ExtendedMath.vector2DotProduct(collider2PerpAxis, collider2.vertices[0]);
            let collider2Max = collider2Min;

            for(let i = 0; i < collider1.vertices.length; i++){
                let dot = collider1.vertices[i];
                collider1Min = Math.min(collider1Min, dot);
                collider1Max = Math.max(collider1Max, dot);

                let vOffset = new Vector2(collider1.position.x - collider2.position.x, collider1.position.y - collider2.position.y);
                let sOffset = ExtendedMath.vector2DotProduct(axis, vOffset);

                collider1Min += sOffset;
                collider1Max += sOffset;
            }

            for(let i = 0; i < collider2.vertices.length; i++){
                let dot = collider2.vertices[i];
                collider2Min = Math.min(collider2Min, dot);
                collider2Max = Math.max(collider2Max, dot);

                let vOffset = new Vector2(collider2.position.x - collider2.position.x, collider2.position.y - collider2.position.y);
                let sOffset = ExtendedMath.vector2DotProduct(axis, vOffset);

                collider2Min += sOffset;
                collider2Max += sOffset;
            }

            if(collider1Min - collider2Max > 0 || collider2Min - collider1Max > 0){
                return false;
            }
        }
        return false;
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
class BoxCollider{
    gameObject;
    position;
    size;
    // The positions of the vertices relative to the position of the collider
    vertices;
    originalVerticesPos;
    edges;
    onCollision;
    constructor(gameObject, position = new Vector2(0, 0), size = new Vector2(0, 0), onCollision){
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
        ]

        this.onCollision = onCollision;

        CollisionManager.colliders.push(this);
    }
    update(){
        this.calculateNewVertexPositions();
    }
    calculateNewVertexPositions(){
        for(let i = 0; i < this.vertices.length; i++){
            this.vertices[i] = ExtendedMath.rotatePoint(Vector2.zero(), this.originalVerticesPos[i], this.gameObject.transform.rotation);
        }
    }
}