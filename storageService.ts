
import { Member, Notice, GalleryItem, MemberRole, ClubInfo } from '../types';

const STORAGE_KEYS = {
  MEMBERS: 'club_members',
  NOTICES: 'club_notices',
  GALLERY: 'club_gallery',
  CLUB_INFO: 'club_info'
};

const INITIAL_CLUB_INFO: ClubInfo = {
  name: 'EliteClub',
  tagline: 'Excellence in every detail',
  foundedYear: '2023',
  contactEmail: 'contact@eliteclub.com',
  logo: 'https://picsum.photos/seed/eliteclub/200'
};

const INITIAL_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Alexander Pierce',
    role: MemberRole.ADMIN,
    email: 'alex@eliteclub.com',
    phone: '+1 555-0101',
    bio: 'Founder and lead visionary of EliteClub. Focused on networking and growth.',
    joinDate: '2023-01-15',
    avatar: 'https://picsum.photos/seed/alex/200',
    hscBatch: '2015',
    school: 'St. Xavier High',
    college: 'Royal College',
    university: 'Stanford University'
  },
  {
    id: '2',
    name: 'Sofia Rodriguez',
    role: MemberRole.VIP,
    email: 'sofia@eliteclub.com',
    phone: '+1 555-0102',
    bio: 'International consultant and luxury lifestyle enthusiast.',
    joinDate: '2023-03-22',
    avatar: 'https://picsum.photos/seed/sofia/200',
    hscBatch: '2017',
    school: 'Lincoln Academy',
    college: 'Central College',
    university: 'Oxford University'
  }
];

const INITIAL_NOTICES: Notice[] = [
  {
    id: '1',
    title: 'Annual Gala Night',
    content: 'Our annual gala is scheduled for next month. Please RSVP by Friday.',
    author: 'Admin',
    date: '2024-05-10',
    priority: 'high'
  }
];

export const storageService = {
  getMembers: (): Member[] => {
    const data = localStorage.getItem(STORAGE_KEYS.MEMBERS);
    return data ? JSON.parse(data) : INITIAL_MEMBERS;
  },
  saveMembers: (members: Member[]) => {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
  },
  getNotices: (): Notice[] => {
    const data = localStorage.getItem(STORAGE_KEYS.NOTICES);
    return data ? JSON.parse(data) : INITIAL_NOTICES;
  },
  saveNotices: (notices: Notice[]) => {
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(notices));
  },
  getGallery: (): GalleryItem[] => {
    const data = localStorage.getItem(STORAGE_KEYS.GALLERY);
    return data ? JSON.parse(data) : [];
  },
  saveGallery: (items: GalleryItem[]) => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(items));
  },
  getClubInfo: (): ClubInfo => {
    const data = localStorage.getItem(STORAGE_KEYS.CLUB_INFO);
    return data ? JSON.parse(data) : INITIAL_CLUB_INFO;
  },
  saveClubInfo: (info: ClubInfo) => {
    localStorage.setItem(STORAGE_KEYS.CLUB_INFO, JSON.stringify(info));
  }
};
