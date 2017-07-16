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