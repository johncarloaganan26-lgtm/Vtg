import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Search,
  Bell,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  User,
  Shield,
  Clock,
} from 'lucide-react';

export const AdminHeader: React.FC = () => {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    unreadNotificationCount,
    notifications,
    markAllNotificationsRead,
    setCurrentView,
    adminSearchQuery,
    setAdminSearchQuery,
    setAdminSection,
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="h-20 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Sidebar Toggle + Search */}
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <button
          id="admin-sidebar-toggle"
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search bar matching screenshot */}
        <div className="relative flex-1 max-w-md hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="admin-global-search"
            value={adminSearchQuery}
            onChange={(e) => setAdminSearchQuery(e.target.value)}
            placeholder="Search applicants, agents, campaigns..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all placeholder:text-slate-400"
          />
          {adminSearchQuery && (
            <button
              onClick={() => setAdminSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick Return to Public Site Button */}
        <button
          onClick={() => setCurrentView('public')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-red-700 bg-slate-50 hover:bg-red-50 border border-slate-200 rounded-lg transition-all"
        >
          <span>View Website</span>
          <ExternalLink className="w-3 h-3" />
        </button>

        {/* Notification Bell with Badge 5 matching screenshot */}
        <div className="relative">
          <button
            id="admin-notifications-btn"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileMenuOpen(false);
            }}
            className="relative p-2.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-slate-700" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#B91C1C] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in duration-150">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Notifications
                  </span>
                  <span className="px-1.5 py-0.5 bg-red-100 text-[#B91C1C] text-[10px] font-bold rounded-full">
                    {unreadNotificationCount} new
                  </span>
                </div>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-[11px] font-semibold text-[#8B151E] hover:underline"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3.5 hover:bg-slate-50 transition-colors ${
                      notif.unread ? 'bg-red-50/20' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal">{notif.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-2.5 bg-slate-50 text-center border-t border-slate-100">
                <button
                  onClick={() => {
                    setNotificationsOpen(false);
                    setAdminSection('applicants');
                  }}
                  className="text-xs font-bold text-[#B91C1C] hover:underline"
                >
                  View All Activity Logs →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Pill matching screenshot */}
        <div className="relative">
          <button
            id="admin-profile-menu-btn"
            onClick={() => {
              setProfileMenuOpen(!profileMenuOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-full hover:bg-slate-50 border border-slate-100 transition-colors"
          >
            {/* User Icon Avatar in dark circle */}
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <User className="w-5 h-5" />
            </div>

            {/* Profile Label matching screenshot */}
            <div className="text-left hidden sm:block">
              <div className="text-xs font-extrabold text-slate-900 leading-tight">
                Administrator
              </div>
              <div className="text-[10px] font-semibold text-slate-500 leading-tight">
                Super Admin
              </div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in duration-150">
              <div className="px-4 py-2 border-b border-slate-100 mb-1">
                <div className="text-xs font-bold text-slate-900">John Carlo Aga-Aganan</div>
                <div className="text-[11px] text-slate-500">johncarloagaaganan08@gmail.com</div>
              </div>

              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  setAdminSection('settings');
                }}
                className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-slate-500" />
                <span>Admin Settings</span>
              </button>

              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  setAdminSection('media');
                }}
                className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-red-700" />
                <span>Content & Image Panel</span>
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                onClick={() => setCurrentView('public')}
                className="w-full px-4 py-2 text-left text-xs font-bold text-red-700 hover:bg-red-50 flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Switch to Public Site</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
