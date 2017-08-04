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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__builditem_js__ = __webpack_require__(1);


// 3)Реализовать сохранение/чтение, используя LocalStorage, всех ToDoList и их айтемов:
// - при загрузке страницы проверять наличие сохраненных данных и строить по ним ToDoList с айтемами, если данных нет, то выводить только один пустой ToDoList (edited)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
  }).catch(function(error) {

    console.log('Registration failed with ' + error);
  });
}

let flexed = document.getElementById('flexed');
new __WEBPACK_IMPORTED_MODULE_0__builditem_js__["a" /* default */](flexed);





/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__todolist_js__ = __webpack_require__(2);
 


class BuildItem {
	constructor(parent){
    this.container = parent;
		this.allLists = [];
		this.counter = 0;
		this.init();
	};


    init(){
      // localStorage.clear();
        this.newEvent();
        this.buildStorageLists();
    	  document.getElementById('plus').addEventListener("click", () => {
    		this.buildItemHtml();
        this.toDoListInit();
        this.customEvent();
    	});
        
      };

// забираем все что есть из локалсторейджа, и в зависимости что там внутри - показываем локал, или пустой айтем.

    buildStorageLists(){
     
      this.localValue = localStorage.getItem('data');
      if (this.localValue !== null && this.localValue.length > 3){ 
        this.localFrame = JSON.parse(this.localValue);
       

        this.localFrame.forEach(list => {
        this.buildItemHtml();
        this.buildInit(list);
        this.customEvent();
       });

    } else if (this.localValue !== null && this.localValue.length < 3){
        this.buildItemHtml();
        this.buildInit(null);
        this.customEvent();
    } else {
       this.buildItemHtml();
       this.buildInit(null);
       this.customEvent();
    } 
  }


// метод создает каркасс для нового листа
    buildItemHtml(){
    	  this.mainFrame = document.createElement('div');
    	  this.mainFrame.className = 'main';
        this.container.insertBefore(this.mainFrame, this.container.childNodes[1]);  
    };

// метод ловит все кастомивенты, которые нужно словить в этом классе 
    customEvent(){
          this.temporaryList = [];
// событие удаления листа
    	  this.mainFrame.addEventListener("deleteLists", (event) => {
          this.getNumber(event);
          this.allLists.splice(this.temporaryList[1], 1);         
      }); 
// событие watch - мгновенная перезапись изменений в локал
        this.mainFrame.addEventListener("watch", (event) => {
            this.writeStorage();
            this.parseStorage();
        });  
    };

    newEvent(){

        this.watch = new CustomEvent("watch",{
                detail: {count: "done"}
        });
    }

// метод, который сравнивает информацию о номере листа, которая пришла из нижнего класса, с номером листа
// возвращает массив с найденным элементом, и его индексом.
    getNumber(thisEvent){
        this.temporaryList = [];
        this.allLists.forEach((list, i) => {
        if (list.listCounter == thisEvent.detail.number){
        this.temporaryList.unshift(i);
        this.temporaryList.unshift(list);

             }
           });
      };
// строит новый лист
	  toDoListInit(){
        this.buildInit(null);
        this.writeStorage();
        this.parseStorage();
     };

// метод перезаписывает локалсторейдж
     writeStorage(){
        localStorage.clear();
        this.allListsString = JSON.stringify(this.allLists);
        localStorage.setItem("data", this.allListsString);
     };
// метод забирает локальные данные и делает их пригодным для работы
     parseStorage(){
        this.localValue = localStorage.getItem('data');
        this.localFrame = JSON.parse(this.localValue);

     };

// создание нового класса Todolist (localData ставить если есть локалсторейдж)
     buildInit(localData){
        console.log(localData);
        let parent = this.mainFrame;
      this.allLists.push(new __WEBPACK_IMPORTED_MODULE_0__todolist_js__["a" /* default */](parent, this.counter++, localData, this.watch));
   };
	
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BuildItem;
;




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__todolistitem_js__ = __webpack_require__(3);
 

 class Todolist {

