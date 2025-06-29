const sortBtn = document.getElementById('sortBtn');

function updateSortSelects() {
  const selects = [
    document.getElementById('sort1'),
    document.getElementById('sort2'),
    document.getElementById('sort3')
  ];
  const optionsList = [
    { value: 'no', text: 'Нет' },
    { value: 'name', text: 'Название' },
    { value: 'brand', text: 'Производитель' },
    { value: 'price', text: 'Цена' },
    { value: 'year', text: 'Год производства' },
    { value: 'power', text: 'Мощность двигателя' },
    { value: 'maxSpeed', text: 'Максимальная скорость' }
  ];

  let selectedValues = new Set();

  for (let i = 0; i < selects.length; i++) {
    const select = selects[i];
    let currentValue = select.value;

    if (currentValue !== 'no' && selectedValues.has(currentValue)) {
      currentValue = 'no';
    }

    select.innerHTML = '';

    optionsList.forEach(opt => {
      if (selectedValues.has(opt.value) && opt.value !== currentValue && opt.value !== 'no') {
        return;
      }
      let optionElem = document.createElement('option');
      optionElem.value = opt.value;
      optionElem.text = opt.text;
      select.appendChild(optionElem);
    });

    select.value = currentValue;

    if (currentValue !== 'no') {
      selectedValues.add(currentValue);
    }
  }

  selects[1].disabled = selects[0].value === 'no';
  selects[2].disabled = selects[1].value === 'no' || selects[1].disabled;
}


function sortCars() {
  const sortFields = [
    {
      field: document.getElementById('sort1').value,
      desc: document.getElementById('desc1').checked
    },
    {
      field: document.getElementById('sort2').value,
      desc: document.getElementById('desc2').checked
    },
    {
      field: document.getElementById('sort3').value,
      desc: document.getElementById('desc3').checked
    }
  ];

  const usedFields = new Set();
  const validSorts = sortFields.filter(s => s.field !== 'no' && !usedFields.has(s.field) && usedFields.add(s.field));

  const sorted = [...currentData].sort((a, b) => {
    for (let { field, desc } of validSorts) {
      let valueA = a[field];
      let valueB = b[field];

      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();

      if (valueA < valueB) return desc ? 1 : -1;
      if (valueA > valueB) return desc ? -1 : 1;
    }
    return 0;
  });

  currentData = sorted;
  renderTable(currentData);
}
document.getElementById('resetSortBtn').addEventListener('click', () => {
  document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
    input.value = '';
  });
  document.querySelectorAll('#sort1, #sort2, #sort3').forEach(select => {
    select.value = 'no';
  });
  document.querySelectorAll('#desc1, #desc2, #desc3').forEach(cb => {
    cb.checked = false;
  });
  currentData = [...carsData];
  renderTable(currentData);
});

document.getElementById('sort1').addEventListener('change', updateSortSelects);
document.getElementById('sort2').addEventListener('change', updateSortSelects);
document.getElementById('sort3').addEventListener('change', updateSortSelects);

sortBtn.addEventListener('click', sortCars);

updateSortSelects();
