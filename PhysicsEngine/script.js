const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let pepeImg = document.getElementById("pepe");
let circleImg = document.getElementById("circle");

Camera.initialize(canvas, ctx, new Vector2(0, 0), new Vector2(600, 400))

let ball1 = new GameObject();
ball1.addComponent(new SpriteRenderer(ball1, ctx, circleImg, 50, 50));
ball1.addComponent(new CircleCollider(ball1, new Vector2(0, 0), 25, new Vector2(0, 0), new Vector2(0, 0), 0.6, 2));
ball1.transform.position = new Vector2(0, 60);

let ball2 = new GameObject();
ball2.addComponent(new SpriteRenderer(ball2, ctx, circleImg, 50, 50));
ball2.addComponent(new CircleCollider(ball2, new Vector2(0, 0), 25, new Vector2(0, 0), new Vector2(0, 0), 0.6, 2));

let ball3 = new GameObject();
ball3.transform.position.x += 50
ball3.addComponent(new SpriteRenderer(ball3, ctx, circleImg, 100, 100));
ball3.addComponent(new CircleCollider(ball3, new Vector2(0, 0), 50, new Vector2(0, 0), new Vector2(0, 0), 0.6, 10));

let wall1 = new GameObject();
wall1.addComponent(new Wall(wall1, new Vector2(-300, 200), new Vector2(-300, -200)));
wall1.name = "wall1";

let wall2 = new GameObject();

wall2.addComponent(new LineRenderer(wall2, ctx, new Vector2(300, 200), new Vector2(300, -200)));
wall2.addComponent(new Wall(wall2, new Vector2(300, 200), new Vector2(300, -200)));
wall2.name = "wall2";

let wall3 = new GameObject();

wall3.addComponent(new LineRenderer(wall3, ctx, new Vector2(-300, -200), new Vector2(300, -200)));
wall3.addComponent(new Wall(wall3, new Vector2(-300, -200), new Vector2(300, -200)));

let wall4 = new GameObject();

wall4.addComponent(new LineRenderer(wall4, ctx, new Vector2(-300, 200), new Vector2(300, 200)));
wall4.addComponent(new Wall(wall4, new Vector2(-300, 200), new Vector2(300, 200)));

let wall5 = new GameObject();

wall5.addComponent(new Wall(wall5, new Vector2(-50, 0), new Vector2(50, 0)));
let wall5wall = wall5.getComponent(Wall)
wall5.addComponent(new LineRenderer(wall5, ctx, wall5wall.start, wall5wall.end));

let caps1 = new GameObject();
caps1.addComponent(new Capsule(caps1, new Vector2(-50, 50), new Vector2(50, 25), 30, 0.6));
caps1.transform.position.y = 0;
caps1.transform.position.x = 150;

let gameIsRunning = true;
let moveSpeed = 250;

let distanceVec = new Vector2(0, 0);
requestAnimationFrame(update);
function update(){

    ball1.getComponent(CircleCollider).acceleration.x = 0;
    ball1.getComponent(CircleCollider).acceleration.y = 0;
    // Key control WASD
    if(keysPressed["a"]){
        ball1.getComponent(CircleCollider).acceleration.x = -moveSpeed;
        wall5.getComponent(Wall).angVel -= 0.01;

    }
    if(keysPressed["d"]){
        ball1.getComponent(CircleCollider).acceleration.x = moveSpeed;
        wall5.getComponent(Wall).angVel += 0.01;


    }
    if(keysPressed["w"]){
        ball1.getComponent(CircleCollider).acceleration.y = moveSpeed;
    }
    if(keysPressed["s"]){
        ball1.getComponent(CircleCollider).acceleration.y = -moveSpeed;
    }
    // Key control Arrow keys
    caps1.getComponent(Capsule).acceleration = Vector2.zero();
    caps1.getComponent(Capsule).angVel = 0;
    if(keysPressed["ArrowLeft"]){
        caps1.getComponent(Capsule).acceleration.x -= moveSpeed;
        caps1.getComponent(Capsule).angVel -= 1;
    }
    if(keysPressed["ArrowRight"]){
        caps1.getComponent(Capsule).acceleration.x += moveSpeed;
        caps1.getComponent(Capsule).angVel += 1;
    }

    // console.log(caps1.getComponent(Capsule).position);

    ball1.getComponent(CircleCollider).acceleration = ball1.getComponent(CircleCollider).acceleration.unit();
    ball1.getComponent(CircleCollider).acceleration = Vector2.multiply(ball1.getComponent(CircleCollider).acceleration, moveSpeed);
    // ball1.getComponent(CircleCollider).update();

    // ball2.getComponent(CircleCollider).update();

    // ball3.getComponent(CircleCollider).update();
    // Camera.position = new Vector2(player.transform.position.x, player.transform.position.y);

    wall5.getComponent(LineRenderer).position1 = wall5wall.start;
    wall5.getComponent(LineRenderer).position2 = wall5wall.end;

    if(gameIsRunning){
        Camera.update();
        ball1.getComponent(CircleCollider).display();
        // distanceVec = Vector2.subtract(ball2.getComponent(CircleCollider).position, ball1.getComponent(CircleCollider).position);
        // ctx.fillText("Distance: " + distanceVec.getMagnitude(), 450, 250);


        for(let i = 0; i < CircleCollider.balls.length; i++){

            for(let a = 0; a < Wall.walls.length; a++){
                if(coll_det_bw(CircleCollider.balls[i], Wall.walls[a])){
                    pen_res_bw(CircleCollider.balls[i], Wall.walls[a]);
                    coll_res_bw(CircleCollider.balls[i], Wall.walls[a]);
                }
                Wall.walls[a].update();
            }

            for(let j = i+1; j < CircleCollider.balls.length; j++){
                if(coll_det_bb(CircleCollider.balls[i], CircleCollider.balls[j])){
                    pen_res_bb(CircleCollider.balls[i], CircleCollider.balls[j]);
                    coll_res_bb(CircleCollider.balls[i], CircleCollider.balls[j]);
                }

            }
            CircleCollider.balls[i].display();
            CircleCollider.balls[i].update();

        }
        for(let i = 0; i < Capsule.capsules.length; i++){
            Capsule.capsules[i].draw();
            Capsule.capsules[i].update();
        }

        // Vector2.drawVec(
        //     ball1.getComponent(CircleCollider).position,
        //     closestPointBW(ball1.getComponent(CircleCollider), wall1.getComponent(Wall)),
        //     "red"
        // )

        // if(coll_det_bw(ball1.getComponent(CircleCollider), wall1.getComponent(Wall))){
        //     pen_res_bw(ball1.getComponent(CircleCollider), wall1.getComponent(Wall));
        //     coll_res_bw(ball1.getComponent(CircleCollider), wall1.getComponent(Wall));
        // }


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