    constructor(parent, counter, local, watch){
       

        this.watch = watch;
        this.local = local;
        this.parents = parent; // mainFrame
        this.tasks = [];
        this.listCounter = counter;
        this.taskCounter = 0;
        this.makeList();
    }

  
// созлание нового айтема
    makeList(){
        console.log(this.local);
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

      makeFrame(){
         this.parents.innerHTML = ` 
    <div class="head">
    <div class="todoHeader">
   <div class="header" contenteditable="true" >Blabla</div> 
    <div style="width:25px; height:25px; cursor:pointer; padding: 16px 0 0 13px;"><img src='all2.png' style='heigth: 23px; width: 23px'></img></div>
    <div  style="width:25px;cursor:pointer; height:25px; padding: 16px 15px 0 16px;"><img src='del2.png' style='heigth: 23px; width: 23px'></img></div>
    </div>
    <div class="items"></div>  
        <div class="underdiv">
            <input class="input" type="text" placeholder=" + New task"/>
            <div class="cross"><img src='cross.png' style='heigth: 30px; width: 22px'></img></div>
         </div> 
         </div>
                    `;
      }
    
// работа с данными из локалсторейдж( забирает заголовок, и запускает метод строительства заданий)
    workingWithLocalStorage(){
      if (this.local !== null){
        let header = this.parents.childNodes[1].childNodes[1].childNodes[1];
        header.innerText = (this.local.header);
        this.header = this.local.header;
        this.buildLocalTask();
      }

    };
    

    doneallItems(){
           this.allDoneButton.addEventListener("click", () => {
                this.tasks.forEach(task => {
                task.checkedItem = true;
                task.check.firstElementChild.checked = true;
                task.checkItem();
                })
           });
           this.parents.dispatchEvent(this.watch);

    };

// выясняет, сколько заданий было в локалсторейдж, и строит такое же количество 
     buildLocalTask(){
        this.local.tasks.forEach(item => {
            this.buildTask(item);
        });
        this.parents.dispatchEvent(this.watch);
            
        };

    inputText(){

        this.inputs.addEventListener("keyup", (e) => {
             this.buildTask(null);

        });

        this.parents.dispatchEvent(this.watch);

    };

// ловим ивенты удаления, и изменения в айтемх
    initEvents(){
         this.temporaryData = [];
         this.parents.addEventListener("deleteEvent", (event) => {
            this.getNumber(event);
            this.tasks.splice(this.temporaryData[1], 1);
      });             

        this.parents.addEventListener("changeEvent", (event) => {
            this.getNumber(event);
            this.temporaryData[0].inputValue = event.detail.value;
        });  

        this.parents.addEventListener("focusInput", () => {
            this.inputs.focus();
        }); 
        };

// при клике на мусорный бак удаляются все айтемы
     deleteAllEvents(){
        this.deleteAllButton.addEventListener("click", () => {
        this.tasks = [];
        this.parents.childNodes[1].childNodes[3].innerHTML = "";
        this.parents.dispatchEvent(this.watch);

        })

     }   
 // инициализация всех кастомивентов которые относятся к этому классу
     newEvents(){

          this.deleteLists = new CustomEvent("deleteLists",{
                detail: {count: "done"}      
        });

    };

    mainElements(){
        this.inputs = this.parents.childNodes[1].childNodes[5].childNodes[1];
        this.allDoneButton = this.parents.childNodes[1].childNodes[1].childNodes[3];
        this.deleteAllButton = this.parents.childNodes[1].childNodes[1].childNodes[5];
        this.parents.dispatchEvent(this.watch);

    };
// строительство нового айтема
    buildTask(data){
      this.tasks.push(
      new __WEBPACK_IMPORTED_MODULE_0__todolistitem_js__["a" /* default */](this.inputs.value, this.parents.childNodes[1].childNodes[3], this.taskCounter++, data, this.watch)
      // this.lazyLoader(data);
      );

      this.cleanValue();
    }

    // lazyLoader(data){
    //      import('./todolistitem.js').then(
    //     (module) => {
    //     const todoListItem = module.default;
    //     new todoListItem(this.inputs.value, this.parents.childNodes[1].childNodes[3], this.taskCounter++, data, this.watch)
    //  });
    // }


// метод наблюдает за любыми изменениями заголовка, и списывает их в массив
    getHeader(){

      let header = this.parents.childNodes[1].childNodes[1].childNodes[1];
      this.header = header.innerText;
      header.addEventListener("input", () => {
            this.header = header.innerText;
             this.parents.dispatchEvent(this.watch);
      });
      
    }
// метод сравнивает номера в details и в массиве, на выходе получаем массив из элемента и его индекса
     getNumber(thisEvent){

            this.temporaryData = [];
            this.tasks.forEach((task, i) => {
            if (task.counter == thisEvent.detail.number){
            this.temporaryData.unshift(i);
            this.temporaryData.unshift(task);
             }
           });
      };


    cleanValue(){
        this.inputs.value = "";
    };

// удаление листа 
    removeList(){
    this.inputs.nextElementSibling.addEventListener("click", () => {
    this.deleteLists.detail.number = this.listCounter; 
    this.parents.dispatchEvent(this.deleteLists);
    this.parents.remove();
    this.parents.dispatchEvent(this.watch); 
  });
   
  };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Todolist;
;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

 class ToDoListItem {
        constructor (value, parent, counter, task, watch){
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
    init(){
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
           
    }

// если есть какие-то локальные данные, забираем из них инпут, и информацию, какие из айтемов были чекнуты
    workingWithLocalStorage(){
        if (this.local !== null){
            this.inputValue = this.local.inputValue;
            this.checkedItem = this.local.checkedItem;
            this.parents.parentNode.parentNode.dispatchEvent(this.watch);

    }};

    startInputValue(){
        this.newInput.focus();
        let val = this.inputValue;
        this.newInput.value = '';
        this.newInput.value = val; 
    }

    mainElements(){
        this.check = this.mainContainer.firstElementChild.childNodes[1];
        this.newInput = this.mainContainer.firstElementChild.childNodes[3];
        this.remove = this.mainContainer.firstElementChild.childNodes[5];
    }

    mainContainerStyles(){
        this.newInput.parentNode.addEventListener('mouseover', () => {
             this.remove.style.display = "block";

        });

          this.newInput.addEventListener('input', () => {
             this.remove.style.display = "block";

        });

         this.remove.addEventListener('mouseout', (e) => {
            this.remove.style.display = "none";
        });

         this.newInput.parentNode.addEventListener('mouseout', (e) => {
            this.remove.style.display = "none";

        });
    }



    newEvents(){

        
        this.deleteEvent = new CustomEvent("deleteEvent",{
                detail: {count: "done"}      
        });

        this.changeEvent = new CustomEvent("changeEvent",{
                detail: {count: "done"}      
        });

        this.focusInput = new CustomEvent("focusInput", {
                 detail: {count: "done"}
        });

    }

// постройка каркасса айтема
   htmlBuild(){
        this.mainContainer = document.createElement("div");
        this.parents.appendChild(this.mainContainer);
        this.mainContainer.className = "mainContainer";
        this.mainContainer.innerHTML = ` 
                     <div class='container'>
                        <div class='check'>
                        <input type='checkbox' style='position:relative; cursor: pointer'>
                        </div>
                        <input class='newInput' value='${this.inputValue}'>
                        <div class='remove'><img src='cross.png' style='heigth: 18px; width: 22px; display:block'></img></div>
                  </div>`; 
        this.parents.parentNode.parentNode.dispatchEvent(this.watch);
        }
    
   focusTodolistInput(){
        this.newInput.addEventListener("keyup", (e) => {
             if(e.keyCode == 13){
             this.remove.style.display = "none";
             this.parents.parentNode.parentNode.dispatchEvent(this.focusInput);
           };
        });
   }     

// метод удаления из Дома
    removeTask(){
        this.remove.addEventListener("click", () => {
        this.deleteEvent.detail.number = this.counter;   
        this.parents.parentNode.parentNode.dispatchEvent(this.deleteEvent);
        this.mainContainer.remove();
        this.parents.parentNode.parentNode.dispatchEvent(this.watch);
    });
}

// следим за изменениями в чекбоксах, результат записываем в класс.
    isChecked(){
        this.check.addEventListener('change', () => {
             if (this.check.firstElementChild.checked){
            this.checkedItem = true;
             this.checkItem();
            this.parents.parentNode.parentNode.dispatchEvent(this.watch);
        } else {
            this.checkedItem = false;
               this.checkItem();
               this.parents.parentNode.parentNode.dispatchEvent(this.watch);
            }
        });
    }

// метод изменения inputValue при его изменении на ходу
    newItemValue(){
        this.newInput.addEventListener("input", () => {
        this.changeEvent.detail.number = this.counter; 
        this.changeEvent.detail.value = this.newInput.value;
        this.parents.parentNode.parentNode.dispatchEvent(this.changeEvent);
        this.parents.parentNode.parentNode.dispatchEvent(this.watch);
        })
    }

// если в классе статус чекбокса checked - применяем стили, и наоборот
    checkItem(){
        if (this.checkedItem){
        this.check.className = "checkedcheck";
        this.newInput.className = "checked";
        this.remove.className = "checkedremove";
        this.check.firstElementChild.checked = true;
       this.parents.parentNode.parentNode.dispatchEvent(this.watch);
        } else {
        this.check.className = "check";
        this.newInput.className = "newInput";
        this.remove.className = "remove";
        this.parents.parentNode.parentNode.dispatchEvent(this.watch);
            }
    };  

    }
/* harmony export (immutable) */ __webpack_exports__["a"] = ToDoListItem;




   




/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODBhZTVlMzZhZjE2NTcwZjk5MGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9idWlsZGl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RvZG9saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy90b2RvbGlzdGl0ZW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUNkQTtBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxrRTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0Y7QUFDQTs7QUFFQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFO0FBQ3hFO0FBQ0EseURBQXlELGdCQUFnQjtBQUN6RSxxRkFBcUYsYUFBYTtBQUNsRywwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEk7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTTs7QUFFQTtBQUFBO0FBQUEiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDgwYWU1ZTM2YWYxNjU3MGY5OTBkIiwiaW1wb3J0IEJ1aWxkSXRlbSBmcm9tICcuL2J1aWxkaXRlbS5qcyc7XG5cbi8vIDMp0KDQtdCw0LvQuNC30L7QstCw0YLRjCDRgdC+0YXRgNCw0L3QtdC90LjQtS/Rh9GC0LXQvdC40LUsINC40YHQv9C+0LvRjNC30YPRjyBMb2NhbFN0b3JhZ2UsINCy0YHQtdGFIFRvRG9MaXN0INC4INC40YUg0LDQudGC0LXQvNC+0LI6XG4vLyAtINC/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INGB0YLRgNCw0L3QuNGG0Ysg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INGB0L7RhdGA0LDQvdC10L3QvdGL0YUg0LTQsNC90L3Ri9GFINC4INGB0YLRgNC+0LjRgtGMINC/0L4g0L3QuNC8IFRvRG9MaXN0INGBINCw0LnRgtC10LzQsNC80LgsINC10YHQu9C4INC00LDQvdC90YvRhSDQvdC10YIsINGC0L4g0LLRi9Cy0L7QtNC40YLRjCDRgtC+0LvRjNC60L4g0L7QtNC40L0g0L/Rg9GB0YLQvtC5IFRvRG9MaXN0IChlZGl0ZWQpXG5cbmlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XG4gIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcvc3cuanMnKS50aGVuKGZ1bmN0aW9uKHJlZykge1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuXG4gICAgY29uc29sZS5sb2coJ1JlZ2lzdHJhdGlvbiBmYWlsZWQgd2l0aCAnICsgZXJyb3IpO1xuICB9KTtcbn1cblxubGV0IGZsZXhlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmbGV4ZWQnKTtcbm5ldyBCdWlsZEl0ZW0oZmxleGVkKTtcblxuXG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIiBpbXBvcnQgVG9kb2xpc3QgZnJvbSAnLi90b2RvbGlzdC5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVpbGRJdGVtIHtcblx0Y29uc3RydWN0b3IocGFyZW50KXtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHBhcmVudDtcblx0XHR0aGlzLmFsbExpc3RzID0gW107XG5cdFx0dGhpcy5jb3VudGVyID0gMDtcblx0XHR0aGlzLmluaXQoKTtcblx0fTtcblxuXG4gICAgaW5pdCgpe1xuICAgICAgLy8gbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgIHRoaXMubmV3RXZlbnQoKTtcbiAgICAgICAgdGhpcy5idWlsZFN0b3JhZ2VMaXN0cygpO1xuICAgIFx0ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGx1cycpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgXHRcdHRoaXMuYnVpbGRJdGVtSHRtbCgpO1xuICAgICAgICB0aGlzLnRvRG9MaXN0SW5pdCgpO1xuICAgICAgICB0aGlzLmN1c3RvbUV2ZW50KCk7XG4gICAgXHR9KTtcbiAgICAgICAgXG4gICAgICB9O1xuXG4vLyDQt9Cw0LHQuNGA0LDQtdC8INCy0YHQtSDRh9GC0L4g0LXRgdGC0Ywg0LjQtyDQu9C+0LrQsNC70YHRgtC+0YDQtdC50LTQttCwLCDQuCDQsiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INGH0YLQviDRgtCw0Lwg0LLQvdGD0YLRgNC4IC0g0L/QvtC60LDQt9GL0LLQsNC10Lwg0LvQvtC60LDQuywg0LjQu9C4INC/0YPRgdGC0L7QuSDQsNC50YLQtdC8LlxuXG4gICAgYnVpbGRTdG9yYWdlTGlzdHMoKXtcbiAgICAgXG4gICAgICB0aGlzLmxvY2FsVmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpO1xuICAgICAgaWYgKHRoaXMubG9jYWxWYWx1ZSAhPT0gbnVsbCAmJiB0aGlzLmxvY2FsVmFsdWUubGVuZ3RoID4gMyl7IFxuICAgICAgICB0aGlzLmxvY2FsRnJhbWUgPSBKU09OLnBhcnNlKHRoaXMubG9jYWxWYWx1ZSk7XG4gICAgICAgXG5cbiAgICAgICAgdGhpcy5sb2NhbEZyYW1lLmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgIHRoaXMuYnVpbGRJdGVtSHRtbCgpO1xuICAgICAgICB0aGlzLmJ1aWxkSW5pdChsaXN0KTtcbiAgICAgICAgdGhpcy5jdXN0b21FdmVudCgpO1xuICAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLmxvY2FsVmFsdWUgIT09IG51bGwgJiYgdGhpcy5sb2NhbFZhbHVlLmxlbmd0aCA8IDMpe1xuICAgICAgICB0aGlzLmJ1aWxkSXRlbUh0bWwoKTtcbiAgICAgICAgdGhpcy5idWlsZEluaXQobnVsbCk7XG4gICAgICAgIHRoaXMuY3VzdG9tRXZlbnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgIHRoaXMuYnVpbGRJdGVtSHRtbCgpO1xuICAgICAgIHRoaXMuYnVpbGRJbml0KG51bGwpO1xuICAgICAgIHRoaXMuY3VzdG9tRXZlbnQoKTtcbiAgICB9IFxuICB9XG5cblxuLy8g0LzQtdGC0L7QtCDRgdC+0LfQtNCw0LXRgiDQutCw0YDQutCw0YHRgSDQtNC70Y8g0L3QvtCy0L7Qs9C+INC70LjRgdGC0LBcbiAgICBidWlsZEl0ZW1IdG1sKCl7XG4gICAgXHQgIHRoaXMubWFpbkZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgXHQgIHRoaXMubWFpbkZyYW1lLmNsYXNzTmFtZSA9ICdtYWluJztcbiAgICAgICAgdGhpcy5jb250YWluZXIuaW5zZXJ0QmVmb3JlKHRoaXMubWFpbkZyYW1lLCB0aGlzLmNvbnRhaW5lci5jaGlsZE5vZGVzWzFdKTsgIFxuICAgIH07XG5cbi8vINC80LXRgtC+0LQg0LvQvtCy0LjRgiDQstGB0LUg0LrQsNGB0YLQvtC80LjQstC10L3RgtGLLCDQutC+0YLQvtGA0YvQtSDQvdGD0LbQvdC+INGB0LvQvtCy0LjRgtGMINCyINGN0YLQvtC8INC60LvQsNGB0YHQtSBcbiAgICBjdXN0b21FdmVudCgpe1xuICAgICAgICAgIHRoaXMudGVtcG9yYXJ5TGlzdCA9IFtdO1xuLy8g0YHQvtCx0YvRgtC40LUg0YPQtNCw0LvQtdC90LjRjyDQu9C40YHRgtCwXG4gICAgXHQgIHRoaXMubWFpbkZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJkZWxldGVMaXN0c1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLmdldE51bWJlcihldmVudCk7XG4gICAgICAgICAgdGhpcy5hbGxMaXN0cy5zcGxpY2UodGhpcy50ZW1wb3JhcnlMaXN0WzFdLCAxKTsgICAgICAgICBcbiAgICAgIH0pOyBcbi8vINGB0L7QsdGL0YLQuNC1IHdhdGNoIC0g0LzQs9C90L7QstC10L3QvdCw0Y8g0L/QtdGA0LXQt9Cw0L/QuNGB0Ywg0LjQt9C80LXQvdC10L3QuNC5INCyINC70L7QutCw0LtcbiAgICAgICAgdGhpcy5tYWluRnJhbWUuYWRkRXZlbnRMaXN0ZW5lcihcIndhdGNoXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53cml0ZVN0b3JhZ2UoKTtcbiAgICAgICAgICAgIHRoaXMucGFyc2VTdG9yYWdlKCk7XG4gICAgICAgIH0pOyAgXG4gICAgfTtcblxuICAgIG5ld0V2ZW50KCl7XG5cbiAgICAgICAgdGhpcy53YXRjaCA9IG5ldyBDdXN0b21FdmVudChcIndhdGNoXCIse1xuICAgICAgICAgICAgICAgIGRldGFpbDoge2NvdW50OiBcImRvbmVcIn1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4vLyDQvNC10YLQvtC0LCDQutC+0YLQvtGA0YvQuSDRgdGA0LDQstC90LjQstCw0LXRgiDQuNC90YTQvtGA0LzQsNGG0LjRjiDQviDQvdC+0LzQtdGA0LUg0LvQuNGB0YLQsCwg0LrQvtGC0L7RgNCw0Y8g0L/RgNC40YjQu9CwINC40Lcg0L3QuNC20L3QtdCz0L4g0LrQu9Cw0YHRgdCwLCDRgSDQvdC+0LzQtdGA0L7QvCDQu9C40YHRgtCwXG4vLyDQstC+0LfQstGA0LDRidCw0LXRgiDQvNCw0YHRgdC40LIg0YEg0L3QsNC50LTQtdC90L3Ri9C8INGN0LvQtdC80LXQvdGC0L7QvCwg0Lgg0LXQs9C+INC40L3QtNC10LrRgdC+0LwuXG4gICAgZ2V0TnVtYmVyKHRoaXNFdmVudCl7XG4gICAgICAgIHRoaXMudGVtcG9yYXJ5TGlzdCA9IFtdO1xuICAgICAgICB0aGlzLmFsbExpc3RzLmZvckVhY2goKGxpc3QsIGkpID0+IHtcbiAgICAgICAgaWYgKGxpc3QubGlzdENvdW50ZXIgPT0gdGhpc0V2ZW50LmRldGFpbC5udW1iZXIpe1xuICAgICAgICB0aGlzLnRlbXBvcmFyeUxpc3QudW5zaGlmdChpKTtcbiAgICAgICAgdGhpcy50ZW1wb3JhcnlMaXN0LnVuc2hpZnQobGlzdCk7XG5cbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH0pO1xuICAgICAgfTtcbi8vINGB0YLRgNC+0LjRgiDQvdC+0LLRi9C5INC70LjRgdGCXG5cdCAgdG9Eb0xpc3RJbml0KCl7XG4gICAgICAgIHRoaXMuYnVpbGRJbml0KG51bGwpO1xuICAgICAgICB0aGlzLndyaXRlU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLnBhcnNlU3RvcmFnZSgpO1xuICAgICB9O1xuXG4vLyDQvNC10YLQvtC0INC/0LXRgNC10LfQsNC/0LjRgdGL0LLQsNC10YIg0LvQvtC60LDQu9GB0YLQvtGA0LXQudC00LZcbiAgICAgd3JpdGVTdG9yYWdlKCl7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICB0aGlzLmFsbExpc3RzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodGhpcy5hbGxMaXN0cyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZGF0YVwiLCB0aGlzLmFsbExpc3RzU3RyaW5nKTtcbiAgICAgfTtcbi8vINC80LXRgtC+0LQg0LfQsNCx0LjRgNCw0LXRgiDQu9C+0LrQsNC70YzQvdGL0LUg0LTQsNC90L3Ri9C1INC4INC00LXQu9Cw0LXRgiDQuNGFINC/0YDQuNCz0L7QtNC90YvQvCDQtNC70Y8g0YDQsNCx0L7RgtGLXG4gICAgIHBhcnNlU3RvcmFnZSgpe1xuICAgICAgICB0aGlzLmxvY2FsVmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpO1xuICAgICAgICB0aGlzLmxvY2FsRnJhbWUgPSBKU09OLnBhcnNlKHRoaXMubG9jYWxWYWx1ZSk7XG5cbiAgICAgfTtcblxuLy8g0YHQvtC30LTQsNC90LjQtSDQvdC+0LLQvtCz0L4g0LrQu9Cw0YHRgdCwIFRvZG9saXN0IChsb2NhbERhdGEg0YHRgtCw0LLQuNGC0Ywg0LXRgdC70Lgg0LXRgdGC0Ywg0LvQvtC60LDQu9GB0YLQvtGA0LXQudC00LYpXG4gICAgIGJ1aWxkSW5pdChsb2NhbERhdGEpe1xuICAgICAgICBjb25zb2xlLmxvZyhsb2NhbERhdGEpO1xuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5tYWluRnJhbWU7XG4gICAgICB0aGlzLmFsbExpc3RzLnB1c2gobmV3IFRvZG9saXN0KHBhcmVudCwgdGhpcy5jb3VudGVyKyssIGxvY2FsRGF0YSwgdGhpcy53YXRjaCkpO1xuICAgfTtcblx0XG59O1xuXG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2J1aWxkaXRlbS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIgaW1wb3J0IFRvRG9MaXN0SXRlbSBmcm9tICcuL3RvZG9saXN0aXRlbS5qcyc7XG5cbiBleHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvbGlzdCB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIGNvdW50ZXIsIGxvY2FsLCB3YXRjaCl7XG4gICAgICAgXG5cbiAgICAgICAgdGhpcy53YXRjaCA9IHdhdGNoO1xuICAgICAgICB0aGlzLmxvY2FsID0gbG9jYWw7XG4gICAgICAgIHRoaXMucGFyZW50cyA9IHBhcmVudDsgLy8gbWFpbkZyYW1lXG4gICAgICAgIHRoaXMudGFza3MgPSBbXTtcbiAgICAgICAgdGhpcy5saXN0Q291bnRlciA9IGNvdW50ZXI7XG4gICAgICAgIHRoaXMudGFza0NvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLm1ha2VMaXN0KCk7XG4gICAgfVxuXG4gIFxuLy8g0YHQvtC30LvQsNC90LjQtSDQvdC+0LLQvtCz0L4g0LDQudGC0LXQvNCwXG4gICAgbWFrZUxpc3QoKXtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5sb2NhbCk7XG4gICAgICAgIHRoaXMubWFrZUZyYW1lKCk7XG4gICAgICAgIHRoaXMubWFpbkVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMuZ2V0SGVhZGVyKCk7XG4gICAgICAgIHRoaXMubmV3RXZlbnRzKCk7XG4gICAgICAgIHRoaXMud29ya2luZ1dpdGhMb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5pbnB1dFRleHQoKTsgIFxuICAgICAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0KCk7XG4gICAgICAgIHRoaXMuZGVsZXRlQWxsRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuZG9uZWFsbEl0ZW1zKCk7XG4gICAgICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgICB9O1xuXG4gICAgICBtYWtlRnJhbWUoKXtcbiAgICAgICAgIHRoaXMucGFyZW50cy5pbm5lckhUTUwgPSBgIFxuICAgIDxkaXYgY2xhc3M9XCJoZWFkXCI+XG4gICAgPGRpdiBjbGFzcz1cInRvZG9IZWFkZXJcIj5cbiAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIgPkJsYWJsYTwvZGl2PiBcbiAgICA8ZGl2IHN0eWxlPVwid2lkdGg6MjVweDsgaGVpZ2h0OjI1cHg7IGN1cnNvcjpwb2ludGVyOyBwYWRkaW5nOiAxNnB4IDAgMCAxM3B4O1wiPjxpbWcgc3JjPSdhbGwyLnBuZycgc3R5bGU9J2hlaWd0aDogMjNweDsgd2lkdGg6IDIzcHgnPjwvaW1nPjwvZGl2PlxuICAgIDxkaXYgIHN0eWxlPVwid2lkdGg6MjVweDtjdXJzb3I6cG9pbnRlcjsgaGVpZ2h0OjI1cHg7IHBhZGRpbmc6IDE2cHggMTVweCAwIDE2cHg7XCI+PGltZyBzcmM9J2RlbDIucG5nJyBzdHlsZT0naGVpZ3RoOiAyM3B4OyB3aWR0aDogMjNweCc+PC9pbWc+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIml0ZW1zXCI+PC9kaXY+ICBcbiAgICAgICAgPGRpdiBjbGFzcz1cInVuZGVyZGl2XCI+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCIgKyBOZXcgdGFza1wiLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcm9zc1wiPjxpbWcgc3JjPSdjcm9zcy5wbmcnIHN0eWxlPSdoZWlndGg6IDMwcHg7IHdpZHRoOiAyMnB4Jz48L2ltZz48L2Rpdj5cbiAgICAgICAgIDwvZGl2PiBcbiAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBgO1xuICAgICAgfVxuICAgIFxuLy8g0YDQsNCx0L7RgtCwINGBINC00LDQvdC90YvQvNC4INC40Lcg0LvQvtC60LDQu9GB0YLQvtGA0LXQudC00LYoINC30LDQsdC40YDQsNC10YIg0LfQsNCz0L7Qu9C+0LLQvtC6LCDQuCDQt9Cw0L/Rg9GB0LrQsNC10YIg0LzQtdGC0L7QtCDRgdGC0YDQvtC40YLQtdC70YzRgdGC0LLQsCDQt9Cw0LTQsNC90LjQuSlcbiAgICB3b3JraW5nV2l0aExvY2FsU3RvcmFnZSgpe1xuICAgICAgaWYgKHRoaXMubG9jYWwgIT09IG51bGwpe1xuICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5wYXJlbnRzLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdO1xuICAgICAgICBoZWFkZXIuaW5uZXJUZXh0ID0gKHRoaXMubG9jYWwuaGVhZGVyKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLmxvY2FsLmhlYWRlcjtcbiAgICAgICAgdGhpcy5idWlsZExvY2FsVGFzaygpO1xuICAgICAgfVxuXG4gICAgfTtcbiAgICBcblxuICAgIGRvbmVhbGxJdGVtcygpe1xuICAgICAgICAgICB0aGlzLmFsbERvbmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICAgICAgdGFzay5jaGVja2VkSXRlbSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGFzay5jaGVjay5maXJzdEVsZW1lbnRDaGlsZC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0YXNrLmNoZWNrSXRlbSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgIH0pO1xuICAgICAgICAgICB0aGlzLnBhcmVudHMuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcblxuICAgIH07XG5cbi8vINCy0YvRj9GB0L3Rj9C10YIsINGB0LrQvtC70YzQutC+INC30LDQtNCw0L3QuNC5INCx0YvQu9C+INCyINC70L7QutCw0LvRgdGC0L7RgNC10LnQtNC2LCDQuCDRgdGC0YDQvtC40YIg0YLQsNC60L7QtSDQttC1INC60L7Qu9C40YfQtdGB0YLQstC+IFxuICAgICBidWlsZExvY2FsVGFzaygpe1xuICAgICAgICB0aGlzLmxvY2FsLnRhc2tzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkVGFzayhpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGFyZW50cy5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICAgICAgXG4gICAgICAgIH07XG5cbiAgICBpbnB1dFRleHQoKXtcblxuICAgICAgICB0aGlzLmlucHV0cy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICB0aGlzLmJ1aWxkVGFzayhudWxsKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnBhcmVudHMuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcblxuICAgIH07XG5cbi8vINC70L7QstC40Lwg0LjQstC10L3RgtGLINGD0LTQsNC70LXQvdC40Y8sINC4INC40LfQvNC10L3QtdC90LjRjyDQsiDQsNC50YLQtdC80YVcbiAgICBpbml0RXZlbnRzKCl7XG4gICAgICAgICB0aGlzLnRlbXBvcmFyeURhdGEgPSBbXTtcbiAgICAgICAgIHRoaXMucGFyZW50cy5hZGRFdmVudExpc3RlbmVyKFwiZGVsZXRlRXZlbnRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdldE51bWJlcihldmVudCk7XG4gICAgICAgICAgICB0aGlzLnRhc2tzLnNwbGljZSh0aGlzLnRlbXBvcmFyeURhdGFbMV0sIDEpO1xuICAgICAgfSk7ICAgICAgICAgICAgIFxuXG4gICAgICAgIHRoaXMucGFyZW50cy5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlRXZlbnRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdldE51bWJlcihldmVudCk7XG4gICAgICAgICAgICB0aGlzLnRlbXBvcmFyeURhdGFbMF0uaW5wdXRWYWx1ZSA9IGV2ZW50LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSk7ICBcblxuICAgICAgICB0aGlzLnBhcmVudHMuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzSW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbnB1dHMuZm9jdXMoKTtcbiAgICAgICAgfSk7IFxuICAgICAgICB9O1xuXG4vLyDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC80YPRgdC+0YDQvdGL0Lkg0LHQsNC6INGD0LTQsNC70Y/RjtGC0YHRjyDQstGB0LUg0LDQudGC0LXQvNGLXG4gICAgIGRlbGV0ZUFsbEV2ZW50cygpe1xuICAgICAgICB0aGlzLmRlbGV0ZUFsbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgICAgIHRoaXMucGFyZW50cy5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbM10uaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgdGhpcy5wYXJlbnRzLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG5cbiAgICAgICAgfSlcblxuICAgICB9ICAgXG4gLy8g0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LLRgdC10YUg0LrQsNGB0YLQvtC80LjQstC10L3RgtC+0LIg0LrQvtGC0L7RgNGL0LUg0L7RgtC90L7RgdGP0YLRgdGPINC6INGN0YLQvtC80YMg0LrQu9Cw0YHRgdGDXG4gICAgIG5ld0V2ZW50cygpe1xuXG4gICAgICAgICAgdGhpcy5kZWxldGVMaXN0cyA9IG5ldyBDdXN0b21FdmVudChcImRlbGV0ZUxpc3RzXCIse1xuICAgICAgICAgICAgICAgIGRldGFpbDoge2NvdW50OiBcImRvbmVcIn0gICAgICBcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgbWFpbkVsZW1lbnRzKCl7XG4gICAgICAgIHRoaXMuaW5wdXRzID0gdGhpcy5wYXJlbnRzLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1s1XS5jaGlsZE5vZGVzWzFdO1xuICAgICAgICB0aGlzLmFsbERvbmVCdXR0b24gPSB0aGlzLnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbM107XG4gICAgICAgIHRoaXMuZGVsZXRlQWxsQnV0dG9uID0gdGhpcy5wYXJlbnRzLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzVdO1xuICAgICAgICB0aGlzLnBhcmVudHMuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcblxuICAgIH07XG4vLyDRgdGC0YDQvtC40YLQtdC70YzRgdGC0LLQviDQvdC+0LLQvtCz0L4g0LDQudGC0LXQvNCwXG4gICAgYnVpbGRUYXNrKGRhdGEpe1xuICAgICAgdGhpcy50YXNrcy5wdXNoKFxuICAgICAgbmV3IFRvRG9MaXN0SXRlbSh0aGlzLmlucHV0cy52YWx1ZSwgdGhpcy5wYXJlbnRzLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1szXSwgdGhpcy50YXNrQ291bnRlcisrLCBkYXRhLCB0aGlzLndhdGNoKVxuICAgICAgLy8gdGhpcy5sYXp5TG9hZGVyKGRhdGEpO1xuICAgICAgKTtcblxuICAgICAgdGhpcy5jbGVhblZhbHVlKCk7XG4gICAgfVxuXG4gICAgLy8gbGF6eUxvYWRlcihkYXRhKXtcbiAgICAvLyAgICAgIGltcG9ydCgnLi90b2RvbGlzdGl0ZW0uanMnKS50aGVuKFxuICAgIC8vICAgICAobW9kdWxlKSA9PiB7XG4gICAgLy8gICAgIGNvbnN0IHRvZG9MaXN0SXRlbSA9IG1vZHVsZS5kZWZhdWx0O1xuICAgIC8vICAgICBuZXcgdG9kb0xpc3RJdGVtKHRoaXMuaW5wdXRzLnZhbHVlLCB0aGlzLnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzNdLCB0aGlzLnRhc2tDb3VudGVyKyssIGRhdGEsIHRoaXMud2F0Y2gpXG4gICAgLy8gIH0pO1xuICAgIC8vIH1cblxuXG4vLyDQvNC10YLQvtC0INC90LDQsdC70Y7QtNCw0LXRgiDQt9CwINC70Y7QsdGL0LzQuCDQuNC30LzQtdC90LXQvdC40Y/QvNC4INC30LDQs9C+0LvQvtCy0LrQsCwg0Lgg0YHQv9C40YHRi9Cy0LDQtdGCINC40YUg0LIg0LzQsNGB0YHQuNCyXG4gICAgZ2V0SGVhZGVyKCl7XG5cbiAgICAgIGxldCBoZWFkZXIgPSB0aGlzLnBhcmVudHMuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMV07XG4gICAgICB0aGlzLmhlYWRlciA9IGhlYWRlci5pbm5lclRleHQ7XG4gICAgICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyLmlubmVyVGV4dDtcbiAgICAgICAgICAgICB0aGlzLnBhcmVudHMuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgfVxuLy8g0LzQtdGC0L7QtCDRgdGA0LDQstC90LjQstCw0LXRgiDQvdC+0LzQtdGA0LAg0LIgZGV0YWlscyDQuCDQsiDQvNCw0YHRgdC40LLQtSwg0L3QsCDQstGL0YXQvtC00LUg0L/QvtC70YPRh9Cw0LXQvCDQvNCw0YHRgdC40LIg0LjQtyDRjdC70LXQvNC10L3RgtCwINC4INC10LPQviDQuNC90LTQtdC60YHQsFxuICAgICBnZXROdW1iZXIodGhpc0V2ZW50KXtcblxuICAgICAgICAgICAgdGhpcy50ZW1wb3JhcnlEYXRhID0gW107XG4gICAgICAgICAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2ssIGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0YXNrLmNvdW50ZXIgPT0gdGhpc0V2ZW50LmRldGFpbC5udW1iZXIpe1xuICAgICAgICAgICAgdGhpcy50ZW1wb3JhcnlEYXRhLnVuc2hpZnQoaSk7XG4gICAgICAgICAgICB0aGlzLnRlbXBvcmFyeURhdGEudW5zaGlmdCh0YXNrKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuXG4gICAgY2xlYW5WYWx1ZSgpe1xuICAgICAgICB0aGlzLmlucHV0cy52YWx1ZSA9IFwiXCI7XG4gICAgfTtcblxuLy8g0YPQtNCw0LvQtdC90LjQtSDQu9C40YHRgtCwIFxuICAgIHJlbW92ZUxpc3QoKXtcbiAgICB0aGlzLmlucHV0cy5uZXh0RWxlbWVudFNpYmxpbmcuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICB0aGlzLmRlbGV0ZUxpc3RzLmRldGFpbC5udW1iZXIgPSB0aGlzLmxpc3RDb3VudGVyOyBcbiAgICB0aGlzLnBhcmVudHMuZGlzcGF0Y2hFdmVudCh0aGlzLmRlbGV0ZUxpc3RzKTtcbiAgICB0aGlzLnBhcmVudHMucmVtb3ZlKCk7XG4gICAgdGhpcy5wYXJlbnRzLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7IFxuICB9KTtcbiAgIFxuICB9O1xufTtcblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdG9kb2xpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0xpc3RJdGVtIHtcbiAgICAgICAgY29uc3RydWN0b3IgKHZhbHVlLCBwYXJlbnQsIGNvdW50ZXIsIHRhc2ssIHdhdGNoKXtcbi8v0L/QvtC70YPRh9Cw0LXQvCDQstGB0LUg0LjQstC10L3RgtGLINGH0LXRgNC10Lcg0YHQstC+0LnRgdGC0LLQsCwg0LAg0YLQsNC6INC20LUg0L3Rg9C20L3Ri9C1INC90LDQvCDQtNCw0L3QvdGL0LVcbiAgICAgICAgICAgIHRoaXMud2F0Y2ggPSB3YXRjaDtcbiAgICAgICAgICAgIHRoaXMubG9jYWwgPSB0YXNrO1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnBhcmVudHMgPSBwYXJlbnQ7IC8vIGl0ZW1zXG4gICAgICAgICAgICB0aGlzLmNvdW50ZXIgPSBjb3VudGVyO1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkSXRlbSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH1cblxuLy8g0YHRgtGA0L7QuNC8INC90L7QstGL0Lkg0LDQudGC0LXQvFxuICAgIGluaXQoKXtcbiAgICAgICAgdGhpcy5uZXdFdmVudHMoKTtcbiAgICAgICAgdGhpcy53b3JraW5nV2l0aExvY2FsU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLmh0bWxCdWlsZCgpO1xuICAgICAgICB0aGlzLm1haW5FbGVtZW50cygpO1xuICAgICAgICB0aGlzLnN0YXJ0SW5wdXRWYWx1ZSgpO1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXJTdHlsZXMoKTtcbiAgICAgICAgdGhpcy5mb2N1c1RvZG9saXN0SW5wdXQoKTtcbiAgICAgICAgdGhpcy5jaGVja0l0ZW0oKTtcbiAgICAgICAgdGhpcy5uZXdJdGVtVmFsdWUoKTsgXG4gICAgICAgIHRoaXMuaXNDaGVja2VkKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlVGFzaygpO1xuICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgICAgIFxuICAgIH1cblxuLy8g0LXRgdC70Lgg0LXRgdGC0Ywg0LrQsNC60LjQtS3RgtC+INC70L7QutCw0LvRjNC90YvQtSDQtNCw0L3QvdGL0LUsINC30LDQsdC40YDQsNC10Lwg0LjQtyDQvdC40YUg0LjQvdC/0YPRgiwg0Lgg0LjQvdGE0L7RgNC80LDRhtC40Y4sINC60LDQutC40LUg0LjQtyDQsNC50YLQtdC80L7QsiDQsdGL0LvQuCDRh9C10LrQvdGD0YLRi1xuICAgIHdvcmtpbmdXaXRoTG9jYWxTdG9yYWdlKCl7XG4gICAgICAgIGlmICh0aGlzLmxvY2FsICE9PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHRoaXMubG9jYWwuaW5wdXRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZEl0ZW0gPSB0aGlzLmxvY2FsLmNoZWNrZWRJdGVtO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgfX07XG5cbiAgICBzdGFydElucHV0VmFsdWUoKXtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC5mb2N1cygpO1xuICAgICAgICBsZXQgdmFsID0gdGhpcy5pbnB1dFZhbHVlO1xuICAgICAgICB0aGlzLm5ld0lucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMubmV3SW5wdXQudmFsdWUgPSB2YWw7IFxuICAgIH1cblxuICAgIG1haW5FbGVtZW50cygpe1xuICAgICAgICB0aGlzLmNoZWNrID0gdGhpcy5tYWluQ29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkTm9kZXNbMV07XG4gICAgICAgIHRoaXMubmV3SW5wdXQgPSB0aGlzLm1haW5Db250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGROb2Rlc1szXTtcbiAgICAgICAgdGhpcy5yZW1vdmUgPSB0aGlzLm1haW5Db250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGROb2Rlc1s1XTtcbiAgICB9XG5cbiAgICBtYWluQ29udGFpbmVyU3R5bGVzKCl7XG4gICAgICAgIHRoaXMubmV3SW5wdXQucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgdGhpcy5yZW1vdmUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMubmV3SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgdGhpcy5yZW1vdmUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuICAgICAgICB9KTtcblxuICAgICAgICAgdGhpcy5yZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9KTtcblxuICAgICAgICAgdGhpcy5uZXdJbnB1dC5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgbmV3RXZlbnRzKCl7XG5cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZGVsZXRlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJkZWxldGVFdmVudFwiLHtcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtjb3VudDogXCJkb25lXCJ9ICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJjaGFuZ2VFdmVudFwiLHtcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtjb3VudDogXCJkb25lXCJ9ICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZm9jdXNJbnB1dCA9IG5ldyBDdXN0b21FdmVudChcImZvY3VzSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICBkZXRhaWw6IHtjb3VudDogXCJkb25lXCJ9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4vLyDQv9C+0YHRgtGA0L7QudC60LAg0LrQsNGA0LrQsNGB0YHQsCDQsNC50YLQtdC80LBcbiAgIGh0bWxCdWlsZCgpe1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLnBhcmVudHMuYXBwZW5kQ2hpbGQodGhpcy5tYWluQ29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwibWFpbkNvbnRhaW5lclwiO1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gYCBcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbnRhaW5lcic+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjaGVjayc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nY2hlY2tib3gnIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTsgY3Vyc29yOiBwb2ludGVyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPSduZXdJbnB1dCcgdmFsdWU9JyR7dGhpcy5pbnB1dFZhbHVlfSc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdyZW1vdmUnPjxpbWcgc3JjPSdjcm9zcy5wbmcnIHN0eWxlPSdoZWlndGg6IDE4cHg7IHdpZHRoOiAyMnB4OyBkaXNwbGF5OmJsb2NrJz48L2ltZz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PmA7IFxuICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgIH1cbiAgICBcbiAgIGZvY3VzVG9kb2xpc3RJbnB1dCgpe1xuICAgICAgICB0aGlzLm5ld0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgIGlmKGUua2V5Q29kZSA9PSAxMyl7XG4gICAgICAgICAgICAgdGhpcy5yZW1vdmUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLmZvY3VzSW5wdXQpO1xuICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgIH0gICAgIFxuXG4vLyDQvNC10YLQvtC0INGD0LTQsNC70LXQvdC40Y8g0LjQtyDQlNC+0LzQsFxuICAgIHJlbW92ZVRhc2soKXtcbiAgICAgICAgdGhpcy5yZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5kZWxldGVFdmVudC5kZXRhaWwubnVtYmVyID0gdGhpcy5jb3VudGVyOyAgIFxuICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5kZWxldGVFdmVudCk7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5wYXJlbnRzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgIH0pO1xufVxuXG4vLyDRgdC70LXQtNC40Lwg0LfQsCDQuNC30LzQtdC90LXQvdC40Y/QvNC4INCyINGH0LXQutCx0L7QutGB0LDRhSwg0YDQtdC30YPQu9GM0YLQsNGCINC30LDQv9C40YHRi9Cy0LDQtdC8INCyINC60LvQsNGB0YEuXG4gICAgaXNDaGVja2VkKCl7XG4gICAgICAgIHRoaXMuY2hlY2suYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrLmZpcnN0RWxlbWVudENoaWxkLmNoZWNrZWQpe1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkSXRlbSA9IHRydWU7XG4gICAgICAgICAgICAgdGhpcy5jaGVja0l0ZW0oKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZEl0ZW0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgIHRoaXMuY2hlY2tJdGVtKCk7XG4gICAgICAgICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuLy8g0LzQtdGC0L7QtCDQuNC30LzQtdC90LXQvdC40Y8gaW5wdXRWYWx1ZSDQv9GA0Lgg0LXQs9C+INC40LfQvNC10L3QtdC90LjQuCDQvdCwINGF0L7QtNGDXG4gICAgbmV3SXRlbVZhbHVlKCl7XG4gICAgICAgIHRoaXMubmV3SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5jaGFuZ2VFdmVudC5kZXRhaWwubnVtYmVyID0gdGhpcy5jb3VudGVyOyBcbiAgICAgICAgdGhpcy5jaGFuZ2VFdmVudC5kZXRhaWwudmFsdWUgPSB0aGlzLm5ld0lucHV0LnZhbHVlO1xuICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5jaGFuZ2VFdmVudCk7XG4gICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbi8vINC10YHQu9C4INCyINC60LvQsNGB0YHQtSDRgdGC0LDRgtGD0YEg0YfQtdC60LHQvtC60YHQsCBjaGVja2VkIC0g0L/RgNC40LzQtdC90Y/QtdC8INGB0YLQuNC70LgsINC4INC90LDQvtCx0L7RgNC+0YJcbiAgICBjaGVja0l0ZW0oKXtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZEl0ZW0pe1xuICAgICAgICB0aGlzLmNoZWNrLmNsYXNzTmFtZSA9IFwiY2hlY2tlZGNoZWNrXCI7XG4gICAgICAgIHRoaXMubmV3SW5wdXQuY2xhc3NOYW1lID0gXCJjaGVja2VkXCI7XG4gICAgICAgIHRoaXMucmVtb3ZlLmNsYXNzTmFtZSA9IFwiY2hlY2tlZHJlbW92ZVwiO1xuICAgICAgICB0aGlzLmNoZWNrLmZpcnN0RWxlbWVudENoaWxkLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgIHRoaXMucGFyZW50cy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGVjay5jbGFzc05hbWUgPSBcImNoZWNrXCI7XG4gICAgICAgIHRoaXMubmV3SW5wdXQuY2xhc3NOYW1lID0gXCJuZXdJbnB1dFwiO1xuICAgICAgICB0aGlzLnJlbW92ZS5jbGFzc05hbWUgPSBcInJlbW92ZVwiO1xuICAgICAgICB0aGlzLnBhcmVudHMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgICAgICB9XG4gICAgfTsgIFxuXG4gICAgfVxuXG5cblxuICAgXG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdG9kb2xpc3RpdGVtLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=