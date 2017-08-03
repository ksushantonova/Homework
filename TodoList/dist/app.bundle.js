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
var builditem_ts_1 = __webpack_require__(1);
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
new builditem_ts_1.default(flexed);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var todolist_ts_1 = __webpack_require__(2);
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
                console.log(list);
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
            console.log('watching');
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
        ;
    };
    ;
    return BuildItem;
}());
exports.default = BuildItem;
;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// import ToDoListItem from './todolistitem.ts';
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
        //    this.input.addEventListener("change", () => {
        //     this.buildTask(null);
        // }); 
        var _this = this;
        this.inputs.addEventListener("keyup", function (e) {
            _this.buildTask(null);
            //  if(e.keyCode == 13){
            //  this.buildTask(null);
            // };
        });
        this.parents.dispatchEvent(this.watch);
    };
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
    Todolist.prototype.buildTask = function (localData) {
        var _this = this;
        this.tasks.push(
        // new ToDoListItem(this.inputs.value, this.parents.childNodes[1].childNodes[3], this.taskCounter++, localData, this.watch)
        Promise.resolve().then(function () { return __webpack_require__(3); }).then(function (module) {
            var todoListItem = module.default;
            console.log(todoListItem);
            new todoListItem(_this.inputs.value, _this.parents.childNodes[1].childNodes[3], _this.taskCounter++, localData, _this.watch);
        }));
        this.cleanValue();
        console.log(this.parents.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[3]);
        this.parents.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[3].focus();
    };
    ;
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


