class Transform{
    position;
    rotation;
    // Position must be a vector 2
    constructor(position = new Vector2(0, 0), rotation = 0){
        this.position = position;
        this.rotation = rotation;
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
}