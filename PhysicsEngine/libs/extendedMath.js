class ExtendedMath{
    static degToRad(deg){
        return deg * (Math.PI / 180);
    }

    static lerp(a, b, t){
        if(t < 0 || t > 1){
            console.log("T VALUE OF LERP CANNOT BE GREATER THAN 1 OR LESS THAN 0");
            return;
        }
        return a + (b - a) * t;
    }

    static rotatePoint(pivot, point, angle){
        angle *= -1;
        // Rotate clockwise, angle in radians
        let x = Math.round((Math.cos(angle) * (point.x - pivot.x)) -
        (Math.sin(angle) * (point.y - pivot.y)) +
        pivot.x);
        let y = Math.round((Math.sin(angle) * (point.x - pivot.x)) +
        (Math.cos(angle) * (point.y - pivot.y)) +
        pivot.y);
        return new Vector2(x, y).getNormalizedVector();
    }

    static vector2DotProduct(point1, point2){
        return (point1.x * point2.x) + (point1.y * point2.y);
    }
}