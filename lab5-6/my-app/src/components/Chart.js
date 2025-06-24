import { useState} from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {
  const [ox, setOx] = useState("Производитель");
  const [oy, setOy] = useState([true, false]);
  const [chartType, setChartType] = useState("scatter");
  const [checkboxError, setCheckboxError] = useState(false);
  const [canDrawChart, setCanDrawChart] = useState(false)


  const handleSubmit = (event) => {        
    event.preventDefault();

    const maxChecked = event.target["oy"][0].checked;
    const minChecked = event.target["oy"][1].checked;

    if (!maxChecked && !minChecked) {
      setCheckboxError(true);
      setCanDrawChart(false);
      return;
    }

    setCheckboxError(false);
    setCanDrawChart(true);
    setOx(event.target["ox"].value); 
    setOy([maxChecked, minChecked]);
    setChartType(event.target["chartType"].value);	
  }

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
            className={checkboxError ? "checkbox-error" : ""}

            onChange={() => {
              if (!checkboxError) return;
              const boxes = document.getElementsByName("oy");
              if (boxes[0].checked || boxes[1].checked) {
                setCheckboxError(false);
              }
            }}
          /> Максимальное значение Макс. скорости <br />
          <input
            type="checkbox"
            name="oy"
            defaultChecked={oy[1]}
            className={checkboxError ? "checkbox-error" : ""}

            onChange={() => {
              if (!checkboxError) return;
              const boxes = document.getElementsByName("oy");
              if (boxes[0].checked || boxes[1].checked) {
                setCheckboxError(false);
              }
            }}
          /> Минимальное значение Макс. скорости
        </div>
        {checkboxError && <div style={{ color: "red"}}>{<span>Выберите хотя бы одно значение</span>}</div>}
        
        <p>Тип диаграммы:</p>
        <select name="chartType" defaultValue={chartType}>
          <option value="scatter">Точечная диаграмма</option>
          <option value="bar">Гистограмма</option>
        </select>

        <p>
          <button type="submit">Построить</button>
        </p>
      </form>

      {canDrawChart && <ChartDraw
        data={createArrGraph(props.data, ox)}
        showMax={oy[0]}
        showMin={oy[1]}
        chartType={chartType}
      />}
    </details>
  );
};

export default Chart;
