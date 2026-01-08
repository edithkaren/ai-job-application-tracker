
import React, { useState } from 'react';
import { Application, Job, ApplicationStatus } from '../types';

interface ApplicationTrackerProps {
  applications: Application[];
  jobs: Job[];
}

const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({ applications, jobs }) => {
  const [filter, setFilter] = useState<ApplicationStatus | 'ALL'>('ALL');

  const filteredApps = applications.filter(app => filter === 'ALL' || app.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">My Applications</h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {['ALL', ...Object.values(ApplicationStatus)].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                filter === status 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredApps.map(app => {
          const job = jobs.find(j => j.id === app.jobId);
          return (
            <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-2xl text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-200 transition-colors">
                  {job?.company.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{job?.title}</h3>
                  <p className="text-slate-500 font-medium">{job?.company} • Applied on {app.appliedDate}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">AI Match Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${app.aiScore > 70 ? 'bg-emerald-500' : 'bg-amber-500'} transition-all duration-1000`} 
                        style={{ width: `${app.aiScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-slate-700">{app.aiScore}%</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Status</span>
                  <span className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-tighter ${
                    app.status === ApplicationStatus.OFFER ? 'bg-emerald-100 text-emerald-700' :
                    app.status === ApplicationStatus.REJECTED ? 'bg-red-100 text-red-700' :
                    app.status === ApplicationStatus.INTERVIEW ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}

        {filteredApps.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-400 font-medium">No applications found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationTracker;
