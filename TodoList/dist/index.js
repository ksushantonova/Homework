'use strict';

var _todolist = require('./todolist.js');

console.log("done");

//забираем все инпуты и делаем из них массив 

var inputs = document.querySelectorAll('.input');
inputs = Array.prototype.slice.call(inputs);

//проходим по массиву и инициализируем классы, собирая нужные данные
inputs.forEach(function (input) {
    var parents = input.parentElement.parentElement;
    var buttons = input.nextElementSibling;
    new _todolist.Todolist(input, parents, buttons);
});