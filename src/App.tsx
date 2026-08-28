import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PublicWebsite } from './components/public/PublicWebsite';
import { AdminLayout } from './components/admin/AdminLayout';

const MainAppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="relative min-h-screen">
      {/* Dynamic View Switcher */}
      {currentView === 'public' ? <PublicWebsite /> : <AdminLayout />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
