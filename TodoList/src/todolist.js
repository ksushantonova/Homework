

// import {ToDoListItem} from './todolistitem.js';

 class Todolist {

    constructor(parent, counter, local, watch){
        this.watch = watch;
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
        this.doneallItems();
        this.parent.dispatchEvent(this.watch);

      };

      makeFrame(){
         this.parent.innerHTML = ` 
    <div class="head">
    <div class="todoHeader">
   <div class="header" contenteditable="true" >Blabla</div> 
    <div style="width:25px; height:25px; cursor:pointer; padding: 16px 0 0 13px;"><img src='all2.png' style='heigth: 23px; width: 23px'></img></div>
    <div  style="width:25px;cursor:pointer; height:25px; padding: 16px 15px 0 16px;"><img src='del2.png' style='heigth: 23px; width: 23px'></img></div>
    </div>
    <div class="items"></div>  
        <div class="underdiv">
            <input class="input" type="text" placeholder=" + New task"/>
            <div class="cross"><img src='cross.png' style='heigth: 30px; width: 22px'></img></div>
         </div> 
         </div>
                    `;
      }
    
// работа с данными из локалсторейдж( забирает заголовок, и запускает метод строительства заданий)
    workingWithLocalStorage(){
      if (this.local !== null){
        let header = this.parent.childNodes[1].childNodes[1].childNodes[1];
        header.innerText = (this.local.header);
        this.header = this.local.header;
        this.buildLocalTask();
      }

    };
    

    doneallItems(){
           this.allDoneButton.addEventListener("click", () => {
                this.tasks.forEach(task => {
                task.checkedItem = true;
                task.check.firstElementChild.checked = true;
                task.checkItem();
                })
           });
           this.parent.dispatchEvent(this.watch);

    };

// выясняет, сколько заданий было в локалсторейдж, и строит такое же количество 
     buildLocalTask(){
        this.local.tasks.forEach(item => {
            this.buildTask(item);
        });
        this.parent.dispatchEvent(this.watch);
            
        };

    inputs(){

        //    this.input.addEventListener("change", () => {
        //     this.buildTask(null);
        // }); 

        this.input.addEventListener("keyup", (e) => {
             this.buildTask(null);
           //  if(e.keyCode == 13){
           //  this.buildTask(null);
           // };
        });
        this.parent.dispatchEvent(this.watch);

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

        this.parent.addEventListener("focusInput", () => {
            this.input.focus();
        }); 
        };

// при клике на мусорный бак удаляются все айтемы
     deleteAllEvents(){
        this.deleteAllButton.addEventListener("click", () => {
        this.tasks = [];
        this.parent.childNodes[1].childNodes[3].innerHTML = "";
        this.parent.dispatchEvent(this.watch);

        })

     }   
 // инициализация всех кастомивентов которые относятся к этому классу
     newEvents(){

          this.deleteLists = new CustomEvent("deleteLists",{
                detail: {count: "done"}      
        });

    };

    mainElements(){
        this.input = this.parent.childNodes[1].childNodes[5].childNodes[1];
        this.allDoneButton = this.parent.childNodes[1].childNodes[1].childNodes[3];
        this.deleteAllButton = this.parent.childNodes[1].childNodes[1].childNodes[5];
        this.parent.dispatchEvent(this.watch);

    };
// строительство нового айтема
    buildTask(localData){
      this.tasks.push(new ToDoListItem(this.input.value, this.parent.childNodes[1].childNodes[3], this.taskCounter++,localData, this.watch));
      this.cleanValue();
      this.parent.childNodes[1].childNodes[3].lastElementChild.childNodes[1].childNodes[3].focus();
      };
// метод наблюдает за любыми изменениями заголовка, и списывает их в массив
    getHeader(){
      let header = this.parent.childNodes[1].childNodes[1].childNodes[1];
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
    this.input.nextElementSibling.addEventListener("click", () => {
    this.deleteLists.detail.number = this.listCounter; 
    this.parent.dispatchEvent(this.deleteLists);
    this.parent.remove();
     this.parent.dispatchEvent(this.watch); 
  });
   
  };
};

