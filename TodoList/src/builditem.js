


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


    buildStorageLists(){

       this.localValue = localStorage.getItem('data');
       if (this.localValue !== null){ 
       this.localFrame = JSON.parse(this.localValue);
       this.localFrame.forEach(list => {
       this.buildItemHtml();
       this.buildInit(list);
       this.customEvent();
       });
    };

  }

    buildItemHtml(){
    	  let flexed = document.getElementById('flexed');
    	  this.mainFrame = document.createElement('div');
    	  this.mainFrame.className = 'main';
    	  this.mainFrame.innerHTML = this.frame;
        flexed.insertBefore(this.mainFrame, flexed.childNodes[1]);  
    };

    customEvent(){
    	  this.mainFrame.addEventListener("deleteLists", (event) => {
        this.getNumber(event);
        this.allLists.splice(this.temporaryList[1], 1);         
      }); 

        this.mainFrame.addEventListener("watch", (event) => {
            this.writeStorage();
            this.parseStorage();
        });  
    };

     
    
 


    getNumber(thisEvent){
        this.temporaryList = [];
        this.allLists.forEach((list, i) => {
        if (list.listCounter == thisEvent.detail.number){
        this.temporaryList.unshift(i);
        this.temporaryList.unshift(list);

             }
           });
      };

  

	  toDoListInit(){
        this.buildInit(null);
        this.writeStorage();
        this.parseStorage();
     };

     writeStorage(){
        localStorage.clear();
        this.allListsString = JSON.stringify(this.allLists);
        localStorage.setItem("data", this.allListsString);
     };

     parseStorage(){
        this.localValue = localStorage.getItem('data');
        this.localFrame = JSON.parse(this.localValue);

     };

     buildInit(object){
        let input = this.mainFrame.childNodes[1].childNodes[3].childNodes[3];
        let allDoneButton = this.mainFrame.childNodes[1].childNodes[1].childNodes[5];
        let deleteAllButton = this.mainFrame.childNodes[1].childNodes[1].childNodes[1];
        let parents = this.mainFrame;
        let buttons = input.nextElementSibling;
      this.allLists.push(new Todolist(input, parents, buttons, this.counter++, allDoneButton, deleteAllButton, object));
     };
	
};


