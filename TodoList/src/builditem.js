


class BuildItem {
	constructor(frame){
		this.frame = frame;
		this.mainFrame;
		this.deleteList;
		this.allLists = [];
		this.temporaryList = [];
		this.counter = 0;
    this.myStorage;
    this.localValue;
    this.localFrame;
		this.init();
	};


    init(){
        this.buildStorageLists();
    	  document.getElementById('plus').addEventListener("click", () => {
    		this.buildItemHtml();
        this.toDoListInit();
        this.customEvent();
    	});
        
      };

// забираем все что есть из локалсторейджа

    buildStorageLists(){

       this.localValue = localStorage.getItem('data');
       if (this.localValue !== null){ 
       this.localFrame = JSON.parse(this.localValue);
       this.localFrame.forEach(list => {
// для каждого объекта строим html, передавая в новый класс локальные данные текущего объекта
       this.buildItemHtml();
       this.buildInit(list);
       this.customEvent();
       });
    };

  }

// метод создает каркасс для нового листа
    buildItemHtml(){
    	  let flexed = document.getElementById('flexed');
    	  this.mainFrame = document.createElement('div');
    	  this.mainFrame.className = 'main';
    	  this.mainFrame.innerHTML = this.frame;
        flexed.insertBefore(this.mainFrame, flexed.childNodes[1]);  
    };

// метод ловит все кастомивенты, которые нужно словить в этом классе 
    customEvent(){
// событие удаления листа
    	  this.mainFrame.addEventListener("deleteLists", (event) => {
        this.getNumber(event);
        this.allLists.splice(this.temporaryList[1], 1);         
      }); 
// событие watch - мгновенная перезапись изменений в локал
        this.mainFrame.addEventListener("watch", (event) => {
            this.writeStorage();
            this.parseStorage();
        });  
    };

// метод, который сравнивает информацию о номере листа, которая пришла из нижнего класса, с номером листа
// возвращает массив с найденным элементом, и его индексом.
    getNumber(thisEvent){
        this.temporaryList = [];
        this.allLists.forEach((list, i) => {
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
     buildInit(localData){
        let input = this.mainFrame.childNodes[1].childNodes[3].childNodes[3];
        let allDoneButton = this.mainFrame.childNodes[1].childNodes[1].childNodes[5];
        let deleteAllButton = this.mainFrame.childNodes[1].childNodes[1].childNodes[1];
        let parent = this.mainFrame;
        let button = input.nextElementSibling;
      this.allLists.push(new Todolist(input, parent, button, this.counter++, allDoneButton, deleteAllButton, localData));
     };
	
};


