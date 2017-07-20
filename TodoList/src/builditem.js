


class BuildItem {
	constructor(frame){
		this.frame = frame;
		this.mainFrame;
		this.deleteList;
		this.allLists = [];
		this.temporaryList = [];
		this.counter = 0;
		this.init();
	};


    init(){
    	document.getElementById('plus').addEventListener("click", () => {
    		this.buildItemHtml();
    		this.customEvent();
        this.toDoListInit();
    	});

     };

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
      let input = this.mainFrame.childNodes[1].childNodes[3].childNodes[3];
      let allDoneButton = this.mainFrame.childNodes[1].childNodes[1].childNodes[5];
      let deleteAllButton = this.mainFrame.childNodes[1].childNodes[1].childNodes[1];
      let parents = this.mainFrame;
      let buttons = input.nextElementSibling;
      this.allLists.unshift(new Todolist(input, parents, buttons, this.counter++, allDoneButton, deleteAllButton));
      console.log(this.allLists);
     };
	
};


