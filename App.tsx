
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  LayoutDashboard, 
  Bell, 
  Image as ImageIcon, 
  Info, 
  Search, 
  Plus, 
  Menu, 
  X,
  TrendingUp,
  UserPlus,
  Calendar,
  Settings as SettingsIcon
} from 'lucide-react';
import { Member, Notice, GalleryItem, ViewType, MemberRole, ClubInfo } from './types';
import { storageService } from './services/storageService';
import Dashboard from './components/Dashboard';
import MemberDirectory from './components/MemberDirectory';
import NoticeBoard from './components/NoticeBoard';
import MediaGallery from './components/MediaGallery';
import AboutRoadmap from './components/AboutRoadmap';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [clubInfo, setClubInfo] = useState<ClubInfo>({
    name: 'EliteClub',
    tagline: 'Premium Management',
    foundedYear: '2023',
    contactEmail: '',
    logo: ''
  });

  // Load Initial Data
  useEffect(() => {
    setMembers(storageService.getMembers());
    setNotices(storageService.getNotices());
    setGallery(storageService.getGallery());
    setClubInfo(storageService.getClubInfo());
  }, []);

  // Save on change
  useEffect(() => { storageService.saveMembers(members); }, [members]);
  useEffect(() => { storageService.saveNotices(notices); }, [notices]);
  useEffect(() => { storageService.saveGallery(gallery); }, [gallery]);
  useEffect(() => { storageService.saveClubInfo(clubInfo); }, [clubInfo]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const NavItem = ({ view, icon: Icon, label }: { view: ViewType, icon: any, label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        currentView === view 
          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
          : 'text-slate-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 glass w-72 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center space-x-3 mb-12">
            {clubInfo.logo ? (
              <img src={clubInfo.logo} className="w-10 h-10 rounded-xl object-cover shadow-lg" alt="Club Logo" />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Users className="text-white" size={24} />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 truncate max-w-[160px]">
                {clubInfo.name}
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-tighter font-bold truncate max-w-[160px]">
                {clubInfo.tagline}
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem view="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem view="members" icon={Users} label="Members" />
            <NavItem view="notices" icon={Bell} label="Notice Board" />
            <NavItem view="gallery" icon={ImageIcon} label="Media Gallery" />
            <NavItem view="about" icon={Info} label="Roadmap & Palette" />
            <NavItem view="settings" icon={SettingsIcon} label="Club Settings" />
          </nav>

          <div className="mt-auto p-4 glass-card rounded-2xl">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold">System Status</p>
            <div className="flex items-center space-x-2 text-sm text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Cloud Sync Active</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto bg-slate-900/50">
        <header className="sticky top-0 z-40 glass h-20 flex items-center justify-between px-8 border-b border-white/5">
          <div className="flex items-center space-x-4">
            <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-xl font-semibold capitalize text-slate-200">
              {currentView === 'about' ? 'Roadmap & Info' : currentView.replace('_', ' ')}
            </h2>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-slate-800/50 border border-white/5 rounded-full px-4 py-2">
              <Search size={18} className="text-slate-500 mr-2" />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="bg-transparent border-none outline-none text-sm w-48 text-slate-300"
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-200">Super Admin</p>
                <p className="text-xs text-slate-500">{clubInfo.name} • VIP</p>
              </div>
              <img src="https://picsum.photos/seed/admin/100" className="w-10 h-10 rounded-full border-2 border-blue-500/30" alt="Admin" />
            </div>
          </div>
        </header>

        <div className="p-8">
          {currentView === 'dashboard' && (
            <Dashboard members={members} notices={notices} gallery={gallery} />
          )}
          {currentView === 'members' && (
            <MemberDirectory members={members} setMembers={setMembers} />
          )}
          {currentView === 'notices' && (
            <NoticeBoard notices={notices} setNotices={setNotices} />
          )}
          {currentView === 'gallery' && (
            <MediaGallery gallery={gallery} setGallery={setGallery} />
          )}
          {currentView === 'about' && (
            <AboutRoadmap />
          )}
          {currentView === 'settings' && (
            <Settings clubInfo={clubInfo} setClubInfo={setClubInfo} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
