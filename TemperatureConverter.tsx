import React, { useState } from 'react';

const TemperatureConverter: React.FC = () => {
  const [celsius, setCelsius] = useState<string>('');
  const [fahrenheit, setFahrenheit] = useState<string>('');
  const [mal, setMal] = useState<string>('');
  const [svesa, setSvesa] = useState<string>('');

  const convertFromCelsius = (c: number) => {
    const f = (9/5) * c + 32;
    const m = (18/5) * c + 44;
    const s = c * c / 10;
    return { f, m, s };
  };

  const convertToCelsius = (value: number, type: 'f' | 'm' | 's') => {
    if (type === 'f') return (5/9) * (value - 32);
    if (type === 'm') return (5/18) * (value - 44);
    if (type === 's') return 20 * Math.sqrt(value / 2);
    return 0;
  };

  const handleCelsiusChange = (value: string) => {
    setCelsius(value);
    if (value === '') {
      setFahrenheit('');
      setMal('');
      setSvesa('');
      return;
    }
    const c = parseFloat(value);
    if (isNaN(c)) return;
    const { f, m, s } = convertFromCelsius(c);
    setFahrenheit(f.toFixed(2));
    setMal(m.toFixed(2));
    setSvesa(s.toFixed(2));
  };

  const handleFahrenheitChange = (value: string) => {
    setFahrenheit(value);
    if (value === '') {
      setCelsius('');
      setMal('');
      setSvesa('');
      return;
    }
    const f = parseFloat(value);
    if (isNaN(f)) return;
    const c = convertToCelsius(f, 'f');
    setCelsius(c.toFixed(2));
    const { m, s } = convertFromCelsius(c);
    setMal(m.toFixed(2));
    setSvesa(s.toFixed(2));
  };

  const handleMalChange = (value: string) => {
    setMal(value);
    if (value === '') {
      setCelsius('');
      setFahrenheit('');
      setSvesa('');
      return;
    }
    const m = parseFloat(value);
    if (isNaN(m)) return;
    const c = convertToCelsius(m, 'm');
    setCelsius(c.toFixed(2));
    const { f, s } = convertFromCelsius(c);
    setFahrenheit(f.toFixed(2));
    setSvesa(s.toFixed(2));
  };

  const handleSvesaChange = (value: string) => {
    setSvesa(value);
    if (value === '') {
      setCelsius('');
      setFahrenheit('');
      setMal('');
      return;
    }
    const s = parseFloat(value);
    if (isNaN(s)) return;
    const c = convertToCelsius(s, 's');
    setCelsius(c.toFixed(2));
    const { f, m } = convertFromCelsius(c);
    setFahrenheit(f.toFixed(2));
    setMal(m.toFixed(2));
  };

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Rosan & Svenssonska Temperature Systems</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <div>
          <label>Celsius (°C): </label>
          <input
            type="number"
            value={celsius}
            onChange={(e) => handleCelsiusChange(e.target.value)}
            placeholder="Enter Celsius"
          />
        </div>
        <div>
          <label>Fahrenheit (°F): </label>
          <input
            type="number"
            value={fahrenheit}
            onChange={(e) => handleFahrenheitChange(e.target.value)}
            placeholder="Enter Fahrenheit"
          />
        </div>
        <div>
          <label>Mal (M): </label>
          <input
            type="number"
            value={mal}
            onChange={(e) => handleMalChange(e.target.value)}
            placeholder="Enter Mal"
          />
        </div>
        <div>
          <label>Svesa (S): </label>
          <input
            type="number"
            value={svesa}
            onChange={(e) => handleSvesaChange(e.target.value)}
            placeholder="Enter Svesa"
          />
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Conversion Notes:</h3>
        <ul>
          <li>Rosan System: M = Mal temperature scale</li>
          <li>Svenssonska System: S = Svesa temperature scale</li>
          <li>All conversions are calculated through Celsius as the base unit</li>
        </ul>
      </div>
    </div>
  );
};

export default TemperatureConverter;