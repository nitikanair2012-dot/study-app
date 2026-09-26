import React from 'react';
import { useStudyStore } from '../store/useStudyStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import './HomePage.css';

export const HomePage = ({ onStartStudy }) => {
  const subjects = useStudyStore((state) => state.subjects);
  const stats = useStudyStore((state) => state.userProgress);
  const streak = useNotificationStore((state) => state.getStreak());
  const history = useNotificationStore((state) => state.studyHistory);

  const totalCorrect = Object.values(history).reduce((acc, s) => acc + s.correct, 0);
  const totalAnswered = Object.values(history).reduce((acc, s) => acc + s.total, 0);
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="home-page">
      <div className="page-header">
        <h1>Welcome back</h1>
        <p>Let's turn studying into progress</p>
      </div>

      <Card className="welcome-card">
        <div className="welcome-content">
          <div>
            <h2>Ready to study?</h2>
            <p>Review your weak spots or start learning something new.</p>
            <Button variant="primary" size="lg" onClick={onStartStudy}>
              Start Studying →
            </Button>
          </div>
          <div className="streak-display">
            <div className="streak-number">{streak}</div>
            <div className="streak-label">Day Streak</div>
          </div>
        </div>
      </Card>

      <div className="stats-row">
        <Card>
          <h3>Questions Answered</h3>
          <div className="stat-large">{totalAnswered}</div>
        </Card>
        <Card>
          <h3>Accuracy</h3>
          <div className="stat-large">{accuracy}%</div>
          <ProgressBar current={accuracy} total={100} label={false} />
        </Card>
        <Card>
          <h3>Study Sessions</h3>
          <div className="stat-large">{Object.keys(history).length}</div>
        </Card>
      </div>

      <div className="recent-subjects">
        <h2>Your Subjects</h2>
        {subjects.length === 0 ? (
          <Card>
            <p className="empty-state">
              Add study material to create your first subject.
            </p>
          </Card>
        ) : (
          <div className="subjects-list">
            {subjects.slice(0, 5).map((subject) => (
              <Card key={subject.id} className="subject-row">
                <div className="subject-info">
                  <h3>{subject.name}</h3>
                  <p>{subject.questions?.length || 0} questions</p>
                </div>
                <Button variant="secondary" size="sm" onClick={onStartStudy}>
                  Study
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
