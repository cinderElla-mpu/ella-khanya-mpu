export interface PersonalInfo {
  name: string;
  tagline: string;
  intro: string;
  email: string;
  phone?: string;
  linkedInUrl: string;
  githubUrl: string;
  location: string;
  languages?: string[];
}

export interface StoredFile {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
  uploadedAt: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  badge?: string;
  description: string;
  features: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  note?: string;
  category: string;
}

export interface EducationItem {
  id: string;
  qualification: string;
  status: string;
  yearCompleted: string;
  school: string;
  relevantSubjects: string[];
  additionalCourses: string[];
  technologyCourses: string[];
  aiCourses: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  institution: string;
  instructor?: string;
  dateCompleted: string;
  description: string;
  certificateLink?: string;
  shareUrl?: string;
  credentialId?: string;
  providerBadge?: 'google' | 'stanford' | 'ibm' | 'aws' | 'deeplearning' | 'other';
}

export interface ExperienceItem {
  id: string;
  programmeName: string;
  organisation: string;
  date: string;
  category: 'learning' | 'group' | 'web' | 'personal' | 'other';
  whatILearned: string;
  projectsCompleted: string;
  skillsDeveloped: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'academic' | 'projects' | 'courses' | 'programmes';
  highlight?: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  profilePicture: StoredFile | null;
  cvFile: StoredFile | null;
  skills: SkillCategory[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  experience: ExperienceItem[];
  achievements: AchievementItem[];
  messages: ContactMessage[];
}
