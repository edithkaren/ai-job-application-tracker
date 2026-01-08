
import React, { useState, useMemo, useRef } from 'react';
import { Job, User, Application, ApplicationStatus, AIAnalysisResult } from '../types';
import { analyzeResume } from '../services/gemini';

interface JobListProps {
  user: User;
  jobs: Job[];
  applications: Application[];
  onApply: (app: Application) => void;
}

const JobList: React.FC<JobListProps> = ({ user, jobs, applications, onApply }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterField, setFilterField] = useState('');
  const [filterExp, setFilterExp] = useState('');

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [resumeText, setResumeText] = useState(user.resumeText || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchLoc = !filterLocation || job.location.toLowerCase().includes(filterLocation.toLowerCase());
      const matchField = !filterField || job.field === filterField;
      const matchExp = !filterExp || job.experienceLevel === filterExp;
      return matchSearch && matchLoc && matchField && matchExp;
    });
  }, [jobs, searchTerm, filterLocation, filterField, filterExp]);

  const fields = useMemo(() => Array.from(new Set(jobs.map(j => j.field))), [jobs]);

  const handleStartAnalysis = async () => {
    if (!selectedJob) return;
    setIsAnalyzing(true);
    const result = await analyzeResume(resumeText, selectedJob.description);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setResumeText(event.target?.result as string);
    reader.readAsText(file);
  };

  const handleFinalApply = () => {
    if (!selectedJob || !analysis) return;
    onApply({
      id: Math.random().toString(36).substr(2, 9),
      jobId: selectedJob.id,
      candidateId: user.id,
      status: ApplicationStatus.APPLIED,
      appliedDate: new Date().toISOString().split('T')[0],
      aiScore: analysis.score,
      feedback: analysis.matchingPoints.join(', '),
      missingSkills: analysis.missingSkills
    });
    setSelectedJob(null);
    setAnalysis(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-black text-slate-800">Explore Jobs Across India</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Job title or company..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="City (e.g. Bangalore)..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            />
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
          </div>

          <select 
            className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={filterField}
            onChange={e => setFilterField(e.target.value)}
          >
            <option value="">All Fields</option>
            {fields.map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          <select 
            className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={filterExp}
            onChange={e => setFilterExp(e.target.value)}
          >
            <option value="">Experience Level</option>
            <option value="Entry">Entry Level</option>
            <option value="Mid">Mid Level</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map(job => {
          const isApplied = applications.some(a => a.jobId === job.id);
          return (
            <div key={job.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl uppercase">
                  {job.company.charAt(0)}
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold text-slate-300 uppercase">{job.experienceLevel}</span>
                  <span className="block text-xs font-medium text-slate-400 mt-1">{job.location}</span>
                </div>
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{job.title}</h3>
              <p className="text-blue-600 text-sm font-bold mb-3">{job.company} • {job.field}</p>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4">{job.description}</p>
              
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                <span className="text-[10px] font-black text-slate-300 uppercase">Posted {job.postedAt}</span>
                <button 
                  disabled={isApplied}
                  onClick={() => setSelectedJob(job)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isApplied 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isApplied ? 'Applied' : 'Details & Apply'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8 border-b border-slate-50 pb-6">
                <div>
                  <h2 className="text-3xl font-black text-slate-800">{selectedJob.title}</h2>
                  <p className="text-blue-600 font-bold text-lg">{selectedJob.company} • {selectedJob.location}</p>
                  <p className="text-slate-400 text-sm mt-1">{selectedJob.field} • {selectedJob.experienceLevel} Experience</p>
                </div>
                <button onClick={() => setSelectedJob(null)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                  <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {!analysis ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <h4 className="font-bold text-slate-800 text-lg">About the Role</h4>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{selectedJob.description}</p>
                    <h4 className="font-bold text-slate-800 text-lg">Key Requirements</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedJob.requirements.map(req => (
                        <li key={req} className="flex gap-2 items-center text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 h-fit space-y-6">
                    <h4 className="font-bold text-slate-800">Quick Apply with AI</h4>
                    <p className="text-xs text-slate-500">Upload your resume to see your match score and missing skills immediately.</p>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-3 bg-white border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-blue-400 transition-all text-sm"
                    >
                      Upload Resume (.txt)
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" accept=".txt" onChange={handleFileUpload} />
                    <textarea 
                      className="w-full h-32 p-3 bg-white border border-slate-200 rounded-2xl outline-none text-xs" 
                      placeholder="Or paste resume text here..."
                      value={resumeText}
                      onChange={e => setResumeText(e.target.value)}
                    />
                    <button 
                      onClick={handleStartAnalysis}
                      disabled={!resumeText || isAnalyzing}
                      className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyze My Match'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-50 p-8 rounded-3xl flex items-center justify-center gap-6">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="56" stroke="#e2e8f0" strokeWidth="12" fill="transparent" />
                          <circle cx="64" cy="64" r="56" stroke="#3b82f6" strokeWidth="12" fill="transparent" strokeDasharray={351.8} strokeDashoffset={351.8 - (351.8 * analysis.score) / 100} className="transition-all duration-1000" />
                        </svg>
                        <span className="absolute text-3xl font-black text-slate-800">{analysis.score}%</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-slate-800">Match Score</h4>
                        <p className="text-sm text-slate-500">Based on your skills & experience</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Missing Skills Identified</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.missingSkills.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold">
                            ! {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-800">Strong Points</h4>
                      <div className="space-y-2">
                        {analysis.matchingPoints.map(p => (
                          <div key={p} className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-sm text-emerald-800 font-medium flex gap-2">
                            <span className="text-emerald-500 font-black">✓</span> {p}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-800">Improvement Tips</h4>
                      <div className="space-y-2">
                        {analysis.improvements.map(i => (
                          <div key={i} className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-sm text-indigo-800 font-medium">
                            💡 {i}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-slate-50">
                    <button onClick={() => setAnalysis(null)} className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 transition-colors">Edit Resume</button>
                    <button onClick={handleFinalApply} className="flex-[2] py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">Submit Final Application</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
