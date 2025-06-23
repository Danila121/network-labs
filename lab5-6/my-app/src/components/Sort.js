import { useState } from 'react';

const Sort = ({ fullData, sorting, data }) => {
  const [sort1, setSort1] = useState('no');
  const [desc1, setDesc1] = useState(false);

  const [sort2, setSort2] = useState('no');
  const [desc2, setDesc2] = useState(false);

  const [sort3, setSort3] = useState('no');
  const [desc3, setDesc3] = useState(false);

  const handleSort = () => {
    let sortedData = [...fullData];

    const compare = (key, descending) => (a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (valA === valB) return 0;
      if (valA === undefined) return 1;
      if (valB === undefined) return -1;

      if (typeof valA === 'string' && typeof valB === 'string') {
        return descending
          ? valB.localeCompare(valA, 'ru')
          : valA.localeCompare(valB, 'ru');
      } else {
        return descending ? valB - valA : valA - valB;
      }
    };
    const levels = [
      { key: sort1, desc: desc1 },
      { key: sort2, desc: desc2 },
      { key: sort3, desc: desc3 },
    ].filter(level => level.key !== 'no');

    if (levels.length === 0) {
      sorting(fullData);
      return;
    }

    sortedData.sort((a, b) => {
      for (const { key, desc } of levels) {
        const res = compare(key, desc)(a, b);
        if (res !== 0) return res;
      }
      return 0;
    });

    sorting(sortedData);
  };
  const handleClear = () => {
    setSort1('no');
    setDesc1(false);
    setSort2('no');
    setDesc2(false);
    setSort3('no');
    setDesc3(false);
    sorting(data); 
  };


  return (
    <details>
      <summary>
        Сортировка
      </summary>

      <p>
        Первый уровень:
        <select value={sort1} onChange={e => setSort1(e.target.value)} name="first">
          <option value="no">Нет</option>
          <option value="Название">Название</option>
          <option value="Производитель">Производитель</option>
          <option value="Цена">Цена</option>
          <option value="Год">Год</option>
          <option value="Мощность">Мощность</option>
          <option value="Макс. скорость">Макс. скорость</option>
          <option value="Разгон 0-100">Разгон 0-100</option>
        </select>
        &nbsp;По убыванию?{' '}
        <input
          type="checkbox"
          checked={desc1}
          onChange={e => setDesc1(e.target.checked)}
          value="1"
        />
      </p>

      <p>
        Второй уровень:
        <select value={sort2} onChange={e => setSort2(e.target.value)} name="second">
          <option value="no">Нет</option>
          <option value="Название">Название</option>
          <option value="Производитель">Производитель</option>
          <option value="Цена">Цена</option>
          <option value="Год">Год</option>
          <option value="Мощность">Мощность</option>
          <option value="Макс. скорость">Макс. скорость</option>
          <option value="Разгон 0-100">Разгон 0-100</option>
        </select>
        &nbsp;По убыванию?{' '}
        <input
          type="checkbox"
          checked={desc2}
          onChange={e => setDesc2(e.target.checked)}
          value="2"
        />
      </p>

      <p>
        Третий уровень:
        <select value={sort3} onChange={e => setSort3(e.target.value)} name="third">
          <option value="no">Нет</option>
          <option value="Название">Название</option>
          <option value="Производитель">Производитель</option>
          <option value="Цена">Цена</option>
          <option value="Год">Год</option>
          <option value="Мощность">Мощность</option>
          <option value="Макс. скорость">Макс. скорость</option>
          <option value="Разгон 0-100">Разгон 0-100</option>
        </select>
        &nbsp;По убыванию?{' '}
        <input
          type="checkbox"
          checked={desc3}
          onChange={e => setDesc3(e.target.checked)}
          value="3"
        />
      </p>

      <button onClick={handleSort}>Сортировать</button>
      <button onClick={handleClear} type="button">Очистить сортировку</button>
    </details>
  );
};

export default Sort;
