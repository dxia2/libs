
// function pen_res_bb(b1, b2){
//     let dist = Vector2.subtract(b1.position, b2.position);
//     let pen_depth = b1.radius + b2.radius - dist.getMagnitude();
//     let pen_res = Vector2.multiply(dist.unit(), pen_depth / (b1.inv_m + b2.inv_m));

//     // b1.calculatePosition();
//     // b2.calculatePosition();

//     b1.position = (Vector2.add(b1.position, Vector2.multiply(pen_res, b1.inv_m)));
//     b2.position = (Vector2.add(b2.position, Vector2.multiply(pen_res, -b2.inv_m)));
// }

// function coll_det_bb(b1, b2){
//     if(b1.radius + b2.radius >= Vector2.subtract(b2.position, b1.position).getMagnitude()){
//         return true;
//     }else{
//         return false;
//     }
// }

// function coll_res_bb(b1, b2){
//     let normal = Vector2.subtract(b1.position, b2.position).unit();
//     let relVel = Vector2.subtract(b1.velocity, b2.velocity);
//     let sepVel = Vector2.dot(relVel, normal);
//     let new_sepVel = -sepVel * Math.min(b1.elasticity, b2.elasticity);
//     let sepVelVec = Vector2.multiply(normal, new_sepVel);

//     let vsep_diff = new_sepVel - sepVel;
//     let impulse = vsep_diff / (b1.inv_m + b2.inv_m);
//     let impulseVec = Vector2.multiply(normal, impulse);

//     b1.velocity = Vector2.add(b1.velocity, Vector2.multiply(impulseVec, b1.inv_m));
//     b2.velocity = Vector2.add(b2.velocity, Vector2.multiply(impulseVec, -b2.inv_m));
// }
// // returns with the closest point on a line segment to a given point
// function closestPointOnLS(p, w1){

//     let ballToWallStart = Vector2.subtract(w1.start, p);
//     if(Vector2.dot(w1.dir, ballToWallStart) > 0){
//         return w1.start;
//     }

//     let wallEndToBall = Vector2.subtract(p, w1.end);
//     if(Vector2.dot(w1.dir, wallEndToBall) > 0){
//         return w1.end;
//     }

//     let closestDist = Vector2.dot(w1.dir, ballToWallStart);
//     let closestVect = Vector2.multiply(w1.dir, closestDist);

//     return Vector2.subtract(w1.start, closestVect);
// }

// function closestPointsBetweenLS(c1, c2){
//     let shortestDist = Vector2.subtract(closestPointOnLS(c1.start, c2), c1.start).getMagnitude();
//     let closestPoints = [c1.start, closestPointOnLS(c1.start, c2)];
//     if(Vector2.subtract(closestPointOnLS(c1.end, c2), c1.end).getMagnitude() < shortestDist){
//         shortestDist = Vector2.subtract(closestPointOnLS(c1.end, c2), c1.end).getMagnitude();
//         closestPoints = [c1.end, closestPointOnLS(c1.end, c2)];
//     }

//     if(Vector2.subtract(closestPointOnLS(c2.start, c1), c2.start).getMagnitude() < shortestDist){
//         shortestDist = Vector2.subtract(closestPointOnLS(c2.start, c1), c2.start).getMagnitude();
//         closestPoints = [closestPointOnLS(c2.start, c1), c2.start];
//     }

//     if(Vector2.subtract(closestPointOnLS(c2.end, c1), c2.end).getMagnitude() < shortestDist){
//         shortestDist = Vector2.subtract(closestPointOnLS(c2.end, c1), c2.end).getMagnitude();
//         closestPoints = [closestPointOnLS(c2.end, c1), c2.end];
//     }
//     ctx.strokeStyle = "red";
//     ctx.beginPath();
//     ctx.moveTo(closestPoints[0].x - (Camera.position.x - Camera.size.x / 2), -(closestPoints[0].y - Camera.position.y - Camera.size.y / 2));
//     ctx.lineTo(closestPoints[1].x - (Camera.position.x - Camera.size.x / 2), -(closestPoints[1].y - Camera.position.y - Camera.size.y / 2));
//     ctx.closePath();
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.arc(closestPoints[0].x - (Camera.position.x - Camera.size.x / 2), -(closestPoints[0].y - Camera.position.y - Camera.size.y / 2), c1.radius, 0, 2*Math.PI);
//     ctx.closePath();
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.arc(closestPoints[1].x - (Camera.position.x - Camera.size.x / 2), -(closestPoints[1].y - Camera.position.y - Camera.size.y / 2), c2.radius, 0, 2*Math.PI);
//     ctx.closePath();
//     ctx.stroke();


//     return closestPoints;
// }

// function coll_det_bw(b1, w1){
//     let ballToClosest = Vector2.subtract(closestPointOnLS(b1.position, w1), b1.position);
//     if(ballToClosest.getMagnitude() <= b1.radius){
//         return true;
//     }
// }

// function pen_res_bw(b1, w1){
//     let penVect = Vector2.subtract(b1.position, closestPointOnLS(b1.position, w1));
//     b1.position = Vector2.add(b1.position, Vector2.multiply(penVect.unit(), b1.radius - penVect.getMagnitude()));
// }

// function coll_res_bw(b1, w1){
//     let normal = Vector2.subtract(b1.position, closestPointOnLS(b1.position, w1)).unit();
//     let sepVel = Vector2.dot(b1.velocity, normal);
//     let new_sepVel = -sepVel * b1.elasticity;
//     let vsep_diff = sepVel - new_sepVel;
//     b1.velocity = Vector2.add(b1.velocity, Vector2.multiply(normal, -vsep_diff));
    
// }

// function coll_det_cc(c1, c2){
//     if(c1.radius + c2.radius >= Vector2.subtract(closestPointsBetweenLS(c1, c2)[0], closestPointsBetweenLS(c1, c2)[1]).getMagnitude()){
//         return true;
//     }else{
//         return false;
//     }
// }

// function pen_res_cc(c1, c2){
//     let dist = Vector2.subtract(closestPointsBetweenLS(c1, c2)[0], closestPointsBetweenLS(c1, c2)[1]);
//     let pen_depth = c1.radius + c2.radius - dist.getMagnitude();
//     let pen_res = Vector2.multiply(dist.unit(), pen_depth / (c1.inv_m + c2.inv_m));

//     c1.changePosition(Vector2.add(c1.position, Vector2.multiply(pen_res, c1.inv_m)));
//     c2.changePosition(Vector2.add(c2.position, Vector2.multiply(pen_res, -c2.inv_m)));
// }

// function coll_res_cc(c1, c2){

//     // let closestPoints = closestPointsBetweenLS(c1, c2);

//     // let normal = Vector2.subtract(closestPoints[0], closestPoints[1]).unit();
    
//     // //1. closing velocity
//     // let collArm1 = Vector2.add(Vector2.subtract(closestPoints[0], c1.position), Vector2.multiply(normal, c1.radius));
//     // let rotVel1 = new Vector2(-c1.angVel * collArm1.y, c1.angVel * collArm1.x);
//     // let closVel1 = Vector2.add(c1.velocity, rotVel1);

//     // let collArm2 = Vector2.add(Vector2.subtract(closestPoints[1], c2.position), Vector2.multiply(normal, -c2.radius));
//     // let rotVel2 = new Vector2(-c2.angVel * collArm2.y, c2.angVel * collArm2.x);
//     // let closVel2 = Vector2.add(c2.velocity, rotVel2);

