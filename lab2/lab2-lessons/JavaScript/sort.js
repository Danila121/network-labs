/*формируем массив для сортировки по уровням вида 
  (в нашем случае в форме два уровня сортировки):
   [
    {column: номер столбца, по которому осуществляется сортировка, 
     order: порядок сортировки (true по убыванию, false по возрастанию)
    },
    {column: номер столбца, 
     order: порядок сортировки
    }
   ]
*/
let createSortArr = (data) => {
    let sortArr = [];
    
    let sortSelects = data.getElementsByTagName('select');
    
    for (let i = 0; i < sortSelects.length; i++) {   
       // получаем номер выбранной опции
        let keySort = sortSelects[i].value;
        // в случае, если выбрана опция Нет, заканчиваем формировать массив
        if (keySort == 0) {
            break;
        }
        // получаем номер значение флажка для порядка сортировки
        // имя флажка сформировано как имя поля SELECT и слова Desc
        let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;
        sortArr.push(
          {column: keySort - 1, 
           order: desc}
        ); 
    }
    return sortArr; 
};

let sortTable = (idTable, data) => {
    
    // формируем управляющий массив для сортировки
    let sortArr = createSortArr(data);
    
    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) {
        return false;
    }
    //находим нужную таблицу
    let table = document.getElementById(idTable);

    // преобразуем строки таблицы в массив 
    let rowData = Array.from(table.rows);
    
    // удаляем элемент с заголовками таблицы
    rowData.shift();
    
    //сортируем данные по возрастанию по всем уровням сортировки
    // используется массив sortArr
    
    //console.log(document.getElementById('fieldsFirstDesc').checked );
    rowData.sort((first, second) => {
        //console.log(typeof(first)); 
        for(let i in sortArr) {

            let key = sortArr[i].column;
            //console.log(sortArr[i].order);
            if (sortArr[i].order == false)
            {
                console.log(key);
                if(key == 5 || key == 4)
                {
                    
                    if (parseFloat(first.cells[key].innerHTML) > parseFloat( second.cells[key].innerHTML)) {
                        return 1;
                    } else if (parseFloat(first.cells[key].innerHTML) < parseFloat(second.cells[key].innerHTML)){
                        return -1;
                    }            
                } else {
                    if (first.cells[key].innerHTML > second.cells[key].innerHTML) {
                        return 1;
                    } else if (first.cells[key].innerHTML < second.cells[key].innerHTML){
                        return -1;
                    }
                }

            } else if (sortArr[i].order){
                if(key == 5 || key == 4)
                    {
                        
                        if (parseFloat(first.cells[key].innerHTML) < parseFloat( second.cells[key].innerHTML)) {
                            return 1;
                        } else if (parseFloat(first.cells[key].innerHTML) > parseFloat(second.cells[key].innerHTML)){
                            return -1;
                        }            
                    } else {
                        if (first.cells[key].innerHTML < second.cells[key].innerHTML) {
                            return 1;
                        } else if (first.cells[key].innerHTML > second.cells[key].innerHTML){
                            return -1;
                        }
                    }
            }
            //if( document.getElementById('fieldsFirstDesc').checked = false)
            


        }
        return 0;
    });
    
    clearTable('list');
    
	// формируем заголовочную строку из ключей нулевого элемента массива
		
    let tr = document.createElement('tr');

	for(key in buildings[0]) {
		let th = document.createElement('th');
		th.innerHTML = key;
		tr.append(th);
	}
	rowData.unshift(tr);


    rowData.forEach( item => { table.append(item)});
    //const table = document.getElementById('list');
    //table.append(rowData[0]); //console.log(rowData[0]);
    // обновить таблицу на страницу
    //...
}

function breakSort(idTable)
{

    const inputs = document.getElementById('sort').getElementsByTagName('select');
    for ( let i = 0; i < inputs.length; i++ )
    {
        inputs[i].value = 0;   
    }
    const checkboxs = document.getElementById('sort').getElementsByTagName('input');
    for ( let i = 0; i < checkboxs.length; i++ )
    {
        if(checkboxs[i].getAttribute('type') == 'checkbox') 
            checkboxs[i].checked = false;
    }
    clearTable(idTable);
    createTable(buildings, idTable);  
    filterTable(buildings,'list', document.getElementById('filter')); 
    //sortTable(idTable,document.getElementById('sort'));
    inputs[1].disAbled = true;
    
    
}