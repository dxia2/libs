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
}