/***/ }),
/* 3 */
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
        this.mainContainerStyles();
        this.startInputValue();
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
        this.newInput.value = this.inputValue;
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
        console.log(this.remove);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWUyNTg2ZWVkODk5NTUyMTY1NTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9idWlsZGl0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RvZG9saXN0LnRzIiwid2VicGFjazovLy8uL3NyYy90b2RvbGlzdGl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBLDRDQUF1QztBQUV2Qyx1RkFBdUY7QUFDdkYsdUtBQXVLO0FBRXZLLEVBQUUsQ0FBQyxDQUFDLGVBQWUsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLFNBQVMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFTLEdBQUc7UUFFMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsS0FBSztRQUVyQixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVE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dC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGVlMjU4NmVlZDg5OTU1MjE2NTU5IiwiaW1wb3J0IEJ1aWxkSXRlbSBmcm9tICcuL2J1aWxkaXRlbS50cyc7XG5cbi8vIDMp0KDQtdCw0LvQuNC30L7QstCw0YLRjCDRgdC+0YXRgNCw0L3QtdC90LjQtS/Rh9GC0LXQvdC40LUsINC40YHQv9C+0LvRjNC30YPRjyBMb2NhbFN0b3JhZ2UsINCy0YHQtdGFIFRvRG9MaXN0INC4INC40YUg0LDQudGC0LXQvNC+0LI6XG4vLyAtINC/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INGB0YLRgNCw0L3QuNGG0Ysg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INGB0L7RhdGA0LDQvdC10L3QvdGL0YUg0LTQsNC90L3Ri9GFINC4INGB0YLRgNC+0LjRgtGMINC/0L4g0L3QuNC8IFRvRG9MaXN0INGBINCw0LnRgtC10LzQsNC80LgsINC10YHQu9C4INC00LDQvdC90YvRhSDQvdC10YIsINGC0L4g0LLRi9Cy0L7QtNC40YLRjCDRgtC+0LvRjNC60L4g0L7QtNC40L0g0L/Rg9GB0YLQvtC5IFRvRG9MaXN0IChlZGl0ZWQpXG5cbmlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XG4gIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcvc3cuanMnKS50aGVuKGZ1bmN0aW9uKHJlZykge1xuXG4gICAgY29uc29sZS5sb2coJ1JlZ2lzdHJhdGlvbiBzdWNjZWVkZWQuIFNjb3BlIGlzICcgKyByZWcuc2NvcGUpO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuXG4gICAgY29uc29sZS5sb2coJ1JlZ2lzdHJhdGlvbiBmYWlsZWQgd2l0aCAnICsgZXJyb3IpO1xuICB9KTtcbn1cblxubGV0IGZsZXhlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmbGV4ZWQnKTtcbm5ldyBCdWlsZEl0ZW0oZmxleGVkKTtcblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyIsIiBpbXBvcnQgVG9kb2xpc3QgZnJvbSAnLi90b2RvbGlzdC50cyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVpbGRJdGVtIHtcblx0Y29uc3RydWN0b3IocGFyZW50KXtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHBhcmVudDtcblx0XHR0aGlzLmFsbExpc3RzID0gW107XG5cdFx0dGhpcy5jb3VudGVyID0gMDtcblx0XHR0aGlzLmluaXQoKTtcblx0fTtcblxuXG4gICAgaW5pdCgpe1xuICAgICAgLy8gbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgIHRoaXMubmV3RXZlbnQoKTtcbiAgICAgICAgdGhpcy5idWlsZFN0b3JhZ2VMaXN0cygpO1xuICAgIFx0ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGx1cycpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgXHRcdHRoaXMuYnVpbGRJdGVtSHRtbCgpO1xuICAgICAgICB0aGlzLnRvRG9MaXN0SW5pdCgpO1xuICAgICAgICB0aGlzLmN1c3RvbUV2ZW50KCk7XG4gICAgXHR9KTtcbiAgICAgICAgXG4gICAgICB9O1xuXG4vLyDQt9Cw0LHQuNGA0LDQtdC8INCy0YHQtSDRh9GC0L4g0LXRgdGC0Ywg0LjQtyDQu9C+0LrQsNC70YHRgtC+0YDQtdC50LTQttCwLCDQuCDQsiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INGH0YLQviDRgtCw0Lwg0LLQvdGD0YLRgNC4IC0g0L/QvtC60LDQt9GL0LLQsNC10Lwg0LvQvtC60LDQuywg0LjQu9C4INC/0YPRgdGC0L7QuSDQsNC50YLQtdC8LlxuXG4gICAgYnVpbGRTdG9yYWdlTGlzdHMoKXtcbiAgICAgIHRoaXMubG9jYWxWYWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhJyk7XG5cbiAgICAgIGlmICh0aGlzLmxvY2FsVmFsdWUgIT09IG51bGwgJiYgdGhpcy5sb2NhbFZhbHVlLmxlbmd0aCA+IDMpeyBcbiAgICAgICAgdGhpcy5sb2NhbEZyYW1lID0gSlNPTi5wYXJzZSh0aGlzLmxvY2FsVmFsdWUpO1xuXG4gICAgICAgIHRoaXMubG9jYWxGcmFtZS5mb3JFYWNoKGxpc3QgPT4ge1xuXG4gICAgICAgIHRoaXMuYnVpbGRJdGVtSHRtbCgpO1xuICAgICAgICB0aGlzLmJ1aWxkSW5pdChsaXN0KTtcbiAgICAgICAgdGhpcy5jdXN0b21FdmVudCgpO1xuICAgICAgICAgY29uc29sZS5sb2cobGlzdCk7XG4gICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxvY2FsVmFsdWUgIT09IG51bGwgJiYgdGhpcy5sb2NhbFZhbHVlLmxlbmd0aCA8IDMpe1xuICAgICAgICB0aGlzLmJ1aWxkSXRlbUh0bWwoKTtcbiAgICAgICAgdGhpcy5idWlsZEluaXQobnVsbCk7XG4gICAgICAgIHRoaXMuY3VzdG9tRXZlbnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgIHRoaXMuYnVpbGRJdGVtSHRtbCgpO1xuICAgICAgIHRoaXMuYnVpbGRJbml0KG51bGwpO1xuICAgICAgIHRoaXMuY3VzdG9tRXZlbnQoKTtcbiAgICB9IFxuICB9XG5cblxuLy8g0LzQtdGC0L7QtCDRgdC+0LfQtNCw0LXRgiDQutCw0YDQutCw0YHRgSDQtNC70Y8g0L3QvtCy0L7Qs9C+INC70LjRgdGC0LBcbiAgICBidWlsZEl0ZW1IdG1sKCl7XG4gICAgXHQgIHRoaXMubWFpbkZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgXHQgIHRoaXMubWFpbkZyYW1lLmNsYXNzTmFtZSA9ICdtYWluJztcbiAgICAgICAgdGhpcy5jb250YWluZXIuaW5zZXJ0QmVmb3JlKHRoaXMubWFpbkZyYW1lLCB0aGlzLmNvbnRhaW5lci5jaGlsZE5vZGVzWzFdKTsgIFxuICAgIH07XG5cbi8vINC80LXRgtC+0LQg0LvQvtCy0LjRgiDQstGB0LUg0LrQsNGB0YLQvtC80LjQstC10L3RgtGLLCDQutC+0YLQvtGA0YvQtSDQvdGD0LbQvdC+INGB0LvQvtCy0LjRgtGMINCyINGN0YLQvtC8INC60LvQsNGB0YHQtSBcbiAgICBjdXN0b21FdmVudCgpe1xuICAgICAgICAgIHRoaXMudGVtcG9yYXJ5TGlzdCA9IFtdO1xuLy8g0YHQvtCx0YvRgtC40LUg0YPQtNCw0LvQtdC90LjRjyDQu9C40YHRgtCwXG4gICAgXHQgIHRoaXMubWFpbkZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJkZWxldGVMaXN0c1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLmdldE51bWJlcihldmVudCk7XG4gICAgICAgICAgdGhpcy5hbGxMaXN0cy5zcGxpY2UodGhpcy50ZW1wb3JhcnlMaXN0WzFdLCAxKTsgICAgICAgICBcbiAgICAgIH0pOyBcbi8vINGB0L7QsdGL0YLQuNC1IHdhdGNoIC0g0LzQs9C90L7QstC10L3QvdCw0Y8g0L/QtdGA0LXQt9Cw0L/QuNGB0Ywg0LjQt9C80LXQvdC10L3QuNC5INCyINC70L7QutCw0LtcbiAgICAgICAgdGhpcy5tYWluRnJhbWUuYWRkRXZlbnRMaXN0ZW5lcihcIndhdGNoXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53cml0ZVN0b3JhZ2UoKTtcbiAgICAgICAgICAgIHRoaXMucGFyc2VTdG9yYWdlKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnd2F0Y2hpbmcnKTtcbiAgICAgICAgfSk7ICBcbiAgICB9O1xuXG4gICAgbmV3RXZlbnQoKXtcblxuICAgICAgICB0aGlzLndhdGNoID0gbmV3IEN1c3RvbUV2ZW50KFwid2F0Y2hcIix7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7Y291bnQ6IFwiZG9uZVwifVxuICAgICAgICB9KTtcbiAgICB9XG5cbi8vINC80LXRgtC+0LQsINC60L7RgtC+0YDRi9C5INGB0YDQsNCy0L3QuNCy0LDQtdGCINC40L3RhNC+0YDQvNCw0YbQuNGOINC+INC90L7QvNC10YDQtSDQu9C40YHRgtCwLCDQutC+0YLQvtGA0LDRjyDQv9GA0LjRiNC70LAg0LjQtyDQvdC40LbQvdC10LPQviDQutC70LDRgdGB0LAsINGBINC90L7QvNC10YDQvtC8INC70LjRgdGC0LBcbi8vINCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC80LDRgdGB0LjQsiDRgSDQvdCw0LnQtNC10L3QvdGL0Lwg0Y3Qu9C10LzQtdC90YLQvtC8LCDQuCDQtdCz0L4g0LjQvdC00LXQutGB0L7QvC5cbiAgICBnZXROdW1iZXIodGhpc0V2ZW50KXtcbiAgICAgICAgdGhpcy50ZW1wb3JhcnlMaXN0ID0gW107XG4gICAgICAgIHRoaXMuYWxsTGlzdHMuZm9yRWFjaCgobGlzdCwgaSkgPT4ge1xuICAgICAgICBpZiAobGlzdC5saXN0Q291bnRlciA9PSB0aGlzRXZlbnQuZGV0YWlsLm51bWJlcil7XG4gICAgICAgIHRoaXMudGVtcG9yYXJ5TGlzdC51bnNoaWZ0KGkpO1xuICAgICAgICB0aGlzLnRlbXBvcmFyeUxpc3QudW5zaGlmdChsaXN0KTtcblxuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSk7XG4gICAgICB9O1xuLy8g0YHRgtGA0L7QuNGCINC90L7QstGL0Lkg0LvQuNGB0YJcblx0ICB0b0RvTGlzdEluaXQoKXtcbiAgICAgICAgdGhpcy5idWlsZEluaXQobnVsbCk7XG4gICAgICAgIHRoaXMud3JpdGVTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMucGFyc2VTdG9yYWdlKCk7XG4gICAgIH07XG5cbi8vINC80LXRgtC+0LQg0L/QtdGA0LXQt9Cw0L/QuNGB0YvQstCw0LXRgiDQu9C+0LrQsNC70YHRgtC+0YDQtdC50LTQtlxuICAgICB3cml0ZVN0b3JhZ2UoKXtcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuYWxsTGlzdHNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmFsbExpc3RzKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJkYXRhXCIsIHRoaXMuYWxsTGlzdHNTdHJpbmcpO1xuICAgICB9O1xuLy8g0LzQtdGC0L7QtCDQt9Cw0LHQuNGA0LDQtdGCINC70L7QutCw0LvRjNC90YvQtSDQtNCw0L3QvdGL0LUg0Lgg0LTQtdC70LDQtdGCINC40YUg0L/RgNC40LPQvtC00L3Ri9C8INC00LvRjyDRgNCw0LHQvtGC0YtcbiAgICAgcGFyc2VTdG9yYWdlKCl7XG4gICAgICAgIHRoaXMubG9jYWxWYWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhJyk7XG4gICAgICAgIHRoaXMubG9jYWxGcmFtZSA9IEpTT04ucGFyc2UodGhpcy5sb2NhbFZhbHVlKTtcblxuICAgICB9O1xuXG4vLyDRgdC+0LfQtNCw0L3QuNC1INC90L7QstC+0LPQviDQutC70LDRgdGB0LAgVG9kb2xpc3QgKGxvY2FsRGF0YSDRgdGC0LDQstC40YLRjCDQtdGB0LvQuCDQtdGB0YLRjCDQu9C+0LrQsNC70YHRgtC+0YDQtdC50LTQtilcbiAgICAgYnVpbGRJbml0KGxvY2FsRGF0YSl7XG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLm1haW5GcmFtZTtcbiAgICAgIHRoaXMuYWxsTGlzdHMucHVzaChcbiAgICAgIG5ldyBUb2RvbGlzdChwYXJlbnQsIHRoaXMuY291bnRlcisrLCBsb2NhbERhdGEsIHRoaXMud2F0Y2gpO1xuXG4gICAgICApO1xuICAgfTtcblx0XG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9idWlsZGl0ZW0udHMiLCIgLy8gaW1wb3J0IFRvRG9MaXN0SXRlbSBmcm9tICcuL3RvZG9saXN0aXRlbS50cyc7XG5cbiBleHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvbGlzdCB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIGNvdW50ZXIsIGxvY2FsLCB3YXRjaCl7XG4gICAgICAgIHRoaXMud2F0Y2ggPSB3YXRjaDtcbiAgICAgICAgdGhpcy5sb2NhbCA9IGxvY2FsO1xuICAgICAgICB0aGlzLnBhcmVudHMgPSBwYXJlbnQ7IC8vIG1haW5GcmFtZVxuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgICAgIHRoaXMubGlzdENvdW50ZXIgPSBjb3VudGVyO1xuICAgICAgICB0aGlzLnRhc2tDb3VudGVyID0gMDtcbiAgICAgICAgdGhpcy5tYWtlTGlzdCgpO1xuICAgIH1cblxuICBcbi8vINGB0L7Qt9C70LDQvdC40LUg0L3QvtCy0L7Qs9C+INCw0LnRgtC10LzQsFxuICAgIG1ha2VMaXN0KCl7XG4gICAgICAgIHRoaXMubWFrZUZyYW1lKCk7XG4gICAgICAgIHRoaXMubWFpbkVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMuZ2V0SGVhZGVyKCk7XG4gICAgICAgIHRoaXMubmV3RXZlbnRzKCk7XG4gICAgICAgIHRoaXMud29ya2luZ1dpdGhMb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5pbnB1dFRleHQoKTsgIFxuICAgICAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0KCk7XG4gICAgICAgIHRoaXMuZGVsZXRlQWxsRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuZG9uZWFsbEl0ZW1zKCk7XG4gICAgICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgICB9O1xuXG4gICAgICBtYWtlRnJhbWUoKXtcbiAgICAgICAgIHRoaXMucGFyZW50cy5pbm5lckhUTUwgPSBgIFxuICAgIDxkaXYgY2xhc3M9XCJoZWFkXCI+XG4gICAgPGRpdiBjbGFzcz1cInRvZG9IZWFkZXJcIj5cbiAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIgPkJsYWJsYTwvZGl2PiBcbiAgICA8ZGl2IHN0eWxlPVwid2lkdGg6MjVweDsgaGVpZ2h0OjI1cHg7IGN1cnNvcjpwb2ludGVyOyBwYWRkaW5nOiAxNnB4IDAgMCAxM3B4O1wiPjxpbWcgc3JjPSdhbGwyLnBuZycgc3R5bGU9J2hlaWd0aDogMjNweDsgd2lkdGg6IDIzcHgnPjwvaW1nPjwvZGl2PlxuICAgIDxkaXYgIHN0eWxlPVwid2lkdGg6MjVweDtjdXJzb3I6cG9pbnRlcjsgaGVpZ2h0OjI1cHg7IHBhZGRpbmc6IDE2cHggMTVweCAwIDE2cHg7XCI+PGltZyBzcmM9J2RlbDIucG5nJyBzdHlsZT0naGVpZ3RoOiAyM3B4OyB3aWR0aDogMjNweCc+PC9pbWc+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIml0ZW1zXCI+PC9kaXY+ICBcbiAgICAgICAgPGRpdiBjbGFzcz1cInVuZGVyZGl2XCI+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCIgKyBOZXcgdGFza1wiLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcm9zc1wiPjxpbWcgc3JjPSdjcm9zcy5wbmcnIHN0eWxlPSdoZWlndGg6IDMwcHg7IHdpZHRoOiAyMnB4Jz48L2ltZz48L2Rpdj5cbiAgICAgICAgIDwvZGl2PiBcbiAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBgO1xuICAgICAgfVxuICAgIFxuLy8g0YDQsNCx0L7RgtCwINGBINC00LDQvdC90YvQvNC4INC40Lcg0LvQvtC60LDQu9GB0YLQvtGA0LXQudC00LYoINC30LDQsdC40YDQsNC10YIg0LfQsNCz0L7Qu9C+0LLQvtC6LCDQuCDQt9Cw0L/Rg9GB0LrQsNC10YIg0LzQtdGC0L7QtCDRgdGC0YDQvtC40YLQtdC70YzRgdGC0LLQsCDQt9Cw0LTQsNC90LjQuSlcbiAgICB3b3JraW5nV2l0aExvY2FsU3RvcmFnZSgpe1xuICAgICAgaWYgKHRoaXMubG9jYWwgIT09IG51bGwpe1xuICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5wYXJlbnRzLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdO1xuICAgICAgICBoZWFkZXIuaW5uZXJUZXh0ID0gKHRoaXMubG9jYWwuaGVhZGVyKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLmxvY2FsLmhlYWRlcjtcbiAgICAgICAgdGhpcy5idWlsZExvY2FsVGFzaygpO1xuICAgICAgfVxuXG4gICAgfTtcbiAgICBcblxuICAgIGRvbmVhbGxJdGVtcygpe1xuICAgICAgICAgICB0aGlzLmFsbERvbmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICAgICAgdGFzay5jaGVja2VkSXRlbSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGFzay5jaGVjay5maXJzdEVsZW1lbnRDaGlsZC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0YXNrLmNoZWNrSXRlbSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgIH0pO1xuICAgICAgICAgICB0aGlzLnBhcmVudHMuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcblxuICAgIH07XG5cbi8vINCy0YvRj9GB0L3Rj9C10YIsINGB0LrQvtC70YzQutC+INC30LDQtNCw0L3QuNC5INCx0YvQu9C+INCyINC70L7QutCw0LvRgdGC0L7RgNC10LnQtNC2LCDQuCDRgdGC0YDQvtC40YIg0YLQsNC60L7QtSDQttC1INC60L7Qu9C40YfQtdGB0YLQstC+IFxuICAgICBidWlsZExvY2FsVGFzaygpe1xuICAgICAgICB0aGlzLmxvY2FsLnRhc2tzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkVGFzayhpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICAgICAgXG4gICAgICAgIH07XG5cbiAgICBpbnB1dFRleHQoKXtcblxuICAgICAgICAvLyAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy5idWlsZFRhc2sobnVsbCk7XG4gICAgICAgIC8vIH0pOyBcblxuICAgICAgICB0aGlzLmlucHV0cy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICB0aGlzLmJ1aWxkVGFzayhudWxsKTtcbiAgICAgICAgICAgLy8gIGlmKGUua2V5Q29kZSA9PSAxMyl7XG4gICAgICAgICAgIC8vICB0aGlzLmJ1aWxkVGFzayhudWxsKTtcbiAgICAgICAgICAgLy8gfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgfVxuXG4vLyDQu9C+0LLQuNC8INC40LLQtdC90YLRiyDRg9C00LDQu9C10L3QuNGPLCDQuCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0LDQudGC0LXQvNGFXG4gICAgaW5pdEV2ZW50cygpe1xuICAgICAgICAgdGhpcy50ZW1wb3JhcnlEYXRhID0gW107XG4gICAgICAgICB0aGlzLnBhcmVudHMuYWRkRXZlbnRMaXN0ZW5lcihcImRlbGV0ZUV2ZW50XCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXROdW1iZXIoZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UodGhpcy50ZW1wb3JhcnlEYXRhWzFdLCAxKTtcbiAgICAgIH0pOyAgICAgICAgICAgICBcblxuICAgICAgICB0aGlzLnBhcmVudHMuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZUV2ZW50XCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXROdW1iZXIoZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy50ZW1wb3JhcnlEYXRhWzBdLmlucHV0VmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0pOyAgXG5cbiAgICAgICAgdGhpcy5wYXJlbnRzLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c0lucHV0XCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRzLmZvY3VzKCk7XG4gICAgICAgIH0pOyBcbiAgICAgICAgfTtcblxuLy8g0L/RgNC4INC60LvQuNC60LUg0L3QsCDQvNGD0YHQvtGA0L3Ri9C5INCx0LDQuiDRg9C00LDQu9GP0Y7RgtGB0Y8g0LLRgdC1INCw0LnRgtC10LzRi1xuICAgICBkZWxldGVBbGxFdmVudHMoKXtcbiAgICAgICAgdGhpcy5kZWxldGVBbGxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy50YXNrcyA9IFtdO1xuICAgICAgICB0aGlzLnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzNdLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgICAgIH0pXG5cbiAgICAgfSAgIFxuIC8vINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINCy0YHQtdGFINC60LDRgdGC0L7QvNC40LLQtdC90YLQvtCyINC60L7RgtC+0YDRi9C1INC+0YLQvdC+0YHRj9GC0YHRjyDQuiDRjdGC0L7QvNGDINC60LvQsNGB0YHRg1xuICAgICBuZXdFdmVudHMoKXtcblxuICAgICAgICAgIHRoaXMuZGVsZXRlTGlzdHMgPSBuZXcgQ3VzdG9tRXZlbnQoXCJkZWxldGVMaXN0c1wiLHtcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtjb3VudDogXCJkb25lXCJ9ICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIG1haW5FbGVtZW50cygpe1xuICAgICAgICB0aGlzLmlucHV0cyA9IHRoaXMucGFyZW50cy5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbNV0uY2hpbGROb2Rlc1sxXTtcbiAgICAgICAgdGhpcy5hbGxEb25lQnV0dG9uID0gdGhpcy5wYXJlbnRzLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzNdO1xuICAgICAgICB0aGlzLmRlbGV0ZUFsbEJ1dHRvbiA9IHRoaXMucGFyZW50cy5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1s1XTtcbiAgICAgICAgdGhpcy5wYXJlbnRzLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG5cbiAgICB9O1xuLy8g0YHRgtGA0L7QuNGC0LXQu9GM0YHRgtCy0L4g0L3QvtCy0L7Qs9C+INCw0LnRgtC10LzQsFxuICAgIGJ1aWxkVGFzayhsb2NhbERhdGEpe1xuICAgICAgdGhpcy50YXNrcy5wdXNoKFxuXG4gICAvLyBuZXcgVG9Eb0xpc3RJdGVtKHRoaXMuaW5wdXRzLnZhbHVlLCB0aGlzLnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzNdLCB0aGlzLnRhc2tDb3VudGVyKyssIGxvY2FsRGF0YSwgdGhpcy53YXRjaClcbiAgICAgXG4gICAgICBpbXBvcnQoJy4vdG9kb2xpc3RpdGVtLnRzJykudGhlbihcbiAgICAgICAgbW9kdWxlID0+IHtcbiAgICAgICAgbGV0IHRvZG9MaXN0SXRlbSA9IG1vZHVsZS5kZWZhdWx0O1xuICAgICAgICBjb25zb2xlLmxvZyh0b2RvTGlzdEl0ZW0pO1xuICAgICAgICBuZXcgdG9kb0xpc3RJdGVtKHRoaXMuaW5wdXRzLnZhbHVlLCB0aGlzLnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzNdLCB0aGlzLnRhc2tDb3VudGVyKyssIGxvY2FsRGF0YSwgdGhpcy53YXRjaClcbiAgICAgfSlcblxuXG4gICAgICApO1xuXG4gICAgICB0aGlzLmNsZWFuVmFsdWUoKTtcbiAgICAgIGNvbnNvbGUubG9nKCB0aGlzLnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzNdLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzNdKTtcbiAgICAgIHRoaXMucGFyZW50cy5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbM10uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbM10uZm9jdXMoKTtcbiAgICAgIH07XG4vLyDQvNC10YLQvtC0INC90LDQsdC70Y7QtNCw0LXRgiDQt9CwINC70Y7QsdGL0LzQuCDQuNC30LzQtdC90LXQvdC40Y/QvNC4INC30LDQs9C+0LvQvtCy0LrQsCwg0Lgg0YHQv9C40YHRi9Cy0LDQtdGCINC40YUg0LIg0LzQsNGB0YHQuNCyXG4gICAgZ2V0SGVhZGVyKCl7XG4gICAgICBsZXQgaGVhZGVyID0gdGhpcy5wYXJlbnRzLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdO1xuICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXIuaW5uZXJUZXh0O1xuICAgICAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlciA9IGhlYWRlci5pbm5lclRleHQ7XG4gICAgICAgICAgICAgdGhpcy5wYXJlbnRzLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICB9KTtcbiAgICAgIFxuICAgIH1cbi8vINC80LXRgtC+0LQg0YHRgNCw0LLQvdC40LLQsNC10YIg0L3QvtC80LXRgNCwINCyIGRldGFpbHMg0Lgg0LIg0LzQsNGB0YHQuNCy0LUsINC90LAg0LLRi9GF0L7QtNC1INC/0L7Qu9GD0YfQsNC10Lwg0LzQsNGB0YHQuNCyINC40Lcg0Y3Qu9C10LzQtdC90YLQsCDQuCDQtdCz0L4g0LjQvdC00LXQutGB0LBcbiAgICAgZ2V0TnVtYmVyKHRoaXNFdmVudCl7XG4gICAgICAgICAgICB0aGlzLnRlbXBvcmFyeURhdGEgPSBbXTtcbiAgICAgICAgICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaywgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhc2suY291bnRlciA9PSB0aGlzRXZlbnQuZGV0YWlsLm51bWJlcil7XG4gICAgICAgICAgICB0aGlzLnRlbXBvcmFyeURhdGEudW5zaGlmdChpKTtcbiAgICAgICAgICAgIHRoaXMudGVtcG9yYXJ5RGF0YS51bnNoaWZ0KHRhc2spO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSk7XG4gICAgICB9O1xuXG5cbiAgICBjbGVhblZhbHVlKCl7XG4gICAgICAgIHRoaXMuaW5wdXRzLnZhbHVlID0gXCJcIjtcbiAgICB9O1xuXG4vLyDRg9C00LDQu9C10L3QuNC1INC70LjRgdGC0LAgXG4gICAgcmVtb3ZlTGlzdCgpe1xuICAgIHRoaXMuaW5wdXRzLm5leHRFbGVtZW50U2libGluZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRoaXMuZGVsZXRlTGlzdHMuZGV0YWlsLm51bWJlciA9IHRoaXMubGlzdENvdW50ZXI7IFxuICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMuZGVsZXRlTGlzdHMpO1xuICAgIHRoaXMucGFyZW50cy5yZW1vdmUoKTtcbiAgICAgdGhpcy5wYXJlbnRzLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7IFxuICB9KTtcbiAgIFxuICB9O1xufTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RvZG9saXN0LnRzIiwiXG4gZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0xpc3RJdGVtIHtcbiAgICAgICAgY29uc3RydWN0b3IgKHZhbHVlLCBwYXJlbnQsIGNvdW50ZXIsIHRhc2ssIHdhdGNoKXtcbi8v0L/QvtC70YPRh9Cw0LXQvCDQstGB0LUg0LjQstC10L3RgtGLINGH0LXRgNC10Lcg0YHQstC+0LnRgdGC0LLQsCwg0LAg0YLQsNC6INC20LUg0L3Rg9C20L3Ri9C1INC90LDQvCDQtNCw0L3QvdGL0LVcbiAgICAgICAgICAgIHRoaXMud2F0Y2ggPSB3YXRjaDtcbiAgICAgICAgICAgIHRoaXMubG9jYWwgPSB0YXNrO1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnBhcmVudHMgPSBwYXJlbnQ7IC8vIGl0ZW1zXG4gICAgICAgICAgICB0aGlzLmNvdW50ZXIgPSBjb3VudGVyO1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkSXRlbSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH1cblxuLy8g0YHRgtGA0L7QuNC8INC90L7QstGL0Lkg0LDQudGC0LXQvFxuICAgIGluaXQoKXtcbiAgICAgICAgdGhpcy5uZXdFdmVudHMoKTtcbiAgICAgICAgdGhpcy53b3JraW5nV2l0aExvY2FsU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLmh0bWxCdWlsZCgpO1xuICAgICAgICB0aGlzLm1haW5FbGVtZW50cygpO1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXJTdHlsZXMoKTtcbiAgICAgICAgdGhpcy5zdGFydElucHV0VmFsdWUoKTtcbiAgICAgICAgdGhpcy5mb2N1c1RvZG9saXN0SW5wdXQoKTtcbiAgICAgICAgdGhpcy5jaGVja0l0ZW0oKTtcbiAgICAgICAgdGhpcy5uZXdJdGVtVmFsdWUoKTsgXG4gICAgICAgIHRoaXMuaXNDaGVja2VkKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlVGFzaygpO1xuICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgICAgIFxuICAgIH1cblxuLy8g0LXRgdC70Lgg0LXRgdGC0Ywg0LrQsNC60LjQtS3RgtC+INC70L7QutCw0LvRjNC90YvQtSDQtNCw0L3QvdGL0LUsINC30LDQsdC40YDQsNC10Lwg0LjQtyDQvdC40YUg0LjQvdC/0YPRgiwg0Lgg0LjQvdGE0L7RgNC80LDRhtC40Y4sINC60LDQutC40LUg0LjQtyDQsNC50YLQtdC80L7QsiDQsdGL0LvQuCDRh9C10LrQvdGD0YLRi1xuICAgIHdvcmtpbmdXaXRoTG9jYWxTdG9yYWdlKCl7XG4gICAgICAgIGlmICh0aGlzLmxvY2FsICE9PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHRoaXMubG9jYWwuaW5wdXRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZEl0ZW0gPSB0aGlzLmxvY2FsLmNoZWNrZWRJdGVtO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgfX07XG5cbiAgICBzdGFydElucHV0VmFsdWUoKXtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC52YWx1ZSA9IHRoaXMuaW5wdXRWYWx1ZTtcbiAgICB9XG5cbiAgICBtYWluRWxlbWVudHMoKXtcbiAgICAgICAgdGhpcy5jaGVjayA9IHRoaXMubWFpbkNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZE5vZGVzWzFdO1xuICAgICAgICB0aGlzLm5ld0lucHV0ID0gdGhpcy5tYWluQ29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkTm9kZXNbM107XG4gICAgICAgIHRoaXMucmVtb3ZlID0gdGhpcy5tYWluQ29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkTm9kZXNbNV07XG4gICAgfVxuXG4gICAgbWFpbkNvbnRhaW5lclN0eWxlcygpe1xuICAgICAgICB0aGlzLm5ld0lucHV0LnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLm5ld0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgIHRoaXMucmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgIHRoaXMubmV3SW5wdXQucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIG5ld0V2ZW50cygpe1xuXG4gICAgICAgIFxuICAgICAgICB0aGlzLmRlbGV0ZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiZGVsZXRlRXZlbnRcIix7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7Y291bnQ6IFwiZG9uZVwifSAgICAgIFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNoYW5nZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiY2hhbmdlRXZlbnRcIix7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7Y291bnQ6IFwiZG9uZVwifSAgICAgIFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvY3VzSW5wdXQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJmb2N1c0lucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgZGV0YWlsOiB7Y291bnQ6IFwiZG9uZVwifVxuICAgICAgICB9KTtcblxuICAgIH1cblxuLy8g0L/QvtGB0YLRgNC+0LnQutCwINC60LDRgNC60LDRgdGB0LAg0LDQudGC0LXQvNCwXG4gICBodG1sQnVpbGQoKXtcbiAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhpcy5wYXJlbnRzLmFwcGVuZENoaWxkKHRoaXMubWFpbkNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5jbGFzc05hbWUgPSBcIm1haW5Db250YWluZXJcIjtcbiAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLmlubmVySFRNTCA9IGAgXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb250YWluZXInPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY2hlY2snPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J2NoZWNrYm94JyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7IGN1cnNvcjogcG9pbnRlcic+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz0nbmV3SW5wdXQnIHZhbHVlPScke3RoaXMuaW5wdXRWYWx1ZX0nPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ncmVtb3ZlJz48aW1nIHNyYz0nY3Jvc3MucG5nJyBzdHlsZT0naGVpZ3RoOiAxOHB4OyB3aWR0aDogMjJweDsgZGlzcGxheTpibG9jayc+PC9pbWc+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5gOyBcbiAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICB9XG4gICAgXG4gICBmb2N1c1RvZG9saXN0SW5wdXQoKXtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICBpZihlLmtleUNvZGUgPT0gMTMpe1xuICAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5mb2N1c0lucHV0KTtcbiAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICB9ICAgICBcblxuLy8g0LzQtdGC0L7QtCDRg9C00LDQu9C10L3QuNGPINC40Lcg0JTQvtC80LBcbiAgICByZW1vdmVUYXNrKCl7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnJlbW92ZSk7XG4gICAgICAgIHRoaXMucmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZGVsZXRlRXZlbnQuZGV0YWlsLm51bWJlciA9IHRoaXMuY291bnRlcjsgICBcbiAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMuZGVsZXRlRXZlbnQpO1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICB9KTtcbn1cblxuLy8g0YHQu9C10LTQuNC8INC30LAg0LjQt9C80LXQvdC10L3QuNGP0LzQuCDQsiDRh9C10LrQsdC+0LrRgdCw0YUsINGA0LXQt9GD0LvRjNGC0LDRgiDQt9Cw0L/QuNGB0YvQstCw0LXQvCDQsiDQutC70LDRgdGBLlxuICAgIGlzQ2hlY2tlZCgpe1xuICAgICAgICB0aGlzLmNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgICBpZiAodGhpcy5jaGVjay5maXJzdEVsZW1lbnRDaGlsZC5jaGVja2VkKXtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZEl0ZW0gPSB0cnVlO1xuICAgICAgICAgICAgIHRoaXMuY2hlY2tJdGVtKCk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRJdGVtID0gZmFsc2U7XG4gICAgICAgICAgICAgICB0aGlzLmNoZWNrSXRlbSgpO1xuICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbi8vINC80LXRgtC+0LQg0LjQt9C80LXQvdC10L3QuNGPIGlucHV0VmFsdWUg0L/RgNC4INC10LPQviDQuNC30LzQtdC90LXQvdC40Lgg0L3QsCDRhdC+0LTRg1xuICAgIG5ld0l0ZW1WYWx1ZSgpe1xuICAgICAgICB0aGlzLm5ld0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2hhbmdlRXZlbnQuZGV0YWlsLm51bWJlciA9IHRoaXMuY291bnRlcjsgXG4gICAgICAgIHRoaXMuY2hhbmdlRXZlbnQuZGV0YWlsLnZhbHVlID0gdGhpcy5uZXdJbnB1dC52YWx1ZTtcbiAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMuY2hhbmdlRXZlbnQpO1xuICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4vLyDQtdGB0LvQuCDQsiDQutC70LDRgdGB0LUg0YHRgtCw0YLRg9GBINGH0LXQutCx0L7QutGB0LAgY2hlY2tlZCAtINC/0YDQuNC80LXQvdGP0LXQvCDRgdGC0LjQu9C4LCDQuCDQvdCw0L7QsdC+0YDQvtGCXG4gICAgY2hlY2tJdGVtKCl7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWRJdGVtKXtcbiAgICAgICAgdGhpcy5jaGVjay5jbGFzc05hbWUgPSBcImNoZWNrZWRjaGVja1wiO1xuICAgICAgICB0aGlzLm5ld0lucHV0LmNsYXNzTmFtZSA9IFwiY2hlY2tlZFwiO1xuICAgICAgICB0aGlzLnJlbW92ZS5jbGFzc05hbWUgPSBcImNoZWNrZWRyZW1vdmVcIjtcbiAgICAgICAgdGhpcy5jaGVjay5maXJzdEVsZW1lbnRDaGlsZC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hlY2suY2xhc3NOYW1lID0gXCJjaGVja1wiO1xuICAgICAgICB0aGlzLm5ld0lucHV0LmNsYXNzTmFtZSA9IFwibmV3SW5wdXRcIjtcbiAgICAgICAgdGhpcy5yZW1vdmUuY2xhc3NOYW1lID0gXCJyZW1vdmVcIjtcbiAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICAgICAgfVxuICAgIH07ICBcblxuICAgIH1cblxuXG5cbiAgIFxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90b2RvbGlzdGl0ZW0udHMiXSwic291cmNlUm9vdCI6IiJ9