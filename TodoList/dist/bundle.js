(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _todolist = require('./todolist.js');

console.log("done");

var inputs = document.querySelectorAll('.input');
inputs = Array.prototype.slice.call(inputs);

inputs.forEach(function (input) {
    var parents = input.parentElement.parentElement;
    var buttons = input.nextElementSibling;
    new _todolist.Todolist(input, parents, buttons);
});
},{"./todolist.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Todolist = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _todolistitem = require("./todolistitem.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Todolist = exports.Todolist = function () {
    function Todolist(input, parents, buttons) {
        _classCallCheck(this, Todolist);

        this.input = input;
        this.parent = parents;
        this.button = buttons;
        this.tasks = [];
        this.makeItem();
    }

    _createClass(Todolist, [{
        key: "makeItem",
        value: function makeItem() {
            var _this = this;

            var counter = 0;
            var deleteEvent = new CustomEvent("deleteEvent", {
                detail: {
                    count: "done"
                }
            });
            var changeEvent = new CustomEvent("changeEvent", {
                detail: {
                    count: "done"
                }
            });

            this.button.addEventListener("click", function () {
                _this.tasks.push(new _todolistitem.ToDoListItem(_this.input.value, _this.parent, deleteEvent, counter, changeEvent));
                counter++;
                console.log(_this.tasks);
                _this.cleanValue();
            });

            this.input.addEventListener("keyup", function (e) {
                if (e.keyCode == 13) {
                    _this.tasks.push(new _todolistitem.ToDoListItem(_this.input.value, _this.parent, deleteEvent, counter, changeEvent));
                    counter++;
                    console.log(_this.tasks);
                    _this.cleanValue();
                }
            });

            this.parent.addEventListener("deleteEvent", function (event) {
                _this.tasks.forEach(function (task, i) {
                    if (task.counter == event.detail.number) {
                        _this.tasks.splice(i, 1);
                        console.log(_this.tasks);
                    }
                });
            });

            this.parent.addEventListener("changeEvent", function (event) {
                _this.tasks.forEach(function (task, i) {
                    if (task.counter == event.detail.number) {
                        _this.tasks[i].inputValue = event.detail.value;
                    }
                });
            });
        }
    }, {
        key: "cleanValue",
        value: function cleanValue() {
            this.input.value = "";
        }
    }]);

    return Todolist;
}();
},{"./todolistitem.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoListItem = exports.ToDoListItem = function () {
    function ToDoListItem(value, parent, deleteEvent, counter, changeEvent) {
        _classCallCheck(this, ToDoListItem);

        this.inputValue = value;
        this.parent = parent;
        this.counter = counter;
        this.deleteEvent = deleteEvent;
        this.changeEvent = changeEvent;
        this.makeVisual();
    }

    _createClass(ToDoListItem, [{
        key: 'makeVisual',
        value: function makeVisual() {
            var container = document.createElement('div');
            var remove = document.createElement('div');
            var check = document.createElement('div');
            var newInput = document.createElement('input');
            var mainContainer = document.createElement('div');
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
            this.checkItem(check);
            this.newItemValue(newInput);
            this.removeTask(remove);
        }
    }, {
        key: 'removeTask',
        value: function removeTask(element) {
            var _this = this;

            element.addEventListener("click", function () {
                _this.deleteEvent.detail.number = _this.counter;
                _this.parent.dispatchEvent(_this.deleteEvent);
                element.parentElement.remove();
            });
        }
    }, {
        key: 'newItemValue',
        value: function newItemValue(element) {
            var _this2 = this;

            element.addEventListener("input", function () {
                _this2.changeEvent.detail.number = _this2.counter;
                _this2.changeEvent.detail.value = element.value;
                _this2.parent.dispatchEvent(_this2.changeEvent);
            });
        }
    }, {
        key: 'checkItem',
        value: function checkItem(element) {
            element.addEventListener('click', function () {
                if (element.firstChild.checked) {
                    element.className = "checkedcheck";
                    element.nextElementSibling.className = "checked";
                    element.nextElementSibling.nextElementSibling.className = "checkedremove";
                } else {
                    element.className = "check";
                    element.nextElementSibling.className = "newInput";
                    element.nextElementSibling.nextElementSibling.className = "remove";
                }
            });
        }
    }]);

    return ToDoListItem;
}();
},{}]},{},[1]);
