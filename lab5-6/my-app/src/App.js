import { useState } from 'react';
import './CSS/App.css';
import carsData from './data/data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js'
function App() {
  const [filteredData, setFilteredData] = useState(carsData);
  return (
    <div className='main'>
      <h3>Немецкие автомобили</h3>
      <Chart data={filteredData} />
      <Table
        data={carsData}
        onFilter={setFilteredData}  // прокидываем функцию обновления фильтрации
        amountRows={15}
        pagination={true}
      />
    </div>
  );
}

export default App;
