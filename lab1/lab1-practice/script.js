function switchType(){
  let type = document.getElementById('fractionType').value;
  let form = document.getElementById('fractionForm');
  form.innerHTML='';

  if (type === 'mixed'){
    form.innerHTML = `
    <div>
      <div class="inputNumber">
        <label>Целая часть первого числа:</label>
        <input type="number" id="whole1">
      </div>
      <div class="inputNumber">
        <label>Числитель первого числа:</label>
        <input type="number" id="num1">
      </div>
      <div class="inputNumber">
        <label>Знаменатель первого числа:</label>
        <input type="number" id="den1">
      </div>
    </div>

    <div>
      <div class="inputNumber">
        <label>Целая часть второго числа:</label>
        <input type="number" id="whole2">
      </div>
      <div class="inputNumber">
        <label>Числитель второго числа:</label>
        <input type="number" id="num2">
      </div>
      <div class="inputNumber">
        <label>Знаменатель второго числа:</label>
        <input type="number" id="den2"> 
      </div>
    </div>
    `;
  } else {
    form.innerHTML = `
      <div>
        <div class="inputNumber">
          <label>Числитель первого числа:</label>
          <input type="number" id="num1">
        </div>
        <div class="inputNumber">
          <label>Знаменатель первого числа:</label>
          <input type="number" id="den1">
        </div>
      </div>
      <div>
        <div class="inputNumber">
          <label>Числитель второго числа:</label>
          <input type="number" id="num2">
        </div>
        <div class="inputNumber">
          <label>Знаменатель второго числа:</label>
          <input type="number" id="den2">
        </div>
      </div>
    `;
  }
  const operationsSelect = document.getElementById('operations');
  if (operationsSelect) {
    for (const option of operationsSelect.options) {
      option.selected = false;
    }
  }
}
switchType();

function checkField(elem, canBeZero = true, fieldName = '') {
  let result = document.getElementById('results');
  const val = elem.value.trim();

  elem.addEventListener('input', () => {
    elem.classList.remove('error');
    result.textContent = '';
  }, { once: true });

  if (val === '') {
    elem.classList.add('error');
    result.textContent = `Введено пустое значение в поле "${fieldName}"`;
    return false;
  }

  const num = Number(val);
  if (isNaN(num) || !isFinite(num)) {
    elem.classList.add('error');
    result.textContent = `Введено неверное значение в поле "${fieldName}"`;
    return false;
  }

  if (!canBeZero && num === 0) {
    elem.classList.add('error');
    result.textContent = `На ноль делить нельзя (поле "${fieldName}")`;
    return false;
  }

  return true;
}

