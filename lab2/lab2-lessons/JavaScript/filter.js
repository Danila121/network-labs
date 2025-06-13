// устанавливаем соответствие между полями формы и столбцами таблицы
let correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
}


let dataFilter = (dataForm) => {
    
    let dictFilter = {};
    // перебираем все элементы формы с фильтрами
    
    for(let j = 0; j < dataForm.elements.length; j++) {

        // выделяем очередной элемент формы
        let item = dataForm.elements[j];
        
        // получаем значение элемента
        let valInput = item.value;

        // если поле типа text - приводим его значение к нижнему регистру
        if (item.type == "text") {
            valInput = valInput.toLowerCase();
        } 
        if (item.type == "number") {
            if (valInput != '')
                valInput = parseFloat(valInput);
            else if ( valInput == '' && item.id.indexOf('From') != -1)
                valInput = - Infinity;                
            else if ( valInput == '' && item.id.indexOf('To') != -1)
                valInput =  Infinity;
        } 

        dictFilter[item.id] = valInput;
    }       
    return dictFilter;
}

// фильтрация таблицы
let filterTable = (data, idTable, dataForm) =>{
    
    // получаем данные из полей формы
    let datafilter = dataFilter(dataForm);
    
    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter(item => {

        /* в этой переменной будут "накапливаться" результаты сравнения данных
           с параметрами фильтра */
        let result = true;
        
        // строка соответствует фильтру, если сравнение всех значения из input 
        // со значением ячейки очередной строки - истина
        for(let key in item) {
            
            let val = item[key];
            
            // текстовые поля проверяем на вхождение
            if (typeof val == 'string') {
                val = item[key].toLowerCase() 
                result &&= val.indexOf(datafilter[correspond[key]]) !== -1 
            }
            else if (key == 'Год' || key == 'Высота')
                {
                    result &&= val >= datafilter[correspond[key][0]] && val <= datafilter[correspond[key][1]];
                }  
         }
         return result;
    });     
    clearTable(idTable);
    createTable(tableFilter, idTable);  
}

function clearFilter(idTable,data, dataForm){
    const inputs = dataForm.getElementsByTagName('input');
    for ( let i = 0; i < inputs.length; i++ )
    {
      
        const type = (inputs[i].getAttribute('type') );
        if ( type == 'number' || type == 'text')
        {
            inputs[i].value = '';
        }
        
    }
    clearTable(idTable);
   
    createTable(data, idTable);  
    sortTable('list',document.getElementById('sort'));
}