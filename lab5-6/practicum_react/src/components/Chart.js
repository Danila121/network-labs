import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {
  const [ox, setOx] = useState("Страна");
  const [oy, setOy] = useState([true, false])
  const [chartType, setChartType] = useState("scatter");
  const [checkboxError, setCheckboxError] = useState(false);

  const handleSubmit = (event) => {        
    event.preventDefault();

    const maxChecked = event.target["oy"][0].checked;
    const minChecked = event.target["oy"][1].checked;

    if (!maxChecked && !minChecked) {
      setCheckboxError(true);
      return;
  }

  setCheckboxError(false);
  setOx(event.target["ox"].value); 
  setOy([maxChecked, minChecked]);
  setChartType(event.target["chartType"].value);	
}
  const createArrGraph =(data, key)=>{   
      const groupObj = d3.group(data, d => d[key]);
      let arrGraph =[];
      for(let entry of groupObj) {
          let minMax = d3.extent(entry[1].map(d => d['Высота']));
          arrGraph.push({labelX: entry[0], values: minMax});
      }
      //СОРТИРОВКА
      if (key === "Год") {
        arrGraph.sort((a, b) => +a.labelX - +b.labelX);
      }
      return arrGraph;
  }

  return (
    <>
      <h4>Визуализация</h4>
      <form onSubmit={ handleSubmit}>
        <p> Значение по оси OX: </p>
		    <div>
          <input type="radio" name="ox" value="Страна" defaultChecked={ ox === "Страна"} />
		      Страна
          <br/>		
          <input type="radio" name="ox" value="Год" />
		      Год
		    </div>

        <p> Значение по оси OY </p>
		    <div>
        <input type="checkbox" name="oy" defaultChecked={ oy[0] === true } className={checkboxError ? "checkbox-error" : ""} />
		      Максимальная высота <br/>
        <input  type="checkbox" name="oy" className={checkboxError ? "checkbox-error" : ""} />
		      Минимальная высота
		    </div>
        {checkboxError && <div style={{ color: "red"}}>{<span>Выберите хотя бы одно значение</span>}</div>}

        <p>Тип диаграммы:</p>
        <select name="chartType" defaultValue={chartType}>
          <option value="scatter">Точечная диаграмма</option>
          <option value="bar">Гистограмма</option>
        </select>

        <p>  
          <button type="submit">Построить </button>
        </p>
      </form>    
      {!checkboxError && <ChartDraw data={ createArrGraph(props.data, ox) } showMax={ oy[0] } showMin={ oy[1] } chartType={chartType}/>}
	</>
    )
}

export default Chart;