'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Autocomplete = function () {
    function Autocomplete(arr, input, parents) {
        _classCallCheck(this, Autocomplete);

        this.data = arr;
        this.data2 = [];
        this.inputs = input;
        this.par = parents;
    }

    //этот метод срабатывает при инициации


    _createClass(Autocomplete, [{
        key: 'initAutocomplete',
        value: function initAutocomplete() {
            var _this = this;

            console.log(this);
            this.inputs.addEventListener('focus', function () {
                _this.blur();
                _this.getData2();
                _this.allCities();
                console.log(_this);
                _this.yourChoise();
            });
            //метод работает с удалением списков при клике на пустое место    
            this.removeList();
            //метод показывает города по совпадениям, выводит алерт, и наоборот, 'нет совпадений' - если они не найдены.
            this.inputs.addEventListener('keyup', function () {
                _this.keyUpFat();
            });
        }

        // делаю из одного массива отсортированный второй

    }, {
        key: 'getData2',
        value: function getData2() {
            for (var key in this.data) {
                this.data2.push(this.data[key]);
            };

            this.data2.sort();
            //это невидимая (пока еще видимая)строка без ссылки
            this.data2.unshift("No matches");
            return this.data2;
        }

        //генерация списка

    }, {
        key: 'allCities',
        value: function allCities() {
            // очищает поле при клике на инпут
            this.clean();
            var ul = document.createElement('ul');
            ul.id = "ull";
            this.par.appendChild(ul);
            for (var key in this.data2) {
                var newBox = document.createElement('li');
                if (key === "0") {
                    // если это первый элемент, то вставляется некликабельным
                    newBox.innerHTML = "" + this.data2[key] + "";
                    ul.appendChild(newBox); //генерирует 
                    continue;
                }
                newBox.innerHTML = "<a href='#'>" + this.data2[key] + "</a>"; //генерация спика 
                ul.appendChild(newBox);
            }
            var ar = document.getElementsByTagName('li');
            ar[0].style.display = "none";
        }
    }, {
        key: 'removeList',
        value: function removeList() {
            var _this2 = this;

            var doc = document.getElementById('ull');
            var a = document.getElementById('aa');
            var b = document.getElementById('bb');
            var del = document.getElementById('del');
            // при клике куда угодно кроме инпута и списка очищает масссив и список
            document.addEventListener('click', function (e) {
                if (e.target !== b && e.target !== a && e.target !== doc && e.target !== del) {
                    _this2.blur();
                    _this2.rem();
                    _this2.inputs.style.border = "2px solid  #E3E3E3";
                }
            });
        }

        //ищет совпадения и убирает все города кроме 5, выводит алерт при клике

    }, {
        key: 'keyUpFat',
        value: function keyUpFat() {
            var filter = void 0,
                ul = void 0,
                li = void 0,
                a = void 0,
                i = void 0;
            filter = this.inputs.value.toUpperCase();
            li = document.getElementsByTagName("li");
            var counter = 0; // счетчики, чтобы отлавливать события
            var counter2 = 0;
            for (i = 1; i < li.length; i++) {
                a = li[i].getElementsByTagName("a")[0]; // перебираем список
                if (a.innerHTML.toUpperCase().indexOf(filter) > -1 && counter < 6) {
                    // если он находит совпадение и в списке меньше 6 элементов
                    li[i].style.display = "block"; // он его выводит и считает + 1 в счетчик
                    counter++;
                } else if (this.inputs.value == "") {
                    for (var j = 1; j < li.length; j++) {
                        // возвращает обратно лист из 5 элементов - если удаляем буквы/ весь лист - если удаляем все буквы
                        li[j].style.display = "block";
                    }
                } else {

                    li[i].style.display = "none"; // если не совпадает, то просто делаем невидимым текущий блок, и на его место приходит соедующий блок, который проходит цикл заново
                }
            }

            for (var k = 0; k < li.length; k++) {
                if (li[k].style.display == "none") {
                    counter2++; //считает сколько элементов скрыто (надо бы сделать отдельный метод)
                }
            }
            if (counter2 > 250) {
                // если все =>

                this.inputs.style.border = "2px solid #FF4C4C";
                li[0].style.display = "block"; //показывает скрытый первый элемент(нет совпадений), и подсвечивает красным
            } else {
                this.inputs.style.border = "2px solid  #E3E3E3";
                li[0].style.display = "none"; // если появляется хоть один элемент списка, то он обратно прячет скрытый элемент, и убирает подсветку
            }
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.data2 = []; //очищение массива
        }
    }, {
        key: 'clean',
        value: function clean() {
            this.inputs.style.border = "2px solid  #E3E3E3"; //инпут цвета по дефолту
            this.inputs.value = ""; //очищение инпута
        }
    }, {
        key: 'yourChoise',
        value: function yourChoise() {
            var _this3 = this;

            this.blur(); // очищаем массив
            var result = void 0;
            var a = document.getElementsByTagName('a');

            var _loop = function _loop(j) {
                a[j].addEventListener('click', function () {
                    //cлушаем каждый элемент списка
                    _this3.inputs.onfocus = true; // и реагируем
                    _this3.inputs.value = a[j].innerText; // вставляем его имя в инпут
                    result = _this3.inputs.value;
                    alert(result); // берем из инпута это же значение (надо исправить, а то повторение)
                });
            };

            for (var j = 0; j <= a.length; j++) {
                _loop(j);
            }
        }
    }, {
        key: 'rem',
        value: function rem() {
            document.getElementById('ull').remove(); // удаление списка
        }
    }]);

    return Autocomplete;
}();

;