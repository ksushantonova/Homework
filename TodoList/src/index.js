// import Todolist from './todolist.js';
// console.log("done");

let inputs = document.querySelectorAll('.input');
inputs = Array.prototype.slice.call(inputs);

inputs.forEach(input => {
    let parents = input.parentElement;
    let buttons = input.nextElementSibling;
    new Todolist(input, parents, buttons);

});