//     // //2. Impulse augmentation
//     // let impAug1 = Vector2.cross(collArm1, normal);
//     // impAug1 = impAug1 * c1.inv_inertia * impAug1;
//     // let impAug2 = Vector2.cross(collArm2, normal);
//     // impAug2 = impAug2 * c2.inv_inertia * impAug2;

//     // let relVel = Vector2.subtract(closVel1, closVel2);
//     // let sepVel = Vector2.dot(relVel, normal);
//     // let new_sepVel = -sepVel * Math.min(c1.elasticity, c2.elasticity);
//     // let vsep_diff = new_sepVel - sepVel;

//     // let impulse = vsep_diff / (c1.inv_m + c2.inv_m + impAug1 + impAug2);
//     // let impulseVec = Vector2.multiply(normal, impulse);

//     // //3. Changing the velocities
//     // c1.velocity = Vector2.add(c1.velocity, Vector2.multiply(impulseVec, c1.inv_m));
//     // c2.velocity = Vector2.add(c2.velocity, Vector2.multiply(impulseVec, -c2.inv_m));

//     // c1.angVel += c1.inv_inertia * Vector2.cross(collArm1, impulseVec);
//     // c2.angVel -= c2.inv_inertia * Vector2.cross(collArm2, impulseVec);

//     let normal = closestPointsBetweenLS(c1, c2)[0].subtr(closestPointsBetweenLS(c1, c2)[1]).unit();

//     //1. Closing velocity
//     let collArm1 = closestPointsBetweenLS(c1, c2)[0].subtr(c1.position).add(normal.mult(c1.radius));
//     let rotVel1 = new Vector2(-c1.angVel * collArm1.y, c1.angVel * collArm1.x);
//     let closVel1 = c1.velocity.add(rotVel1);
//     let collArm2 = closestPointsBetweenLS(c1, c2)[1].subtr(c2.position).add(normal.mult(-c2.radius));
//     let rotVel2= new Vector2(-c2.angVel * collArm2.y, c2.angVel * collArm2.x);
//     let closVel2 = c2.velocity.add(rotVel2);

//     //2. Impulse augmentation
//     let impAug2 = Vector2.cross(collArm2, normal);
//     impAug2 = impAug2 * c2.inv_inertia * impAug2;
//     let impAug1 = Vector2.cross(collArm1, normal);
//     impAug1 = impAug1 * c1.inv_inertia * impAug1;

//     let relVel = closVel1.subtr(closVel2);
//     let sepVel = Vector2.dot(relVel, normal);
//     let new_sepVel = -sepVel * Math.min(c1.elasticity, c2.elasticity);
//     let vsep_diff = new_sepVel - sepVel;
    
//     let impulse = vsep_diff / (c1.inv_m + c2.inv_m + impAug1 + impAug2);
//     let impulseVec = normal.mult(impulse);

//     //3. Changing the velocities
//     c1.velocity = c1.velocity.add(impulseVec.mult(c1.inv_m));
//     c2.velocity = c2.velocity.add(impulseVec.mult(-c2.inv_m));

//     c1.angVel += c1.inv_inertia * Vector2.cross(collArm1, impulseVec);
//     c2.angVel -= c2.inv_inertia * Vector2.cross(collArm2, impulseVec); 
 
// }
// // Separating axis theorem
// function sat(o1, o2){
//     let minOverlap = null;
//     let smallestAxis;
//     let vertexObj;

//     let axes = findAxes(o1, o2);
//     let proj1, proj2 = 0;
//     let firstShapeAxes = getShapeAxes(o1);

//     for(let i = 0; i < axes.length; i++){
//         proj1 = projShapeOntoAxis(axes[i], o1);
//         proj2 = projShapeOntoAxis(axes[i], o2);
//         let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
//         if(overlap < 0){
//             return false;
//         }

//         if((proj1.max > proj2.max && proj1.min < proj2.min) || 
//         (proj1.max < proj2.max && proj1.min > proj2.min)){
//             let mins = Math.abs(proj1.min - proj2.min);
//             let maxs = Math.abs(proj1.max - proj2.max);
//             if(mins < maxs){
//                 overlap += mins;
//             }else{
//                 overlap += maxs;
//                 axes[i] = Vector2.multiply(axes[i], -1);
//             }
//         }

//         if(overlap < minOverlap || minOverlap === null){
//             minOverlap = overlap;
//             smallestAxis = axes[i];
//             if(i < firstShapeAxes){
//                 vertexObj = o2;
//                 if(proj1.max > proj2.max){
//                     smallestAxis = Vector2.multiply(axes[i], -1);
//                 }
//             }else{
//                 vertexObj = o1;
//                 if(proj1.max < proj2.max){
//                     smallestAxis = Vector2.multiply(axes[i], -1);
//                 }
//             }
//         }
//     }

   

//     let contactVertex = projShapeOntoAxis(smallestAxis, vertexObj).collVertex;
//     //smallestAxis.drawVec(contactVertex.x, contactVertex.y, minOverlap, "blue");

//     if(vertexObj === o2){
//         smallestAxis = Vector2.multiply(smallestAxis, -1);
//     }


//     return {
//         pen: minOverlap,
//         axis: smallestAxis,
//         vertex: contactVertex
//     }
// }


// function findAxes(o1, o2){
//     let axes = [];
//     if(o1 instanceof Circle && o2 instanceof Circle){
//         axes.push(Vector2.subtract(o2.position, o1.position).unit());
//         return axes;
//     }
//     if(o1 instanceof Circle){
//         axes.push(Vector2.subtract(closestVertexToPoint(o2, o1.position), o1.position).unit());
//         axes.push(o2.dir.normal());
//         if(o2 instanceof Rectangle){
//             axes.push(o2.dir);
//         }
//         return axes;
//     }
//     if(o2 instanceof Circle){
//         axes.push(o1.dir.normal());
//         if(o1 instanceof Rectangle){
//             axes.push(o1.dir);
//         }
//         axes.push(Vector2.subtract(closestVertexToPoint(o1, o2.position), o2.position).unit());

//         return axes;
//     }
//     axes.push(o1.dir.normal());
//     if(o1 instanceof Rectangle){
//         axes.push(o1.dir);
//     }
//     axes.push(o2.dir.normal());
//     if(o2 instanceof Rectangle){
//         axes.push(o2.dir);
//     }

//     return axes;
// }

// function getShapeAxes(obj){
//     if(obj instanceof Circle || obj instanceof Line){
//         return 1;
//     }
//     if(obj instanceof Rectangle){
//         return 2;
//     }
// }

// function setBallVerticiesAlongAxis(obj, axis){
//     if(obj instanceof Circle){
//         obj.verticies[0] = Vector2.add(obj.position, Vector2.multiply(axis.unit(), -obj.radius));
//         obj.verticies[1] = Vector2.add(obj.position, Vector2.multiply(axis.unit(), obj.radius));
//     }
// }

// function closestVertexToPoint(obj, p){
//     let closestVertex;
//     let minDist = null;
//     for(let i = 0; i < obj.verticies.length; i++){
//         if(Vector2.subtract(p, obj.verticies[i]).getMagnitude() < minDist || minDist === null){
//             closestVertex = obj.verticies[i];
//             minDist = Vector2.subtract(p, obj.verticies[i]).getMagnitude(); 
//         }
//     }

//     return closestVertex;
// }

// function projShapeOntoAxis(axis, obj){
//     setBallVerticiesAlongAxis(obj, axis);
//     let min = Vector2.dot(axis, obj.verticies[0]);
//     let max = min;
//     let collVertex = obj.verticies[0];
//     for(let i = 0; i < obj.verticies.length; i++){
//         let p = Vector2.dot(axis, obj.verticies[i]);
//         if(p < min){
//             min = p;
//             collVertex = obj.verticies[i];
//         }
//         if(p > max){
//             max = p;
//         }
//     }

