// class CollisionManager{
//     static colliders = [];

//     static updateColliders(){
//         for(let i = 0; i < this.colliders.length; i++){
//             CollisionManager.colliders[i].update();
//         }
//     }
//     // Check all colliders against each other
//     static checkAllCollisions(){
//         for(let a = 0; a < CollisionManager.colliders.length; a++){
//             for(let b = a + 1; b < CollisionManager.colliders.length; b++){
//                 // console.log("A")
//                 let collisionData = CollisionManager.checkCollision(CollisionManager.colliders[a], CollisionManager.colliders[b]);
//                 if(collisionData.colliding){
//                     // Call the on collision functions and rigidbody of the 2 colliders if they touch
//                     CollisionManager.colliders[a].collisionFunctions.onCollision(CollisionManager.colliders[b]);
//                     CollisionManager.colliders[b].collisionFunctions.onCollision(CollisionManager.colliders[a]);
//                     CollisionManager.colliders[a].checkRigidbody(CollisionManager.colliders[b], true, collisionData.smallestAxis, collisionData.contactVertex);
//                     CollisionManager.colliders[b].checkRigidbody(CollisionManager.colliders[a], false, collisionData.smallestAxis, collisionData.contactVertex);
//                 }else{
//                     CollisionManager.colliders[a].collisionFunctions.onNotCollision(CollisionManager.colliders[b]);
//                     CollisionManager.colliders[b].collisionFunctions.onNotCollision(CollisionManager.colliders[a]);
//                 }
                
//             }
//         }
//     }
//     // Uses SAT
//     static checkCollision(collider1, collider2){
//         let minOverlap = null;
//         let smallestAxis;
//         let vertexObj;

//         for(let i = 0; i < collider1.edges.length; i++){
//             let axes1 = collider1.edges[i].getPerpendicularAxis();
//             let proj1, proj2 = 0;

//             proj1 = ExtendedMath.projShapeOntoAxis(axes1, collider1);
//             proj2 = ExtendedMath.projShapeOntoAxis(axes1, collider2);
//             let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);

//             if(overlap < 0){
//                 return {
//                     colliding: false,
//                     smallestAxis: null,
//                     contactVertex: null
//                 };
//             }

//             if((proj1.max > proj2.max && proj1.min < proj2.min) ||
//             (proj1.max < proj2.max && proj1.min > proj2.min)){
//                 let mins = Math.abs(proj1.min - proj2.min);
//                 let maxs = Math.abs(proj1.max - proj2.max);
//                 if(mins < maxs){
//                     overlap += mins;
//                 }else{
//                     overlap += maxs;
//                     axes1 = Vector2.multiply(axes1, -1);
//                 }
//             }

//             if(overlap < minOverlap || minOverlap === null){
//                 minOverlap = overlap;
//                 smallestAxis = axes1;
//                 vertexObj = collider2;
//                 if(proj1.max > proj2.max){
//                     smallestAxis = Vector2.multiply(axes1, -1);
//                 }
//             }
//         }
//         for(let i = 0; i < collider2.edges.length; i++){
//             let axes2 = collider2.edges[i].getPerpendicularAxis();
//             let proj1, proj2 = 0;

//             proj1 = ExtendedMath.projShapeOntoAxis(axes2, collider1);
//             proj2 = ExtendedMath.projShapeOntoAxis(axes2, collider2);
//             let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
//             if(overlap < 0){
//                 return {
//                     colliding: false,
//                     smallestAxis: null,
//                     contactVertex: null
//                 };
//             }

//             if((proj1.max > proj2.max && proj1.min < proj2.min) ||
//             (proj1.max < proj2.max && proj1.min > proj2.min)){
//                 let mins = Math.abs(proj1.min - proj2.min);
//                 let maxs = Math.abs(proj1.max - proj2.max);
//                 if(mins < maxs){
//                     overlap += mins;
//                 }else{
//                     overlap += maxs;
//                     axes2 = Vector2.multiply(axes2, -1);
//                 }
//             }

