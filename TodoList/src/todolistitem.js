// import {tasks} from "./todolist.js";

 class ToDoListItem {
        constructor (value, parent,event, counter){
            this.inputValue = value;
            this.parent = parent;
            this.counter = counter;
            this.event = event;
            this.makeVisual();
        }

         makeVisual(){
            let container = document.createElement('div');
            let remove = document.createElement('div');
            let check = document.createElement('div');
            let newInput = document.createElement('input');
            let mainContainer = document.createElement('div');
            check.innerHTML = "<input type='checkbox' style='position:relative'>";
            newInput.value = this.inputValue;
            container.className = "container";
            remove.innerHTML = "<img src='cross.svg' style='heigth: 18px; width: 18px'></img>";
            remove.className = "remove";
            check.className = "check";
            newInput.className = "newInput";
            container.appendChild(check);
            container.appendChild(newInput);
            container.appendChild(remove);
            mainContainer.appendChild(container);
            mainContainer.className = "mainContainer";
            this.parent.appendChild(mainContainer);
            this.checkItem(check); 
            this.removeTask(remove);




    }

    removeTask(element){
        element.addEventListener("click", () => {
        this.event.detail.number = this.counter;    
        this.parent.dispatchEvent(this.event);
            element.parentElement.remove();
        })
    }

    checkItem(element){
        element.addEventListener('click', () => {
            if (element.firstChild.checked){
            element.className = "checkedcheck";
            element.nextElementSibling.className = "checked";
             element.nextElementSibling.nextElementSibling.className = "checkedremove";
                
            } else {
            element.className = "check";
            element.nextElementSibling.className = "newInput";
             element.nextElementSibling.nextElementSibling.className = "remove";
            }


            });     

    }   
    }



   


