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
var builditem_1 = __webpack_require__(1);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var todolist_1 = __webpack_require__(2);
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
        console.log(localData);
        var parent = this.mainFrame;
        this.allLists.push(new todolist_1.default(parent, this.counter++, localData, this.watch));
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
        console.log(this.local);
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
        this.lazyLoader(data);
    };
    Todolist.prototype.lazyLoader = function (data) {
        var _this = this;
        Promise.resolve().then(function () { return __webpack_require__(3); }).then(function (module) {
            var todoListItem = module.default;
            console.log(_this.inputs.value);
            _this.tasks.push(new todoListItem(_this.inputs, _this.parents.childNodes[1].childNodes[3], _this.taskCounter++, data, _this.watch));
        });
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
    function ToDoListItem(input, parent, counter, task, watch) {
        //получаем все ивенты через свойства, а так же нужные нам данные
        this.watch = watch;
        this.local = task;
        this.inputValue = input.value;
        this.todolistInput = input;
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
        this.newInput.value = "";
        this.newInput.value = val;
        this.todolistInput.value = "";
    };
    ToDoListItem.prototype.mainElements = function () {
        this.check = this.mainContainer.firstElementChild.childNodes[1];
        this.newInput = this.mainContainer.firstElementChild.childNodes[3];
        this.newInput.value = this.inputValue;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2NiN2MyYWZiYWI4NWM0ZDMyNzEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9idWlsZGl0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RvZG9saXN0LnRzIiwid2VicGFjazovLy8uL3NyYy90b2RvbGlzdGl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBLHlDQUFvQztBQUVwQyx1RkFBdUY7QUFDdkYsdUtBQXVLO0FBRXZLLEVBQUUsQ0FBQyxDQUFDLGVBQWUsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLFNBQVMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFTLEdBQUc7UUFFM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsS0FBSztRQUVyQixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVBLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0MsSUFBSSxtQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7Ozs7O0FDaEJ2Qix3Q0FBa0M7QUFHbkM7SUFhQyxtQkFBWSxNQUFXO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFBQSxDQUFDO0lBR0Msd0JBQUksR0FBSjtRQUFBLGlCQVVHO1FBVEQsd0JBQXdCO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtZQUMzRCxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDbkIsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUVGLENBQUM7SUFBQSxDQUFDO0lBRVIsZ0hBQWdIO0lBRTVHLHFDQUFpQixHQUFqQjtRQUFBLGlCQXNCRDtRQXBCRyxJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUM7WUFDMUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUc5QyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVk7Z0JBQ3JDLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDckIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBRU4sQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBQztZQUMvRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFDSCxDQUFDO0lBR0gseUNBQXlDO0lBQ3JDLGlDQUFhLEdBQWI7UUFDRyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBQUEsQ0FBQztJQUVOLHFFQUFxRTtJQUNqRSwrQkFBVyxHQUFYO1FBQUEsaUJBWUM7UUFYSyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUNsQyx5QkFBeUI7UUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsVUFBQyxLQUFLO1lBQ2xELEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztRQUNULDBEQUEwRDtRQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLEtBQUs7WUFDM0MsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFBQSxDQUFDO0lBRUYsNEJBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFDO1lBQzdCLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUM7U0FDOUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVMLHlHQUF5RztJQUN6RywyREFBMkQ7SUFDdkQsNkJBQVMsR0FBVCxVQUFVLFNBQXNCO1FBQWhDLGlCQVNHO1FBUkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTLEVBQUUsQ0FBUztZQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUM7Z0JBQ2pELEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixLQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU1QixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBQUEsQ0FBQztJQUNSLG9CQUFvQjtJQUNqQixnQ0FBWSxHQUFaO1FBQ0ssSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFBQSxDQUFDO0lBRVAscUNBQXFDO0lBQ2hDLGdDQUFZLEdBQVo7UUFDRyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUFBLENBQUM7SUFDUCxtRUFBbUU7SUFDOUQsZ0NBQVksR0FBWjtRQUNHLElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWpELENBQUM7SUFBQSxDQUFDO0lBRVAsOEVBQThFO0lBQ3pFLDZCQUFTLEdBQVQsVUFBVSxTQUFjO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUFBLENBQUM7SUFFTCxnQkFBQztBQUFELENBQUM7O0FBQUEsQ0FBQzs7Ozs7Ozs7O0FDbklELGdEQUFnRDs7QUFFaEQ7SUFnQkcsa0JBQVksTUFBVyxFQUFFLE9BQWUsRUFBRSxLQUFVLEVBQUUsS0FBa0I7UUFHcEUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxZQUFZO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBR0wseUJBQXlCO0lBQ3JCLDJCQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFekMsQ0FBQztJQUFBLENBQUM7SUFFRiw0QkFBUyxHQUFUO1FBQ0csSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsa3ZCQWFiLENBQUM7SUFDaEIsQ0FBQztJQUVQLGtHQUFrRztJQUM5RiwwQ0FBdUIsR0FBdkI7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxFQUFDO1lBQ3ZCLElBQUksTUFBTSxHQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekUsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNoQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsQ0FBQztJQUNILENBQUM7SUFBQSxDQUFDO0lBR0YsK0JBQVksR0FBWjtRQUFBLGlCQVVDO1FBVE0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDeEMsS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTO2dCQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUM1QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFOUMsQ0FBQztJQUFBLENBQUM7SUFFTixnRkFBZ0Y7SUFDM0UsaUNBQWMsR0FBZDtRQUFBLGlCQU1JO1FBTEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBUztZQUMvQixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXZDLENBQUM7SUFBQSxDQUFDO0lBRU4sNEJBQVMsR0FBVDtRQUFBLGlCQU9DO1FBTEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFM0MsQ0FBQztJQUFBLENBQUM7SUFFTiw4Q0FBOEM7SUFDMUMsNkJBQVUsR0FBVjtRQUFBLGlCQWVLO1FBZEEsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsVUFBQyxLQUFrQjtZQUM3RCxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxVQUFDLEtBQWtCO1lBQzVELEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRTtZQUN4QyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsQ0FBQztJQUFBLENBQUM7SUFFVixpREFBaUQ7SUFDNUMsa0NBQWUsR0FBZjtRQUFBLGlCQVFDO1FBUEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDL0MsS0FBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDaEIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDeEQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZDLENBQUMsQ0FBQztJQUVMLENBQUM7SUFDTCxvRUFBb0U7SUFDaEUsNEJBQVMsR0FBVDtRQUVLLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFDO1lBQzNDLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUM7U0FDOUIsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUFBLENBQUM7SUFFRiwrQkFBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNDLENBQUM7SUFBQSxDQUFDO0lBQ04sOEJBQThCO0lBQzFCLDRCQUFTLEdBQVQsVUFBVSxJQUFZO1FBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELDZCQUFVLEdBQVYsVUFBVyxJQUFZO1FBQXZCLGlCQU9DO1FBTkcsZ0VBQU8sQ0FBbUIsTUFBRSxJQUFJLENBQ2hDLFVBQUMsTUFBVztZQUNaLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksWUFBWSxDQUFDLEtBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDcEksQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQUEsQ0FBQztJQUdOLDJFQUEyRTtJQUN2RSw0QkFBUyxHQUFUO1FBQUEsaUJBU0M7UUFQQyxJQUFJLE1BQU0sR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUMvQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1lBQzNCLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUM5QixLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDO0lBQ0wscUdBQXFHO0lBQ2hHLDRCQUFTLEdBQVQsVUFBVSxTQUFTO1FBQW5CLGlCQVFFO1FBUEssSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTLEVBQUUsQ0FBUztZQUN4QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUM7Z0JBQzdDLEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixLQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBQUEsQ0FBQztJQUdKLDZCQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUFBLENBQUM7SUFFTixrQkFBa0I7SUFDZCw2QkFBVSxHQUFWO1FBQUEsaUJBUUQ7UUFQQyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtZQUN6RCxLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQztZQUNsRCxLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0MsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0QixLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFFSCxDQUFDO0lBQUEsQ0FBQztJQUNKLGVBQUM7QUFBRCxDQUFDOztBQUFBLENBQUM7Ozs7Ozs7Ozs7QUN2TUQ7SUFpQk8sc0JBQWEsS0FBVSxFQUFFLE1BQVcsRUFBRSxPQUFlLEVBQUUsSUFBUyxFQUFFLEtBQWtCO1FBQzVGLGdFQUFnRTtRQUNwRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxRQUFRO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRVQscUJBQXFCO0lBQ2pCLDJCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWpFLENBQUM7SUFFTCwwR0FBMEc7SUFDdEcsOENBQXVCLEdBQXZCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsRUFBQztZQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckUsQ0FBQztJQUFBLENBQUM7SUFBQSxDQUFDO0lBRUgsc0NBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsbUNBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELDBDQUFtQixHQUFuQjtRQUFBLGlCQW1CQztRQWxCRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUU7WUFDbEQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUV6QyxDQUFDLENBQUMsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1lBQ3JDLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFekMsQ0FBQyxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFDLENBQUM7WUFDeEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFDLENBQUM7WUFDckQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUV2QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFJRCxnQ0FBUyxHQUFUO1FBR0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUM7WUFDekMsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQztTQUM5QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLGFBQWEsRUFBQztZQUN6QyxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDO1NBQzlCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxXQUFXLENBQUMsWUFBWSxFQUFFO1lBQ3ZDLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUM7U0FDL0IsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVMLDRCQUE0QjtJQUN6QixnQ0FBUyxHQUFUO1FBQ0ssSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7UUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsc1JBS2tCLElBQUksQ0FBQyxVQUFVLGlLQUUvQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTix5Q0FBa0IsR0FBbEI7UUFBQSxpQkFPQztRQU5JLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBTTtZQUMxQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBQztnQkFDcEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztnQkFDbkMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEUsQ0FBQztZQUFBLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFSix5QkFBeUI7SUFDckIsaUNBQVUsR0FBVjtRQUFBLGlCQU9IO1FBTk8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDdEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUM7WUFDOUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbkUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM1QixLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtRUFBbUU7SUFDL0QsZ0NBQVMsR0FBVDtRQUFBLGlCQVlDO1FBWEcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7WUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsRUFBQztnQkFDM0MsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbEIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hFLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTCx1REFBdUQ7SUFDbkQsbUNBQVksR0FBWjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDeEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUM7WUFDOUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ3BELEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ25FLEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FBQztJQUNOLENBQUM7SUFFTCxzRUFBc0U7SUFDbEUsZ0NBQVMsR0FBVDtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQztZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztZQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztZQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekQsQ0FBQztJQUNULENBQUM7SUFBQSxDQUFDO0lBRUYsbUJBQUM7QUFBRCxDQUFDIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjY2I3YzJhZmJhYjg1YzRkMzI3MSIsImltcG9ydCBCdWlsZEl0ZW0gZnJvbSAnLi9idWlsZGl0ZW0nO1xuXG4vLyAzKdCg0LXQsNC70LjQt9C+0LLQsNGC0Ywg0YHQvtGF0YDQsNC90LXQvdC40LUv0YfRgtC10L3QuNC1LCDQuNGB0L/QvtC70YzQt9GD0Y8gTG9jYWxTdG9yYWdlLCDQstGB0LXRhSBUb0RvTGlzdCDQuCDQuNGFINCw0LnRgtC10LzQvtCyOlxuLy8gLSDQv9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDRgdGC0YDQsNC90LjRhtGLINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDRgdC+0YXRgNCw0L3QtdC90L3Ri9GFINC00LDQvdC90YvRhSDQuCDRgdGC0YDQvtC40YLRjCDQv9C+INC90LjQvCBUb0RvTGlzdCDRgSDQsNC50YLQtdC80LDQvNC4LCDQtdGB0LvQuCDQtNCw0L3QvdGL0YUg0L3QtdGCLCDRgtC+INCy0YvQstC+0LTQuNGC0Ywg0YLQvtC70YzQutC+INC+0LTQuNC9INC/0YPRgdGC0L7QuSBUb0RvTGlzdCAoZWRpdGVkKVxuXG5pZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJy9zdy5qcycpLnRoZW4oZnVuY3Rpb24ocmVnKSB7XG4gXG4gICAgY29uc29sZS5sb2coJ1JlZ2lzdHJhdGlvbiBzdWNjZWVkZWQuIFNjb3BlIGlzICcgKyByZWcuc2NvcGUpO1xuICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiBcbiAgICAgY29uc29sZS5sb2coJ1JlZ2lzdHJhdGlvbiBmYWlsZWQgd2l0aCAnICsgZXJyb3IpO1xuICAgfSk7XG4gfVxuIFxuICBsZXQgZmxleGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsZXhlZCcpO1xuICBuZXcgQnVpbGRJdGVtKGZsZXhlZCk7IFxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyIsIiBpbXBvcnQgVG9kb2xpc3QgZnJvbSAnLi90b2RvbGlzdCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVpbGRJdGVtIHtcblxuICAgY29udGFpbmVyOiBFbGVtZW50O1xuICAgYWxsTGlzdHM6IGFueTtcbiAgIGNvdW50ZXI6IG51bWJlcjtcbiAgIGxvY2FsVmFsdWU6IGFueTtcbiAgIGxvY2FsRnJhbWU6IGFueTtcbiAgIG1haW5GcmFtZTogRWxlbWVudDtcbiAgIHRlbXBvcmFyeUxpc3Q6IGFueTtcbiAgIHdhdGNoOiBDdXN0b21FdmVudDtcbiAgIGFsbExpc3RzU3RyaW5nOiBzdHJpbmc7XG5cblxuXHRjb25zdHJ1Y3RvcihwYXJlbnQ6IGFueSl7XG4gICAgdGhpcy5jb250YWluZXIgPSBwYXJlbnQ7XG5cdFx0dGhpcy5hbGxMaXN0cyA9IFtdO1xuXHRcdHRoaXMuY291bnRlciA9IDA7XG5cdFx0dGhpcy5pbml0KCk7XG5cdH07XG5cblxuICAgIGluaXQoKXtcbiAgICAgIC8vIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICB0aGlzLm5ld0V2ZW50KCk7XG4gICAgICAgIHRoaXMuYnVpbGRTdG9yYWdlTGlzdHMoKTtcbiAgICBcdCAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsdXMnKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIFx0XHR0aGlzLmJ1aWxkSXRlbUh0bWwoKTtcbiAgICAgICAgdGhpcy50b0RvTGlzdEluaXQoKTtcbiAgICAgICAgdGhpcy5jdXN0b21FdmVudCgpO1xuICAgIFx0fSk7XG4gICAgICAgIFxuICAgICAgfTtcblxuLy8g0LfQsNCx0LjRgNCw0LXQvCDQstGB0LUg0YfRgtC+INC10YHRgtGMINC40Lcg0LvQvtC60LDQu9GB0YLQvtGA0LXQudC00LbQsCwg0Lgg0LIg0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDRh9GC0L4g0YLQsNC8INCy0L3Rg9GC0YDQuCAtINC/0L7QutCw0LfRi9Cy0LDQtdC8INC70L7QutCw0LssINC40LvQuCDQv9GD0YHRgtC+0Lkg0LDQudGC0LXQvC5cblxuICAgIGJ1aWxkU3RvcmFnZUxpc3RzKCl7XG4gICAgIFxuICAgICAgdGhpcy5sb2NhbFZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGEnKTtcbiAgICAgIGlmICh0aGlzLmxvY2FsVmFsdWUgIT09IG51bGwgJiYgdGhpcy5sb2NhbFZhbHVlLmxlbmd0aCA+IDMpeyBcbiAgICAgICAgdGhpcy5sb2NhbEZyYW1lID0gSlNPTi5wYXJzZSh0aGlzLmxvY2FsVmFsdWUpO1xuICAgICAgIFxuXG4gICAgICAgIHRoaXMubG9jYWxGcmFtZS5mb3JFYWNoKChsaXN0OiBvYmplY3QpID0+IHtcbiAgICAgICAgdGhpcy5idWlsZEl0ZW1IdG1sKCk7XG4gICAgICAgIHRoaXMuYnVpbGRJbml0KGxpc3QpO1xuICAgICAgICB0aGlzLmN1c3RvbUV2ZW50KCk7XG4gICAgICAgfSk7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMubG9jYWxWYWx1ZSAhPT0gbnVsbCAmJiB0aGlzLmxvY2FsVmFsdWUubGVuZ3RoIDwgMyl7XG4gICAgICAgIHRoaXMuYnVpbGRJdGVtSHRtbCgpO1xuICAgICAgICB0aGlzLmJ1aWxkSW5pdChudWxsKTtcbiAgICAgICAgdGhpcy5jdXN0b21FdmVudCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgdGhpcy5idWlsZEl0ZW1IdG1sKCk7XG4gICAgICAgdGhpcy5idWlsZEluaXQobnVsbCk7XG4gICAgICAgdGhpcy5jdXN0b21FdmVudCgpO1xuICAgIH0gXG4gIH1cblxuXG4vLyDQvNC10YLQvtC0INGB0L7Qt9C00LDQtdGCINC60LDRgNC60LDRgdGBINC00LvRjyDQvdC+0LLQvtCz0L4g0LvQuNGB0YLQsFxuICAgIGJ1aWxkSXRlbUh0bWwoKXtcbiAgICBcdCAgdGhpcy5tYWluRnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBcdCAgdGhpcy5tYWluRnJhbWUuY2xhc3NOYW1lID0gJ21haW4nO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5pbnNlcnRCZWZvcmUodGhpcy5tYWluRnJhbWUsIHRoaXMuY29udGFpbmVyLmNoaWxkTm9kZXNbMV0pOyAgXG4gICAgfTtcblxuLy8g0LzQtdGC0L7QtCDQu9C+0LLQuNGCINCy0YHQtSDQutCw0YHRgtC+0LzQuNCy0LXQvdGC0YssINC60L7RgtC+0YDRi9C1INC90YPQttC90L4g0YHQu9C+0LLQuNGC0Ywg0LIg0Y3RgtC+0Lwg0LrQu9Cw0YHRgdC1IFxuICAgIGN1c3RvbUV2ZW50KCl7XG4gICAgICAgICAgdGhpcy50ZW1wb3JhcnlMaXN0ID0gW107XG4vLyDRgdC+0LHRi9GC0LjQtSDRg9C00LDQu9C10L3QuNGPINC70LjRgdGC0LBcbiAgICBcdCAgdGhpcy5tYWluRnJhbWUuYWRkRXZlbnRMaXN0ZW5lcihcImRlbGV0ZUxpc3RzXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0TnVtYmVyKGV2ZW50KTtcbiAgICAgICAgICB0aGlzLmFsbExpc3RzLnNwbGljZSh0aGlzLnRlbXBvcmFyeUxpc3RbMV0sIDEpOyAgICAgICAgIFxuICAgICAgfSk7IFxuLy8g0YHQvtCx0YvRgtC40LUgd2F0Y2ggLSDQvNCz0L3QvtCy0LXQvdC90LDRjyDQv9C10YDQtdC30LDQv9C40YHRjCDQuNC30LzQtdC90LXQvdC40Lkg0LIg0LvQvtC60LDQu1xuICAgICAgICB0aGlzLm1haW5GcmFtZS5hZGRFdmVudExpc3RlbmVyKFwid2F0Y2hcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLndyaXRlU3RvcmFnZSgpO1xuICAgICAgICAgICAgdGhpcy5wYXJzZVN0b3JhZ2UoKTtcbiAgICAgICAgfSk7ICBcbiAgICB9O1xuXG4gICAgbmV3RXZlbnQoKXtcblxuICAgICAgICB0aGlzLndhdGNoID0gbmV3IEN1c3RvbUV2ZW50KFwid2F0Y2hcIix7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7Y291bnQ6IFwiZG9uZVwifVxuICAgICAgICB9KTtcbiAgICB9XG5cbi8vINC80LXRgtC+0LQsINC60L7RgtC+0YDRi9C5INGB0YDQsNCy0L3QuNCy0LDQtdGCINC40L3RhNC+0YDQvNCw0YbQuNGOINC+INC90L7QvNC10YDQtSDQu9C40YHRgtCwLCDQutC+0YLQvtGA0LDRjyDQv9GA0LjRiNC70LAg0LjQtyDQvdC40LbQvdC10LPQviDQutC70LDRgdGB0LAsINGBINC90L7QvNC10YDQvtC8INC70LjRgdGC0LBcbi8vINCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC80LDRgdGB0LjQsiDRgSDQvdCw0LnQtNC10L3QvdGL0Lwg0Y3Qu9C10LzQtdC90YLQvtC8LCDQuCDQtdCz0L4g0LjQvdC00LXQutGB0L7QvC5cbiAgICBnZXROdW1iZXIodGhpc0V2ZW50OiBDdXN0b21FdmVudCl7XG4gICAgICAgIHRoaXMudGVtcG9yYXJ5TGlzdCA9IFtdO1xuICAgICAgICB0aGlzLmFsbExpc3RzLmZvckVhY2goKGxpc3Q6IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmIChsaXN0Lmxpc3RDb3VudGVyID09IHRoaXNFdmVudC5kZXRhaWwubnVtYmVyKXtcbiAgICAgICAgdGhpcy50ZW1wb3JhcnlMaXN0LnVuc2hpZnQoaSk7XG4gICAgICAgIHRoaXMudGVtcG9yYXJ5TGlzdC51bnNoaWZ0KGxpc3QpO1xuXG4gICAgICAgICAgICAgfVxuICAgICAgICAgICB9KTtcbiAgICAgIH07XG4vLyDRgdGC0YDQvtC40YIg0L3QvtCy0YvQuSDQu9C40YHRglxuXHQgIHRvRG9MaXN0SW5pdCgpe1xuICAgICAgICB0aGlzLmJ1aWxkSW5pdChudWxsKTtcbiAgICAgICAgdGhpcy53cml0ZVN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5wYXJzZVN0b3JhZ2UoKTtcbiAgICAgfTtcblxuLy8g0LzQtdGC0L7QtCDQv9C10YDQtdC30LDQv9C40YHRi9Cy0LDQtdGCINC70L7QutCw0LvRgdGC0L7RgNC10LnQtNC2XG4gICAgIHdyaXRlU3RvcmFnZSgpe1xuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5hbGxMaXN0c1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KHRoaXMuYWxsTGlzdHMpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImRhdGFcIiwgdGhpcy5hbGxMaXN0c1N0cmluZyk7XG4gICAgIH07XG4vLyDQvNC10YLQvtC0INC30LDQsdC40YDQsNC10YIg0LvQvtC60LDQu9GM0L3Ri9C1INC00LDQvdC90YvQtSDQuCDQtNC10LvQsNC10YIg0LjRhSDQv9GA0LjQs9C+0LTQvdGL0Lwg0LTQu9GPINGA0LDQsdC+0YLRi1xuICAgICBwYXJzZVN0b3JhZ2UoKXtcbiAgICAgICAgdGhpcy5sb2NhbFZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGEnKTtcbiAgICAgICAgdGhpcy5sb2NhbEZyYW1lID0gSlNPTi5wYXJzZSh0aGlzLmxvY2FsVmFsdWUpO1xuXG4gICAgIH07XG5cbi8vINGB0L7Qt9C00LDQvdC40LUg0L3QvtCy0L7Qs9C+INC60LvQsNGB0YHQsCBUb2RvbGlzdCAobG9jYWxEYXRhINGB0YLQsNCy0LjRgtGMINC10YHQu9C4INC10YHRgtGMINC70L7QutCw0LvRgdGC0L7RgNC10LnQtNC2KVxuICAgICBidWlsZEluaXQobG9jYWxEYXRhOiBhbnkpe1xuICAgICAgICBjb25zb2xlLmxvZyhsb2NhbERhdGEpO1xuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5tYWluRnJhbWU7XG4gICAgICB0aGlzLmFsbExpc3RzLnB1c2gobmV3IFRvZG9saXN0KHBhcmVudCwgdGhpcy5jb3VudGVyKyssIGxvY2FsRGF0YSwgdGhpcy53YXRjaCkpO1xuICAgfTtcblx0XG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9idWlsZGl0ZW0udHMiLCIgLy8gaW1wb3J0IFRvRG9MaXN0SXRlbSBmcm9tICcuL3RvZG9saXN0aXRlbS50cyc7XG5cbiBleHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvbGlzdCB7XG5cbiAgICAgICAgd2F0Y2g6IEN1c3RvbUV2ZW50O1xuICAgICAgICBsb2NhbDogYW55O1xuICAgICAgICBwYXJlbnRzOiBhbnk7XG4gICAgICAgIHRhc2tzOiBhbnk7XG4gICAgICAgIGxpc3RDb3VudGVyOiBudW1iZXI7XG4gICAgICAgIHRhc2tDb3VudGVyOiBudW1iZXI7XG4gICAgICAgIGhlYWRlcjogSFRNTEVsZW1lbnQ7XG4gICAgICAgIGFsbERvbmVCdXR0b246IE5vZGU7XG4gICAgICAgIGRlbGV0ZUFsbEJ1dHRvbjogTm9kZTtcbiAgICAgICAgZGVsZXRlTGlzdHM6IEV2ZW50O1xuICAgICAgICBpbnB1dHM6IGFueTtcbiAgICAgICAgdGVtcG9yYXJ5RGF0YTogYW55O1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQ6IGFueSwgY291bnRlcjogbnVtYmVyLCBsb2NhbDogYW55LCB3YXRjaDogQ3VzdG9tRXZlbnQpe1xuICAgICAgIFxuXG4gICAgICAgIHRoaXMud2F0Y2ggPSB3YXRjaDtcbiAgICAgICAgdGhpcy5sb2NhbCA9IGxvY2FsO1xuICAgICAgICB0aGlzLnBhcmVudHMgPSBwYXJlbnQ7IC8vIG1haW5GcmFtZVxuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgICAgIHRoaXMubGlzdENvdW50ZXIgPSBjb3VudGVyO1xuICAgICAgICB0aGlzLnRhc2tDb3VudGVyID0gMDtcbiAgICAgICAgdGhpcy5tYWtlTGlzdCgpO1xuICAgIH1cblxuICBcbi8vINGB0L7Qt9C70LDQvdC40LUg0L3QvtCy0L7Qs9C+INCw0LnRgtC10LzQsFxuICAgIG1ha2VMaXN0KCl7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubG9jYWwpO1xuICAgICAgICB0aGlzLm1ha2VGcmFtZSgpO1xuICAgICAgICB0aGlzLm1haW5FbGVtZW50cygpO1xuICAgICAgICB0aGlzLmdldEhlYWRlcigpO1xuICAgICAgICB0aGlzLndvcmtpbmdXaXRoTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMubmV3RXZlbnRzKCk7XG4gICAgICAgIHRoaXMuaW5wdXRUZXh0KCk7ICBcbiAgICAgICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdCgpO1xuICAgICAgICB0aGlzLmRlbGV0ZUFsbEV2ZW50cygpO1xuICAgICAgICB0aGlzLmRvbmVhbGxJdGVtcygpO1xuICAgICAgICB0aGlzLnBhcmVudHMuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcblxuICAgICAgfTtcblxuICAgICAgbWFrZUZyYW1lKCl7XG4gICAgICAgICB0aGlzLnBhcmVudHMuaW5uZXJIVE1MID0gYCBcbiAgICA8ZGl2IGNsYXNzPVwiaGVhZFwiPlxuICAgIDxkaXYgY2xhc3M9XCJ0b2RvSGVhZGVyXCI+XG4gICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCIgY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiID5CbGFibGE8L2Rpdj4gXG4gICAgPGRpdiBzdHlsZT1cIndpZHRoOjI1cHg7IGhlaWdodDoyNXB4OyBjdXJzb3I6cG9pbnRlcjsgcGFkZGluZzogMTZweCAwIDAgMTNweDtcIj48aW1nIHNyYz0nYWxsMi5wbmcnIHN0eWxlPSdoZWlndGg6IDIzcHg7IHdpZHRoOiAyM3B4Jz48L2ltZz48L2Rpdj5cbiAgICA8ZGl2ICBzdHlsZT1cIndpZHRoOjI1cHg7Y3Vyc29yOnBvaW50ZXI7IGhlaWdodDoyNXB4OyBwYWRkaW5nOiAxNnB4IDE1cHggMCAxNnB4O1wiPjxpbWcgc3JjPSdkZWwyLnBuZycgc3R5bGU9J2hlaWd0aDogMjNweDsgd2lkdGg6IDIzcHgnPjwvaW1nPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJpdGVtc1wiPjwvZGl2PiAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1bmRlcmRpdlwiPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiICsgTmV3IHRhc2tcIi8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3Jvc3NcIj48aW1nIHNyYz0nY3Jvc3MucG5nJyBzdHlsZT0naGVpZ3RoOiAzMHB4OyB3aWR0aDogMjJweCc+PC9pbWc+PC9kaXY+XG4gICAgICAgICA8L2Rpdj4gXG4gICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgYDtcbiAgICAgIH1cbiAgICBcbi8vINGA0LDQsdC+0YLQsCDRgSDQtNCw0L3QvdGL0LzQuCDQuNC3INC70L7QutCw0LvRgdGC0L7RgNC10LnQtNC2KCDQt9Cw0LHQuNGA0LDQtdGCINC30LDQs9C+0LvQvtCy0L7Quiwg0Lgg0LfQsNC/0YPRgdC60LDQtdGCINC80LXRgtC+0LQg0YHRgtGA0L7QuNGC0LXQu9GM0YHRgtCy0LAg0LfQsNC00LDQvdC40LkpXG4gICAgd29ya2luZ1dpdGhMb2NhbFN0b3JhZ2UoKXtcbiAgICAgIGlmICh0aGlzLmxvY2FsICE9PSBudWxsKXtcbiAgICAgICAgbGV0IGhlYWRlcjogYW55ID0gdGhpcy5wYXJlbnRzLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdO1xuICAgICAgICBoZWFkZXIuaW5uZXJUZXh0ID0gKHRoaXMubG9jYWwuaGVhZGVyKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLmxvY2FsLmhlYWRlcjtcbiAgICAgICAgdGhpcy5idWlsZExvY2FsVGFzaygpO1xuICAgICAgfVxuICAgIH07XG4gICAgXG5cbiAgICBkb25lYWxsSXRlbXMoKXtcbiAgICAgICAgICAgdGhpcy5hbGxEb25lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrcy5mb3JFYWNoKCh0YXNrOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0YXNrLmNoZWNrZWRJdGVtID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0YXNrLmNoZWNrLmZpcnN0RWxlbWVudENoaWxkLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRhc2suY2hlY2tJdGVtKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgfSk7XG4gICAgICAgICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgfTtcblxuLy8g0LLRi9GP0YHQvdGP0LXRgiwg0YHQutC+0LvRjNC60L4g0LfQsNC00LDQvdC40Lkg0LHRi9C70L4g0LIg0LvQvtC60LDQu9GB0YLQvtGA0LXQudC00LYsINC4INGB0YLRgNC+0LjRgiDRgtCw0LrQvtC1INC20LUg0LrQvtC70LjRh9C10YHRgtCy0L4gXG4gICAgIGJ1aWxkTG9jYWxUYXNrKCl7XG4gICAgICAgIHRoaXMubG9jYWwudGFza3MuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkVGFzayhpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICAgICAgXG4gICAgICAgIH07XG5cbiAgICBpbnB1dFRleHQoKXtcblxuICAgICAgICB0aGlzLmlucHV0cy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICB0aGlzLmJ1aWxkVGFzayhudWxsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgfTtcblxuLy8g0LvQvtCy0LjQvCDQuNCy0LXQvdGC0Ysg0YPQtNCw0LvQtdC90LjRjywg0Lgg0LjQt9C80LXQvdC10L3QuNGPINCyINCw0LnRgtC10LzRhVxuICAgIGluaXRFdmVudHMoKXtcbiAgICAgICAgIHRoaXMudGVtcG9yYXJ5RGF0YSA9IFtdO1xuICAgICAgICAgdGhpcy5wYXJlbnRzLmFkZEV2ZW50TGlzdGVuZXIoXCJkZWxldGVFdmVudFwiLCAoZXZlbnQ6IEN1c3RvbUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdldE51bWJlcihldmVudCk7XG4gICAgICAgICAgICB0aGlzLnRhc2tzLnNwbGljZSh0aGlzLnRlbXBvcmFyeURhdGFbMV0sIDEpO1xuICAgICAgfSk7ICAgICAgICAgICAgIFxuXG4gICAgICAgIHRoaXMucGFyZW50cy5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlRXZlbnRcIiwgKGV2ZW50OiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXROdW1iZXIoZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy50ZW1wb3JhcnlEYXRhWzBdLmlucHV0VmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0pOyAgXG5cbiAgICAgICAgdGhpcy5wYXJlbnRzLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c0lucHV0XCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRzLmZvY3VzKCk7XG4gICAgICAgIH0pOyBcbiAgICAgICAgfTtcblxuLy8g0L/RgNC4INC60LvQuNC60LUg0L3QsCDQvNGD0YHQvtGA0L3Ri9C5INCx0LDQuiDRg9C00LDQu9GP0Y7RgtGB0Y8g0LLRgdC1INCw0LnRgtC10LzRi1xuICAgICBkZWxldGVBbGxFdmVudHMoKXtcbiAgICAgICAgdGhpcy5kZWxldGVBbGxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy50YXNrcyA9IFtdO1xuICAgICAgICB0aGlzLnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzNdLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgICAgIH0pXG5cbiAgICAgfSAgIFxuIC8vINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINCy0YHQtdGFINC60LDRgdGC0L7QvNC40LLQtdC90YLQvtCyINC60L7RgtC+0YDRi9C1INC+0YLQvdC+0YHRj9GC0YHRjyDQuiDRjdGC0L7QvNGDINC60LvQsNGB0YHRg1xuICAgICBuZXdFdmVudHMoKXtcblxuICAgICAgICAgIHRoaXMuZGVsZXRlTGlzdHMgPSBuZXcgQ3VzdG9tRXZlbnQoXCJkZWxldGVMaXN0c1wiLHtcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtjb3VudDogXCJkb25lXCJ9ICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIG1haW5FbGVtZW50cygpe1xuICAgICAgICB0aGlzLmlucHV0cyA9IHRoaXMucGFyZW50cy5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbNV0uY2hpbGROb2Rlc1sxXTtcbiAgICAgICAgdGhpcy5hbGxEb25lQnV0dG9uID0gdGhpcy5wYXJlbnRzLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzNdO1xuICAgICAgICB0aGlzLmRlbGV0ZUFsbEJ1dHRvbiA9IHRoaXMucGFyZW50cy5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1s1XTtcbiAgICAgICAgdGhpcy5wYXJlbnRzLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG5cbiAgICB9O1xuLy8g0YHRgtGA0L7QuNGC0LXQu9GM0YHRgtCy0L4g0L3QvtCy0L7Qs9C+INCw0LnRgtC10LzQsFxuICAgIGJ1aWxkVGFzayhkYXRhOiBvYmplY3Qpe1xuICAgICAgdGhpcy5sYXp5TG9hZGVyKGRhdGEpOyAgICAgIFxuICAgIH1cblxuICAgIGxhenlMb2FkZXIoZGF0YTogb2JqZWN0KXtcbiAgICAgICAgaW1wb3J0KCcuL3RvZG9saXN0aXRlbS50cycpLnRoZW4oXG4gICAgICAgIChtb2R1bGU6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCB0b2RvTGlzdEl0ZW0gPSBtb2R1bGUuZGVmYXVsdDtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pbnB1dHMudmFsdWUpO1xuICAgICAgICAgIHRoaXMudGFza3MucHVzaChuZXcgdG9kb0xpc3RJdGVtKHRoaXMuaW5wdXRzLCB0aGlzLnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzNdLCB0aGlzLnRhc2tDb3VudGVyKyssIGRhdGEsIHRoaXMud2F0Y2gpKTtcbiAgICAgfSk7XG4gICAgfTtcblxuXG4vLyDQvNC10YLQvtC0INC90LDQsdC70Y7QtNCw0LXRgiDQt9CwINC70Y7QsdGL0LzQuCDQuNC30LzQtdC90LXQvdC40Y/QvNC4INC30LDQs9C+0LvQvtCy0LrQsCwg0Lgg0YHQv9C40YHRi9Cy0LDQtdGCINC40YUg0LIg0LzQsNGB0YHQuNCyXG4gICAgZ2V0SGVhZGVyKCl7XG5cbiAgICAgIGxldCBoZWFkZXI6IGFueSA9IHRoaXMucGFyZW50cy5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXTtcbiAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyLmlubmVyVGV4dDtcbiAgICAgIGhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXIuaW5uZXJUZXh0O1xuICAgICAgICAgICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgfSk7XG4gICAgICBcbiAgICB9XG4vLyDQvNC10YLQvtC0INGB0YDQsNCy0L3QuNCy0LDQtdGCINC90L7QvNC10YDQsCDQsiBkZXRhaWxzINC4INCyINC80LDRgdGB0LjQstC1LCDQvdCwINCy0YvRhdC+0LTQtSDQv9C+0LvRg9GH0LDQtdC8INC80LDRgdGB0LjQsiDQuNC3INGN0LvQtdC80LXQvdGC0LAg0Lgg0LXQs9C+INC40L3QtNC10LrRgdCwXG4gICAgIGdldE51bWJlcih0aGlzRXZlbnQpe1xuICAgICAgICAgICAgdGhpcy50ZW1wb3JhcnlEYXRhID0gW107XG4gICAgICAgICAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2s6IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAodGFzay5jb3VudGVyID09IHRoaXNFdmVudC5kZXRhaWwubnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMudGVtcG9yYXJ5RGF0YS51bnNoaWZ0KGkpO1xuICAgICAgICAgICAgdGhpcy50ZW1wb3JhcnlEYXRhLnVuc2hpZnQodGFzayk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICB9KTtcbiAgICAgIH07XG5cblxuICAgIGNsZWFuVmFsdWUoKXtcbiAgICAgICAgdGhpcy5pbnB1dHMudmFsdWUgPSBcIlwiO1xuICAgIH07XG5cbi8vINGD0LTQsNC70LXQvdC40LUg0LvQuNGB0YLQsCBcbiAgICByZW1vdmVMaXN0KCl7XG4gICAgdGhpcy5pbnB1dHMubmV4dEVsZW1lbnRTaWJsaW5nLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdGhpcy5kZWxldGVMaXN0cy5kZXRhaWwubnVtYmVyID0gdGhpcy5saXN0Q291bnRlcjsgXG4gICAgdGhpcy5wYXJlbnRzLmRpc3BhdGNoRXZlbnQodGhpcy5kZWxldGVMaXN0cyk7XG4gICAgdGhpcy5wYXJlbnRzLnJlbW92ZSgpO1xuICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpOyBcbiAgfSk7XG4gICBcbiAgfTtcbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90b2RvbGlzdC50cyIsIlxuXG5cbiBleHBvcnQgZGVmYXVsdCBjbGFzcyBUb0RvTGlzdEl0ZW0ge1xuXG4gICAgICAgICAgICB3YXRjaDogQ3VzdG9tRXZlbnQ7XG4gICAgICAgICAgICBsb2NhbDogYW55O1xuICAgICAgICAgICAgaW5wdXRWYWx1ZTogc3RyaW5nO1xuICAgICAgICAgICAgcGFyZW50czogSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBjb3VudGVyOiBudW1iZXI7XG4gICAgICAgICAgICBjaGVja2VkSXRlbTogYm9vbGVhbjtcbiAgICAgICAgICAgIG5ld0lucHV0OiBhbnk7XG4gICAgICAgICAgICBjaGVjazogYW55O1xuICAgICAgICAgICAgcmVtb3ZlOiBhbnk7XG4gICAgICAgICAgICBtYWluQ29udGFpbmVyOiBFbGVtZW50O1xuICAgICAgICAgICAgZGVsZXRlRXZlbnQ6IEN1c3RvbUV2ZW50O1xuICAgICAgICAgICAgY2hhbmdlRXZlbnQ6IEN1c3RvbUV2ZW50O1xuICAgICAgICAgICAgZm9jdXNJbnB1dDogQ3VzdG9tRXZlbnQ7XG4gICAgICAgICAgICB0b2RvbGlzdElucHV0OiBhbnk7XG5cbiAgICAgICAgY29uc3RydWN0b3IgKGlucHV0OiBhbnksIHBhcmVudDogYW55LCBjb3VudGVyOiBudW1iZXIsIHRhc2s6IGFueSwgd2F0Y2g6IEN1c3RvbUV2ZW50KXtcbi8v0L/QvtC70YPRh9Cw0LXQvCDQstGB0LUg0LjQstC10L3RgtGLINGH0LXRgNC10Lcg0YHQstC+0LnRgdGC0LLQsCwg0LAg0YLQsNC6INC20LUg0L3Rg9C20L3Ri9C1INC90LDQvCDQtNCw0L3QvdGL0LVcbiAgICAgICAgICAgIHRoaXMud2F0Y2ggPSB3YXRjaDtcbiAgICAgICAgICAgIHRoaXMubG9jYWwgPSB0YXNrO1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnRvZG9saXN0SW5wdXQgPSBpbnB1dDtcbiAgICAgICAgICAgIHRoaXMucGFyZW50cyA9IHBhcmVudDsgLy8gaXRlbXNcbiAgICAgICAgICAgIHRoaXMuY291bnRlciA9IGNvdW50ZXI7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRJdGVtID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgfVxuXG4vLyDRgdGC0YDQvtC40Lwg0L3QvtCy0YvQuSDQsNC50YLQtdC8XG4gICAgaW5pdCgpe1xuICAgICAgICB0aGlzLm5ld0V2ZW50cygpO1xuICAgICAgICB0aGlzLndvcmtpbmdXaXRoTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMuaHRtbEJ1aWxkKCk7XG4gICAgICAgIHRoaXMubWFpbkVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMuc3RhcnRJbnB1dFZhbHVlKCk7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lclN0eWxlcygpO1xuICAgICAgICB0aGlzLmZvY3VzVG9kb2xpc3RJbnB1dCgpO1xuICAgICAgICB0aGlzLmNoZWNrSXRlbSgpO1xuICAgICAgICB0aGlzLm5ld0l0ZW1WYWx1ZSgpOyBcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVUYXNrKCk7XG4gICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICAgICAgICAgXG4gICAgfVxuXG4vLyDQtdGB0LvQuCDQtdGB0YLRjCDQutCw0LrQuNC1LdGC0L4g0LvQvtC60LDQu9GM0L3Ri9C1INC00LDQvdC90YvQtSwg0LfQsNCx0LjRgNCw0LXQvCDQuNC3INC90LjRhSDQuNC90L/Rg9GCLCDQuCDQuNC90YTQvtGA0LzQsNGG0LjRjiwg0LrQsNC60LjQtSDQuNC3INCw0LnRgtC10LzQvtCyINCx0YvQu9C4INGH0LXQutC90YPRgtGLXG4gICAgd29ya2luZ1dpdGhMb2NhbFN0b3JhZ2UoKXtcbiAgICAgICAgaWYgKHRoaXMubG9jYWwgIT09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gdGhpcy5sb2NhbC5pbnB1dFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkSXRlbSA9IHRoaXMubG9jYWwuY2hlY2tlZEl0ZW07XG4gICAgICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG5cbiAgICB9fTtcblxuICAgIHN0YXJ0SW5wdXRWYWx1ZSgpe1xuICAgICAgICB0aGlzLm5ld0lucHV0LmZvY3VzKCk7XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLmlucHV0VmFsdWU7XG4gICAgICAgIHRoaXMubmV3SW5wdXQudmFsdWUgPSBcIlwiOyBcbiAgICAgICAgdGhpcy5uZXdJbnB1dC52YWx1ZSA9IHZhbDsgXG4gICAgICAgIHRoaXMudG9kb2xpc3RJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgfVxuXG4gICAgbWFpbkVsZW1lbnRzKCl7XG4gICAgICAgIHRoaXMuY2hlY2sgPSB0aGlzLm1haW5Db250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGROb2Rlc1sxXTtcbiAgICAgICAgdGhpcy5uZXdJbnB1dCA9IHRoaXMubWFpbkNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZE5vZGVzWzNdO1xuICAgICAgICB0aGlzLm5ld0lucHV0LnZhbHVlID0gdGhpcy5pbnB1dFZhbHVlO1xuICAgICAgICB0aGlzLnJlbW92ZSA9IHRoaXMubWFpbkNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZE5vZGVzWzVdO1xuICAgIH1cblxuICAgIG1haW5Db250YWluZXJTdHlsZXMoKXtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgICAgICB0aGlzLnJlbW92ZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgICB0aGlzLnJlbW92ZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgICB0aGlzLnJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICB0aGlzLm5ld0lucHV0LnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICBuZXdFdmVudHMoKXtcblxuICAgICAgICBcbiAgICAgICAgdGhpcy5kZWxldGVFdmVudCA9IG5ldyBDdXN0b21FdmVudChcImRlbGV0ZUV2ZW50XCIse1xuICAgICAgICAgICAgICAgIGRldGFpbDoge2NvdW50OiBcImRvbmVcIn0gICAgICBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VFdmVudCA9IG5ldyBDdXN0b21FdmVudChcImNoYW5nZUV2ZW50XCIse1xuICAgICAgICAgICAgICAgIGRldGFpbDoge2NvdW50OiBcImRvbmVcIn0gICAgICBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb2N1c0lucHV0ID0gbmV3IEN1c3RvbUV2ZW50KFwiZm9jdXNJbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgIGRldGFpbDoge2NvdW50OiBcImRvbmVcIn1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbi8vINC/0L7RgdGC0YDQvtC50LrQsCDQutCw0YDQutCw0YHRgdCwINCw0LnRgtC10LzQsFxuICAgaHRtbEJ1aWxkKCl7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMucGFyZW50cy5hcHBlbmRDaGlsZCh0aGlzLm1haW5Db250YWluZXIpO1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXIuY2xhc3NOYW1lID0gXCJtYWluQ29udGFpbmVyXCI7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBgIFxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29udGFpbmVyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NoZWNrJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdjaGVja2JveCcgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlOyBjdXJzb3I6IHBvaW50ZXInPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9J25ld0lucHV0JyB2YWx1ZT0nJHt0aGlzLmlucHV0VmFsdWV9Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J3JlbW92ZSc+PGltZyBzcmM9J2Nyb3NzLnBuZycgc3R5bGU9J2hlaWd0aDogMThweDsgd2lkdGg6IDIycHg7IGRpc3BsYXk6YmxvY2snPjwvaW1nPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+YDsgXG4gICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICAgICAgfVxuICAgIFxuICAgZm9jdXNUb2RvbGlzdElucHV0KCl7XG4gICAgICAgIHRoaXMubmV3SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICBpZihlLmtleUNvZGUgPT0gMTMpe1xuICAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5mb2N1c0lucHV0KTtcbiAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICB9ICAgICBcblxuLy8g0LzQtdGC0L7QtCDRg9C00LDQu9C10L3QuNGPINC40Lcg0JTQvtC80LBcbiAgICByZW1vdmVUYXNrKCl7XG4gICAgICAgIHRoaXMucmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZGVsZXRlRXZlbnQuZGV0YWlsLm51bWJlciA9IHRoaXMuY291bnRlcjsgICBcbiAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMuZGVsZXRlRXZlbnQpO1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICB9KTtcbn1cblxuLy8g0YHQu9C10LTQuNC8INC30LAg0LjQt9C80LXQvdC10L3QuNGP0LzQuCDQsiDRh9C10LrQsdC+0LrRgdCw0YUsINGA0LXQt9GD0LvRjNGC0LDRgiDQt9Cw0L/QuNGB0YvQstCw0LXQvCDQsiDQutC70LDRgdGBLlxuICAgIGlzQ2hlY2tlZCgpe1xuICAgICAgICB0aGlzLmNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgICBpZiAodGhpcy5jaGVjay5maXJzdEVsZW1lbnRDaGlsZC5jaGVja2VkKXtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZEl0ZW0gPSB0cnVlO1xuICAgICAgICAgICAgIHRoaXMuY2hlY2tJdGVtKCk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRJdGVtID0gZmFsc2U7XG4gICAgICAgICAgICAgICB0aGlzLmNoZWNrSXRlbSgpO1xuICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbi8vINC80LXRgtC+0LQg0LjQt9C80LXQvdC10L3QuNGPIGlucHV0VmFsdWUg0L/RgNC4INC10LPQviDQuNC30LzQtdC90LXQvdC40Lgg0L3QsCDRhdC+0LTRg1xuICAgIG5ld0l0ZW1WYWx1ZSgpe1xuICAgICAgICB0aGlzLm5ld0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2hhbmdlRXZlbnQuZGV0YWlsLm51bWJlciA9IHRoaXMuY291bnRlcjsgXG4gICAgICAgIHRoaXMuY2hhbmdlRXZlbnQuZGV0YWlsLnZhbHVlID0gdGhpcy5uZXdJbnB1dC52YWx1ZTtcbiAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMuY2hhbmdlRXZlbnQpO1xuICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4vLyDQtdGB0LvQuCDQsiDQutC70LDRgdGB0LUg0YHRgtCw0YLRg9GBINGH0LXQutCx0L7QutGB0LAgY2hlY2tlZCAtINC/0YDQuNC80LXQvdGP0LXQvCDRgdGC0LjQu9C4LCDQuCDQvdCw0L7QsdC+0YDQvtGCXG4gICAgY2hlY2tJdGVtKCl7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWRJdGVtKXtcbiAgICAgICAgdGhpcy5jaGVjay5jbGFzc05hbWUgPSBcImNoZWNrZWRjaGVja1wiO1xuICAgICAgICB0aGlzLm5ld0lucHV0LmNsYXNzTmFtZSA9IFwiY2hlY2tlZFwiO1xuICAgICAgICB0aGlzLnJlbW92ZS5jbGFzc05hbWUgPSBcImNoZWNrZWRyZW1vdmVcIjtcbiAgICAgICAgdGhpcy5jaGVjay5maXJzdEVsZW1lbnRDaGlsZC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hlY2suY2xhc3NOYW1lID0gXCJjaGVja1wiO1xuICAgICAgICB0aGlzLm5ld0lucHV0LmNsYXNzTmFtZSA9IFwibmV3SW5wdXRcIjtcbiAgICAgICAgdGhpcy5yZW1vdmUuY2xhc3NOYW1lID0gXCJyZW1vdmVcIjtcbiAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICAgICAgfVxuICAgIH07ICBcblxuICAgIH1cblxuXG5cbiAgIFxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90b2RvbGlzdGl0ZW0udHMiXSwic291cmNlUm9vdCI6IiJ9