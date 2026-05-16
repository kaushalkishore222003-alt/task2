import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin,
  TrendingUp,
  Briefcase,
  Award,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';

const MEMBERS = [
  { id: 0, name: 'Kaushal Kishore', role: 'Global Admin', dept: 'Exponentials', projects: 25, tasks: 156, status: 'Active', activity: 'High', email: 'kaushalkishore222003@gmail.com' },
  { id: 1, name: 'Alex Johnson', role: 'Product Lead', dept: 'Exponentials', projects: 12, tasks: 42, status: 'Active', activity: 'High', email: 'alex@syncro.io' },
  { id: 2, name: 'Sarah Chen', role: 'Lead Architect', dept: 'Systems', projects: 8, tasks: 38, status: 'Active', activity: 'Optimal', email: 'sarah@syncro.io' },
  { id: 3, name: 'Marcus Miller', role: 'Design Director', dept: 'Vanguard', projects: 15, tasks: 24, status: 'Active', activity: 'Medium', email: 'marcus@syncro.io' },
  { id: 4, name: 'David Kim', role: 'Security Analyst', dept: 'Systems', projects: 4, tasks: 12, status: 'Away', activity: 'Low', email: 'david@syncro.io' },
  { id: 5, name: 'Elena Rossi', role: 'Growth Strategist', dept: 'Exponentials', projects: 9, tasks: 31, status: 'Active', activity: 'High', email: 'elena@syncro.io' },
];

export default function TeamPage() {
  const [search, setSearch] = useState('');

  const filteredMembers = MEMBERS.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.role.toLowerCase().includes(search.toLowerCase()) ||
    m.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-5xl editorial-heading text-ink">Talent Pool.</h1>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
             <span className="flex items-center gap-1.5"><Users size={14} className="text-primary-dark" /> Workforce Distribution</span>
             <span className="w-1 h-1 bg-gray-200 rounded-full" />
             <span className="text-ink">24 Managed Identities</span>
          </div>
        </div>

        <button className="flex items-center gap-2 px-8 py-4 bg-primary-dark text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-ink shadow-2xl shadow-primary-dark/20 transition-all active:scale-[0.98]">
          <UserPlus size={16} /> Onboard Talent
        </button>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         <div className="card-base p-8 rounded-[3rem] bg-ink text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-dark/20 rounded-bl-[4rem] group-hover:scale-110 transition-transform" />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Active Force</p>
            <h2 className="text-6xl editorial-heading mt-2 italic tabular-nums">18.</h2>
            <div className="mt-8 flex items-center gap-4">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-ink overflow-hidden bg-gray-100"><img src={`https://i.pravatar.cc/100?img=${i+30}`} /></div>)}
               </div>
               <span className="text-[10px] font-black text-primary-light">92% Live</span>
            </div>
         </div>
         
         {[
           { label: 'Utilized', val: '84%', icon: TrendingUp, color: 'text-emerald-500' },
           { label: 'Departments', val: '04', icon: Briefcase, color: 'text-primary-dark' },
           { label: 'Avg Velocity', val: '9.2', icon: Award, color: 'text-amber-500' },
         ].map((stat, i) => (
           <div key={i} className="card-base p-8 rounded-[3rem] bg-white border border-gray-100">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-8">
                 <stat.icon size={20} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
              <h2 className="text-5xl editorial-heading mt-1 tabular-nums text-ink">{stat.val}</h2>
           </div>
         ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between border-b border-gray-100 pb-10">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            type="text" 
            placeholder="Filter by name, role, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-[2rem] py-4 pl-14 pr-8 text-sm focus:ring-4 focus:ring-primary-dark/5 focus:border-primary-dark outline-none transition-all placeholder-gray-300 font-medium"
          />
        </div>
      </div>

      {/* Team Table */}
      <div className="card-base rounded-[3rem] bg-white overflow-hidden border border-gray-100 shadow-xl shadow-gray-100/30">
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Identity</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Operational Unit</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Workload</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Registry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-3xl overflow-hidden ring-1 ring-gray-100 shadow-sm transition-transform group-hover:scale-105">
                             <img src={`https://i.pravatar.cc/150?img=${member.id+20}`} alt={member.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                             <h4 className="font-bold text-lg text-ink group-hover:text-primary-dark transition-colors">{member.name}</h4>
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{member.role}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-8">
                       <div className="flex items-center gap-2.5 px-4 py-2 bg-gray-50 rounded-2xl w-fit border border-gray-100">
                          <span className="text-[10px] font-black uppercase text-ink">{member.dept}</span>
                       </div>
                    </td>
                    <td className="px-8 py-8">
                       <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-ink italic">{member.projects} Projects / {member.tasks} Units</span>
                          <div className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            member.activity === 'High' ? "text-primary-dark" : "text-gray-300"
                          )}>
                             {member.activity} Activity
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-8">
                       <div className="flex items-center gap-2">
                          <div className={cn("w-2 h-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]", member.status === 'Active' ? "bg-emerald-400" : "bg-amber-400")} />
                          <span className="text-xs font-bold text-gray-500">{member.status}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-ink hover:text-white transition-all">
                          Profile <ChevronRight size={14} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
         </div>
      </div>
    </div>
  );
}
