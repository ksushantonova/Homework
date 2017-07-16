

import {ToDoListItem} from './todolistitem.js';

  export class Todolist {

    constructor(input, parents, buttons){
        this.input = input;
        this.parent = parents;
        this.button = buttons;
        this.tasks = [];
        this.makeItem();    
    }


    makeItem(){

//создаем счетчик для главного массива
        let counter = 0;
// создаем ивент для удаления
        let deleteEvent = new CustomEvent("deleteEvent",{
                detail: {
                    count: "done"
                        }      
        });

// создаем ивент для изменений в массиве        
        let changeEvent = new CustomEvent("changeEvent",{
                detail: {
                    count: "done"
                        }      
        });

// при клике на кнопку, в массив добавляются новые классы, счетчик увеличивается
        this.button.addEventListener("click", () => {
           this.tasks.push(new ToDoListItem(this.input.value, this.parent, deleteEvent, counter, changeEvent));
           counter++;  
           console.log(this.tasks);
           this.cleanValue();
        });

// то же самое, что и в верху, только для enter
        this.input.addEventListener("keyup", (e) => {
             if(e.keyCode == 13){
          this.tasks.push(new ToDoListItem(this.input.value, this.parent, deleteEvent, counter, changeEvent));
           counter++;  
           console.log(this.tasks);
           this.cleanValue();
    }   
        });

//когда ивент удаления получает команду, он запускает эту функцию
        this.parent.addEventListener("deleteEvent", (event) => {
            this.tasks.forEach((task, i) => {
//сравниваем номер класса который получил и его номер в массиве, и если он совпадает - удаляем из массива
                if (task.counter == event.detail.number){
                   this.tasks.splice(i,1);
                   console.log(this.tasks); }
            })             
            })
// когда ивент изменения получит команду он запускает эту функцию
          this.parent.addEventListener("changeEvent", (event) => {
            this.tasks.forEach((task, i) => {
//сравнивает номер класса который получил и его номер в массиве, и если он совпадает
                if (task.counter == event.detail.number){
                  //в масиве изменяем value на то, что пришло 
                   this.tasks[i].inputValue = event.detail.value;
                  }
            })             
            })

    }
  
    cleanValue(){
        this.input.value = "";
    }

}

