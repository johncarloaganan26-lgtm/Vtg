import React from 'react';
import { VTGLogo } from '../common/VTGLogo';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Headphones,
  Megaphone,
  BarChart3,
  FileText,
  MessageSquare,
  Settings,
  Image as ImageIcon,
  HelpCircle,
  LogOut,
  ExternalLink,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const {
    adminSection,
    setAdminSection,
    setCurrentView,
    sidebarCollapsed,
    unreadNotificationCount,
  } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'applicants', label: 'Applicants', icon: Users, badge: '7' },
    { id: 'agents', label: 'Agents', icon: Headphones },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '3', badgeColor: 'bg-red-700 text-white' },
    { id: 'media', label: 'Image & Content Panel', icon: ImageIcon, highlight: true },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      id="admin-sidebar"
      className={`fixed lg:static inset-y-0 left-0 z-30 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-all duration-300 ${
        sidebarCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Sidebar Brand Header */}
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <VTGLogo
            size={sidebarCollapsed ? 'sm' : 'md'}
            showText={!sidebarCollapsed}
            onClick={() => setAdminSection('dashboard')}
          />
        </div>

        {/* Navigation Items matching screenshot */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = adminSection === item.id;

            return (
              <button
                key={item.id}
                id={`admin-nav-${item.id}`}
                onClick={() => setAdminSection(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                  isActive
                    ? 'bg-red-50/80 text-[#B91C1C] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                } ${item.highlight && !isActive ? 'text-red-800 bg-red-50/30' : ''}`}
                title={item.label}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? 'text-[#B91C1C]' : item.highlight ? 'text-red-700' : 'text-slate-500'
                    }`}
                  />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </div>

                {!sidebarCollapsed && item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-extrabold rounded-full ${
                      item.badgeColor || 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section matching screenshot */}
      <div className="p-4 border-t border-slate-100 space-y-1.5">
        <button
          onClick={() => alert('Support line: support@vigoroustelemarketing.com | Ext: 108')}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50"
        >
          <HelpCircle className="w-4 h-4 text-slate-500" />
          {!sidebarCollapsed && <span>Help & Support</span>}
        </button>

        <button
          id="admin-logout-btn"
          onClick={() => setCurrentView('public')}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors"
          title="Return to Public Website"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-4 h-4" />
            {!sidebarCollapsed && <span>Return to Website</span>}
          </div>
          {!sidebarCollapsed && <ExternalLink className="w-3 h-3 opacity-60" />}
        </button>
      </div>
    </aside>
  );
};
