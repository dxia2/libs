class GameObject{
    transform = new Transform(new Vector2(0, 0), 0, new Vector2(1, 1));
    components = [];
    constructor(componentsToAdd = []){
        for(let i = 0; i < componentsToAdd.length; i++){
            this.components.push(componentsToAdd[i]);
        }
    }

    addComponent(component){
        for(let i = 0; i < this.components.length; i++){
            if(typeof component === typeof this.components[i]){
                console.log("Cannot have 2 components of the same type on a gameobject!");
                return;
            }
        }
        this.components.push(component);
    }

    getComponent(componentType){
        for(let i = 0; i < this.components.length; i++){
            if(this.components[i] instanceof componentType){
                return this.components[i];
            }
        }
    }
}