//             if(overlap < minOverlap || minOverlap === null){
//                 minOverlap = overlap;
//                 smallestAxis = axes2;
//                 vertexObj = collider1;
//                 if(proj1.max < proj2.max){
//                     smallestAxis = Vector2.multiply(axes2, -1);
//                 }
//             }
//         }

//         let contactVertex = ExtendedMath.projShapeOntoAxis(smallestAxis, vertexObj).collVertex;
//         return {
//             colliding: true,
//             smallestAxis: smallestAxis,
//             contactVertex: contactVertex
//         };
//     }

    
// }
// class Edge{
//     vertices;
//     constructor(vertex1, vertex2){
//         this.vertices = [vertex1, vertex2];
//     }

//     getPerpendicularAxis(){
//         let axis = new Vector2(-(this.vertices[1].y - this.vertices[0].y),
//         this.vertices[1].x - this.vertices[0].x
//         );
//         return axis.getNormalizedVector();
//     }
// }
// class CollisionFunctions{
//     onCollisionEnterFunctions = [];
//     onCollisionStayFunctions = [];
//     onCollisionExitFunctions = [];

//     otherCollidersTouching = [];

//     onCollision(otherCollider){
//         for(let i = 0; i < this.otherCollidersTouching.length; i++){
//             // call on collision stay if we are touching the same collider as before
//             if(this.otherCollidersTouching[i] === otherCollider){

//                 for(let i = 0; i < this.onCollisionStayFunctions.length; i++){
//                     this.onCollisionStayFunctions[i](otherCollider);
//                 }
//             }
//         }

//         if(!this.otherCollidersTouching.includes(otherCollider)){
//             for(let i = 0; i < this.onCollisionEnterFunctions.length; i++){
//                 this.onCollisionEnterFunctions[i](otherCollider);
//             }
//             this.otherCollidersTouching.push(otherCollider);
//         }
//     }

//     onNotCollision(otherCollider){
//         if(this.otherCollidersTouching.includes(otherCollider)){
//             for(let i = 0; i < this.onCollisionExitFunctions.length; i++){
//                 this.onCollisionExitFunctions[i](otherCollider);
//             }
//             this.otherCollidersTouching.splice(this.otherCollidersTouching.indexOf(otherCollider), 1);
//         }
//     }
// }
// class BoxCollider{
//     gameObject;
//     gameObjectLastRotation;
//     position;
//     size;
//     // The positions of the vertices relative to the position of the collider
//     vertices;
//     originalVerticesPos;
//     edges;
//     collisionFunctions;
//     rigidbody;
//     constructor(gameObject, position = new Vector2(0, 0), size = new Vector2(0, 0), rigidbody){
//         this.gameObject = gameObject;
//         this.position = position;
//         this.size = size;
//         this.rigidbody = rigidbody;

//         this.vertices = [new Vector2(this.size.x / 2, this.size.y / 2), // Top right vertex
//             new Vector2(this.size.x / 2, -this.size.y / 2), // Bottom right vertex
//             new Vector2(-this.size.x / 2, -this.size.y / 2), // Bottom left vertex
//             new Vector2(-this.size.x / 2, this.size.y / 2) // Top left vertex
//         ];
//         this.originalVerticesPos = [new Vector2(this.size.x / 2, this.size.y / 2), // Top right vertex
//             new Vector2(this.size.x / 2, -this.size.y / 2), // Bottom right vertex
//             new Vector2(-this.size.x / 2, -this.size.y / 2), // Bottom left vertex
//             new Vector2(-this.size.x / 2, this.size.y / 2) // Top left vertex
//         ];

//         this.edges = [new Edge(this.vertices[0], this.vertices[1]),
//         new Edge(this.vertices[1], this.vertices[2]),
//         new Edge(this.vertices[2], this.vertices[3]),
//         new Edge(this.vertices[3], this.vertices[0])
//         ];

//         this.collisionFunctions = new CollisionFunctions();

