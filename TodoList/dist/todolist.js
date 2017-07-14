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
                _this.tasks.push(new _todolistitem2.default(_this.input.value, _this.parent));
                _this.cleanValue();
                _this.removeItem();
                console.log(_this);
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

            var remove = document.getElementsByClassName('remove');

            var _loop = function _loop(i) {
                remove[i].addEventListener('click', function () {
                    remove[i].parentElement.remove();
                    delete _this2.tasks[i];
                });
            };

            for (var i = 0; i < remove.length; i++) {
                _loop(i);
            };
            var undoneTasks = [];
            this.tasks.forEach(function (task) {
                undoneTasks.push(task);
                _this2.tasks = undoneTasks;
                console.log(_this2);
            });
        }
    }]);

    return Todolist;
}();

exports.default = Todolist;