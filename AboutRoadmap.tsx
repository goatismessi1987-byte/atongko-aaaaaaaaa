
import React from 'react';
import { Palette, Map, Zap, Layers, Cpu } from 'lucide-react';

const AboutRoadmap: React.FC = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
      <section className="space-y-6">
        <div className="flex items-center space-x-4 mb-2">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl">
            <Palette size={24} />
          </div>
          <h3 className="text-3xl font-bold">Design DNA</h3>
        </div>
        <p className="text-slate-400 text-lg">
          Our application follows a "Minimalist Bold" aesthetic with a core focus on **Glassmorphism** 
          and **Pastel** accent variations. The interface is optimized for high-end luxury feel.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl pastel-gradient-1 text-slate-900 font-bold shadow-lg">
            Rose Pastel
            <span className="block text-xs font-normal mt-1 text-slate-600">Primary Accent</span>
          </div>
          <div className="p-6 rounded-3xl pastel-gradient-2 text-slate-900 font-bold shadow-lg">
            Sky Pastel
            <span className="block text-xs font-normal mt-1 text-slate-600">Secondary Accent</span>
          </div>
          <div className="p-6 rounded-3xl pastel-gradient-3 text-slate-900 font-bold shadow-lg">
            Mint Pastel
            <span className="block text-xs font-normal mt-1 text-slate-600">Success States</span>
          </div>
          <div className="p-6 rounded-3xl glass text-white font-bold shadow-lg border-white/20">
            Frosted Slate
            <span className="block text-xs font-normal mt-1 text-slate-400">Surface Base</span>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center space-x-4 mb-2">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl">
            <Map size={24} />
          </div>
          <h3 className="text-3xl font-bold">Feature Roadmap</h3>
        </div>
        
        <div className="space-y-4">
          {[
            { title: 'V1: Core Management', status: 'Completed', desc: 'Member CRUD, Basic Gallery, Persistence, Glass UI.', icon: Zap },
            { title: 'V2: Intelligence', status: 'In Progress', desc: 'AI-generated bios, notice drafting, smart search.', icon: Cpu },
            { title: 'V3: Ecosystem', status: 'Planned', desc: 'Event booking system, payment gateway, real-time chat.', icon: Layers },
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-6 rounded-[2rem] flex items-center space-x-6">
              <div className="p-4 bg-slate-800 rounded-2xl">
                <item.icon size={24} className="text-blue-400" />
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <h4 className="font-bold text-xl">{item.title}</h4>
                  <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                    item.status === 'Completed' ? 'bg-green-500/10 text-green-400' : 
                    item.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-700 text-slate-500'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-slate-400 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card p-10 rounded-[3rem] border-white/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -mr-32 -mt-32"></div>
        <h4 className="text-2xl font-bold mb-4 relative z-10">Persistence & Auto-Save</h4>
        <p className="text-slate-400 relative z-10 leading-relaxed">
          The application uses a reactive persistence model. Every state update in the `App.tsx` container
          triggers a background synchronization event with the storage service. Currently implemented with 
          `localStorage` for demonstration, this architecture seamlessly swaps with Firebase or Supabase by 
          updating the `storageService.ts` module with async fetch/post calls.
        </p>
      </section>
    </div>
  );
};

export default AboutRoadmap;
