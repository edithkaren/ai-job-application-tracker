
import React from 'react';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User;
  onLogout: () => void;
  activeView: string;
  setView: (view: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, activeView, setView }) => {
  const isCandidate = user.role === UserRole.CANDIDATE;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">CP</div>
            <span>CareerPath AI</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <NavButton 
              active={activeView === 'dashboard'} 
              onClick={() => setView('dashboard')}
              label="Overview"
            />
            {isCandidate && (
              <>
                <NavButton 
                  active={activeView === 'jobs'} 
                  onClick={() => setView('jobs')}
                  label="All India Jobs"
                />
                <NavButton 
                  active={activeView === 'alerts'} 
                  onClick={() => setView('alerts')}
                  label="Job Alerts"
                />
                <NavButton 
                  active={activeView === 'applications'} 
                  onClick={() => setView('applications')}
                  label="History"
                />
                <NavButton 
                  active={activeView === 'profile'} 
                  onClick={() => setView('profile')}
                  label="Profile"
                />
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-slate-500 uppercase tracking-tighter">{user.role}</p>
          </div>
          <button 
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavButton = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
      active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    {label}
  </button>
);

export default Navbar;
