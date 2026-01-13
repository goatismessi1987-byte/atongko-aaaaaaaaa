
export enum MemberRole {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  MEMBER = 'Member',
  VIP = 'VIP'
}

export interface Member {
  id: string;
  name: string;
  role: MemberRole;
  email: string;
  phone: string;
  bio: string;
  avatar?: string;
  joinDate: string;
  // New Educational Fields
  hscBatch: string;
  school: string;
  college: string;
  university: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
  date: string;
}

export interface ClubInfo {
  name: string;
  tagline: string;
  foundedYear: string;
  contactEmail: string;
  logo?: string; // New Logo field
}

export type ViewType = 'dashboard' | 'members' | 'notices' | 'gallery' | 'about' | 'settings';
