


 export default class ToDoListItem {

            opt: any;
            checkedItem: boolean;
            newInput: any;
            check: any;
            remove: any;
            mainContainer: Element;
            deleteEvent: CustomEvent;
            changeEvent: CustomEvent;
            focusInput: CustomEvent;
            inputValue: string;

        constructor (options: any){
            this.opt = options;
            this.inputValue = options.inputs.value;
            this.checkedItem = false;
            this.init();
        }

// строим новый айтем
    init(){
        this.newEvents();
        this.workingWithLocalStorage();
        this.htmlBuild();
        this.mainElements();
        this.startInputValue();
        this.mainContainerStyles();
        this.focusTodolistInput();
        this.checkItem();
        this.newItemValue(); 
        this.isChecked();
        this.removeTask();
        this.opt.parents.parentNode.parentNode.dispatchEvent(this.opt.watch);
           
    }

// если есть какие-то локальные данные, забираем из них инпут, и информацию, какие из айтемов были чекнуты
    workingWithLocalStorage(){
        if (this.opt.localData !== null){
            this.inputValue = this.opt.localData.inputValue;
            this.checkedItem = this.opt.localData.checkedItem;
            this.opt.parents.parentNode.parentNode.dispatchEvent(this.opt.watch);

    }};

    startInputValue(){
        this.newInput.focus();
        let val = this.inputValue;
        this.newInput.value = ""; 
        this.newInput.value = val; 
        this.opt.inputs.value = "";
    }

    mainElements(){
        this.check = this.mainContainer.firstElementChild.childNodes[1];
        this.newInput = this.mainContainer.firstElementChild.childNodes[3];
        this.newInput.value = this.opt.inputs.value;
        this.remove = this.mainContainer.firstElementChild.childNodes[5];
    }

    mainContainerStyles(){
        this.newInput.parentNode.addEventListener('mouseover', () => {
             this.remove.style.display = "block";

        });

          this.newInput.addEventListener('input', () => {
             this.remove.style.display = "block";

        });

         this.remove.addEventListener('mouseout', (e: Event) => {
            this.remove.style.display = "none";
        });

         this.newInput.parentNode.addEventListener('mouseout', (e: Event) => {
            this.remove.style.display = "none";

        });
    }
    newEvents(){

        
        this.deleteEvent = new CustomEvent("deleteEvent",{
                detail: {count: "done"}      
        });

        this.changeEvent = new CustomEvent("changeEvent",{
                detail: {count: "done"}      
        });

        this.focusInput = new CustomEvent("focusInput", {
                 detail: {count: "done"}
        });

    }

// постройка каркасса айтема
   htmlBuild(){
        this.mainContainer = document.createElement("div");
        this.opt.parents.appendChild(this.mainContainer);
        this.mainContainer.className = "mainContainer";
        this.mainContainer.innerHTML = ` 
                     <div class='container'>
                        <div class='check'>
                        <input type='checkbox' style='position:relative; cursor: pointer'>
                        </div>
                        <input class='newInput' value='${this.opt.inputs.value}'>
                        <div class='remove'><img src='cross.png' style='heigth: 18px; width: 22px; display:block'></img></div>
                  </div>`; 
        this.opt.parents.parentNode.parentNode.dispatchEvent(this.opt.watch);
        }
    
   focusTodolistInput(){
        this.newInput.addEventListener("keyup", (e: any) => {
             if(e.keyCode == 13){
             this.remove.style.display = "none";
             this.opt.parents.parentNode.parentNode.dispatchEvent(this.focusInput);
           };
        });
   }     

// метод удаления из Дома
    removeTask(){
        this.remove.addEventListener("click", () => {
        this.deleteEvent.detail.number = this.opt.counter;   
        this.opt.parents.parentNode.parentNode.dispatchEvent(this.deleteEvent);
        this.mainContainer.remove();
        this.opt.parents.parentNode.parentNode.dispatchEvent(this.opt.watch);
    });
}

// следим за изменениями в чекбоксах, результат записываем в класс.
    isChecked(){
        this.check.addEventListener('change', () => {
             if (this.check.firstElementChild.checked){
            this.checkedItem = true;
             this.checkItem();
            this.opt.parents.parentNode.parentNode.dispatchEvent(this.opt.watch);
        } else {
            this.checkedItem = false;
               this.checkItem();
               this.opt.parents.parentNode.parentNode.dispatchEvent(this.opt.watch);
            }
        });
    }

// метод изменения inputValue при его изменении на ходу
    newItemValue(){
        this.newInput.addEventListener("input", () => {
        this.changeEvent.detail.number = this.opt.counter; 
        this.changeEvent.detail.value = this.newInput.value;
        this.opt.parents.parentNode.parentNode.dispatchEvent(this.changeEvent);
        this.opt.parents.parentNode.parentNode.dispatchEvent(this.opt.watch);
        })
    }

// если в классе статус чекбокса checked - применяем стили, и наоборот
    checkItem(){
        if (this.checkedItem){
        this.check.className = "checkedcheck";
        this.newInput.className = "checked";
        this.remove.className = "checkedremove";
        this.check.firstElementChild.checked = true;
       this.opt.parents.parentNode.parentNode.dispatchEvent(this.opt.watch);
        } else {
        this.check.className = "check";
        this.newInput.className = "newInput";
        this.remove.className = "remove";
        this.opt.parents.parentNode.parentNode.dispatchEvent(this.opt.watch);
            }
    };  

    }



   


