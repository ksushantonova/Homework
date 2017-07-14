class ToDoListItem {
        constructor (value, parent){
            this.inputValue = value;
            this.parent = parent;
            this.makeVisual();
        }

         makeVisual(){
            let container = document.createElement('div');
            let remove = document.createElement('div');
            let check = document.createElement('div');
            let newInput = document.createElement('input');
            newInput.value = this.inputValue;
            container.className = "container";
            remove.className = "remove";
            check.className = "check";
            newInput.className = "newInput";
            container.appendChild(check);
            container.appendChild(newInput);
            container.appendChild(remove);
            this.parent.appendChild(container);
            this.checkItem(check); 
            this.removeTask(remove);
            console.log(this);
 
    }

    removeTask(element){
        element.addEventListener("click", () => {
            element.parentElement.remove();
        })
    }

    checkItem(element){
        element.addEventListener('click', () => {
            element.nextElementSibling.className = "checked";
           });     

    }   
    }



   


