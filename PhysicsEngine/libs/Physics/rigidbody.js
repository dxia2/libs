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

    gameobject;
    velocity = new Vector2(0, 0);
    collider;
    // controls if the rigidbody will be affected by other forces
    isDynamic;
    constructor(gameobject, collider, isDynamic){
        this.gameobject = gameobject;
        this.collider = collider;
        this.isDynamic = isDynamic;

        Rigidbody.allRigidbodies.push(this);
        this.collider.collisionFunctions.onCollisionEnterFunctions.push(this.onCollision);
    }

    update(){
        this.gameobject.transform.position.x += this.velocity.x * deltaTime;
        this.gameobject.transform.position.y += this.velocity.y * deltaTime;
    }

    onCollision(otherCollider){
        let otherRb = otherCollider.gameObject.getComponent(Rigidbody);
        if(otherRb === null){
            return;
        }
        console.log(otherRb);
        otherRb.velocity.x = this.velocity.x;
        otherRb.velocity.y = this.velocity.y;
    }
}