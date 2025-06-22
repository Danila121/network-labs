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
let sortTable = (idTable, dataForm) => {
  let sortArr = createSortArr(dataForm);
  if (sortArr.length === 0) return false;

  let table = document.getElementById(idTable);
  let rows = Array.from(table.rows);
  let header = rows.shift();

  rows.sort((a, b) => {
    for (let rule of sortArr) {
      let col = rule.column;
      let aVal = a.cells[col].innerHTML;
      let bVal = b.cells[col].innerHTML;

      let aNum = parseFloat(aVal);
      let bNum = parseFloat(bVal);
      let isNum = !isNaN(aNum) && !isNaN(bNum);

      if (isNum) {
        if (aNum > bNum) return rule.order ? -1 : 1;
        if (aNum < bNum) return rule.order ? 1 : -1;
      } else {
        if (aVal > bVal) return rule.order ? -1 : 1;
        if (aVal < bVal) return rule.order ? 1 : -1;
      }
    }
    return 0;
  });

  table.innerHTML = '';
  table.appendChild(header);
  rows.forEach(row => table.appendChild(row));
};

function resetSort() {
  let sortForm = document.getElementById('sort');

  let selects = sortForm.getElementsByTagName('select');
  for (let i = 0; i < selects.length; i++) {
    selects[i].value = '0';
    if (i > 0) selects[i].disabled = true;
  }

  let checkboxes = sortForm.querySelectorAll('input[type=checkbox]');
  checkboxes.forEach(chk => (chk.checked = false));
  
  clearTable('list');
  createTable(buildings, 'list'); 
}
