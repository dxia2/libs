const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let pepeImg = document.getElementById("pepe");
let circleImg = document.getElementById("circle");

Camera.initialize(canvas, ctx, new Vector2(0, 0), new Vector2(600, 400))

let ball1 = new GameObject();
// ball1.addComponent(new SpriteRenderer(ball1, ctx, circleImg, 50, 50));
ball1.addComponent(new Ball(ball1, new Vector2(0, 0), 25, new Vector2(0, 0), new Vector2(0, 0), 0.6, 2));
ball1.transform.position = new Vector2(0, 100);
ball1.getComponent(Ball).velocity.y += 5;

let ball2 = new GameObject();
// ball2.addComponent(new SpriteRenderer(ball2, ctx, circleImg, 50, 50));
ball2.addComponent(new Ball(ball2, new Vector2(0, 0), 25, new Vector2(0, 0), new Vector2(0, 0), 0.6, 2));
ball2.transform.position = new Vector2(50, 150);

let ball3 = new GameObject();
ball3.transform.position.x += 50
// ball3.addComponent(new SpriteRenderer(ball3, ctx, circleImg, 100, 100));
ball3.addComponent(new Ball(ball3, new Vector2(0, 0), 50, new Vector2(0, 0), new Vector2(0, 0), 0.6, 10));

let wall1 = new GameObject();
wall1.addComponent(new Wall(wall1, new Vector2(-300, 200), new Vector2(-300, -200)));
wall1.name = "wall1";

let wall2 = new GameObject();
wall2.addComponent(new Wall(wall2, new Vector2(300, 200), new Vector2(300, -200)));
wall2.name = "wall2";

let wall3 = new GameObject();
wall3.addComponent(new Wall(wall3, new Vector2(-300, -200), new Vector2(300, -200)));

let wall4 = new GameObject();
wall4.addComponent(new Wall(wall4, new Vector2(-300, 200), new Vector2(300, 200)));

let wall5 = new GameObject();
wall5.addComponent(new Wall(wall5, new Vector2(-50, 0), new Vector2(50, 0)));
let wall5wall = wall5.getComponent(Wall);

let wall6 = new GameObject();
wall6.addComponent(new Wall(wall6, new Vector2(50, 50), new Vector2(0, -50)));

wall6.transform.position.x -= 100;

let caps1 = new GameObject();
caps1.transform.position.y = 150;
caps1.transform.position.x = 250;

caps1.addComponent(new Capsule(caps1, 100, new Vector2(0, 0), 40, 0.6, 3));
caps1.getComponent(Capsule).angle = 90 / (180 /  Math.PI);

let caps2 = new GameObject();
caps2.transform.position.y = 0;
caps2.transform.position.x = 200;
caps2.addComponent(new Capsule(caps2, 100, new Vector2(0, 0), 40, 0.6, 3));

//CREATE BOX AND TEST
let box1 = new GameObject();
box1.addComponent(new Box(box1, new Vector2(0, 0), new Vector2(100, 50), 5, 0.6));
box1.transform.position.x -= 150;

let box2 = new GameObject();
box2.addComponent(new Box(box2, new Vector2(0, 0), new Vector2(50, 100), 5, 0.6));

let gameIsRunning = true;
let moveSpeed = 250;

