
 class ToDoListItem {
        constructor (value, parent, counter, task, watch){
//получаем все ивенты через свойства, а так же нужные нам данные
            this.watch = watch;
            this.local = task;
            this.inputValue = value;
            this.parent = parent; // items
            this.counter = counter;
            this.checkedItem = false;
            this.init();
        }

// строим новый айтем
    init(){
        this.newEvents();
        this.workingWithLocalStorage();
        this.htmlBuild();
        this.mainElements();
        this.mainContainerStyles();
        this.startInputValue();
        this.focusTodolistInput();
        this.checkItem();
        this.newItemValue(); 
        this.isChecked();
        this.removeTask();
        this.parent.parentNode.parentNode.dispatchEvent(this.watch);
           
    }

// если есть какие-то локальные данные, забираем из них инпут, и информацию, какие из айтемов были чекнуты
    workingWithLocalStorage(){
        if (this.local !== null){
            this.inputValue = this.local.inputValue;
            this.checkedItem = this.local.checkedItem;
            this.parent.parentNode.parentNode.dispatchEvent(this.watch);

    }};

    startInputValue(){
        this.newInput.value = this.inputValue;
    }

    mainElements(){
        this.check = this.mainContainer.firstElementChild.childNodes[1];
        this.newInput = this.mainContainer.firstElementChild.childNodes[3];
        this.remove = this.mainContainer.firstElementChild.childNodes[5];
    }

    mainContainerStyles(){
        this.newInput.addEventListener('mouseover', () => {
             this.remove.style.display = "block";
             this.mainContainer.style.borderTop = "1px solid #E5E5E5";
              this.mainContainer.style.borderBottom = "1px solid #E5E5E5";

        });

          this.newInput.addEventListener('input', () => {
             this.remove.style.display = "block";
             this.mainContainer.style.borderTop = "1px solid#E5E5E5";
              this.mainContainer.style.borderBottom = "1px solid #E5E5E5";

        });

           this.remove.addEventListener('mouseover', () => {
            this.remove.style.display = "block";
             this.mainContainer.style.borderTop = "1px solid #E5E5E5";
              this.mainContainer.style.borderBottom = "1px solid #E5E5E5";


        });

            this.newInput.addEventListener('blur', () => {
            this.remove.style.display = "none";
             this.mainContainer.style.border = "none";

        });

         this.remove.addEventListener('mouseout', (e) => {
            this.remove.style.display = "none";
               this.mainContainer.style.border = "none"; 
        });

         this.newInput.addEventListener('mouseout', (e) => {
            this.remove.style.display = "none";
               this.mainContainer.style.border = "none"; 
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
        this.parent.appendChild(this.mainContainer);
        this.mainContainer.className = "mainContainer";
        this.mainContainer.innerHTML = ` 
                     <div class='container'>
                        <div class='check'>
                        <input type='checkbox' style='position:relative; cursor: pointer'>
                        </div>
                        <input class='newInput' value='${this.inputValue}'>
                        <div class='remove'><img src='cross.png' style='heigth: 18px; width: 22px; display:block'></img></div>
                  </div>`; 
        this.parent.parentNode.parentNode.dispatchEvent(this.watch);
        }
    
   focusTodolistInput(){
        this.newInput.addEventListener("keyup", (e) => {
             if(e.keyCode == 13){
             this.parent.parentNode.parentNode.dispatchEvent(this.focusInput);
           };
        });
   }     

// метод удаления из Дома
    removeTask(){
        this.remove.addEventListener("click", () => {
        this.deleteEvent.detail.number = this.counter;   
        this.parent.parentNode.parentNode.dispatchEvent(this.deleteEvent);
        this.mainContainer.remove();
        this.parent.parentNode.parentNode.dispatchEvent(this.watch);
    });
}

// следим за изменениями в чекбоксах, результат записываем в класс.
    isChecked(){
        this.check.addEventListener('change', () => {
             if (this.check.firstElementChild.checked){
            this.checkedItem = true;
             this.checkItem();
            this.parent.parentNode.parentNode.dispatchEvent(this.watch);
        } else {
            this.checkedItem = false;
               this.checkItem();
               this.parent.parentNode.parentNode.dispatchEvent(this.watch);
            }
        });
    }

// метод изменения inputValue при его изменении на ходу
    newItemValue(){
        this.newInput.addEventListener("input", () => {
        this.changeEvent.detail.number = this.counter; 
        this.changeEvent.detail.value = this.newInput.value;
        this.parent.parentNode.parentNode.dispatchEvent(this.changeEvent);
        this.parent.parentNode.parentNode.dispatchEvent(this.watch);
        })
    }

// если в классе статус чекбокса checked - применяем стили, и наоборот
    checkItem(){
        if (this.checkedItem){
        this.check.className = "checkedcheck";
        this.newInput.className = "checked";
        this.remove.className = "checkedremove";
        this.check.firstElementChild.checked = true;
       this.parent.parentNode.parentNode.dispatchEvent(this.watch);
        } else {
        this.check.className = "check";
        this.newInput.className = "newInput";
        this.remove.className = "remove";
        this.parent.parentNode.parentNode.dispatchEvent(this.watch);
            }
    };  

    }



   


