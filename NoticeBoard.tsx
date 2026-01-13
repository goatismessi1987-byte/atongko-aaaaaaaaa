
import React, { useState } from 'react';
import { Bell, Plus, Trash2, Calendar, User, Sparkles, X } from 'lucide-react';
import { Notice } from '../types';
import { geminiService } from '../services/geminiService';

interface NoticeBoardProps {
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
}

const NoticeBoard: React.FC<NoticeBoardProps> = ({ notices, setNotices }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Notice>>({ title: '', content: '', priority: 'medium' });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAdd = () => {
    if (!formData.title || !formData.content) return;
    const newNotice: Notice = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title!,
      content: formData.content!,
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
      priority: formData.priority as 'low' | 'medium' | 'high'
    };
    setNotices(prev => [newNotice, ...prev]);
    setIsModalOpen(false);
    setFormData({ title: '', content: '', priority: 'medium' });
  };

  const handleDelete = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'high': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    }
  };

  const generateWithAI = async () => {
    const topic = prompt('Enter notice topic (e.g., Summer Yacht Party):');
    if (!topic) return;
    setIsGenerating(true);
    const text = await geminiService.suggestNotice(topic);
    setFormData(prev => ({ ...prev, content: text, title: topic }));
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Announcements</h3>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all shadow-lg"
        >
          <Plus size={20} />
          <span>New Post</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {notices.map(notice => (
          <div key={notice.id} className="glass-card p-8 rounded-[2rem] flex flex-col md:flex-row gap-6 relative group">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <span className={`text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full border ${getPriorityColor(notice.priority)}`}>
                  {notice.priority} Priority
                </span>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Calendar size={14} />
                  <span>{notice.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <User size={14} />
                  <span>{notice.author}</span>
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white leading-tight">{notice.title}</h4>
              <p className="text-slate-400 leading-relaxed text-lg whitespace-pre-wrap">{notice.content}</p>
            </div>
            <div className="flex items-start">
               <button 
                onClick={() => handleDelete(notice.id)}
                className="p-3 text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-all"
               >
                <Trash2 size={24} />
               </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="glass-card w-full max-w-2xl rounded-[3rem] p-10 relative overflow-hidden animate-in zoom-in-95 duration-200">
            <h3 className="text-3xl font-bold mb-8">Post Announcement</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-2">Heading</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 ring-white/20 text-lg"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between mx-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Announcement Content</label>
                  <button onClick={generateWithAI} disabled={isGenerating} className="text-[10px] font-black uppercase text-blue-400 flex items-center space-x-1">
                    <Sparkles size={12} />
                    <span>{isGenerating ? 'Drafting...' : 'AI Draft'}</span>
                  </button>
                </div>
                <textarea 
                  rows={6}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-3xl px-6 py-4 text-white outline-none focus:ring-2 ring-white/20 text-lg resize-none"
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-2">Priority Level</label>
                <div className="flex space-x-3">
                  {['low', 'medium', 'high'].map(p => (
                    <button 
                      key={p}
                      onClick={() => setFormData({ ...formData, priority: p as any })}
                      className={`flex-1 py-3 rounded-2xl border font-bold capitalize transition-all ${
                        formData.priority === p ? 'bg-white text-slate-950 border-white' : 'glass text-slate-400 border-white/5'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleAdd}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-black text-xl transition-all shadow-xl shadow-blue-500/20 mt-4"
              >
                Publish Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
