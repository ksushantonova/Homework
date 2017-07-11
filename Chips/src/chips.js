export default class Chips extends Autocomplete {


        constructor(arr, input, parents){
            super(arr, input, parents);
            this.chips = [];
            this.initChips();
        }

           

// инициализация класса
        initChips(){   
            
//смотрит есть ли чипсы при загрузке и убирает         
            this.inputs.addEventListener('focus', () => {
                if(document.getElementById('chips') !== null){ 
                     this.removeChips();
                }
 //список по городам                
                this.blur();
                this.getData2();
                this.allCities();
                this.createDiv();  // генерация чипсов
            })
                this.removeList();

         this.inputs.addEventListener('keyup',
    () => {        
        this.keyUpFat(); //толстая функция для клавиатуры(добавить по пробелу);

    });
}
//делает так что все города слушают клик на них, и если поймают, то создают чипсу
        createDiv(){
        let a = document.getElementsByTagName('a'); 
        for (let j = 0; j <= a.length; j++){
            a[j].addEventListener('click', () => {  
                    this.inputs.value = a[j].innerText;
                    this.createChips();
                })
            }

        }

        createChips(){
            console.log(this.chips);
            //поготовка к генерации
                  let container = document.createElement('div');
                        container.id = 'chips'; 
                        this.par.appendChild(container);
                        this.chips.unshift(this.inputs.value);
                        // super.rem();
                        for(let i = 0; i < this.chips.length; i++){ 
                            //создание чипсов 
                            let newDiv = document.createElement('div');
                            newDiv.className = "newDiv";
                            let del = document.createElement('div');
                            del.innerHTML = "<img src='cross.png' style='heigth: 20px; width: 20px'></img>";
                            del.className = "del";
                            let text = document.createElement('div');
                            text.className = "text";
                            let container2 = document.createElement('div');
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

        cleanChips(){ 
// ставим слушатели на все крестики            
             let con = document.querySelectorAll('.del'); 
             con.forEach( (key) => {
                key.addEventListener('click', () => {
                    key.parentNode.remove(); //удаляет чипс при нажатии на крестик
// очищаем массив (потому что при удалении чипсы индексы остаются яте же самые )
                    this.chips = [];
//и создаем вместо него другой массив из того, что осталось                    
                    let val = document.querySelectorAll(".newDiv");
                    for (let i = 0; i < val.length; i++){
                        this.chips.unshift(val[i].innerText);
                    }
//на всякий пожарный                     
                    console.log(this.chips);
                    if (this.chips.length === 0){
                        this.chips = [];
                    };
                })
            })
    }
    
        removeChips(){
            document.getElementById('chips').remove();

        }

     }