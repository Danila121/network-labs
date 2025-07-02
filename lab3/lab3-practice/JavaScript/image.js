// Рисуем небоскрёб с 6 окнами, относительно (0, 0)
function drawSkyscraper(svg) {
  let building = svg.append("g")
    .attr("id", "skyscraper")
    .style("stroke", "black")
    .style("stroke-width", 2)
    .style("fill", "#87CEEB"); // светло-голубой цвет здания

  // Сам небоскрёб - большой прямоугольник
  building.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 120)
    .attr("height", 300)
    .style("fill", "#4682B4"); // более темный синий

  // Рисуем 6 окон — маленькие прямоугольники
  const windowWidth = 30;
  const windowHeight = 40;
  const marginX = 15;
  const marginY = 20;
  const cols = 2;
  const rows = 3;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      building.append("rect")
        .attr("x", marginX + col * (windowWidth + marginX))
        .attr("y", marginY + row * (windowHeight + marginY))
        .attr("width", windowWidth)
        .attr("height", windowHeight)
        .style("fill", "#ADD8E6") // светло-голубой цвет окон
        .style("stroke", "black")
        .style("stroke-width", 1);
    }
  }

  return building;
}
