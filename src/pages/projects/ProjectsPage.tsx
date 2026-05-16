import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Grid, List as ListIcon, Plus, MoreVertical, Layout, Clock, Tag } from 'lucide-react';
import { cn } from '../../utils/cn';
import { PROJECTS } from '../../data/constants';

export default function ProjectsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  const filteredProjects = PROJECTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight">Active Projects<span className="text-accent-primary">.</span></h1>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
            <span className="flex items-center gap-1.5"><Layout size={14} className="text-accent-primary" /> Global Portfolio</span>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <span className="text-text-primary/70">24 Nodes Active</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="btn-secondary p-2.5 rounded-xl text-text-secondary">
             <Filter size={20} />
           </button>
           <div className="flex bg-white/[0.02] p-1 rounded-xl border border-white/5">
              <button 
                onClick={() => setView('grid')}
                className={cn("p-2 px-3 rounded-lg transition-all", view === 'grid' ? "bg-white/[0.05] text-accent-primary shadow-sm ring-1 ring-white/10" : "text-text-secondary hover:text-text-primary")}
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setView('list')}
                className={cn("p-2 px-3 rounded-lg transition-all", view === 'list' ? "bg-white/[0.05] text-accent-primary shadow-sm ring-1 ring-white/10" : "text-text-secondary hover:text-text-primary")}
              >
                <ListIcon size={18} />
              </button>
           </div>
           <button className="btn-primary px-6 py-3 text-xs tracking-widest">
             <Plus size={18} className="mr-2" /> New Project
           </button>
        </div>
      </div>

      <div className="relative group max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-primary transition-colors transition-all" size={16} />
        <input 
          type="text" 
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-premium pl-11 py-3 text-xs"
        />
      </div>

      <AnimatePresence mode="wait">
        {view === 'grid' ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card-premium p-8 group flex flex-col h-full hover:border-accent-primary/20 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className={cn(
                    "px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-[0.2em] border transition-colors",
                    project.status === 'Completed' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                    project.status === 'Review' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                    "bg-white/5 text-text-secondary/60 border-white/10"
                  )}>
                    {project.status}
                  </div>
                  <button className="text-text-secondary/30 hover:text-text-primary transition-colors p-1">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="flex-1 space-y-3 mb-10">
                  <div>
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary opacity-50">{project.category}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-text-primary group-hover:text-accent-primary transition-colors leading-tight tracking-tight">
                    {project.name}
                  </h3>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/[0.04]">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.15em] text-text-secondary/40">
                    <span className="flex items-center gap-2">
                       <Clock size={12} className="text-accent-primary/60" /> {project.deadline}
                    </span>
                    <div className="flex -space-x-1.5">
                      {project.team.map((t, idx) => (
                        <div key={idx} className="w-6 h-6 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-[8px] font-black text-text-primary shadow-sm ring-2 ring-bg-card">
                           {t}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[9px] font-black uppercase text-text-secondary tracking-[0.2em]">
                       <span className="opacity-40">Burn Rate Index</span>
                       <span className="text-accent-primary">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <div className="h-full bg-accent-primary rounded-full transition-all duration-1000 shadow-glow" style={{ width: `${project.progress}%` }}></div>
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
            className="card-premium overflow-hidden shadow-glow-soft"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/[0.05]">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/60">Portfolio Node</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/60">Segment</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/60">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/60">Burn Index</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/60 text-right">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center text-accent-primary font-black text-xs group-hover:bg-accent-primary group-hover:text-bg-main transition-all">
                          {project.name[0]}
                        </div>
                        <span className="font-bold text-text-primary group-hover:text-accent-primary transition-colors text-sm">{project.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-semibold text-text-secondary/60">{project.category}</span>
                    </td>
                    <td className="px-8 py-6">
                       <span className={cn(
                          "px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-[0.1em] border transition-colors",
                          project.status === 'Completed' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                          project.status === 'Review' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                          "bg-white/5 text-text-secondary/60 border-white/10"
                        )}>
                          {project.status}
                        </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                         <div className="w-32 bg-white/[0.05] h-1.5 rounded-full overflow-hidden p-0.5 border border-white/5">
                           <div className="h-full bg-accent-primary rounded-full shadow-glow" style={{ width: `${project.progress}%` }}></div>
                         </div>
                         <span className="text-xs font-bold text-text-primary/70">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-widest">{project.deadline}</span>
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
