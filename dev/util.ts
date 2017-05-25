class Util{
    
    public static checkCollision(object1:gameObject, object2:gameObject){
        return (object1.x < object2.x + object2.width &&
        object1.x + object1.width > object2.x &&
        object1.y < object2.y + object2.height &&
        object1.height + object1.y > object2.y) 

    }


}