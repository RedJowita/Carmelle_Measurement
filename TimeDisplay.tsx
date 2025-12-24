import { useState, useEffect } from 'react';
import { getCurrentTimeInFictional } from '../utils/timeSystem';

const TimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fictionalTime, setFictionalTime] = useState<Record<string, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setFictionalTime(getCurrentTimeInFictional());
    }, 100); // update every 100ms for smooth display

    return () => clearInterval(interval);
  }, []);

  const formatStandardTime = (date: Date) => {
    return date.toLocaleTimeString();
  };

  const formatFictionalTime = (time: Record<string, number>) => {
    const lewic = time.lewic || 0;
    const dimic = time.dimic || 0;
    const yakic = time.yakic || 0;
    return `${lewic}:${dimic}:${yakic}`;
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Rosan Time</h2>
      <p>Standard Time: {formatStandardTime(currentTime)}</p>
      <p>Fictional Time: {formatFictionalTime(fictionalTime)}</p>
    </div>
  );
};

export default TimeDisplay;