function calculate() {
  let type = document.getElementById('fractionType').value;
  let result = document.getElementById('results');
  result.textContent = '';

  if (type === 'mixed'){
    let whole1 = document.getElementById('whole1');
    let num1 = document.getElementById('num1');
    let den1 = document.getElementById('den1');
    let whole2 = document.getElementById('whole2');
    let num2 = document.getElementById('num2');
    let den2 = document.getElementById('den2');

    if (
      !checkField(whole1, true, 'Целая часть первого числа') ||
      !checkField(num1, true, 'Числитель первого числа') ||
      !checkField(den1, false, 'Знаменатель первого числа') ||
      !checkField(whole2, true, 'Целая часть второго числа') ||
      !checkField(num2, true, 'Числитель второго числа') ||
      !checkField(den2, false, 'Знаменатель второго числа')
    ) return;
    const operationsSelect = document.querySelector('#operationsBlock select');
    const selectedOperations = Array.from(operationsSelect.selectedOptions).map(opt => opt.value);

    let resultText = ''; 

    if (selectedOperations.includes('add')) {
      let frac1_num = Number(whole1.value) * Number(den1.value) + Number(num1.value);
      let frac1_den = Number(den1.value);
      let frac2_num = Number(whole2.value) * Number(den2.value) + Number(num2.value);
      let frac2_den = Number(den2.value);

      let result_num = frac1_num * frac2_den + frac2_num * frac1_den;
      let result_den = frac1_den * frac2_den;

      let result_whole = Math.floor(result_num / result_den);
      let result_numerator = result_num % result_den;

      resultText += 'Результат сложения: ' + result_whole + ' ' + result_numerator + '/' + result_den + '<br>';
    }

    if (selectedOperations.includes('sub')) {
      let frac1_num = Number(whole1.value) * Number(den1.value) + Number(num1.value);
      let frac1_den = Number(den1.value);
      let frac2_num = Number(whole2.value) * Number(den2.value) + Number(num2.value);
      let frac2_den = Number(den2.value);

      let result_num = frac1_num * frac2_den - frac2_num * frac1_den;
      let result_den = frac1_den * frac2_den;

      let result_whole = Math.floor(result_num / result_den);
      let result_numerator = result_num % result_den;

      resultText += 'Результат вычитания: ' + result_whole + ' ' + result_numerator + '/' + result_den + '<br>';
    }

    if (selectedOperations.includes('div')) {
      let frac1_num = Number(whole1.value) * Number(den1.value) + Number(num1.value);
      let frac1_den = Number(den1.value);
      let frac2_num = Number(whole2.value) * Number(den2.value) + Number(num2.value);
      let frac2_den = Number(den2.value);

      let result_num = frac1_num * frac2_den;
      let result_den = frac1_den * frac2_num;

      if (result_den === 0) {
        resultText += 'Ошибка: деление на ноль!<br>';
      } else {
        let result_whole = Math.floor(result_num / result_den);
        let result_numerator = result_num % result_den;
        resultText += 'Результат деления: ' + result_whole + ' ' + result_numerator + '/' + result_den + '<br>';
    }
  }
  

    document.getElementById('results').innerHTML = resultText;
  } else {
    let num1 = document.getElementById('num1');
    let den1 = document.getElementById('den1');
    let num2 = document.getElementById('num2');
    let den2 = document.getElementById('den2');

    if (
      !checkField(num1, true, 'Числитель первого числа') ||
      !checkField(den1, false, 'Знаменатель первого числа') ||
      !checkField(num2, true, 'Числитель второго числа') ||
      !checkField(den2, false, 'Знаменатель второго числа')
    ) return;

    const operationsSelect = document.querySelector('#operationsBlock select');
    const selectedOperations = Array.from(operationsSelect.selectedOptions).map(opt => opt.value);

    let resultText = '';

    let frac1_num = Number(num1.value);
    let frac1_den = Number(den1.value);
    let frac2_num = Number(num2.value);
    let frac2_den = Number(den2.value);

    if (selectedOperations.includes('add')) {
      let result_num = frac1_num * frac2_den + frac2_num * frac1_den;
      let result_den = frac1_den * frac2_den;

      resultText += 'Результат сложения: ' + result_num + '/' + result_den + '<br>';
    }

    if (selectedOperations.includes('sub')) {
      let result_num = frac1_num * frac2_den - frac2_num * frac1_den;
      let result_den = frac1_den * frac2_den;

      resultText += 'Результат вычитания: ' + result_num + '/' + result_den + '<br>';
    }

    if (selectedOperations.includes('div')) {
      if (frac2_num === 0) {
        resultText += 'Ошибка: деление на ноль!<br>';
      } else {
        let result_num = frac1_num * frac2_den;
        let result_den = frac1_den * frac2_num;

        resultText += 'Результат деления: ' + result_num + '/' + result_den + '<br>';
      }
    }
    document.getElementById('results').innerHTML = resultText;
  }
}

function clearFields() {
  const ids = ['whole1', 'num1', 'den1', 'whole2', 'num2', 'den2'];
  ids.forEach(id => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.value = '';
      elem.classList.remove('error');
    }
  });

  const operationsSelect = document.getElementById('operations');
  if (operationsSelect) {
    for (const option of operationsSelect.options) {
      option.selected = false;
    }
  }

  const result = document.getElementById('results');
  if (result) {
    result.textContent = '';
  }
}