//         CollisionManager.colliders.push(this);
//     }
//     update(){
//         this.calculateNewVertexPositions();
//         this.gameObjectLastRotation = this.gameObject.transform.rotation;
//     }
//     calculateNewVertexPositions(){
//         // DOn't calculate if the rotation didnt change
//         if(this.gameObject.transform.rotation === this.gameObjectLastRotation){
//             return;
//         }
//         for(let i = 0; i < this.vertices.length; i++){
//             this.vertices[i] = ExtendedMath.rotatePoint(Vector2.zero(), this.originalVerticesPos[i], this.gameObject.transform.rotation);
//         }
//         this.edges = [new Edge(this.vertices[0], this.vertices[1]),
//         new Edge(this.vertices[1], this.vertices[2]),
//         new Edge(this.vertices[2], this.vertices[3]),
//         new Edge(this.vertices[3], this.vertices[0])
//         ];
//     }

//     getVertexWorldPos(index){
//         return new Vector2(this.vertices[index].x + this.position.x, this.vertices[index].y + this.position.y);
//     }

//     drawBox(){
//         ctx.lineWidth = 2;
//         ctx.strokeStyle = "rgb(0, 0, 255)";
//         ctx.beginPath();
//         ctx.moveTo(this.vertices[0].x + this.position.x - (Camera.position.x - Camera.size.x / 2), -(this.vertices[0].y + this.position.y - Camera.position.y - Camera.size.y / 2));
//         for(let i = 1; i < this.vertices.length; i++){
//             ctx.lineTo(this.vertices[i].x + this.position.x - (Camera.position.x - Camera.size.x / 2), -(this.vertices[i].y + this.position.y - Camera.position.y - Camera.size.y / 2));
//         }
//         ctx.lineTo(this.vertices[0].x + this.position.x - (Camera.position.x - Camera.size.x / 2), -(this.vertices[0].y + this.position.y - Camera.position.y - Camera.size.y / 2));
//         ctx.stroke();
//     }

//     checkRigidbody(otherCollider, transferForce, smallestAxis, contactVertex){
//         if(this.rigidbody != undefined){
//             this.rigidbody.onCollision(otherCollider, transferForce, smallestAxis, contactVertex);
//         }
//     }
// }

function pen_res_bb(b1, b2){
    let dist = Vector2.subtract(b1.position, b2.position);
    let pen_depth = b1.radius + b2.radius - dist.getMagnitude();
    let pen_res = Vector2.multiply(dist.unit(), pen_depth / (b1.inv_m + b2.inv_m));

    // b1.calculatePosition();
    // b2.calculatePosition();

    b1.changePosition(Vector2.add(b1.position, Vector2.multiply(pen_res, b1.inv_m)));
    b2.changePosition(Vector2.add(b2.position, Vector2.multiply(pen_res, -b2.inv_m)));
}

function coll_det_bb(b1, b2){
    if(b1.radius + b2.radius >= Vector2.subtract(b2.position, b1.position).getMagnitude()){
        return true;
    }else{
        return false;
    }
}

function coll_res_bb(b1, b2){
    let normal = Vector2.subtract(b1.position, b2.position).unit();
    let relVel = Vector2.subtract(b1.velocity, b2.velocity);
    let sepVel = Vector2.dot(relVel, normal);
    let new_sepVel = -sepVel * Math.min(b1.elasticity, b2.elasticity);
    let sepVelVec = Vector2.multiply(normal, new_sepVel);

    let vsep_diff = new_sepVel - sepVel;
    let impulse = vsep_diff / (b1.inv_m + b2.inv_m);
    let impulseVec = Vector2.multiply(normal, impulse);

    b1.velocity = Vector2.add(b1.velocity, Vector2.multiply(impulseVec, b1.inv_m));
    b2.velocity = Vector2.add(b2.velocity, Vector2.multiply(impulseVec, -b2.inv_m));
}
//returns with the closest point on a line segment to a given point
function closestPointOnLS(p, w1){

    let ballToWallStart = Vector2.subtract(w1.start, p);
    if(Vector2.dot(w1.dir, ballToWallStart) > 0){
        return w1.start;
    }

    let wallEndToBall = Vector2.subtract(p, w1.end);
    if(Vector2.dot(w1.dir, wallEndToBall) > 0){
        return w1.end;
    }

    let closestDist = Vector2.dot(w1.dir, ballToWallStart);
    let closestVect = Vector2.multiply(w1.dir, closestDist);

    return Vector2.subtract(w1.start, closestVect);
}

