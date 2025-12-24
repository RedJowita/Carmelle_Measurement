import React, { useState } from 'react';
import { secondsToFictionalTime, fictionalTimeToSeconds, timeUnits } from '../utils/timeSystem';

const TimeConverter: React.FC = () => {
  const [inputType, setInputType] = useState<'seconds' | 'minutes' | 'hours' | 'days' | 'years' | 'fictional'>('seconds');
  const [inputValue, setInputValue] = useState<number>(0);
  const [fictionalInputs, setFictionalInputs] = useState<Record<string, number>>({});

  const convertToSeconds = (value: number, type: string) => {
    switch (type) {
      case 'minutes': return value * 60;
      case 'hours': return value * 3600;
      case 'days': return value * 86400;
      case 'years': return value * 31536000; // Approximate
      case 'seconds': return value;
      default: return value;
    }
  };

  const handleConvert = () => {
    if (inputType === 'fictional') {
      const totalSeconds = fictionalTimeToSeconds(fictionalInputs);
      setInputValue(totalSeconds);
    } else {
      const seconds = convertToSeconds(inputValue, inputType);
      const result = secondsToFictionalTime(seconds);
      setFictionalInputs(result);
    }
  };

  const handleFictionalChange = (unit: string, value: number) => {
    setFictionalInputs(prev => ({ ...prev, [unit]: value }));
  };

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Rosan Time Converter</h2>
      <div>
        <label>
          <input
            type="radio"
            value="seconds"
            checked={inputType === 'seconds'}
            onChange={() => setInputType('seconds')}
          />
          Input Seconds
        </label>
        <label>
          <input
            type="radio"
            value="minutes"
            checked={inputType === 'minutes'}
            onChange={() => setInputType('minutes')}
          />
          Input Minutes
        </label>
        <label>
          <input
            type="radio"
            value="hours"
            checked={inputType === 'hours'}
            onChange={() => setInputType('hours')}
          />
          Input Hours
        </label>
        <label>
          <input
            type="radio"
            value="days"
            checked={inputType === 'days'}
            onChange={() => setInputType('days')}
          />
          Input Days
        </label>
        <label>
          <input
            type="radio"
            value="years"
            checked={inputType === 'years'}
            onChange={() => setInputType('years')}
          />
          Input Years
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
          {timeUnits.map(unit => (
            <label key={unit.name}>
              {unit.name}: 
              <input
                type="number"
                value={fictionalInputs[unit.name] || 0}
                onChange={(e) => handleFictionalChange(unit.name, Number(e.target.value))}
              />
            </label>
          ))}
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
            <p>Seconds: {inputValue}</p>
            <p>Minutes: {(inputValue / 60).toFixed(2)}</p>
            <p>Hours: {(inputValue / 3600).toFixed(2)}</p>
            <p>Days: {(inputValue / 86400).toFixed(2)}</p>
            <p>Years: {(inputValue / 31536000).toFixed(2)}</p>
          </div>
        ) : (
          <div>
            <p>Fictional Time: {Object.entries(fictionalInputs).filter(([_, v]) => v > 0).map(([u, v]) => `${v} ${u}`).join(', ')}</p>
            <p>Seconds: {convertToSeconds(inputValue, inputType)}</p>
            <p>Minutes: {(convertToSeconds(inputValue, inputType) / 60).toFixed(2)}</p>
            <p>Hours: {(convertToSeconds(inputValue, inputType) / 3600).toFixed(2)}</p>
            <p>Days: {(convertToSeconds(inputValue, inputType) / 86400).toFixed(2)}</p>
            <p>Years: {(convertToSeconds(inputValue, inputType) / 31536000).toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeConverter;