import BuildItem from './builditem';

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
  new BuildItem(flexed); 


