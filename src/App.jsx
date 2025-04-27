import { useState } from 'react';
import './App.css';

function App() {
  const [currentValue, setCurrentValue] = useState('0');
  const [formula, setFormula] = useState('');
  const [overwrite, setOverwrite] = useState(false);

  const numbers = [
    { id: 'zero', value: '0' },
    { id: 'one', value: '1' },
    { id: 'two', value: '2' },
    { id: 'three', value: '3' },
    { id: 'four', value: '4' },
    { id: 'five', value: '5' },
    { id: 'six', value: '6' },
    { id: 'seven', value: '7' },
    { id: 'eight', value: '8' },
    { id: 'nine', value: '9' },
  ];

  const operators = [
    { id: 'add', value: '+' },
    { id: 'subtract', value: '-' },
    { id: 'multiply', value: '*' },
    { id: 'divide', value: '/' },
  ];

  function handleNumber(num) {
    if (currentValue === '0' || overwrite) {
      setCurrentValue(num);
      setOverwrite(false);
    } else {
      setCurrentValue(currentValue + num);
    }
  }

  function handleOperator(op) {
    if (overwrite) {
      setFormula(currentValue + op);
    } else {
      setFormula(formula + currentValue + op);
    }
    setOverwrite(true);
  }

  function handleDecimal() {
    if (overwrite) {
      setCurrentValue('0.');
      setOverwrite(false);
    } else if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
    }
  }

  function handleEquals() {
    try {
      let evalFormula = formula + currentValue;
      evalFormula = evalFormula.replace(/[*\/+-]+$/, ''); // Remove trailing operators
      const result = Math.round(eval(evalFormula) * 10000) / 10000;
      setCurrentValue(result.toString());
      setFormula('');
      setOverwrite(true);
    } catch {
      setCurrentValue('Error');
      setFormula('');
    }
  }

  function handleClear() {
    setCurrentValue('0');
    setFormula('');
    setOverwrite(false);
  }

  return (
    <div id="calculator">
      <div id="display">{currentValue}</div>
      <div className="buttons">
        <button id="clear" onClick={handleClear}>AC</button>

        {operators.map((op) => (
          <button key={op.id} id={op.id} onClick={() => handleOperator(op.value)}>
            {op.value}
          </button>
        ))}

        {numbers.map((num) => (
          <button key={num.id} id={num.id} onClick={() => handleNumber(num.value)}>
            {num.value}
          </button>
        ))}

        <button id="decimal" onClick={handleDecimal}>.</button>
        <button id="equals" onClick={handleEquals}>=</button>
      </div>
    </div>
  );
}

export default App;