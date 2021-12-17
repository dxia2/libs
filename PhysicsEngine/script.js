const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let pepeImg = document.getElementById("pepe");
let circleImg = document.getElementById("circle");

Camera.initialize(canvas, ctx, new Vector2(0, 0), new Vector2(600, 400))

let ball1 = new GameObject();
// ball1.addComponent(new SpriteRenderer(ball1, ctx, circleImg, 50, 50));
ball1.addComponent(new Ball(ball1, new Vector2(0, 0), 25, new Vector2(0, 0), new Vector2(0, 0), 0, 2));
ball1.transform.position = new Vector2(0, 100);
ball1.getComponent(Ball).velocity.y += 5;

let ball2 = new GameObject();
// ball2.addComponent(new SpriteRenderer(ball2, ctx, circleImg, 50, 50));
ball2.addComponent(new Ball(ball2, new Vector2(0, 0), 25, new Vector2(0, 0), new Vector2(0, 0), 0, 2));
ball2.transform.position = new Vector2(50, 150);
// ball2.getComponent(Ball).velocity = new Vector2(Math.random() * 500, Math.random() * 500);

// let ball3 = new GameObject();
// ball3.transform.position.x += 50
// // ball3.addComponent(new SpriteRenderer(ball3, ctx, circleImg, 100, 100));
// ball3.addComponent(new Ball(ball3, new Vector2(0, 0), 50, new Vector2(0, 0), new Vector2(0, 0), 0.6, 10));

let wall1 = new GameObject();
wall1.addComponent(new Wall(wall1, new Vector2(0, 200), new Vector2(0, -200)));
wall1.name = "wall1";
wall1.transform.position.x -= 300;

let wall2 = new GameObject();
wall2.addComponent(new Wall(wall2, new Vector2(300, 200), new Vector2(300, -200)));
wall2.name = "wall2";

let wall3 = new GameObject();
wall3.addComponent(new Wall(wall3, new Vector2(-299, -200), new Vector2(299, -200)));

let wall4 = new GameObject();
wall4.addComponent(new Wall(wall4, new Vector2(-300, 200), new Vector2(300, 200)));
wall4.name = "wall4";

// let wall6 = new GameObject();
// wall6.addComponent(new Wall(wall6, new Vector2(50, 50), new Vector2(0, -50)));
// wall6.name = "wall6";

// wall6.transform.position.x -= 100;

// let caps1 = new GameObject();
// caps1.transform.position.y = 175;
// caps1.transform.position.x = 250;

// caps1.addComponent(new Capsule(caps1, 60, new Vector2(0, 0), 20, 0, 1.5));
// caps1.getComponent(Capsule).angle = 90 / (180 /  Math.PI);

// let caps2 = new GameObject();
// caps2.transform.position.y = 0;
// caps2.transform.position.x = 200;
// caps2.addComponent(new Capsule(caps2, 100, new Vector2(0, 0), 40, 0, 3));
// caps2.getComponent(Capsule).velocity = new Vector2(Math.random() * 500, Math.random() * 500);
// caps2.getComponent(Capsule).angVel = Math.random();

let box1 = new GameObject();
box1.addComponent(new Box(box1, new Vector2(0, 0), new Vector2(50, 50), 5, 0));
box1.transform.position.x -= 100;
box1.getComponent(Box).velocity = new Vector2(-50, 0);
box1.name = "box1";
box1.addComponent(new SpriteRenderer(box1, ctx, pepeImg, 50, 50));

let box2 = new GameObject();
box2.addComponent(new Box(box2, new Vector2(0, 0), new Vector2(25, 150), 5, 0));
box2.transform.position.x -= 200;
box2.getComponent(Box).velocity = new Vector2(-50, 0);

box2.transform.rotation = 20;

// let box2 = new GameObject();
// box2.addComponent(new Box(box2, new Vector2(-250, 0), new Vector2(50, 100), 1, 0));

// let box2 = new GameObject();
// box2.addComponent(new Box(box2, new Vector2(0, 0), new Vector2(50, 100), 5, 0));
// box2.transform.position.y -= 125;

// let box3 = new GameObject();
// box3.addComponent(new Box(box3, new Vector2(0, 0), new Vector2(25, 250), 0, 0));

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
    ball1.getComponent(Ball).acceleration = Vector2.zero();
    if(keysPressed["a"]){
        ball1.getComponent(Ball).acceleration.x = -moveSpeed;
    }
    if(keysPressed["d"]){
        ball1.getComponent(Ball).acceleration.x = moveSpeed;
    }
    if(keysPressed["w"]){
        ball1.getComponent(Ball).acceleration.y = moveSpeed;
    }
    if(keysPressed["s"]){
        ball1.getComponent(Ball).acceleration.y = -moveSpeed;
    }
    if(keysPressed["q"]){
        box1.getComponent(Box).angVel -= 0.05;
    }
    if(keysPressed["e"]){
        box1.getComponent(Box).angVel += 0.05;
    }
    // // Key control Arrow keys
    // caps1.getComponent(Capsule).acceleration = Vector2.zero();

    // if(keysPressed["ArrowLeft"]){
    //     caps1.getComponent(Capsule).angVel += 0.1;
    // }
    // if(keysPressed["ArrowRight"]){

    //     caps1.getComponent(Capsule).angVel -= 0.1;
    // }

    // if(keysPressed["ArrowUp"]){
    //     caps1.getComponent(Capsule).acceleration = Vector2.multiply(caps1.getComponent(Capsule).comp[0].dir, moveSpeed);
    // }
    // if(keysPressed["ArrowDown"]){
    //     caps1.getComponent(Capsule).acceleration = Vector2.multiply(Vector2.multiply(caps1.getComponent(Capsule).comp[0].dir, -1), moveSpeed);
    // }       

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
        
        CollData.COLLISIONS.length = 0;

        Body.BODIES.forEach((b) =>{
            b.draw();
            b.update();
        });
        Body.BODIES.forEach((b, index) =>{
            for(let bodyPair = index + 1; bodyPair < Body.BODIES.length; bodyPair++){

                let bestSat = {
                    pen: null,
                    axis: null,
                    vertex: null
                }
        
                for(let i = 0; i < Body.BODIES[index].comp.length; i++){
                    for(let j = 0; j < Body.BODIES[bodyPair].comp.length; j++){
                        if(sat(Body.BODIES[index].comp[i], Body.BODIES[bodyPair].comp[j]).pen > bestSat.pen){
                            bestSat = sat(Body.BODIES[index].comp[i], Body.BODIES[bodyPair].comp[j]);
                            ctx.fillText("Collision", 500, 380);
                        }
                    }
                }

                if(bestSat.pen !== null){
                    CollData.COLLISIONS.push(new CollData(Body.BODIES[index], Body.BODIES[bodyPair], bestSat.axis, bestSat.pen, bestSat.vertex));
                }
            }
        });

        CollData.COLLISIONS.forEach((c) => {
            c.penRes();
            c.collRes();
        });

        // let penResolution = Vector2.multiply(bestSat.axis, bestSat.pen / (Body.BODIES[index].inv_m + Body.BODIES[bodyPair].inv_m));
        // Body.BODIES[index].comp[0].position = Vector2.add(Body.BODIES[index].comp[0].position, Vector2.multiply(penResolution, Body.BODIES[index].inv_m));
        // Body.BODIES[bodyPair].comp[0].position = Vector2.add(Body.BODIES[bodyPair].comp[0].position, Vector2.multiply(penResolution, -Body.BODIES[bodyPair].inv_m));
        ctx.fillText("werid rectangle bug where it sticks to the wall", 325, 350);
       
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
