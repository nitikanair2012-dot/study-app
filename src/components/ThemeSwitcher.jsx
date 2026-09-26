import React from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { THEMES } from '../utils/themes';
import './ThemeSwitcher.css';

export const ThemeSwitcher = () => {
  const { currentTheme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="theme-switcher">
      <button 
        className="theme-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Change theme"
      >
        A
      </button>
      
      {isOpen && (
        <div className="theme-menu">
          {Object.entries(THEMES).map(([key, theme]) => (
            <button
              key={key}
              className={`theme-option ${currentTheme === key ? 'active' : ''}`}
              style={{
                backgroundColor: theme.light,
                borderColor: theme.primary,
              }}
              onClick={() => {
                setTheme(key);
                setIsOpen(false);
              }}
              title={theme.name}
            >
              <span className="theme-name">{theme.name}</span>
              <div
                className="theme-preview"
                style={{ backgroundColor: theme.primary }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
