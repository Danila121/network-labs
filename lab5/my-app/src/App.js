import './CSS/App.css';
import carsData from './data/data.js';
import Table from './components/Table.js';
function App() {
  return (
    <>
       <Table data={ carsData } amountRows="15" pagination={true} />
    </>
  );
}

export default App;
