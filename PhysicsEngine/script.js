let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let pepeImg = document.getElementById("pepe");

Camera.initialize(canvas, ctx, new Vector2(0, 0), new Vector2(600, 400))

// let gameobject = new GameObject();
// gameobject.transform.position.x = 0;
// gameobject.transform.position.y = 0;
// gameobject.transform.rotation = 135;
// gameobject.addComponent(new SpriteRenderer(gameobject, ctx, pepeImg, 200, 50));

let gameobject2 = new GameObject("wall");
gameobject2.transform.position.x = 100;
gameobject2.transform.position.y = -100;
gameobject2.transform.rotation = 0;
gameobject2.addComponent(new SpriteRenderer(gameobject2, ctx, pepeImg, 300, 50));
gameobject2.addComponent(new BoxCollider(gameobject2, gameobject2.transform.position, new Vector2(300, 50)));
// gameobject2.addComponent(new Rigidbody(gameobject2, gameobject2.getComponent(BoxCollider), true));
// gameobject2.getComponent(BoxCollider).rigidbody = gameobject2.getComponent(Rigidbody);

// let gameobject3 = new GameObject("box");
// gameobject3.transform.position.x = 100;
// gameobject3.transform.position.y = 50;
// gameobject3.addComponent(new SpriteRenderer(gameobject3, ctx, pepeImg, 50, 50));
// gameobject3.addComponent(new BoxCollider(gameobject3, gameobject3.transform.position, new Vector2(50, 50)));
// gameobject3.addComponent(new Rigidbody(gameobject3, gameobject3.getComponent(BoxCollider), true));
// gameobject3.getComponent(BoxCollider).rigidbody = gameobject3.getComponent(Rigidbody);

let playerMoveSpeed = 200;
let player = new GameObject("Player");
player.transform.rotation = -100;
player.addComponent(new SpriteRenderer(player, ctx, pepeImg, 50, 50));
player.addComponent(new BoxCollider(player, player.transform.position, new Vector2(50, 50)));
player.getComponent(BoxCollider).collisionFunctions.onCollisionEnterFunctions.push(function(){console.log("A")});
player.getComponent(BoxCollider).collisionFunctions.onCollisionExitFunctions.push(function(){console.log("PODOPOSPPPP")});
player.addComponent(new Rigidbody(player, player.getComponent(BoxCollider), true));
player.getComponent(BoxCollider).rigidbody = player.getComponent(Rigidbody);


let gameIsRunning = true;
let multiplier = 1;

requestAnimationFrame(update);
function update(){



    // if(gameobject.transform.position.x > 200){
    //     multiplier = -1;
    // }else if(gameobject.transform.position.x < -200){
    //     multiplier = 1;
    // }
    // gameobject.transform.position.x += deltaTime * 200 * multiplier;
    // gameobject.transform.rotation += deltaTime * 200;


    //screenShake();
    player.getComponent(Rigidbody).velocity.x = 0;
    player.getComponent(Rigidbody).velocity.y = 0;
    if(keysPressed["a"]){
        player.getComponent(Rigidbody).velocity.x = -playerMoveSpeed;
    }
    if(keysPressed["d"]){
        player.getComponent(Rigidbody).velocity.x = playerMoveSpeed;
    }
    if(keysPressed["w"]){
        player.getComponent(Rigidbody).velocity.y = playerMoveSpeed;
    }
    if(keysPressed["s"]){
        player.getComponent(Rigidbody).velocity.y = -playerMoveSpeed;
    }
    Camera.position = new Vector2(player.transform.position.x, player.transform.position.y);
    if(gameIsRunning){
        PhysicsManager.updatePhysics();
        Camera.update();
            
        gameobject2.getComponent(BoxCollider).drawBox();
        requestAnimationFrame(update);
    }
}
let cameraOgPos = new Vector2(Camera.position.x, Camera.position.y);
let camPos = new Vector2(0, 0);
let targetPos = new Vector2(0, 0);
let startTimeBtwShake = 0.05;
let timeBtwShake = startTimeBtwShake;
function screenShake(){
    if(timeBtwShake <= 0){
        camPos = new Vector2(Camera.position.x, Camera.position.y);
        targetPos = new Vector2(cameraOgPos.x + (Math.random() - 0.5) * 30, cameraOgPos.y + (Math.random() - 0.5) * 30);
        timeBtwShake = startTimeBtwShake;
    }else{
        Camera.position.x = ExtendedMath.lerp(camPos.x, targetPos.x, timeBtwShake / startTimeBtwShake);
        Camera.position.y = ExtendedMath.lerp(camPos.y, targetPos.y, timeBtwShake / startTimeBtwShake);
        timeBtwShake -= deltaTime;
    }
    
}
