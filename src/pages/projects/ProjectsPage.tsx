import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Grid, List as ListIcon, Plus, MoreVertical, Layout, Clock, Tag } from 'lucide-react';
import { cn } from '../../utils/cn';

const PROJECTS = [
  { id: 1, name: 'Fintech Rebrand 2024', category: 'Branding', status: 'In Progress', progress: 74, team: ['AL', 'SJ', 'MK'], deadline: 'Oct 24', priority: 'High' },
  { id: 2, name: 'Internal API Refactor', category: 'Engineering', status: 'Review', progress: 92, team: ['SJ', 'MK'], deadline: 'Sep 12', priority: 'Medium' },
  { id: 3, name: 'Q3 Product Roadmap', category: 'Strategy', status: 'Completed', progress: 100, team: ['AL', 'SJ'], deadline: 'Aug 30', priority: 'High' },
  { id: 4, name: 'Eco-Living Campaign', category: 'Marketing', status: 'Planning', progress: 15, team: ['MK', 'AL'], deadline: 'Dec 05', priority: 'Low' },
  { id: 5, name: 'Mobile App 2.0', category: 'Product', status: 'In Progress', progress: 45, team: ['SJ', 'MK', 'AL'], deadline: 'Nov 18', priority: 'High' },
];

export default function ProjectsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  const filteredProjects = PROJECTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-5xl editorial-heading text-ink">Project Library.</h1>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-1.5"><Layout size={12} className="text-primary-dark" /> Total Workspace</span>
            <span className="w-1 h-1 bg-gray-200 rounded-full" />
            <span className="text-ink">24 Managed</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-ink hover:border-ink transition-all">
             <Filter size={18} />
           </button>
           <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button 
                onClick={() => setView('grid')}
                className={cn("p-2 px-3 rounded-lg transition-all", view === 'grid' ? "bg-white shadow-sm text-primary-dark" : "text-gray-400 hover:text-gray-600")}
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setView('list')}
                className={cn("p-2 px-3 rounded-lg transition-all", view === 'list' ? "bg-white shadow-sm text-primary-dark" : "text-gray-400 hover:text-gray-600")}
              >
                <ListIcon size={18} />
              </button>
           </div>
           <button className="flex items-center gap-2 px-6 py-3.5 bg-primary-dark text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-ink shadow-xl shadow-primary-dark/20 transition-all">
             <Plus size={16} /> New Project
           </button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={20} />
        <input 
          type="text" 
          placeholder="Search by keyword, client, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-50 border-none rounded-[2rem] py-6 pl-16 pr-8 text-sm focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none placeholder-gray-300 font-medium"
        />
      </div>

      <AnimatePresence mode="wait">
        {view === 'grid' ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card-base p-8 rounded-[2.5rem] group hover:border-primary-dark/20 hover:shadow-2xl hover:shadow-primary-dark/5 flex flex-col h-full bg-white transition-all"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                    project.status === 'Completed' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    project.status === 'Review' ? "bg-amber-50 text-amber-600 border-amber-100" :
                    "bg-gray-50 text-gray-400 border-gray-100"
                  )}>
                    {project.status}
                  </div>
                  <button className="text-gray-300 hover:text-ink transition-colors p-1">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="flex-1 space-y-3 mb-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-dark/40 italic">{project.category}</span>
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter text-ink group-hover:text-primary-dark transition-colors leading-tight italic">
                    {project.name}
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <span className="flex items-center gap-2">
                       <Clock size={12} /> {project.deadline}
                    </span>
                    <div className="flex -space-x-2">
                      {project.team.map((t, idx) => (
                        <div key={idx} className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-black ring-1 ring-gray-100">
                           {t}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-gray-400 tracking-widest">
                       <span>Velocity</span>
                       <span className="text-ink">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-primary-dark rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card-base rounded-[2rem] overflow-hidden"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Project</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Progress</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-primary-dark font-black text-sm group-hover:bg-primary-dark group-hover:text-white transition-all">
                          {project.name[0]}
                        </div>
                        <span className="font-bold text-ink underline-offset-4 group-hover:underline">{project.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-gray-500">{project.category}</span>
                    </td>
                    <td className="px-8 py-6">
                       <span className={cn(
                          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border",
                          project.status === 'Completed' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                          project.status === 'Review' ? "bg-amber-50 text-amber-600 border-amber-100" :
                          "bg-gray-50 text-gray-400 border-gray-100"
                        )}>
                          {project.status}
                        </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                         <div className="w-24 bg-gray-100 h-1 rounded-full overflow-hidden">
                           <div className="h-full bg-primary-dark rounded-full" style={{ width: `${project.progress}%` }}></div>
                         </div>
                         <span className="text-xs font-black text-ink">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="text-xs font-bold text-gray-400">{project.deadline}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
