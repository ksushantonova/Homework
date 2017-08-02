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

console.log("done");

// 3)Реализовать сохранение/чтение, используя LocalStorage, всех ToDoList и их айтемов:
// - при загрузке страницы проверять наличие сохраненных данных и строить по ним ToDoList с айтемами, если данных нет, то выводить только один пустой ToDoList (edited)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {

    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {

    console.log('Registration failed with ' + error);
  });
}

let flexed = document.getElementById('flexed');
new __WEBPACK_IMPORTED_MODULE_0__builditem_js__["a" /* BuildItem */](flexed);

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
            console.log('watching');
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
        let parent = this.mainFrame;
      this.allLists.push(new __WEBPACK_IMPORTED_MODULE_0__todolist_js__["a" /* Todolist */]( parent, this.counter++, localData, this.watch));
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
        this.parent = parent; // mainFrame
        this.tasks = [];
        this.listCounter = counter;
        this.taskCounter = 0;
        this.makeList();
    }

  
// созлание нового айтема
    makeList(){
        this.makeFrame();
        this.mainElements();
        this.getHeader();
        this.newEvents();
        this.workingWithLocalStorage();
        this.inputs();  
        this.initEvents();
        this.removeList();
        this.deleteAllEvents();
        this.doneallItems();
        this.parent.dispatchEvent(this.watch);

      };

      makeFrame(){
         this.parent.innerHTML = ` 
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
        let header = this.parent.childNodes[1].childNodes[1].childNodes[1];
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
           this.parent.dispatchEvent(this.watch);

    };

// выясняет, сколько заданий было в локалсторейдж, и строит такое же количество 
     buildLocalTask(){
        this.local.tasks.forEach(item => {
            this.buildTask(item);
        });
        this.parent.dispatchEvent(this.watch);
            
        };

    inputs(){

        //    this.input.addEventListener("change", () => {
        //     this.buildTask(null);
        // }); 

        this.input.addEventListener("keyup", (e) => {
             this.buildTask(null);
           //  if(e.keyCode == 13){
           //  this.buildTask(null);
           // };
        });
        this.parent.dispatchEvent(this.watch);

    }

// ловим ивенты удаления, и изменения в айтемх
    initEvents(){
         this.temporaryData = [];
         this.parent.addEventListener("deleteEvent", (event) => {
            this.getNumber(event);
            this.tasks.splice(this.temporaryData[1], 1);
      });             

        this.parent.addEventListener("changeEvent", (event) => {
            this.getNumber(event);
            this.temporaryData[0].inputValue = event.detail.value;
        });  

        this.parent.addEventListener("focusInput", () => {
            this.input.focus();
        }); 
        };

// при клике на мусорный бак удаляются все айтемы
     deleteAllEvents(){
        this.deleteAllButton.addEventListener("click", () => {
        this.tasks = [];
        this.parent.childNodes[1].childNodes[3].innerHTML = "";
        this.parent.dispatchEvent(this.watch);

        })

     }   
 // инициализация всех кастомивентов которые относятся к этому классу
     newEvents(){

          this.deleteLists = new CustomEvent("deleteLists",{
                detail: {count: "done"}      
        });

    };

    mainElements(){
        this.input = this.parent.childNodes[1].childNodes[5].childNodes[1];
        this.allDoneButton = this.parent.childNodes[1].childNodes[1].childNodes[3];
        this.deleteAllButton = this.parent.childNodes[1].childNodes[1].childNodes[5];
        this.parent.dispatchEvent(this.watch);

    };
// строительство нового айтема
    buildTask(localData){
      this.tasks.push(new __WEBPACK_IMPORTED_MODULE_0__todolistitem_js__["a" /* ToDoListItem */](this.input.value, this.parent.childNodes[1].childNodes[3], this.taskCounter++,localData, this.watch));
      this.cleanValue();
      this.parent.childNodes[1].childNodes[3].lastElementChild.childNodes[1].childNodes[3].focus();
      };
// метод наблюдает за любыми изменениями заголовка, и списывает их в массив
    getHeader(){
      let header = this.parent.childNodes[1].childNodes[1].childNodes[1];
      this.header = header.innerText;
      header.addEventListener("input", () => {
            this.header = header.innerText;
             this.parent.dispatchEvent(this.watch);
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
        this.input.value = "";
    };

// удаление листа 
    removeList(){
    this.input.nextElementSibling.addEventListener("click", () => {
    this.deleteLists.detail.number = this.listCounter; 
    this.parent.dispatchEvent(this.deleteLists);
    this.parent.remove();
     this.parent.dispatchEvent(this.watch); 
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
            this.parent = parent; // items
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
        this.mainContainerStyles();
        this.startInputValue();
        this.focusTodolistInput();
        this.checkItem();
        this.newItemValue(); 
        this.isChecked();
        this.removeTask();
        this.parent.parentNode.parentNode.dispatchEvent(this.watch);
           
    }

// если есть какие-то локальные данные, забираем из них инпут, и информацию, какие из айтемов были чекнуты
    workingWithLocalStorage(){
        if (this.local !== null){
            this.inputValue = this.local.inputValue;
            this.checkedItem = this.local.checkedItem;
            this.parent.parentNode.parentNode.dispatchEvent(this.watch);

    }};

    startInputValue(){
        this.newInput.value = this.inputValue;
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
        this.parent.appendChild(this.mainContainer);
        this.mainContainer.className = "mainContainer";
        this.mainContainer.innerHTML = ` 
                     <div class='container'>
                        <div class='check'>
                        <input type='checkbox' style='position:relative; cursor: pointer'>
                        </div>
                        <input class='newInput' value='${this.inputValue}'>
                        <div class='remove'><img src='cross.png' style='heigth: 18px; width: 22px; display:block'></img></div>
                  </div>`; 
        this.parent.parentNode.parentNode.dispatchEvent(this.watch);
        }
    
   focusTodolistInput(){
        this.newInput.addEventListener("keyup", (e) => {
             if(e.keyCode == 13){
             this.remove.style.display = "none";
             this.parent.parentNode.parentNode.dispatchEvent(this.focusInput);
           };
        });
   }     

// метод удаления из Дома
    removeTask(){
      console.log(this.remove);
        this.remove.addEventListener("click", () => {
        this.deleteEvent.detail.number = this.counter;   
        this.parent.parentNode.parentNode.dispatchEvent(this.deleteEvent);
        this.mainContainer.remove();
        this.parent.parentNode.parentNode.dispatchEvent(this.watch);
    });
}

// следим за изменениями в чекбоксах, результат записываем в класс.
    isChecked(){
        this.check.addEventListener('change', () => {
             if (this.check.firstElementChild.checked){
            this.checkedItem = true;
             this.checkItem();
            this.parent.parentNode.parentNode.dispatchEvent(this.watch);
        } else {
            this.checkedItem = false;
               this.checkItem();
               this.parent.parentNode.parentNode.dispatchEvent(this.watch);
            }
        });
    }

// метод изменения inputValue при его изменении на ходу
    newItemValue(){
        this.newInput.addEventListener("input", () => {
        this.changeEvent.detail.number = this.counter; 
        this.changeEvent.detail.value = this.newInput.value;
        this.parent.parentNode.parentNode.dispatchEvent(this.changeEvent);
        this.parent.parentNode.parentNode.dispatchEvent(this.watch);
        })
    }

// если в классе статус чекбокса checked - применяем стили, и наоборот
    checkItem(){
        if (this.checkedItem){
        this.check.className = "checkedcheck";
        this.newInput.className = "checked";
        this.remove.className = "checkedremove";
        this.check.firstElementChild.checked = true;
       this.parent.parentNode.parentNode.dispatchEvent(this.watch);
        } else {
        this.check.className = "check";
        this.newInput.className = "newInput";
        this.remove.className = "remove";
        this.parent.parentNode.parentNode.dispatchEvent(this.watch);
            }
    };  

    }
/* harmony export (immutable) */ __webpack_exports__["a"] = ToDoListItem;




   




/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTIzMzg2OGU2N2JjYmUwYTM2NzciLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9idWlsZGl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RvZG9saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy90b2RvbGlzdGl0ZW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RrQjtBQUNsQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsNkU7Ozs7Ozs7O0FDakJpQjs7O0FBR2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esa0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSztBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtGO0FBQ0E7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LHdFQUF3RTtBQUN4RTtBQUNBLHlEQUF5RCxnQkFBZ0I7QUFDekUscUZBQXFGLGFBQWE7QUFDbEcsMEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxJOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTTs7QUFFQTtBQUFBO0FBQUEiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDkyMzM4NjhlNjdiY2JlMGEzNjc3IiwiaW1wb3J0IHtCdWlsZEl0ZW19IGZyb20gJy4vYnVpbGRpdGVtLmpzJztcbmNvbnNvbGUubG9nKFwiZG9uZVwiKTtcblxuLy8gMynQoNC10LDQu9C40LfQvtCy0LDRgtGMINGB0L7RhdGA0LDQvdC10L3QuNC1L9GH0YLQtdC90LjQtSwg0LjRgdC/0L7Qu9GM0LfRg9GPIExvY2FsU3RvcmFnZSwg0LLRgdC10YUgVG9Eb0xpc3Qg0Lgg0LjRhSDQsNC50YLQtdC80L7Qsjpcbi8vIC0g0L/RgNC4INC30LDQs9GA0YPQt9C60LUg0YHRgtGA0LDQvdC40YbRiyDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0YHQvtGF0YDQsNC90LXQvdC90YvRhSDQtNCw0L3QvdGL0YUg0Lgg0YHRgtGA0L7QuNGC0Ywg0L/QviDQvdC40LwgVG9Eb0xpc3Qg0YEg0LDQudGC0LXQvNCw0LzQuCwg0LXRgdC70Lgg0LTQsNC90L3Ri9GFINC90LXRgiwg0YLQviDQstGL0LLQvtC00LjRgtGMINGC0L7Qu9GM0LrQviDQvtC00LjQvSDQv9GD0YHRgtC+0LkgVG9Eb0xpc3QgKGVkaXRlZClcblxuaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcbiAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJy9zdy5qcycpLnRoZW4oZnVuY3Rpb24ocmVnKSB7XG5cbiAgICBjb25zb2xlLmxvZygnUmVnaXN0cmF0aW9uIHN1Y2NlZWRlZC4gU2NvcGUgaXMgJyArIHJlZy5zY29wZSk7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG5cbiAgICBjb25zb2xlLmxvZygnUmVnaXN0cmF0aW9uIGZhaWxlZCB3aXRoICcgKyBlcnJvcik7XG4gIH0pO1xufVxuXG5sZXQgZmxleGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsZXhlZCcpO1xubmV3IEJ1aWxkSXRlbShmbGV4ZWQpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7VG9kb2xpc3R9IGZyb20gJy4vdG9kb2xpc3QuanMnO1xuXG5cbmV4cG9ydCBjbGFzcyBCdWlsZEl0ZW0ge1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQpe1xuICAgIHRoaXMuY29udGFpbmVyID0gcGFyZW50O1xuXHRcdHRoaXMuYWxsTGlzdHMgPSBbXTtcblx0XHR0aGlzLmNvdW50ZXIgPSAwO1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9O1xuXG5cbiAgICBpbml0KCl7XG4gICAgICAvLyBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5uZXdFdmVudCgpO1xuICAgICAgICB0aGlzLmJ1aWxkU3RvcmFnZUxpc3RzKCk7XG4gICAgXHQgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbHVzJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBcdFx0dGhpcy5idWlsZEl0ZW1IdG1sKCk7XG4gICAgICAgIHRoaXMudG9Eb0xpc3RJbml0KCk7XG4gICAgICAgIHRoaXMuY3VzdG9tRXZlbnQoKTtcbiAgICBcdH0pO1xuICAgICAgICBcbiAgICAgIH07XG5cbi8vINC30LDQsdC40YDQsNC10Lwg0LLRgdC1INGH0YLQviDQtdGB0YLRjCDQuNC3INC70L7QutCw0LvRgdGC0L7RgNC10LnQtNC20LAsINC4INCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0YfRgtC+INGC0LDQvCDQstC90YPRgtGA0LggLSDQv9C+0LrQsNC30YvQstCw0LXQvCDQu9C+0LrQsNC7LCDQuNC70Lgg0L/Rg9GB0YLQvtC5INCw0LnRgtC10LwuXG5cbiAgICBidWlsZFN0b3JhZ2VMaXN0cygpe1xuICAgICAgdGhpcy5sb2NhbFZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGEnKTtcbiAgICAgIGlmICh0aGlzLmxvY2FsVmFsdWUgIT09IG51bGwgJiYgdGhpcy5sb2NhbFZhbHVlLmxlbmd0aCA+IDMpeyBcbiAgICAgICAgdGhpcy5sb2NhbEZyYW1lID0gSlNPTi5wYXJzZSh0aGlzLmxvY2FsVmFsdWUpO1xuICAgICAgICB0aGlzLmxvY2FsRnJhbWUuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgdGhpcy5idWlsZEl0ZW1IdG1sKCk7XG4gICAgICAgIHRoaXMuYnVpbGRJbml0KGxpc3QpO1xuICAgICAgICB0aGlzLmN1c3RvbUV2ZW50KCk7XG4gICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxvY2FsVmFsdWUgIT09IG51bGwgJiYgdGhpcy5sb2NhbFZhbHVlLmxlbmd0aCA8IDMpe1xuICAgICAgICB0aGlzLmJ1aWxkSXRlbUh0bWwoKTtcbiAgICAgICAgdGhpcy5idWlsZEluaXQobnVsbCk7XG4gICAgICAgIHRoaXMuY3VzdG9tRXZlbnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgIHRoaXMuYnVpbGRJdGVtSHRtbCgpO1xuICAgICAgIHRoaXMuYnVpbGRJbml0KG51bGwpO1xuICAgICAgIHRoaXMuY3VzdG9tRXZlbnQoKTtcbiAgICB9IFxuICB9XG5cblxuLy8g0LzQtdGC0L7QtCDRgdC+0LfQtNCw0LXRgiDQutCw0YDQutCw0YHRgSDQtNC70Y8g0L3QvtCy0L7Qs9C+INC70LjRgdGC0LBcbiAgICBidWlsZEl0ZW1IdG1sKCl7XG4gICAgXHQgIHRoaXMubWFpbkZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgXHQgIHRoaXMubWFpbkZyYW1lLmNsYXNzTmFtZSA9ICdtYWluJztcbiAgICAgICAgdGhpcy5jb250YWluZXIuaW5zZXJ0QmVmb3JlKHRoaXMubWFpbkZyYW1lLCB0aGlzLmNvbnRhaW5lci5jaGlsZE5vZGVzWzFdKTsgIFxuICAgIH07XG5cbi8vINC80LXRgtC+0LQg0LvQvtCy0LjRgiDQstGB0LUg0LrQsNGB0YLQvtC80LjQstC10L3RgtGLLCDQutC+0YLQvtGA0YvQtSDQvdGD0LbQvdC+INGB0LvQvtCy0LjRgtGMINCyINGN0YLQvtC8INC60LvQsNGB0YHQtSBcbiAgICBjdXN0b21FdmVudCgpe1xuICAgICAgICAgIHRoaXMudGVtcG9yYXJ5TGlzdCA9IFtdO1xuLy8g0YHQvtCx0YvRgtC40LUg0YPQtNCw0LvQtdC90LjRjyDQu9C40YHRgtCwXG4gICAgXHQgIHRoaXMubWFpbkZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJkZWxldGVMaXN0c1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLmdldE51bWJlcihldmVudCk7XG4gICAgICAgICAgdGhpcy5hbGxMaXN0cy5zcGxpY2UodGhpcy50ZW1wb3JhcnlMaXN0WzFdLCAxKTsgICAgICAgICBcbiAgICAgIH0pOyBcbi8vINGB0L7QsdGL0YLQuNC1IHdhdGNoIC0g0LzQs9C90L7QstC10L3QvdCw0Y8g0L/QtdGA0LXQt9Cw0L/QuNGB0Ywg0LjQt9C80LXQvdC10L3QuNC5INCyINC70L7QutCw0LtcbiAgICAgICAgdGhpcy5tYWluRnJhbWUuYWRkRXZlbnRMaXN0ZW5lcihcIndhdGNoXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53cml0ZVN0b3JhZ2UoKTtcbiAgICAgICAgICAgIHRoaXMucGFyc2VTdG9yYWdlKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnd2F0Y2hpbmcnKTtcbiAgICAgICAgfSk7ICBcbiAgICB9O1xuXG4gICAgbmV3RXZlbnQoKXtcblxuICAgICAgICB0aGlzLndhdGNoID0gbmV3IEN1c3RvbUV2ZW50KFwid2F0Y2hcIix7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7Y291bnQ6IFwiZG9uZVwifVxuICAgICAgICB9KTtcbiAgICB9XG5cbi8vINC80LXRgtC+0LQsINC60L7RgtC+0YDRi9C5INGB0YDQsNCy0L3QuNCy0LDQtdGCINC40L3RhNC+0YDQvNCw0YbQuNGOINC+INC90L7QvNC10YDQtSDQu9C40YHRgtCwLCDQutC+0YLQvtGA0LDRjyDQv9GA0LjRiNC70LAg0LjQtyDQvdC40LbQvdC10LPQviDQutC70LDRgdGB0LAsINGBINC90L7QvNC10YDQvtC8INC70LjRgdGC0LBcbi8vINCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC80LDRgdGB0LjQsiDRgSDQvdCw0LnQtNC10L3QvdGL0Lwg0Y3Qu9C10LzQtdC90YLQvtC8LCDQuCDQtdCz0L4g0LjQvdC00LXQutGB0L7QvC5cbiAgICBnZXROdW1iZXIodGhpc0V2ZW50KXtcbiAgICAgICAgdGhpcy50ZW1wb3JhcnlMaXN0ID0gW107XG4gICAgICAgIHRoaXMuYWxsTGlzdHMuZm9yRWFjaCgobGlzdCwgaSkgPT4ge1xuICAgICAgICBpZiAobGlzdC5saXN0Q291bnRlciA9PSB0aGlzRXZlbnQuZGV0YWlsLm51bWJlcil7XG4gICAgICAgIHRoaXMudGVtcG9yYXJ5TGlzdC51bnNoaWZ0KGkpO1xuICAgICAgICB0aGlzLnRlbXBvcmFyeUxpc3QudW5zaGlmdChsaXN0KTtcblxuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSk7XG4gICAgICB9O1xuLy8g0YHRgtGA0L7QuNGCINC90L7QstGL0Lkg0LvQuNGB0YJcblx0ICB0b0RvTGlzdEluaXQoKXtcbiAgICAgICAgdGhpcy5idWlsZEluaXQobnVsbCk7XG4gICAgICAgIHRoaXMud3JpdGVTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMucGFyc2VTdG9yYWdlKCk7XG4gICAgIH07XG5cbi8vINC80LXRgtC+0LQg0L/QtdGA0LXQt9Cw0L/QuNGB0YvQstCw0LXRgiDQu9C+0LrQsNC70YHRgtC+0YDQtdC50LTQtlxuICAgICB3cml0ZVN0b3JhZ2UoKXtcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuYWxsTGlzdHNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmFsbExpc3RzKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJkYXRhXCIsIHRoaXMuYWxsTGlzdHNTdHJpbmcpO1xuICAgICB9O1xuLy8g0LzQtdGC0L7QtCDQt9Cw0LHQuNGA0LDQtdGCINC70L7QutCw0LvRjNC90YvQtSDQtNCw0L3QvdGL0LUg0Lgg0LTQtdC70LDQtdGCINC40YUg0L/RgNC40LPQvtC00L3Ri9C8INC00LvRjyDRgNCw0LHQvtGC0YtcbiAgICAgcGFyc2VTdG9yYWdlKCl7XG4gICAgICAgIHRoaXMubG9jYWxWYWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhJyk7XG4gICAgICAgIHRoaXMubG9jYWxGcmFtZSA9IEpTT04ucGFyc2UodGhpcy5sb2NhbFZhbHVlKTtcblxuICAgICB9O1xuXG4vLyDRgdC+0LfQtNCw0L3QuNC1INC90L7QstC+0LPQviDQutC70LDRgdGB0LAgVG9kb2xpc3QgKGxvY2FsRGF0YSDRgdGC0LDQstC40YLRjCDQtdGB0LvQuCDQtdGB0YLRjCDQu9C+0LrQsNC70YHRgtC+0YDQtdC50LTQtilcbiAgICAgYnVpbGRJbml0KGxvY2FsRGF0YSl7XG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLm1haW5GcmFtZTtcbiAgICAgIHRoaXMuYWxsTGlzdHMucHVzaChuZXcgVG9kb2xpc3QoIHBhcmVudCwgdGhpcy5jb3VudGVyKyssIGxvY2FsRGF0YSwgdGhpcy53YXRjaCkpO1xuICAgICB9O1xuXHRcbn07XG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYnVpbGRpdGVtLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuXG5pbXBvcnQge1RvRG9MaXN0SXRlbX0gZnJvbSAnLi90b2RvbGlzdGl0ZW0uanMnO1xuXG4gZXhwb3J0IGNsYXNzIFRvZG9saXN0IHtcblxuICAgIGNvbnN0cnVjdG9yKHBhcmVudCwgY291bnRlciwgbG9jYWwsIHdhdGNoKXtcbiAgICAgICAgdGhpcy53YXRjaCA9IHdhdGNoO1xuICAgICAgICB0aGlzLmxvY2FsID0gbG9jYWw7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50OyAvLyBtYWluRnJhbWVcbiAgICAgICAgdGhpcy50YXNrcyA9IFtdO1xuICAgICAgICB0aGlzLmxpc3RDb3VudGVyID0gY291bnRlcjtcbiAgICAgICAgdGhpcy50YXNrQ291bnRlciA9IDA7XG4gICAgICAgIHRoaXMubWFrZUxpc3QoKTtcbiAgICB9XG5cbiAgXG4vLyDRgdC+0LfQu9Cw0L3QuNC1INC90L7QstC+0LPQviDQsNC50YLQtdC80LBcbiAgICBtYWtlTGlzdCgpe1xuICAgICAgICB0aGlzLm1ha2VGcmFtZSgpO1xuICAgICAgICB0aGlzLm1haW5FbGVtZW50cygpO1xuICAgICAgICB0aGlzLmdldEhlYWRlcigpO1xuICAgICAgICB0aGlzLm5ld0V2ZW50cygpO1xuICAgICAgICB0aGlzLndvcmtpbmdXaXRoTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMuaW5wdXRzKCk7ICBcbiAgICAgICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdCgpO1xuICAgICAgICB0aGlzLmRlbGV0ZUFsbEV2ZW50cygpO1xuICAgICAgICB0aGlzLmRvbmVhbGxJdGVtcygpO1xuICAgICAgICB0aGlzLnBhcmVudC5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgICB9O1xuXG4gICAgICBtYWtlRnJhbWUoKXtcbiAgICAgICAgIHRoaXMucGFyZW50LmlubmVySFRNTCA9IGAgXG4gICAgPGRpdiBjbGFzcz1cImhlYWRcIj5cbiAgICA8ZGl2IGNsYXNzPVwidG9kb0hlYWRlclwiPlxuICAgPGRpdiBjbGFzcz1cImhlYWRlclwiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiA+QmxhYmxhPC9kaXY+IFxuICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDoyNXB4OyBoZWlnaHQ6MjVweDsgY3Vyc29yOnBvaW50ZXI7IHBhZGRpbmc6IDE2cHggMCAwIDEzcHg7XCI+PGltZyBzcmM9J2FsbDIucG5nJyBzdHlsZT0naGVpZ3RoOiAyM3B4OyB3aWR0aDogMjNweCc+PC9pbWc+PC9kaXY+XG4gICAgPGRpdiAgc3R5bGU9XCJ3aWR0aDoyNXB4O2N1cnNvcjpwb2ludGVyOyBoZWlnaHQ6MjVweDsgcGFkZGluZzogMTZweCAxNXB4IDAgMTZweDtcIj48aW1nIHNyYz0nZGVsMi5wbmcnIHN0eWxlPSdoZWlndGg6IDIzcHg7IHdpZHRoOiAyM3B4Jz48L2ltZz48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiaXRlbXNcIj48L2Rpdj4gIFxuICAgICAgICA8ZGl2IGNsYXNzPVwidW5kZXJkaXZcIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIiArIE5ldyB0YXNrXCIvPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyb3NzXCI+PGltZyBzcmM9J2Nyb3NzLnBuZycgc3R5bGU9J2hlaWd0aDogMzBweDsgd2lkdGg6IDIycHgnPjwvaW1nPjwvZGl2PlxuICAgICAgICAgPC9kaXY+IFxuICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICB9XG4gICAgXG4vLyDRgNCw0LHQvtGC0LAg0YEg0LTQsNC90L3Ri9C80Lgg0LjQtyDQu9C+0LrQsNC70YHRgtC+0YDQtdC50LTQtigg0LfQsNCx0LjRgNCw0LXRgiDQt9Cw0LPQvtC70L7QstC+0LosINC4INC30LDQv9GD0YHQutCw0LXRgiDQvNC10YLQvtC0INGB0YLRgNC+0LjRgtC10LvRjNGB0YLQstCwINC30LDQtNCw0L3QuNC5KVxuICAgIHdvcmtpbmdXaXRoTG9jYWxTdG9yYWdlKCl7XG4gICAgICBpZiAodGhpcy5sb2NhbCAhPT0gbnVsbCl7XG4gICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLnBhcmVudC5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXTtcbiAgICAgICAgaGVhZGVyLmlubmVyVGV4dCA9ICh0aGlzLmxvY2FsLmhlYWRlcik7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gdGhpcy5sb2NhbC5oZWFkZXI7XG4gICAgICAgIHRoaXMuYnVpbGRMb2NhbFRhc2soKTtcbiAgICAgIH1cblxuICAgIH07XG4gICAgXG5cbiAgICBkb25lYWxsSXRlbXMoKXtcbiAgICAgICAgICAgdGhpcy5hbGxEb25lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgICAgIHRhc2suY2hlY2tlZEl0ZW0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRhc2suY2hlY2suZmlyc3RFbGVtZW50Q2hpbGQuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGFzay5jaGVja0l0ZW0oKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICB9KTtcbiAgICAgICAgICAgdGhpcy5wYXJlbnQuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcblxuICAgIH07XG5cbi8vINCy0YvRj9GB0L3Rj9C10YIsINGB0LrQvtC70YzQutC+INC30LDQtNCw0L3QuNC5INCx0YvQu9C+INCyINC70L7QutCw0LvRgdGC0L7RgNC10LnQtNC2LCDQuCDRgdGC0YDQvtC40YIg0YLQsNC60L7QtSDQttC1INC60L7Qu9C40YfQtdGB0YLQstC+IFxuICAgICBidWlsZExvY2FsVGFzaygpe1xuICAgICAgICB0aGlzLmxvY2FsLnRhc2tzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkVGFzayhpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGFyZW50LmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfTtcblxuICAgIGlucHV0cygpe1xuXG4gICAgICAgIC8vICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLmJ1aWxkVGFzayhudWxsKTtcbiAgICAgICAgLy8gfSk7IFxuXG4gICAgICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgdGhpcy5idWlsZFRhc2sobnVsbCk7XG4gICAgICAgICAgIC8vICBpZihlLmtleUNvZGUgPT0gMTMpe1xuICAgICAgICAgICAvLyAgdGhpcy5idWlsZFRhc2sobnVsbCk7XG4gICAgICAgICAgIC8vIH07XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBhcmVudC5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgfVxuXG4vLyDQu9C+0LLQuNC8INC40LLQtdC90YLRiyDRg9C00LDQu9C10L3QuNGPLCDQuCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0LDQudGC0LXQvNGFXG4gICAgaW5pdEV2ZW50cygpe1xuICAgICAgICAgdGhpcy50ZW1wb3JhcnlEYXRhID0gW107XG4gICAgICAgICB0aGlzLnBhcmVudC5hZGRFdmVudExpc3RlbmVyKFwiZGVsZXRlRXZlbnRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdldE51bWJlcihldmVudCk7XG4gICAgICAgICAgICB0aGlzLnRhc2tzLnNwbGljZSh0aGlzLnRlbXBvcmFyeURhdGFbMV0sIDEpO1xuICAgICAgfSk7ICAgICAgICAgICAgIFxuXG4gICAgICAgIHRoaXMucGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VFdmVudFwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2V0TnVtYmVyKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMudGVtcG9yYXJ5RGF0YVswXS5pbnB1dFZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9KTsgIFxuXG4gICAgICAgIHRoaXMucGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c0lucHV0XCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgfSk7IFxuICAgICAgICB9O1xuXG4vLyDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC80YPRgdC+0YDQvdGL0Lkg0LHQsNC6INGD0LTQsNC70Y/RjtGC0YHRjyDQstGB0LUg0LDQudGC0LXQvNGLXG4gICAgIGRlbGV0ZUFsbEV2ZW50cygpe1xuICAgICAgICB0aGlzLmRlbGV0ZUFsbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgICAgIHRoaXMucGFyZW50LmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1szXS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB0aGlzLnBhcmVudC5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgICAgIH0pXG5cbiAgICAgfSAgIFxuIC8vINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINCy0YHQtdGFINC60LDRgdGC0L7QvNC40LLQtdC90YLQvtCyINC60L7RgtC+0YDRi9C1INC+0YLQvdC+0YHRj9GC0YHRjyDQuiDRjdGC0L7QvNGDINC60LvQsNGB0YHRg1xuICAgICBuZXdFdmVudHMoKXtcblxuICAgICAgICAgIHRoaXMuZGVsZXRlTGlzdHMgPSBuZXcgQ3VzdG9tRXZlbnQoXCJkZWxldGVMaXN0c1wiLHtcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtjb3VudDogXCJkb25lXCJ9ICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIG1haW5FbGVtZW50cygpe1xuICAgICAgICB0aGlzLmlucHV0ID0gdGhpcy5wYXJlbnQuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzVdLmNoaWxkTm9kZXNbMV07XG4gICAgICAgIHRoaXMuYWxsRG9uZUJ1dHRvbiA9IHRoaXMucGFyZW50LmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzNdO1xuICAgICAgICB0aGlzLmRlbGV0ZUFsbEJ1dHRvbiA9IHRoaXMucGFyZW50LmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzVdO1xuICAgICAgICB0aGlzLnBhcmVudC5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgfTtcbi8vINGB0YLRgNC+0LjRgtC10LvRjNGB0YLQstC+INC90L7QstC+0LPQviDQsNC50YLQtdC80LBcbiAgICBidWlsZFRhc2sobG9jYWxEYXRhKXtcbiAgICAgIHRoaXMudGFza3MucHVzaChuZXcgVG9Eb0xpc3RJdGVtKHRoaXMuaW5wdXQudmFsdWUsIHRoaXMucGFyZW50LmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1szXSwgdGhpcy50YXNrQ291bnRlcisrLGxvY2FsRGF0YSwgdGhpcy53YXRjaCkpO1xuICAgICAgdGhpcy5jbGVhblZhbHVlKCk7XG4gICAgICB0aGlzLnBhcmVudC5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbM10ubGFzdEVsZW1lbnRDaGlsZC5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbM10uZm9jdXMoKTtcbiAgICAgIH07XG4vLyDQvNC10YLQvtC0INC90LDQsdC70Y7QtNCw0LXRgiDQt9CwINC70Y7QsdGL0LzQuCDQuNC30LzQtdC90LXQvdC40Y/QvNC4INC30LDQs9C+0LvQvtCy0LrQsCwg0Lgg0YHQv9C40YHRi9Cy0LDQtdGCINC40YUg0LIg0LzQsNGB0YHQuNCyXG4gICAgZ2V0SGVhZGVyKCl7XG4gICAgICBsZXQgaGVhZGVyID0gdGhpcy5wYXJlbnQuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMV07XG4gICAgICB0aGlzLmhlYWRlciA9IGhlYWRlci5pbm5lclRleHQ7XG4gICAgICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyLmlubmVyVGV4dDtcbiAgICAgICAgICAgICB0aGlzLnBhcmVudC5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgfSk7XG4gICAgICBcbiAgICB9XG4vLyDQvNC10YLQvtC0INGB0YDQsNCy0L3QuNCy0LDQtdGCINC90L7QvNC10YDQsCDQsiBkZXRhaWxzINC4INCyINC80LDRgdGB0LjQstC1LCDQvdCwINCy0YvRhdC+0LTQtSDQv9C+0LvRg9GH0LDQtdC8INC80LDRgdGB0LjQsiDQuNC3INGN0LvQtdC80LXQvdGC0LAg0Lgg0LXQs9C+INC40L3QtNC10LrRgdCwXG4gICAgIGdldE51bWJlcih0aGlzRXZlbnQpe1xuICAgICAgICAgICAgdGhpcy50ZW1wb3JhcnlEYXRhID0gW107XG4gICAgICAgICAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2ssIGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0YXNrLmNvdW50ZXIgPT0gdGhpc0V2ZW50LmRldGFpbC5udW1iZXIpe1xuICAgICAgICAgICAgdGhpcy50ZW1wb3JhcnlEYXRhLnVuc2hpZnQoaSk7XG4gICAgICAgICAgICB0aGlzLnRlbXBvcmFyeURhdGEudW5zaGlmdCh0YXNrKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuXG4gICAgY2xlYW5WYWx1ZSgpe1xuICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gXCJcIjtcbiAgICB9O1xuXG4vLyDRg9C00LDQu9C10L3QuNC1INC70LjRgdGC0LAgXG4gICAgcmVtb3ZlTGlzdCgpe1xuICAgIHRoaXMuaW5wdXQubmV4dEVsZW1lbnRTaWJsaW5nLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdGhpcy5kZWxldGVMaXN0cy5kZXRhaWwubnVtYmVyID0gdGhpcy5saXN0Q291bnRlcjsgXG4gICAgdGhpcy5wYXJlbnQuZGlzcGF0Y2hFdmVudCh0aGlzLmRlbGV0ZUxpc3RzKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmUoKTtcbiAgICAgdGhpcy5wYXJlbnQuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTsgXG4gIH0pO1xuICAgXG4gIH07XG59O1xuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90b2RvbGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbiBleHBvcnQgY2xhc3MgVG9Eb0xpc3RJdGVtIHtcbiAgICAgICAgY29uc3RydWN0b3IgKHZhbHVlLCBwYXJlbnQsIGNvdW50ZXIsIHRhc2ssIHdhdGNoKXtcbi8v0L/QvtC70YPRh9Cw0LXQvCDQstGB0LUg0LjQstC10L3RgtGLINGH0LXRgNC10Lcg0YHQstC+0LnRgdGC0LLQsCwg0LAg0YLQsNC6INC20LUg0L3Rg9C20L3Ri9C1INC90LDQvCDQtNCw0L3QvdGL0LVcbiAgICAgICAgICAgIHRoaXMud2F0Y2ggPSB3YXRjaDtcbiAgICAgICAgICAgIHRoaXMubG9jYWwgPSB0YXNrO1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDsgLy8gaXRlbXNcbiAgICAgICAgICAgIHRoaXMuY291bnRlciA9IGNvdW50ZXI7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRJdGVtID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgfVxuXG4vLyDRgdGC0YDQvtC40Lwg0L3QvtCy0YvQuSDQsNC50YLQtdC8XG4gICAgaW5pdCgpe1xuICAgICAgICB0aGlzLm5ld0V2ZW50cygpO1xuICAgICAgICB0aGlzLndvcmtpbmdXaXRoTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMuaHRtbEJ1aWxkKCk7XG4gICAgICAgIHRoaXMubWFpbkVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lclN0eWxlcygpO1xuICAgICAgICB0aGlzLnN0YXJ0SW5wdXRWYWx1ZSgpO1xuICAgICAgICB0aGlzLmZvY3VzVG9kb2xpc3RJbnB1dCgpO1xuICAgICAgICB0aGlzLmNoZWNrSXRlbSgpO1xuICAgICAgICB0aGlzLm5ld0l0ZW1WYWx1ZSgpOyBcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVUYXNrKCk7XG4gICAgICAgIHRoaXMucGFyZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuICAgICAgICAgICBcbiAgICB9XG5cbi8vINC10YHQu9C4INC10YHRgtGMINC60LDQutC40LUt0YLQviDQu9C+0LrQsNC70YzQvdGL0LUg0LTQsNC90L3Ri9C1LCDQt9Cw0LHQuNGA0LDQtdC8INC40Lcg0L3QuNGFINC40L3Qv9GD0YIsINC4INC40L3RhNC+0YDQvNCw0YbQuNGOLCDQutCw0LrQuNC1INC40Lcg0LDQudGC0LXQvNC+0LIg0LHRi9C70Lgg0YfQtdC60L3Rg9GC0YtcbiAgICB3b3JraW5nV2l0aExvY2FsU3RvcmFnZSgpe1xuICAgICAgICBpZiAodGhpcy5sb2NhbCAhPT0gbnVsbCl7XG4gICAgICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSB0aGlzLmxvY2FsLmlucHV0VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRJdGVtID0gdGhpcy5sb2NhbC5jaGVja2VkSXRlbTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KHRoaXMud2F0Y2gpO1xuXG4gICAgfX07XG5cbiAgICBzdGFydElucHV0VmFsdWUoKXtcbiAgICAgICAgdGhpcy5uZXdJbnB1dC52YWx1ZSA9IHRoaXMuaW5wdXRWYWx1ZTtcbiAgICB9XG5cbiAgICBtYWluRWxlbWVudHMoKXtcbiAgICAgICAgdGhpcy5jaGVjayA9IHRoaXMubWFpbkNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZE5vZGVzWzFdO1xuICAgICAgICB0aGlzLm5ld0lucHV0ID0gdGhpcy5tYWluQ29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkTm9kZXNbM107XG4gICAgICAgIHRoaXMucmVtb3ZlID0gdGhpcy5tYWluQ29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkTm9kZXNbNV07XG4gICAgfVxuXG4gICAgbWFpbkNvbnRhaW5lclN0eWxlcygpe1xuICAgICAgICB0aGlzLm5ld0lucHV0LnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLm5ld0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgIHRoaXMucmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgIHRoaXMubmV3SW5wdXQucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIG5ld0V2ZW50cygpe1xuXG4gICAgICAgIFxuICAgICAgICB0aGlzLmRlbGV0ZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiZGVsZXRlRXZlbnRcIix7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7Y291bnQ6IFwiZG9uZVwifSAgICAgIFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNoYW5nZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiY2hhbmdlRXZlbnRcIix7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7Y291bnQ6IFwiZG9uZVwifSAgICAgIFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvY3VzSW5wdXQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJmb2N1c0lucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgZGV0YWlsOiB7Y291bnQ6IFwiZG9uZVwifVxuICAgICAgICB9KTtcblxuICAgIH1cblxuLy8g0L/QvtGB0YLRgNC+0LnQutCwINC60LDRgNC60LDRgdGB0LAg0LDQudGC0LXQvNCwXG4gICBodG1sQnVpbGQoKXtcbiAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5tYWluQ29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwibWFpbkNvbnRhaW5lclwiO1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gYCBcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbnRhaW5lcic+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjaGVjayc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nY2hlY2tib3gnIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTsgY3Vyc29yOiBwb2ludGVyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPSduZXdJbnB1dCcgdmFsdWU9JyR7dGhpcy5pbnB1dFZhbHVlfSc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdyZW1vdmUnPjxpbWcgc3JjPSdjcm9zcy5wbmcnIHN0eWxlPSdoZWlndGg6IDE4cHg7IHdpZHRoOiAyMnB4OyBkaXNwbGF5OmJsb2NrJz48L2ltZz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PmA7IFxuICAgICAgICB0aGlzLnBhcmVudC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICAgICAgfVxuICAgIFxuICAgZm9jdXNUb2RvbGlzdElucHV0KCl7XG4gICAgICAgIHRoaXMubmV3SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09IDEzKXtcbiAgICAgICAgICAgICB0aGlzLnJlbW92ZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgdGhpcy5wYXJlbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5mb2N1c0lucHV0KTtcbiAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICB9ICAgICBcblxuLy8g0LzQtdGC0L7QtCDRg9C00LDQu9C10L3QuNGPINC40Lcg0JTQvtC80LBcbiAgICByZW1vdmVUYXNrKCl7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnJlbW92ZSk7XG4gICAgICAgIHRoaXMucmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZGVsZXRlRXZlbnQuZGV0YWlsLm51bWJlciA9IHRoaXMuY291bnRlcjsgICBcbiAgICAgICAgdGhpcy5wYXJlbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy5kZWxldGVFdmVudCk7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5wYXJlbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgfSk7XG59XG5cbi8vINGB0LvQtdC00LjQvCDQt9CwINC40LfQvNC10L3QtdC90LjRj9C80Lgg0LIg0YfQtdC60LHQvtC60YHQsNGFLCDRgNC10LfRg9C70YzRgtCw0YIg0LfQsNC/0LjRgdGL0LLQsNC10Lwg0LIg0LrQu9Cw0YHRgS5cbiAgICBpc0NoZWNrZWQoKXtcbiAgICAgICAgdGhpcy5jaGVjay5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2suZmlyc3RFbGVtZW50Q2hpbGQuY2hlY2tlZCl7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRJdGVtID0gdHJ1ZTtcbiAgICAgICAgICAgICB0aGlzLmNoZWNrSXRlbSgpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRJdGVtID0gZmFsc2U7XG4gICAgICAgICAgICAgICB0aGlzLmNoZWNrSXRlbSgpO1xuICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuLy8g0LzQtdGC0L7QtCDQuNC30LzQtdC90LXQvdC40Y8gaW5wdXRWYWx1ZSDQv9GA0Lgg0LXQs9C+INC40LfQvNC10L3QtdC90LjQuCDQvdCwINGF0L7QtNGDXG4gICAgbmV3SXRlbVZhbHVlKCl7XG4gICAgICAgIHRoaXMubmV3SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5jaGFuZ2VFdmVudC5kZXRhaWwubnVtYmVyID0gdGhpcy5jb3VudGVyOyBcbiAgICAgICAgdGhpcy5jaGFuZ2VFdmVudC5kZXRhaWwudmFsdWUgPSB0aGlzLm5ld0lucHV0LnZhbHVlO1xuICAgICAgICB0aGlzLnBhcmVudC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLmNoYW5nZUV2ZW50KTtcbiAgICAgICAgdGhpcy5wYXJlbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQodGhpcy53YXRjaCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4vLyDQtdGB0LvQuCDQsiDQutC70LDRgdGB0LUg0YHRgtCw0YLRg9GBINGH0LXQutCx0L7QutGB0LAgY2hlY2tlZCAtINC/0YDQuNC80LXQvdGP0LXQvCDRgdGC0LjQu9C4LCDQuCDQvdCw0L7QsdC+0YDQvtGCXG4gICAgY2hlY2tJdGVtKCl7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWRJdGVtKXtcbiAgICAgICAgdGhpcy5jaGVjay5jbGFzc05hbWUgPSBcImNoZWNrZWRjaGVja1wiO1xuICAgICAgICB0aGlzLm5ld0lucHV0LmNsYXNzTmFtZSA9IFwiY2hlY2tlZFwiO1xuICAgICAgICB0aGlzLnJlbW92ZS5jbGFzc05hbWUgPSBcImNoZWNrZWRyZW1vdmVcIjtcbiAgICAgICAgdGhpcy5jaGVjay5maXJzdEVsZW1lbnRDaGlsZC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICB0aGlzLnBhcmVudC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGVjay5jbGFzc05hbWUgPSBcImNoZWNrXCI7XG4gICAgICAgIHRoaXMubmV3SW5wdXQuY2xhc3NOYW1lID0gXCJuZXdJbnB1dFwiO1xuICAgICAgICB0aGlzLnJlbW92ZS5jbGFzc05hbWUgPSBcInJlbW92ZVwiO1xuICAgICAgICB0aGlzLnBhcmVudC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCh0aGlzLndhdGNoKTtcbiAgICAgICAgICAgIH1cbiAgICB9OyAgXG5cbiAgICB9XG5cblxuXG4gICBcblxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90b2RvbGlzdGl0ZW0uanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==