// Входные данные:
//   data - исходный массив (например, buildings)
//   key - поле, по которому осуществляется группировка

function createArrGraph(data, key, mode) {  
  
    groupObj = d3.group(data, d => d[key]);

    let arrGraph =[];
    for(let entry of groupObj) {
      const heights = entry[1].map(d => d['Высота']);
      const min = d3.min(heights);
      const max = d3.max(heights);

      let values;
      if (mode === "min") {
          values = [min];     
      } else if (mode === "max") {
          values = [max];     
      } else {
          values = [min, max]; 
      }
      arrGraph.push({ labelX: entry[0], values: values });
    }
     return arrGraph;
}

function drawGraph(data, keyX, mode) { 
        
    // создаем массив для построения графика
    const arrGraph = createArrGraph(data, keyX, mode);
    
    let svg = d3.select("svg")  
    svg.selectAll('*').remove();

   // создаем словарь с атрибутами области вывода графика
   attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
   }
       
    // создаем шкалы преобразования и выводим оси
    const [scX, scY] = createAxis(svg, arrGraph, attr_area);
    
    // рисуем график
    createChart(svg, arrGraph, scX, scY, attr_area, ["blue", "red"])        
}

function createAxis(svg, data, attr_area){
    // находим интервал значений, которые нужно отложить по оси OY 
    // максимальное и минимальное значение и максимальных высот по каждой стране
    const allValues = data.flatMap(d => d.values);
    const [min, max] = d3.extent(allValues);

    // функция интерполяции значений на оси
    // по оси ОХ текстовые значения
     let scaleX = d3.scaleBand()
                    .domain(data.map(d => d.labelX).sort((a, b) => +a - +b))
                    .range([0, attr_area.width - 2 * attr_area.marginX])
                    .paddingInner(0.2)
                    .paddingOuter(0.2);
                    
     let scaleY = d3.scaleLinear()
                    .domain([min * 0.85, max * 1.1 ])
                    .range([attr_area.height - 2 * attr_area.marginY, 0]);               
     
     // создание осей
    let axisX = d3.axisBottom(scaleX); // горизонтальная 
    let axisY = d3.axisLeft(scaleY); // вертикальная

    // отрисовка осей в SVG-элементе
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, 
                                      ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text") // подписи на оси - наклонные
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", d => "rotate(-45)");
    
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);
        
    return [scaleX, scaleY]
}

function createChart(svg, data, scaleX, scaleY, attr_area, colors) {
    const r = 4;

    data.forEach(d => {
        d.values.forEach((val, i) => {
          const dx = (i === 0 ? 4 : -4);
          svg.append("circle")
              .attr("r", r)
              .attr("cx", scaleX(d.labelX) + scaleX.bandwidth() / 2 + dx)
              .attr("cy", scaleY(val))
              .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
              .style("fill", colors[i] || colors[0]); // если одна точка — взять первый цвет
        });
    });
}

  function drawHistogram(data, keyX, mode) {
    const arrGraph = createArrGraph(data, keyX, mode);
    let svg = d3.select("svg");
    svg.selectAll('*').remove();

    attr_area = {
      width: parseFloat(svg.style('width')),
      height: parseFloat(svg.style('height')),
      marginX: 50,
      marginY: 50
    };

    const [scX, scY] = createAxis(svg, arrGraph, attr_area);

    const barWidth = scX.bandwidth() / arrGraph[0].values.length;

    arrGraph.forEach(d => {
      d.values.forEach((val, i) => {
        svg.append("rect")
          .attr("x", scX(d.labelX) + i * barWidth)
          .attr("y", scY(val))
          .attr("width", barWidth)
          .attr("height", attr_area.height - 2 * attr_area.marginY - scY(val))
          .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
          .style("fill", i === 0 ? "blue" : "red");
          
      });
  });
}
