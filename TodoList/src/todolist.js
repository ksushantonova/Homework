

// import {ToDoListItem} from './todolistitem.js';

 class Todolist {

    constructor(input, parent, button, counter, done, deleteall, local){
        this.local = local;
        this.input = input;
        this.parent = parent;
        this.button = button;
        this.tasks = [];
        this.temporaryData = [];
        this.allDone = done;
        this.deleteAll = deleteall;
        this.listCounter = counter;
        this.taskCounter = 0;
        this.makeItem();
    }

  
// созлание нового айтема
    makeItem(){
        this.getHeader();
        this.newEvents();
        this.workingWithLocalStorage();

        this.button.addEventListener("click", () => {
            this.buildTask(null);
            this.parent.dispatchEvent(this.watch);
        });

        this.input.addEventListener("keyup", (e) => {
            if(e.keyCode == 13){
            this.buildTask(null);
            this.parent.dispatchEvent(this.watch);
           };
        });

        this.initEvents();
        this.removeList();
        this.deleteAllEvents();
      };
    
// работа с данными из локалсторейдж( забирает заголовок, и запускает метод строительства заданий)
    workingWithLocalStorage(){
      if (this.local !== null){
        let header = this.parent.childNodes[1].childNodes[1].childNodes[3];
        header.innerText = (this.local.header);
        this.header = this.local.header;
        this.buildLocalTask();
      }
        this.parent.dispatchEvent(this.watch);
    };

// выясняет, сколько заданий было в локалсторейдж, и строит такое же количество 
     buildLocalTask(){
        this.local.tasks.forEach(item => {
            this.buildTask(item);
            this.parent.dispatchEvent(this.watch);
        });
            
        };

// ловим ивенты удаления, и изменения в айтемх
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

// при клике на мусорный бак удаляются все айтемы
     deleteAllEvents(){
        this.deleteAll.addEventListener("click", () => {
        this.tasks = [];
        this.parent.lastElementChild.innerHTML = "";
        this.parent.dispatchEvent(this.watch);

        })
     }   
 // инициализация всех кастомивентов которые относятся к этому классу
     newEvents(){

        this.watch = new CustomEvent("watch",{
                detail: {count: "done"}      
        });

          this.deleteLists = new CustomEvent("deleteLists",{
                detail: {count: "done"}      
        });

    }


// строительство нового айтема
    buildTask(localData){
      
      this.tasks.push(new ToDoListItem(this.input.value, this.parent.childNodes[3], this.taskCounter++, this.allDone, this.deleteAll, localData, this.watch));
      this.cleanValue();
      this.parent.dispatchEvent(this.watch);

      };
// метод наблюдает за любыми изменениями заголовка, и списывает их в массив
    getHeader(){
      let header = this.parent.childNodes[1].childNodes[1].childNodes[3];
      this.header = header.innerText;
      header.addEventListener("input", () => {
            this.header = header.innerText;
            this.parent.dispatchEvent(this.watch);
      });
      


    }
// метод сравнивает номера в details и в массиве, на выходе получаем массив из элемента и его индекса
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

// удаление листа 
    removeList(){
    this.input.previousElementSibling.addEventListener("click", () => {
    this.deleteLists.detail.number = this.listCounter; 
    this.parent.dispatchEvent(this.deleteLists);
    this.parent.remove();
    this.parent.dispatchEvent(this.watch);
  });
    
  };
};

