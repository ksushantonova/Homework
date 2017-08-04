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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var builditem_ts_1 = __webpack_require__(2);
// 3)Реализовать сохранение/чтение, используя LocalStorage, всех ToDoList и их айтемов:
// - при загрузке страницы проверять наличие сохраненных данных и строить по ним ToDoList с айтемами, если данных нет, то выводить только один пустой ToDoList (edited)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function (reg) {
    }).catch(function (error) {
        console.log('Registration failed with ' + error);
    });
}
var flexed = document.getElementById('flexed');
new builditem_ts_1.default(flexed);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var todolist_ts_1 = __webpack_require__(3);
var BuildItem = (function () {
    function BuildItem(parent) {
        this.container = parent;
        this.allLists = [];
        this.counter = 0;
        this.init();
    }
    ;
    BuildItem.prototype.init = function () {
        var _this = this;
        // localStorage.clear();
        this.newEvent();
        this.buildStorageLists();
        document.getElementById('plus').addEventListener("click", function () {
            _this.buildItemHtml();
            _this.toDoListInit();
            _this.customEvent();
        });
    };
    ;
    // забираем все что есть из локалсторейджа, и в зависимости что там внутри - показываем локал, или пустой айтем.
    BuildItem.prototype.buildStorageLists = function () {
        var _this = this;
        this.localValue = localStorage.getItem('data');
        if (this.localValue !== null && this.localValue.length > 3) {
            this.localFrame = JSON.parse(this.localValue);
            this.localFrame.forEach(function (list) {
                _this.buildItemHtml();
                _this.buildInit(list);
                _this.customEvent();
            });
        }
        else if (this.localValue !== null && this.localValue.length < 3) {
            this.buildItemHtml();
            this.buildInit(null);
            this.customEvent();
        }
        else {
            this.buildItemHtml();
            this.buildInit(null);
            this.customEvent();
        }
    };
    // метод создает каркасс для нового листа
    BuildItem.prototype.buildItemHtml = function () {
        this.mainFrame = document.createElement('div');
        this.mainFrame.className = 'main';
        this.container.insertBefore(this.mainFrame, this.container.childNodes[1]);
    };
    ;
    // метод ловит все кастомивенты, которые нужно словить в этом классе 
    BuildItem.prototype.customEvent = function () {
        var _this = this;
        this.temporaryList = [];
        // событие удаления листа
        this.mainFrame.addEventListener("deleteLists", function (event) {
            _this.getNumber(event);
            _this.allLists.splice(_this.temporaryList[1], 1);
        });
        // событие watch - мгновенная перезапись изменений в локал
        this.mainFrame.addEventListener("watch", function (event) {
            _this.writeStorage();
            _this.parseStorage();
        });
    };
    ;
    BuildItem.prototype.newEvent = function () {
        this.watch = new CustomEvent("watch", {
            detail: { count: "done" }
        });
    };
    // метод, который сравнивает информацию о номере листа, которая пришла из нижнего класса, с номером листа
    // возвращает массив с найденным элементом, и его индексом.
    BuildItem.prototype.getNumber = function (thisEvent) {
        var _this = this;
        this.temporaryList = [];
        this.allLists.forEach(function (list, i) {
            if (list.listCounter == thisEvent.detail.number) {
                _this.temporaryList.unshift(i);
                _this.temporaryList.unshift(list);
            }
        });
    };
    ;
    // строит новый лист
    BuildItem.prototype.toDoListInit = function () {
        this.buildInit(null);
        this.writeStorage();
        this.parseStorage();
    };
    ;
    // метод перезаписывает локалсторейдж
    BuildItem.prototype.writeStorage = function () {
        localStorage.clear();
        this.allListsString = JSON.stringify(this.allLists);
        localStorage.setItem("data", this.allListsString);
    };
    ;
    // метод забирает локальные данные и делает их пригодным для работы
    BuildItem.prototype.parseStorage = function () {
        this.localValue = localStorage.getItem('data');
        this.localFrame = JSON.parse(this.localValue);
    };
    ;
    // создание нового класса Todolist (localData ставить если есть локалсторейдж)
    BuildItem.prototype.buildInit = function (localData) {
        var parent = this.mainFrame;
        this.allLists.push(new todolist_ts_1.default(parent, this.counter++, localData, this.watch));
    };
    ;
    return BuildItem;
}());
exports.default = BuildItem;
;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// import ToDoListItem from './todolistitem.js';
Object.defineProperty(exports, "__esModule", { value: true });
var Todolist = (function () {
    function Todolist(parent, counter, local, watch) {
        this.watch = watch;
        this.local = local;
        this.parents = parent; // mainFrame
        this.tasks = [];
        this.listCounter = counter;
        this.taskCounter = 0;
        this.makeList();
    }
    // созлание нового айтема
    Todolist.prototype.makeList = function () {
        this.makeFrame();
        this.mainElements();
        this.getHeader();
        this.newEvents();
        this.workingWithLocalStorage();
        this.inputText();
        this.initEvents();
        this.removeList();
        this.deleteAllEvents();
        this.doneallItems();
        this.parents.dispatchEvent(this.watch);
    };
    ;
    Todolist.prototype.makeFrame = function () {
        this.parents.innerHTML = " \n    <div class=\"head\">\n    <div class=\"todoHeader\">\n   <div class=\"header\" contenteditable=\"true\" >Blabla</div> \n    <div style=\"width:25px; height:25px; cursor:pointer; padding: 16px 0 0 13px;\"><img src='all2.png' style='heigth: 23px; width: 23px'></img></div>\n    <div  style=\"width:25px;cursor:pointer; height:25px; padding: 16px 15px 0 16px;\"><img src='del2.png' style='heigth: 23px; width: 23px'></img></div>\n    </div>\n    <div class=\"items\"></div>  \n        <div class=\"underdiv\">\n            <input class=\"input\" type=\"text\" placeholder=\" + New task\"/>\n            <div class=\"cross\"><img src='cross.png' style='heigth: 30px; width: 22px'></img></div>\n         </div> \n         </div>\n                    ";
    };
    // работа с данными из локалсторейдж( забирает заголовок, и запускает метод строительства заданий)
    Todolist.prototype.workingWithLocalStorage = function () {
        if (this.local !== null) {
            var header = this.parents.childNodes[1].childNodes[1].childNodes[1];
            header.innerText = (this.local.header);
            this.header = this.local.header;
            this.buildLocalTask();
        }
    };
    ;
    Todolist.prototype.doneallItems = function () {
        var _this = this;
        this.allDoneButton.addEventListener("click", function () {
            _this.tasks.forEach(function (task) {
                task.checkedItem = true;
                task.check.firstElementChild.checked = true;
                task.checkItem();
            });
        });
        this.parents.dispatchEvent(this.watch);
    };
    ;
    // выясняет, сколько заданий было в локалсторейдж, и строит такое же количество 
    Todolist.prototype.buildLocalTask = function () {
        var _this = this;
        this.local.tasks.forEach(function (item) {
            _this.buildTask(item);
        });
        this.parents.dispatchEvent(this.watch);
    };
    ;
    Todolist.prototype.inputText = function () {
        var _this = this;
        this.inputs.addEventListener("keyup", function (e) {
            _this.buildTask(null);
        });
        this.parents.dispatchEvent(this.watch);
    };
    ;
    // ловим ивенты удаления, и изменения в айтемх
    Todolist.prototype.initEvents = function () {
        var _this = this;
        this.temporaryData = [];
        this.parents.addEventListener("deleteEvent", function (event) {
            _this.getNumber(event);
            _this.tasks.splice(_this.temporaryData[1], 1);
        });
        this.parents.addEventListener("changeEvent", function (event) {
            _this.getNumber(event);
            _this.temporaryData[0].inputValue = event.detail.value;
        });
        this.parents.addEventListener("focusInput", function () {
            _this.inputs.focus();
        });
    };
    ;
    // при клике на мусорный бак удаляются все айтемы
    Todolist.prototype.deleteAllEvents = function () {
        var _this = this;
        this.deleteAllButton.addEventListener("click", function () {
            _this.tasks = [];
            _this.parents.childNodes[1].childNodes[3].innerHTML = "";
            _this.parents.dispatchEvent(_this.watch);
        });
    };
    // инициализация всех кастомивентов которые относятся к этому классу
    Todolist.prototype.newEvents = function () {
        this.deleteLists = new CustomEvent("deleteLists", {
            detail: { count: "done" }
        });
    };
    ;
    Todolist.prototype.mainElements = function () {
        this.inputs = this.parents.childNodes[1].childNodes[5].childNodes[1];
        this.allDoneButton = this.parents.childNodes[1].childNodes[1].childNodes[3];
        this.deleteAllButton = this.parents.childNodes[1].childNodes[1].childNodes[5];
        this.parents.dispatchEvent(this.watch);
    };
    ;
    // строительство нового айтема
    Todolist.prototype.buildTask = function (data) {
        this.tasks.push(
        // new ToDoListItem(this.inputs.value, this.parents.childNodes[1].childNodes[3], this.taskCounter++, localData, this.watch)
        this.lazyLoader(data));
        ;
        this.cleanValue();
    };
    Todolist.prototype.lazyLoader = function (data) {
        var _this = this;
        Promise.resolve().then(function () { return __webpack_require__(0); }).then(function (module) {
            var todoListItem = module.default;
            new todoListItem(_this.inputs.value, _this.parents.childNodes[1].childNodes[3], _this.taskCounter++, data, _this.watch);
        });
    };
    // метод наблюдает за любыми изменениями заголовка, и списывает их в массив
    Todolist.prototype.getHeader = function () {
        var _this = this;
        var header = this.parents.childNodes[1].childNodes[1].childNodes[1];
        this.header = header.innerText;
        header.addEventListener("input", function () {
            _this.header = header.innerText;
            _this.parents.dispatchEvent(_this.watch);
        });
    };
    // метод сравнивает номера в details и в массиве, на выходе получаем массив из элемента и его индекса
    Todolist.prototype.getNumber = function (thisEvent) {
        var _this = this;
        this.temporaryData = [];
        this.tasks.forEach(function (task, i) {
            if (task.counter == thisEvent.detail.number) {
                _this.temporaryData.unshift(i);
                _this.temporaryData.unshift(task);
            }
        });
    };
    ;
    Todolist.prototype.cleanValue = function () {
        this.inputs.value = "";
    };
    ;
    // удаление листа 
    Todolist.prototype.removeList = function () {
        var _this = this;
        this.inputs.nextElementSibling.addEventListener("click", function () {
            _this.deleteLists.detail.number = _this.listCounter;
            _this.parents.dispatchEvent(_this.deleteLists);
            _this.parents.remove();
            _this.parents.dispatchEvent(_this.watch);
        });
    };
    ;
    return Todolist;
}());
exports.default = Todolist;
;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGQxNGVjMjYyMDViMDU1Mzg3ZmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RvZG9saXN0aXRlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2J1aWxkaXRlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdG9kb2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDNURDO0lBQ08sc0JBQWEsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUs7UUFDeEQsZ0VBQWdFO1FBQ3BELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsUUFBUTtRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVULHFCQUFx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RU4sa0JBQWtCO0lBQ2QsNkJBQVUsR0FBVjtRQUFBLGlCQVFEO1FBUEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDekQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUM7WUFDbEQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdDLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdEIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsQ0FBQztJQUFBLENBQUM7SUFDSixlQUFDO0FBQUQsQ0FBQzs7QUFBQSxDQUFDIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0ZDE0ZWMyNjIwNWIwNTUzODdmZSIsIlxuIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvRG9MaXN0SXRlbSB7XG4gICAgICAgIGNvbnN0cnVjdG9yICh2YWx1ZSwgcGFyZW50LCBjb3VudGVyLCB0YXNrLCB3YXRjaCl7XG4vL9C/0L7Qu9GD0YfQsNC10Lwg0LLRgdC1INC40LLQtdC90YLRiyDRh9C10YDQtdC3INGB0LLQvtC50YHRgtCy0LAsINCwINGC0LDQuiDQttC1INC90YPQttC90YvQtSDQvdCw0Lwg0LTQsNC90L3Ri9C1XG4gICAgICAgICAgICB0aGlzLndhdGNoID0gd2F0Y2g7XG4gICAgICAgICAgICB0aGlzLmxvY2FsID0gdGFzaztcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRzID0gcGFyZW50OyAvLyBpdGVtc1xuICAgICAgICAgICAgdGhpcy5jb3VudGVyID0gY291bnRlcjtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZEl0ZW0gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9XG5cbi8vINGB0YLRgNC+0LjQvCDQvdC+0LLRi9C5INCw0LnRgtC10LxcbiAgICBpbml0KCl7XG4gICAgICAgIHRoaXMubmV3RXZlbnRzKCk7XG4gICAgICAgIHRoaXMud29ya2luZ1dpdGhMb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5odG1sQnVpbGQoKTtcbiAgICAgICAgdGhpcy5tYWluRWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5zdGFydElucHV0VmFsdWUoKTtcbiAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyU3R5bGVzKCk7XG4gICAgICAgIHRoaXMuZm9jdXNUb2RvbGlzdElucHV0KCk7XG4gICAgICAgIHRoaXMuY2hlY2tJdGVtKCk7XG4gICAgICAgIHRoaXMubmV3SXRlbVZhbHVlKCk7IFxuICAgICAgICB0aGlzLmlzQ2hlY2tlZCgpO1xuICAgICAgICB0aGlzLnJlbW92ZVRhc2soKTtcbiAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICAgICBcbiAgICB9XG5cbi8vINC10YHQu9C4INC10YHRgtGMINC60LDQutC40LUt0YLQviDQu9C+0LrQsNC70YzQvdGL0LUg0LTQsNC90L3Ri9C1LCDQt9Cw0LHQuNGA0LDQtdC8INC40Lcg0L3QuNGFINC40L3Qv9GD0YIsINC4INC40L3RhNC+0YDQvNCw0YbQuNGOLCDQutCw0LrQuNC1INC40Lcg0LDQudGC0LXQvNC+0LIg0LHRi9C70Lgg0YfQtdC60L3Rg9GC0YtcbiAgICB3b3JraW5nV2l0aExvY2FsU3RvcmFnZSgpe1xuICAgICAgICBpZiAodGhpcy5sb2NhbCAhPT0gbnVsbCl7XG4gICAgICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSB0aGlzLmxvY2FsLmlucHV0VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRJdGVtID0gdGhpcy5sb2NhbC5jaGVja2VkSXRlbTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcblxuICAgIH19O1xuXG4gICAgc3RhcnRJbnB1dFZhbHVlKCl7XG4gICAgICAgIHRoaXMubmV3SW5wdXQuZm9jdXMoKTtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMuaW5wdXRWYWx1ZTtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLm5ld0lucHV0LnZhbHVlID0gdmFsOyBcbiAgICB9XG5cbiAgICBtYWluRWxlbWVudHMoKXtcbiAgICAgICAgdGhpcy5jaGVjayA9IHRoaXMubWFpbkNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZE5vZGVzWzFdO1xuICAgICAgICB0aGlzLm5ld0lucHV0ID0gdGhpcy5tYWluQ29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkTm9kZXNbM107XG4gICAgICAgIHRoaXMucmVtb3ZlID0gdGhpcy5tYWluQ29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkTm9kZXNbNV07XG4gICAgfVxuXG4gICAgbWFpbkNvbnRhaW5lclN0eWxlcygpe1xuICAgICAgICB0aGlzLm5ld0lucHV0LnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLm5ld0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgIHRoaXMucmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgIHRoaXMubmV3SW5wdXQucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIG5ld0V2ZW50cygpe1xuXG4gICAgICAgIFxuICAgICAgICB0aGlzLmRlbGV0ZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiZGVsZXRlRXZlbnRcIix7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7Y291bnQ6IFwiZG9uZVwifSAgICAgIFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNoYW5nZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiY2hhbmdlRXZlbnRcIix7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7Y291bnQ6IFwiZG9uZVwifSAgICAgIFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvY3VzSW5wdXQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJmb2N1c0lucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgZGV0YWlsOiB7Y291bnQ6IFwiZG9uZVwifVxuICAgICAgICB9KTtcblxuICAgIH1cblxuLy8g0L/QvtGB0YLRgNC+0LnQutCwINC60LDRgNC60LDRgdGB0LAg0LDQudGC0LXQvNCwXG4gICBodG1sQnVpbGQoKXtcbiAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhpcy5wYXJlbnRzLmFwcGVuZENoaWxkKHRoaXMubWFpbkNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5jbGFzc05hbWUgPSBcIm1haW5Db250YWluZXJcIjtcbiAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLmlubmVySFRNTCA9IGAgXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb250YWluZXInPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY2hlY2snPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J2NoZWNrYm94JyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7IGN1cnNvcjogcG9pbnRlcic+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz0nbmV3SW5wdXQnIHZhbHVlPScke3RoaXMuaW5wdXRWYWx1ZX0nPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ncmVtb3ZlJz48aW1nIHNyYz0nY3Jvc3MucG5nJyBzdHlsZT0naGVpZ3RoOiAxOHB4OyB3aWR0aDogMjJweDsgZGlzcGxheTpibG9jayc+PC9pbWc+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5gOyBcbiAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICB9XG4gICAgXG4gICBmb2N1c1RvZG9saXN0SW5wdXQoKXtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICBpZihlLmtleUNvZGUgPT0gMTMpe1xuICAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5mb2N1c0lucHV0KTtcbiAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICB9ICAgICBcblxuLy8g0LzQtdGC0L7QtCDRg9C00LDQu9C10L3QuNGPINC40Lcg0JTQvtC80LBcbiAgICByZW1vdmVUYXNrKCl7XG4gICAgICAgIHRoaXMucmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZGVsZXRlRXZlbnQuZGV0YWlsLm51bWJlciA9IHRoaXMuY291bnRlcjsgICBcbiAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMuZGVsZXRlRXZlbnQpO1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICB9KTtcbn1cblxuLy8g0YHQu9C10LTQuNC8INC30LAg0LjQt9C80LXQvdC10L3QuNGP0LzQuCDQsiDRh9C10LrQsdC+0LrRgdCw0YUsINGA0LXQt9GD0LvRjNGC0LDRgiDQt9Cw0L/QuNGB0YvQstCw0LXQvCDQsiDQutC70LDRgdGBLlxuICAgIGlzQ2hlY2tlZCgpe1xuICAgICAgICB0aGlzLmNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgICBpZiAodGhpcy5jaGVjay5maXJzdEVsZW1lbnRDaGlsZC5jaGVja2VkKXtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZEl0ZW0gPSB0cnVlO1xuICAgICAgICAgICAgIHRoaXMuY2hlY2tJdGVtKCk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRJdGVtID0gZmFsc2U7XG4gICAgICAgICAgICAgICB0aGlzLmNoZWNrSXRlbSgpO1xuICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbi8vINC80LXRgtC+0LQg0LjQt9C80LXQvdC10L3QuNGPIGlucHV0VmFsdWUg0L/RgNC4INC10LPQviDQuNC30LzQtdC90LXQvdC40Lgg0L3QsCDRhdC+0LTRg1xuICAgIG5ld0l0ZW1WYWx1ZSgpe1xuICAgICAgICB0aGlzLm5ld0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2hhbmdlRXZlbnQuZGV0YWlsLm51bWJlciA9IHRoaXMuY291bnRlcjsgXG4gICAgICAgIHRoaXMuY2hhbmdlRXZlbnQuZGV0YWlsLnZhbHVlID0gdGhpcy5uZXdJbnB1dC52YWx1ZTtcbiAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMuY2hhbmdlRXZlbnQpO1xuICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4vLyDQtdGB0LvQuCDQsiDQutC70LDRgdGB0LUg0YHRgtCw0YLRg9GBINGH0LXQutCx0L7QutGB0LAgY2hlY2tlZCAtINC/0YDQuNC80LXQvdGP0LXQvCDRgdGC0LjQu9C4LCDQuCDQvdCw0L7QsdC+0YDQvtGCXG4gICAgY2hlY2tJdGVtKCl7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWRJdGVtKXtcbiAgICAgICAgdGhpcy5jaGVjay5jbGFzc05hbWUgPSBcImNoZWNrZWRjaGVja1wiO1xuICAgICAgICB0aGlzLm5ld0lucHV0LmNsYXNzTmFtZSA9IFwiY2hlY2tlZFwiO1xuICAgICAgICB0aGlzLnJlbW92ZS5jbGFzc05hbWUgPSBcImNoZWNrZWRyZW1vdmVcIjtcbiAgICAgICAgdGhpcy5jaGVjay5maXJzdEVsZW1lbnRDaGlsZC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hlY2suY2xhc3NOYW1lID0gXCJjaGVja1wiO1xuICAgICAgICB0aGlzLm5ld0lucHV0LmNsYXNzTmFtZSA9IFwibmV3SW5wdXRcIjtcbiAgICAgICAgdGhpcy5yZW1vdmUuY2xhc3NOYW1lID0gXCJyZW1vdmVcIjtcbiAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICAgICAgfVxuICAgIH07ICBcblxuICAgIH1cblxuXG5cbiAgIFxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90b2RvbGlzdGl0ZW0udHMiLCJpbXBvcnQgQnVpbGRJdGVtIGZyb20gJy4vYnVpbGRpdGVtLnRzJztcblxuLy8gMynQoNC10LDQu9C40LfQvtCy0LDRgtGMINGB0L7RhdGA0LDQvdC10L3QuNC1L9GH0YLQtdC90LjQtSwg0LjRgdC/0L7Qu9GM0LfRg9GPIExvY2FsU3RvcmFnZSwg0LLRgdC10YUgVG9Eb0xpc3Qg0Lgg0LjRhSDQsNC50YLQtdC80L7Qsjpcbi8vIC0g0L/RgNC4INC30LDQs9GA0YPQt9C60LUg0YHRgtGA0LDQvdC40YbRiyDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0YHQvtGF0YDQsNC90LXQvdC90YvRhSDQtNCw0L3QvdGL0YUg0Lgg0YHRgtGA0L7QuNGC0Ywg0L/QviDQvdC40LwgVG9Eb0xpc3Qg0YEg0LDQudGC0LXQvNCw0LzQuCwg0LXRgdC70Lgg0LTQsNC90L3Ri9GFINC90LXRgiwg0YLQviDQstGL0LLQvtC00LjRgtGMINGC0L7Qu9GM0LrQviDQvtC00LjQvSDQv9GD0YHRgtC+0LkgVG9Eb0xpc3QgKGVkaXRlZClcblxuaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcbiAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJy9zdy5qcycpLnRoZW4oZnVuY3Rpb24ocmVnKSB7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG5cbiAgICBjb25zb2xlLmxvZygnUmVnaXN0cmF0aW9uIGZhaWxlZCB3aXRoICcgKyBlcnJvcik7XG4gIH0pO1xufVxuXG5sZXQgZmxleGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsZXhlZCcpO1xubmV3IEJ1aWxkSXRlbShmbGV4ZWQpO1xuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiIGltcG9ydCBUb2RvbGlzdCBmcm9tICcuL3RvZG9saXN0LnRzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWlsZEl0ZW0ge1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQpe1xuICAgIHRoaXMuY29udGFpbmVyID0gcGFyZW50O1xuXHRcdHRoaXMuYWxsTGlzdHMgPSBbXTtcblx0XHR0aGlzLmNvdW50ZXIgPSAwO1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9O1xuXG5cbiAgICBpbml0KCl7XG4gICAgICAvLyBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5uZXdFdmVudCgpO1xuICAgICAgICB0aGlzLmJ1aWxkU3RvcmFnZUxpc3RzKCk7XG4gICAgXHQgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbHVzJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBcdFx0dGhpcy5idWlsZEl0ZW1IdG1sKCk7XG4gICAgICAgIHRoaXMudG9Eb0xpc3RJbml0KCk7XG4gICAgICAgIHRoaXMuY3VzdG9tRXZlbnQoKTtcbiAgICBcdH0pO1xuICAgICAgICBcbiAgICAgIH07XG5cbi8vINC30LDQsdC40YDQsNC10Lwg0LLRgdC1INGH0YLQviDQtdGB0YLRjCDQuNC3INC70L7QutCw0LvRgdGC0L7RgNC10LnQtNC20LAsINC4INCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0YfRgtC+INGC0LDQvCDQstC90YPRgtGA0LggLSDQv9C+0LrQsNC30YvQstCw0LXQvCDQu9C+0LrQsNC7LCDQuNC70Lgg0L/Rg9GB0YLQvtC5INCw0LnRgtC10LwuXG5cbiAgICBidWlsZFN0b3JhZ2VMaXN0cygpe1xuICAgICAgdGhpcy5sb2NhbFZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGEnKTtcblxuICAgICAgaWYgKHRoaXMubG9jYWxWYWx1ZSAhPT0gbnVsbCAmJiB0aGlzLmxvY2FsVmFsdWUubGVuZ3RoID4gMyl7IFxuICAgICAgICB0aGlzLmxvY2FsRnJhbWUgPSBKU09OLnBhcnNlKHRoaXMubG9jYWxWYWx1ZSk7XG5cbiAgICAgICAgdGhpcy5sb2NhbEZyYW1lLmZvckVhY2gobGlzdCA9PiB7XG5cbiAgICAgICAgdGhpcy5idWlsZEl0ZW1IdG1sKCk7XG4gICAgICAgIHRoaXMuYnVpbGRJbml0KGxpc3QpO1xuICAgICAgICB0aGlzLmN1c3RvbUV2ZW50KCk7XG4gICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxvY2FsVmFsdWUgIT09IG51bGwgJiYgdGhpcy5sb2NhbFZhbHVlLmxlbmd0aCA8IDMpe1xuICAgICAgICB0aGlzLmJ1aWxkSXRlbUh0bWwoKTtcbiAgICAgICAgdGhpcy5idWlsZEluaXQobnVsbCk7XG4gICAgICAgIHRoaXMuY3VzdG9tRXZlbnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgIHRoaXMuYnVpbGRJdGVtSHRtbCgpO1xuICAgICAgIHRoaXMuYnVpbGRJbml0KG51bGwpO1xuICAgICAgIHRoaXMuY3VzdG9tRXZlbnQoKTtcbiAgICB9IFxuICB9XG5cblxuLy8g0LzQtdGC0L7QtCDRgdC+0LfQtNCw0LXRgiDQutCw0YDQutCw0YHRgSDQtNC70Y8g0L3QvtCy0L7Qs9C+INC70LjRgdGC0LBcbiAgICBidWlsZEl0ZW1IdG1sKCl7XG4gICAgXHQgIHRoaXMubWFpbkZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgXHQgIHRoaXMubWFpbkZyYW1lLmNsYXNzTmFtZSA9ICdtYWluJztcbiAgICAgICAgdGhpcy5jb250YWluZXIuaW5zZXJ0QmVmb3JlKHRoaXMubWFpbkZyYW1lLCB0aGlzLmNvbnRhaW5lci5jaGlsZE5vZGVzWzFdKTsgIFxuICAgIH07XG5cbi8vINC80LXRgtC+0LQg0LvQvtCy0LjRgiDQstGB0LUg0LrQsNGB0YLQvtC80LjQstC10L3RgtGLLCDQutC+0YLQvtGA0YvQtSDQvdGD0LbQvdC+INGB0LvQvtCy0LjRgtGMINCyINGN0YLQvtC8INC60LvQsNGB0YHQtSBcbiAgICBjdXN0b21FdmVudCgpe1xuICAgICAgICAgIHRoaXMudGVtcG9yYXJ5TGlzdCA9IFtdO1xuLy8g0YHQvtCx0YvRgtC40LUg0YPQtNCw0LvQtdC90LjRjyDQu9C40YHRgtCwXG4gICAgXHQgIHRoaXMubWFpbkZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJkZWxldGVMaXN0c1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLmdldE51bWJlcihldmVudCk7XG4gICAgICAgICAgdGhpcy5hbGxMaXN0cy5zcGxpY2UodGhpcy50ZW1wb3JhcnlMaXN0WzFdLCAxKTsgICAgICAgICBcbiAgICAgIH0pOyBcbi8vINGB0L7QsdGL0YLQuNC1IHdhdGNoIC0g0LzQs9C90L7QstC10L3QvdCw0Y8g0L/QtdGA0LXQt9Cw0L/QuNGB0Ywg0LjQt9C80LXQvdC10L3QuNC5INCyINC70L7QutCw0LtcbiAgICAgICAgdGhpcy5tYWluRnJhbWUuYWRkRXZlbnRMaXN0ZW5lcihcIndhdGNoXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53cml0ZVN0b3JhZ2UoKTtcbiAgICAgICAgICAgIHRoaXMucGFyc2VTdG9yYWdlKCk7XG4gICAgICAgIH0pOyAgXG4gICAgfTtcblxuICAgIG5ld0V2ZW50KCl7XG5cbiAgICAgICAgdGhpcy53YXRjaCA9IG5ldyBDdXN0b21FdmVudChcIndhdGNoXCIse1xuICAgICAgICAgICAgICAgIGRldGFpbDoge2NvdW50OiBcImRvbmVcIn1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4vLyDQvNC10YLQvtC0LCDQutC+0YLQvtGA0YvQuSDRgdGA0LDQstC90LjQstCw0LXRgiDQuNC90YTQvtGA0LzQsNGG0LjRjiDQviDQvdC+0LzQtdGA0LUg0LvQuNGB0YLQsCwg0LrQvtGC0L7RgNCw0Y8g0L/RgNC40YjQu9CwINC40Lcg0L3QuNC20L3QtdCz0L4g0LrQu9Cw0YHRgdCwLCDRgSDQvdC+0LzQtdGA0L7QvCDQu9C40YHRgtCwXG4vLyDQstC+0LfQstGA0LDRidCw0LXRgiDQvNCw0YHRgdC40LIg0YEg0L3QsNC50LTQtdC90L3Ri9C8INGN0LvQtdC80LXQvdGC0L7QvCwg0Lgg0LXQs9C+INC40L3QtNC10LrRgdC+0LwuXG4gICAgZ2V0TnVtYmVyKHRoaXNFdmVudCl7XG4gICAgICAgIHRoaXMudGVtcG9yYXJ5TGlzdCA9IFtdO1xuICAgICAgICB0aGlzLmFsbExpc3RzLmZvckVhY2goKGxpc3QsIGkpID0+IHtcbiAgICAgICAgaWYgKGxpc3QubGlzdENvdW50ZXIgPT0gdGhpc0V2ZW50LmRldGFpbC5udW1iZXIpe1xuICAgICAgICB0aGlzLnRlbXBvcmFyeUxpc3QudW5zaGlmdChpKTtcbiAgICAgICAgdGhpcy50ZW1wb3JhcnlMaXN0LnVuc2hpZnQobGlzdCk7XG5cbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH0pO1xuICAgICAgfTtcbi8vINGB0YLRgNC+0LjRgiDQvdC+0LLRi9C5INC70LjRgdGCXG5cdCAgdG9Eb0xpc3RJbml0KCl7XG4gICAgICAgIHRoaXMuYnVpbGRJbml0KG51bGwpO1xuICAgICAgICB0aGlzLndyaXRlU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLnBhcnNlU3RvcmFnZSgpO1xuICAgICB9O1xuXG4vLyDQvNC10YLQvtC0INC/0LXRgNC10LfQsNC/0LjRgdGL0LLQsNC10YIg0LvQvtC60LDQu9GB0YLQvtGA0LXQudC00LZcbiAgICAgd3JpdGVTdG9yYWdlKCl7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICB0aGlzLmFsbExpc3RzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodGhpcy5hbGxMaXN0cyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZGF0YVwiLCB0aGlzLmFsbExpc3RzU3RyaW5nKTtcbiAgICAgfTtcbi8vINC80LXRgtC+0LQg0LfQsNCx0LjRgNCw0LXRgiDQu9C+0LrQsNC70YzQvdGL0LUg0LTQsNC90L3Ri9C1INC4INC00LXQu9Cw0LXRgiDQuNGFINC/0YDQuNCz0L7QtNC90YvQvCDQtNC70Y8g0YDQsNCx0L7RgtGLXG4gICAgIHBhcnNlU3RvcmFnZSgpe1xuICAgICAgICB0aGlzLmxvY2FsVmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpO1xuICAgICAgICB0aGlzLmxvY2FsRnJhbWUgPSBKU09OLnBhcnNlKHRoaXMubG9jYWxWYWx1ZSk7XG5cbiAgICAgfTtcblxuLy8g0YHQvtC30LTQsNC90LjQtSDQvdC+0LLQvtCz0L4g0LrQu9Cw0YHRgdCwIFRvZG9saXN0IChsb2NhbERhdGEg0YHRgtCw0LLQuNGC0Ywg0LXRgdC70Lgg0LXRgdGC0Ywg0LvQvtC60LDQu9GB0YLQvtGA0LXQudC00LYpXG4gICAgIGJ1aWxkSW5pdChsb2NhbERhdGEpe1xuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5tYWluRnJhbWU7XG4gICAgICB0aGlzLmFsbExpc3RzLnB1c2gobmV3IFRvZG9saXN0KHBhcmVudCwgdGhpcy5jb3VudGVyKyssIGxvY2FsRGF0YSwgdGhpcy53YXRjaCkpO1xuICAgfTtcblx0XG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9idWlsZGl0ZW0udHMiLCIgLy8gaW1wb3J0IFRvRG9MaXN0SXRlbSBmcm9tICcuL3RvZG9saXN0aXRlbS5qcyc7XG5cbiBleHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvbGlzdCB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIGNvdW50ZXIsIGxvY2FsLCB3YXRjaCl7XG4gICAgICAgXG5cbiAgICAgICAgdGhpcy53YXRjaCA9IHdhdGNoO1xuICAgICAgICB0aGlzLmxvY2FsID0gbG9jYWw7XG4gICAgICAgIHRoaXMucGFyZW50cyA9IHBhcmVudDsgLy8gbWFpbkZyYW1lXG4gICAgICAgIHRoaXMudGFza3MgPSBbXTtcbiAgICAgICAgdGhpcy5saXN0Q291bnRlciA9IGNvdW50ZXI7XG4gICAgICAgIHRoaXMudGFza0NvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLm1ha2VMaXN0KCk7XG4gICAgfVxuXG4gIFxuLy8g0YHQvtC30LvQsNC90LjQtSDQvdC+0LLQvtCz0L4g0LDQudGC0LXQvNCwXG4gICAgbWFrZUxpc3QoKXtcbiAgICAgICAgdGhpcy5tYWtlRnJhbWUoKTtcbiAgICAgICAgdGhpcy5tYWluRWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5nZXRIZWFkZXIoKTtcbiAgICAgICAgdGhpcy5uZXdFdmVudHMoKTtcbiAgICAgICAgdGhpcy53b3JraW5nV2l0aExvY2FsU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLmlucHV0VGV4dCgpOyAgXG4gICAgICAgIHRoaXMuaW5pdEV2ZW50cygpO1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3QoKTtcbiAgICAgICAgdGhpcy5kZWxldGVBbGxFdmVudHMoKTtcbiAgICAgICAgdGhpcy5kb25lYWxsSXRlbXMoKTtcbiAgICAgICAgdGhpcy5wYXJlbnRzLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG5cbiAgICAgIH07XG5cbiAgICAgIG1ha2VGcmFtZSgpe1xuICAgICAgICAgdGhpcy5wYXJlbnRzLmlubmVySFRNTCA9IGAgXG4gICAgPGRpdiBjbGFzcz1cImhlYWRcIj5cbiAgICA8ZGl2IGNsYXNzPVwidG9kb0hlYWRlclwiPlxuICAgPGRpdiBjbGFzcz1cImhlYWRlclwiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiA+QmxhYmxhPC9kaXY+IFxuICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDoyNXB4OyBoZWlnaHQ6MjVweDsgY3Vyc29yOnBvaW50ZXI7IHBhZGRpbmc6IDE2cHggMCAwIDEzcHg7XCI+PGltZyBzcmM9J2FsbDIucG5nJyBzdHlsZT0naGVpZ3RoOiAyM3B4OyB3aWR0aDogMjNweCc+PC9pbWc+PC9kaXY+XG4gICAgPGRpdiAgc3R5bGU9XCJ3aWR0aDoyNXB4O2N1cnNvcjpwb2ludGVyOyBoZWlnaHQ6MjVweDsgcGFkZGluZzogMTZweCAxNXB4IDAgMTZweDtcIj48aW1nIHNyYz0nZGVsMi5wbmcnIHN0eWxlPSdoZWlndGg6IDIzcHg7IHdpZHRoOiAyM3B4Jz48L2ltZz48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiaXRlbXNcIj48L2Rpdj4gIFxuICAgICAgICA8ZGl2IGNsYXNzPVwidW5kZXJkaXZcIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIiArIE5ldyB0YXNrXCIvPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyb3NzXCI+PGltZyBzcmM9J2Nyb3NzLnBuZycgc3R5bGU9J2hlaWd0aDogMzBweDsgd2lkdGg6IDIycHgnPjwvaW1nPjwvZGl2PlxuICAgICAgICAgPC9kaXY+IFxuICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICB9XG4gICAgXG4vLyDRgNCw0LHQvtGC0LAg0YEg0LTQsNC90L3Ri9C80Lgg0LjQtyDQu9C+0LrQsNC70YHRgtC+0YDQtdC50LTQtigg0LfQsNCx0LjRgNCw0LXRgiDQt9Cw0LPQvtC70L7QstC+0LosINC4INC30LDQv9GD0YHQutCw0LXRgiDQvNC10YLQvtC0INGB0YLRgNC+0LjRgtC10LvRjNGB0YLQstCwINC30LDQtNCw0L3QuNC5KVxuICAgIHdvcmtpbmdXaXRoTG9jYWxTdG9yYWdlKCl7XG4gICAgICBpZiAodGhpcy5sb2NhbCAhPT0gbnVsbCl7XG4gICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMV07XG4gICAgICAgIGhlYWRlci5pbm5lclRleHQgPSAodGhpcy5sb2NhbC5oZWFkZXIpO1xuICAgICAgICB0aGlzLmhlYWRlciA9IHRoaXMubG9jYWwuaGVhZGVyO1xuICAgICAgICB0aGlzLmJ1aWxkTG9jYWxUYXNrKCk7XG4gICAgICB9XG5cbiAgICB9O1xuICAgIFxuXG4gICAgZG9uZWFsbEl0ZW1zKCl7XG4gICAgICAgICAgIHRoaXMuYWxsRG9uZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgICAgICB0YXNrLmNoZWNrZWRJdGVtID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0YXNrLmNoZWNrLmZpcnN0RWxlbWVudENoaWxkLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRhc2suY2hlY2tJdGVtKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgfSk7XG4gICAgICAgICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgfTtcblxuLy8g0LLRi9GP0YHQvdGP0LXRgiwg0YHQutC+0LvRjNC60L4g0LfQsNC00LDQvdC40Lkg0LHRi9C70L4g0LIg0LvQvtC60LDQu9GB0YLQvtGA0LXQudC00LYsINC4INGB0YLRgNC+0LjRgiDRgtCw0LrQvtC1INC20LUg0LrQvtC70LjRh9C10YHRgtCy0L4gXG4gICAgIGJ1aWxkTG9jYWxUYXNrKCl7XG4gICAgICAgIHRoaXMubG9jYWwudGFza3MuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRUYXNrKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wYXJlbnRzLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfTtcblxuICAgIGlucHV0VGV4dCgpe1xuXG4gICAgICAgIHRoaXMuaW5wdXRzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgIHRoaXMuYnVpbGRUYXNrKG51bGwpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgfTtcblxuLy8g0LvQvtCy0LjQvCDQuNCy0LXQvdGC0Ysg0YPQtNCw0LvQtdC90LjRjywg0Lgg0LjQt9C80LXQvdC10L3QuNGPINCyINCw0LnRgtC10LzRhVxuICAgIGluaXRFdmVudHMoKXtcbiAgICAgICAgIHRoaXMudGVtcG9yYXJ5RGF0YSA9IFtdO1xuICAgICAgICAgdGhpcy5wYXJlbnRzLmFkZEV2ZW50TGlzdGVuZXIoXCJkZWxldGVFdmVudFwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2V0TnVtYmVyKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMudGFza3Muc3BsaWNlKHRoaXMudGVtcG9yYXJ5RGF0YVsxXSwgMSk7XG4gICAgICB9KTsgICAgICAgICAgICAgXG5cbiAgICAgICAgdGhpcy5wYXJlbnRzLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VFdmVudFwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2V0TnVtYmVyKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMudGVtcG9yYXJ5RGF0YVswXS5pbnB1dFZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9KTsgIFxuXG4gICAgICAgIHRoaXMucGFyZW50cy5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNJbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlucHV0cy5mb2N1cygpO1xuICAgICAgICB9KTsgXG4gICAgICAgIH07XG5cbi8vINC/0YDQuCDQutC70LjQutC1INC90LAg0LzRg9GB0L7RgNC90YvQuSDQsdCw0Log0YPQtNCw0LvRj9GO0YLRgdGPINCy0YHQtSDQsNC50YLQtdC80YtcbiAgICAgZGVsZXRlQWxsRXZlbnRzKCl7XG4gICAgICAgIHRoaXMuZGVsZXRlQWxsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMudGFza3MgPSBbXTtcbiAgICAgICAgdGhpcy5wYXJlbnRzLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1szXS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB0aGlzLnBhcmVudHMuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcblxuICAgICAgICB9KVxuXG4gICAgIH0gICBcbiAvLyDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQstGB0LXRhSDQutCw0YHRgtC+0LzQuNCy0LXQvdGC0L7QsiDQutC+0YLQvtGA0YvQtSDQvtGC0L3QvtGB0Y/RgtGB0Y8g0Log0Y3RgtC+0LzRgyDQutC70LDRgdGB0YNcbiAgICAgbmV3RXZlbnRzKCl7XG5cbiAgICAgICAgICB0aGlzLmRlbGV0ZUxpc3RzID0gbmV3IEN1c3RvbUV2ZW50KFwiZGVsZXRlTGlzdHNcIix7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7Y291bnQ6IFwiZG9uZVwifSAgICAgIFxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBtYWluRWxlbWVudHMoKXtcbiAgICAgICAgdGhpcy5pbnB1dHMgPSB0aGlzLnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzVdLmNoaWxkTm9kZXNbMV07XG4gICAgICAgIHRoaXMuYWxsRG9uZUJ1dHRvbiA9IHRoaXMucGFyZW50cy5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1szXTtcbiAgICAgICAgdGhpcy5kZWxldGVBbGxCdXR0b24gPSB0aGlzLnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbNV07XG4gICAgICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgfTtcbi8vINGB0YLRgNC+0LjRgtC10LvRjNGB0YLQstC+INC90L7QstC+0LPQviDQsNC50YLQtdC80LBcbiAgICBidWlsZFRhc2soZGF0YSl7XG4gICAgICB0aGlzLnRhc2tzLnB1c2goXG4gICAgICAvLyBuZXcgVG9Eb0xpc3RJdGVtKHRoaXMuaW5wdXRzLnZhbHVlLCB0aGlzLnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzNdLCB0aGlzLnRhc2tDb3VudGVyKyssIGxvY2FsRGF0YSwgdGhpcy53YXRjaClcbiAgICAgIHRoaXMubGF6eUxvYWRlcihkYXRhKTtcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuY2xlYW5WYWx1ZSgpO1xuICAgIH1cblxuICAgIGxhenlMb2FkZXIoZGF0YSl7XG4gICAgICAgICBpbXBvcnQoJy4vdG9kb2xpc3RpdGVtLnRzJykudGhlbihcbiAgICAgICAgKG1vZHVsZSkgPT4ge1xuICAgICAgICBjb25zdCB0b2RvTGlzdEl0ZW0gPSBtb2R1bGUuZGVmYXVsdDtcbiAgICAgICAgbmV3IHRvZG9MaXN0SXRlbSh0aGlzLmlucHV0cy52YWx1ZSwgdGhpcy5wYXJlbnRzLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1szXSwgdGhpcy50YXNrQ291bnRlcisrLCBkYXRhLCB0aGlzLndhdGNoKVxuICAgICB9KTtcbiAgICB9XG5cblxuLy8g0LzQtdGC0L7QtCDQvdCw0LHQu9GO0LTQsNC10YIg0LfQsCDQu9GO0LHRi9C80Lgg0LjQt9C80LXQvdC10L3QuNGP0LzQuCDQt9Cw0LPQvtC70L7QstC60LAsINC4INGB0L/QuNGB0YvQstCw0LXRgiDQuNGFINCyINC80LDRgdGB0LjQslxuICAgIGdldEhlYWRlcigpe1xuXG4gICAgICBsZXQgaGVhZGVyID0gdGhpcy5wYXJlbnRzLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdO1xuICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXIuaW5uZXJUZXh0O1xuICAgICAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlciA9IGhlYWRlci5pbm5lclRleHQ7XG4gICAgICAgICAgICAgdGhpcy5wYXJlbnRzLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICB9KTtcbiAgICAgIFxuICAgIH1cbi8vINC80LXRgtC+0LQg0YHRgNCw0LLQvdC40LLQsNC10YIg0L3QvtC80LXRgNCwINCyIGRldGFpbHMg0Lgg0LIg0LzQsNGB0YHQuNCy0LUsINC90LAg0LLRi9GF0L7QtNC1INC/0L7Qu9GD0YfQsNC10Lwg0LzQsNGB0YHQuNCyINC40Lcg0Y3Qu9C10LzQtdC90YLQsCDQuCDQtdCz0L4g0LjQvdC00LXQutGB0LBcbiAgICAgZ2V0TnVtYmVyKHRoaXNFdmVudCl7XG4gICAgICAgICAgICB0aGlzLnRlbXBvcmFyeURhdGEgPSBbXTtcbiAgICAgICAgICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaywgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhc2suY291bnRlciA9PSB0aGlzRXZlbnQuZGV0YWlsLm51bWJlcil7XG4gICAgICAgICAgICB0aGlzLnRlbXBvcmFyeURhdGEudW5zaGlmdChpKTtcbiAgICAgICAgICAgIHRoaXMudGVtcG9yYXJ5RGF0YS51bnNoaWZ0KHRhc2spO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSk7XG4gICAgICB9O1xuXG5cbiAgICBjbGVhblZhbHVlKCl7XG4gICAgICAgIHRoaXMuaW5wdXRzLnZhbHVlID0gXCJcIjtcbiAgICB9O1xuXG4vLyDRg9C00LDQu9C10L3QuNC1INC70LjRgdGC0LAgXG4gICAgcmVtb3ZlTGlzdCgpe1xuICAgIHRoaXMuaW5wdXRzLm5leHRFbGVtZW50U2libGluZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRoaXMuZGVsZXRlTGlzdHMuZGV0YWlsLm51bWJlciA9IHRoaXMubGlzdENvdW50ZXI7IFxuICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMuZGVsZXRlTGlzdHMpO1xuICAgIHRoaXMucGFyZW50cy5yZW1vdmUoKTtcbiAgICB0aGlzLnBhcmVudHMuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTsgXG4gIH0pO1xuICAgXG4gIH07XG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdG9kb2xpc3QudHMiXSwic291cmNlUm9vdCI6IiJ9