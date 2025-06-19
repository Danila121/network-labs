//выводим таблицу на страницу
let createTable = (data, idTable) => {
	// находим таблицу
	let table = document.getElementById(idTable);
	
	// формируем заголовочную строку из ключей нулевого элемента массива
	let tr = document.createElement('tr');

	for(key in data[0]) {
		let th = document.createElement('th');
		th.innerHTML = key;
		tr.append(th);
	}

	table.append(tr);	
	
	// самостоятельно сформировать строки таблицы на основе массива data
	data.forEach((item) => {
    // создать новую строку таблицы tr
    let row = document.createElement('tr');
    // перебрать ключи очередного элемента массива
    for(let el in item){
      // создать элемент td
      let cell = document.createElement('td');
      // занести в него соответствующее значение из массива 
      cell.innerHTML = item[el];
      // добавить элемент td к строке
      row.appendChild(cell);
    };
    // строку добавить в таблицу
    table.appendChild(row);
	});	
}
let clearTable = (idTable) => {
  let table = document.getElementById(idTable);
  table.innerHTML = '';
}