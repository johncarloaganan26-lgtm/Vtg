import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save, Plus, CheckCircle2, Shield, Bell, Globe } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useApp();
  const [saved, setSaved] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDue, setNewTaskDue] = useState('Due today');
  const [newTaskBadge, setNewTaskBadge] = useState('High');

  const [companyName, setCompanyName] = useState('Vigorous Telemarketing Group');
  const [tagline, setTagline] = useState('Specialists in Outbound Telemarketing & Call Center Solutions');
  const [phone, setPhone] = useState('(02) 8123-4567');
  const [email, setEmail] = useState('recruitment@vigoroustelemarketing.com');
  const [address, setAddress] = useState('Metro Manila & Angeles City, Philippines');

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask({
      title: newTaskTitle.trim(),
      dueText: newTaskDue,
      badgeVariant: newTaskBadge === 'High' ? 'high' : newTaskBadge === 'Urgent' ? 'urgent' : 'medium',
      badgeText: newTaskBadge,
      completed: false,
    });

    setNewTaskTitle('');
  };

  return (
    <div id="admin-settings-view" className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          System & Organization Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Configure site content, public contact channels, and manage administrative task delegations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Company Info */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B151E] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Organization & Branding</h3>
              <p className="text-xs text-slate-500">Public profile details displayed across the website</p>
            </div>
          </div>

          <form onSubmit={handleSaveConfig} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Tagline / Mission Statement
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Recruitment Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Office Headquarters
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              {saved ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Settings successfully saved!
                </span>
              ) : (
                <span className="text-xs text-slate-400">All updates sync to local state</span>
              )}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#8B151E] hover:bg-[#720E15] text-white text-xs font-bold flex items-center gap-2 shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Form: Admin Tasks Manager */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B151E] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Admin Task Delegation</h3>
              <p className="text-xs text-slate-500">Tasks visible on dashboard</p>
            </div>
          </div>

          {/* Add task form */}
          <form onSubmit={handleAddTask} className="space-y-3 p-4 bg-slate-50 rounded-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Create New Task
            </div>
            <input
              type="text"
              required
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="e.g. Audit outbound audio recordings..."
              className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={newTaskDue}
                onChange={(e) => setNewTaskDue(e.target.value)}
                placeholder="Due date (e.g. Due Friday)"
                className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-slate-200"
              />
              <select
                value={newTaskBadge}
                onChange={(e) => setNewTaskBadge(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-slate-200"
              >
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
                <option value="Medium">Medium</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </form>

          {/* Tasks list */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(t.id)}
                    className="rounded text-red-700 focus:ring-red-700 cursor-pointer"
                  />
                  <div className="truncate">
                    <div className={t.completed ? 'line-through text-slate-400' : 'font-bold text-slate-800'}>
                      {t.title}
                    </div>
                    <div className="text-[10px] text-slate-400">{t.dueText}</div>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(t.id)}
                  className="text-slate-400 hover:text-rose-600 ml-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
