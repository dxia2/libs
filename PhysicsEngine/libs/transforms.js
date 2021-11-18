class Transform{
    position;
    rotation;
    scale;
    // Position must be a vector 2
    constructor(position = new Vector2(0, 0), rotation = 0, scale = new Vector2(0, 0)){
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}
// Class that contains 2 values, x and y
// Used to position things
class Vector2{
    x;
    y;
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    getMagnitude(){
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    unit(){
        if(this.getMagnitude() === 0){
            return Vector2.zero();
        }
        let magnitude = this.getMagnitude();
        return new Vector2(this.x / magnitude, this.y / magnitude);
    }

    normal(){
        return new Vector2(-this.y, this.x).unit();
    }

    addToThis(vector2){
        this.x += vector2.x;
        this.y += vector2.y;
        return this;
    }

    multiplyThis(multiplier){
        this.x * multiplier;
        this.y * multiplier;
        return this;
    }

    static zero(){
        return new Vector2(0, 0);
    }

    static multiply(vector2, multiplier){
        return new Vector2(vector2.x * multiplier, vector2.y * multiplier);
    }

    static add(vector1, vector2){
        return new Vector2(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    static subtract(vector1, vector2){
        return new Vector2(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    static dot(point1, point2){
        return (point1.x * point2.x) + (point1.y * point2.y);
    }

    static drawVec(vector1, vector2, color){
        ctx.beginPath();
        ctx.moveTo(vector1.x - (Camera.position.x - Camera.size.x / 2), -(vector1.y - Camera.position.y - Camera.size.y / 2));
        ctx.lineTo(vector2.x - (Camera.position.x - Camera.size.x / 2), -(vector2.y - Camera.position.y - Camera.size.y / 2));
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}