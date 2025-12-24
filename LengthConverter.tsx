import React, { useState } from 'react';
import { lengthUnits, lengthToStandard } from '../utils/measurementSystems';

const LengthConverter: React.FC = () => {
  const [inputType, setInputType] = useState<'inches' | 'feet' | 'yards' | 'miles' | 'cm' | 'meters' | 'kilometers' | 'fictional'>('inches');
  const [inputValue, setInputValue] = useState<number>(0);
  const [fictionalUnit, setFictionalUnit] = useState<string>('rpus');
  const [fictionalValue, setFictionalValue] = useState<number>(0);

  const convertToCm = (value: number, unit: string): number => {
    switch (unit) {
      case 'inches': return value * 2.54;
      case 'feet': return value * 30.48;
      case 'yards': return value * 91.44;
      case 'miles': return value * 160934.4;
      case 'cm': return value;
      case 'meters': return value * 100;
      case 'kilometers': return value * 100000;
      default: return value;
    }
  };

  const handleConvert = () => {
    if (inputType === 'fictional') {
      // Result shown in display
    } else {
      const cm = convertToCm(inputValue, inputType);
      const rpus = cm * 3.07086614173; // since 1 cm = 3.07086614173 rpus
      const result = rpus / lengthUnits.find(u => u.name === fictionalUnit)!.factor;
      setFictionalValue(result);
    }
  };

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Rosan Length Converter</h2>
      <div>
        <label>
          <input
            type="radio"
            value="inches"
            checked={inputType === 'inches'}
            onChange={() => setInputType('inches')}
          />
          Input Inches
        </label>
        <label>
          <input
            type="radio"
            value="feet"
            checked={inputType === 'feet'}
            onChange={() => setInputType('feet')}
          />
          Input Feet
        </label>
        <label>
          <input
            type="radio"
            value="yards"
            checked={inputType === 'yards'}
            onChange={() => setInputType('yards')}
          />
          Input Yards
        </label>
        <label>
          <input
            type="radio"
            value="miles"
            checked={inputType === 'miles'}
            onChange={() => setInputType('miles')}
          />
          Input Miles
        </label>
        <label>
          <input
            type="radio"
            value="cm"
            checked={inputType === 'cm'}
            onChange={() => setInputType('cm')}
          />
          Input Centimeters
        </label>
        <label>
          <input
            type="radio"
            value="meters"
            checked={inputType === 'meters'}
            onChange={() => setInputType('meters')}
          />
          Input Meters
        </label>
        <label>
          <input
            type="radio"
            value="kilometers"
            checked={inputType === 'kilometers'}
            onChange={() => setInputType('kilometers')}
          />
          Input Kilometers
        </label>
        <label>
          <input
            type="radio"
            value="fictional"
            checked={inputType === 'fictional'}
            onChange={() => setInputType('fictional')}
          />
          Input Rosan Units
        </label>
      </div>

      {inputType === 'fictional' ? (
        <div>
          <select value={fictionalUnit} onChange={(e) => setFictionalUnit(e.target.value)}>
            {lengthUnits.map(unit => (
              <option key={unit.name} value={unit.name}>{unit.name}</option>
            ))}
          </select>
          <input
            type="number"
            value={fictionalValue}
            onChange={(e) => setFictionalValue(Number(e.target.value))}
          />
        </div>
      ) : (
        <div>
          <label>
            {inputType.charAt(0).toUpperCase() + inputType.slice(1)}: 
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
            />
          </label>
        </div>
      )}

      <button onClick={handleConvert}>Convert</button>

      <div>
        <h3>Result</h3>
        {inputType === 'fictional' ? (
          <div>
            <p>Inches: {lengthToStandard(fictionalValue, fictionalUnit).inches.toFixed(2)}</p>
            <p>Feet: {(lengthToStandard(fictionalValue, fictionalUnit).inches / 12).toFixed(2)}</p>
            <p>Yards: {(lengthToStandard(fictionalValue, fictionalUnit).inches / 36).toFixed(2)}</p>
            <p>Miles: {(lengthToStandard(fictionalValue, fictionalUnit).inches / 63360).toFixed(6)}</p>
            <p>CM: {lengthToStandard(fictionalValue, fictionalUnit).cm.toFixed(2)}</p>
            <p>Meters: {(lengthToStandard(fictionalValue, fictionalUnit).cm / 100).toFixed(2)}</p>
            <p>Kilometers: {(lengthToStandard(fictionalValue, fictionalUnit).cm / 100000).toFixed(6)}</p>
          </div>
        ) : (
          <div>
            {lengthUnits.map(unit => (
              <p key={unit.name}>{unit.name}: {(fictionalValue * lengthUnits.find(u => u.name === fictionalUnit)!.factor / unit.factor).toFixed(2)}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LengthConverter;