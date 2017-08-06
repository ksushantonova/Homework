 // import ToDoListItem from './todolistitem.ts';

 export default class Todolist {
        opt: any;
        tasks: any;
        listCounter: number;
        taskCounter: number;
        header: string;
        allDoneButton: Node;
        deleteAllButton: Node;
        deleteLists: CustomEvent;
        inputs: any;
        temporaryData: any;


    constructor(options: object){
        this.opt = options;
        this.tasks = [];
        this.taskCounter = 0;
        this.makeList();
    }
  
// созлание нового айтема
    makeList(){
        this.makeFrame();
        this.mainElements();
        this.getHeader();
        this.workingWithLocalStorage();
        this.newEvents();
        this.inputText();  
        this.initEvents();
        this.removeList();
        this.deleteAllEvents();
        this.doneallItems();
        this.opt.parents.dispatchEvent(this.opt.watch);

      };

      makeFrame(){
         this.opt.parents.innerHTML = ` 
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
      if (this.opt.localData !== null){
        let header: any = this.opt.parents.childNodes[1].childNodes[1].childNodes[1];
        header.innerText = (this.opt.localData.header);
        this.header = this.opt.localData.header;
        this.buildLocalTask();
      }
    };
    

    doneallItems(){
           this.allDoneButton.addEventListener("click", () => {
                this.tasks.forEach((task: any) => {
                task.checkedItem = true;
                task.check.firstElementChild.checked = true;
                task.checkItem();
                })
           });
           this.opt.parents.dispatchEvent(this.opt.watch);

    };

// выясняет, сколько заданий было в локалсторейдж, и строит такое же количество 
     buildLocalTask(){
        this.opt.localData.tasks.forEach((item: any) => {
            this.buildTask(item);
        });
        this.opt.parents.dispatchEvent(this.opt.watch);
            
        };

    inputText(){

        this.inputs.addEventListener("keyup", (e:Event) => {
             this.buildTask(null);
        });
        this.opt.parents.dispatchEvent(this.opt.watch);

    };

// ловим ивенты удаления, и изменения в айтемх
    initEvents(){
         this.temporaryData = [];
         this.opt.parents.addEventListener("deleteEvent", (e: CustomEvent) => {
            this.getNumber(e);
            this.tasks.splice(this.temporaryData[1], 1);
      });             

        this.opt.parents.addEventListener("changeEvent", (e: CustomEvent) => {
            this.getNumber(e);
            this.temporaryData[0].inputValue = e.detail.value;
        });  

        this.opt.parents.addEventListener("focusInput", () => {
            this.inputs.focus();
        }); 
        };

// при клике на мусорный бак удаляются все айтемы
     deleteAllEvents(){
        this.deleteAllButton.addEventListener("click", () => {
        this.tasks = [];
        this.opt.parents.childNodes[1].childNodes[3].innerHTML = "";
        this.opt.parents.dispatchEvent(this.opt.watch);

        })

     }   
 // инициализация всех кастомивентов которые относятся к этому классу
     newEvents(){
          this.deleteLists = new CustomEvent("deleteLists",{
                detail: {count: "done"}      
        });

    };

    mainElements(){
        this.inputs = this.opt.parents.childNodes[1].childNodes[5].childNodes[1];
        this.allDoneButton = this.opt.parents.childNodes[1].childNodes[1].childNodes[3];
        this.deleteAllButton = this.opt.parents.childNodes[1].childNodes[1].childNodes[5];
        this.opt.parents.dispatchEvent(this.opt.watch);

    };
// строительство нового айтема
    buildTask(data: object){
      let todolistitemOptions: object = {
          inputs: this.inputs,
          parents: this.opt.parents.childNodes[1].childNodes[3],
          counter: this.opt.counter++,
          localData: data,
          watch: this.opt.watch
      };
      this.lazyLoader(todolistitemOptions);      
    };



    lazyLoader(data: any){
        import('./todolistitem.ts').then(
        (module: any) => {
        const todoListItem: any = module.default;
          this.tasks.push(new todoListItem(data));
     });
          this.opt.parents.dispatchEvent(this.opt.watch);
    };


// метод наблюдает за любыми изменениями заголовка, и списывает их в массив
    getHeader(){

      let header: HTMLElement = this.opt.parents.childNodes[1].childNodes[1].childNodes[1];
      this.header = header.innerText;
      header.addEventListener("input", () => {
            this.header = header.innerText;
             this.opt.parents.dispatchEvent(this.opt.watch);
      });
      
    }
// метод сравнивает номера в details и в массиве, на выходе получаем массив из элемента и его индекса
     getNumber(thisEvent: CustomEvent){
            this.temporaryData = [];
            this.tasks.forEach((task: any, i: number) => {
            if (task.opt.counter == thisEvent.detail.number){
            this.temporaryData.unshift(i);
            this.temporaryData.unshift(task);
             }
           });
      };

    cleanValue(){
        this.inputs.value = "";
    };

// удаление листа 
    removeList(){
    this.inputs.nextElementSibling.addEventListener("click", () => {
    this.deleteLists.detail.number = this.listCounter; 
    this.opt.parents.dispatchEvent(this.deleteLists);
    this.opt.parents.remove();
    this.opt.parents.dispatchEvent(this.opt.watch); 
  });
   
  };
};

