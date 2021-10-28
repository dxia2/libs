class Camera{
    static renderers = [];
    static position;
    static size;
    static update(){
        for(let i = 0; i < this.renderers.length; i++){
            this.renderers[i].draw();
        }
    }

    static getPosition(){
        return new Vector2(this.position.x - this.size.x, this.position.y - this.size.y);
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
        this.canvasCtx.translate(gameobject.transform.position.x + Camera.getPosition().x, gameobject.transform.position.y + Camera.getPosition().y);
        this.canvasCtx.rotate(ExtendedMath.degToRad(gameobject.transform.rotation));
        this.canvasCtx.drawImage(this.sprite, -this.imageSize.x / 2, -this.imageSize.y / 2, this.imageSize.x, this.imageSize.y);
        this.canvasCtx.rotate(-ExtendedMath.degToRad(gameobject.transform.rotation));
        this.canvasCtx.translate(-gameobject.transform.position.x, -gameobject.transform.position.y);
    }
}

class BasicRenderer extends Renderer{

}