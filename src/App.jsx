import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStudyStore } from './store/useStudyStore';
import { useThemeStore } from './store/useThemeStore';
import { useNotificationStore } from './store/useNotificationStore';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { SettingsPage } from './pages/SettingsPage';
import { AccountPage } from './pages/AccountPage';
import './styles/globals.css';

function App() {
  const { subjects, currentSession } = useStudyStore();
  const { initializeTheme } = useThemeStore();
  const { recordStudySession } = useNotificationStore();

  React.useEffect(() => {
    // Initialize theme on mount
    useThemeStore.getState().setTheme('lavender');
  }, []);

  const handleStartStudy = () => {
    if (subjects.length === 0) {
      alert('Please add some study material first!');
      return;
    }
    // Navigate to study page
  };

  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<HomePage onStartStudy={handleStartStudy} />}
            />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/subjects" element={<div>Subjects Page</div>} />
            <Route path="/study" element={<div>Study Page</div>} />
            <Route path="/review" element={<div>Review Page</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
