const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

let pepeImg = document.getElementById("pepe");
let circleImg = document.getElementById("circle");

Camera.initialize(canvas, ctx, new Vector2(0, 0), new Vector2(800, 400))

let ball1 = new GameObject();
// ball1.addComponent(new SpriteRenderer(ball1, ctx, circleImg, 50, 50));
ball1.addComponent(new Box(ball1, new Vector2(0, 0), new Vector2(50, 50), 5, 0));
ball1.addComponent(new SpriteRenderer(ball1, ctx, pepeImg, 50, 50));
ball1.transform.position = new Vector2(0, 100);

ball1.name = "ball1";


let wall1 = new GameObject();
wall1.addComponent(new Wall(wall1, new Vector2(0, 200), new Vector2(0, -200)));
wall1.name = "wall1";
wall1.transform.position.x -= 400;

let wall2 = new GameObject();
wall2.addComponent(new Wall(wall2, new Vector2(400, 200), new Vector2(400, -200)));
wall2.name = "wall2";

let wall3 = new GameObject();
wall3.addComponent(new Wall(wall3, new Vector2(-400, -200), new Vector2(400, -200)));

let wall4 = new GameObject();
wall4.addComponent(new Wall(wall4, new Vector2(-400, 200), new Vector2(400, 200)));
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

// let box1 = new GameObject();
// box1.addComponent(new Box(box1, new Vector2(0, 0), new Vector2(50, 50), 5, 0.5));
// box1.transform.position.x -= 100;
// box1.getComponent(Box).velocity = new Vector2(-50, 0);
// box1.name = "box1";
// box1.addComponent(new SpriteRenderer(box1, ctx, pepeImg, 50, 50));

// let box3 = new GameObject();
// box3.addComponent(new Box(box3, new Vector2(0, 0), new Vector2(50, 50), 5, 0.5));
// box3.transform.position.x -= 100;
// box3.getComponent(Box).velocity = new Vector2(-50, 0);
// box3.name = "box3";
// box3.addComponent(new SpriteRenderer(box3, ctx, pepeImg, 50, 50));


// let box4 = new GameObject();
// box4.addComponent(new Box(box4, new Vector2(0, 0), new Vector2(50, 50), 5, 0.5));
// box4.transform.position.x -= 100;
// box4.getComponent(Box).velocity = new Vector2(-50, 0);
// box4.name = "box4";
// box4.addComponent(new SpriteRenderer(box4, ctx, pepeImg, 50, 50));

let box2 = new GameObject();
box2.addComponent(new Box(box2, new Vector2(0, 0), new Vector2(25, 150), 5, 0));
box2.transform.position.x -= 150;
box2.transform.position.y += 50;
box2.addComponent(new SpriteRenderer(box2, ctx, pepeImg, 25, 150));
box2.name = "box2";
box2.getComponent(Box).mass = 0.1;
console.log(box2.getComponent(Box).inv_m);

// let box2 = new GameObject();
// box2.addComponent(new Box(box2, new Vector2(-250, 0), new Vector2(50, 100), 1, 0));

// let box2 = new GameObject();
// box2.addComponent(new Box(box2, new Vector2(0, 0), new Vector2(50, 100), 5, 0));
// box2.transform.position.y -= 125;

// let box3 = new GameObject();
// box3.addComponent(new Box(box3, new Vector2(0, 0), new Vector2(25, 250), 0, 0));

let gameIsRunning = true;
let moveSpeed = 0.1;

let distanceVec = new Vector2(0, 0);
requestAnimationFrame(update);
function update(){
    if(keysPressed["e"]){
        let newBox = new GameObject();
        newBox.addComponent(new SpriteRenderer(newBox, ctx, pepeImg, 100, 50));
        newBox.addComponent(new Box(newBox, new Vector2(0, 0), new Vector2(100, 50), 1, 0));
    }

    ball1.getComponent(Box).acceleration.x = 0;
    ball1.getComponent(Box).acceleration.y = 0;
    if(keysPressed["a"]){
        ball1.getComponent(Box).acceleration.x = -moveSpeed;
    }
    if(keysPressed["d"]){
        ball1.getComponent(Box).acceleration.x = moveSpeed;
    }
    if(keysPressed["w"]){
        ball1.getComponent(Box).acceleration.y = moveSpeed;
    }
    if(keysPressed["s"]){
        ball1.getComponent(Box).acceleration.y = -moveSpeed;
    }
    // ball1.getComponent(Ball).acceleration = Vector2.zero();
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
    // if(keysPressed["q"]){
    //     box1.getComponent(Box).angVel -= 0.05;
    // }
    // if(keysPressed["e"]){
    //     box1.getComponent(Box).angVel += 0.05;
    // }
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

    // ball1.getComponent(Ball).acceleration = ball1.getComponent(Ball).acceleration.unit();
    // ball1.getComponent(Ball).acceleration = Vector2.multiply(ball1.getComponent(Ball).acceleration, moveSpeed);
    // ball1.getComponent(Ball).update();

    // ball2.getComponent(Ball).update();

    // ball3.getComponent(Ball).update();
    // Camera.position = new Vector2(player.transform.position.x, player.transform.position.y);
      
    if(gameIsRunning){
        PhysicsManager.updatePhysics();
        Camera.update();

        ball1.getComponent(Box).draw();
        box2.getComponent(Box).draw();
       
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
