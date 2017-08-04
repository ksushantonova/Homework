/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ToDoListItem = (function () {
    function ToDoListItem(value, parent, counter, task, watch) {
        //получаем все ивенты через свойства, а так же нужные нам данные
        this.watch = watch;
        this.local = task;
        this.inputValue = value;
        this.parents = parent; // items
        this.counter = counter;
        this.checkedItem = false;
        this.init();
    }
    // строим новый айтем
    ToDoListItem.prototype.init = function () {
        this.newEvents();
        this.workingWithLocalStorage();
        this.htmlBuild();
        this.mainElements();
        this.startInputValue();
        this.mainContainerStyles();
        this.focusTodolistInput();
        this.checkItem();
        this.newItemValue();
        this.isChecked();
        this.removeTask();
        this.parents.parentNode.parentNode.dispatchEvent(this.watch);
    };
    // если есть какие-то локальные данные, забираем из них инпут, и информацию, какие из айтемов были чекнуты
    ToDoListItem.prototype.workingWithLocalStorage = function () {
        if (this.local !== null) {
            this.inputValue = this.local.inputValue;
            this.checkedItem = this.local.checkedItem;
            this.parents.parentNode.parentNode.dispatchEvent(this.watch);
        }
    };
    ;
    ToDoListItem.prototype.startInputValue = function () {
        this.newInput.focus();
        var val = this.inputValue;
        this.newInput.value = '';
        this.newInput.value = val;
    };
    ToDoListItem.prototype.mainElements = function () {
        this.check = this.mainContainer.firstElementChild.childNodes[1];
        this.newInput = this.mainContainer.firstElementChild.childNodes[3];
        this.remove = this.mainContainer.firstElementChild.childNodes[5];
    };
    ToDoListItem.prototype.mainContainerStyles = function () {
        var _this = this;
        this.newInput.parentNode.addEventListener('mouseover', function () {
            _this.remove.style.display = "block";
        });
        this.newInput.addEventListener('input', function () {
            _this.remove.style.display = "block";
        });
        this.remove.addEventListener('mouseout', function (e) {
            _this.remove.style.display = "none";
        });
        this.newInput.parentNode.addEventListener('mouseout', function (e) {
            _this.remove.style.display = "none";
        });
    };
    ToDoListItem.prototype.newEvents = function () {
        this.deleteEvent = new CustomEvent("deleteEvent", {
            detail: { count: "done" }
        });
        this.changeEvent = new CustomEvent("changeEvent", {
            detail: { count: "done" }
        });
        this.focusInput = new CustomEvent("focusInput", {
            detail: { count: "done" }
        });
    };
    // постройка каркасса айтема
    ToDoListItem.prototype.htmlBuild = function () {
        this.mainContainer = document.createElement("div");
        this.parents.appendChild(this.mainContainer);
        this.mainContainer.className = "mainContainer";
        this.mainContainer.innerHTML = " \n                     <div class='container'>\n                        <div class='check'>\n                        <input type='checkbox' style='position:relative; cursor: pointer'>\n                        </div>\n                        <input class='newInput' value='" + this.inputValue + "'>\n                        <div class='remove'><img src='cross.png' style='heigth: 18px; width: 22px; display:block'></img></div>\n                  </div>";
        this.parents.parentNode.parentNode.dispatchEvent(this.watch);
    };
    ToDoListItem.prototype.focusTodolistInput = function () {
        var _this = this;
        this.newInput.addEventListener("keyup", function (e) {
            if (e.keyCode == 13) {
                _this.remove.style.display = "none";
                _this.parents.parentNode.parentNode.dispatchEvent(_this.focusInput);
            }
            ;
        });
    };
    // метод удаления из Дома
    ToDoListItem.prototype.removeTask = function () {
        var _this = this;
        this.remove.addEventListener("click", function () {
            _this.deleteEvent.detail.number = _this.counter;
            _this.parents.parentNode.parentNode.dispatchEvent(_this.deleteEvent);
            _this.mainContainer.remove();
            _this.parents.parentNode.parentNode.dispatchEvent(_this.watch);
        });
    };
    // следим за изменениями в чекбоксах, результат записываем в класс.
    ToDoListItem.prototype.isChecked = function () {
        var _this = this;
        this.check.addEventListener('change', function () {
            if (_this.check.firstElementChild.checked) {
                _this.checkedItem = true;
                _this.checkItem();
                _this.parents.parentNode.parentNode.dispatchEvent(_this.watch);
            }
            else {
                _this.checkedItem = false;
                _this.checkItem();
                _this.parents.parentNode.parentNode.dispatchEvent(_this.watch);
            }
        });
    };
    // метод изменения inputValue при его изменении на ходу
    ToDoListItem.prototype.newItemValue = function () {
        var _this = this;
        this.newInput.addEventListener("input", function () {
            _this.changeEvent.detail.number = _this.counter;
            _this.changeEvent.detail.value = _this.newInput.value;
            _this.parents.parentNode.parentNode.dispatchEvent(_this.changeEvent);
            _this.parents.parentNode.parentNode.dispatchEvent(_this.watch);
        });
    };
    // если в классе статус чекбокса checked - применяем стили, и наоборот
    ToDoListItem.prototype.checkItem = function () {
        if (this.checkedItem) {
            this.check.className = "checkedcheck";
            this.newInput.className = "checked";
            this.remove.className = "checkedremove";
            this.check.firstElementChild.checked = true;
            this.parents.parentNode.parentNode.dispatchEvent(this.watch);
        }
        else {
            this.check.className = "check";
            this.newInput.className = "newInput";
            this.remove.className = "remove";
            this.parents.parentNode.parentNode.dispatchEvent(this.watch);
        }
    };
    ;
    return ToDoListItem;
}());
exports.default = ToDoListItem;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGQxNGVjMjYyMDViMDU1Mzg3ZmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RvZG9saXN0aXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM1REM7SUFDTyxzQkFBYSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSztRQUN4RCxnRUFBZ0U7UUFDcEQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxRQUFRO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRVQscUJBQXFCO0lBQ2pCLDJCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsSUFB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QUFTLEdBQUcsT0FBTyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztZQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekQsQ0FBQztJQUNULENBQUM7SUFBQSxDQUFDO0lBRUYsbUJBQUM7QUFBRCxDQUFDIiwiZmlsZSI6Imxpc3QuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNGQxNGVjMjYyMDViMDU1Mzg3ZmUiLCJcbiBleHBvcnQgZGVmYXVsdCBjbGFzcyBUb0RvTGlzdEl0ZW0ge1xuICAgICAgICBjb25zdHJ1Y3RvciAodmFsdWUsIHBhcmVudCwgY291bnRlciwgdGFzaywgd2F0Y2gpe1xuLy/Qv9C+0LvRg9GH0LDQtdC8INCy0YHQtSDQuNCy0LXQvdGC0Ysg0YfQtdGA0LXQtyDRgdCy0L7QudGB0YLQstCwLCDQsCDRgtCw0Log0LbQtSDQvdGD0LbQvdGL0LUg0L3QsNC8INC00LDQvdC90YvQtVxuICAgICAgICAgICAgdGhpcy53YXRjaCA9IHdhdGNoO1xuICAgICAgICAgICAgdGhpcy5sb2NhbCA9IHRhc2s7XG4gICAgICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50cyA9IHBhcmVudDsgLy8gaXRlbXNcbiAgICAgICAgICAgIHRoaXMuY291bnRlciA9IGNvdW50ZXI7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRJdGVtID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgfVxuXG4vLyDRgdGC0YDQvtC40Lwg0L3QvtCy0YvQuSDQsNC50YLQtdC8XG4gICAgaW5pdCgpe1xuICAgICAgICB0aGlzLm5ld0V2ZW50cygpO1xuICAgICAgICB0aGlzLndvcmtpbmdXaXRoTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMuaHRtbEJ1aWxkKCk7XG4gICAgICAgIHRoaXMubWFpbkVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMuc3RhcnRJbnB1dFZhbHVlKCk7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lclN0eWxlcygpO1xuICAgICAgICB0aGlzLmZvY3VzVG9kb2xpc3RJbnB1dCgpO1xuICAgICAgICB0aGlzLmNoZWNrSXRlbSgpO1xuICAgICAgICB0aGlzLm5ld0l0ZW1WYWx1ZSgpOyBcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVUYXNrKCk7XG4gICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICAgICAgICAgXG4gICAgfVxuXG4vLyDQtdGB0LvQuCDQtdGB0YLRjCDQutCw0LrQuNC1LdGC0L4g0LvQvtC60LDQu9GM0L3Ri9C1INC00LDQvdC90YvQtSwg0LfQsNCx0LjRgNCw0LXQvCDQuNC3INC90LjRhSDQuNC90L/Rg9GCLCDQuCDQuNC90YTQvtGA0LzQsNGG0LjRjiwg0LrQsNC60LjQtSDQuNC3INCw0LnRgtC10LzQvtCyINCx0YvQu9C4INGH0LXQutC90YPRgtGLXG4gICAgd29ya2luZ1dpdGhMb2NhbFN0b3JhZ2UoKXtcbiAgICAgICAgaWYgKHRoaXMubG9jYWwgIT09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gdGhpcy5sb2NhbC5pbnB1dFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkSXRlbSA9IHRoaXMubG9jYWwuY2hlY2tlZEl0ZW07XG4gICAgICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG5cbiAgICB9fTtcblxuICAgIHN0YXJ0SW5wdXRWYWx1ZSgpe1xuICAgICAgICB0aGlzLm5ld0lucHV0LmZvY3VzKCk7XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLmlucHV0VmFsdWU7XG4gICAgICAgIHRoaXMubmV3SW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy5uZXdJbnB1dC52YWx1ZSA9IHZhbDsgXG4gICAgfVxuXG4gICAgbWFpbkVsZW1lbnRzKCl7XG4gICAgICAgIHRoaXMuY2hlY2sgPSB0aGlzLm1haW5Db250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGROb2Rlc1sxXTtcbiAgICAgICAgdGhpcy5uZXdJbnB1dCA9IHRoaXMubWFpbkNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZE5vZGVzWzNdO1xuICAgICAgICB0aGlzLnJlbW92ZSA9IHRoaXMubWFpbkNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZE5vZGVzWzVdO1xuICAgIH1cblxuICAgIG1haW5Db250YWluZXJTdHlsZXMoKXtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgICAgICB0aGlzLnJlbW92ZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgICB0aGlzLnJlbW92ZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgICB0aGlzLnJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICB0aGlzLm5ld0lucHV0LnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICBuZXdFdmVudHMoKXtcblxuICAgICAgICBcbiAgICAgICAgdGhpcy5kZWxldGVFdmVudCA9IG5ldyBDdXN0b21FdmVudChcImRlbGV0ZUV2ZW50XCIse1xuICAgICAgICAgICAgICAgIGRldGFpbDoge2NvdW50OiBcImRvbmVcIn0gICAgICBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VFdmVudCA9IG5ldyBDdXN0b21FdmVudChcImNoYW5nZUV2ZW50XCIse1xuICAgICAgICAgICAgICAgIGRldGFpbDoge2NvdW50OiBcImRvbmVcIn0gICAgICBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb2N1c0lucHV0ID0gbmV3IEN1c3RvbUV2ZW50KFwiZm9jdXNJbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgIGRldGFpbDoge2NvdW50OiBcImRvbmVcIn1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbi8vINC/0L7RgdGC0YDQvtC50LrQsCDQutCw0YDQutCw0YHRgdCwINCw0LnRgtC10LzQsFxuICAgaHRtbEJ1aWxkKCl7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMucGFyZW50cy5hcHBlbmRDaGlsZCh0aGlzLm1haW5Db250YWluZXIpO1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXIuY2xhc3NOYW1lID0gXCJtYWluQ29udGFpbmVyXCI7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBgIFxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29udGFpbmVyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NoZWNrJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdjaGVja2JveCcgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlOyBjdXJzb3I6IHBvaW50ZXInPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9J25ld0lucHV0JyB2YWx1ZT0nJHt0aGlzLmlucHV0VmFsdWV9Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J3JlbW92ZSc+PGltZyBzcmM9J2Nyb3NzLnBuZycgc3R5bGU9J2hlaWd0aDogMThweDsgd2lkdGg6IDIycHg7IGRpc3BsYXk6YmxvY2snPjwvaW1nPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+YDsgXG4gICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICAgICAgfVxuICAgIFxuICAgZm9jdXNUb2RvbGlzdElucHV0KCl7XG4gICAgICAgIHRoaXMubmV3SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09IDEzKXtcbiAgICAgICAgICAgICB0aGlzLnJlbW92ZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMuZm9jdXNJbnB1dCk7XG4gICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgfSAgICAgXG5cbi8vINC80LXRgtC+0LQg0YPQtNCw0LvQtdC90LjRjyDQuNC3INCU0L7QvNCwXG4gICAgcmVtb3ZlVGFzaygpe1xuICAgICAgICB0aGlzLnJlbW92ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmRlbGV0ZUV2ZW50LmRldGFpbC5udW1iZXIgPSB0aGlzLmNvdW50ZXI7ICAgXG4gICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLmRlbGV0ZUV2ZW50KTtcbiAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgfSk7XG59XG5cbi8vINGB0LvQtdC00LjQvCDQt9CwINC40LfQvNC10L3QtdC90LjRj9C80Lgg0LIg0YfQtdC60LHQvtC60YHQsNGFLCDRgNC10LfRg9C70YzRgtCw0YIg0LfQsNC/0LjRgdGL0LLQsNC10Lwg0LIg0LrQu9Cw0YHRgS5cbiAgICBpc0NoZWNrZWQoKXtcbiAgICAgICAgdGhpcy5jaGVjay5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2suZmlyc3RFbGVtZW50Q2hpbGQuY2hlY2tlZCl7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRJdGVtID0gdHJ1ZTtcbiAgICAgICAgICAgICB0aGlzLmNoZWNrSXRlbSgpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkSXRlbSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgdGhpcy5jaGVja0l0ZW0oKTtcbiAgICAgICAgICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4vLyDQvNC10YLQvtC0INC40LfQvNC10L3QtdC90LjRjyBpbnB1dFZhbHVlINC/0YDQuCDQtdCz0L4g0LjQt9C80LXQvdC10L3QuNC4INC90LAg0YXQvtC00YNcbiAgICBuZXdJdGVtVmFsdWUoKXtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmNoYW5nZUV2ZW50LmRldGFpbC5udW1iZXIgPSB0aGlzLmNvdW50ZXI7IFxuICAgICAgICB0aGlzLmNoYW5nZUV2ZW50LmRldGFpbC52YWx1ZSA9IHRoaXMubmV3SW5wdXQudmFsdWU7XG4gICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLmNoYW5nZUV2ZW50KTtcbiAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICB9KVxuICAgIH1cblxuLy8g0LXRgdC70Lgg0LIg0LrQu9Cw0YHRgdC1INGB0YLQsNGC0YPRgSDRh9C10LrQsdC+0LrRgdCwIGNoZWNrZWQgLSDQv9GA0LjQvNC10L3Rj9C10Lwg0YHRgtC40LvQuCwg0Lgg0L3QsNC+0LHQvtGA0L7RglxuICAgIGNoZWNrSXRlbSgpe1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkSXRlbSl7XG4gICAgICAgIHRoaXMuY2hlY2suY2xhc3NOYW1lID0gXCJjaGVja2VkY2hlY2tcIjtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC5jbGFzc05hbWUgPSBcImNoZWNrZWRcIjtcbiAgICAgICAgdGhpcy5yZW1vdmUuY2xhc3NOYW1lID0gXCJjaGVja2VkcmVtb3ZlXCI7XG4gICAgICAgIHRoaXMuY2hlY2suZmlyc3RFbGVtZW50Q2hpbGQuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoZWNrLmNsYXNzTmFtZSA9IFwiY2hlY2tcIjtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC5jbGFzc05hbWUgPSBcIm5ld0lucHV0XCI7XG4gICAgICAgIHRoaXMucmVtb3ZlLmNsYXNzTmFtZSA9IFwicmVtb3ZlXCI7XG4gICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICAgICAgICAgIH1cbiAgICB9OyAgXG5cbiAgICB9XG5cblxuXG4gICBcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdG9kb2xpc3RpdGVtLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==