'use strict';

var _autocomp = require('autocomp.js');

var _autocomp2 = _interopRequireDefault(_autocomp);

var _chips = require('chips.js');

var _chips2 = _interopRequireDefault(_chips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = {};
var cities = [];
var xhr = new XMLHttpRequest(); //вытягиваю джсон файл
xhr.open('GET', 'https://crossorigin.me/http://country.io/names.json', true);
xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
        data = JSON.parse(xhr.responseText);
        for (var key in data) {
            cities.push(data[key]); // собираю для удобства все города в массив
        }
    }
};

xhr.send();

var autocomp = document.querySelectorAll('.autocomp');
autocomp = Array.prototype.slice.call(autocomp);

autocomp.forEach(function (inputs) {
    var parent = inputs.parentNode;
    // new Autocomplete(cities, inputs, parent);
    new _chips2.default(cities, inputs, parent);
});