function closestPointsBetweenLS(c1, c2){
    let shortestDist = Vector2.subtract(closestPointOnLS(c1.start, c2), c1.start).getMagnitude();
    let closestPoints = [c1.start, closestPointOnLS(c1.start, c2)];
    if(Vector2.subtract(closestPointOnLS(c1.end, c2), c1.end).getMagnitude() < shortestDist){
        shortestDist = Vector2.subtract(closestPointOnLS(c1.end, c2), c1.end).getMagnitude();
        closestPoints = [c1.end, closestPointOnLS(c1.end, c2)];
    }

    if(Vector2.subtract(closestPointOnLS(c2.start, c1), c2.start).getMagnitude() < shortestDist){
        shortestDist = Vector2.subtract(closestPointOnLS(c2.start, c1), c2.start).getMagnitude();
        closestPoints = [closestPointOnLS(c2.start, c1), c2.start];
    }

    if(Vector2.subtract(closestPointOnLS(c2.end, c1), c2.end).getMagnitude() < shortestDist){
        shortestDist = Vector2.subtract(closestPointOnLS(c2.end, c1), c2.end).getMagnitude();
        closestPoints = [closestPointOnLS(c2.end, c1), c2.end];
    }
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(closestPoints[0].x - (Camera.position.x - Camera.size.x / 2), -(closestPoints[0].y - Camera.position.y - Camera.size.y / 2));
    ctx.lineTo(closestPoints[1].x - (Camera.position.x - Camera.size.x / 2), -(closestPoints[1].y - Camera.position.y - Camera.size.y / 2));
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(closestPoints[0].x - (Camera.position.x - Camera.size.x / 2), -(closestPoints[0].y - Camera.position.y - Camera.size.y / 2), c1.radius, 0, 2*Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(closestPoints[1].x - (Camera.position.x - Camera.size.x / 2), -(closestPoints[1].y - Camera.position.y - Camera.size.y / 2), c2.radius, 0, 2*Math.PI);
    ctx.closePath();
    ctx.stroke();
    return closestPoints;
}

function coll_det_bw(b1, w1){
    let ballToClosest = Vector2.subtract(closestPointOnLS(b1.position, w1), b1.position);
    if(ballToClosest.getMagnitude() <= b1.radius){
        return true;
    }
}

function pen_res_bw(b1, w1){
    let penVect = Vector2.subtract(b1.position, closestPointOnLS(b1.position, w1));
    b1.changePosition(Vector2.add(b1.position, Vector2.multiply(penVect.unit(), b1.radius - penVect.getMagnitude())));
}

function coll_res_bw(b1, w1){
    let normal = Vector2.subtract(b1.position, closestPointOnLS(b1.position, w1)).unit();
    let sepVel = Vector2.dot(b1.velocity, normal);
    let new_sepVel = -sepVel * b1.elasticity;
    let vsep_diff = sepVel - new_sepVel;
    b1.velocity = Vector2.add(b1.velocity, Vector2.multiply(normal, -vsep_diff));
    
}

function coll_det_cc(c1, c2){
    if(c1.radius + c2.radius >= Vector2.subtract(closestPointsBetweenLS(c1, c2)[0], closestPointsBetweenLS(c1, c2)[1]).getMagnitude()){
        return true;
    }else{
        return false;
    }
}

function pen_res_cc(c1, c2){
    let dist = Vector2.subtract(closestPointsBetweenLS(c1, c2)[0], closestPointsBetweenLS(c1, c2)[1]);
    let pen_depth = c1.radius + c2.radius - dist.getMagnitude();
    let pen_res = Vector2.multiply(dist.unit(), pen_depth / (c1.inv_m + c2.inv_m));

    c1.changePosition(Vector2.add(c1.position, Vector2.multiply(pen_res, c1.inv_m)));
    c2.changePosition(Vector2.add(c2.position, Vector2.multiply(pen_res, -c2.inv_m)));
}

function coll_res_cc(c1, c2){

    // let closestPoints = closestPointsBetweenLS(c1, c2);

    // let normal = Vector2.subtract(closestPoints[0], closestPoints[1]).unit();
    
    // //1. closing velocity
    // let collArm1 = Vector2.add(Vector2.subtract(closestPoints[0], c1.position), Vector2.multiply(normal, c1.radius));
    // let rotVel1 = new Vector2(-c1.angVel * collArm1.y, c1.angVel * collArm1.x);
    // let closVel1 = Vector2.add(c1.velocity, rotVel1);

    // let collArm2 = Vector2.add(Vector2.subtract(closestPoints[1], c2.position), Vector2.multiply(normal, -c2.radius));
    // let rotVel2 = new Vector2(-c2.angVel * collArm2.y, c2.angVel * collArm2.x);
    // let closVel2 = Vector2.add(c2.velocity, rotVel2);

    // //2. Impulse augmentation
    // let impAug1 = Vector2.cross(collArm1, normal);
    // impAug1 = impAug1 * c1.inv_inertia * impAug1;
    // let impAug2 = Vector2.cross(collArm2, normal);
    // impAug2 = impAug2 * c2.inv_inertia * impAug2;

    // let relVel = Vector2.subtract(closVel1, closVel2);
    // let sepVel = Vector2.dot(relVel, normal);
    // let new_sepVel = -sepVel * Math.min(c1.elasticity, c2.elasticity);
    // let vsep_diff = new_sepVel - sepVel;

    // let impulse = vsep_diff / (c1.inv_m + c2.inv_m + impAug1 + impAug2);
    // let impulseVec = Vector2.multiply(normal, impulse);

    // //3. Changing the velocities
    // c1.velocity = Vector2.add(c1.velocity, Vector2.multiply(impulseVec, c1.inv_m));
    // c2.velocity = Vector2.add(c2.velocity, Vector2.multiply(impulseVec, -c2.inv_m));

    // c1.angVel += c1.inv_inertia * Vector2.cross(collArm1, impulseVec);
    // c2.angVel -= c2.inv_inertia * Vector2.cross(collArm2, impulseVec);


    let normal = closestPointsBetweenLS(c1, c2)[0].subtr(closestPointsBetweenLS(c1, c2)[1]).unit();
    
    //1. Closing velocity
    let collArm1 = closestPointsBetweenLS(c1, c2)[0].subtr(c1.position).add(normal.mult(c1.radius));
    let rotVel1 = new Vector2(-c1.angVel * collArm1.y, c1.angVel * collArm1.x);
    let closVel1 = c1.velocity.add(rotVel1);
    let collArm2 = closestPointsBetweenLS(c1, c2)[1].subtr(c2.position).add(normal.mult(-c2.radius));
    let rotVel2= new Vector2(-c2.angVel * collArm2.y, c2.angVel * collArm2.x);
    let closVel2 = c2.velocity.add(rotVel2);

    //2. Impulse augmentation
    let impAug1 = Vector2.cross(collArm1, normal);
    impAug1 = impAug1 * c1.inv_inertia * impAug1;
    let impAug2 = Vector2.cross(collArm2, normal);
    impAug2 = impAug2 * c2.inv_inertia * impAug2;

    let relVel = closVel1.subtr(closVel2);
    let sepVel = Vector2.dot(relVel, normal);
    let new_sepVel = -sepVel * Math.min(c1.elasticity, c2.elasticity);
    let vsep_diff = new_sepVel - sepVel;
    
    let impulse = vsep_diff / (c1.inv_m + c2.inv_m + impAug1 + impAug2);
    let impulseVec = normal.mult(impulse);

    //3. Changing the velocities
    c1.velocity = c1.velocity.add(impulseVec.mult(c1.inv_m));
    c2.velocity = c2.velocity.add(impulseVec.mult(-c2.inv_m));

    c1.angVel += c1.inv_inertia * Vector2.cross(collArm1, impulseVec);
    c2.angVel -= c2.inv_inertia * Vector2.cross(collArm2, impulseVec); 
}

function rotMx(angle){
    let mx = new Matrix(2, 2);
    mx.data[0][0] = Math.cos(angle);
    mx.data[0][1] = -Math.sin(angle);
    mx.data[1][0] = Math.sin(angle);
    mx.data[1][1] = Math.cos(angle);
    return mx;
}

class CircleCollider{
    gameObject;
    offset = new Vector2(0, 0);
    position = new Vector2(0, 0);
    radius;

    //------
    velocity = new Vector2(0, 0);
    acceleration = new Vector2(0, 0);
    drag = new Vector2(0, 0);
    mass = 1;
    elasticity = 1;
    get inv_m(){
        if(this.mass === 0){
            return 0;
        }else{
            return 1 / this.mass;
        }
    }

    static balls = [];


    constructor(gameObject, offset, radius, velocity, acceleration, drag, mass){
        this.gameObject = gameObject;
        this.offset = offset;
        this.radius = radius;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.drag = drag;
        this.mass = mass;

        CircleCollider.balls.push(this);

        this.calculatePosition();
    }

    update(){

        this.updateVelocity();
        this.updatePosition();
        this.calculatePosition();
    }

    calculatePosition(){
        this.position.x = this.gameObject.transform.position.x + this.offset.x;
        this.position.y = this.gameObject.transform.position.y + this.offset.y;
    }
    updateVelocity(){
        this.velocity.x *= 1-this.drag * deltaTime;
        this.velocity.y *= 1-this.drag * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
    }
    updatePosition(){
        this.gameObject.transform.position.x += this.velocity.x * deltaTime;
        this.gameObject.transform.position.y += this.velocity.y * deltaTime;
    }
    display(){
        Vector2.drawVec(this.position, Vector2.add(this.position, this.velocity), "green");
        Vector2.drawVec(this.position, Vector2.add(this.position, this.acceleration), "blue");
        Vector2.drawVec(this.position, Vector2.add(Vector2.multiply(this.acceleration.normal(), 50), this.position), "red");
        ctx.fillStyle = "black";
        ctx.fillText("m = " + this.mass, this.position.x - (Camera.position.x - Camera.size.x / 2), -(this.position.y - Camera.position.y - Camera.size.y / 2))
        ctx.fillText("e = " + this.elasticity, this.position.x - (Camera.position.x - Camera.size.x / 2), -(this.position.y - 10 - Camera.position.y - Camera.size.y / 2))
    }

    changePosition(newPos){
        this.gameObject.transform.position.x = newPos.x - this.offset.x;
        this.gameObject.transform.position.y = newPos.y - this.offset.y;
    }   
}

class Wall{
    gameObject;
    localStart;
    localEnd;

    get start(){
        return Vector2.add(this.gameObject.transform.position, this.localStart);
    }
    get end(){
        return Vector2.add(this.gameObject.transform.position, this.localEnd);
    }
    get dir(){
        return Vector2.subtract(this.localEnd, this.localStart).unit();

    }

    static walls = [];
    constructor(gameObject, start, end){
        this.gameObject = gameObject;
        this.localStart = start;
        this.localEnd = end;

        Wall.walls.push(this);
    }
}

class Capsule{
    gameObject;
    start;
    end;
    radius;
    refDir;
    refAngle;

    acceleration;
    velocity;
    position;
    length;
    dir;
    drag;
    offset;
    angle;
    angVel;
    mass;
    elasticity = 1;
    inertia;
    get inv_m(){
        if(this.mass === 0){
            return 0;
        }else{
            return 1 / this.mass;
        }
    }

    get inv_inertia(){
        if(this.inertia === 0){
            return 0;
        }else{
            return 1 / this.inertia;
        }
    }

    static capsules = [];
    constructor(gameObject, start, end, radius, drag, mass){
        this.gameObject = gameObject;
        this.radius = radius;

        this.start = start;
        this.end = end;

        let relativeEnd = new Vector2(this.end.x + this.gameObject.transform.position.x - (Camera.position.x - Camera.size.x / 2), -(this.end.y + this.gameObject.transform.position.y - Camera.position.y - Camera.size.y / 2));
        let relativeStart = new Vector2(this.start.x + this.gameObject.transform.position.x - (Camera.position.x - Camera.size.x / 2), -(this.start.y + this.gameObject.transform.position.y - Camera.position.y - Camera.size.y / 2));

        this.refDir = Vector2.subtract(relativeEnd, relativeStart).unit();
        this.refAngle = Math.acos(Vector2.dot(this.refDir, new Vector2(1, 0)));
        if(Vector2.cross(this.refDir, new Vector2(1, 0)) > 0){
            this.refAngle *= -1;
        }

        this.acceleration = new Vector2(0, 0);
        this.velocity = new Vector2(0, 0);
        this.position = Vector2.add(Vector2.multiply(Vector2.add(this.start, this.end), 0.5), this.gameObject.transform.position);
        this.offset = Vector2.multiply(Vector2.add(this.start, this.end), 0.5);
        this.length = Vector2.subtract(this.end, this.start).getMagnitude();
        this.dir = Vector2.subtract(this.end, this.start).unit();
        this.drag = drag;
        this.mass = mass;
        this.inertia = this.mass * (this.radius**2 + (this.length + 2 * this.radius) ** 2) / 12;

        this.angle = 0;
        this.angVel = 0;

        Capsule.capsules.push(this);
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.start.x - (Camera.position.x - Camera.size.x / 2), -(this.start.y - Camera.position.y - Camera.size.y / 2), this.radius, (this.refAngle - this.angle + Math.PI / 2), (this.refAngle - this.angle + 3 * Math.PI / 2));
        ctx.arc(this.end.x - (Camera.position.x - Camera.size.x / 2), -(this.end.y - Camera.position.y - Camera.size.y / 2), this.radius, (this.refAngle - this.angle - Math.PI / 2), (this.refAngle - this.angle + Math.PI / 2));
        ctx.closePath();
        ctx.moveTo(this.start.x - (Camera.position.x - Camera.size.x / 2), -(this.start.y - Camera.position.y - Camera.size.y / 2));
        ctx.lineTo(this.end.x - (Camera.position.x - Camera.size.x / 2), -(this.end.y - Camera.position.y - Camera.size.y / 2));
        ctx.strokeStyle = "black";
        ctx.stroke();
        // ctx.fillStyle = "lightgreen";
        // ctx.fill();
    }

    update(){
        this.updateVelocity();
        this.updatePosition();
        this.calculatePosition();
    }

    updateVelocity(){
        this.velocity.x *= 1-this.drag * deltaTime;
        this.velocity.y *= 1-this.drag * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.angle += this.angVel;
        this.angVel *= 0.96;
    }

    calculatePosition(){
        let rotMat = rotMx(this.angle);
        this.dir = rotMat.multiplyVec(this.refDir);

        this.position = Vector2.add(this.gameObject.transform.position, this.offset);
        this.start = Vector2.add(this.position, Vector2.multiply(this.dir, -this.length / 2));
        this.end = Vector2.add(this.position, Vector2.multiply(this.dir, this.length / 2));
    }

    updatePosition(){
        this.gameObject.transform.position.x += this.velocity.x * deltaTime;
        this.gameObject.transform.position.y += this.velocity.y * deltaTime;
    }

    
    changePosition(newPos){
        this.gameObject.transform.position.x = newPos.x - this.offset.x;
        this.gameObject.transform.position.y = newPos.y - this.offset.y;
    }   
}
