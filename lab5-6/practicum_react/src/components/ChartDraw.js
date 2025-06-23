import * as d3 from "d3";
import { useRef, useMemo, useEffect, useState } from "react";

const ChartDraw = (props) => {
	const chartRef = useRef(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	// заносим в состояния ширину и высоту svg-элемента
	useEffect(() => {
    const svg = d3.select(chartRef.current);      
    setWidth(parseFloat(svg.style('width')));
		setHeight(parseFloat(svg.style('height')));
  },[]); 

	// задаем отступы в svg-элементе
	const  margin = {
		top:10, 
		bottom:60, 
		left:40, 
		right:10
	};
		
// вычисляем ширину и высоту области для вывода графиков
  const boundsWidth = width -  margin.left - margin.right;
  const boundsHeight = height - margin.top - margin.bottom


  const yValues = props.data.flatMap((d) => {
    const vals = [];
    if (props.showMax) vals.push(d.values[1]);
    if (props.showMin) vals.push(d.values[0]);
    return vals;
  });

	let [min, max] = d3.extent(yValues);
		
	// формируем шкалы для осей
  const scaleX = useMemo(() => {
    return d3
      .scaleBand()
      .domain(props.data.map(d => d.labelX))
      .range([0,boundsWidth])
      // внешний и внутренний отступ от полосок
      .paddingInner(0.3)
      .paddingOuter(0.1);
  }, [props.data, boundsWidth]);

  const scaleY = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([min * 0.85, max * 1.1 ])
      .range([boundsHeight, 0])
  }, [boundsHeight, min, max]);
  
	useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();
    //Если не выбрано
    if (!props.showMax && !props.showMin) {
      alert("Выберите хотя бы один тип высоты по оси OY");
      return;
    }
  
    // рисуем оси
    const xAxis = d3.axisBottom(scaleX);     
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text") 
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", d => "rotate(-30)");

    const yAxis = d3.axisLeft(scaleY);
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);
  
    //рисуем график
		if (props.chartType === "scatter") {
			if (props.showMax) {
				svg.selectAll(".dot-max")
					.data(props.data)
					.enter()
					.append("circle")
					.attr("class", "dot-max")
					.attr("r", 5)
					.attr("cx", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
					.attr("cy", (d) => scaleY(d.values[1]))
					.attr("transform", `translate(${margin.left}, ${margin.top})`)
					.style("fill", "red");
			}
			if (props.showMin) {
				svg.selectAll(".dot-min")
					.data(props.data)
					.enter()
					.append("circle")
					.attr("class", "dot-min")
					.attr("r", 5)
					.attr("cx", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
					.attr("cy", (d) => scaleY(d.values[0]))
					.attr("transform", `translate(${margin.left}, ${margin.top})`)
					.style("fill", "blue");
			}
		}

		if (props.chartType === "bar") {

			if (props.showMax) {
				svg.selectAll(".bar-max")
					.data(props.data)
					.enter()
					.append("rect")
					.attr("class", "bar-max")
					.attr("x", (d) => scaleX(d.labelX))
					.attr("y", (d) => scaleY(d.values[1]))
					.attr("width", scaleX.bandwidth() / (props.showMin ? 2 : 1))
					.attr("height", (d) => boundsHeight - scaleY(d.values[1]))
					.attr("transform", `translate(${margin.left}, ${margin.top})`)
					.style("fill", "red");
			}
			if (props.showMin) {
				svg.selectAll(".bar-min")
					.data(props.data)
					.enter()
					.append("rect")
					.attr("class", "bar-min")
					.attr("x", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
					.attr("y", (d) => scaleY(d.values[0]))
					.attr("width", scaleX.bandwidth() / (props.showMax ? 2 : 1))
					.attr("height", (d) => boundsHeight - scaleY(d.values[0]))
					.attr("transform", `translate(${margin.left}, ${margin.top})`)
					.style("fill", "blue");
			}
		}
  }, [ props.data, props.showMax, props.showMin, height, margin.bottom, margin.left, margin.top, scaleX, scaleY, props.chartType, boundsHeight ]); 

  return (
    <svg ref={ chartRef }>  </svg>
  )
}

export default ChartDraw;