//     return{
//         min: min,
//         max: max,
//         collVertex: collVertex
//     }
// }

// function rotMx(angle){
//     let mx = new Matrix(2, 2);
//     mx.data[0][0] = Math.cos(angle);
//     mx.data[0][1] = -Math.sin(angle);
//     mx.data[1][0] = Math.sin(angle);
//     mx.data[1][1] = -Math.cos(angle);
//     return mx;
// }

// class PhysicsManager{

//     static updatePhysics(){
//         CollData.COLLISIONS.length = 0;

//         Body.BODIES.forEach((b) =>{
//             b.draw();
//             b.update();
//         });
//         Body.BODIES.forEach((b, index) =>{
//             for(let bodyPair = index + 1; bodyPair < Body.BODIES.length; bodyPair++){
    
//                 let bestSat = {
//                     pen: null,
//                     axis: null,
//                     vertex: null
//                 }
        
//                 for(let i = 0; i < Body.BODIES[index].comp.length; i++){
//                     for(let j = 0; j < Body.BODIES[bodyPair].comp.length; j++){
//                         if(sat(Body.BODIES[index].comp[i], Body.BODIES[bodyPair].comp[j]).pen > bestSat.pen){
//                             bestSat = sat(Body.BODIES[index].comp[i], Body.BODIES[bodyPair].comp[j]);
//                             ctx.fillText("Collision", 500, 380);
//                         }
//                     }
//                 }
    
//                 if(bestSat.pen !== null){
//                     CollData.COLLISIONS.push(new CollData(Body.BODIES[index], Body.BODIES[bodyPair], bestSat.axis, bestSat.pen, bestSat.vertex));
//                 }
//             }
//         });
    
//         CollData.COLLISIONS.forEach((c) => {
//             c.penRes();
//             c.collRes();
//         });
//     }
    
// }

// class CollData{
//     static COLLISIONS = [];
//     constructor(o1, o2, normal, pen, cp){
//         this.o1 = o1;
//         this.o2 = o2;
//         this.normal = normal;
//         this.pen = pen;
//         this.cp = cp;
//     }

//     penRes(){
//         let penResolution = Vector2.multiply(this.normal, this.pen / (this.o1.inv_m + this.o2.inv_m));
//         this.o1.position = Vector2.add(this.o1.position, Vector2.multiply(penResolution, this.o1.inv_m));
//         this.o2.position = Vector2.add(this.o2.position, Vector2.multiply(penResolution, -this.o2.inv_m));
//     }

//     collRes(){
//         //1. Closing velocity

//         let collArm1 = this.cp.subtr(this.o1.position);
//         collArm1 = collArm1.mult(-1);
//         let rotVel1 = new Vector2(-this.o1.angVel * collArm1.y, this.o1.angVel * collArm1.x);
//         let closVel1 = this.o1.velocity.add(rotVel1);

//         let collArm2 = this.cp.subtr(this.o2.position);
//         collArm2 = collArm2.mult(-1);
//         let rotVel2= new Vector2(-this.o2.angVel * collArm2.y, this.o2.angVel * collArm2.x);
//         let closVel2 = this.o2.velocity.add(rotVel2);



//         //2. Impulse augmentation
//         let impAug1 = Vector2.cross(collArm1, this.normal);
//         impAug1 = impAug1 * this.o1.inv_inertia * impAug1;
//         let impAug2 = Vector2.cross(collArm2, this.normal);
//         impAug2 = impAug2 * this.o2.inv_inertia * impAug2;

//         let relVel = closVel1.subtr(closVel2);
//         let sepVel = Vector2.dot(relVel, this.normal);
//         console.log(sepVel)
//         let new_sepVel = sepVel * -Math.min(this.o1.elasticity, this.o2.elasticity);
//         let vsep_diff = new_sepVel - sepVel;
//         console.log(vsep_diff);

//         let impulse = vsep_diff / (this.o1.inv_m + this.o2.inv_m + impAug1 + impAug2);
//         let impulseVec = this.normal.mult(impulse);


//         //3. Changing the velocities
//         this.o1.velocity = this.o1.velocity.add(impulseVec.mult(this.o1.inv_m));
//         this.o2.velocity = this.o2.velocity.add(impulseVec.mult(-this.o2.inv_m));
//         console.log(this.o2.velocity);
//         this.o1.angVel += this.o1.inv_inertia * Vector2.cross(collArm1, impulseVec);
//         this.o2.angVel -= this.o2.inv_inertia * Vector2.cross(collArm2, impulseVec);
//         console.log("------------------------")
//     }
// }

// class Body{
//     get position(){
//         return this.comp[0].position;
//     }
//     set position(value){
//         this.comp[0].position = value;
//     }
//     get inv_m(){
//         if(this.mass === 0){
//             return 0;
//         }else{
//             return 1 / this.mass;
//         }
//     }
//     get inertia(){
//         return 0;
//     }
//     get inv_inertia(){
//         if(this.inertia === 0){
//             return 0;
//         }else{
//             return 1 / this.inertia;
//         }
//     }
//     angDrag = 0.01;
//     gravityModifier = 0;

//     static defaultGravity = -0.1;
//     static velocityThreshold = 100;

//     static BODIES = [];
//     constructor(gameObject){
//         this.gameObject = gameObject;
//         this.comp = [];
//         this.mass = 1;
//         this.elasticity = 1;
//         this.drag = 0.5;

//         this.velocity = new Vector2(0, 0);
//         this.acceleration = new Vector2(0, 0);
//         this.angVel = 0;
//         Body.BODIES.push(this);
//     }

//     draw(){

//     }

//     display(){

//     }

//     update(){
//         this.velocity.y += Body.defaultGravity * this.gravityModifier;
//     }
// }

// class Ball extends Body{

//     constructor(gameObject, offset, radius, velocity, acceleration, drag, mass){
//         super(gameObject);
//         this.drag = drag;
//         this.mass = mass;
//         this.comp = [new Circle(gameObject, offset, radius)];
//         this.update();
//     }

//     update(){
//         super.update();
//         this.updateVelocity();
//         this.updateComponentPos();
//     }

//     updateVelocity(){
//         this.angVel *= 1-this.angDrag;

//         this.velocity.x *= 1-this.drag;
//         this.velocity.y *= 1-this.drag;
//         this.velocity.x += this.acceleration.x;
//         this.velocity.y += this.acceleration.y;
//     }
//     updateComponentPos(){
//         this.comp[0].position = Vector2.add(this.comp[0].position, this.velocity);
//     }
//     display(){
//         Vector2.drawVec(this.position, Vector2.add(this.position, this.velocity), "green");
//         Vector2.drawVec(this.position, Vector2.add(this.position, this.acceleration), "blue");
//         Vector2.drawVec(this.position, Vector2.add(Vector2.multiply(this.acceleration.normal(), 50), this.position), "red");
//         ctx.fillStyle = "black";
//         ctx.fillText("m = " + this.mass, this.position.x - (Camera.position.x - Camera.size.x / 2), -(this.position.y - Camera.position.y - Camera.size.y / 2))
//         ctx.fillText("e = " + this.elasticity, this.position.x - (Camera.position.x - Camera.size.x / 2), -(this.position.y - 10 - Camera.position.y - Camera.size.y / 2))
//     }
//     draw(){
//         this.comp[0].draw();
//     }
// }

