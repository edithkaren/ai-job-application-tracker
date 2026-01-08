
export enum UserRole {
  CANDIDATE = 'CANDIDATE',
  RECRUITER = 'RECRUITER'
}

export enum ApplicationStatus {
  APPLIED = 'APPLIED',
  SCREENING = 'SCREENING',
  INTERVIEW = 'INTERVIEW',
  OFFER = 'OFFER',
  REJECTED = 'REJECTED'
}

export interface JobAlert {
  id: string;
  keywords: string;
  location: string;
  frequency: 'daily' | 'weekly' | 'instant';
  active: boolean;
}

export interface Education {
  school: string;
  degree: string;
  year: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  link?: string;
  date?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  portfolio?: string;
  twitter?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  resumeText?: string;
  companyName?: string;
  jobAlerts?: JobAlert[];
  phone?: string;
  location?: string;
  education?: Education[];
  experience?: Experience[];
  certificates?: string[]; // Deprecated in favor of certifications
  certifications?: Certification[];
  socials?: SocialLinks;
  bio?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  field: string;
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  postedAt: string;
  deadline?: string;
  recruiterId: string;
  salary?: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus;
  appliedDate: string;
  aiScore: number;
  feedback: string;
  missingSkills: string[];
}

export interface AIAnalysisResult {
  score: number;
  matchingPoints: string[];
  missingSkills: string[];
  improvements: string[];
}
