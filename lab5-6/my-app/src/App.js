import './CSS/App.css';
import carsData from './data/data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js'
function App() {
  return (
    <>
      <div className='main'>
        <h3>Немецкие автомобили</h3>
        <Chart data={ carsData } />
        <Table data={ carsData } amountRows="15" pagination={true} />
      </div>
    </>
  );
}

export default App;