// class Wall extends Body{

//     constructor(gameObject, start, end){
//         super(gameObject);
//         this.mass = 0;
//         this.comp = [new Line(gameObject, start, end)];
//     }

//     update(){
//         this.comp[0].update();
//     }

//     draw(){
//         this.comp[0].draw();
//     }
// }

// class Capsule extends Body{
//     gameObject;
//     radius;

//     length;

//     get inertia(){
//         return this.mass * ((2 * this.comp[0].size.x)**2 + (this.comp[0].size.y + 2 * this.comp[0].size.x)**2) / 12;
//     }
//     constructor(gameObject, length, offset, radius, drag, mass){
//         super(gameObject);
//         this.gameObject = gameObject;
//         this.radius = radius;
//         this.mass = mass;
//         this.drag = drag;

//         let start = new Vector2(offset.x, offset.y + (length / 2));
//         let end = new Vector2(offset.x, offset.y - (length / 2));
//         this.length = Vector2.subtract(end, start).getMagnitude();

//         this.comp = [new Circle(gameObject, start, radius), new Circle(gameObject, end, radius)];
        
//         this.comp.unshift(new Rectangle(gameObject, offset, new Vector2(this.radius * 2, this.length)));
//     }

//     draw(){
//         this.comp[0].draw();
//         this.comp[1].draw();
//         this.comp[2].draw();

//     }

//     update(){
//         super.update();
//         this.updateVelocity();
//         this.updatePosition();
//         this.comp[0].update();
//         // this.comp[1].update();
//         // this.comp[2].update();
//     }

//     updateVelocity(){
//         this.angVel *= 1-this.angDrag;
//         this.velocity.x *= 1-this.drag;
//         this.velocity.y *= 1-this.drag;
//         this.velocity.x += this.acceleration.x;
//         this.velocity.y += this.acceleration.y;
//         this.comp[0].angle += this.angVel;
//     }

//     updatePosition(){
//         this.comp[0].position = Vector2.add(this.comp[0].position, this.velocity);
//         let start = Vector2.multiply(this.comp[0].dir, this.length / 2);
//         let end = Vector2.multiply(this.comp[0].dir, -this.length / 2);
//         this.comp[1].offset = start;
//         this.comp[2].offset = end;
//     }
// }
// class Box extends Body{
//     size;
//     get angle(){
//         return ExtendedMath.degToRad(this.gameObject.transform.rotation);
//     }

//     set angle(value){
//         this.gameObject.transform.rotation = ExtendedMath.radToDeg(value);
//     }
//     get inertia(){
//         return this.mass * (this.comp[0].size.x**2 +this.comp[0].size.y**2) / 12;
//     }

//     constructor(gameObject, offset, size, mass, drag){
//         super(gameObject);
//         this.mass = mass;
//         this.comp = [new Rectangle(gameObject, offset, size)];
//         this.size = size;
//         this.drag = drag;
//         this.update();
//     }

//     update(){
//         super.update();
//         this.updateVelocity();
//         this.updatePosition();
//         this.comp[0].update();
//     }

//     draw(){
//         this.comp[0].draw();
//     }

//     updateVelocity(){
//         this.angVel *= 1-this.angDrag;

//         this.velocity.x *= 1-this.drag;
//         this.velocity.y *= 1-this.drag;
//         this.velocity.x += this.acceleration.x;
//         this.velocity.y += this.acceleration.y;
//         this.comp[0].angle += this.angVel;
//     }

//     updatePosition(){
//         this.comp[0].position = Vector2.add(this.comp[0].position, this.velocity);
//     }
// }

// class Line{
//     localStart;
//     localEnd;

//     verticies = [];

//     get start(){
//         return Vector2.add(this.gameObject.transform.position, this.localStart);
//     }
//     get end(){
//         return Vector2.add(this.gameObject.transform.position, this.localEnd);
//     }
//     get dir(){
//         return Vector2.subtract(this.localEnd, this.localStart).unit();
//     }

//     set start(value){
//         this.localStart = Vector2.subtract(value, this.gameObject.transform.position);
//     }

//     set end(value){
//         this.localEnd = Vector2.subtract(value, this.gameObject.transform.position);
//     }

//     get position(){
//         let midPoint = new Vector2((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2);
//         return this.gameObject.transform.position;
//     }
//     set position(value){
//         let midPoint = new Vector2((this.localStart.x + this.localEnd.x) / 2, (this.localStart.y + this.localEnd.y) / 2);
//         this.gameObject.transform.position = value;
//     }
//     constructor(gameObject, start, end){
//         this.gameObject = gameObject;
//         this.localStart = start;
//         this.localEnd = end;
//         this.verticies = [this.start, this.end];
//     }

//     update(){
//         this.verticies = [this.start, this.end];
//     }

//     draw(){
//         ctx.beginPath();
//         ctx.moveTo(this.verticies[0].x - (Camera.position.x - Camera.size.x / 2), -this.verticies[0].y + Camera.position.y + Camera.size.y / 2);
//         ctx.lineTo(this.verticies[1].x - (Camera.position.x - Camera.size.x / 2), -this.verticies[1].y + Camera.position.y + Camera.size.y / 2);
//         ctx.strokeStyle = "black";
//         ctx.stroke();
//         ctx.closePath();
//     }
// }

// class Circle{
//     get position(){
//         return Vector2.add(this.gameObject.transform.position, this.offset);
//     }
//     set position(value){
//         this.gameObject.transform.position = Vector2.subtract(value, this.offset);
//     }
//     constructor(gameObject, offset, radius){
//         this.gameObject = gameObject;
//         this.offset = offset;
//         this.verticies = [];
//         this.radius = radius;
//     }

//     draw(){
//         ctx.beginPath();
//         ctx.arc(this.position.x - (Camera.position.x - Camera.size.x / 2), -this.position.y + Camera.position.y + Camera.size.y / 2, this.radius, 0, 2*Math.PI);
//         ctx.stroke();
//         // ctx.fillStyle = "red";
//         // ctx.fill();
//         ctx.closePath();
//     }
// }

// class Rectangle{
//     get position(){
//         return Vector2.add(this.gameObject.transform.position, this.offset);
//     }
//     set position(value){
//         this.gameObject.transform.position = Vector2.subtract(value, this.offset);
//     }

//     get angle(){
//         return ExtendedMath.degToRad(this.gameObject.transform.rotation);
//     }

//     set angle(value){
//         this.gameObject.transform.rotation = ExtendedMath.radToDeg(value);
//     }
//     constructor(gameObject, offset, size){
//         this.gameObject = gameObject;
//         this.offset = offset;
//         this.size = size;
//         this.verticies = [];
//         this.dir = new Vector2(0, 1);
//         this.refDir = new Vector2(0, 1);
//         this.rotMat = new Matrix(2, 2);
//         this.update();
//     }

