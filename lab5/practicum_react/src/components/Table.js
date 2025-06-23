import { useState } from 'react';
import { useEffect } from 'react';
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js'

const Table = (props) => {
  const [activePage, setActivePage] = useState(1);
  const [dataTable, setDataTable] = useState(props.data);

  const updateDataTable = (value) => {
    setDataTable(value);
    setActivePage(1);
  };

  const changeActive = (pageNum) => {
    setActivePage(pageNum);
  };

  const amountRows = props.pagination !== false
    ? props.amountRows
    : dataTable.length;

  const n = Math.ceil(dataTable.length / amountRows);
  useEffect(()=>{
      setActivePage(n);
    },[n]
  )
  const arr = Array.from({ length: n }, (_, i) => i + 1);

  const pages = props.pagination !== false
    ? arr.map((item, index) => (
        <span
          key={index}
          onClick={() => changeActive(item)}
          className={`page-number ${item === activePage ? 'active' : ''}`}
        >
          {item}
        </span>
      ))
    : null;

  return (
    <>
      <h4>Фильтры</h4>
      <Filter filtering={updateDataTable} fullData={props.data} />
      <table>
        <TableHead head={Object.keys(props.data[0])} />
        <TableBody
          body={dataTable}
          amountRows={amountRows}
          numPage={activePage}
        />
      </table>

      <div className="pagination">{pages}</div>
    </>
  );
};


export default Table;
