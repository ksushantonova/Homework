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
    function ToDoListItem(options) {
        this.opt = options;
        this.inputValue = options.inputs.value;
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
        this.opt.parents.parentNode.parentNode.dispatchEvent(this.opt.watch);
    };
    // если есть какие-то локальные данные, забираем из них инпут, и информацию, какие из айтемов были чекнуты
    ToDoListItem.prototype.workingWithLocalStorage = function () {
        if (this.opt.localData !== null) {
            this.inputValue = this.opt.localData.inputValue;
            this.checkedItem = this.opt.localData.checkedItem;
            this.opt.parents.parentNode.parentNode.dispatchEvent(this.opt.watch);
        }
    };
    ;
    ToDoListItem.prototype.startInputValue = function () {
        this.newInput.focus();
        var val = this.inputValue;
        this.newInput.value = "";
        this.newInput.value = val;
        this.opt.inputs.value = "";
    };
    ToDoListItem.prototype.mainElements = function () {
        this.check = this.mainContainer.firstElementChild.childNodes[1];
        this.newInput = this.mainContainer.firstElementChild.childNodes[3];
        this.newInput.value = this.opt.inputs.value;
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
        this.opt.parents.appendChild(this.mainContainer);
        this.mainContainer.className = "mainContainer";
        this.mainContainer.innerHTML = " \n                     <div class='container'>\n                        <div class='check'>\n                        <input type='checkbox' style='position:relative; cursor: pointer'>\n                        </div>\n                        <input class='newInput' value='" + this.opt.inputs.value + "'>\n                        <div class='remove'><img src='cross.png' style='heigth: 18px; width: 22px; display:block'></img></div>\n                  </div>";
        this.opt.parents.parentNode.parentNode.dispatchEvent(this.opt.watch);
    };
    ToDoListItem.prototype.focusTodolistInput = function () {
        var _this = this;
        this.newInput.addEventListener("keyup", function (e) {
            if (e.keyCode == 13) {
                _this.remove.style.display = "none";
                _this.opt.parents.parentNode.parentNode.dispatchEvent(_this.focusInput);
            }
            ;
        });
    };
    // метод удаления из Дома
    ToDoListItem.prototype.removeTask = function () {
        var _this = this;
        this.remove.addEventListener("click", function () {
            _this.deleteEvent.detail.number = _this.opt.counter;
            _this.opt.parents.parentNode.parentNode.dispatchEvent(_this.deleteEvent);
            _this.mainContainer.remove();
            _this.opt.parents.parentNode.parentNode.dispatchEvent(_this.opt.watch);
        });
    };
    // следим за изменениями в чекбоксах, результат записываем в класс.
    ToDoListItem.prototype.isChecked = function () {
        var _this = this;
        this.check.addEventListener('change', function () {
            if (_this.check.firstElementChild.checked) {
                _this.checkedItem = true;
                _this.checkItem();
                _this.opt.parents.parentNode.parentNode.dispatchEvent(_this.opt.watch);
            }
            else {
                _this.checkedItem = false;
                _this.checkItem();
                _this.opt.parents.parentNode.parentNode.dispatchEvent(_this.opt.watch);
            }
        });
    };
    // метод изменения inputValue при его изменении на ходу
    ToDoListItem.prototype.newItemValue = function () {
        var _this = this;
        this.newInput.addEventListener("input", function () {
            _this.changeEvent.detail.number = _this.opt.counter;
            _this.changeEvent.detail.value = _this.newInput.value;
            _this.opt.parents.parentNode.parentNode.dispatchEvent(_this.changeEvent);
            _this.opt.parents.parentNode.parentNode.dispatchEvent(_this.opt.watch);
        });
    };
    // если в классе статус чекбокса checked - применяем стили, и наоборот
    ToDoListItem.prototype.checkItem = function () {
        if (this.checkedItem) {
            this.check.className = "checkedcheck";
            this.newInput.className = "checked";
            this.remove.className = "checkedremove";
            this.check.firstElementChild.checked = true;
            this.opt.parents.parentNode.parentNode.dispatchEvent(this.opt.watch);
        }
        else {
            this.check.className = "check";
            this.newInput.className = "newInput";
            this.remove.className = "remove";
            this.opt.parents.parentNode.parentNode.dispatchEvent(this.opt.watch);
        }
    };
    ;
    return ToDoListItem;
}());
exports.default = ToDoListItem;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODg3YTY2MTM3OTgwOWQ1MDI5ZTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RvZG9saXN0aXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUMxREM7SUFhTyxzQkFBYSxPQUFZO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFVCxxQkFBcUI7SUFDakIsMkJBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztR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Q0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztZQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLENBQUM7SUFDVCxDQUFDO0lBQUEsQ0FBQztJQUVGLG1CQUFDO0FBQUQsQ0FBQyIsImZpbGUiOiJsaXN0LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg4N2E2NjEzNzk4MDlkNTAyOWUyIiwiXG5cblxuIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvRG9MaXN0SXRlbSB7XG5cbiAgICAgICAgICAgIG9wdDogYW55O1xuICAgICAgICAgICAgY2hlY2tlZEl0ZW06IGJvb2xlYW47XG4gICAgICAgICAgICBuZXdJbnB1dDogYW55O1xuICAgICAgICAgICAgY2hlY2s6IGFueTtcbiAgICAgICAgICAgIHJlbW92ZTogYW55O1xuICAgICAgICAgICAgbWFpbkNvbnRhaW5lcjogRWxlbWVudDtcbiAgICAgICAgICAgIGRlbGV0ZUV2ZW50OiBDdXN0b21FdmVudDtcbiAgICAgICAgICAgIGNoYW5nZUV2ZW50OiBDdXN0b21FdmVudDtcbiAgICAgICAgICAgIGZvY3VzSW5wdXQ6IEN1c3RvbUV2ZW50O1xuICAgICAgICAgICAgaW5wdXRWYWx1ZTogc3RyaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yIChvcHRpb25zOiBhbnkpe1xuICAgICAgICAgICAgdGhpcy5vcHQgPSBvcHRpb25zO1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gb3B0aW9ucy5pbnB1dHMudmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRJdGVtID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgfVxuXG4vLyDRgdGC0YDQvtC40Lwg0L3QvtCy0YvQuSDQsNC50YLQtdC8XG4gICAgaW5pdCgpe1xuICAgICAgICB0aGlzLm5ld0V2ZW50cygpO1xuICAgICAgICB0aGlzLndvcmtpbmdXaXRoTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMuaHRtbEJ1aWxkKCk7XG4gICAgICAgIHRoaXMubWFpbkVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMuc3RhcnRJbnB1dFZhbHVlKCk7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lclN0eWxlcygpO1xuICAgICAgICB0aGlzLmZvY3VzVG9kb2xpc3RJbnB1dCgpO1xuICAgICAgICB0aGlzLmNoZWNrSXRlbSgpO1xuICAgICAgICB0aGlzLm5ld0l0ZW1WYWx1ZSgpOyBcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVUYXNrKCk7XG4gICAgICAgIHRoaXMub3B0LnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5vcHQud2F0Y2gpO1xuICAgICAgICAgICBcbiAgICB9XG5cbi8vINC10YHQu9C4INC10YHRgtGMINC60LDQutC40LUt0YLQviDQu9C+0LrQsNC70YzQvdGL0LUg0LTQsNC90L3Ri9C1LCDQt9Cw0LHQuNGA0LDQtdC8INC40Lcg0L3QuNGFINC40L3Qv9GD0YIsINC4INC40L3RhNC+0YDQvNCw0YbQuNGOLCDQutCw0LrQuNC1INC40Lcg0LDQudGC0LXQvNC+0LIg0LHRi9C70Lgg0YfQtdC60L3Rg9GC0YtcbiAgICB3b3JraW5nV2l0aExvY2FsU3RvcmFnZSgpe1xuICAgICAgICBpZiAodGhpcy5vcHQubG9jYWxEYXRhICE9PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHRoaXMub3B0LmxvY2FsRGF0YS5pbnB1dFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkSXRlbSA9IHRoaXMub3B0LmxvY2FsRGF0YS5jaGVja2VkSXRlbTtcbiAgICAgICAgICAgIHRoaXMub3B0LnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5vcHQud2F0Y2gpO1xuXG4gICAgfX07XG5cbiAgICBzdGFydElucHV0VmFsdWUoKXtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC5mb2N1cygpO1xuICAgICAgICBsZXQgdmFsID0gdGhpcy5pbnB1dFZhbHVlO1xuICAgICAgICB0aGlzLm5ld0lucHV0LnZhbHVlID0gXCJcIjsgXG4gICAgICAgIHRoaXMubmV3SW5wdXQudmFsdWUgPSB2YWw7IFxuICAgICAgICB0aGlzLm9wdC5pbnB1dHMudmFsdWUgPSBcIlwiO1xuICAgIH1cblxuICAgIG1haW5FbGVtZW50cygpe1xuICAgICAgICB0aGlzLmNoZWNrID0gdGhpcy5tYWluQ29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkTm9kZXNbMV07XG4gICAgICAgIHRoaXMubmV3SW5wdXQgPSB0aGlzLm1haW5Db250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGROb2Rlc1szXTtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC52YWx1ZSA9IHRoaXMub3B0LmlucHV0cy52YWx1ZTtcbiAgICAgICAgdGhpcy5yZW1vdmUgPSB0aGlzLm1haW5Db250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGROb2Rlc1s1XTtcbiAgICB9XG5cbiAgICBtYWluQ29udGFpbmVyU3R5bGVzKCl7XG4gICAgICAgIHRoaXMubmV3SW5wdXQucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgdGhpcy5yZW1vdmUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMubmV3SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgdGhpcy5yZW1vdmUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuICAgICAgICB9KTtcblxuICAgICAgICAgdGhpcy5yZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgIHRoaXMubmV3SW5wdXQucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlOiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBuZXdFdmVudHMoKXtcblxuICAgICAgICBcbiAgICAgICAgdGhpcy5kZWxldGVFdmVudCA9IG5ldyBDdXN0b21FdmVudChcImRlbGV0ZUV2ZW50XCIse1xuICAgICAgICAgICAgICAgIGRldGFpbDoge2NvdW50OiBcImRvbmVcIn0gICAgICBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VFdmVudCA9IG5ldyBDdXN0b21FdmVudChcImNoYW5nZUV2ZW50XCIse1xuICAgICAgICAgICAgICAgIGRldGFpbDoge2NvdW50OiBcImRvbmVcIn0gICAgICBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb2N1c0lucHV0ID0gbmV3IEN1c3RvbUV2ZW50KFwiZm9jdXNJbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgIGRldGFpbDoge2NvdW50OiBcImRvbmVcIn1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbi8vINC/0L7RgdGC0YDQvtC50LrQsCDQutCw0YDQutCw0YHRgdCwINCw0LnRgtC10LzQsFxuICAgaHRtbEJ1aWxkKCl7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMub3B0LnBhcmVudHMuYXBwZW5kQ2hpbGQodGhpcy5tYWluQ29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwibWFpbkNvbnRhaW5lclwiO1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gYCBcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbnRhaW5lcic+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjaGVjayc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nY2hlY2tib3gnIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTsgY3Vyc29yOiBwb2ludGVyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPSduZXdJbnB1dCcgdmFsdWU9JyR7dGhpcy5vcHQuaW5wdXRzLnZhbHVlfSc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdyZW1vdmUnPjxpbWcgc3JjPSdjcm9zcy5wbmcnIHN0eWxlPSdoZWlndGg6IDE4cHg7IHdpZHRoOiAyMnB4OyBkaXNwbGF5OmJsb2NrJz48L2ltZz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PmA7IFxuICAgICAgICB0aGlzLm9wdC5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMub3B0LndhdGNoKTtcbiAgICAgICAgfVxuICAgIFxuICAgZm9jdXNUb2RvbGlzdElucHV0KCl7XG4gICAgICAgIHRoaXMubmV3SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICBpZihlLmtleUNvZGUgPT0gMTMpe1xuICAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICB0aGlzLm9wdC5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMuZm9jdXNJbnB1dCk7XG4gICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgfSAgICAgXG5cbi8vINC80LXRgtC+0LQg0YPQtNCw0LvQtdC90LjRjyDQuNC3INCU0L7QvNCwXG4gICAgcmVtb3ZlVGFzaygpe1xuICAgICAgICB0aGlzLnJlbW92ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmRlbGV0ZUV2ZW50LmRldGFpbC5udW1iZXIgPSB0aGlzLm9wdC5jb3VudGVyOyAgIFxuICAgICAgICB0aGlzLm9wdC5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMuZGVsZXRlRXZlbnQpO1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMub3B0LnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5vcHQud2F0Y2gpO1xuICAgIH0pO1xufVxuXG4vLyDRgdC70LXQtNC40Lwg0LfQsCDQuNC30LzQtdC90LXQvdC40Y/QvNC4INCyINGH0LXQutCx0L7QutGB0LDRhSwg0YDQtdC30YPQu9GM0YLQsNGCINC30LDQv9C40YHRi9Cy0LDQtdC8INCyINC60LvQsNGB0YEuXG4gICAgaXNDaGVja2VkKCl7XG4gICAgICAgIHRoaXMuY2hlY2suYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrLmZpcnN0RWxlbWVudENoaWxkLmNoZWNrZWQpe1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkSXRlbSA9IHRydWU7XG4gICAgICAgICAgICAgdGhpcy5jaGVja0l0ZW0oKTtcbiAgICAgICAgICAgIHRoaXMub3B0LnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5vcHQud2F0Y2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkSXRlbSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgdGhpcy5jaGVja0l0ZW0oKTtcbiAgICAgICAgICAgICAgIHRoaXMub3B0LnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5vcHQud2F0Y2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbi8vINC80LXRgtC+0LQg0LjQt9C80LXQvdC10L3QuNGPIGlucHV0VmFsdWUg0L/RgNC4INC10LPQviDQuNC30LzQtdC90LXQvdC40Lgg0L3QsCDRhdC+0LTRg1xuICAgIG5ld0l0ZW1WYWx1ZSgpe1xuICAgICAgICB0aGlzLm5ld0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2hhbmdlRXZlbnQuZGV0YWlsLm51bWJlciA9IHRoaXMub3B0LmNvdW50ZXI7IFxuICAgICAgICB0aGlzLmNoYW5nZUV2ZW50LmRldGFpbC52YWx1ZSA9IHRoaXMubmV3SW5wdXQudmFsdWU7XG4gICAgICAgIHRoaXMub3B0LnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5jaGFuZ2VFdmVudCk7XG4gICAgICAgIHRoaXMub3B0LnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5vcHQud2F0Y2gpO1xuICAgICAgICB9KVxuICAgIH1cblxuLy8g0LXRgdC70Lgg0LIg0LrQu9Cw0YHRgdC1INGB0YLQsNGC0YPRgSDRh9C10LrQsdC+0LrRgdCwIGNoZWNrZWQgLSDQv9GA0LjQvNC10L3Rj9C10Lwg0YHRgtC40LvQuCwg0Lgg0L3QsNC+0LHQvtGA0L7RglxuICAgIGNoZWNrSXRlbSgpe1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkSXRlbSl7XG4gICAgICAgIHRoaXMuY2hlY2suY2xhc3NOYW1lID0gXCJjaGVja2VkY2hlY2tcIjtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC5jbGFzc05hbWUgPSBcImNoZWNrZWRcIjtcbiAgICAgICAgdGhpcy5yZW1vdmUuY2xhc3NOYW1lID0gXCJjaGVja2VkcmVtb3ZlXCI7XG4gICAgICAgIHRoaXMuY2hlY2suZmlyc3RFbGVtZW50Q2hpbGQuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgdGhpcy5vcHQucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLm9wdC53YXRjaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hlY2suY2xhc3NOYW1lID0gXCJjaGVja1wiO1xuICAgICAgICB0aGlzLm5ld0lucHV0LmNsYXNzTmFtZSA9IFwibmV3SW5wdXRcIjtcbiAgICAgICAgdGhpcy5yZW1vdmUuY2xhc3NOYW1lID0gXCJyZW1vdmVcIjtcbiAgICAgICAgdGhpcy5vcHQucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLm9wdC53YXRjaCk7XG4gICAgICAgICAgICB9XG4gICAgfTsgIFxuXG4gICAgfVxuXG5cblxuICAgXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RvZG9saXN0aXRlbS50cyJdLCJzb3VyY2VSb290IjoiIn0=