//     draw(){
//         ctx.beginPath();
//         ctx.moveTo(this.verticies[0].x - (Camera.position.x - Camera.size.x / 2), -this.verticies[0].y + Camera.position.y + Camera.size.y / 2);
//         ctx.lineTo(this.verticies[1].x - (Camera.position.x - Camera.size.x / 2), -this.verticies[1].y + Camera.position.y + Camera.size.y / 2);
//         ctx.lineTo(this.verticies[2].x - (Camera.position.x - Camera.size.x / 2), -this.verticies[2].y + Camera.position.y + Camera.size.y / 2);
//         ctx.lineTo(this.verticies[3].x - (Camera.position.x - Camera.size.x / 2), -this.verticies[3].y + Camera.position.y + Camera.size.y / 2);
//         ctx.lineTo(this.verticies[0].x - (Camera.position.x - Camera.size.x / 2), -this.verticies[0].y + Camera.position.y + Camera.size.y / 2);
//         ctx.strokeStyle = "black";
//         ctx.stroke();
//         ctx.closePath();
//         //Test Circle
//         ctx.beginPath();
//         ctx.arc(this.position.x - (Camera.position.x - Camera.size.x / 2), -this.position.y + Camera.position.y + Camera.size.y / 2, 10, 0, 2*Math.PI);
//         ctx.strokeStyle = "black";
//         ctx.stroke();
//         ctx.closePath();
//     }
//     update(){
//         this.updateVerticies();
//         this.calculateRotation();
//     }
//     updateVerticies(){
//         this.verticies[0] = Vector2.add(Vector2.add(this.position, Vector2.multiply(this.dir, -this.size.y / 2)), Vector2.multiply(this.dir.normal(), this.size.x / 2));
//         this.verticies[1] = Vector2.add(Vector2.add(this.position, Vector2.multiply(this.dir, -this.size.y / 2)), Vector2.multiply(this.dir.normal(), -this.size.x / 2));
//         this.verticies[2] = Vector2.add(Vector2.add(this.position, Vector2.multiply(this.dir, this.size.y / 2)), Vector2.multiply(this.dir.normal(), -this.size.x / 2));
//         this.verticies[3] = Vector2.add(Vector2.add(this.position, Vector2.multiply(this.dir, this.size.y / 2)), Vector2.multiply(this.dir.normal(), this.size.x / 2));
//     }
//     calculateRotation(){
//         let rotMat = rotMx(this.angle);
//         this.dir = rotMat.multiplyVec(this.refDir);
//     }
// }
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 300;
const BODIES = [];
const COLLISIONS = [];
let friction = 0;

class Vector2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }  
   
    set(x, y){
        this.x = x;
        this.y = y;
    }

    add(v){
        return new Vector2(this.x+v.x, this.y+v.y);
    }

    subtr(v){
        return new Vector2(this.x-v.x, this.y-v.y);
    }

    mag(){
        return Math.sqrt(this.x**2 + this.y**2);
    }

    mult(n){
        return new Vector2(this.x*n, this.y*n);
    }

    normal(){
        return new Vector2(-this.y, this.x).unit();
    }

    unit(){
        if(this.mag() === 0){
            return new Vector2(0,0);
        } else {
            return new Vector2(this.x/this.mag(), this.y/this.mag());
        }
    }

    drawVec(start_x, start_y, n, color){
        ctx.beginPath();
        ctx.moveTo(start_x, start_y);
        ctx.lineTo(start_x + this.x * n, start_y + this.y * n);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }
    
    static dot(v1, v2){
        return v1.x*v2.x + v1.y*v2.y;
    }

    static cross(v1, v2){
        return v1.x*v2.y - v1.y*v2.x;
    }
}

class Matrix{
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.data = [];

        for (let i = 0; i<this.rows; i++){
            this.data[i] = [];
            for (let j=0; j<this.cols; j++){
                this.data[i][j] = 0;
            }
        }
    }

    multiplyVec(vec){
        let result = new Vector2(0,0);
        result.x = this.data[0][0]*vec.x + this.data[0][1]*vec.y;
        result.y = this.data[1][0]*vec.x + this.data[1][1]*vec.y;
        return result;
    }

    rotMx22(angle){
        this.data[0][0] = Math.cos(angle);
        this.data[0][1] = -Math.sin(angle);
        this.data[1][0] = Math.sin(angle);
        this.data[1][1] = Math.cos(angle);
    }
}

//classes storing the primitive shapes: Line, Circle, Rectangle, Triangle
class Line{
    get pos(){
        return this.gameObject.transform.position;
    }
    set pos(value){
        this.gameObject.transform.position = value;
    }
    constructor(gameObject, x0, y0, x1, y1){
        this.gameObject = gameObject;
        this.vertex = [];
        this.vertex[0] = new Vector2(x0, y0);
        this.vertex[1] = new Vector2(x1, y1);
        this.dir = this.vertex[1].subtr(this.vertex[0]).unit();
        this.mag = this.vertex[1].subtr(this.vertex[0]).mag();
        this.pos = new Vector2((this.vertex[0].x+this.vertex[1].x)/2, (this.vertex[0].y+this.vertex[1].y)/2);
    }

    draw(){
        ctx.beginPath();
        ctx.moveTo(this.vertex[0].x, this.vertex[0].y);
        ctx.lineTo(this.vertex[1].x, this.vertex[1].y);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }
}

class Circle{
    get pos(){
        return this.gameObject.transform.position.add(this.offset);
    }
    set pos(value){
        this.gameObject.transform.position = value.subtr(this.offset);
    }
    constructor(gameObject, x, y, r){
        this.gameObject = gameObject;
        this.offset = new Vector2(x, y);
        this.vertex = [];
        this.r = r;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI);
        ctx.stroke();
        //ctx.fillStyle = "red";
        //ctx.fill();
        ctx.closePath();
    }
}

class Rectangle{
    get pos(){
        return this.gameObject.transform.position;
    }
    set pos(value){
        this.gameObject.transform.position = value;
    }
    constructor(gameObject, x1, y1, x2, y2, w){
        this.gameObject = gameObject;
        this.vertex = [];
        this.vertex[0] = new Vector2(x1, y1);
        this.vertex[1] = new Vector2(x2, y2);
        this.dir = this.vertex[1].subtr(this.vertex[0]).unit();
        this.refDir = this.vertex[1].subtr(this.vertex[0]).unit();
        this.length = this.vertex[1].subtr(this.vertex[0]).mag();
        this.width = w;
        this.vertex[2] = this.vertex[1].add(this.dir.normal().mult(this.width));
        this.vertex[3] = this.vertex[2].add(this.dir.normal().mult(-this.length));
        this.pos = this.vertex[0].add(this.dir.mult(this.length/2)).add(this.dir.normal().mult(this.width/2));
        this.angle = 0;
        this.rotMat = new Matrix(2,2);
    }

    draw(){
        ctx.beginPath();
        ctx.moveTo(this.vertex[0].x, this.vertex[0].y);
        ctx.lineTo(this.vertex[1].x, this.vertex[1].y);
        ctx.lineTo(this.vertex[2].x, this.vertex[2].y);
        ctx.lineTo(this.vertex[3].x, this.vertex[3].y);
        ctx.lineTo(this.vertex[0].x, this.vertex[0].y);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }

    getVertices(){
        this.rotMat.rotMx22(this.angle);
        this.dir = this.rotMat.multiplyVec(this.refDir);
        this.vertex[0] = this.pos.add(this.dir.mult(-this.length/2)).add(this.dir.normal().mult(this.width/2));
        this.vertex[1] = this.pos.add(this.dir.mult(-this.length/2)).add(this.dir.normal().mult(-this.width/2));
        this.vertex[2] = this.pos.add(this.dir.mult(this.length/2)).add(this.dir.normal().mult(-this.width/2));
        this.vertex[3] = this.pos.add(this.dir.mult(this.length/2)).add(this.dir.normal().mult(this.width/2));
    }
}

