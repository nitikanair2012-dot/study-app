import React from 'react';
import { useAccountStore } from '../store/useAccountStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import './AccountPage.css';

export const AccountPage = () => {
  const { user, updateProfile, getProfileCompletion } = useAccountStore();
  const { getStreak, studyHistory } = useNotificationStore();

  const [editMode, setEditMode] = React.useState(false);
  const [formData, setFormData] = React.useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateProfile(formData);
    setEditMode(false);
  };

  const profileCompletion = getProfileCompletion();
  const streak = getStreak();
  const sessionsCompleted = Object.keys(studyHistory).length;

  return (
    <div className="account-page">
      <div className="page-header">
        <h1>Account Profile</h1>
        <p>Manage your account settings and personal information</p>
      </div>

      {/* Profile Card */}
      <Card className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-emoji">{user.avatar}</span>
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <small>Member since {new Date(user.joinDate).toLocaleDateString()}</small>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        {editMode && (
          <div className="edit-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
              />
            </div>
            <div className="form-actions">
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setFormData(user);
                  setEditMode(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Stats */}
      <div className="stats-grid">
        <Card>
          <div className="stat-item">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{streak}</div>
              <div className="stat-label">Day Streak</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="stat-item">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{sessionsCompleted}</div>
              <div className="stat-label">Sessions Completed</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="stat-item">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="2" x2="12" y2="22"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{profileCompletion}%</div>
              <div className="stat-label">Profile Complete</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Account Security */}
      <Card className="security-card">
        <h3>Account Security</h3>
        <p>Keep your account safe and secure</p>
        <div className="security-items">
          <div className="security-item">
            <div className="item-info">
              <h4>Password</h4>
              <p>Change your password regularly</p>
            </div>
            <Button variant="secondary" size="sm">
              Change Password
            </Button>
          </div>
          <div className="security-item">
            <div className="item-info">
              <h4>Two-Factor Authentication</h4>
              <p>Add an extra layer of security</p>
            </div>
            <Button variant="secondary" size="sm">
              Enable 2FA
            </Button>
          </div>
        </div>
      </Card>

      {/* Data & Privacy */}
      <Card className="privacy-card">
        <h3>Data & Privacy</h3>
        <p>Manage your data and privacy settings</p>
        <div className="privacy-items">
          <div className="privacy-item">
            <span>Download my data</span>
            <Button variant="ghost" size="sm">
              Download
            </Button>
          </div>
          <div className="privacy-item">
            <span>Delete account</span>
            <Button variant="danger" size="sm">
              Delete Account
            </Button>
          </div>
        </div>
      </Card>

      {/* About */}
      <Card className="about-card">
        <h3>About Study App</h3>
        <div className="about-content">
          <p>
            <strong>Version:</strong> 1.0.0
          </p>
          <p>
            <strong>Last Updated:</strong> September 2, 2026
          </p>
          <p className="about-description">
            Study App helps students learn effectively through spaced repetition,
            adaptive difficulty, and smart study sessions.
          </p>
          <div className="about-links">
            <a href="#privacy" className="link">
              Privacy Policy
            </a>
            <a href="#terms" className="link">
              Terms of Service
            </a>
            <a href="#contact" className="link">
              Contact Us
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};
