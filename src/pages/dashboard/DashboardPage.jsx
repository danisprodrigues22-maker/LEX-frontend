import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import { getTheme as getStoredTheme, setTheme as setStoredTheme, removeTheme } from '../../utils/storage';
import api from '../../api/axiosConfig';

function DashboardPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(getStoredTheme());

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    setStoredTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.warn('Logout API call failed, proceeding with local cleanup:', err);
    } finally {
      document.body.classList.remove('light-mode');
      removeTheme();
      navigate('/login');
    }
  };

  return (
    <AppLayout theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout} />
  );
}

export default DashboardPage;