class Triangle{
    get pos(){
        return this.gameObject.transform.position;
    }
    set pos(value){
        this.gameObject.transform.position = value;
    }
    constructor(gameObject, x1, y1, x2, y2, x3, y3){
        this.gameObject = gameObject;
        this.vertex = [];
        this.vertex[0] = new Vector2(x1, y1);
        this.vertex[1] = new Vector2(x2, y2);
        this.vertex[2] = new Vector2(x3, y3);
        this.pos = new Vector2((this.vertex[0].x+this.vertex[1].x+this.vertex[2].x)/3, (this.vertex[0].y+this.vertex[1].y+this.vertex[2].y)/3);
        this.dir = this.vertex[0].subtr(this.pos).unit();
        this.refDir = this.dir;
        this.refDiam = [];
        this.refDiam[0] = this.vertex[0].subtr(this.pos);
        this.refDiam[1] = this.vertex[1].subtr(this.pos);
        this.refDiam[2] = this.vertex[2].subtr(this.pos);
        this.angle = 0;
        this.rotMat = new Matrix(2,2);
    }

    draw(){
        ctx.beginPath();
        ctx.moveTo(this.vertex[0].x, this.vertex[0].y);
        ctx.lineTo(this.vertex[1].x, this.vertex[1].y);
        ctx.lineTo(this.vertex[2].x, this.vertex[2].y);
        ctx.lineTo(this.vertex[0].x, this.vertex[0].y);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }

    getVertices(){
        this.rotMat.rotMx22(this.angle);
        this.dir = this.rotMat.multiplyVec(this.refDir);
        this.vertex[0] = this.pos.add(this.rotMat.multiplyVec(this.refDiam[0]));
        this.vertex[1] = this.pos.add(this.rotMat.multiplyVec(this.refDiam[1]));
        this.vertex[2] = this.pos.add(this.rotMat.multiplyVec(this.refDiam[2]));
    }
}

//Parent class of the bodies (Ball, Capsule, Box, Star, Wall)
class Body{
    get pos(){

        return this.comp[0].pos;
    }
    set pos(value){
        this.comp[0].pos = value;
    }
    constructor(gameObject, x, y){
        this.gameObject = gameObject;
        this.comp = [];
        this.m = 0;
        this.inv_m = 0;
        this.inertia = 0;
        this.inv_inertia = 0;
        this.elasticity = 1;

        this.vel = new Vector2(0, 0);
        this.acc = new Vector2(0, 0);
        this.acceleration = 1;
        this.angVel = 0;
        this.player = false;
        BODIES.push(this);
    }

    draw(){}
    display(){}
    reposition(){}
    keyControl(){}
}

class Ball extends Body{

    constructor(gameObject, x, y, r, m){
        super();
        this.gameObject = gameObject;

        this.comp = [new Circle(gameObject, x, y, r)];
        this.m = m;
        if (this.m === 0){
            this.inv_m = 0;
        } else {
            this.inv_m = 1 / this.m;
        }
    }

    draw(){
        this.comp[0].draw();
    }

    display(){
        this.vel.drawVec(this.pos.x, this.pos.y, 10, "green");
        ctx.fillStyle = "black";
        ctx.fillText("m = "+this.m, this.pos.x-10, this.pos.y-5);
        ctx.fillText("e = "+this.elasticity, this.pos.x-10, this.pos.y+5);
    }

    reposition(){
        this.acc = this.acc.unit().mult(this.acceleration);
        this.vel = this.vel.add(this.acc);
        this.vel = this.vel.mult(1-friction);
        this.comp[0].pos = this.comp[0].pos.add(this.vel);
    }

    keyControl(){
        if(keysPressed["a"]){
            this.acc.x = -this.acceleration;
        }
        if(keysPressed["w"]){
            this.acc.y = -this.acceleration;
        }
        if(keysPressed["d"]){
            this.acc.x = this.acceleration;
        }
        if(keysPressed["s"]){
            this.acc.y = this.acceleration;
        }
        if(!keysPressed["a"] && !keysPressed["d"]){
            this.acc.x = 0;
        }
        if(!keysPressed["w"] && !keysPressed["s"]){
            this.acc.y = 0;
        }
    }
}

class Capsule extends Body{
    get pos(){

        return this.gameObject.transform.position;
    }
    set pos(value){
        this.gameObject.transform.pos = value;
    }
    constructor(gameObject, x1, y1, x2, y2, r, m){
        super();
        this.gameObject = gameObject;

        this.comp = [new Circle(gameObject, x1, y1, r), new Circle(gameObject, x2, y2, r)];
        let recV1 = this.comp[1].pos.add(this.comp[1].pos.subtr(this.comp[0].pos).unit().normal().mult(r));

        let recV2 = this.comp[0].pos.add(this.comp[1].pos.subtr(this.comp[0].pos).unit().normal().mult(r));
        this.comp.unshift(new Rectangle(gameObject, recV1.x, recV1.y, recV2.x, recV2.y, 2*r));
        console.log(this.comp[0].dir);
        this.m = m;
        if (this.m === 0){
            this.inv_m = 0;
        } else {
            this.inv_m = 1 / this.m;
        }
        this.inertia = this.m * ((2*this.comp[0].width)**2 +(this.comp[0].length+2*this.comp[0].width)**2) / 12;
        if (this.m === 0){
            this.inv_inertia = 0;
        } else {
            this.inv_inertia = 1 / this.inertia;
        }
    }

    draw(){
        this.comp[0].draw();
        this.comp[1].draw();
        this.comp[2].draw();
    }

    keyControl(){
        if(keysPressed["w"]){
            this.acc = this.comp[0].dir.mult(-this.acceleration);
        }
        if(keysPressed["s"]){
            this.acc = this.comp[0].dir.mult(this.acceleration);
        }
        if(keysPressed["a"]){
            this.angVel = -0.1;
        }
        if(keysPressed["d"]){
            this.angVel = 0.1;
        }
        if(!keysPressed["w"] && !keysPressed["s"]){
            this.acc = new Vector2(0, 0);
        }
    }

    reposition(){
        this.acc = this.acc.unit().mult(this.acceleration);
        this.vel = this.vel.add(this.acc);
        this.vel = this.vel.mult(1-friction);
        this.comp[0].pos = this.comp[0].pos.add(this.vel);
        this.angVel *= 1;
        this.comp[0].angle += this.angVel;
        this.comp[0].getVertices();
        this.comp[1].offset = this.comp[0].pos.add(this.comp[0].dir.mult(-this.comp[0].length/2));
        this.comp[2].offset = this.comp[0].pos.add(this.comp[0].dir.mult(this.comp[0].length/2));
    }
}

class Box extends Body{
    constructor(gameObject, x1, y1, x2, y2, w, m){
        super();
        this.comp = [new Rectangle(x1, y1, x2, y2, w)];
        this.m = m;
        if (this.m === 0){
            this.inv_m = 0;
        } else {
            this.inv_m = 1 / this.m;
        }
        this.inertia = this.m * (this.comp[0].width**2 +this.comp[0].length**2) / 12;
        if (this.m === 0){
            this.inv_inertia = 0;
        } else {
            this.inv_inertia = 1 / this.inertia;
        }
    }

    draw(){
        this.comp[0].draw();
    }

    keyControl(){
        if(keysPressed["w"]){
            this.acc = this.comp[0].dir.mult(-this.acceleration);;
        }
        if(keysPressed["s"]){
            this.acc = this.comp[0].dir.mult(this.acceleration);;
        }
        if(keysPressed["a"]){
            this.angVel = -0.1;
        }
        if(keysPressed["d"]){
            this.angVel = 0.1;
        }
        if(!keysPressed["w"] && !keysPressed["s"]){
            this.acc = new Vector2(0, 0);
        }
    }

