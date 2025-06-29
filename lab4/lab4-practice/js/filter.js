const filterBtn = document.getElementById('filterBtn');

function filterCars() {
  const name = document.getElementById('filterName').value.trim().toLowerCase();
  const brand = document.getElementById('filterManufacturer').value.trim().toLowerCase();

  const priceMin = Number(document.getElementById('filterPriceMin').value);
  const priceMax = Number(document.getElementById('filterPriceMax').value);

  const yearMin = Number(document.getElementById('filterYearMin').value);
  const yearMax = Number(document.getElementById('filterYearMax').value);

  const powerMin = Number(document.getElementById('filterPowerMin').value);
  const powerMax = Number(document.getElementById('filterPowerMax').value);

  const speedMin = Number(document.getElementById('filterSpeedMin').value);
  const speedMax = Number(document.getElementById('filterSpeedMax').value);

  const accelMin = Number(document.getElementById('filterAccelMin').value);
  const accelMax = Number(document.getElementById('filterAccelMax').value);

  function inRange(value, min, max) {
    if (!min && !max) return true;
    if (!min) return value <= max;
    if (!max) return value >= min;
    return value >= min && value <= max;
  }

  currentData = carsData.filter(car => {
    return (
      (name === '' || car.name.toLowerCase().includes(name)) &&
      (brand === '' || car.brand.toLowerCase().includes(brand)) &&
      inRange(car.price, priceMin, priceMax) &&
      inRange(car.year, yearMin, yearMax) &&
      inRange(car.power, powerMin, powerMax) &&
      inRange(car.maxSpeed, speedMin, speedMax) &&
      inRange(car.acceleration, accelMin, accelMax)
    );
  });
  sortCars();
  renderTable(currentData);

  const groupKey = document.querySelector('input[name="Xvalue"]:checked')?.value;
  const mode = Array.from(document.querySelectorAll('input[name="result"]:checked'))
                    .map(el => el.value);
  const chartType = document.getElementById('chartType').value;
  d3.select('#graph').selectAll("*").remove();
  if (mode.length > 0) {
    if (chartType === "points") {
      drawGraph(currentData, groupKey, mode);
    } else if (chartType === "bar") {
      drawHistogram(currentData, groupKey, mode);
    } else if (chartType === "line") {
      drawLineGraph(currentData, groupKey, mode);
    }
  }
}
document.getElementById('resetFilterBtn').addEventListener('click', () => {
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

  const groupKey = document.querySelector('input[name="Xvalue"]:checked')?.value;
  const mode = Array.from(document.querySelectorAll('input[name="result"]:checked')).map(el => el.value);
  const chartType = document.getElementById('chartType').value;

  d3.select('#graph').selectAll("*").remove();

  if (groupKey && mode.length > 0) {
    if (chartType === "points") {
      drawGraph(currentData, groupKey, mode);
    } else if (chartType === "bar") {
      drawHistogram(currentData, groupKey, mode);
    } else if (chartType === "line") {
      drawLineGraph(currentData, groupKey, mode);
    }
  }
});


filterBtn.addEventListener('click', filterCars);
