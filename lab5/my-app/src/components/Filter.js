import { useRef } from 'react';

const Filter = (props) => {
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const filterField = {
      "Название": event.target["filterName"].value.trim().toLowerCase(),
      "Производитель": event.target["filterManufacturer"].value.trim().toLowerCase(),
      "Цена": [
        event.target["filterPriceMin"].value,
        event.target["filterPriceMax"].value,
      ],
      "Год": [
        event.target["filterYearMin"].value,
        event.target["filterYearMax"].value,
      ],
      "Мощность": [
        event.target["filterPowerMin"].value,
        event.target["filterPowerMax"].value,
      ],
      "Макс. скорость": [
        event.target["filterSpeedMin"].value,
        event.target["filterSpeedMax"].value,
      ],
      "Разгон 0-100": [
        event.target["filterAccelMin"].value,
        event.target["filterAccelMax"].value,
      ],
    };

    let arr = props.fullData;

    // Текстовые фильтры
    for (const key of ["Название", "Производитель"]) {
      const value = filterField[key];
      if (value) {
        arr = arr.filter(item =>
          (item[key] || "").toString().toLowerCase().includes(value)
        );
      }
    }

    // Числовые интервалы
    for (const key of ["Цена", "Год", "Мощность", "Макс. скорость", "Разгон 0-100"]) {
      const [minRaw, maxRaw] = filterField[key];
      const min = minRaw === "" ? null : parseFloat(minRaw);
      const max = maxRaw === "" ? null : parseFloat(maxRaw);

      arr = arr.filter(item => {
        const value = parseFloat(item[key]);
        if (isNaN(value)) return false; // исключаем, если значение не число
        if (min !== null && value < min) return false;
        if (max !== null && value > max) return false;
        return true;
      });
    }

    props.filtering(arr);
  };

  const handleReset = () => {
    if (formRef.current) {
      const form = formRef.current;

      form["filterName"].value = "";
      form["filterManufacturer"].value = "";

      form["filterPriceMin"].value = "";
      form["filterPriceMax"].value = "";

      form["filterYearMin"].value = "";
      form["filterYearMax"].value = "";

      form["filterPowerMin"].value = "";
      form["filterPowerMax"].value = "";

      form["filterSpeedMin"].value = "";
      form["filterSpeedMax"].value = "";

      form["filterAccelMin"].value = "";
      form["filterAccelMax"].value = "";
    }
    props.filtering(props.fullData);
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} ref={formRef}>
      <details open>
        <summary>Фильтр</summary>

        <p>
          <label>Название:</label><br />
          <input name="filterName" type="text" />
        </p>
        <p>
          <label>Производитель:</label><br />
          <input name="filterManufacturer" type="text" />
        </p>

        <p>
          <label>Цена: от</label>
          <input name="filterPriceMin" type="number" min="0" step="1" />
          <label>до</label>
          <input name="filterPriceMax" type="number" min="0" step="1" />
        </p>

        <p>
          <label>Год: от</label>
          <input name="filterYearMin" type="number" min="1900" step="1" />
          <label>до</label>
          <input name="filterYearMax" type="number" min="1900" step="1" />
        </p>

        <p>
          <label>Мощность: от</label>
          <input name="filterPowerMin" type="number" min="0" step="1" />
          <label>до</label>
          <input name="filterPowerMax" type="number" min="0" step="1" />
        </p>

        <p>
          <label>Макс. скорость: от</label>
          <input name="filterSpeedMin" type="number" min="0" step="1" />
          <label>до</label>
          <input name="filterSpeedMax" type="number" min="0" step="1" />
        </p>

        <p>
          <label>Разгон 0-100: от</label>
          <input name="filterAccelMin" type="number" min="0" step="0.1" />
          <label>до</label>
          <input name="filterAccelMax" type="number" min="0" step="0.1" />
        </p>

        <p>
          <button type="submit">Фильтровать</button>
          <button type="reset" style={{ marginLeft: "10px" }}>Очистить фильтр</button>
        </p>
      </details>
    </form>
  );
};

export default Filter;
