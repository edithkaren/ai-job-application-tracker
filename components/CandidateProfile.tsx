
import React, { useState } from 'react';
import { User, Education, Experience, Certification, SocialLinks } from '../types';

interface CandidateProfileProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

const CandidateProfile: React.FC<CandidateProfileProps> = ({ user, onUpdate }) => {
  const [profile, setProfile] = useState<User>(user);
  const [activeTab, setActiveTab] = useState<'personal' | 'education' | 'experience' | 'certifications' | 'socials'>('personal');

  // Form States
  const [newEdu, setNewEdu] = useState<Education>({ school: '', degree: '', year: '' });
  const [newExp, setNewExp] = useState<Experience>({ company: '', role: '', duration: '', description: '' });
  const [newCert, setNewCert] = useState<Certification>({ name: '', issuer: '', link: '', date: '' });

  const handleSave = () => {
    onUpdate(profile);
    alert('Profile saved successfully!');
  };

  const addItem = (type: 'education' | 'experience' | 'certifications') => {
    if (type === 'education') {
      if (!newEdu.school || !newEdu.degree) return;
      setProfile({ ...profile, education: [...(profile.education || []), newEdu] });
      setNewEdu({ school: '', degree: '', year: '' });
    } else if (type === 'experience') {
      if (!newExp.company || !newExp.role) return;
      setProfile({ ...profile, experience: [...(profile.experience || []), newExp] });
      setNewExp({ company: '', role: '', duration: '', description: '' });
    } else if (type === 'certifications') {
      if (!newCert.name || !newCert.issuer) return;
      setProfile({ ...profile, certifications: [...(profile.certifications || []), newCert] });
      setNewCert({ name: '', issuer: '', link: '', date: '' });
    }
  };

  const removeItem = (type: 'education' | 'experience' | 'certifications', index: number) => {
    const list = [...(profile[type] as any[])];
    list.splice(index, 1);
    setProfile({ ...profile, [type]: list });
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white relative">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl font-black border border-white/30 shadow-inner">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight">{profile.name}</h1>
                <p className="text-blue-100 font-medium text-lg mt-1 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {profile.location || 'Add Location'}
                </p>
              </div>
            </div>
            <button 
              onClick={handleSave}
              className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-black hover:bg-blue-50 transition-all hover:scale-105 shadow-xl shadow-blue-900/20 active:scale-95"
            >
              Save Profile Changes
            </button>
          </div>
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-100 bg-slate-50/50 px-4">
          {(['personal', 'experience', 'education', 'certifications', 'socials'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-5 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all relative ${
                activeTab === tab 
                ? 'text-blue-600' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        <div className="p-10">
          {activeTab === 'personal' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    className="w-full px-5 py-3 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                    value={profile.name}
                    onChange={e => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    disabled
                    className="w-full px-5 py-3 border-2 border-slate-100 rounded-2xl bg-slate-50 text-slate-400 cursor-not-allowed font-medium"
                    value={profile.email}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <input 
                    className="w-full px-5 py-3 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                    value={profile.phone || ''}
                    onChange={e => setProfile({...profile, phone: e.target.value})}
                    placeholder="+91 00000 00000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                  <input 
                    className="w-full px-5 py-3 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                    value={profile.location || ''}
                    onChange={e => setProfile({...profile, location: e.target.value})}
                    placeholder="e.g. Bangalore, KA"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional Bio</label>
                <textarea 
                  className="w-full h-32 px-5 py-3 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium resize-none"
                  value={profile.bio || ''}
                  onChange={e => setProfile({...profile, bio: e.target.value})}
                  placeholder="Tell us about your professional journey..."
                />
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Job Title</label>
                  <input className="w-full px-4 py-2 rounded-xl border border-blue-100 focus:ring-2 focus:ring-blue-400 outline-none" placeholder="e.g. Senior Developer" value={newExp.role} onChange={e => setNewExp({...newExp, role: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Company</label>
                  <input className="w-full px-4 py-2 rounded-xl border border-blue-100 focus:ring-2 focus:ring-blue-400 outline-none" placeholder="e.g. Google" value={newExp.company} onChange={e => setNewExp({...newExp, company: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Duration</label>
                  <input className="w-full px-4 py-2 rounded-xl border border-blue-100 focus:ring-2 focus:ring-blue-400 outline-none" placeholder="e.g. 2021 - Present" value={newExp.duration} onChange={e => setNewExp({...newExp, duration: e.target.value})} />
                </div>
                <div className="flex items-end">
                  <button onClick={() => addItem('experience')} className="w-full bg-blue-600 text-white font-black py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                    Add Experience
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {(profile.experience || []).map((exp, idx) => (
                  <div key={idx} className="group p-6 bg-white border border-slate-100 rounded-2xl flex justify-between items-start hover:shadow-xl hover:border-blue-100 transition-all">
                    <div>
                      <h4 className="text-xl font-black text-slate-800">{exp.role}</h4>
                      <p className="text-blue-600 font-bold">{exp.company}</p>
                      <p className="text-sm text-slate-400 mt-1">{exp.duration}</p>
                    </div>
                    <button onClick={() => removeItem('experience', idx)} className="text-slate-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest ml-1">Institution</label>
                  <input className="w-full px-4 py-2 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-400 outline-none" placeholder="e.g. Stanford University" value={newEdu.school} onChange={e => setNewEdu({...newEdu, school: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest ml-1">Degree</label>
                  <input className="w-full px-4 py-2 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-400 outline-none" placeholder="e.g. Master of Computer Science" value={newEdu.degree} onChange={e => setNewEdu({...newEdu, degree: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest ml-1">Year</label>
                  <input className="w-full px-4 py-2 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-400 outline-none" placeholder="e.g. 2020" value={newEdu.year} onChange={e => setNewEdu({...newEdu, year: e.target.value})} />
                </div>
                <div className="flex items-end">
                  <button onClick={() => addItem('education')} className="w-full bg-indigo-600 text-white font-black py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                    Add Education
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {(profile.education || []).map((edu, idx) => (
                  <div key={idx} className="group p-6 bg-white border border-slate-100 rounded-2xl flex justify-between items-start hover:shadow-xl hover:border-indigo-100 transition-all">
                    <div>
                      <h4 className="text-xl font-black text-slate-800">{edu.degree}</h4>
                      <p className="text-indigo-600 font-bold">{edu.school}</p>
                      <p className="text-sm text-slate-400 mt-1">Class of {edu.year}</p>
                    </div>
                    <button onClick={() => removeItem('education', idx)} className="text-slate-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'certifications' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Certificate Name</label>
                  <input className="w-full px-4 py-2 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-400 outline-none" placeholder="e.g. AWS Certified Developer" value={newCert.name} onChange={e => setNewCert({...newCert, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Issuing Organization</label>
                  <input className="w-full px-4 py-2 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-400 outline-none" placeholder="e.g. Amazon Web Services" value={newCert.issuer} onChange={e => setNewCert({...newCert, issuer: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Credential Link (URL)</label>
                  <input className="w-full px-4 py-2 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-400 outline-none" placeholder="https://..." value={newCert.link} onChange={e => setNewCert({...newCert, link: e.target.value})} />
                </div>
                <div className="flex items-end">
                  <button onClick={() => addItem('certifications')} className="w-full bg-emerald-600 text-white font-black py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                    Add Certification
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(profile.certifications || []).map((cert, idx) => (
                  <div key={idx} className="group p-5 bg-white border border-slate-100 rounded-2xl hover:shadow-lg transition-all border-l-4 border-l-emerald-500">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-black text-slate-800 leading-tight">{cert.name}</h4>
                        <p className="text-sm text-slate-500 font-medium mt-1">{cert.issuer}</p>
                        {cert.link && (
                          <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 font-bold hover:underline mt-2 inline-block">
                            View Credential →
                          </a>
                        )}
                      </div>
                      <button onClick={() => removeItem('certifications', idx)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'socials' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50 p-10 rounded-[2.5rem] border border-slate-100">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">LinkedIn Profile</label>
                  </div>
                  <input 
                    className="w-full px-5 py-3 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                    value={profile.socials?.linkedin || ''}
                    onChange={e => setProfile({...profile, socials: {...(profile.socials || {}), linkedin: e.target.value}})}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">GitHub Profile</label>
                  </div>
                  <input 
                    className="w-full px-5 py-3 border-2 border-slate-200 rounded-2xl focus:border-slate-800 focus:ring-4 focus:ring-slate-800/10 outline-none transition-all font-medium"
                    value={profile.socials?.github || ''}
                    onChange={e => setProfile({...profile, socials: {...(profile.socials || {}), github: e.target.value}})}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                    </div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Personal Portfolio</label>
                  </div>
                  <input 
                    className="w-full px-5 py-3 border-2 border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                    value={profile.socials?.portfolio || ''}
                    onChange={e => setProfile({...profile, socials: {...(profile.socials || {}), portfolio: e.target.value}})}
                    placeholder="https://yourname.com"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">X (Twitter)</label>
                  </div>
                  <input 
                    className="w-full px-5 py-3 border-2 border-slate-200 rounded-2xl focus:border-slate-400 focus:ring-4 focus:ring-slate-400/10 outline-none transition-all font-medium"
                    value={profile.socials?.twitter || ''}
                    onChange={e => setProfile({...profile, socials: {...(profile.socials || {}), twitter: e.target.value}})}
                    placeholder="https://x.com/username"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
