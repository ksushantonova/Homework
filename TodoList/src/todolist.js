

// import {ToDoListItem} from './todolistitem.js';

 class Todolist {

    constructor(input, parents, buttons, counter, done, deleteall, local){
        this.local = local;
        this.localItem;
        this.header;
        this.input = input;
        this.parent = parents;
        this.button = buttons;
        this.tasks = [];
        this.temporaryData = [];
        this.deleteEvent;
        this.changeEvent;
        this.deleteLists;
        this.allDone = done;
        this.deleteAll = deleteall;
        this.listCounter = counter;
        this.taskCounter = 0;
        this.makeItem();
    }

  

    makeItem(){
        this.getHeader();
        this.newEvents();
        this.workingWithLocalStorage();
        this.button.addEventListener("click", () => {
        this.buildTask(null);
        });

        this.input.addEventListener("keyup", (e) => {
             if(e.keyCode == 13){
            this.buildTask(null);
           };
        });

            this.initEvents();
            this.removeList();
            this.deleteAllEvents();
      };
    

    workingWithLocalStorage(){
      if (this.local !== null){
        let header = this.parent.childNodes[1].childNodes[1].childNodes[3];
        header.innerText = (this.local.header);
        this.header = this.local.header;

        this.buildLocalTask();
         for (let i = 0; i < this.local.tasks.length; i++){
               this.tasks[i].inputValue = this.local.tasks[i].inputValue;
               this.tasks[i].checkedItem = this.local.tasks[i].checkedItem;
         };
     
      }
    };

     buildLocalTask(){
        this.local.tasks.forEach(item => {
            this.buildTask(item);
        });
            
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
        
     deleteAllEvents(){
        this.deleteAll.addEventListener("click", () => {
          this.tasks = [];
          this.parent.lastElementChild.innerHTML = "";
        })
     }   
 
     newEvents(){
         this.deleteEvent = new CustomEvent("deleteEvent",{
                detail: {count: "done"}      
        });

        this.changeEvent = new CustomEvent("changeEvent",{
                detail: {count: "done"}      
        });

        this.deleteLists = new CustomEvent("deleteLists",{
                detail: {count: "done"}      
        });

      };
   


    buildTask(item){
        this.tasks.push(new ToDoListItem(this.input.value, this.parent, this.deleteEvent, this.taskCounter++, this.changeEvent,  this.allDone, this.deleteAll, item));
           this.cleanValue();
      };

    getHeader(){
      let header = this.parent.childNodes[1].childNodes[1].childNodes[3];
      this.header = header.innerText;
      header.addEventListener("input", () => {
            this.header = header.innerText;
      });

    }


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
    this.deleteLists.detail.number = this.listCounter; 
    this.parent.dispatchEvent(this.deleteLists);
    this.parent.remove();
  });
    
  };
};

