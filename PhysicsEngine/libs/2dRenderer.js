class Camera{
    static ctx;
    static canvas;
    static renderers = [];
    static position = new Vector2(0, 0);
    static size = new Vector2(0, 0);

    static initialize(canvas, ctx, position, size){
        this.canvas = canvas;
        this.ctx = ctx;
        this.position = position;
        this.size = size;
    }
    static update(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i = 0; i < Camera.renderers.length; i++){
            Camera.renderers[i].draw();
        }
    }
}
class Renderer{
    gameObject;
    canvasCtx;
    draw(){

    }
}

class SpriteRenderer extends Renderer{
    sprite;
    imageSize;
    constructor(gameObject, canvasCtx, sprite, width, height){
        super();
        this.gameObject = gameObject;
        this.canvasCtx = canvasCtx;
        this.sprite = sprite;
        this.imageSize = new Vector2(width, height);
        Camera.renderers.push(this);
    }

    draw(){
        super.draw();
        this.canvasCtx.translate(this.gameObject.transform.position.x - (Camera.position.x - Camera.size.x / 2), -(this.gameObject.transform.position.y - Camera.position.y - Camera.size.y / 2));
        this.canvasCtx.rotate(ExtendedMath.degToRad(this.gameObject.transform.rotation));
        this.canvasCtx.drawImage(this.sprite, -this.imageSize.x / 2, -this.imageSize.y / 2, this.imageSize.x, this.imageSize.y); // cam, object pos = 50 / cam pos = -150 + 50 100
        this.canvasCtx.rotate(-ExtendedMath.degToRad(this.gameObject.transform.rotation));
        this.canvasCtx.translate(-this.gameObject.transform.position.x + (Camera.position.x - Camera.size.x / 2), -(-this.gameObject.transform.position.y + Camera.position.y + Camera.size.y / 2));
    }
}

class BasicRenderer extends Renderer{

}