import {Todolist} from './todolist.js';
console.log("done");
 
//забираем все инпуты и делаем из них массив 

let inputs = document.querySelectorAll('.input');
inputs = Array.prototype.slice.call(inputs);  

//проходим по массиву и инициализируем классы, собирая нужные данные
inputs.forEach(input => {
    let parents = input.parentElement.parentElement;
    let buttons = input.nextElementSibling;
    new Todolist(input, parents, buttons);

});
