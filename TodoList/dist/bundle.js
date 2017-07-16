(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

                        //создаем счетчик для главного массива
                        var counter = 0;
                        // создаем ивент для удаления
                        var deleteEvent = new CustomEvent("deleteEvent", {
                                detail: {
                                        count: "done"
                                }
                        });

                        // создаем ивент для изменений в массиве        
                        var changeEvent = new CustomEvent("changeEvent", {
                                detail: {
                                        count: "done"
                                }
                        });

                        // при клике на кнопку, в массив добавляются новые классы, счетчик увеличивается
                        this.button.addEventListener("click", function () {
                                _this.tasks.push(new _todolistitem.ToDoListItem(_this.input.value, _this.parent, deleteEvent, counter, changeEvent));
                                counter++;
                                console.log(_this.tasks);
                                _this.cleanValue();
                        });

                        // то же самое, что и в верху, только для enter
                        this.input.addEventListener("keyup", function (e) {
                                if (e.keyCode == 13) {
                                        _this.tasks.push(new _todolistitem.ToDoListItem(_this.input.value, _this.parent, deleteEvent, counter, changeEvent));
                                        counter++;
                                        console.log(_this.tasks);
                                        _this.cleanValue();
                                }
                        });

                        //когда ивент удаления получает команду, он запускает эту функцию
                        this.parent.addEventListener("deleteEvent", function (event) {
                                _this.tasks.forEach(function (task, i) {
                                        //сравниваем номер класса который получил и его номер в массиве, и если он совпадает - удаляем из массива
                                        if (task.counter == event.detail.number) {
                                                _this.tasks.splice(i, 1);
                                                console.log(_this.tasks);
                                        }
                                });
                        });
                        // когда ивент изменения получит команду он запускает эту функцию
                        this.parent.addEventListener("changeEvent", function (event) {
                                _this.tasks.forEach(function (task, i) {
                                        //сравнивает номер класса который получил и его номер в массиве, и если он совпадает
                                        if (task.counter == event.detail.number) {
                                                //в масиве изменяем value на то, что пришло 
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

        //получаем все ивенты через свойства, а так же нужные нам данные
        this.inputValue = value;
        this.parent = parent;
        this.counter = counter;
        this.deleteEvent = deleteEvent;
        this.changeEvent = changeEvent;
        this.makeVisual();
    }

    // строим новый айтем


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

            // и прямо в нем запускаем функцию чека, удаления, и перезаписывания value при инициализации            
            this.checkItem(check);
            this.newItemValue(newInput);
            this.removeTask(remove);
        }
        // метод удаления из Дома

    }, {
        key: 'removeTask',
        value: function removeTask(element) {
            var _this = this;

            // слушаем куда был клик
            element.addEventListener("click", function () {
                //передаем в ивент удаления в details номер этого айтема, чтобы класс наверху мог его удалить   
                _this.deleteEvent.detail.number = _this.counter;
                //запускаем ивент удаления 
                _this.parent.dispatchEvent(_this.deleteEvent);
                // удаляем элемент из ДОМа
                element.parentElement.remove();
            });
        }

        // метод изменения inputValue при его изменении на ходу

    }, {
        key: 'newItemValue',
        value: function newItemValue(element) {
            var _this2 = this;

            // слушаем куда было нажатие клавиатуры
            element.addEventListener("input", function () {
                //передаем в ивент Изменений в details номер этого айтема 
                _this2.changeEvent.detail.number = _this2.counter;
                //передаем текущее значение на момент нажатия клавиатуры
                _this2.changeEvent.detail.value = element.value;
                //запускаем ивент Изменений 
                _this2.parent.dispatchEvent(_this2.changeEvent);
            });
        }

        // метод выполнения задания

    }, {
        key: 'checkItem',
        value: function checkItem(element) {
            element.addEventListener('click', function () {
                if (element.firstChild.checked) {
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
    }]);

    return ToDoListItem;
}();
},{}]},{},[1]);
