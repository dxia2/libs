
function pen_res_bb(b1, b2){
    let dist = Vector2.subtract(b1.position, b2.position);
    let pen_depth = b1.radius + b2.radius - dist.getMagnitude();
    let pen_res = Vector2.multiply(dist.unit(), pen_depth / (b1.inv_m + b2.inv_m));

    // b1.calculatePosition();
    // b2.calculatePosition();

    b1.position = (Vector2.add(b1.position, Vector2.multiply(pen_res, b1.inv_m)));
    b2.position = (Vector2.add(b2.position, Vector2.multiply(pen_res, -b2.inv_m)));
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
    b1.position = Vector2.add(b1.position, Vector2.multiply(penVect.unit(), b1.radius - penVect.getMagnitude()));
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
    let impAug2 = Vector2.cross(collArm2, normal);
    impAug2 = impAug2 * c2.inv_inertia * impAug2;
    let impAug1 = Vector2.cross(collArm1, normal);
    impAug1 = impAug1 * c1.inv_inertia * impAug1;

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
// Separating axis theorem
function sat(o1, o2){
    let minOverlap = null;
    let smallestAxis;
    let vertexObj;

    let axes = findAxes(o1, o2);
    let proj1, proj2 = 0;
    let firstShapeAxes = getShapeAxes(o1);

    for(let i = 0; i < axes.length; i++){
        proj1 = projShapeOntoAxis(axes[i], o1);
        proj2 = projShapeOntoAxis(axes[i], o2);
        let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
        if(overlap < 0){
            return false;
        }

        if((proj1.max > proj2.max && proj1.min < proj2.min) || 
        (proj1.max < proj2.max && proj1.min > proj2.min)){
            let mins = Math.abs(proj1.min - proj2.min);
            let maxs = Math.abs(proj1.max - proj2.max);
            if(mins < maxs){
                overlap += mins;
            }else{
                overlap += maxs;
                axes[i] = Vector2.multiply(axes[i], -1);
            }
        }

        if(overlap < minOverlap || minOverlap === null){
            minOverlap = overlap;
            smallestAxis = axes[i];
            if(i < firstShapeAxes){
                vertexObj = o2;
                if(proj1.max > proj2.max){
                    smallestAxis = Vector2.multiply(axes[i], -1);
                }
            }else{
                vertexObj = o1;
                if(proj1.max < proj2.max){
                    smallestAxis = Vector2.multiply(axes[i], -1);
                }
            }
        }
    }

   

    let contactVertex = projShapeOntoAxis(smallestAxis, vertexObj).collVertex;
    //smallestAxis.drawVec(contactVertex.x, contactVertex.y, minOverlap, "blue");

    if(vertexObj === o2){
        smallestAxis = Vector2.multiply(smallestAxis, -1);
    }

    return {
        pen: minOverlap,
        axis: smallestAxis,
        vertex: contactVertex
    }
}


function findAxes(o1, o2){
    let axes = [];
    if(o1 instanceof Circle && o2 instanceof Circle){
        axes.push(Vector2.subtract(o2.position, o1.position).unit());
        return axes;
    }
    if(o1 instanceof Circle){
        axes.push(Vector2.subtract(closestVertexToPoint(o2, o1.position), o1.position).unit());
        axes.push(o2.dir.normal());
        if(o2 instanceof Rectangle){
            axes.push(o2.dir);
        }
        return axes;
    }
    if(o2 instanceof Circle){
        axes.push(o1.dir.normal());
        if(o1 instanceof Rectangle){
            axes.push(o1.dir);
        }
        axes.push(Vector2.subtract(closestVertexToPoint(o1, o2.position), o2.position).unit());

        return axes;
    }
    axes.push(o1.dir.normal());
    if(o1 instanceof Rectangle){
        axes.push(o1.dir);
    }
    axes.push(o2.dir.normal());
    if(o2 instanceof Rectangle){
        axes.push(o2.dir);
    }

    return axes;
}

function getShapeAxes(obj){
    if(obj instanceof Circle || obj instanceof Line){
        return 1;
    }
    if(obj instanceof Rectangle){
        return 2;
    }
}

function setBallVerticiesAlongAxis(obj, axis){
    if(obj instanceof Circle){
        obj.verticies[0] = Vector2.add(obj.position, Vector2.multiply(axis.unit(), -obj.radius));
        obj.verticies[1] = Vector2.add(obj.position, Vector2.multiply(axis.unit(), obj.radius));
    }
}

function closestVertexToPoint(obj, p){
    let closestVertex;
    let minDist = null;
    for(let i = 0; i < obj.verticies.length; i++){
        if(Vector2.subtract(p, obj.verticies[i]).getMagnitude() < minDist || minDist === null){
            closestVertex = obj.verticies[i];
            minDist = Vector2.subtract(p, obj.verticies[i]).getMagnitude(); 
        }
    }

    return closestVertex;
}

function projShapeOntoAxis(axis, obj){
    setBallVerticiesAlongAxis(obj, axis);
    let min = Vector2.dot(axis, obj.verticies[0]);
    let max = min;
    let collVertex = obj.verticies[0];
    for(let i = 0; i < obj.verticies.length; i++){
        let p = Vector2.dot(axis, obj.verticies[i]);
        if(p < min){
            min = p;
            collVertex = obj.verticies[i];
        }
        if(p > max){
            max = p;
        }
    }

    return{
        min: min,
        max: max,
        collVertex: collVertex
    }
}

function rotMx(angle){
    let mx = new Matrix(2, 2);
    mx.data[0][0] = Math.cos(angle);
    mx.data[0][1] = -Math.sin(angle);
    mx.data[1][0] = Math.sin(angle);
    mx.data[1][1] = Math.cos(angle);
    return mx;
}

class Body{
    get position(){
        return this.comp[0].position;
    }
    set position(value){
        this.comp[0].position = value;
    }
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

    static BODIES = [];
    constructor(gameObject){
        this.gameObject = gameObject;
        this.comp = [];
        this.mass = 1;
        this.inertia = 0;
        this.elasticity = 0;
        this.drag = 0.5;

        this.velocity = new Vector2(0, 0);
        this.acceleration = new Vector2(0, 0);
        this.angVel = 0;
        Body.BODIES.push(this);
    }

    draw(){

    }

    display(){

    }

    update(){

    }
}

class Ball extends Body{

    constructor(gameObject, offset, radius, velocity, acceleration, drag, mass){
        super(gameObject);
        this.drag = drag;
        this.mass = mass;
        this.comp = [new Circle(gameObject, offset, radius)];
        this.update();
    }

    update(){
        this.updateVelocity();
        this.updateComponentPos();
    }

    updateVelocity(){
        this.velocity.x *= 1-this.drag * deltaTime;
        this.velocity.y *= 1-this.drag * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
    }
    updateComponentPos(){
        this.comp[0].position = Vector2.add(this.comp[0].position, Vector2.multiply(this.velocity, deltaTime));
    }
    display(){
        Vector2.drawVec(this.position, Vector2.add(this.position, this.velocity), "green");
        Vector2.drawVec(this.position, Vector2.add(this.position, this.acceleration), "blue");
        Vector2.drawVec(this.position, Vector2.add(Vector2.multiply(this.acceleration.normal(), 50), this.position), "red");
        ctx.fillStyle = "black";
        ctx.fillText("m = " + this.mass, this.position.x - (Camera.position.x - Camera.size.x / 2), -(this.position.y - Camera.position.y - Camera.size.y / 2))
        ctx.fillText("e = " + this.elasticity, this.position.x - (Camera.position.x - Camera.size.x / 2), -(this.position.y - 10 - Camera.position.y - Camera.size.y / 2))
    }
    draw(){
        this.comp[0].draw();
    }
}

class Wall extends Body{

    constructor(gameObject, start, end){
        super(gameObject);
        this.mass = 0;
        this.comp = [new Line(gameObject, start, end)];

    }

    update(){
        this.comp[0].update();
    }

    draw(){
        this.comp[0].draw();
    }
}

class Capsule extends Body{
    gameObject;
    radius;

    length;
    constructor(gameObject, length, offset, radius, drag, mass){
        super(gameObject);
        this.gameObject = gameObject;
        this.radius = radius;
        this.mass = mass;
        this.drag = drag;

        let start = new Vector2(offset.x, offset.y + (length / 2));
        let end = new Vector2(offset.x, offset.y - (length / 2));
        this.length = Vector2.subtract(end, start).getMagnitude();

        this.comp = [new Circle(gameObject, start, radius), new Circle(gameObject, end, radius)];
        
        this.comp.unshift(new Rectangle(gameObject, offset, new Vector2(this.radius * 2, this.length)));
    }

    draw(){
        this.comp[0].draw();
        this.comp[1].draw();
        this.comp[2].draw();

    }

    update(){
        this.updateVelocity();
        this.updatePosition();
        this.comp[0].update();
        // this.comp[1].update();
        // this.comp[2].update();
    }

    updateVelocity(){
        this.velocity.x *= 1-this.drag * deltaTime;
        this.velocity.y *= 1-this.drag * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.comp[0].angle += this.angVel * deltaTime;
        this.angVel *= 0.96;

    }

    updatePosition(){
        this.comp[0].position = Vector2.add(this.comp[0].position, Vector2.multiply(this.velocity, deltaTime));
        let start = Vector2.multiply(this.comp[0].dir, this.length / 2);
        let end = Vector2.multiply(this.comp[0].dir, -this.length / 2);
        this.comp[1].offset = start;
        this.comp[2].offset = end;
    }
}
class Box extends Body{
    size;
    get angle(){
        return ExtendedMath.degToRad(this.gameObject.transform.rotation);
    }

    set angle(value){
        this.gameObject.transform.rotation = ExtendedMath.radToDeg(value);
    }
    constructor(gameObject, offset, size, mass, drag){
        super(gameObject);
        this.mass = mass;
        this.comp = [new Rectangle(gameObject, offset, size)];
        this.size = size;
        this.update();
    }

    update(){
        this.updateVelocity();
        this.updatePosition();
        this.comp[0].update();
    }

    draw(){
        this.comp[0].draw();
    }

    updateVelocity(){
        this.velocity.x *= 1-this.drag * deltaTime;
        this.velocity.y *= 1-this.drag * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.comp[0].angle += this.angVel * deltaTime;
        this.angVel *= 0.96;
    }

    updatePosition(){
        this.comp[0].position = Vector2.add(this.comp[0].position, Vector2.multiply(this.velocity, deltaTime));
    }
}

class Line{
    gameObject;
    localStart;
    localEnd;

    verticies = [];

    get start(){
        return Vector2.add(this.gameObject.transform.position, this.localStart);
    }
    get end(){
        return Vector2.add(this.gameObject.transform.position, this.localEnd);
    }
    get dir(){
        return Vector2.subtract(this.localEnd, this.localStart).unit();
    }

    set start(value){
        this.localStart = Vector2.subtract(value, this.gameObject.transform.position);
    }

    set end(value){
        this.localEnd = Vector2.subtract(value, this.gameObject.transform.position);
    }

    get position(){
        let midPoint = new Vector2((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2);
        return this.gameObject.transform.position;
        return midPoint;
    }
    set position(value){
        // let midPoint = new Vector2((this.localStart.x + this.localEnd.x) / 2, (this.localStart.y + this.localEnd.y) / 2);
        // this.gameObject.transform.position = Vector2.add(midPoint, value);
        this.gameObject.transform.position = value;
    }
    constructor(gameObject, start, end){
        this.gameObject = gameObject;
        this.localStart = start;
        this.localEnd = end;
        this.verticies = [this.start, this.end];
    }

    update(){
        this.verticies = [this.start, this.end];
    }

    draw(){
        ctx.beginPath();
        ctx.moveTo(this.verticies[0].x - (Camera.position.x - Camera.size.x / 2), -this.verticies[0].y + Camera.position.y + Camera.size.y / 2);
        ctx.lineTo(this.verticies[1].x - (Camera.position.x - Camera.size.x / 2), -this.verticies[1].y + Camera.position.y + Camera.size.y / 2);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }
}

class Circle{
    get position(){
        return Vector2.add(this.gameObject.transform.position, this.offset);
    }
    set position(value){
        this.gameObject.transform.position = Vector2.subtract(value, this.offset);
    }
    constructor(gameObject, offset, radius){
        this.gameObject = gameObject;
        this.offset = offset;
        this.verticies = [];
        this.radius = radius;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.position.x - (Camera.position.x - Camera.size.x / 2), -this.position.y + Camera.position.y + Camera.size.y / 2, this.radius, 0, 2*Math.PI);
        ctx.stroke();
        // ctx.fillStyle = "red";
        // ctx.fill();
        ctx.closePath();
    }
}

class Rectangle{
    get position(){
        return Vector2.add(this.gameObject.transform.position, this.offset);
    }
    set position(value){
        this.gameObject.transform.position = Vector2.subtract(value, this.offset);
    }

    get angle(){
        return ExtendedMath.degToRad(this.gameObject.transform.rotation);
    }

    set angle(value){
        this.gameObject.transform.rotation = ExtendedMath.radToDeg(value);
    }
    constructor(gameObject, offset, size){
        this.gameObject = gameObject;
        this.offset = offset;
        this.size = size;
        this.verticies = [];
        this.dir = new Vector2(0, 1);
        this.refDir = new Vector2(0, 1);
        this.rotMat = new Matrix(2, 2);
        this.update();
    }

    draw(){
        ctx.beginPath();
        ctx.moveTo(this.verticies[0].x - (Camera.position.x - Camera.size.x / 2), -this.verticies[0].y + Camera.position.y + Camera.size.y / 2);
        ctx.lineTo(this.verticies[1].x - (Camera.position.x - Camera.size.x / 2), -this.verticies[1].y + Camera.position.y + Camera.size.y / 2);
        ctx.lineTo(this.verticies[2].x - (Camera.position.x - Camera.size.x / 2), -this.verticies[2].y + Camera.position.y + Camera.size.y / 2);
        ctx.lineTo(this.verticies[3].x - (Camera.position.x - Camera.size.x / 2), -this.verticies[3].y + Camera.position.y + Camera.size.y / 2);
        ctx.lineTo(this.verticies[0].x - (Camera.position.x - Camera.size.x / 2), -this.verticies[0].y + Camera.position.y + Camera.size.y / 2);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
        //Test Circle
        ctx.beginPath();
        ctx.arc(this.position.x - (Camera.position.x - Camera.size.x / 2), -this.position.y + Camera.position.y + Camera.size.y / 2, 10, 0, 2*Math.PI);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }
    update(){
        this.updateVerticies();
        this.calculateRotation();
    }
    updateVerticies(){
        this.verticies[0] = Vector2.add(Vector2.add(this.position, Vector2.multiply(this.dir, -this.size.y / 2)), Vector2.multiply(this.dir.normal(), this.size.x / 2));
        this.verticies[1] = Vector2.add(Vector2.add(this.position, Vector2.multiply(this.dir, -this.size.y / 2)), Vector2.multiply(this.dir.normal(), -this.size.x / 2));
        this.verticies[2] = Vector2.add(Vector2.add(this.position, Vector2.multiply(this.dir, this.size.y / 2)), Vector2.multiply(this.dir.normal(), -this.size.x / 2));
        this.verticies[3] = Vector2.add(Vector2.add(this.position, Vector2.multiply(this.dir, this.size.y / 2)), Vector2.multiply(this.dir.normal(), this.size.x / 2));
    }
    calculateRotation(){

        let rotMat = rotMx(this.angle);
        this.dir = rotMat.multiplyVec(this.refDir);
    }
}