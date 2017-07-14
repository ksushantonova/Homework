'use strict';

var _todolist = require('./todolist.js');

var _todolist2 = _interopRequireDefault(_todolist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("done");

var inputs = document.querySelectorAll('.input');
inputs = Array.prototype.slice.call(inputs);

inputs.forEach(function (input) {
    var parents = input.parentElement;
    var buttons = input.nextElementSibling;
    new _todolist2.default(input, parents, buttons);
});