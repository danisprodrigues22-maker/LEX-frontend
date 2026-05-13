import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';

function DashboardPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('lex-theme') || 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('lex-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = () => {
    localStorage.removeItem('lex-token');
    document.body.classList.remove('light-mode');
    localStorage.removeItem('lex-theme');
    navigate('/login');
  };

  return (
    <AppLayout theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout} />
  );
}

export default DashboardPage;