    reposition(){
        this.acc = this.acc.unit().mult(this.acceleration);
        this.vel = this.vel.add(this.acc);
        this.vel = this.vel.mult(1-friction);
        this.comp[0].pos = this.comp[0].pos.add(this.vel);
        this.angVel *= 1;
        this.comp[0].angle += this.angVel;
        this.comp[0].getVertices();
    }
}

class Star extends Body{
    constructor(gameObject, x1, y1, r, m){
        super();
        this.comp = [];
        this.r = r;
        let center = new Vector2(x1, y1);
        let upDir = new Vector2(0, -1);
        let p1 = center.add(upDir.mult(r));
        let p2 = center.add(upDir.mult(-r/2)).add(upDir.normal().mult(-r*Math.sqrt(3)/2));
        let p3 = center.add(upDir.mult(-r/2)).add(upDir.normal().mult(r*Math.sqrt(3)/2));
        this.comp.push(new Triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));
        p1 = center.add(upDir.mult(-r));
        p2 = center.add(upDir.mult(r/2)).add(upDir.normal().mult(-r*Math.sqrt(3)/2));
        p3 = center.add(upDir.mult(r/2)).add(upDir.normal().mult(r*Math.sqrt(3)/2));
        this.comp.push(new Triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));
        
        this.m = m;
        if (this.m === 0){
            this.inv_m = 0;
        } else {
            this.inv_m = 1 / this.m;
        }
        this.inertia = this.m * ((2*this.r)**2) / 12;
        if (this.m === 0){
            this.inv_inertia = 0;
        } else {
            this.inv_inertia = 1 / this.inertia;
        }
    }

    draw(){
        this.comp[0].draw();
        this.comp[1].draw();
    }

    keyControl(){
        if(UP){
            this.acc = this.comp[0].dir.mult(-this.acceleration);
        }
        if(DOWN){
            this.acc = this.comp[0].dir.mult(this.acceleration);
        }
        if(keysPressed["a"]){
            this.angVel = -0.1;
        }
        if(RIGHT){
            this.angVel = 0.1;
        }
        if(!UP && !DOWN){
            this.acc.set(0,0);
        }
    }

    reposition(){
        this.acc = this.acc.unit().mult(this.acceleration);
        this.vel = this.vel.add(this.acc);
        this.vel = this.vel.mult(1-friction);
        this.angVel *= 1;
        this.comp[0].pos = this.comp[0].pos.add(this.vel);
        this.comp[0].angle += this.angVel;
        this.comp[0].getVertices();
        this.comp[1].pos = this.comp[0].pos;
        this.comp[1].angle += this.angVel;
        this.comp[1].getVertices();
    }
}

class Wall extends Body{
    constructor(gameObject, x1, y1, x2, y2){
        super();
        this.gameObject = gameObject;
        this.comp = [new Line(gameObject, x1, y1, x2, y2)];
    }

    draw(){
        this.comp[0].draw();
    }
}

//Collision manifold, consisting the data for collision handling
//Manifolds are collected in an array for every frame
class CollData{
    constructor(o1, o2, normal, pen, cp){
        this.o1 = o1;
        this.o2 = o2;
        this.normal = normal;
        this.pen = pen;
        this.cp = cp;
    }

    penRes(){
        let penResolution = this.normal.mult(this.pen / (this.o1.inv_m + this.o2.inv_m));
        this.o1.comp[0].pos = this.o1.comp[0].pos.add(penResolution.mult(this.o1.inv_m));
        this.o2.comp[0].pos = this.o2.comp[0].pos.add(penResolution.mult(-this.o2.inv_m));
    }

    collRes(){
        //1. Closing velocity
        let collArm1 = this.cp.subtr(this.o1.comp[0].pos);
        let rotVel1 = new Vector2(-this.o1.angVel * collArm1.y, this.o1.angVel * collArm1.x);
        let closVel1 = this.o1.vel.add(rotVel1);
        let collArm2 = this.cp.subtr(this.o2.comp[0].pos);
        let rotVel2= new Vector2(-this.o2.angVel * collArm2.y, this.o2.angVel * collArm2.x);
        let closVel2 = this.o2.vel.add(rotVel2);

        //2. Impulse augmentation
        let impAug1 = Vector2.cross(collArm1, this.normal);
        impAug1 = impAug1 * this.o1.inv_inertia * impAug1;
        let impAug2 = Vector2.cross(collArm2, this.normal);
        impAug2 = impAug2 * this.o2.inv_inertia * impAug2;

        let relVel = closVel1.subtr(closVel2);
        let sepVel = Vector2.dot(relVel, this.normal);
        let new_sepVel = -sepVel * Math.min(this.o1.elasticity, this.o2.elasticity);
        let vsep_diff = new_sepVel - sepVel;

        let impulse = vsep_diff / (this.o1.inv_m + this.o2.inv_m + impAug1 + impAug2);
        let impulseVec = this.normal.mult(impulse);

        //3. Changing the velocities
        this.o1.vel = this.o1.vel.add(impulseVec.mult(this.o1.inv_m));
        this.o2.vel = this.o2.vel.add(impulseVec.mult(-this.o2.inv_m));

        this.o1.angVel += this.o1.inv_inertia * Vector2.cross(collArm1, impulseVec);
        this.o2.angVel -= this.o2.inv_inertia * Vector2.cross(collArm2, impulseVec); 
    }
}

// //Event listeners for the arrow keys
// function userInput(){
//     canvas.addEventListener('keydown', function(e){
//         if(e.keyCode === 37){
//             keysPressed["a"] = true;
//         }
//         if(e.keyCode === 38){
//             UP = true;
//         }
//         if(e.keyCode === 39){
//             RIGHT = true;
//         }
//         if(e.keyCode === 40){
//             DOWN = true;
//         }
//     });
    
//     canvas.addEventListener('keyup', function(e){
//         if(e.keyCode === 37){
//             keysPressed["a"] = false;
//         }
//         if(e.keyCode === 38){
//             UP = false;
//         }
//         if(e.keyCode === 39){
//             RIGHT = false;
//         }
//         if(e.keyCode === 40){
//             DOWN = false;
//         }
//     });    
// }

function round(number, precision){
    let factor = 10**precision;
    return Math.round(number * factor) / factor;
}

function randInt(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min;
}

function testCircle(x, y, color="black"){
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2*Math.PI);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
}

function closestPointOnLS(p, w1){
    let ballToWallStart = w1.start.subtr(p);
    if(Vector2.dot(w1.dir, ballToWallStart) > 0){
        return w1.start;
    }

    let wallEndToBall = p.subtr(w1.end);
    if(Vector2.dot(w1.dir, wallEndToBall) > 0){
        return w1.end;
    }

    let closestDist = Vector2.dot(w1.dir, ballToWallStart);
    let closestVect = w1.dir.mult(closestDist);
    return w1.start.subtr(closestVect);
}

