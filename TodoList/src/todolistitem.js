export default class ToDoListItem {
        constructor (value, parent){
            this.inputValue = value;
            this.parent = parent;
            this.makeVisual();
            this.tasks = [];
        }

         makeVisual(){
            let container = document.createElement('div');
            let remove = document.createElement('div');
            remove.className = "remove";
            let check = document.createElement('div');
            check.className = "check";
            let newInput = document.createElement('input');
            newInput.className = "it";
            newInput.value = this.inputValue;
            container.className = "container";
            container.appendChild(check);
            container.appendChild(newInput);
            container.appendChild(remove);
            this.parent.appendChild(container);
            this.checkItem();   
     
    }

    checkItem(){
        let doneCheckBox = document.querySelectorAll('.check');
          doneCheckBox.forEach( (key) => {
           key.addEventListener('click', () => {
            key.nextElementSibling.className = "checked";
           })     

    }  )  
    }
}