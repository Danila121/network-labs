import { useState, useEffect } from 'react';
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';  // импортируем сортировку

const Table = (props) => {
  const [activePage, setActivePage] = useState(1);

  // После фильтрации — обновляем filteredData и сбрасываем страницу
  const [filteredData, setFilteredData] = useState(props.data);

  // После сортировки — обновляем sortedData, по умолчанию равен filteredData
  const [sortedData, setSortedData] = useState(filteredData);

  // При изменении filteredData, сбрасываем сортировку
  useEffect(() => {
    setSortedData(filteredData);
    setActivePage(1);
  }, [filteredData]);

  const updateFilteredData = (newFiltered) => {
    setFilteredData(newFiltered);
    setActivePage(1);
  };

  // Получаем отсортированные данные из Sort и обновляем состояние
  const updateSortedData = (newSorted) => {
    setSortedData(newSorted);
    setActivePage(1);
  };

  const changeActive = (pageNum) => {
    setActivePage(pageNum);
  };

  const amountRows = props.pagination !== false
    ? props.amountRows
    : sortedData.length;

  const n = Math.ceil(sortedData.length / amountRows);
  const pages = props.pagination !== false
    ? Array.from({ length: n }, (_, i) => i + 1).map((item, index) => (
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
      <Filter filtering={updateFilteredData} fullData={props.data} />
      <Sort fullData={filteredData} data={ props.data } sorting={updateSortedData} />

      <table>
        <TableHead head={Object.keys(props.data[0])} />
        <TableBody
          body={sortedData}
          amountRows={amountRows}
          numPage={activePage}
        />
      </table>
      
      {n > 1 && <div className="pagination">{pages}</div>}
    </>
  );
};

export default Table;
