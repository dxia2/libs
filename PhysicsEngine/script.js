let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let pepeImg = document.getElementById("pepe");

Camera.size = new Vector2(600, 400);

let gameobject = new GameObject();
gameobject.transform.position.x = 300;
gameobject.transform.position.y = 150;
gameobject.transform.rotation = 135;
gameobject.addComponent(new SpriteRenderer(gameobject, ctx, pepeImg, 200, 50));
console.log(gameobject.getComponent(SpriteRenderer).sprite);
gameobject.getComponent(SpriteRenderer).draw();