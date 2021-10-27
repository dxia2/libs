class GameObject{
    components = [];
    constructor(componentsToAdd = []){
        for(let i = 0; i < componentsToAdd.length; i++){
            this.components.push(componentsToAdd[i]);
        }
    }

    addComponent(component){
        this.components.push(component);
    }
}