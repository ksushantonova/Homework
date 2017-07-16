

// import {ToDoListItem} from './todolistitem.js';

 class Todolist {

    constructor(input, parents, buttons){
        this.input = input;
        this.parent = parents;
        this.button = buttons;
        this.tasks = [];
        this.makeItem();    
    }



    makeItem(){

        let counter = 0;
        let event = new CustomEvent("deleteIvent",{
                detail: {
                    count: "done"
                        }      
        });

        this.button.addEventListener("click", () => {
           this.tasks.push(new ToDoListItem(this.input.value, this.parent, event, counter));
           counter++;  
           console.log(this.tasks);
           this.cleanValue();
        });


        this.input.addEventListener("keyup", (e) => {
             if(e.keyCode == 13){
          this.tasks.push(new ToDoListItem(this.input.value, this.parent, event, counter));
           counter++;  
           console.log(this.tasks);
           this.cleanValue();
    }   
        });

        this.parent.addEventListener("deleteIvent", (event) => {
            this.tasks.forEach((task, i) => {
                if (task.counter == event.detail.number){
                   this.tasks.splice(i,1);
                   console.log(this.tasks);
                }
            })             
            })

    }
  
    

    cleanValue(){
        this.input.value = "";
    }




   
}

