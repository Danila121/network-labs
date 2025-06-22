import { useRef } from 'react';

const Filter = (props) => {
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const filterField = {
      "Название": event.target["structure"].value.toLowerCase(),
      "Тип": event.target["type"].value.toLowerCase(),
      "Страна": event.target["country"].value.toLowerCase(),
      "Город": event.target["city"].value.toLowerCase(),
      "Год": [
        event.target["yearFrom"].value,
        event.target["yearTo"].value,
      ],
      "Высота": [
        event.target["heightFrom"].value,
        event.target["heightTo"].value,
      ]
    };

    let arr = props.fullData;

    // текстовые фильтры
    for (const key of ["Название", "Тип", "Страна", "Город"]) {
      const value = filterField[key];
      if (value) {
        arr = arr.filter(item =>
          item[key].toLowerCase().includes(value)
        );
      }
    }

    // числовые интервалы
    for (const key of ["Год", "Высота"]) {
      const [min, max] = filterField[key];
      arr = arr.filter(item => {
        const value = parseFloat(item[key]);
        return (!min || value >= parseFloat(min)) &&
               (!max || value <= parseFloat(max));
      });
    }

    props.filtering(arr);
  };

  const handleReset = () => {
    if (formRef.current) {
      const form = formRef.current;

      form["structure"].value = "";
      form["type"].value = "";
      form["country"].value = "";
      form["city"].value = "";

      form["yearFrom"].value = "";
      form["yearTo"].value = "";
      form["heightFrom"].value = "";
      form["heightTo"].value = "";
    }

    // Вернуть полные данные в таблицу
    props.filtering(props.fullData);
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} ref={formRef}>
      <p>
        <label>Название:</label>
        <input name="structure" type="text" />
      </p>
      <p>
        <label>Тип:</label>
        <input name="type" type="text" />
      </p>
      <p>
        <label>Страна:</label>
        <input name="country" type="text" />
      </p>
      <p>
        <label>Город:</label>
        <input name="city" type="text" />
      </p>
      <p>
        <label>Год: от</label>
        <input name="yearFrom" type="number" />
        <label>до</label>
        <input name="yearTo" type="number" />
      </p>
      <p>
        <label>Высота: от</label>
        <input name="heightFrom" type="number" />
        <label>до</label>
        <input name="heightTo" type="number" />
      </p>
      <p>
        <button type="submit">Фильтровать</button>
        <button type="reset">Очистить фильтр</button>
      </p>
    </form>
  );
};

export default Filter;
