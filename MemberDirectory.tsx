
import React, { useState } from 'react';
import { Search, Plus, UserPlus, Filter, MoreHorizontal, Edit2, Trash2, Sparkles, X, Mail, Phone, Calendar, School, BookOpen, GraduationCap, Camera } from 'lucide-react';
import { Member, MemberRole } from '../types';
import { geminiService } from '../services/geminiService';

interface MemberDirectoryProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

const MemberDirectory: React.FC<MemberDirectoryProps> = ({ members, setMembers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);

  const [formData, setFormData] = useState<Partial<Member>>({
    name: '',
    email: '',
    phone: '',
    role: MemberRole.MEMBER,
    bio: '',
    hscBatch: '',
    school: '',
    college: '',
    university: '',
    avatar: ''
  });

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this member?')) {
      setMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setFormData(member);
    setIsModalOpen(true);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) return;

    if (editingMember) {
      setMembers(prev => prev.map(m => m.id === editingMember.id ? { ...m, ...formData } as Member : m));
    } else {
      const newMember: Member = {
        ...formData as Member,
        id: Math.random().toString(36).substr(2, 9),
        joinDate: new Date().toISOString().split('T')[0],
        avatar: formData.avatar || `https://picsum.photos/seed/${Math.random()}/200`
      };
      setMembers(prev => [...prev, newMember]);
    }
    
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setFormData({ name: '', email: '', phone: '', role: MemberRole.MEMBER, bio: '', hscBatch: '', school: '', college: '', university: '', avatar: '' });
  };

  const generateBioWithAI = async () => {
    if (!formData.name) return alert('Please enter a name first');
    setIsGeneratingBio(true);
    const keywords = prompt('Enter a few keywords (e.g., Tech expert, mountain climber, investor):') || 'Passionate member';
    const bio = await geminiService.generateBio(formData.name, keywords);
    setFormData(prev => ({ ...prev, bio }));
    setIsGeneratingBio(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search members by name or university..." 
            className="w-full pl-12 pr-4 py-3 glass rounded-2xl outline-none focus:ring-2 ring-blue-500/50 transition-all text-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-3 glass rounded-xl text-slate-400 hover:text-white transition-colors">
            <Filter size={20} />
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all"
          >
            <UserPlus size={20} />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map(member => (
          <div key={member.id} className="glass-card rounded-3xl p-6 group">
            <div className="flex justify-between mb-6">
              <img src={member.avatar} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/5" alt={member.name} />
              <div className="flex space-x-1 h-fit">
                <button onClick={() => handleEdit(member)} className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(member.id)} className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="mb-2">
              <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{member.name}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded ${
                  member.role === MemberRole.ADMIN ? 'bg-amber-500/10 text-amber-400' : 
                  member.role === MemberRole.VIP ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'
                }`}>
                  {member.role}
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 font-bold px-2 py-0.5 rounded uppercase tracking-widest">
                  Batch {member.hscBatch || 'N/A'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-medium mb-4 italic truncate">
              {member.university || 'No university specified'}
            </p>

            <p className="text-sm text-slate-400 line-clamp-2 mb-6 h-10">{member.bio}</p>

            <div className="space-y-2 pt-4 border-t border-white/5">
              <div className="flex items-center space-x-3 text-xs text-slate-500">
                <BookOpen size={14} className="text-slate-600 shrink-0" />
                <span className="truncate">{member.college || 'No college'}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-500">
                <Mail size={14} className="text-slate-600 shrink-0" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-500">
                <Phone size={14} className="text-slate-600 shrink-0" />
                <span>{member.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="glass-card w-full max-w-2xl rounded-[2.5rem] relative overflow-hidden animate-in zoom-in-95 duration-200 my-8">
            <div className="p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">{editingMember ? 'Edit Profile' : 'Add New Member'}</h3>
                <button onClick={closeModal} className="p-2 hover:bg-white/5 rounded-full"><X size={24} /></button>
              </div>

              <div className="space-y-6">
                {/* Profile Picture Upload */}
                <div className="flex items-center space-x-6">
                  <div className="relative group">
                    <img 
                      src={formData.avatar || 'https://via.placeholder.com/150'} 
                      className="w-24 h-24 rounded-3xl object-cover ring-4 ring-blue-500/20" 
                      alt="Avatar Preview" 
                    />
                    <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 rounded-3xl flex items-center justify-center cursor-pointer transition-opacity">
                      <Camera size={24} className="text-white" />
                      <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    </label>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-200">Profile Picture</p>
                    <p className="text-xs text-slate-500 mt-1">Click image to upload. Recommended 1:1 ratio.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-2 ring-blue-500/50"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Role</label>
                    <select 
                      className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-2 ring-blue-500/50"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value as MemberRole })}
                    >
                      {Object.values(MemberRole).map(role => <option key={role} value={role}>{role}</option>)}
                    </select>
                  </div>
                </div>

                {/* Educational Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      HSC Batch
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. 2018"
                      className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-2 ring-blue-500/50"
                      value={formData.hscBatch}
                      onChange={e => setFormData({ ...formData, hscBatch: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center">
                      <GraduationCap size={12} className="mr-1" />
                      University
                    </label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-2 ring-blue-500/50"
                      value={formData.university}
                      onChange={e => setFormData({ ...formData, university: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center">
                      <School size={12} className="mr-1" />
                      School Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-2 ring-blue-500/50"
                      value={formData.school}
                      onChange={e => setFormData({ ...formData, school: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center">
                      <BookOpen size={12} className="mr-1" />
                      College Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-2 ring-blue-500/50"
                      value={formData.college}
                      onChange={e => setFormData({ ...formData, college: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-2 ring-blue-500/50"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Phone</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-2 ring-blue-500/50"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Biography</label>
                    <button 
                      onClick={generateBioWithAI}
                      disabled={isGeneratingBio}
                      className="text-[10px] flex items-center space-x-1 text-blue-400 hover:text-blue-300 font-bold uppercase transition-colors"
                    >
                      <Sparkles size={12} />
                      <span>{isGeneratingBio ? 'Generating...' : 'Generate with AI'}</span>
                    </button>
                  </div>
                  <textarea 
                    rows={4}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-2 ring-blue-500/50 resize-none"
                    value={formData.bio}
                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button onClick={closeModal} className="flex-1 py-4 glass rounded-2xl font-bold hover:bg-white/5 transition-all">Cancel</button>
                  <button onClick={handleSave} className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20">
                    {editingMember ? 'Update Profile' : 'Create Member'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDirectory;
