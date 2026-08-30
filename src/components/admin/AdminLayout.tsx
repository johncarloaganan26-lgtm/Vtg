import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { DashboardView } from './DashboardView';
import { ApplicantsView } from './ApplicantsView';
import { AgentsView } from './AgentsView';
import { CampaignsView } from './CampaignsView';
import { PerformanceView } from './PerformanceView';
import { MediaUploadsPanel } from './MediaUploadsPanel';
import { SettingsView } from './SettingsView';
import { MessagesView } from './MessagesView';
import { ApplicantDetailModal } from './ApplicantDetailModal';
import { ApplyModal } from '../public/ApplyModal';

export const AdminLayout: React.FC = () => {
  const { adminSection, sidebarCollapsed, setSidebarCollapsed } = useApp();

  const renderSection = () => {
    switch (adminSection) {
      case 'dashboard':
        return <DashboardView />;
      case 'applicants':
        return <ApplicantsView />;
      case 'agents':
        return <AgentsView />;
      case 'campaigns':
        return <CampaignsView />;
      case 'performance':
      case 'reports':
        return <PerformanceView />;
      case 'media':
        return <MediaUploadsPanel />;
      case 'messages':
        return <MessagesView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Mobile overlay backdrop when sidebar is expanded */}
      {!sidebarCollapsed && (
        <div
          onClick={() => setSidebarCollapsed(true)}
          className="fixed inset-0 z-20 bg-slate-900/40 lg:hidden backdrop-blur-2xs"
        />
      )}

      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Admin Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <AdminHeader />
        <main className="flex-1 px-3 py-4 sm:p-8 max-w-7xl w-full mx-auto">
          {renderSection()}
        </main>
      </div>

      {/* Modals */}
      <ApplicantDetailModal />
      <ApplyModal />
    </div>
  );
};