//Separating axis theorem on two objects
//Returns with the details of the Minimum Translation Vector2 (or false if no collision)
function sat(o1, o2){
    let minOverlap = null;
    let smallestAxis;
    let vertexObj;

    let axes = findAxes(o1, o2);
    let proj1, proj2 = 0;
    let firstShapeAxes = getShapeAxes(o1);

    for(let i=0; i<axes.length; i++){
        proj1 = projShapeOntoAxis(axes[i], o1);
        proj2 = projShapeOntoAxis(axes[i], o2);
        let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
        if (overlap < 0){
            return false;
        }

        if((proj1.max > proj2.max && proj1.min < proj2.min) ||
          (proj1.max < proj2.max && proj1.min > proj2.min)){
              let mins = Math.abs(proj1.min - proj2.min);
              let maxs = Math.abs(proj1.max - proj2.max);
              if (mins < maxs){
                  overlap += mins;
              } else {
                  overlap += maxs;
                  axes[i] = axes[i].mult(-1);
              }
          }

        if (overlap < minOverlap || minOverlap === null){
            minOverlap = overlap;
            smallestAxis = axes[i];
            if (i<firstShapeAxes){
                vertexObj = o2;
                if(proj1.max > proj2.max){
                    smallestAxis = axes[i].mult(-1);
                }
            } else {
                vertexObj = o1;
                if(proj1.max < proj2.max){
                    smallestAxis = axes[i].mult(-1);
                }
            }
        }  
    };

    let contactVertex = projShapeOntoAxis(smallestAxis, vertexObj).collVertex;
    //smallestAxis.drawVec(contactVertex.x, contactVertex.y, minOverlap, "blue");

    if(vertexObj === o2){
        smallestAxis = smallestAxis.mult(-1);
    }

    return {
        pen: minOverlap,
        axis: smallestAxis,
        vertex: contactVertex
    }
}

//Helping functions for the SAT below
//returns the min and max projection values of a shape onto an axis
function projShapeOntoAxis(axis, obj){
    setBallVerticesAlongAxis(obj, axis);
    let min = Vector2.dot(axis, obj.vertex[0]);
    let max = min;
    let collVertex = obj.vertex[0];
    for(let i=0; i<obj.vertex.length; i++){
        let p = Vector2.dot(axis, obj.vertex[i]);
        if(p<min){
            min = p;
            collVertex = obj.vertex[i];
        } 
        if(p>max){
            max = p;
        }
    }
    return {
        min: min,
        max: max, 
        collVertex: collVertex
    }
}

//finds the projection axes for the two objects
function findAxes(o1, o2){
    let axes = [];
    if(o1 instanceof Circle && o2 instanceof Circle){
        axes.push(o2.pos.subtr(o1.pos).unit());
        return axes;
    }
    if(o1 instanceof Circle){
        axes.push(closestVertexToPoint(o2, o1.pos).subtr(o1.pos).unit());
    }
    if(o1 instanceof Line){
        axes.push(o1.dir.normal());
    }   
    if (o1 instanceof Rectangle){
        axes.push(o1.dir.normal());
        axes.push(o1.dir);
    }
    if (o1 instanceof Triangle){
        axes.push(o1.vertex[1].subtr(o1.vertex[0]).normal());
        axes.push(o1.vertex[2].subtr(o1.vertex[1]).normal());
        axes.push(o1.vertex[0].subtr(o1.vertex[2]).normal());
    }
    if (o2 instanceof Circle){
        axes.push(closestVertexToPoint(o1, o2.pos).subtr(o2.pos).unit());
    }
    if (o2 instanceof Line){
        axes.push(o2.dir.normal());
    }   
    if (o2 instanceof Rectangle){
        axes.push(o2.dir.normal());
        axes.push(o2.dir);
    }
    if (o2 instanceof Triangle){
        axes.push(o2.vertex[1].subtr(o2.vertex[0]).normal());
        axes.push(o2.vertex[2].subtr(o2.vertex[1]).normal());
        axes.push(o2.vertex[0].subtr(o2.vertex[2]).normal());
    }
    return axes;
}

//iterates through an objects vertices and returns the one that is the closest to the given point
function closestVertexToPoint(obj, p){
    let closestVertex;
    let minDist = null;
    for(let i=0; i<obj.vertex.length; i++){
        if(p.subtr(obj.vertex[i]).mag() < minDist || minDist === null){
            closestVertex = obj.vertex[i];
            minDist = p.subtr(obj.vertex[i]).mag();
        }
    }
    return closestVertex;
}

//returns the number of the axes that belong to an object
function getShapeAxes(obj){
    if(obj instanceof Circle || obj instanceof Line){
        return 1;
    }
    if(obj instanceof Rectangle){
        return 2;
    }
    if(obj instanceof Triangle){
        return 3;
    }
}

//the ball vertices always need to be recalculated based on the current projection axis direction
function setBallVerticesAlongAxis(obj, axis){
    if(obj instanceof Circle){
        obj.vertex[0] = obj.pos.add(axis.unit().mult(-obj.r));
        obj.vertex[1] = obj.pos.add(axis.unit().mult(obj.r));
    }
}
//Thats it for the SAT and its support functions

//Prevents objects to float away from the canvas
function putWallsAroundCanvas(){
    let wallsGameobject = new GameObject();
    let edge1 = new Wall(wallsGameobject, 0, 0, canvas.clientWidth, 0);
    let edge2 = new Wall(wallsGameobject, canvas.clientWidth, 0, canvas.clientWidth, canvas.clientHeight);
    let edge3 = new Wall(wallsGameobject, canvas.clientWidth, canvas.clientHeight, 0, canvas.clientHeight);
    let edge4 = new Wall(wallsGameobject, 0, canvas.clientHeight, 0, 0);
}

// //Game loop (60 frames per second)
// function mainLoop(timestamp) {
//     ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
//     // userInput();
//     COLLISIONS.length = 0;
    
//     BODIES.forEach((b) => {
//         b.draw();
//         b.display();
//         if(b.player){
//             b.keyControl();
//         };
//         b.reposition();
//     })
    
//     BODIES.forEach((b, index) => {
//         for(let bodyPair = index+1; bodyPair < BODIES.length; bodyPair++){
//             let bestSat = {
//                 pen: null,
//                 axis: null,
//                 vertex: null
//             }
//             for(let o1comp=0; o1comp<BODIES[index].comp.length; o1comp++){
//                 for(let o2comp=0; o2comp<BODIES[bodyPair].comp.length; o2comp++){
//                     if(sat(BODIES[index].comp[o1comp], BODIES[bodyPair].comp[o2comp]).pen > bestSat.pen){
//                         bestSat = sat(BODIES[index].comp[o1comp], BODIES[bodyPair].comp[o2comp]);
//                         ctx.fillText("COLLISION", 500, 400);
//                     }
//                 }
//             }

//             if(bestSat.pen !== null){
//                 COLLISIONS.push(new CollData(BODIES[index], BODIES[bodyPair], bestSat.axis, bestSat.pen, bestSat.vertex));
//            }
//         }
//     });

//     COLLISIONS.forEach((c) => {
//         c.penRes();
//         c.collRes();
//     });

//     requestAnimationFrame(mainLoop);
// }

// //Setting up the initial environment before starting the main loop
// putWallsAroundCanvas();

// //Creating 10 body object with random arguments
// // for(let addBody = 0; addBody < 10; addBody++){
// //     let x0 = randInt(100, canvas.clientWidth-100);
// //     let y0 = randInt(100, canvas.clientHeight-100);
// //     let x1 = x0 + randInt(-50, 50);
// //     let y1 = y0 + randInt(-50, 50);
// //     let r = randInt(10, 30);
// //     let m = randInt(0, 10);
// //     if(addBody%4 === 0){
// //         let ballObj = new Ball(x0, y0, r, m);
// //     }
// //     if(addBody%4 === 1){
// //         let boxObj = new Box(x0, y0, x1, y1, r, m);
// //     }
// //     if(addBody%4 === 2){
// //         let capsObj = new Capsule(x0, y0, x1, y1, r, m);
// //     }
// //     if(addBody%4 === 3){
// //         let starObj = new Star(x0, y0, r+20, m);
// //     }
// // };

// requestAnimationFrame(mainLoop);