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

xhr.send();



class Autocomplete {

    constructor(arr, input, parents) {
        this.arr = arr;
        this.arr2 = [];
        this.inputs = input;
        this.par = parents;
    }

    getArr2() {
        for (let key in this.arr){
            this.arr2.push(this.arr[key]); // делаю из одного массива отсортированный второй
        };

        this.arr2.sort();
        this.arr2.unshift("No matches"); //это невидимая (пока еще видимая)строка без ссылки
        return this.arr2;

    }


    allCities(){
        this.inputs.addEventListener("click", () => { 
        this.clean(); // очищает поле при клике на инпут
        let ul = document.createElement('ul');             // подготовка к генерации списка
        ul.id = "ull";                              
        this.par.appendChild(ul); 
        for (let key in this.arr2){
             let newBox = document.createElement('li');
            if (key === "0"){   // если это первый элемент, то вставляется некликабельным
            newBox.innerHTML = "" + this.arr2[key] + "";
            ul.appendChild(newBox); //генерирует 
            continue;
            } 
            newBox.innerHTML = "<a href='#'>" + this.arr2[key] + "</a>"; //генерация спика
            ul.appendChild(newBox);
   
        }
            let ar = document.getElementsByTagName('li');
            ar[0].style.display = 'none';   //вот тут первая строка становится невидимой
    });
}


    removeList() {
        let doc = document.getElementById('ull');  
        document.addEventListener("click", (e) => {
         if((e.target !== (this.inputs || doc ))) {    // этот метод при клике куда угодно кроме инпута и списка очищает масссив и список
             this.arr2 = [];
             document.getElementById('ull').remove();
         }

        })
    }



    keyUpFat(){
        let filter, ul, li,a,i;
        filter = this.inputs.value.toUpperCase();
        li = document.getElementsByTagName("li");
        let counter = 0;   // счетчики, чтобы отлавливать события
        let counter2 = 0;
        for (i = 1; i < li.length; i++){
            a = li[i].getElementsByTagName("a")[0]; // перебираем список
            if ((a.innerHTML.toUpperCase().indexOf(filter) > -1) && (counter < 6) ){ // если он находит совпадение и в списке меньше 6 элементов
                li[i].style.display = "block"; // он его выводит и считает + 1 в счетчик
                counter++;
            } else if (this.inputs.value == ""){
                for (let j = 1; j < li.length; j ++){    // возвращает обратно лист из 5 элементов - если удаляем буквы/ весь лист - если удаляем все буквы
                    li[j].style.display = "block";
                }
            } else {

                li[i].style.display = "none"; // если не совпадает, то просто делаем невидимым текущий блок, и на его место приходит соедующий блок, который проходит цикл заново
            }}

            for (let k = 0; k < li.length; k++){
                if (li[k].style.display == "none"){
                    counter2++;                   //считает сколько элементов скрыто (надо бы сделать отдельный метод)
                }  
            }
            if (counter2 > 250){ // если все =>

                this.inputs.style.border = "2px solid #FF4C4C"; 
                li[0].style.display = "block"; //показывает скрытый первый элемент(нет совпадений), и подсвечивает красным
            } else {
                     this.inputs.style.border = "2px solid  #959494";
                  li[0].style.display = "none"; // если появляется хоть один элемент списка, то он обратно прячет скрытый элемент, и убирает подсветку
            }



    }

    blur(){
        this.arr2 = []; //очищение массива

    }

    clean(){
       this.inputs.style.border = "2px solid  #959494" //очищение инпута
         this.inputs.value = "";

    }



    yourChoise(){
        this.blur(); // очищаем массив
        let result;
        let a = document.getElementsByTagName('a'); //
        for (let j = 0; j <= a.length; j++){
            a[j].addEventListener('click', function(){                  //cлушаем каждый элемент списка
                     this.inputs.onfocus = true;   // и реагируем
                    this.inputs.value = a[j].innerText; // вставляем его имя в инпут
                    result =  this.inputs.value;   // берем из инпута это же значение (надо исправить, а то повторение)
                    document.getElementById('ull').remove();  // очищая при этом весь список
                    setTimeout(function(){alert(result)}, 150); // и выводим в алерт (задержка нужна чтобы список очищался быстрее алерта)
                }


            )}

    }

    rem(){
        document.getElementById('ull').remove(); // очищение самого списка
    }

};


let autocomp = document.querySelectorAll('.autocomp');
autocomp = Array.prototype.slice.call(autocomp);


autocomp.forEach(inputs => {
    let parent = inputs.parentNode;
    new Autocomplete(cities, inputs, parent);
})





// document.getElementById('input').addEventListener("focus",  // выдает полный список по алфавиту при фокусе на инпуте.
//     function(){
//         city.getArr2();    
//         city.allCities();
//         city.yourChoise();
//     });





 // document.addEventListener("click", // удаляет список при клике куда либо кроме инпута и списка (чтобы он не копировался дважды)
 //    function(){
 //        city.removeList()
 //    });


// document.getElementById('input').addEventListener("keyup",
//     function (){          // функция, которая показывает города по совпадениям, выводит алерт, и наоборот, 'нет совпадений' - если они не найдены.
//         city.keyUpFat();

//     });








   
           





 
    




