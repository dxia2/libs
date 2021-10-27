class Renderer{
    gameObject;
    canvasCtx
    draw(){

    }
}

class SpriteRenderer extends Renderer{
    sprite;
    constructor(gameObject, canvasCtx, sprite){
        this.gameObject = gameObject;
        this.canvasCtx = canvasCtx;
        this.sprite = sprite;
    }

    draw(){
        super.draw();

    }
}

class BasicRenderer extends Renderer{

}