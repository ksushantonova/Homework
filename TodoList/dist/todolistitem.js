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