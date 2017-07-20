// import {Todolist} from './todolist.js';
// console.log("done");

// 3)Реализовать сохранение/чтение, используя LocalStorage, всех ToDoList и их айтемов:
// - при загрузке страницы проверять наличие сохраненных данных и строить по ним ToDoList с айтемами, если данных нет, то выводить только один пустой ToDoList (edited)
//починить чекед айтем
// переписать тудулист чтобы он не был колбасой

const htmlframe = ` 
		<div style="display:flex; flex-direction:column">
		<div style="display:flex; flex-direction:row">
		<div style="width:25px; height:25px; cursor:pointer; padding: 0 0 0 9px"><img src='del.png' style='heigth: 23px; width: 23px'></img></div>
	 <div class="header" contenteditable="true" style="width:382px">Blabla</div>	
	 	<div  style="width:25px;cursor:pointer; height:25px; padding: 5px 0 0 0;"><img src='all.png' style='heigth: 23px; width: 23px'></img></div>
	 	</div>
        <div class="underdiv">
            <div class="cross"><img src='cross.svg' style='heigth: 18px; width: 18px'></img></div>
            <input class="input" type="text">
            <button class="but">DO</button>
         </div> 
         </div>
         <div class="items"></div>  
                    `

let container = document.getElementById('flexed');
new BuildItem(htmlframe);