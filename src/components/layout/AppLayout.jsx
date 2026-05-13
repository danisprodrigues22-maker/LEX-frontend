import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';
import './AppLayout.css';

function AppLayout({ theme, toggleTheme, onLogout }) {
  return (
    <div className="app-layout">
      <Sidebar theme={theme} toggleTheme={toggleTheme} onLogout={onLogout} />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

export default AppLayout;
