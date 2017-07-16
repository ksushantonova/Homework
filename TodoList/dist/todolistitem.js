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