import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {
  const [ox, setOx] = useState("Производитель");
  const [oy, setOy] = useState([true, false]);
  const [chartType, setChartType] = useState("scatter");

  const handleSubmit = (event) => {
    event.preventDefault();
    setOx(event.target["ox"].value);
    setOy([
      event.target["oy"][0].checked,
      event.target["oy"][1].checked
    ]);
    setChartType(event.target["chartType"].value);
  };

  const createArrGraph = (data, key) => {
    const groupObj = d3.group(data, d => d[key]);
    let arrGraph = [];

    for (let entry of groupObj) {
      const speeds = entry[1].map(d => d["Макс. скорость"]);
      const minMax = d3.extent(speeds);
      arrGraph.push({
        labelX: entry[0],
        values: minMax
      });
    }

    return arrGraph;
  };

  return (
    <details>
      <summary>Визуализация диаграммы</summary>
      <form onSubmit={handleSubmit}>
        <p>Значение по оси OX:</p>
        <div>
          <input
            type="radio"
            name="ox"
            value="Производитель"
            defaultChecked={ox === "Производитель"}
          /> Производитель
          <br />
          <input
            type="radio"
            name="ox"
            value="Год"
          /> Год
        </div>

        <p>Значение по оси OY:</p>
        <div>
          <input
            type="checkbox"
            name="oy"
            defaultChecked={oy[0]}
          /> Максимальное значение Макс. скорости <br />
          <input
            type="checkbox"
            name="oy"
            defaultChecked={oy[1]}
          /> Минимальное значение Макс. скорости
        </div>

        <p>Тип диаграммы:</p>
        <select name="chartType" defaultValue={chartType}>
          <option value="scatter">Точечная диаграмма</option>
          <option value="bar">Гистограмма</option>
        </select>

        <p>
          <button type="submit">Построить</button>
        </p>
      </form>

      <ChartDraw
        data={createArrGraph(props.data, ox)}
        showMax={oy[0]}
        showMin={oy[1]}
        chartType={chartType}
      />
    </details>
  );
};

export default Chart;
