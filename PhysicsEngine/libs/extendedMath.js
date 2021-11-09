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
        let radians = ExtendedMath.degToRad(angle);
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        let newX = (cos * (point.x - pivot.x)) + (sin * (point.y - pivot.y)) + pivot.x;
        let newY = (cos * (point.y - pivot.y)) - (sin * (point.x - pivot.x)) + pivot.y;
        return new Vector2(newX, newY);
    }

    static vector2DotProduct(point1, point2){
        return (point1.x * point2.x) + (point1.y * point2.y);
    }

    static projShapeOntoAxis(axis, collider){
        let min = ExtendedMath.vector2DotProduct(axis, collider.getVertexWorldPos(0));
        let max = min;
        let collVertex = collider.vertices[0];
        for(let i = 0; i < collider.vertices.length; i++){
            let p = ExtendedMath.vector2DotProduct(axis, collider.getVertexWorldPos(i));
            if(p < min){
                min = p;
                collVertex = collider.vertices[i];
            }
            if(p > max){
                max = p;
            }
        }

        return {
            min: min,
            max: max, 
            collVertex: collVertex
        }
    }
}