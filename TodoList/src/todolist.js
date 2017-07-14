

import ToDoListItem from './todolistitem.js';

export default class Todolist {

    constructor(input, parents, buttons){
        this.input = input;
        this.parent = parents;
        this.button = buttons;
        this.tasks = [];
        this.makeItem();    
    }

    makeItem(){
        this.button.addEventListener("click", () => {
           this.tasks.push(new ToDoListItem(this.input.value, this.parent).inputValue);
           console.log(this.tasks);
           this.cleanValue();
           this.removeItem();

        });

    }

    cleanValue(){
        this.input.value = "";
    }

    removeItem(){
           let remove = document.querySelectorAll('.remove');
           remove.forEach( (key) => {
           key.addEventListener('click', () => {
            key.parentElement.remove();
            this.tasks = [];
               let containers = document.querySelectorAll(".container");
                    for (let i = 0; i < containers.length; i++){
                        this.tasks.push(containers[i].firstChild.nextElementSibling.value);
                    }
               console.log(this.tasks);

           })
           });
        }
}

