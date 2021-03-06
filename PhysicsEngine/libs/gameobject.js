class GameObject{
    name;
    transform = new Transform(new Vector2(0, 0), 0, new Vector2(1, 1));
    components = [];
    constructor(name, componentsToAdd = []){
        this.name = name;
        for(let i = 0; i < componentsToAdd.length; i++){
            this.components.push(componentsToAdd[i]);
        }
    }

    addComponent(component){
        for(let i = 0; i < this.components.length; i++){
            if(this.components[i].constructor === component.constructor){
                console.log("Cannot have 2 components of the same type on a gameobject!");
                return;
            }
        }
        this.components.push(component);
        return component;
    }

    getComponent(componentType){
        for(let i = 0; i < this.components.length; i++){
            if(this.components[i] instanceof componentType){
                return this.components[i];
            }
        }
        return null;
    }
}