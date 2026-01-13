
import React from 'react';
import { Users, Bell, Image as ImageIcon, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { Member, Notice, GalleryItem } from '../types';

interface DashboardProps {
  members: Member[];
  notices: Notice[];
  gallery: GalleryItem[];
}

const StatCard = ({ label, value, trend, icon: Icon, colorClass }: any) => (
  <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full -mr-16 -mt-16 bg-${colorClass}-500 blur-3xl transition-all duration-500 group-hover:opacity-20`}></div>
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl bg-${colorClass}-500/10 text-${colorClass}-400`}>
        <Icon size={24} />
      </div>
      <div className="flex items-center space-x-1 text-green-400 text-xs font-bold">
        <TrendingUp size={14} />
        <span>+{trend}%</span>
      </div>
    </div>
    <p className="text-slate-400 text-sm font-medium">{label}</p>
    <h3 className="text-3xl font-bold mt-1 text-white">{value}</h3>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ members, notices, gallery }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Members" value={members.length} trend="12" icon={Users} colorClass="blue" />
        <StatCard label="Active Notices" value={notices.length} trend="5" icon={Bell} colorClass="amber" />
        <StatCard label="Gallery Assets" value={gallery.length} trend="18" icon={ImageIcon} colorClass="purple" />
        <StatCard label="New Events" value="4" trend="2" icon={Calendar} colorClass="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Members */}
        <div className="lg:col-span-2 glass-card p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Recent Members</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1">
              <span>View Directory</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="space-y-6">
            {members.slice(0, 5).map(member => (
              <div key={member.id} className="flex items-center justify-between group p-2 hover:bg-white/5 rounded-2xl transition-all">
                <div className="flex items-center space-x-4">
                  <img src={member.avatar} className="w-12 h-12 rounded-2xl object-cover" alt={member.name} />
                  <div>
                    <h4 className="font-semibold text-slate-200">{member.name}</h4>
                    <p className="text-xs text-slate-500">{member.role} • Joined {member.joinDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">{member.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Notices */}
        <div className="glass-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-8">Urgent Notices</h3>
          <div className="space-y-4">
            {notices.filter(n => n.priority === 'high').map(notice => (
              <div key={notice.id} className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-400/10">High Priority</span>
                  <span className="text-xs text-slate-500">{notice.date}</span>
                </div>
                <h4 className="font-semibold mb-1 text-slate-100">{notice.title}</h4>
                <p className="text-sm text-slate-400 line-clamp-2">{notice.content}</p>
              </div>
            ))}
            {notices.length === 0 && <p className="text-slate-500 text-center py-10">No urgent notices.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
