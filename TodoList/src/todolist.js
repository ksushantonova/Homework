

// import {ToDoListItem} from './todolistitem.js';

 class Todolist {

    constructor(input, parents, buttons, counter){
        this.input = input;
        this.parent = parents;
        this.button = buttons;
        this.tasks = [];
        this.temporaryData = [];
        this.deleteEvent;
        this.changeEvent;
        this.listCounter = counter;
        this.counter = 0;
        this.makeItem();
    }

  

    makeItem(){
        this.newEvents();
        this.button.addEventListener("click", () => {
           this.buildTask();
        });

        this.input.addEventListener("keyup", (e) => {
             if(e.keyCode == 13){
            this.buildTask();
           };
        });

        this.initEvents();
        this.removeList();
      };



    initEvents(){
         this.parent.addEventListener("deleteEvent", (event) => {
         this.getNumber(event);
         this.tasks.splice(this.temporaryData[1], 1);
      });             

        this.parent.addEventListener("changeEvent", (event) => {
         this.getNumber(event);
         this.temporaryData[0].inputValue = event.detail.value;
        });        
        
        };
        
 
     newEvents(){
         this.deleteEvent = new CustomEvent("deleteEvent",{
                detail: {
                    count: "done"
                        }      
        });

        this.changeEvent = new CustomEvent("changeEvent",{
                detail: {
                    count: "done"
                        }      
        });
      };


    buildTask(){
        this.tasks.push(new ToDoListItem(this.input.value, this.parent, this.deleteEvent, this.counter++, this.changeEvent, this));
           this.cleanValue();
      };

     getNumber(thisEvent){
            this.temporaryData = [];
            this.tasks.forEach((task, i) => {
            if (task.counter == thisEvent.detail.number){
            this.temporaryData.unshift(i);
            this.temporaryData.unshift(task);
             }
           });
      };


    cleanValue(){
        this.input.value = "";
    };

    removeList(){


    this.input.previousElementSibling.addEventListener("click", () => {
      this.parent.remove();
  });
    
  };
};

