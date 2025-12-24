import React, { useState } from 'react';
import { oticNames, apicNames } from '../utils/timeSystem';

const SimpleCalendar: React.FC = () => {
  const [currentOtic, setCurrentOtic] = useState(Math.floor(new Date().getMonth() / 3));
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<{ otic: number; apic: number; day: number; year: number } | null>(null);

  const handlePrevOtic = () => {
    if (currentOtic > 0) {
      setCurrentOtic(currentOtic - 1);
    } else {
      setCurrentOtic(3);
      setCurrentYear(currentYear - 1);
    }
  };

  const handleNextOtic = () => {
    if (currentOtic < 3) {
      setCurrentOtic(currentOtic + 1);
    } else {
      setCurrentOtic(0);
      setCurrentYear(currentYear + 1);
    }
  };

  const getCurrentDayInOtic = () => {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    const otic = Math.floor(month / 3);
    const apic = Math.floor((day - 1) / 10); // 10 days per apic
    const dayInApic = ((day - 1) % 10) + 1;
    return { otic, apic, dayInApic, year: now.getFullYear() };
  };

  const { otic: currentOticReal, apic: currentApic, dayInApic, year: currentYearReal } = getCurrentDayInOtic();
  const isCurrentOtic = currentOtic === currentOticReal && currentYear === currentYearReal;
  const ubic = currentYear - 2025 + 405;

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Rosan Calendar</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={handlePrevOtic}>Prev</button>
        <h3>{oticNames[currentOtic]} {ubic}</h3>
        <button onClick={handleNextOtic}>Next</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '50px repeat(10, 1fr)', gap: '5px' }}>
        <div></div> {/* Empty top-left */}
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} style={{ fontWeight: 'bold', textAlign: 'center' }}>{i + 1}</div>
        ))}
        {apicNames.map((apic, rowIndex) => (
          <React.Fragment key={apic}>
            <div style={{ fontWeight: 'bold', textAlign: 'center', alignSelf: 'center' }}>{apic}</div>
            {Array.from({ length: 10 }, (_, colIndex) => {
              const dayNumber = rowIndex * 10 + colIndex + 1;
              const isCurrentDay = isCurrentOtic && rowIndex === currentApic && colIndex + 1 === dayInApic;
              const isSelected = selectedDate && selectedDate.otic === currentOtic && selectedDate.apic === rowIndex && selectedDate.day === colIndex + 1 && selectedDate.year === currentYear;
              return (
                <div
                  key={colIndex}
                  style={{
                    textAlign: 'center',
                    padding: '10px',
                    border: '1px solid #ddd',
                    backgroundColor: isCurrentDay ? '#e0e0e0' : isSelected ? '#d0d0d0' : 'white',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedDate({ otic: currentOtic, apic: rowIndex, day: colIndex + 1, year: currentYear })}
                >
                  {dayNumber}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      {selectedDate && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h4>Selected Date:</h4>
          {(() => {
            const ubic_val = selectedDate.year - 2025 + 405;
            const descriptive = `${selectedDate.day}/${apicNames[selectedDate.apic]}/${oticNames[selectedDate.otic]}/${ubic_val}`;
            const numeric = `${selectedDate.day}/${selectedDate.apic + 1}/${selectedDate.otic + 1}/${ubic_val}`;
            return (
              <div>
                <div>{descriptive}</div>
                <div>{numeric}</div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default SimpleCalendar;