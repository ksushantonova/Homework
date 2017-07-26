

// import {ToDoListItem} from './todolistitem.js';

 class Todolist {

    constructor(parent, counter, local){
        this.local = local;
        this.parent = parent; // mainFrame
        this.tasks = [];
        this.listCounter = counter;
        this.taskCounter = 0;
        this.makeList();
    }

  
// созлание нового айтема
    makeList(){
        this.makeFrame();
        this.mainElements();
        this.getHeader();
        this.newEvents();
        this.workingWithLocalStorage();
        this.inputs();  
        this.initEvents();
        this.removeList();
        this.deleteAllEvents();
        this.doneallItems()
      };

      makeFrame(){
         this.parent.innerHTML = ` 
    <div style="display:flex; flex-direction:column">
    <div style="display:flex; flex-direction:row">
    <div style="width:25px; height:25px; cursor:pointer; padding: 0 0 0 9px"><img src='del.png' style='heigth: 23px; width: 23px'></img></div>
   <div class="header" contenteditable="true" style="width:382px">Blabla</div>  
    <div  style="width:25px;cursor:pointer; height:25px; padding: 5px 0 0 0;"><img src='all.png' style='heigth: 23px; width: 23px'></img></div>
    </div>
        <div class="underdiv">
            <div class="cross"><img src='cross.svg' style='heigth: 18px; width: 18px'></img></div>
            <input class="input" type="text">
            <button class="but">DO</button>
         </div> 
         </div>
         <div class="items"></div>  
                    `;
      }
    
// работа с данными из локалсторейдж( забирает заголовок, и запускает метод строительства заданий)
    workingWithLocalStorage(){
      if (this.local !== null){
        let header = this.parent.childNodes[1].childNodes[1].childNodes[3];
        header.innerText = (this.local.header);
        this.header = this.local.header;
        this.buildLocalTask();
      }

    };

    doneallItems(){
           this.allDoneButton.addEventListener("click", () => {
                console.log(this.tasks);
                this.tasks.forEach(task => {
                task.checkedItem = true;
                task.check.firstElementChild.checked = true;
                task.checkItem();

                })
           });
    };

// выясняет, сколько заданий было в локалсторейдж, и строит такое же количество 
     buildLocalTask(){
        this.local.tasks.forEach(item => {
            this.buildTask(item);
        });
            
        };

    inputs(){

            this.button.addEventListener("click", () => {
            this.buildTask(null);
        });

        this.input.addEventListener("keyup", (e) => {
            if(e.keyCode == 13){
            this.buildTask(null);
           };
        });
    }

// ловим ивенты удаления, и изменения в айтемх
    initEvents(){
         this.temporaryData = [];
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
        this.deleteAllButton.addEventListener("click", () => {
        this.tasks = [];
        this.parent.lastElementChild.innerHTML = "";
        this.parent.dispatchEvent(this.taskswatch);

        })
     }   
 // инициализация всех кастомивентов которые относятся к этому классу
     newEvents(){

          this.deleteLists = new CustomEvent("deleteLists",{
                detail: {count: "done"}      
        });

    };

    mainElements(){
        this.input = this.parent.childNodes[1].childNodes[3].childNodes[3];
        this.allDoneButton = this.parent.childNodes[1].childNodes[1].childNodes[5];
        this.deleteAllButton = this.parent.childNodes[1].childNodes[1].childNodes[1];
        this.button = this.input.nextElementSibling;
    };
// строительство нового айтема
    buildTask(localData){

      this.tasks.push(new ToDoListItem(this.input.value, this.parent.childNodes[3], this.taskCounter++,localData));
              console.log(this.tasks);
      this.cleanValue();


      };
// метод наблюдает за любыми изменениями заголовка, и списывает их в массив
    getHeader(){
      let header = this.parent.childNodes[1].childNodes[1].childNodes[3];
      this.header = header.innerText;
      header.addEventListener("input", () => {
            this.header = header.innerText;
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

  });
    
  };
};

