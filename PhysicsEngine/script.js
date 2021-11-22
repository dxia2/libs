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
ball3.addComponent(new CircleCollider(ball3, new Vector2(0, 0), 50, new Vector2(0, 0), new Vector2(0, 0), 0.6, 0));

let wall1 = new GameObject();
wall1.transform.position = new Vector2(100, 0);
wall1.addComponent(new LineRenderer(wall1, ctx, new Vector2(0, 0), new Vector2(50, 50)));
wall1.addComponent(new Wall(wall1, new Vector2(0, 0), new Vector2(50, 50)));

ball1.getComponent(CircleCollider).elasticity = 0;

let gameIsRunning = true;
let moveSpeed = 250;

let distanceVec = new Vector2(0, 0);
requestAnimationFrame(update);
function update(){

    ball1.getComponent(CircleCollider).acceleration.x = 0;
    ball1.getComponent(CircleCollider).acceleration.y = 0;
    if(keysPressed["a"]){
        ball1.getComponent(CircleCollider).acceleration.x = -moveSpeed;
    }
    if(keysPressed["d"]){
        ball1.getComponent(CircleCollider).acceleration.x = moveSpeed;
    }
    if(keysPressed["w"]){
        ball1.getComponent(CircleCollider).acceleration.y = moveSpeed;
    }
    if(keysPressed["s"]){
        ball1.getComponent(CircleCollider).acceleration.y = -moveSpeed;
    }

    ball1.getComponent(CircleCollider).acceleration = ball1.getComponent(CircleCollider).acceleration.unit();
    ball1.getComponent(CircleCollider).acceleration = Vector2.multiply(ball1.getComponent(CircleCollider).acceleration, moveSpeed);
    // ball1.getComponent(CircleCollider).update();

    // ball2.getComponent(CircleCollider).update();

    // ball3.getComponent(CircleCollider).update();
    // Camera.position = new Vector2(player.transform.position.x, player.transform.position.y);



    if(gameIsRunning){
        Camera.update();
        ball1.getComponent(CircleCollider).display();
        // distanceVec = Vector2.subtract(ball2.getComponent(CircleCollider).position, ball1.getComponent(CircleCollider).position);
        // ctx.fillText("Distance: " + distanceVec.getMagnitude(), 450, 250);


        for(let i = 0; i < CircleCollider.balls.length; i++){
            for(let j = i+1; j < CircleCollider.balls.length; j++){
                if(coll_det_bb(CircleCollider.balls[i], CircleCollider.balls[j])){
                    pen_res_bb(CircleCollider.balls[i], CircleCollider.balls[j]);
                    coll_res_bb(CircleCollider.balls[i], CircleCollider.balls[j]);
                }

            }
            CircleCollider.balls[i].display();
            CircleCollider.balls[i].update();
        }

        for(let i = 0; i < Wall.walls.length; i++){
            Wall.walls[i].update();
        }
        // Vector2.drawVec(
        //     ball1.getComponent(CircleCollider).position,
        //     closestPointBW(ball1.getComponent(CircleCollider), wall1.getComponent(Wall)),
        //     "red"
        // )

        if(coll_det_bw(ball1.getComponent(CircleCollider), wall1.getComponent(Wall))){
            pen_res_bw(ball1.getComponent(CircleCollider), wall1.getComponent(Wall));
            coll_res_bw(ball1.getComponent(CircleCollider), wall1.getComponent(Wall));
        }


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
