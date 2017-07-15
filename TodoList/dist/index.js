'use strict';

var _todolist = require('./todolist.js');

console.log("done");

var inputs = document.querySelectorAll('.input');
inputs = Array.prototype.slice.call(inputs);

inputs.forEach(function (input) {
    var parents = input.parentElement;
    var buttons = input.nextElementSibling;
    new _todolist.Todolist(input, parents, buttons);
});