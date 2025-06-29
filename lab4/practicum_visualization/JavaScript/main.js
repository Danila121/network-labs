document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("toggleTableBtn");
  const table = document.getElementById("build");
  const errorMsg = document.getElementById("error-msg");
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  showTable("build", buildings);
  let isTableVisible = true;

  button.addEventListener("click", function () {
    if (isTableVisible) {
      table.innerHTML = "";
      button.textContent = "Показать таблицу";
      isTableVisible = false;
    } else {
      showTable("build", buildings);
      button.textContent = "Скрыть таблицу";
      isTableVisible = true;
    }
  });

  checkboxes.forEach((chk) => {
    chk.addEventListener("change", () => {
      hideError();
    });
  });

  document.getElementById("drawBtn").addEventListener("click", function () {
    const groupRadios = document.getElementsByName("groupKey");
    let groupKey = "Страна";
    for (const radio of groupRadios) {
      if (radio.checked) {
        groupKey = radio.value;
        break;
      }
    }

    const showMin = document.getElementById("showMin").checked;
    const showMax = document.getElementById("showMax").checked;
    const chartType = document.getElementById("chartType").value;

    if (!showMin && !showMax) {
      showError();
      return;
    }

    hideError();

    let mode;
    if (showMin && showMax) mode = "both";
    else if (showMin) mode = "min";
    else if (showMax) mode = "max";

    if (chartType === "points") {
      drawGraph(buildings, groupKey, mode); 
    } else if (chartType === "bar") {
      drawHistogram(buildings, groupKey, mode); 
    }

    document.getElementById("graph").classList.remove("hidden");
  });


  function showError() {
    errorMsg.classList.remove("hidden");
    errorMsg.classList.add("visible");
    checkboxes.forEach((chk) => chk.classList.add("error-checkbox"));
    document.getElementById("graph").classList.add("hidden");
  }

  function hideError() {
    errorMsg.classList.add("hidden");
    errorMsg.classList.remove("visible");
    checkboxes.forEach((chk) => chk.classList.remove("error-checkbox"));
  }
});
