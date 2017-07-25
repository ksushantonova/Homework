// import {Todolist} from './todolist.js';
// console.log("done");

// 3)Реализовать сохранение/чтение, используя LocalStorage, всех ToDoList и их айтемов:
// - при загрузке страницы проверять наличие сохраненных данных и строить по ним ToDoList с айтемами, если данных нет, то выводить только один пустой ToDoList (edited)

let flexed = document.getElementById('flexed');
new BuildItem(flexed);