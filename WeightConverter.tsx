import React, { useState } from 'react';
import { weightUnits, weightToStandard } from '../utils/measurementSystems';

const WeightConverter: React.FC = () => {
  const [inputType, setInputType] = useState<'oz' | 'pounds' | 'tons' | 'grams' | 'kilograms' | 'fictional'>('fictional');
  const [inputValue, setInputValue] = useState<number>(0);
  const [fictionalUnit, setFictionalUnit] = useState<string>('rpte');
  const [fictionalValue, setFictionalValue] = useState<number>(0);

  const getResult = () => {
    if (inputType === 'fictional') {
      return weightToStandard(fictionalValue, fictionalUnit);
    } else {
      let oz = 0;
      if (inputType === 'oz') oz = inputValue;
      else if (inputType === 'pounds') oz = inputValue * 16;
      else if (inputType === 'tons') oz = inputValue * 32000;
      else if (inputType === 'grams') oz = inputValue / 28.34952;
      else if (inputType === 'kilograms') oz = inputValue * 1000 / 28.34952;
      const rpte = oz * 30.25;
      return {
        rpte: rpte / 1,
        ykte: rpte / 20,
        dmte: rpte / 400,
        lwte: rpte / 8000,
        tpte: rpte / 160000,
      };
    }
  };

  const result = getResult();

  let resultDisplay = null;
  if (inputType === 'fictional') {
    const res = result as { oz: number; pounds: number; tons: number; grams: number; kilograms: number };
    resultDisplay = (
      <div>
        <p>Oz: {res.oz.toFixed(2)}</p>
        <p>Pounds: {res.pounds.toFixed(2)}</p>
        <p>Tons: {res.tons.toFixed(2)}</p>
        <p>Grams: {res.grams.toFixed(2)}</p>
        <p>Kilograms: {res.kilograms.toFixed(2)}</p>
      </div>
    );
  } else if (inputValue > 0) {
    const res = result as { rpte: number; ykte: number; dmte: number; lwte: number; tpte: number };
    resultDisplay = (
      <div>
        <p>rpte: {res.rpte.toFixed(2)}</p>
        <p>ykte: {res.ykte.toFixed(2)}</p>
        <p>dmte: {res.dmte.toFixed(2)}</p>
        <p>lwte: {res.lwte.toFixed(2)}</p>
        <p>tpte: {res.tpte.toFixed(2)}</p>
      </div>
    );
  }

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Rosan Weight Converter</h2>
      <div>
        <label>
          <input
            type="radio"
            value="oz"
            checked={inputType === 'oz'}
            onChange={() => setInputType('oz')}
          />
          Input Ounces
        </label>
        <label>
          <input
            type="radio"
            value="pounds"
            checked={inputType === 'pounds'}
            onChange={() => setInputType('pounds')}
          />
          Input Pounds
        </label>
        <label>
          <input
            type="radio"
            value="tons"
            checked={inputType === 'tons'}
            onChange={() => setInputType('tons')}
          />
          Input Tons
        </label>
        <label>
          <input
            type="radio"
            value="grams"
            checked={inputType === 'grams'}
            onChange={() => setInputType('grams')}
          />
          Input Grams
        </label>
        <label>
          <input
            type="radio"
            value="kilograms"
            checked={inputType === 'kilograms'}
            onChange={() => setInputType('kilograms')}
          />
          Input Kilograms
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
            {weightUnits.map(unit => (
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

      <div>
        <h3>Result</h3>
        {resultDisplay}
      </div>
    </div>
  );
};

export default WeightConverter;