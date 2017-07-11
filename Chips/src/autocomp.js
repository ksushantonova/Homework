class Autocomplete {

    constructor(arr, input, parents) {
        this.data = arr;
        this.data2 = [];
        this.inputs = input;
        this.par = parents;
    }

    //этот метод срабатывает при инициации
    initAutocomplete() {  
    console.log(this);                                    
        this.inputs.addEventListener('focus', () => {
               this.blur()
               this.getData2();
               this.allCities();
               console.log(this);
               this.yourChoise();

               

        });
  //метод работает с удалением списков при клике на пустое место    
        this.removeList();
  //метод показывает города по совпадениям, выводит алерт, и наоборот, 'нет совпадений' - если они не найдены.
        this.inputs.addEventListener('keyup',
    () => {        
        this.keyUpFat();

    });


    }


// делаю из одного массива отсортированный второй
    getData2() {
        for (let key in this.data){
            this.data2.push(this.data[key]); 
        };

        this.data2.sort();
//это невидимая (пока еще видимая)строка без ссылки
        this.data2.unshift("No matches"); 
        return this.data2;

    }

//генерация списка
    allCities(){
// очищает поле при клике на инпут
        this.clean(); 
        let ul = document.createElement('ul');      
        ul.id = "ull";                              
        this.par.appendChild(ul); 
        for (let key in this.data2){
             let newBox = document.createElement('li');
            if (key === "0"){   // если это первый элемент, то вставляется некликабельным
            newBox.innerHTML = "" + this.data2[key] + "";
            ul.appendChild(newBox); //генерирует 
            continue;
            } 
            newBox.innerHTML = "<a href='#'>" + this.data2[key] + "</a>"; //генерация спика 
            ul.appendChild(newBox);
   
        }
            let ar = document.getElementsByTagName('li');
            ar[0].style.display = "none";
    };




    removeList() {

        let doc = document.getElementById('ull'); 
        let a = document.getElementById('aa');
        let b = document.getElementById('bb');
        let del = document.getElementById('del');
// при клике куда угодно кроме инпута и списка очищает масссив и список
       document.addEventListener('click', (e) => {
         if((e.target !== b && e.target !== a && e.target !== doc && e.target !== del )) { 
           this.blur();
           this.rem();
           this.inputs.style.border = "2px solid  #E3E3E3";
         }
        });

    }


//ищет совпадения и убирает все города кроме 5, выводит алерт при клике
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
                     this.inputs.style.border = "2px solid  #E3E3E3";
                  li[0].style.display = "none"; // если появляется хоть один элемент списка, то он обратно прячет скрытый элемент, и убирает подсветку
            }



    }

    blur(){
        this.data2 = []; //очищение массива

    }

    clean(){
       this.inputs.style.border = "2px solid  #E3E3E3"; //инпут цвета по дефолту
       this.inputs.value = "";  //очищение инпута

    }




    yourChoise(){
        this.blur(); // очищаем массив
        let result;
        let a = document.getElementsByTagName('a'); 
        for (let j = 0; j <= a.length; j++){
            a[j].addEventListener('click', () => {  //cлушаем каждый элемент списка
                     this.inputs.onfocus = true;   // и реагируем
                    this.inputs.value = a[j].innerText; // вставляем его имя в инпут
                    result =  this.inputs.value; 
                    alert(result);  // берем из инпута это же значение (надо исправить, а то повторение)
                }


            )}

    }

    rem(){
        document.getElementById('ull').remove(); // удаление списка
    }

   

};

