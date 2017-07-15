

// import ToDoListItem from './todolistitem.js';

 class Todolist {

    constructor(input, parents, buttons){
        this.input = input;
        this.parent = parents;
        this.button = buttons;
        this.tasks = [];
        this.counterArray = [];
        this.makeItem();    
    }

    makeItem(){
        
        this.button.addEventListener("click", () => {
           this.tasks.push(new ToDoListItem(this.input.value, this.parent));
           this.cleanValue();
           console.log(this.tasks);

        });

    }


    cleanValue(){
        this.input.value = "";
    }


   
}

