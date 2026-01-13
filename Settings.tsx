
import React, { useState } from 'react';
import { Save, Building2, Megaphone, Calendar, Mail, CheckCircle, Camera } from 'lucide-react';
import { ClubInfo } from '../types';

interface SettingsProps {
  clubInfo: ClubInfo;
  setClubInfo: (info: ClubInfo) => void;
}

const Settings: React.FC<SettingsProps> = ({ clubInfo, setClubInfo }) => {
  const [localInfo, setLocalInfo] = useState<ClubInfo>(clubInfo);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setClubInfo(localInfo);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalInfo(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-card p-10 rounded-[3rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -mr-32 -mt-32"></div>
        
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-3xl font-bold mb-2">Club Branding</h3>
            <p className="text-slate-400">Manage your club identity and visual style.</p>
          </div>
          <Building2 size={48} className="text-blue-500/20" />
        </div>

        <div className="space-y-8">
          {/* Club Logo Upload */}
          <div className="flex items-center space-x-8 pb-6 border-b border-white/5">
            <div className="relative group">
              <img 
                src={localInfo.logo || 'https://via.placeholder.com/150'} 
                className="w-28 h-28 rounded-3xl object-cover ring-4 ring-blue-500/20 transition-all group-hover:ring-blue-500/40" 
                alt="Club Logo Preview" 
              />
              <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 rounded-3xl flex items-center justify-center cursor-pointer transition-opacity">
                <Camera size={28} className="text-white" />
                <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
              </label>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-100">Club Logo</h4>
              <p className="text-sm text-slate-500 mt-1">Recommended size: 512x512px. JPG, PNG or SVG.</p>
              <button className="mt-4 text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest flex items-center">
                Change Image
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-2 flex items-center">
                <Building2 size={14} className="mr-2" />
                Club Name
              </label>
              <input 
                type="text" 
                className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 ring-blue-500/50 text-lg"
                value={localInfo.name}
                onChange={e => setLocalInfo({ ...localInfo, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-2 flex items-center">
                <Megaphone size={14} className="mr-2" />
                Tagline
              </label>
              <input 
                type="text" 
                className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 ring-blue-500/50 text-lg"
                value={localInfo.tagline}
                onChange={e => setLocalInfo({ ...localInfo, tagline: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-2 flex items-center">
                <Calendar size={14} className="mr-2" />
                Founded Year
              </label>
              <input 
                type="text" 
                className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 ring-blue-500/50 text-lg"
                value={localInfo.foundedYear}
                onChange={e => setLocalInfo({ ...localInfo, foundedYear: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-2 flex items-center">
                <Mail size={14} className="mr-2" />
                System Email
              </label>
              <input 
                type="email" 
                className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 ring-blue-500/50 text-lg"
                value={localInfo.contactEmail}
                onChange={e => setLocalInfo({ ...localInfo, contactEmail: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-6 flex items-center space-x-4">
            <button 
              onClick={handleSave}
              className="flex-1 py-5 bg-white text-slate-900 rounded-3xl font-black text-xl transition-all shadow-xl hover:bg-slate-200 flex items-center justify-center space-x-3"
            >
              <Save size={24} />
              <span>Save Branding</span>
            </button>
            
            {showSaved && (
              <div className="flex items-center space-x-2 text-green-400 animate-in fade-in slide-in-from-left-4">
                <CheckCircle size={20} />
                <span className="font-bold">Settings Updated!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="glass-card p-8 rounded-[2.5rem] border-blue-500/10 bg-blue-500/5">
        <h4 className="font-bold mb-4">Sidebar Preview</h4>
        <div className="p-6 glass rounded-2xl flex items-center space-x-4">
          <img src={localInfo.logo} className="w-12 h-12 rounded-xl object-cover shadow-lg border border-white/10" alt="Preview Logo" />
          <div>
            <p className="text-xl font-bold text-white leading-tight">{localInfo.name}</p>
            <p className="text-xs text-slate-500 uppercase font-black tracking-widest">{localInfo.tagline}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          * Your branding updates in real-time across the entire interface.
        </p>
      </div>
    </div>
  );
};

export default Settings;
