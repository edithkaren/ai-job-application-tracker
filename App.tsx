
import React, { useState, useEffect } from 'react';
import { User, UserRole, Job, Application, ApplicationStatus } from './types';
import { INITIAL_JOBS, MOCK_USERS } from './constants';
import Navbar from './components/Navbar';
import AuthView from './components/AuthView';
import Dashboard from './components/Dashboard';
import JobList from './components/JobList';
import ApplicationTracker from './components/ApplicationTracker';
import RecruiterDashboard from './components/RecruiterDashboard';
import JobAlerts from './components/JobAlerts';
import CandidateProfile from './components/CandidateProfile';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(MOCK_USERS);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [applications, setApplications] = useState<Application[]>([]);
  const [view, setView] = useState<'auth' | 'jobs' | 'applications' | 'dashboard' | 'alerts' | 'profile'>('auth');

  useEffect(() => {
    const savedUsers = localStorage.getItem('allUsers');
    const savedCurrentUser = localStorage.getItem('currentUser');
    const savedJobs = localStorage.getItem('jobs');
    const savedApps = localStorage.getItem('apps');

    if (savedUsers) setAllUsers(JSON.parse(savedUsers));
    if (savedCurrentUser) {
      const parsedUser = JSON.parse(savedCurrentUser);
      setCurrentUser(parsedUser);
      setView('dashboard');
    }
    if (savedJobs) setJobs(JSON.parse(savedJobs));
    if (savedApps) setApplications(JSON.parse(savedApps));
  }, []);

  useEffect(() => {
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    localStorage.setItem('jobs', JSON.stringify(jobs));
    localStorage.setItem('apps', JSON.stringify(applications));
    if (currentUser) localStorage.setItem('currentUser', JSON.stringify(currentUser));
    else localStorage.removeItem('currentUser');
  }, [currentUser, allUsers, jobs, applications]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setAllUsers(prev => {
      const exists = prev.find(u => u.id === user.id);
      if (exists) return prev.map(u => u.id === user.id ? user : u);
      return [...prev, user];
    });
    setView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('auth');
  };

  const handleApply = (newApp: Application) => {
    setApplications(prev => [...prev, newApp]);
  };

  const handlePostJob = (newJob: Job) => {
    setJobs(prev => [newJob, ...prev]);
  };

  const handleUpdateStatus = (appId: string, newStatus: ApplicationStatus) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setAllUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {currentUser && (
        <Navbar 
          user={currentUser} 
          onLogout={handleLogout} 
          activeView={view} 
          setView={setView} 
        />
      )}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {(!currentUser || view === 'auth') && (
          <AuthView onLogin={handleLogin} existingUsers={allUsers} />
        )}

        {currentUser?.role === UserRole.CANDIDATE && view !== 'auth' && (
          <>
            {view === 'dashboard' && (
              <Dashboard 
                user={currentUser} 
                applications={applications.filter(a => a.candidateId === currentUser.id)}
                jobs={jobs}
              />
            )}
            {view === 'jobs' && (
              <JobList 
                user={currentUser} 
                jobs={jobs} 
                applications={applications.filter(a => a.candidateId === currentUser.id)} 
                onApply={handleApply} 
              />
            )}
            {view === 'applications' && (
              <ApplicationTracker 
                applications={applications.filter(a => a.candidateId === currentUser.id)} 
                jobs={jobs}
              />
            )}
            {view === 'alerts' && (
              <JobAlerts 
                user={currentUser} 
                onUpdateUser={handleUpdateUser} 
              />
            )}
            {view === 'profile' && (
              <CandidateProfile 
                user={currentUser}
                onUpdate={handleUpdateUser}
              />
            )}
          </>
        )}

        {currentUser?.role === UserRole.RECRUITER && view !== 'auth' && (
          <RecruiterDashboard 
            user={currentUser}
            jobs={jobs.filter(j => j.recruiterId === currentUser.id)}
            applications={applications}
            onPostJob={handlePostJob}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </main>
    </div>
  );
};

export default App;
