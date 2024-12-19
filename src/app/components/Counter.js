import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [elapsed, setElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateElapsed = () => {
      const now = new Date();
      const startDate = new Date('2023-10-23');
      const diff = now.getTime() - startDate.getTime();

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.4375));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.4375)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setElapsed({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
      });
    };

    const interval = setInterval(calculateElapsed, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4">
          <div className="text-5xl   items-center  gap-2 bg-gray-900 text-gray-400 rounded-full shadow-lg p-8 flex  justify-center w-72">
              <span className=" font-bold">{elapsed.years}</span>
              <span className=" text-sm">{elapsed.years > 1 ? `Years` : `Year`}</span>
              <span className=" font-bold">{elapsed.months}</span>
              <span className=" text-sm">{elapsed.months > 1 ? `Months` : `Month`}</span>
              <span className=" font-bold">{elapsed.days}</span>
              <span className=" text-sm">Days</span>
          </div>
          <div className='flex flex-col text-gray-400'>
              <p className="">and counting...</p>
              <div className="text-2xl font-bold ">{elapsed.hours.toString().padStart(2, '0')}:{elapsed.minutes.toString().padStart(2, '0')}:{elapsed.seconds.toString().padStart(2, '0')}</div>
          </div>
      </div>
  );
};

export default Counter;