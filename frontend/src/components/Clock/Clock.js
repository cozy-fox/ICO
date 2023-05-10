import React, { useState, useEffect } from 'react';
import DateTime from './DateTime';
import './index.scss';
const Clock = () => {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    
    return (
        <div className="display">
            <div className="display-time">{DateTime.toTimeString(date)}</div>
            <div className="display-date">{DateTime.toDateString(date)}</div>
        </div>
    );
}
export default Clock;