class BuildItem {
	constructor(parentContainer){
		this.parentContainer = parentContainer;
		this.main;
		this.deleteList;
		this.allLists = [];
		this.counter = 0;
		this.init();
	}


    init(){
    	document.getElementById('plus').addEventListener("click", () => {
    		this.buildItemHtml();
    		this.toDoListInit();
    	})

     }

    buildItemHtml(){
          this.main = document.createElement("div");
          this.parentContainer.appendChild(this.main);
          this.main.className = "main";
          this.main.innerHTML = ` 
        <div class="underdiv">
        <div class="cross"><img src='cross.svg' style='heigth: 18px; width: 18px'></img></div>
        <input class="input" type="text">
        <button class="but">DO</button>
         </div> 
         <div class="items"></div>  
                    `; 
        
    }

	toDoListInit(){
      let input = this.main.childNodes[1].childNodes[3];
      let parents = this.main;
      let buttons = input.nextElementSibling;
      this.allLists.push(new Todolist(input, parents, buttons, this.counter++));
     };
	
}


