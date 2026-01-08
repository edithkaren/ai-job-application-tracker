
import React, { useState } from 'react';
import { User, JobAlert } from '../types';

interface JobAlertsProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

const JobAlerts: React.FC<JobAlertsProps> = ({ user, onUpdateUser }) => {
  const [newAlert, setNewAlert] = useState({ keywords: '', location: '', frequency: 'daily' as const });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const alert: JobAlert = {
      id: Math.random().toString(36).substr(2, 9),
      keywords: newAlert.keywords,
      location: newAlert.location,
      frequency: newAlert.frequency,
      active: true,
    };

    const updatedUser = {
      ...user,
      jobAlerts: [...(user.jobAlerts || []), alert],
    };

    onUpdateUser(updatedUser);
    setIsAdding(false);
    setNewAlert({ keywords: '', location: '', frequency: 'daily' });
  };

  const toggleAlert = (alertId: string) => {
    const updatedUser = {
      ...user,
      jobAlerts: (user.jobAlerts || []).map(a => a.id === alertId ? { ...a, active: !a.active } : a),
    };
    onUpdateUser(updatedUser);
  };

  const deleteAlert = (alertId: string) => {
    const updatedUser = {
      ...user,
      jobAlerts: (user.jobAlerts || []).filter(a => a.id !== alertId),
    };
    onUpdateUser(updatedUser);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Job Alerts</h1>
          <p className="text-slate-500">Set up AI-powered notifications for matching opportunities.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Alert
          </button>
        )}
      </header>

      {isAdding && (
        <div className="bg-white p-8 rounded-2xl border-2 border-blue-100 shadow-xl shadow-blue-50">
          <form onSubmit={handleAddAlert} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Keywords / Skills</label>
              <input 
                required
                value={newAlert.keywords}
                onChange={e => setNewAlert({ ...newAlert, keywords: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. React, Python"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Preferred Location</label>
              <input 
                value={newAlert.location}
                onChange={e => setNewAlert({ ...newAlert, location: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Remote, NYC"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Notification Frequency</label>
              <select 
                value={newAlert.frequency}
                onChange={e => setNewAlert({ ...newAlert, frequency: e.target.value as any })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="daily">Daily Recap</option>
                <option value="weekly">Weekly Digest</option>
                <option value="instant">Instant Matching</option>
              </select>
            </div>
            <div className="md:col-span-3 flex justify-end gap-4 mt-2">
              <button 
                type="button" 
                onClick={() => setIsAdding(false)}
                className="px-6 py-2 text-slate-500 font-bold hover:text-slate-700"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-blue-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-blue-700"
              >
                Save Alert
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(user.jobAlerts || []).map(alert => (
          <div key={alert.id} className={`p-6 bg-white border rounded-2xl shadow-sm transition-all ${alert.active ? 'border-slate-100' : 'bg-slate-50 opacity-60 border-transparent'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${alert.active ? 'bg-blue-50 text-blue-600' : 'bg-slate-200 text-slate-400'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{alert.keywords}</h3>
                  <p className="text-xs text-slate-500 font-medium">{alert.location || 'Anywhere'} • {alert.frequency} notifications</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleAlert(alert.id)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${alert.active ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${alert.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
                <button 
                  onClick={() => deleteAlert(alert.id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            {alert.active && (
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-tight">Matching profiles found</span>
                <button className="text-xs font-bold text-blue-600 hover:underline">View Recent Matches</button>
              </div>
            )}
          </div>
        ))}
        {(user.jobAlerts || []).length === 0 && !isAdding && (
          <div className="md:col-span-2 py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
              <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <p className="text-slate-400 font-medium">No alerts created yet. Let AI find jobs for you while you sleep!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobAlerts;
