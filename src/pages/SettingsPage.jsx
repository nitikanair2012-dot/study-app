import React from 'react';
import { useNotificationStore } from '../store/useNotificationStore';
import { Calendar } from '../components/Calendar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import './SettingsPage.css';

export const SettingsPage = () => {
  const {
    dailyReminderEnabled,
    reminderTime,
    notificationsEnabled,
    setDailyReminder,
    requestNotificationPermission,
    studyHistory,
  } = useNotificationStore();

  const [showTimeInput, setShowTimeInput] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState(reminderTime);

  const handleEnableReminder = async () => {
    if (!notificationsEnabled) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        alert('Please enable notifications in your browser settings.');
        return;
      }
    }
    setDailyReminder(!dailyReminderEnabled, selectedTime);
  };

  const handleTimeChange = () => {
    setDailyReminder(true, selectedTime);
    setShowTimeInput(false);
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings ⚙️</h1>
        <p>Customize your study experience</p>
      </div>

      <div className="settings-grid">
        {/* Reminders Section */}
        <Card className="settings-section">
          <div className="section-header">
            <h2>Daily Reminders</h2>
            <p>Get reminded to practice every day</p>
          </div>

          <div className="setting-item">
            <div className="setting-label">
              <span>Enable Daily Practice Reminders</span>
              <small>Get notified at a set time each day</small>
            </div>
            <div className="setting-control">
              <button
                className={`toggle ${dailyReminderEnabled ? 'active' : ''}`}
                onClick={handleEnableReminder}
              >
                <span className="toggle-slider" />
              </button>
            </div>
          </div>

          {dailyReminderEnabled && (
            <div className="time-picker-container">
              {!showTimeInput ? (
                <div className="time-display">
                  <span>Reminder time: {reminderTime}</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowTimeInput(true)}
                  >
                    Change Time
                  </Button>
                </div>
              ) : (
                <div className="time-input-group">
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="time-input"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleTimeChange}
                  >
                    Set
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowTimeInput(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="reminder-info">
            <p>
              ℹ️ When enabled, you'll receive browser notifications at your
              chosen time each day. Make sure notifications are allowed in your
              browser settings.
            </p>
          </div>
        </Card>

        {/* Theme Section */}
        <Card className="settings-section">
          <div className="section-header">
            <h2>Theme & Appearance</h2>
            <p>Choose your preferred color theme</p>
          </div>
          <p>Theme switcher available in the top navigation bar</p>
        </Card>

        {/* Study Calendar */}
        <Card className="settings-section calendar-section">
          <div className="section-header">
            <h2>Your Study Calendar</h2>
            <p>Track your study sessions</p>
          </div>
          <Calendar studyHistory={studyHistory} />
        </Card>

        {/* Study Statistics */}
        <Card className="settings-section">
          <div className="section-header">
            <h2>Study Statistics</h2>
            <p>Your overall progress</p>
          </div>
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-value">
                {Object.keys(studyHistory).length}
              </div>
              <div className="stat-label">Study Sessions</div>
            </div>
            <div className="stat">
              <div className="stat-value">
                {Object.values(studyHistory).reduce((acc, s) => acc + s.correct, 0)}
              </div>
              <div className="stat-label">Questions Correct</div>
            </div>
            <div className="stat">
              <div className="stat-value">
                {Object.values(studyHistory).length > 0
                  ? Math.round(
                      (Object.values(studyHistory).reduce(
                        (acc, s) => acc + s.score,
                        0
                      ) /
                        Object.values(studyHistory).length) *
                        100
                    ) / 100
                  : 0}
                %
              </div>
              <div className="stat-label">Avg. Accuracy</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
