// A script that gets all the key inputs

// Object that contains all the keys we try to detect
let keysPressed = {
    "w": false,
    "a": false,
    "s": false,
    "d": false,
}
// Event Listeners
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
// Event functions
function keyDownHandler(event) {
    if (event.key in keysPressed) {
        keysPressed[event.key] = true;
    }
}

function keyUpHandler(event) {
    if (event.key in keysPressed) {
        keysPressed[event.key] = false;
    }
}