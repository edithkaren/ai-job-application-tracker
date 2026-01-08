
import React, { useState, useMemo } from 'react';
import { User, Job, Application, ApplicationStatus } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface RecruiterDashboardProps {
  user: User;
  jobs: Job[];
  applications: Application[];
  onPostJob: (job: Job) => void;
  onUpdateStatus: (appId: string, status: ApplicationStatus) => void;
}

const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ user, jobs, applications, onPostJob, onUpdateStatus }) => {
  const [showAddJob, setShowAddJob] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', description: '', location: '', field: 'Software Engineering', exp: 'Mid', requirements: '', deadline: '' });

  const analyticsData = useMemo(() => {
    const statusCounts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as any);

    return Object.values(ApplicationStatus).map(status => ({
      name: status,
      value: statusCounts[status] || 0
    }));
  }, [applications]);

  const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    onPostJob({
      id: Math.random().toString(36).substr(2, 9),
      title: newJob.title,
      company: user.companyName || 'My Company',
      description: newJob.description,
      location: newJob.location,
      field: newJob.field,
      experienceLevel: newJob.exp as any,
      requirements: newJob.requirements.split(',').map(r => r.trim()),
      recruiterId: user.id,
      postedAt: new Date().toISOString().split('T')[0],
      deadline: newJob.deadline || undefined
    });
    setShowAddJob(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Talent Acquisition Center</h1>
          <p className="text-slate-500">Analytics and management for {user.companyName}</p>
        </div>
        <button 
          onClick={() => setShowAddJob(true)}
          className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-blue-700 shadow-xl shadow-blue-100 flex items-center gap-2"
        >
          Post New Role
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800">Applicant Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analyticsData} dataKey="value" innerRadius={60} outerRadius={80} paddingAngle={5}>
                  {analyticsData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {analyticsData.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                {d.name}: {d.value}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Pipeline Velocity</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={jobs.map(j => ({ name: j.title.substring(0, 10), apps: applications.filter(a => a.jobId === j.id).length }))}>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                 <Tooltip cursor={{ fill: '#f8fafc' }} />
                 <Bar dataKey="apps" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h3 className="text-xl font-bold text-slate-800">Candidate Pipeline</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Candidate Info</th>
                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Role Applied</th>
                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">AI Match</th>
                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {applications.filter(a => jobs.some(j => j.id === a.jobId)).map(app => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-800">Candidate #{app.candidateId.substr(0,6)}</p>
                    <p className="text-xs text-slate-400 uppercase mt-1">Applied {app.appliedDate}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-medium text-slate-600">{jobs.find(j => j.id === app.jobId)?.title}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden w-24">
                        <div className={`h-full ${app.aiScore > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${app.aiScore}%` }}></div>
                      </div>
                      <span className="text-sm font-black text-slate-800">{app.aiScore}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <select 
                      value={app.status}
                      onChange={(e) => onUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.values(ApplicationStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddJob && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            <form onSubmit={handlePost} className="p-8 space-y-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-black text-slate-800 mb-6">Launch New Opportunity</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Job Title</label>
                  <input required value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Lead Developer" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Location</label>
                    <input required value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Bangalore" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Field</label>
                    <select value={newJob.field} onChange={e => setNewJob({...newJob, field: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option>Software Engineering</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                      <option>Artificial Intelligence</option>
                      <option>Design</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Experience Level</label>
                  <select value={newJob.exp} onChange={e => setNewJob({...newJob, exp: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="Entry">Entry Level</option>
                    <option value="Mid">Mid Level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Job Description</label>
                  <textarea required value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} className="w-full h-32 px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="What will they do?" />
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setShowAddJob(false)} className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600">Cancel</button>
                <button type="submit" className="flex-[2] py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">Publish Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
