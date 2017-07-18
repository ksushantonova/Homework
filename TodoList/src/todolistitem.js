
 class ToDoListItem {
        constructor (value, parent, deleteEvent, counter, changeEvent, proto){
//получаем все ивенты через свойства, а так же нужные нам данные
            this.inputValue = value;
            this.proto = proto;
            this.parent = parent.childNodes[3];
            this.counter = counter;
            this.deleteEvent = deleteEvent;
            this.changeEvent = changeEvent;
            this.mainContainer;
            this.check;
            this.newInput;
            this.remove;
            this.init();
        }

// строим новый айтем
         init(){
            this.htmlBuild();
            this.check = this.mainContainer.firstElementChild.childNodes[1];
            this.newInput = this.mainContainer.firstElementChild.childNodes[3];
            this.remove = this.mainContainer.firstElementChild.childNodes[5];
            this.checkItem();
            this.newItemValue(); 
            this.removeTask();

    }


   htmlBuild(){
          this.mainContainer = document.createElement("div");
          this.parent.appendChild(this.mainContainer);
          this.mainContainer.className = "mainContainer";
          this.mainContainer.innerHTML = ` 
                     <div class='container'>
                        <div class='check'>
                        <input type='checkbox' style='position:relative; cursor: pointer;
' >
                        </div>
                        <input class='newInput' value='${this.inputValue}'>
                        <div class='remove'><img src='cross.svg' style='heigth: 18px; width: 18px'></img></div>
                  </div>`; 
        }
    


// метод удаления из Дома
    removeTask(){
        this.remove.addEventListener("click", () => {
        this.deleteEvent.detail.number = this.counter;   
        this.parent.parentNode.dispatchEvent(this.deleteEvent);
            this.mainContainer.remove();
        });
    }

// метод изменения inputValue при его изменении на ходу
    newItemValue(){
        this.newInput.addEventListener("input", () => {
        this.changeEvent.detail.number = this.counter; 
        this.changeEvent.detail.value = this.newInput.value;
        this.parent.parentNode.dispatchEvent(this.changeEvent);
        })
    }

// метод выполнения задания
    checkItem(){
        this.check.addEventListener('click', () => {
            if (this.check.firstElementChild.checked){
            this.check.className = "checkedcheck";
            this.newInput.className = "checked";
            this.remove.className = "checkedremove";
            } else {
            this.check.className = "check";
            this.newInput.className = "newInput";
            this.remove.className = "remove";
            }
        });     

    }  


    }



   


