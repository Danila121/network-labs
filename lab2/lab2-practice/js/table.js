function renderTable(data) {
  const table = document.getElementById('carsTable');
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  data.forEach(car => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${car.name}</td>
      <td>${car.brand}</td>
      <td>${car.price}</td>
      <td>${car.year}</td>
      <td>${car.power}</td>
      <td>${car.maxSpeed}</td>
      <td>${car.acceleration}</td>
    `;
    tbody.appendChild(row);
  });
}

renderTable(carsData);
