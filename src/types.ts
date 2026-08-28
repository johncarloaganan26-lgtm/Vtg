export type ApplicationStatus =
  | 'New Applicant'
  | 'For Assessment'
  | 'For Initial Interview'
  | 'For Final Interview'
  | 'Hired'
  | 'Rejected';

export interface Applicant {
  id: string;
  name: string;
  role: 'CSR' | 'TSR' | 'QA Specialist' | 'Team Lead' | 'Sales Agent';
  email: string;
  phone: string;
  appliedDate: string;
  status: ApplicationStatus;
  avatarUrl?: string;
  initials: string;
  experienceYears: number;
  resumeFileName?: string;
  notes?: string;
  bpoExperience?: string;
  pastCompanies?: string;
  referralSource?: string;
  referrerName?: string;
  enrolledInSchool?: string;
  is18Plus?: string;
  isPregnant?: string;
  medicalConditions?: string;
}

export interface CampaignInquiry {
  id: string;
  fullNameTitle: string;
  phone: string;
  email: string;
  company: string;
  service: string;
  podSize: string;
  targetMarket: string;
  brief: string;
  submittedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  pod: string;
  status: 'Online' | 'In Call' | 'Break' | 'Offline';
  qaScore: number;
  callsToday: number;
  conversionsToday: number;
  avatarUrl: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'Outbound Sales' | 'Appointment Setting' | 'Customer Care' | 'Lead Generation';
  client: string;
  status: 'Active' | 'Paused' | 'Completed';
  activeAgents: number;
  dialsToday: number;
  targetLeads: number;
  conversionRate: number;
}

export interface AdminTask {
  id: string;
  title: string;
  dueText: string;
  badgeText: string;
  badgeVariant: 'urgent' | 'high' | 'medium' | 'normal';
  completed: boolean;
}

export interface MediaUploadItem {
  id: string;
  name: string;
  category: 'Logos' | 'Headsets & Hardware' | 'Banners' | 'Agents & Staff' | 'Documents';
  url: string;
  size: string;
  dimensions?: string;
  uploadedAt: string;
  isHeroActive?: boolean;
}

export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  iconName: 'target' | 'barChart' | 'headphones' | 'users';
  metric: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
