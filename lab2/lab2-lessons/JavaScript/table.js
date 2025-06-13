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
    const tr1 = document.createElement('tr');
    for(let el in item)
		{
			const td = document.createElement('td');
			td.innerHTML = item[el];
			tr1.appendChild(td);
		}
		table.appendChild(tr1)
	});	
}

let clearTable = (idTable) => {
	const table = document.getElementById(idTable);

	for (let i = table.childNodes.length - 1 ; i >= 0 ; i--)
		table.childNodes[i].remove();
	
}