(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./todolist.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _todolistitem = require("./todolistitem.js");

var _todolistitem2 = _interopRequireDefault(_todolistitem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Todolist = function () {
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

            this.button.addEventListener("click", function () {
                _this.tasks.push(new _todolistitem2.default(_this.input.value, _this.parent).inputValue);
                console.log(_this.tasks);
                _this.cleanValue();
                _this.removeItem();
            });
        }
    }, {
        key: "cleanValue",
        value: function cleanValue() {
            this.input.value = "";
        }
    }, {
        key: "removeItem",
        value: function removeItem() {
            var _this2 = this;

            var remove = document.querySelectorAll('.remove');
            remove.forEach(function (key) {
                key.addEventListener('click', function () {
                    key.parentElement.remove();
                    _this2.tasks = [];
                    var containers = document.querySelectorAll(".container");
                    for (var i = 0; i < containers.length; i++) {
                        _this2.tasks.push(containers[i].firstChild.nextElementSibling.value);
                    }
                    console.log(_this2.tasks);
                });
            });
        }
    }]);

    return Todolist;
}();

exports.default = Todolist;
},{"./todolistitem.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoListItem = function () {
    function ToDoListItem(value, parent) {
        _classCallCheck(this, ToDoListItem);

        this.inputValue = value;
        this.parent = parent;
        this.makeVisual();
        this.tasks = [];
    }

    _createClass(ToDoListItem, [{
        key: 'makeVisual',
        value: function makeVisual() {
            var container = document.createElement('div');
            var remove = document.createElement('div');
            remove.className = "remove";
            var check = document.createElement('div');
            check.className = "check";
            var newInput = document.createElement('input');
            newInput.className = "it";
            newInput.value = this.inputValue;
            container.className = "container";
            container.appendChild(check);
            container.appendChild(newInput);
            container.appendChild(remove);
            this.parent.appendChild(container);
            this.checkItem();
        }
    }, {
        key: 'checkItem',
        value: function checkItem() {
            var doneCheckBox = document.querySelectorAll('.check');
            doneCheckBox.forEach(function (key) {
                key.addEventListener('click', function () {
                    key.nextElementSibling.className = "checked";
                });
            });
        }
    }]);

    return ToDoListItem;
}();

exports.default = ToDoListItem;
},{}]},{},[1]);