let distanceVec = new Vector2(0, 0);
requestAnimationFrame(update);
function update(){

    ball1.getComponent(Ball).acceleration.x = 0;
    ball1.getComponent(Ball).acceleration.y = 0;

    // Key control WASD
    // if(keysPressed["a"]){
    //     ball1.getComponent(Ball).acceleration.x = -moveSpeed;
    // }
    // if(keysPressed["d"]){
    //     ball1.getComponent(Ball).acceleration.x = moveSpeed;


    // }
    // if(keysPressed["w"]){
    //     ball1.getComponent(Ball).acceleration.y = moveSpeed;
    // }
    // if(keysPressed["s"]){
    //     ball1.getComponent(Ball).acceleration.y = -moveSpeed;
    // }
    box1.getComponent(Box).acceleration = Vector2.zero();
    if(keysPressed["a"]){
        box1.getComponent(Box).acceleration.x = -moveSpeed;
    }
    if(keysPressed["d"]){
        box1.getComponent(Box).acceleration.x = moveSpeed;
    }
    if(keysPressed["w"]){
        box1.getComponent(Box).acceleration.y = moveSpeed;
    }
    if(keysPressed["s"]){
        box1.getComponent(Box).acceleration.y = -moveSpeed;
    }
    if(keysPressed["q"]){
        box1.getComponent(Box).angVel -= 0.05;
    }
    if(keysPressed["e"]){
        box1.getComponent(Box).angVel += 0.05;
    }
    // Key control Arrow keys
    caps1.getComponent(Capsule).acceleration = Vector2.zero();

    if(keysPressed["ArrowLeft"]){
        caps1.getComponent(Capsule).angVel = 5;
    }
    if(keysPressed["ArrowRight"]){

        caps1.getComponent(Capsule).angVel = -5;
    }

    if(keysPressed["ArrowUp"]){
        caps1.getComponent(Capsule).acceleration = Vector2.multiply(Vector2.multiply(caps1.getComponent(Capsule).dir, -1), moveSpeed);
    }
    if(keysPressed["ArrowDown"]){
        caps1.getComponent(Capsule).acceleration = Vector2.multiply(caps1.getComponent(Capsule).dir, moveSpeed);
    }

    // console.log(caps1.getComponent(Capsule).position);

    ball1.getComponent(Ball).acceleration = ball1.getComponent(Ball).acceleration.unit();
    ball1.getComponent(Ball).acceleration = Vector2.multiply(ball1.getComponent(Ball).acceleration, moveSpeed);
    // ball1.getComponent(Ball).update();

    // ball2.getComponent(Ball).update();

    // ball3.getComponent(Ball).update();
    // Camera.position = new Vector2(player.transform.position.x, player.transform.position.y);

    if(gameIsRunning){
        Camera.update();
        ball1.getComponent(Ball).display();
        // distanceVec = Vector2.subtract(ball2.getComponent(Ball).position, ball1.getComponent(Ball).position);
        // ctx.fillText("Distance: " + distanceVec.getMagnitude(), 450, 250);
        for(let a = 0; a < Wall.walls.length; a++){
            Wall.walls[a].update();
            Wall.walls[a].draw();
        }

        for(let i = 0; i < Ball.balls.length; i++){

            // for(let a = 0; a < Wall.walls.length; a++){
            //     if(coll_det_bw(Ball.balls[i], Wall.walls[a])){
            //         pen_res_bw(Ball.balls[i], Wall.walls[a]);
            //         coll_res_bw(Ball.balls[i], Wall.walls[a]);
            //     }
            // }

            // for(let j = i+1; j < Ball.balls.length; j++){
            //     if(coll_det_bb(Ball.balls[i], Ball.balls[j])){
            //         pen_res_bb(Ball.balls[i], Ball.balls[j]);
            //         coll_res_bb(Ball.balls[i], Ball.balls[j]);
            //     }
            // }
            Ball.balls[i].display();
            Ball.balls[i].update();
            Ball.balls[i].draw();
        }
        for(let i = 0; i < Capsule.capsules.length; i++){
            Capsule.capsules[i].draw();
            Capsule.capsules[i].update();
            // for(let j = i + 1; j < Capsule.capsules.length; j++){
            //     if(coll_det_cc(Capsule.capsules[i], Capsule.capsules[j])){
            //         ctx.fillText("Collide", 500, 400);
            //         pen_res_cc(Capsule.capsules[i], Capsule.capsules[j]);
            //         coll_res_cc(Capsule.capsules[i], Capsule.capsules[j]);
            //     }
            // }
        }

        // if(sat(wall5.getComponent(Wall), wall6.getComponent(Wall))){

        //     ctx.fillText("COLLISION", 500, 400);
        // }

        box1.getComponent(Box).draw();
        box1.getComponent(Box).update();
        box2.getComponent(Box).draw();
        box2.getComponent(Box).update();

        if(sat(ball1.getComponent(Ball).comp[0], box1.getComponent(Box).comp[0])){
            ctx.fillText("COLLISION", 500, 390);
        }
        ctx.fillText("QE to rotate dont press arrow keys or break", 350, 350);
        ctx.fillText("changing the way things work, might take a few days for it to work again", 250, 375);
        requestAnimationFrame(update);
    }
}
// let cameraOgPos = new Vector2(Camera.position.x, Camera.position.y);
// let camPos = new Vector2(0, 0);
// let targetPos = new Vector2(0, 0);
// let startTimeBtwShake = 0.05;
// let timeBtwShake = startTimeBtwShake;
// function screenShake(){
//     if(timeBtwShake <= 0){
//         camPos = new Vector2(Camera.position.x, Camera.position.y);
//         targetPos = new Vector2(cameraOgPos.x + (Math.random() - 0.5) * 30, cameraOgPos.y + (Math.random() - 0.5) * 30);
//         timeBtwShake = startTimeBtwShake;
//     }else{
//         Camera.position.x = ExtendedMath.lerp(camPos.x, targetPos.x, timeBtwShake / startTimeBtwShake);
//         Camera.position.y = ExtendedMath.lerp(camPos.y, targetPos.y, timeBtwShake / startTimeBtwShake);
//         timeBtwShake -= deltaTime;
//     }
    
// }
