 import Todolist from './todolist';


export default class BuildItem {

   container: Element;
   allLists: any;
   counter: number;
   localValue: string;
   localFrame: any;
   mainFrame: Element;
   temporaryList: any;
   watch: CustomEvent;
   allListsString: string;


	constructor(parent: Element){
    this.container = parent;
		this.allLists = [];
		this.counter = 0;
		this.init();
	};


    init(){
      // localStorage.clear();
        this.newEvent();
        this.buildStorageLists();
    	  document.getElementById('plus').addEventListener("click", () => {
    		this.buildItemHtml();
        this.toDoListInit();
        this.customEvent();
    	});
        
      };

// забираем все что есть из локалсторейджа, и в зависимости что там внутри - показываем локал, или пустой айтем.

    buildStorageLists(){
     
      this.localValue = localStorage.getItem('data');
      if (this.localValue !== null && this.localValue.length > 3){ 
        this.localFrame = JSON.parse(this.localValue);
        this.localFrame.forEach((list: object) => {
        this.buildItemHtml();
        this.buildInit(list);
        this.customEvent();
       });

    } else if (this.localValue !== null && this.localValue.length < 3){
        this.buildItemHtml();
        this.buildInit(null);
        this.customEvent();
    } else {
       this.buildItemHtml();
       this.buildInit(null);
       this.customEvent();
    } 
  }


// метод создает каркасс для нового листа
    buildItemHtml(){
    	  this.mainFrame = document.createElement('div');
    	  this.mainFrame.className = 'main';
        this.container.insertBefore(this.mainFrame, this.container.childNodes[1]);  
    };

// метод ловит все кастомивенты, которые нужно словить в этом классе 
    customEvent(){
          this.temporaryList = [];
// событие удаления листа
    	  this.mainFrame.addEventListener("deleteLists", (e: any) => {
          this.getNumber(e);
          this.allLists.splice(this.temporaryList[1], 1);         
      }); 
// событие watch - мгновенная перезапись изменений в локал
        this.mainFrame.addEventListener("watch", (event) => {
            this.writeStorage();
            this.parseStorage();
        });  
    };

    newEvent(){

        this.watch = new CustomEvent("watch",{
                detail: {count: "done"}
        });
    }

// метод, который сравнивает информацию о номере листа, которая пришла из нижнего класса, с номером листа
// возвращает массив с найденным элементом, и его индексом.
    getNumber(thisEvent: CustomEvent){
        this.temporaryList = [];
        this.allLists.forEach((list: any, i: number) => {
        if (list.listCounter == thisEvent.detail.number){
        this.temporaryList.unshift(i);
        this.temporaryList.unshift(list);

             }
           });
      };
// строит новый лист
	  toDoListInit(){
        this.buildInit(null);
        this.writeStorage();
        this.parseStorage();
     };

// метод перезаписывает локалсторейдж
     writeStorage(){
        localStorage.clear();
        this.allListsString = JSON.stringify(this.allLists);
        localStorage.setItem("data", this.allListsString);
     };
// метод забирает локальные данные и делает их пригодным для работы
     parseStorage(){
        this.localValue = localStorage.getItem('data');
        this.localFrame = JSON.parse(this.localValue);

     };

// создание нового класса Todolist (localData ставить если есть локалсторейдж)
     buildInit(localData: any){
        let todolistOptions: object = {
           parents: this.mainFrame,
           counter: this.counter++,
           localData: localData,
           watch: this.watch
    }
       this.allLists.push(new Todolist(todolistOptions));
   };
	
};


