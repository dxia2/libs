class CollisionManager{
    static colliders = [];

    // Check all colliders against each other
    static checkAllCollisions(){
        for(let a = 0; a < CollisionManager.colliders.length; a++){
            for(let b = a + 1; b < CollisionManager.colliders.length; b++){
                CollisionManager.checkCollision(CollisionManager.colliders[a], CollisionManager.colliders[b]);
            }
        }
    }
    static checkCollision(collider1, collider2){

    }
}
class Edge{
    vertices;
    constructor(vertex1, vertex2){
        vertices = [vertex1, vertex2];
    }

    getPerpendicularAxis(){
        let axis = new Vector2(-(this.vertices[1].y - this.vertices[0].y),
        this.vertices[1].x - this.vertices[0].x
        );

        
    }
}
class BoxCollider{
    position;
    size;
    // The positions of the vertices relative to the position of the collider
    vertices;
    edges;

    constructor(position = new Vector2(0, 0), size = new Vector2(0, 0)){
        this.position = position;
        this.size = size;


        this.vertices = [new Vector2(this.size.x / 2, this.size.y / 2), // Top right vertex
            new Vector2(this.size.x / 2, -this.size.y / 2), // Bottom right vertex
            new Vector2(-this.size.x / 2, -this.size.y / 2), // Bottom left vertex
            new Vector2(-this.size.x / 2, this.size.y / 2) // Top left vertex
        ]

        this.edges = [new Edge(this.vertices[0], this.vertices[1]),
        new Edge(this.vertices[1], this.vertices[2]),
        new Edge(this.vertices[2], this.vertices[3]),
        new Edge(this.vertices[3], this.vertices[0])
        ]

        CollisionManager.colliders.push(this);
    }
}