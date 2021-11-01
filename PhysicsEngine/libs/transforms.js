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
        return Math.sqrt(Math.pow(this.x, 2) + Math.Pow(this.y, 2));
    }
    // LEFT OF F HEER AAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    getNormalizedVector(){
        let magnitude = this.getMagnitude();
        return new Vector2;
    }
}