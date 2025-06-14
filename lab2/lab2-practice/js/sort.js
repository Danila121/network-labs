const sortBtn = document.getElementById('sortBtn');

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
  const validSorts = sortFields.filter(s => {
    return s.field !== 'no' && !usedFields.has(s.field) && usedFields.add(s.field);
  });

  const sorted = [...carsData].sort((a, b) => {
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

  renderTable(sorted);
}
sortBtn.addEventListener('click', sortCars);