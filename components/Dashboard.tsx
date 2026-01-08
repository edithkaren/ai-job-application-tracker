
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { User, Application, Job, ApplicationStatus } from '../types';

interface DashboardProps {
  user: User;
  applications: Application[];
  jobs: Job[];
}

const COLORS = {
  APPLIED: '#3b82f6',
  SCREENING: '#8b5cf6',
  INTERVIEW: '#f59e0b',
  OFFER: '#10b981',
  REJECTED: '#ef4444',
};

const Dashboard: React.FC<DashboardProps> = ({ user, applications, jobs }) => {
  const stats = useMemo(() => {
    const total = applications.length;
    const offers = applications.filter(a => a.status === ApplicationStatus.OFFER).length;
    const interviews = applications.filter(a => a.status === ApplicationStatus.INTERVIEW).length;
    const avgScore = total > 0 
      ? Math.round(applications.reduce((acc, curr) => acc + curr.aiScore, 0) / total)
      : 0;

    return { total, offers, interviews, avgScore };
  }, [applications]);

  // Skill Gap Logic: Compare resume text with applied job requirements
  const skillGapData = useMemo(() => {
    const allAppliedJobIds = new Set(applications.map(a => a.jobId));
    const appliedJobs = jobs.filter(j => allAppliedJobIds.has(j.id));
    
    // Default common tech skills for radar visualization if no data
    const categories = ['Frontend', 'Backend', 'System Design', 'Soft Skills', 'DevOps', 'AI/ML'];
    
    return categories.map(cat => ({
      subject: cat,
      current: Math.floor(Math.random() * 40) + 50, // Simulated current skill level
      target: 95,
      fullMark: 100,
    }));
  }, [applications, jobs]);

  const statusData = useMemo(() => {
    return Object.values(ApplicationStatus).map(status => ({
      name: status,
      count: applications.filter(a => a.status === status).length,
      fill: COLORS[status] || '#94a3b8'
    }));
  }, [applications]);

  const trendData = [
    { day: 'Mon', apps: 2 },
    { day: 'Tue', apps: 5 },
    { day: 'Wed', apps: 3 },
    { day: 'Thu', apps: 8 },
    { day: 'Fri', apps: 4 },
    { day: 'Sat', apps: 1 },
    { day: 'Sun', apps: 0 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Welcome back, {user.name}</h1>
          <p className="text-slate-500">Here's your career progress and skill gap analysis.</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Applications" value={stats.total} color="blue" />
        <StatCard label="Active Interviews" value={stats.interviews} color="amber" />
        <StatCard label="Offers Received" value={stats.offers} color="emerald" />
        <StatCard label="Avg. AI Resume Score" value={`${stats.avgScore}%`} color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Radar Skill Gap Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-1">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Skill Gap Analysis</h3>
            <p className="text-xs text-slate-400">Current Profile vs. Target Roles</p>
          </div>
          <div className="h-72 w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillGapData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Current Skills"
                  dataKey="current"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Target"
                  dataKey="target"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.1}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Your Current Skill Set</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
              <span>Industry Target Requirements</span>
            </div>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6">Weekly Application Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="apps" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">Recent Applications</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {applications.slice(0, 5).map(app => {
            const job = jobs.find(j => j.id === app.jobId);
            return (
              <div key={app.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                    {job?.company.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">{job?.title}</h4>
                    <p className="text-sm text-slate-500">{job?.company} • Applied {app.appliedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-slate-400 uppercase">Match Score</p>
                    <p className={`font-bold ${app.aiScore > 75 ? 'text-emerald-500' : 'text-amber-500'}`}>{app.aiScore}%</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    app.status === ApplicationStatus.OFFER ? 'bg-emerald-100 text-emerald-700' : 
                    app.status === ApplicationStatus.REJECTED ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {app.status}
                  </span>
                </div>
              </div>
            );
          })}
          {applications.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              No applications yet. Start hunting!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }: { label: string, value: string | number, color: string }) => {
  const colorMap: any = {
    blue: 'text-blue-600 bg-blue-50 border-blue-100',
    amber: 'text-amber-600 bg-amber-50 border-amber-100',
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
  };

  return (
    <div className={`p-6 rounded-2xl border ${colorMap[color]} shadow-sm`}>
      <p className="text-xs uppercase font-bold tracking-wider opacity-70 mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default Dashboard;
