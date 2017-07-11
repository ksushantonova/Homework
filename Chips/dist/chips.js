'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chips = function (_Autocomplete) {
    _inherits(Chips, _Autocomplete);

    function Chips(arr, input, parents) {
        _classCallCheck(this, Chips);

        var _this = _possibleConstructorReturn(this, (Chips.__proto__ || Object.getPrototypeOf(Chips)).call(this, arr, input, parents));

        _this.chips = [];
        _this.initChips();
        return _this;
    }

    // инициализация класса


    _createClass(Chips, [{
        key: 'initChips',
        value: function initChips() {
            var _this2 = this;

            //смотрит есть ли чипсы при загрузке и убирает         
            this.inputs.addEventListener('focus', function () {
                if (document.getElementById('chips') !== null) {
                    _this2.removeChips();
                }
                //список по городам                
                _this2.blur();
                _this2.getData2();
                _this2.allCities();
                _this2.createDiv(); // генерация чипсов
            });
            this.removeList();

            this.inputs.addEventListener('keyup', function () {
                _this2.keyUpFat(); //толстая функция для клавиатуры(добавить по пробелу);
            });
        }
        //делает так что все города слушают клик на них, и если поймают, то создают чипсу

    }, {
        key: 'createDiv',
        value: function createDiv() {
            var _this3 = this;

            var a = document.getElementsByTagName('a');

            var _loop = function _loop(j) {
                a[j].addEventListener('click', function () {
                    _this3.inputs.value = a[j].innerText;
                    _this3.createChips();
                });
            };

            for (var j = 0; j <= a.length; j++) {
                _loop(j);
            }
        }
    }, {
        key: 'createChips',
        value: function createChips() {
            console.log(this.chips);
            //поготовка к генерации
            var container = document.createElement('div');
            container.id = 'chips';
            this.par.appendChild(container);
            this.chips.unshift(this.inputs.value);
            // super.rem();
            for (var i = 0; i < this.chips.length; i++) {
                //создание чипсов 
                var newDiv = document.createElement('div');
                newDiv.className = "newDiv";
                var del = document.createElement('div');
                del.innerHTML = "<img src='cross.png' style='heigth: 20px; width: 20px'></img>";
                del.className = "del";
                var text = document.createElement('div');
                text.className = "text";
                var container2 = document.createElement('div');
                container2.className = "con";
                container2.id = i;
                text.innerHTML = this.chips[i];
                container2.appendChild(newDiv);
                newDiv.appendChild(text);
                newDiv.appendChild(del);
                container.appendChild(container2);
            }
            this.cleanChips();
        }
    }, {
        key: 'cleanChips',
        value: function cleanChips() {
            var _this4 = this;

            // ставим слушатели на все крестики            
            var con = document.querySelectorAll('.del');
            con.forEach(function (key) {
                key.addEventListener('click', function () {
                    key.parentNode.remove(); //удаляет чипс при нажатии на крестик
                    // очищаем массив (потому что при удалении чипсы индексы остаются яте же самые )
                    _this4.chips = [];
                    //и создаем вместо него другой массив из того, что осталось                    
                    var val = document.querySelectorAll(".newDiv");
                    for (var i = 0; i < val.length; i++) {
                        _this4.chips.unshift(val[i].innerText);
                    }
                    //на всякий пожарный                     
                    console.log(_this4.chips);
                    if (_this4.chips.length === 0) {
                        _this4.chips = [];
                    };
                });
            });
        }
    }, {
        key: 'removeChips',
        value: function removeChips() {
            document.getElementById('chips').remove();
        }
    }]);

    return Chips;
}(Autocomplete);

exports.default = Chips;