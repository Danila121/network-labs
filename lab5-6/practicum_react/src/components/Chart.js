import { useState, useMemo } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {
  const [ox, setOx] = useState("Страна");
  const [oy, setOy] = useState([true, false])
  const [chartType, setChartType] = useState("scatter");
  //Переменные для фильтра
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredData = useMemo(() => {
    return props.data.filter(b =>
      (b["Название"] ? b["Название"].toLowerCase() : "").includes(nameFilter.toLowerCase()) &&
      (b["Тип"] ? b["Тип"].toLowerCase() : "").includes(typeFilter.toLowerCase())
    );
  }, [props.data, nameFilter, typeFilter]);
  
  const handleSubmit = (event) => {        
    event.preventDefault();
    setOx(event.target["ox"].value); 
		setOy([event.target["oy"][0].checked, event.target["oy"][1].checked])	
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
        <input type="checkbox" name="oy" defaultChecked={ oy[0] === true } />
		      Максимальная высота <br/>
        <input  type="checkbox" name="oy" />
		      Минимальная высота
		    </div>

        <p>Тип диаграммы:</p>
        <select name="chartType" defaultValue={chartType}>
          <option value="scatter">Точечная диаграмма</option>
          <option value="bar">Гистограмма</option>
        </select>

        <p>  
          <button type="submit">Построить </button>
        </p>
      </form>    
      <ChartDraw data={ createArrGraph(filteredData, ox) } showMax={ oy[0] } showMin={ oy[1] } chartType={chartType}/>
      <div>
      Название:
      <input
        type="text"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <p></p>
      Type:
      <input
        type="text"
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
      />
      </div>	
	</>
    )
}

export default Chart;