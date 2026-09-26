import React from 'react';
import './Calendar.css';

export const Calendar = ({ studyHistory = {} }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const getDateString = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toISOString().split('T')[0];
  };

  const getStudyData = (day) => {
    if (!day) return null;
    const dateStr = getDateString(day);
    return studyHistory[dateStr] || null;
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="calendar-nav" onClick={previousMonth}>
          ←
        </button>
        <h3>{monthName}</h3>
        <button className="calendar-nav" onClick={nextMonth}>
          →
        </button>
      </div>

      <div className="calendar-weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day, index) => {
          const studyData = getStudyData(day);
          const isToday =
            day &&
            new Date().toISOString().split('T')[0] === getDateString(day);

          return (
            <div
              key={index}
              className={`calendar-day ${day ? 'active' : 'empty'} ${
                isToday ? 'today' : ''
              } ${studyData ? 'studied' : ''}`}
            >
              {day && (
                <>
                  <div className="day-number">{day}</div>
                  {studyData && (
                    <div className="day-score">
                      {studyData.score}%
                      <div className="day-tooltip">
                        {studyData.correct}/{studyData.total} correct
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
