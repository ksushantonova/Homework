


let data = {};
let cities = [];
let xhr = new XMLHttpRequest(); //вытягиваю джсон файл
xhr.open('GET', 'https://crossorigin.me/http://country.io/names.json', true);
xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
        data = JSON.parse(xhr.responseText);
        for (let key in data){
            cities.push(data[key]); // собираю для удобства все города в массив
        }
    }
};

xhr.send ();
 
import {Autocomplete} from 'autocomp.js';
import {Chips} from 'chips.js'; 

let autocomp = document.querySelectorAll('.autocomp');
autocomp = Array.prototype.slice.call(autocomp);

autocomp.forEach(inputs => {
    let parent = inputs.parentNode;
    // new Autocomplete(cities, inputs, parent);
    new Chips(cities, inputs, parent);

});













   
           





 
    




