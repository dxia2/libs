let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let pepeImg = document.getElementById("pepe");

Camera.initialize(canvas, ctx, new Vector2(0, 0), new Vector2(600, 400))

let gameobject = new GameObject();
gameobject.transform.position.x = 0;
gameobject.transform.position.y = 0;
gameobject.transform.rotation = 135;
gameobject.addComponent(new SpriteRenderer(gameobject, ctx, pepeImg, 200, 50));

let gameobject2 = new GameObject();
gameobject2.transform.position.x = 100;
gameobject2.transform.position.y = -100;
gameobject2.addComponent(new SpriteRenderer(gameobject2, ctx, pepeImg, 300, 50));

let playerMoveSpeed = 200;
let player = new GameObject();
player.addComponent(new SpriteRenderer(player, ctx, pepeImg, 50, 50));

let gameIsRunning = true;
let multiplier = 1;
requestAnimationFrame(update);
function update(){
    if(gameobject.transform.position.x > 200){
        multiplier = -1;
    }else if(gameobject.transform.position.x < -200){
        multiplier = 1;
    }
    gameobject.transform.position.x += deltaTime * 200 * multiplier;
    gameobject.transform.rotation += deltaTime * 200;


    screenShake();
    if(keysPressed["a"]){
        player.transform.position.x -= playerMoveSpeed * deltaTime;
    }
    if(keysPressed["d"]){
        player.transform.position.x += playerMoveSpeed * deltaTime;
    }
    if(keysPressed["w"]){
        player.transform.position.y += playerMoveSpeed * deltaTime;
    }
    if(keysPressed["s"]){
        player.transform.position.y -= playerMoveSpeed * deltaTime;
    }
    // Camera.position = new Vector2(player.transform.position.x, player.transform.position.y);
    if(gameIsRunning){
        Camera.update();
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
