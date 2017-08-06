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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var builditem_1 = __webpack_require__(2);
// 3)Реализовать сохранение/чтение, используя LocalStorage, всех ToDoList и их айтемов:
// - при загрузке страницы проверять наличие сохраненных данных и строить по ним ToDoList с айтемами, если данных нет, то выводить только один пустой ToDoList (edited)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function (reg) {
        console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function (error) {
        console.log('Registration failed with ' + error);
    });
}
var flexed = document.getElementById('flexed');
new builditem_1.default(flexed);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var todolist_1 = __webpack_require__(3);
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
        this.mainFrame.addEventListener("deleteLists", function (e) {
            _this.getNumber(e);
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
        var todolistOptions = {
            parents: this.mainFrame,
            counter: this.counter++,
            localData: localData,
            watch: this.watch
        };
        this.allLists.push(new todolist_1.default(todolistOptions));
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

// import ToDoListItem from './todolistitem.ts';
Object.defineProperty(exports, "__esModule", { value: true });
var Todolist = (function () {
    function Todolist(options) {
        this.opt = options;
        this.tasks = [];
        this.taskCounter = 0;
        this.makeList();
    }
    // созлание нового айтема
    Todolist.prototype.makeList = function () {
        this.makeFrame();
        this.mainElements();
        this.getHeader();
        this.workingWithLocalStorage();
        this.newEvents();
        this.inputText();
        this.initEvents();
        this.removeList();
        this.deleteAllEvents();
        this.doneallItems();
        this.opt.parents.dispatchEvent(this.opt.watch);
    };
    ;
    Todolist.prototype.makeFrame = function () {
        this.opt.parents.innerHTML = " \n    <div class=\"head\">\n    <div class=\"todoHeader\">\n   <div class=\"header\" contenteditable=\"true\" >Blabla</div> \n    <div style=\"width:25px; height:25px; cursor:pointer; padding: 16px 0 0 13px;\"><img src='all2.png' style='heigth: 23px; width: 23px'></img></div>\n    <div  style=\"width:25px;cursor:pointer; height:25px; padding: 16px 15px 0 16px;\"><img src='del2.png' style='heigth: 23px; width: 23px'></img></div>\n    </div>\n    <div class=\"items\"></div>  \n        <div class=\"underdiv\">\n            <input class=\"input\" type=\"text\" placeholder=\" + New task\"/>\n            <div class=\"cross\"><img src='cross.png' style='heigth: 30px; width: 22px'></img></div>\n         </div> \n         </div>\n                    ";
    };
    // работа с данными из локалсторейдж( забирает заголовок, и запускает метод строительства заданий)
    Todolist.prototype.workingWithLocalStorage = function () {
        if (this.opt.localData !== null) {
            var header = this.opt.parents.childNodes[1].childNodes[1].childNodes[1];
            header.innerText = (this.opt.localData.header);
            this.header = this.opt.localData.header;
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
        this.opt.parents.dispatchEvent(this.opt.watch);
    };
    ;
    // выясняет, сколько заданий было в локалсторейдж, и строит такое же количество 
    Todolist.prototype.buildLocalTask = function () {
        var _this = this;
        this.opt.localData.tasks.forEach(function (item) {
            _this.buildTask(item);
        });
        this.opt.parents.dispatchEvent(this.opt.watch);
    };
    ;
    Todolist.prototype.inputText = function () {
        var _this = this;
        this.inputs.addEventListener("keyup", function (e) {
            _this.buildTask(null);
        });
        this.opt.parents.dispatchEvent(this.opt.watch);
    };
    ;
    // ловим ивенты удаления, и изменения в айтемх
    Todolist.prototype.initEvents = function () {
        var _this = this;
        this.temporaryData = [];
        this.opt.parents.addEventListener("deleteEvent", function (e) {
            _this.getNumber(e);
            _this.tasks.splice(_this.temporaryData[1], 1);
        });
        this.opt.parents.addEventListener("changeEvent", function (e) {
            _this.getNumber(e);
            _this.temporaryData[0].inputValue = e.detail.value;
        });
        this.opt.parents.addEventListener("focusInput", function () {
            _this.inputs.focus();
        });
    };
    ;
    // при клике на мусорный бак удаляются все айтемы
    Todolist.prototype.deleteAllEvents = function () {
        var _this = this;
        this.deleteAllButton.addEventListener("click", function () {
            _this.tasks = [];
            _this.opt.parents.childNodes[1].childNodes[3].innerHTML = "";
            _this.opt.parents.dispatchEvent(_this.opt.watch);
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
        this.inputs = this.opt.parents.childNodes[1].childNodes[5].childNodes[1];
        this.allDoneButton = this.opt.parents.childNodes[1].childNodes[1].childNodes[3];
        this.deleteAllButton = this.opt.parents.childNodes[1].childNodes[1].childNodes[5];
        this.opt.parents.dispatchEvent(this.opt.watch);
    };
    ;
    // строительство нового айтема
    Todolist.prototype.buildTask = function (data) {
        var todolistitemOptions = {
            inputs: this.inputs,
            parents: this.opt.parents.childNodes[1].childNodes[3],
            counter: this.opt.counter++,
            localData: data,
            watch: this.opt.watch
        };
        this.lazyLoader(todolistitemOptions);
    };
    ;
    Todolist.prototype.lazyLoader = function (data) {
        var _this = this;
        Promise.resolve().then(function () { return __webpack_require__(0); }).then(function (module) {
            var todoListItem = module.default;
            _this.tasks.push(new todoListItem(data));
        });
        this.opt.parents.dispatchEvent(this.opt.watch);
    };
    ;
    // метод наблюдает за любыми изменениями заголовка, и списывает их в массив
    Todolist.prototype.getHeader = function () {
        var _this = this;
        var header = this.opt.parents.childNodes[1].childNodes[1].childNodes[1];
        this.header = header.innerText;
        header.addEventListener("input", function () {
            _this.header = header.innerText;
            _this.opt.parents.dispatchEvent(_this.opt.watch);
        });
    };
    // метод сравнивает номера в details и в массиве, на выходе получаем массив из элемента и его индекса
    Todolist.prototype.getNumber = function (thisEvent) {
        var _this = this;
        this.temporaryData = [];
        this.tasks.forEach(function (task, i) {
            if (task.opt.counter == thisEvent.detail.number) {
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
            _this.opt.parents.dispatchEvent(_this.deleteLists);
            _this.opt.parents.remove();
            _this.opt.parents.dispatchEvent(_this.opt.watch);
        });
    };
    ;
    return Todolist;
}());
exports.default = Todolist;
;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODg3YTY2MTM3OTgwOWQ1MDI5ZTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RvZG9saXN0aXRlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2J1aWxkaXRlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdG9kb2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDMURDO0lBYU8sc0JBQWEsT0FBWTtRQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRVQscUJBQXFCO0lBQ2pCLDJCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJ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QyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakQsS0FBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDMUIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFSCxDQUFDO0lBQUEsQ0FBQztJQUNKLGVBQUM7QUFBRCxDQUFDOztBQUFBLENBQUMiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg4N2E2NjEzNzk4MDlkNTAyOWUyIiwiXG5cblxuIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvRG9MaXN0SXRlbSB7XG5cbiAgICAgICAgICAgIG9wdDogYW55O1xuICAgICAgICAgICAgY2hlY2tlZEl0ZW06IGJvb2xlYW47XG4gICAgICAgICAgICBuZXdJbnB1dDogYW55O1xuICAgICAgICAgICAgY2hlY2s6IGFueTtcbiAgICAgICAgICAgIHJlbW92ZTogYW55O1xuICAgICAgICAgICAgbWFpbkNvbnRhaW5lcjogRWxlbWVudDtcbiAgICAgICAgICAgIGRlbGV0ZUV2ZW50OiBDdXN0b21FdmVudDtcbiAgICAgICAgICAgIGNoYW5nZUV2ZW50OiBDdXN0b21FdmVudDtcbiAgICAgICAgICAgIGZvY3VzSW5wdXQ6IEN1c3RvbUV2ZW50O1xuICAgICAgICAgICAgaW5wdXRWYWx1ZTogc3RyaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yIChvcHRpb25zOiBhbnkpe1xuICAgICAgICAgICAgdGhpcy5vcHQgPSBvcHRpb25zO1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gb3B0aW9ucy5pbnB1dHMudmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRJdGVtID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgfVxuXG4vLyDRgdGC0YDQvtC40Lwg0L3QvtCy0YvQuSDQsNC50YLQtdC8XG4gICAgaW5pdCgpe1xuICAgICAgICB0aGlzLm5ld0V2ZW50cygpO1xuICAgICAgICB0aGlzLndvcmtpbmdXaXRoTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMuaHRtbEJ1aWxkKCk7XG4gICAgICAgIHRoaXMubWFpbkVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMuc3RhcnRJbnB1dFZhbHVlKCk7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lclN0eWxlcygpO1xuICAgICAgICB0aGlzLmZvY3VzVG9kb2xpc3RJbnB1dCgpO1xuICAgICAgICB0aGlzLmNoZWNrSXRlbSgpO1xuICAgICAgICB0aGlzLm5ld0l0ZW1WYWx1ZSgpOyBcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVUYXNrKCk7XG4gICAgICAgIHRoaXMub3B0LnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5vcHQud2F0Y2gpO1xuICAgICAgICAgICBcbiAgICB9XG5cbi8vINC10YHQu9C4INC10YHRgtGMINC60LDQutC40LUt0YLQviDQu9C+0LrQsNC70YzQvdGL0LUg0LTQsNC90L3Ri9C1LCDQt9Cw0LHQuNGA0LDQtdC8INC40Lcg0L3QuNGFINC40L3Qv9GD0YIsINC4INC40L3RhNC+0YDQvNCw0YbQuNGOLCDQutCw0LrQuNC1INC40Lcg0LDQudGC0LXQvNC+0LIg0LHRi9C70Lgg0YfQtdC60L3Rg9GC0YtcbiAgICB3b3JraW5nV2l0aExvY2FsU3RvcmFnZSgpe1xuICAgICAgICBpZiAodGhpcy5vcHQubG9jYWxEYXRhICE9PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHRoaXMub3B0LmxvY2FsRGF0YS5pbnB1dFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkSXRlbSA9IHRoaXMub3B0LmxvY2FsRGF0YS5jaGVja2VkSXRlbTtcbiAgICAgICAgICAgIHRoaXMub3B0LnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5vcHQud2F0Y2gpO1xuXG4gICAgfX07XG5cbiAgICBzdGFydElucHV0VmFsdWUoKXtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC5mb2N1cygpO1xuICAgICAgICBsZXQgdmFsID0gdGhpcy5pbnB1dFZhbHVlO1xuICAgICAgICB0aGlzLm5ld0lucHV0LnZhbHVlID0gXCJcIjsgXG4gICAgICAgIHRoaXMubmV3SW5wdXQudmFsdWUgPSB2YWw7IFxuICAgICAgICB0aGlzLm9wdC5pbnB1dHMudmFsdWUgPSBcIlwiO1xuICAgIH1cblxuICAgIG1haW5FbGVtZW50cygpe1xuICAgICAgICB0aGlzLmNoZWNrID0gdGhpcy5tYWluQ29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkTm9kZXNbMV07XG4gICAgICAgIHRoaXMubmV3SW5wdXQgPSB0aGlzLm1haW5Db250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGROb2Rlc1szXTtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC52YWx1ZSA9IHRoaXMub3B0LmlucHV0cy52YWx1ZTtcbiAgICAgICAgdGhpcy5yZW1vdmUgPSB0aGlzLm1haW5Db250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGROb2Rlc1s1XTtcbiAgICB9XG5cbiAgICBtYWluQ29udGFpbmVyU3R5bGVzKCl7XG4gICAgICAgIHRoaXMubmV3SW5wdXQucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgdGhpcy5yZW1vdmUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMubmV3SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgdGhpcy5yZW1vdmUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuICAgICAgICB9KTtcblxuICAgICAgICAgdGhpcy5yZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgIHRoaXMubmV3SW5wdXQucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlOiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBuZXdFdmVudHMoKXtcblxuICAgICAgICBcbiAgICAgICAgdGhpcy5kZWxldGVFdmVudCA9IG5ldyBDdXN0b21FdmVudChcImRlbGV0ZUV2ZW50XCIse1xuICAgICAgICAgICAgICAgIGRldGFpbDoge2NvdW50OiBcImRvbmVcIn0gICAgICBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VFdmVudCA9IG5ldyBDdXN0b21FdmVudChcImNoYW5nZUV2ZW50XCIse1xuICAgICAgICAgICAgICAgIGRldGFpbDoge2NvdW50OiBcImRvbmVcIn0gICAgICBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb2N1c0lucHV0ID0gbmV3IEN1c3RvbUV2ZW50KFwiZm9jdXNJbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgIGRldGFpbDoge2NvdW50OiBcImRvbmVcIn1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbi8vINC/0L7RgdGC0YDQvtC50LrQsCDQutCw0YDQutCw0YHRgdCwINCw0LnRgtC10LzQsFxuICAgaHRtbEJ1aWxkKCl7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMub3B0LnBhcmVudHMuYXBwZW5kQ2hpbGQodGhpcy5tYWluQ29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwibWFpbkNvbnRhaW5lclwiO1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gYCBcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbnRhaW5lcic+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjaGVjayc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nY2hlY2tib3gnIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTsgY3Vyc29yOiBwb2ludGVyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPSduZXdJbnB1dCcgdmFsdWU9JyR7dGhpcy5vcHQuaW5wdXRzLnZhbHVlfSc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdyZW1vdmUnPjxpbWcgc3JjPSdjcm9zcy5wbmcnIHN0eWxlPSdoZWlndGg6IDE4cHg7IHdpZHRoOiAyMnB4OyBkaXNwbGF5OmJsb2NrJz48L2ltZz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PmA7IFxuICAgICAgICB0aGlzLm9wdC5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMub3B0LndhdGNoKTtcbiAgICAgICAgfVxuICAgIFxuICAgZm9jdXNUb2RvbGlzdElucHV0KCl7XG4gICAgICAgIHRoaXMubmV3SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICBpZihlLmtleUNvZGUgPT0gMTMpe1xuICAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICB0aGlzLm9wdC5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMuZm9jdXNJbnB1dCk7XG4gICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgfSAgICAgXG5cbi8vINC80LXRgtC+0LQg0YPQtNCw0LvQtdC90LjRjyDQuNC3INCU0L7QvNCwXG4gICAgcmVtb3ZlVGFzaygpe1xuICAgICAgICB0aGlzLnJlbW92ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmRlbGV0ZUV2ZW50LmRldGFpbC5udW1iZXIgPSB0aGlzLm9wdC5jb3VudGVyOyAgIFxuICAgICAgICB0aGlzLm9wdC5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMuZGVsZXRlRXZlbnQpO1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMub3B0LnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5vcHQud2F0Y2gpO1xuICAgIH0pO1xufVxuXG4vLyDRgdC70LXQtNC40Lwg0LfQsCDQuNC30LzQtdC90LXQvdC40Y/QvNC4INCyINGH0LXQutCx0L7QutGB0LDRhSwg0YDQtdC30YPQu9GM0YLQsNGCINC30LDQv9C40YHRi9Cy0LDQtdC8INCyINC60LvQsNGB0YEuXG4gICAgaXNDaGVja2VkKCl7XG4gICAgICAgIHRoaXMuY2hlY2suYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrLmZpcnN0RWxlbWVudENoaWxkLmNoZWNrZWQpe1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkSXRlbSA9IHRydWU7XG4gICAgICAgICAgICAgdGhpcy5jaGVja0l0ZW0oKTtcbiAgICAgICAgICAgIHRoaXMub3B0LnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5vcHQud2F0Y2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkSXRlbSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgdGhpcy5jaGVja0l0ZW0oKTtcbiAgICAgICAgICAgICAgIHRoaXMub3B0LnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5vcHQud2F0Y2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbi8vINC80LXRgtC+0LQg0LjQt9C80LXQvdC10L3QuNGPIGlucHV0VmFsdWUg0L/RgNC4INC10LPQviDQuNC30LzQtdC90LXQvdC40Lgg0L3QsCDRhdC+0LTRg1xuICAgIG5ld0l0ZW1WYWx1ZSgpe1xuICAgICAgICB0aGlzLm5ld0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2hhbmdlRXZlbnQuZGV0YWlsLm51bWJlciA9IHRoaXMub3B0LmNvdW50ZXI7IFxuICAgICAgICB0aGlzLmNoYW5nZUV2ZW50LmRldGFpbC52YWx1ZSA9IHRoaXMubmV3SW5wdXQudmFsdWU7XG4gICAgICAgIHRoaXMub3B0LnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5jaGFuZ2VFdmVudCk7XG4gICAgICAgIHRoaXMub3B0LnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5vcHQud2F0Y2gpO1xuICAgICAgICB9KVxuICAgIH1cblxuLy8g0LXRgdC70Lgg0LIg0LrQu9Cw0YHRgdC1INGB0YLQsNGC0YPRgSDRh9C10LrQsdC+0LrRgdCwIGNoZWNrZWQgLSDQv9GA0LjQvNC10L3Rj9C10Lwg0YHRgtC40LvQuCwg0Lgg0L3QsNC+0LHQvtGA0L7RglxuICAgIGNoZWNrSXRlbSgpe1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkSXRlbSl7XG4gICAgICAgIHRoaXMuY2hlY2suY2xhc3NOYW1lID0gXCJjaGVja2VkY2hlY2tcIjtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC5jbGFzc05hbWUgPSBcImNoZWNrZWRcIjtcbiAgICAgICAgdGhpcy5yZW1vdmUuY2xhc3NOYW1lID0gXCJjaGVja2VkcmVtb3ZlXCI7XG4gICAgICAgIHRoaXMuY2hlY2suZmlyc3RFbGVtZW50Q2hpbGQuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgdGhpcy5vcHQucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLm9wdC53YXRjaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hlY2suY2xhc3NOYW1lID0gXCJjaGVja1wiO1xuICAgICAgICB0aGlzLm5ld0lucHV0LmNsYXNzTmFtZSA9IFwibmV3SW5wdXRcIjtcbiAgICAgICAgdGhpcy5yZW1vdmUuY2xhc3NOYW1lID0gXCJyZW1vdmVcIjtcbiAgICAgICAgdGhpcy5vcHQucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLm9wdC53YXRjaCk7XG4gICAgICAgICAgICB9XG4gICAgfTsgIFxuXG4gICAgfVxuXG5cblxuICAgXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RvZG9saXN0aXRlbS50cyIsImltcG9ydCBCdWlsZEl0ZW0gZnJvbSAnLi9idWlsZGl0ZW0nO1xuXG4vLyAzKdCg0LXQsNC70LjQt9C+0LLQsNGC0Ywg0YHQvtGF0YDQsNC90LXQvdC40LUv0YfRgtC10L3QuNC1LCDQuNGB0L/QvtC70YzQt9GD0Y8gTG9jYWxTdG9yYWdlLCDQstGB0LXRhSBUb0RvTGlzdCDQuCDQuNGFINCw0LnRgtC10LzQvtCyOlxuLy8gLSDQv9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDRgdGC0YDQsNC90LjRhtGLINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDRgdC+0YXRgNCw0L3QtdC90L3Ri9GFINC00LDQvdC90YvRhSDQuCDRgdGC0YDQvtC40YLRjCDQv9C+INC90LjQvCBUb0RvTGlzdCDRgSDQsNC50YLQtdC80LDQvNC4LCDQtdGB0LvQuCDQtNCw0L3QvdGL0YUg0L3QtdGCLCDRgtC+INCy0YvQstC+0LTQuNGC0Ywg0YLQvtC70YzQutC+INC+0LTQuNC9INC/0YPRgdGC0L7QuSBUb0RvTGlzdCAoZWRpdGVkKVxuXG5pZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJy9zdy5qcycpLnRoZW4oZnVuY3Rpb24ocmVnKSB7XG4gXG4gICAgY29uc29sZS5sb2coJ1JlZ2lzdHJhdGlvbiBzdWNjZWVkZWQuIFNjb3BlIGlzICcgKyByZWcuc2NvcGUpO1xuICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiBcbiAgICAgY29uc29sZS5sb2coJ1JlZ2lzdHJhdGlvbiBmYWlsZWQgd2l0aCAnICsgZXJyb3IpO1xuICAgfSk7XG4gfVxuIFxuICBsZXQgZmxleGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsZXhlZCcpO1xuICBuZXcgQnVpbGRJdGVtKGZsZXhlZCk7IFxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyIsIiBpbXBvcnQgVG9kb2xpc3QgZnJvbSAnLi90b2RvbGlzdCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVpbGRJdGVtIHtcblxuICAgY29udGFpbmVyOiBFbGVtZW50O1xuICAgYWxsTGlzdHM6IGFueTtcbiAgIGNvdW50ZXI6IG51bWJlcjtcbiAgIGxvY2FsVmFsdWU6IHN0cmluZztcbiAgIGxvY2FsRnJhbWU6IGFueTtcbiAgIG1haW5GcmFtZTogRWxlbWVudDtcbiAgIHRlbXBvcmFyeUxpc3Q6IGFueTtcbiAgIHdhdGNoOiBDdXN0b21FdmVudDtcbiAgIGFsbExpc3RzU3RyaW5nOiBzdHJpbmc7XG5cblxuXHRjb25zdHJ1Y3RvcihwYXJlbnQ6IEVsZW1lbnQpe1xuICAgIHRoaXMuY29udGFpbmVyID0gcGFyZW50O1xuXHRcdHRoaXMuYWxsTGlzdHMgPSBbXTtcblx0XHR0aGlzLmNvdW50ZXIgPSAwO1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9O1xuXG5cbiAgICBpbml0KCl7XG4gICAgICAvLyBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5uZXdFdmVudCgpO1xuICAgICAgICB0aGlzLmJ1aWxkU3RvcmFnZUxpc3RzKCk7XG4gICAgXHQgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbHVzJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBcdFx0dGhpcy5idWlsZEl0ZW1IdG1sKCk7XG4gICAgICAgIHRoaXMudG9Eb0xpc3RJbml0KCk7XG4gICAgICAgIHRoaXMuY3VzdG9tRXZlbnQoKTtcbiAgICBcdH0pO1xuICAgICAgICBcbiAgICAgIH07XG5cbi8vINC30LDQsdC40YDQsNC10Lwg0LLRgdC1INGH0YLQviDQtdGB0YLRjCDQuNC3INC70L7QutCw0LvRgdGC0L7RgNC10LnQtNC20LAsINC4INCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0YfRgtC+INGC0LDQvCDQstC90YPRgtGA0LggLSDQv9C+0LrQsNC30YvQstCw0LXQvCDQu9C+0LrQsNC7LCDQuNC70Lgg0L/Rg9GB0YLQvtC5INCw0LnRgtC10LwuXG5cbiAgICBidWlsZFN0b3JhZ2VMaXN0cygpe1xuICAgICBcbiAgICAgIHRoaXMubG9jYWxWYWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhJyk7XG4gICAgICBpZiAodGhpcy5sb2NhbFZhbHVlICE9PSBudWxsICYmIHRoaXMubG9jYWxWYWx1ZS5sZW5ndGggPiAzKXsgXG4gICAgICAgIHRoaXMubG9jYWxGcmFtZSA9IEpTT04ucGFyc2UodGhpcy5sb2NhbFZhbHVlKTtcbiAgICAgICAgdGhpcy5sb2NhbEZyYW1lLmZvckVhY2goKGxpc3Q6IG9iamVjdCkgPT4ge1xuICAgICAgICB0aGlzLmJ1aWxkSXRlbUh0bWwoKTtcbiAgICAgICAgdGhpcy5idWlsZEluaXQobGlzdCk7XG4gICAgICAgIHRoaXMuY3VzdG9tRXZlbnQoKTtcbiAgICAgICB9KTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5sb2NhbFZhbHVlICE9PSBudWxsICYmIHRoaXMubG9jYWxWYWx1ZS5sZW5ndGggPCAzKXtcbiAgICAgICAgdGhpcy5idWlsZEl0ZW1IdG1sKCk7XG4gICAgICAgIHRoaXMuYnVpbGRJbml0KG51bGwpO1xuICAgICAgICB0aGlzLmN1c3RvbUV2ZW50KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICB0aGlzLmJ1aWxkSXRlbUh0bWwoKTtcbiAgICAgICB0aGlzLmJ1aWxkSW5pdChudWxsKTtcbiAgICAgICB0aGlzLmN1c3RvbUV2ZW50KCk7XG4gICAgfSBcbiAgfVxuXG5cbi8vINC80LXRgtC+0LQg0YHQvtC30LTQsNC10YIg0LrQsNGA0LrQsNGB0YEg0LTQu9GPINC90L7QstC+0LPQviDQu9C40YHRgtCwXG4gICAgYnVpbGRJdGVtSHRtbCgpe1xuICAgIFx0ICB0aGlzLm1haW5GcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIFx0ICB0aGlzLm1haW5GcmFtZS5jbGFzc05hbWUgPSAnbWFpbic7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmluc2VydEJlZm9yZSh0aGlzLm1haW5GcmFtZSwgdGhpcy5jb250YWluZXIuY2hpbGROb2Rlc1sxXSk7ICBcbiAgICB9O1xuXG4vLyDQvNC10YLQvtC0INC70L7QstC40YIg0LLRgdC1INC60LDRgdGC0L7QvNC40LLQtdC90YLRiywg0LrQvtGC0L7RgNGL0LUg0L3Rg9C20L3QviDRgdC70L7QstC40YLRjCDQsiDRjdGC0L7QvCDQutC70LDRgdGB0LUgXG4gICAgY3VzdG9tRXZlbnQoKXtcbiAgICAgICAgICB0aGlzLnRlbXBvcmFyeUxpc3QgPSBbXTtcbi8vINGB0L7QsdGL0YLQuNC1INGD0LTQsNC70LXQvdC40Y8g0LvQuNGB0YLQsFxuICAgIFx0ICB0aGlzLm1haW5GcmFtZS5hZGRFdmVudExpc3RlbmVyKFwiZGVsZXRlTGlzdHNcIiwgKGU6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0TnVtYmVyKGUpO1xuICAgICAgICAgIHRoaXMuYWxsTGlzdHMuc3BsaWNlKHRoaXMudGVtcG9yYXJ5TGlzdFsxXSwgMSk7ICAgICAgICAgXG4gICAgICB9KTsgXG4vLyDRgdC+0LHRi9GC0LjQtSB3YXRjaCAtINC80LPQvdC+0LLQtdC90L3QsNGPINC/0LXRgNC10LfQsNC/0LjRgdGMINC40LfQvNC10L3QtdC90LjQuSDQsiDQu9C+0LrQsNC7XG4gICAgICAgIHRoaXMubWFpbkZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJ3YXRjaFwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMud3JpdGVTdG9yYWdlKCk7XG4gICAgICAgICAgICB0aGlzLnBhcnNlU3RvcmFnZSgpO1xuICAgICAgICB9KTsgIFxuICAgIH07XG5cbiAgICBuZXdFdmVudCgpe1xuXG4gICAgICAgIHRoaXMud2F0Y2ggPSBuZXcgQ3VzdG9tRXZlbnQoXCJ3YXRjaFwiLHtcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtjb3VudDogXCJkb25lXCJ9XG4gICAgICAgIH0pO1xuICAgIH1cblxuLy8g0LzQtdGC0L7QtCwg0LrQvtGC0L7RgNGL0Lkg0YHRgNCw0LLQvdC40LLQsNC10YIg0LjQvdGE0L7RgNC80LDRhtC40Y4g0L4g0L3QvtC80LXRgNC1INC70LjRgdGC0LAsINC60L7RgtC+0YDQsNGPINC/0YDQuNGI0LvQsCDQuNC3INC90LjQttC90LXQs9C+INC60LvQsNGB0YHQsCwg0YEg0L3QvtC80LXRgNC+0Lwg0LvQuNGB0YLQsFxuLy8g0LLQvtC30LLRgNCw0YnQsNC10YIg0LzQsNGB0YHQuNCyINGBINC90LDQudC00LXQvdC90YvQvCDRjdC70LXQvNC10L3RgtC+0LwsINC4INC10LPQviDQuNC90LTQtdC60YHQvtC8LlxuICAgIGdldE51bWJlcih0aGlzRXZlbnQ6IEN1c3RvbUV2ZW50KXtcbiAgICAgICAgdGhpcy50ZW1wb3JhcnlMaXN0ID0gW107XG4gICAgICAgIHRoaXMuYWxsTGlzdHMuZm9yRWFjaCgobGlzdDogYW55LCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKGxpc3QubGlzdENvdW50ZXIgPT0gdGhpc0V2ZW50LmRldGFpbC5udW1iZXIpe1xuICAgICAgICB0aGlzLnRlbXBvcmFyeUxpc3QudW5zaGlmdChpKTtcbiAgICAgICAgdGhpcy50ZW1wb3JhcnlMaXN0LnVuc2hpZnQobGlzdCk7XG5cbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH0pO1xuICAgICAgfTtcbi8vINGB0YLRgNC+0LjRgiDQvdC+0LLRi9C5INC70LjRgdGCXG5cdCAgdG9Eb0xpc3RJbml0KCl7XG4gICAgICAgIHRoaXMuYnVpbGRJbml0KG51bGwpO1xuICAgICAgICB0aGlzLndyaXRlU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLnBhcnNlU3RvcmFnZSgpO1xuICAgICB9O1xuXG4vLyDQvNC10YLQvtC0INC/0LXRgNC10LfQsNC/0LjRgdGL0LLQsNC10YIg0LvQvtC60LDQu9GB0YLQvtGA0LXQudC00LZcbiAgICAgd3JpdGVTdG9yYWdlKCl7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICB0aGlzLmFsbExpc3RzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodGhpcy5hbGxMaXN0cyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZGF0YVwiLCB0aGlzLmFsbExpc3RzU3RyaW5nKTtcbiAgICAgfTtcbi8vINC80LXRgtC+0LQg0LfQsNCx0LjRgNCw0LXRgiDQu9C+0LrQsNC70YzQvdGL0LUg0LTQsNC90L3Ri9C1INC4INC00LXQu9Cw0LXRgiDQuNGFINC/0YDQuNCz0L7QtNC90YvQvCDQtNC70Y8g0YDQsNCx0L7RgtGLXG4gICAgIHBhcnNlU3RvcmFnZSgpe1xuICAgICAgICB0aGlzLmxvY2FsVmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpO1xuICAgICAgICB0aGlzLmxvY2FsRnJhbWUgPSBKU09OLnBhcnNlKHRoaXMubG9jYWxWYWx1ZSk7XG5cbiAgICAgfTtcblxuLy8g0YHQvtC30LTQsNC90LjQtSDQvdC+0LLQvtCz0L4g0LrQu9Cw0YHRgdCwIFRvZG9saXN0IChsb2NhbERhdGEg0YHRgtCw0LLQuNGC0Ywg0LXRgdC70Lgg0LXRgdGC0Ywg0LvQvtC60LDQu9GB0YLQvtGA0LXQudC00LYpXG4gICAgIGJ1aWxkSW5pdChsb2NhbERhdGE6IGFueSl7XG4gICAgICAgIGxldCB0b2RvbGlzdE9wdGlvbnM6IG9iamVjdCA9IHtcbiAgICAgICAgICAgcGFyZW50czogdGhpcy5tYWluRnJhbWUsXG4gICAgICAgICAgIGNvdW50ZXI6IHRoaXMuY291bnRlcisrLFxuICAgICAgICAgICBsb2NhbERhdGE6IGxvY2FsRGF0YSxcbiAgICAgICAgICAgd2F0Y2g6IHRoaXMud2F0Y2hcbiAgICB9XG4gICAgICAgdGhpcy5hbGxMaXN0cy5wdXNoKG5ldyBUb2RvbGlzdCh0b2RvbGlzdE9wdGlvbnMpKTtcbiAgIH07XG5cdFxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYnVpbGRpdGVtLnRzIiwiIC8vIGltcG9ydCBUb0RvTGlzdEl0ZW0gZnJvbSAnLi90b2RvbGlzdGl0ZW0udHMnO1xuXG4gZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kb2xpc3Qge1xuICAgICAgICBvcHQ6IGFueTtcbiAgICAgICAgdGFza3M6IGFueTtcbiAgICAgICAgbGlzdENvdW50ZXI6IG51bWJlcjtcbiAgICAgICAgdGFza0NvdW50ZXI6IG51bWJlcjtcbiAgICAgICAgaGVhZGVyOiBzdHJpbmc7XG4gICAgICAgIGFsbERvbmVCdXR0b246IE5vZGU7XG4gICAgICAgIGRlbGV0ZUFsbEJ1dHRvbjogTm9kZTtcbiAgICAgICAgZGVsZXRlTGlzdHM6IEN1c3RvbUV2ZW50O1xuICAgICAgICBpbnB1dHM6IGFueTtcbiAgICAgICAgdGVtcG9yYXJ5RGF0YTogYW55O1xuXG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBvYmplY3Qpe1xuICAgICAgICB0aGlzLm9wdCA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMudGFza3MgPSBbXTtcbiAgICAgICAgdGhpcy50YXNrQ291bnRlciA9IDA7XG4gICAgICAgIHRoaXMubWFrZUxpc3QoKTtcbiAgICB9XG4gIFxuLy8g0YHQvtC30LvQsNC90LjQtSDQvdC+0LLQvtCz0L4g0LDQudGC0LXQvNCwXG4gICAgbWFrZUxpc3QoKXtcbiAgICAgICAgdGhpcy5tYWtlRnJhbWUoKTtcbiAgICAgICAgdGhpcy5tYWluRWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5nZXRIZWFkZXIoKTtcbiAgICAgICAgdGhpcy53b3JraW5nV2l0aExvY2FsU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLm5ld0V2ZW50cygpO1xuICAgICAgICB0aGlzLmlucHV0VGV4dCgpOyAgXG4gICAgICAgIHRoaXMuaW5pdEV2ZW50cygpO1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3QoKTtcbiAgICAgICAgdGhpcy5kZWxldGVBbGxFdmVudHMoKTtcbiAgICAgICAgdGhpcy5kb25lYWxsSXRlbXMoKTtcbiAgICAgICAgdGhpcy5vcHQucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMub3B0LndhdGNoKTtcblxuICAgICAgfTtcblxuICAgICAgbWFrZUZyYW1lKCl7XG4gICAgICAgICB0aGlzLm9wdC5wYXJlbnRzLmlubmVySFRNTCA9IGAgXG4gICAgPGRpdiBjbGFzcz1cImhlYWRcIj5cbiAgICA8ZGl2IGNsYXNzPVwidG9kb0hlYWRlclwiPlxuICAgPGRpdiBjbGFzcz1cImhlYWRlclwiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiA+QmxhYmxhPC9kaXY+IFxuICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDoyNXB4OyBoZWlnaHQ6MjVweDsgY3Vyc29yOnBvaW50ZXI7IHBhZGRpbmc6IDE2cHggMCAwIDEzcHg7XCI+PGltZyBzcmM9J2FsbDIucG5nJyBzdHlsZT0naGVpZ3RoOiAyM3B4OyB3aWR0aDogMjNweCc+PC9pbWc+PC9kaXY+XG4gICAgPGRpdiAgc3R5bGU9XCJ3aWR0aDoyNXB4O2N1cnNvcjpwb2ludGVyOyBoZWlnaHQ6MjVweDsgcGFkZGluZzogMTZweCAxNXB4IDAgMTZweDtcIj48aW1nIHNyYz0nZGVsMi5wbmcnIHN0eWxlPSdoZWlndGg6IDIzcHg7IHdpZHRoOiAyM3B4Jz48L2ltZz48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiaXRlbXNcIj48L2Rpdj4gIFxuICAgICAgICA8ZGl2IGNsYXNzPVwidW5kZXJkaXZcIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIiArIE5ldyB0YXNrXCIvPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyb3NzXCI+PGltZyBzcmM9J2Nyb3NzLnBuZycgc3R5bGU9J2hlaWd0aDogMzBweDsgd2lkdGg6IDIycHgnPjwvaW1nPjwvZGl2PlxuICAgICAgICAgPC9kaXY+IFxuICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICB9XG4gICAgXG4vLyDRgNCw0LHQvtGC0LAg0YEg0LTQsNC90L3Ri9C80Lgg0LjQtyDQu9C+0LrQsNC70YHRgtC+0YDQtdC50LTQtigg0LfQsNCx0LjRgNCw0LXRgiDQt9Cw0LPQvtC70L7QstC+0LosINC4INC30LDQv9GD0YHQutCw0LXRgiDQvNC10YLQvtC0INGB0YLRgNC+0LjRgtC10LvRjNGB0YLQstCwINC30LDQtNCw0L3QuNC5KVxuICAgIHdvcmtpbmdXaXRoTG9jYWxTdG9yYWdlKCl7XG4gICAgICBpZiAodGhpcy5vcHQubG9jYWxEYXRhICE9PSBudWxsKXtcbiAgICAgICAgbGV0IGhlYWRlcjogYW55ID0gdGhpcy5vcHQucGFyZW50cy5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXTtcbiAgICAgICAgaGVhZGVyLmlubmVyVGV4dCA9ICh0aGlzLm9wdC5sb2NhbERhdGEuaGVhZGVyKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLm9wdC5sb2NhbERhdGEuaGVhZGVyO1xuICAgICAgICB0aGlzLmJ1aWxkTG9jYWxUYXNrKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBcblxuICAgIGRvbmVhbGxJdGVtcygpe1xuICAgICAgICAgICB0aGlzLmFsbERvbmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2s6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhc2suY2hlY2tlZEl0ZW0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRhc2suY2hlY2suZmlyc3RFbGVtZW50Q2hpbGQuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGFzay5jaGVja0l0ZW0oKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICB9KTtcbiAgICAgICAgICAgdGhpcy5vcHQucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMub3B0LndhdGNoKTtcblxuICAgIH07XG5cbi8vINCy0YvRj9GB0L3Rj9C10YIsINGB0LrQvtC70YzQutC+INC30LDQtNCw0L3QuNC5INCx0YvQu9C+INCyINC70L7QutCw0LvRgdGC0L7RgNC10LnQtNC2LCDQuCDRgdGC0YDQvtC40YIg0YLQsNC60L7QtSDQttC1INC60L7Qu9C40YfQtdGB0YLQstC+IFxuICAgICBidWlsZExvY2FsVGFzaygpe1xuICAgICAgICB0aGlzLm9wdC5sb2NhbERhdGEudGFza3MuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkVGFzayhpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub3B0LnBhcmVudHMuZGlzcGF0Y2hFdmVudCh0aGlzLm9wdC53YXRjaCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfTtcblxuICAgIGlucHV0VGV4dCgpe1xuXG4gICAgICAgIHRoaXMuaW5wdXRzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZTpFdmVudCkgPT4ge1xuICAgICAgICAgICAgIHRoaXMuYnVpbGRUYXNrKG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vcHQucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMub3B0LndhdGNoKTtcblxuICAgIH07XG5cbi8vINC70L7QstC40Lwg0LjQstC10L3RgtGLINGD0LTQsNC70LXQvdC40Y8sINC4INC40LfQvNC10L3QtdC90LjRjyDQsiDQsNC50YLQtdC80YVcbiAgICBpbml0RXZlbnRzKCl7XG4gICAgICAgICB0aGlzLnRlbXBvcmFyeURhdGEgPSBbXTtcbiAgICAgICAgIHRoaXMub3B0LnBhcmVudHMuYWRkRXZlbnRMaXN0ZW5lcihcImRlbGV0ZUV2ZW50XCIsIChlOiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXROdW1iZXIoZSk7XG4gICAgICAgICAgICB0aGlzLnRhc2tzLnNwbGljZSh0aGlzLnRlbXBvcmFyeURhdGFbMV0sIDEpO1xuICAgICAgfSk7ICAgICAgICAgICAgIFxuXG4gICAgICAgIHRoaXMub3B0LnBhcmVudHMuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZUV2ZW50XCIsIChlOiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXROdW1iZXIoZSk7XG4gICAgICAgICAgICB0aGlzLnRlbXBvcmFyeURhdGFbMF0uaW5wdXRWYWx1ZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9KTsgIFxuXG4gICAgICAgIHRoaXMub3B0LnBhcmVudHMuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzSW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbnB1dHMuZm9jdXMoKTtcbiAgICAgICAgfSk7IFxuICAgICAgICB9O1xuXG4vLyDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC80YPRgdC+0YDQvdGL0Lkg0LHQsNC6INGD0LTQsNC70Y/RjtGC0YHRjyDQstGB0LUg0LDQudGC0LXQvNGLXG4gICAgIGRlbGV0ZUFsbEV2ZW50cygpe1xuICAgICAgICB0aGlzLmRlbGV0ZUFsbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgICAgIHRoaXMub3B0LnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzNdLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHRoaXMub3B0LnBhcmVudHMuZGlzcGF0Y2hFdmVudCh0aGlzLm9wdC53YXRjaCk7XG5cbiAgICAgICAgfSlcblxuICAgICB9ICAgXG4gLy8g0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LLRgdC10YUg0LrQsNGB0YLQvtC80LjQstC10L3RgtC+0LIg0LrQvtGC0L7RgNGL0LUg0L7RgtC90L7RgdGP0YLRgdGPINC6INGN0YLQvtC80YMg0LrQu9Cw0YHRgdGDXG4gICAgIG5ld0V2ZW50cygpe1xuICAgICAgICAgIHRoaXMuZGVsZXRlTGlzdHMgPSBuZXcgQ3VzdG9tRXZlbnQoXCJkZWxldGVMaXN0c1wiLHtcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtjb3VudDogXCJkb25lXCJ9ICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIG1haW5FbGVtZW50cygpe1xuICAgICAgICB0aGlzLmlucHV0cyA9IHRoaXMub3B0LnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzVdLmNoaWxkTm9kZXNbMV07XG4gICAgICAgIHRoaXMuYWxsRG9uZUJ1dHRvbiA9IHRoaXMub3B0LnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbM107XG4gICAgICAgIHRoaXMuZGVsZXRlQWxsQnV0dG9uID0gdGhpcy5vcHQucGFyZW50cy5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1s1XTtcbiAgICAgICAgdGhpcy5vcHQucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMub3B0LndhdGNoKTtcblxuICAgIH07XG4vLyDRgdGC0YDQvtC40YLQtdC70YzRgdGC0LLQviDQvdC+0LLQvtCz0L4g0LDQudGC0LXQvNCwXG4gICAgYnVpbGRUYXNrKGRhdGE6IG9iamVjdCl7XG4gICAgICBsZXQgdG9kb2xpc3RpdGVtT3B0aW9uczogb2JqZWN0ID0ge1xuICAgICAgICAgIGlucHV0czogdGhpcy5pbnB1dHMsXG4gICAgICAgICAgcGFyZW50czogdGhpcy5vcHQucGFyZW50cy5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbM10sXG4gICAgICAgICAgY291bnRlcjogdGhpcy5vcHQuY291bnRlcisrLFxuICAgICAgICAgIGxvY2FsRGF0YTogZGF0YSxcbiAgICAgICAgICB3YXRjaDogdGhpcy5vcHQud2F0Y2hcbiAgICAgIH07XG4gICAgICB0aGlzLmxhenlMb2FkZXIodG9kb2xpc3RpdGVtT3B0aW9ucyk7ICAgICAgXG4gICAgfTtcblxuXG5cbiAgICBsYXp5TG9hZGVyKGRhdGE6IGFueSl7XG4gICAgICAgIGltcG9ydCgnLi90b2RvbGlzdGl0ZW0udHMnKS50aGVuKFxuICAgICAgICAobW9kdWxlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgdG9kb0xpc3RJdGVtOiBhbnkgPSBtb2R1bGUuZGVmYXVsdDtcbiAgICAgICAgICB0aGlzLnRhc2tzLnB1c2gobmV3IHRvZG9MaXN0SXRlbShkYXRhKSk7XG4gICAgIH0pO1xuICAgICAgICAgIHRoaXMub3B0LnBhcmVudHMuZGlzcGF0Y2hFdmVudCh0aGlzLm9wdC53YXRjaCk7XG4gICAgfTtcblxuXG4vLyDQvNC10YLQvtC0INC90LDQsdC70Y7QtNCw0LXRgiDQt9CwINC70Y7QsdGL0LzQuCDQuNC30LzQtdC90LXQvdC40Y/QvNC4INC30LDQs9C+0LvQvtCy0LrQsCwg0Lgg0YHQv9C40YHRi9Cy0LDQtdGCINC40YUg0LIg0LzQsNGB0YHQuNCyXG4gICAgZ2V0SGVhZGVyKCl7XG5cbiAgICAgIGxldCBoZWFkZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5vcHQucGFyZW50cy5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXTtcbiAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyLmlubmVyVGV4dDtcbiAgICAgIGhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXIuaW5uZXJUZXh0O1xuICAgICAgICAgICAgIHRoaXMub3B0LnBhcmVudHMuZGlzcGF0Y2hFdmVudCh0aGlzLm9wdC53YXRjaCk7XG4gICAgICB9KTtcbiAgICAgIFxuICAgIH1cbi8vINC80LXRgtC+0LQg0YHRgNCw0LLQvdC40LLQsNC10YIg0L3QvtC80LXRgNCwINCyIGRldGFpbHMg0Lgg0LIg0LzQsNGB0YHQuNCy0LUsINC90LAg0LLRi9GF0L7QtNC1INC/0L7Qu9GD0YfQsNC10Lwg0LzQsNGB0YHQuNCyINC40Lcg0Y3Qu9C10LzQtdC90YLQsCDQuCDQtdCz0L4g0LjQvdC00LXQutGB0LBcbiAgICAgZ2V0TnVtYmVyKHRoaXNFdmVudDogQ3VzdG9tRXZlbnQpe1xuICAgICAgICAgICAgdGhpcy50ZW1wb3JhcnlEYXRhID0gW107XG4gICAgICAgICAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2s6IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAodGFzay5vcHQuY291bnRlciA9PSB0aGlzRXZlbnQuZGV0YWlsLm51bWJlcil7XG4gICAgICAgICAgICB0aGlzLnRlbXBvcmFyeURhdGEudW5zaGlmdChpKTtcbiAgICAgICAgICAgIHRoaXMudGVtcG9yYXJ5RGF0YS51bnNoaWZ0KHRhc2spO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgY2xlYW5WYWx1ZSgpe1xuICAgICAgICB0aGlzLmlucHV0cy52YWx1ZSA9IFwiXCI7XG4gICAgfTtcblxuLy8g0YPQtNCw0LvQtdC90LjQtSDQu9C40YHRgtCwIFxuICAgIHJlbW92ZUxpc3QoKXtcbiAgICB0aGlzLmlucHV0cy5uZXh0RWxlbWVudFNpYmxpbmcuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICB0aGlzLmRlbGV0ZUxpc3RzLmRldGFpbC5udW1iZXIgPSB0aGlzLmxpc3RDb3VudGVyOyBcbiAgICB0aGlzLm9wdC5wYXJlbnRzLmRpc3BhdGNoRXZlbnQodGhpcy5kZWxldGVMaXN0cyk7XG4gICAgdGhpcy5vcHQucGFyZW50cy5yZW1vdmUoKTtcbiAgICB0aGlzLm9wdC5wYXJlbnRzLmRpc3BhdGNoRXZlbnQodGhpcy5vcHQud2F0Y2gpOyBcbiAgfSk7XG4gICBcbiAgfTtcbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90b2RvbGlzdC50cyJdLCJzb3VyY2VSb290IjoiIn0=