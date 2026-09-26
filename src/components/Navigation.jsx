import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';
import './Navigation.css';

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">Study</span>
        </Link>
        
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/subjects"
            className={`nav-link ${isActive('/subjects') ? 'active' : ''}`}
          >
            Subjects
          </Link>
          <Link
            to="/settings"
            className={`nav-link ${isActive('/settings') ? 'active' : ''}`}
          >
            Settings
          </Link>
        </div>
        
        <div className="nav-actions">
          <ThemeSwitcher />
          <Link to="/account" className="account-button" title="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};
