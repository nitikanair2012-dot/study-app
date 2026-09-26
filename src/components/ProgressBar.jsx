import React from 'react';
import './ProgressBar.css';

export const ProgressBar = ({ current, total, label = true }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-container">
      {label && (
        <div className="progress-label">
          Question {current} of {total}
        </div>
      )}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="progress-percentage">{Math.round(percentage)}%</div>
    </div>
  );
};
