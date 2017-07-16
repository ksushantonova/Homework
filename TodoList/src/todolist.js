

import {ToDoListItem} from './todolistitem.js';

  export class Todolist {

    constructor(input, parents, buttons){
        this.input = input;
        this.parent = parents;
        this.button = buttons;
        this.tasks = [];
        this.makeItem();    
    }


    makeItem(){

        let counter = 0;
        let deleteEvent = new CustomEvent("deleteEvent",{
                detail: {
                    count: "done"
                        }      
        });
        let changeEvent = new CustomEvent("changeEvent",{
                detail: {
                    count: "done"
                        }      
        });

        this.button.addEventListener("click", () => {
           this.tasks.push(new ToDoListItem(this.input.value, this.parent, deleteEvent, counter, changeEvent));
           counter++;  
           console.log(this.tasks);
           this.cleanValue();
        });


        this.input.addEventListener("keyup", (e) => {
             if(e.keyCode == 13){
          this.tasks.push(new ToDoListItem(this.input.value, this.parent, deleteEvent, counter, changeEvent));
           counter++;  
           console.log(this.tasks);
           this.cleanValue();
    }   
        });

        this.parent.addEventListener("deleteEvent", (event) => {
            this.tasks.forEach((task, i) => {
                if (task.counter == event.detail.number){
                   this.tasks.splice(i,1);
                   console.log(this.tasks); }
            })             
            })

          this.parent.addEventListener("changeEvent", (event) => {
            this.tasks.forEach((task, i) => {
                if (task.counter == event.detail.number){
                   this.tasks[i].inputValue = event.detail.value;
                  }
            })             
            })

    }
  
    cleanValue(){
        this.input.value = "";
    }

}

