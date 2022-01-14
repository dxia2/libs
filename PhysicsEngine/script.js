// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// canvas.width = 800;
// canvas.height = 400;

let gameIsRunning = true;

let pepeImg = document.getElementById("pepe");
let circleImg = document.getElementById("circle");

// Camera.initialize(canvas, ctx, new Vector2(0, 0), new Vector2(800, 400))

let ball1 = new GameObject();
ball1.transform.position = new Vector2(100, 100);
ball1.addComponent(new Capsule(ball1, -100, 100, -50, 100, 25, 1));

ball1.getComponent(Capsule).player = true;
ball1.getComponent(Capsule).vel.x += 1;

function mainLoop(timestamp) {
    console.log(ball1.getComponent(Capsule).pos);
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    // userInput();
    COLLISIONS.length = 0;
    
    BODIES.forEach((b) => {
        b.draw();
        // b.display();
        if(b.player){
            b.keyControl();
        };
        b.reposition();
    })
    
    BODIES.forEach((b, index) => {
        for(let bodyPair = index+1; bodyPair < BODIES.length; bodyPair++){
            let bestSat = {
                pen: null,
                axis: null,
                vertex: null
            }
            for(let o1comp=0; o1comp<BODIES[index].comp.length; o1comp++){
                for(let o2comp=0; o2comp<BODIES[bodyPair].comp.length; o2comp++){
                    if(sat(BODIES[index].comp[o1comp], BODIES[bodyPair].comp[o2comp]).pen > bestSat.pen){
                        bestSat = sat(BODIES[index].comp[o1comp], BODIES[bodyPair].comp[o2comp]);
                        ctx.fillText("COLLISION", 500, 400);
                    }
                }
            }

            if(bestSat.pen !== null){
                COLLISIONS.push(new CollData(BODIES[index], BODIES[bodyPair], bestSat.axis, bestSat.pen, bestSat.vertex));
           }
        }
    });

    COLLISIONS.forEach((c) => {
        c.penRes();
        c.collRes();
    });
    if(gameIsRunning){
        // Camera.update();
        requestAnimationFrame(mainLoop);
    }

}

//Setting up the initial environment before starting the main loop
putWallsAroundCanvas();

//Creating 10 body object with random arguments
// for(let addBody = 0; addBody < 10; addBody++){
//     let x0 = randInt(100, canvas.clientWidth-100);
//     let y0 = randInt(100, canvas.clientHeight-100);
//     let x1 = x0 + randInt(-50, 50);
//     let y1 = y0 + randInt(-50, 50);
//     let r = randInt(10, 30);
//     let m = randInt(0, 10);
//     if(addBody%4 === 0){
//         let ballObj = new Ball(x0, y0, r, m);
//     }
//     if(addBody%4 === 1){
//         let boxObj = new Box(x0, y0, x1, y1, r, m);
//     }
//     if(addBody%4 === 2){
//         let capsObj = new Capsule(x0, y0, x1, y1, r, m);
//     }
//     if(addBody%4 === 3){
//         let starObj = new Star(x0, y0, r+20, m);
//     }
// };


requestAnimationFrame(mainLoop);
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
