
 export class ToDoListItem {
        constructor (value, parent, deleteEvent, counter, changeEvent){
//получаем все ивенты через свойства, а так же нужные нам данные
            this.inputValue = value;
            this.parent = parent;
            this.counter = counter;
            this.deleteEvent = deleteEvent;
            this.changeEvent = changeEvent;
            this.makeVisual();
        }

// строим новый айтем
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

// и прямо в нем запускаем функцию чека, удаления, и перезаписывания value при инициализации            
            this.checkItem(check);
            this.newItemValue(newInput); 
            this.removeTask(remove);

    }
// метод удаления из Дома
    removeTask(element){
        // слушаем куда был клик
        element.addEventListener("click", () => {
        //передаем в ивент удаления в details номер этого айтема, чтобы класс наверху мог его удалить   
        this.deleteEvent.detail.number = this.counter;   
        //запускаем ивент удаления 
        this.parent.dispatchEvent(this.deleteEvent);
        // удаляем элемент из ДОМа
            element.parentElement.remove();
        })
    }

// метод изменения inputValue при его изменении на ходу
    newItemValue(element){
        // слушаем куда было нажатие клавиатуры
        element.addEventListener("input", () => {
        //передаем в ивент Изменений в details номер этого айтема 
        this.changeEvent.detail.number = this.counter; 
        //передаем текущее значение на момент нажатия клавиатуры
        this.changeEvent.detail.value = element.value;
         //запускаем ивент Изменений 
        this.parent.dispatchEvent(this.changeEvent);
        })
    }

// метод выполнения задания
    checkItem(element){
        element.addEventListener('click', () => {
            if (element.firstChild.checked){
            //если значение секбокса true то меняются стили, которые его зачеркивают 
            element.className = "checkedcheck";
            element.nextElementSibling.className = "checked";
             element.nextElementSibling.nextElementSibling.className = "checkedremove";
            //если нет - то возвращают обратно в прежнее состояние 
            } else {
            element.className = "check";
            element.nextElementSibling.className = "newInput";
             element.nextElementSibling.nextElementSibling.className = "remove";
            }


            });     

    }   
    }



   


