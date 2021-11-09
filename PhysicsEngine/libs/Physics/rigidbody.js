class PhysicsManager{
    static gravity = -9.81;
    static updatePhysics(){
        CollisionManager.updateColliders();
        CollisionManager.checkAllCollisions();
        Rigidbody.updateAllRigidbodies();
    }
}
class Rigidbody{

    static allRigidbodies = [];
    static updateAllRigidbodies(){
        for(let i = 0; i < Rigidbody.allRigidbodies.length; i++){
            Rigidbody.allRigidbodies[i].update();
        }
    }

    gameObject;
    velocity = new Vector2(0, 0);
    collider;
    // controls if the rigidbody will be affected by other forces
    isDynamic;
    

    constructor(gameObject, collider, isDynamic){
        this.gameObject = gameObject;
        this.collider = collider;
        this.isDynamic = isDynamic;

        Rigidbody.allRigidbodies.push(this);
    }

    update(){

        this.gameObject.transform.position.x += this.velocity.x * deltaTime;
        this.gameObject.transform.position.y += this.velocity.y * deltaTime;
    }

    onCollision(otherCollider, transferForce, smallestAxis, contactVertex){
        let otherRb = otherCollider.gameObject.getComponent(Rigidbody);
        // Do stuff if the other collider doesn't have a rigidbody
        if(otherRb === null){
            // let otherColliderRelativePosNormalized = new Vector2(otherCollider.gameObject.transform.position.x - this.gameObject.transform.position.x, otherCollider.gameObject.transform.position.y - this.gameObject.transform.position.y).getNormalizedVector();
            // // console.log(this.velocity.getMagnitude());
            // // console.log(this.gameObject.name);

            // otherColliderRelativePosNormalized.x *= this.velocity.getMagnitude();
            // otherColliderRelativePosNormalized.y *= this.velocity.getMagnitude();

            this.velocity.x += contactVertex.x;
            this.velocity.y += contactVertex.y;
            return;
        }
        if(transferForce){
            let x, y;
            x = otherRb.velocity.x;
            y = otherRb.velocity.y;
            otherRb.velocity.x = this.velocity.x;
            otherRb.velocity.y = this.velocity.y;
            this.velocity.x = x;
            this.velocity.y = y;

        }

    }
    getThis(){
        return this;
    }
}