let currentData = [...carsData];
function renderTable(data) {
  currentData = data;
  
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
renderTable(currentData);

document.getElementById("drawGraphBtn").addEventListener("click", function () {
  const groupRadios = document.getElementsByName("Xvalue");
  let groupKey = "country";
  for (const radio of groupRadios) {
    if (radio.checked) {
      groupKey = radio.value;
      break;
    }
  }

  const graphAveragePower = document.getElementById("graphAveragePower").checked;
  const graphMaxSpeed = document.getElementById("graphMaxSpeed").checked;
  const graphAccelMin = document.getElementById("graphAccelMin").checked;

  const chartType = document.getElementById("chartType").value;

  if (!graphAveragePower && !graphMaxSpeed && !graphAccelMin) {
    showError();
    return;
  }

  hideError();

  let mode = [];
  if (graphAveragePower) mode.push("power");
  if (graphMaxSpeed) mode.push("maxSpeed");
  if (graphAccelMin) mode.push("acceleration");


  if (chartType === "points") {
    drawGraph(currentData, groupKey, mode);
  } else if (chartType === "bar") {
    drawHistogram(currentData, groupKey, mode);
  } else if (chartType === "line") {
    drawLineGraph(currentData, groupKey, mode);
  }

  document.getElementById("graph").classList.remove("hidden");
});


function showError() {
  let errorMsg = document.getElementById("error-msg"); 
  errorMsg.classList.remove("hidden");
  errorMsg.classList.add("visible");

  ["graphAveragePower", "graphMaxSpeed", "graphAccelMin"].forEach(id => {
    const checkbox = document.getElementById(id);
    checkbox.classList.add("error-checkbox");
  });
  document.getElementById("graph").classList.add("hidden");
}


function hideError() {
  let errorMsg = document.getElementById("error-msg");
  errorMsg.classList.add("hidden");
  errorMsg.classList.remove("visible");

  ["graphAveragePower", "graphMaxSpeed", "graphAccelMin"].forEach(id => {
    const checkbox = document.getElementById(id);
    checkbox.classList.remove("error-checkbox");
  });
}

["graphAveragePower", "graphMaxSpeed", "graphAccelMin"].forEach(id => {
  const checkbox = document.getElementById(id);
  checkbox.addEventListener("change", () => {
    if (document.getElementById("graphAveragePower").checked || document.getElementById("graphMaxSpeed").checked || document.getElementById("graphAccelMin").checked) {
      hideError();
    }
  });
});
