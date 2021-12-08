class ExtendedMath{
    static randInt(min, max){
        return Math.floor(Math.random() * (max-min+1)) + min;
    }

    static degToRad(deg){
        return deg * (Math.PI / 180);
    }

    static radToDeg(rad){
        return rad * (180 / Math.PI);
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

    static round(number, precision){
        let factor = 10**precision;
        return Math.round(number * factor) / factor;
    }
}

class Matrix{
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.data = [];

        for (let i = 0; i<this.rows; i++){
            this.data[i] = [];
            for (let j=0; j<this.cols; j++){
                this.data[i][j] = 0;
            }
        }
    }

    multiplyVec(vec){
        let result = new Vector2(0,0);
        result.x = this.data[0][0]*vec.x + this.data[0][1]*vec.y;
        result.y = this.data[1][0]*vec.x + this.data[1][1]*vec.y;
        return result;
    }
}