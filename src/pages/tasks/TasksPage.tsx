import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  Search, 
  Plus,
  Calendar,
  MoreHorizontal,
  Filter,
  BarChart3,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { TaskPriorityBadge, TaskStatusBadge } from '../../components/tasks/TaskBadges';
import { TASKS } from '../../data/constants';

export default function TasksPage() {
  const [filter, setFilter] = useState<'All' | 'Todo' | 'In Progress' | 'Completed' | 'Review' | 'Blocked'>('All');
  const [search, setSearch] = useState('');

  const filteredTasks = TASKS.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                         task.project.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || task.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight">Work Backlog<span className="text-accent-primary">.</span></h1>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
             <span className="flex items-center gap-1.5"><Layers size={14} className="text-accent-primary" /> Enterprise Inventory</span>
             <span className="w-1 h-1 bg-white/10 rounded-full" />
             <span className="text-text-primary/70">{TASKS.length} Units Active</span>
          </div>
        </div>

        <button className="btn-primary py-3.5 px-8 text-xs tracking-widest">
          <Plus size={18} className="mr-2" /> Allocate Task
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total units', val: TASKS.length, color: 'text-text-primary bg-white/[0.03]' },
          { label: 'Live track', val: 2, color: 'text-accent-primary bg-accent-soft' },
          { label: 'Critical block', val: 1, color: 'text-red-400 bg-red-500/10' },
          { label: 'Pending review', val: 0, color: 'text-amber-400 bg-amber-500/10' },
          { label: 'Deployed', val: 1, color: 'text-emerald-400 bg-emerald-500/10' },
        ].map((s, i) => (
          <div key={i} className={cn("p-6 rounded-2xl border border-white/5 flex flex-col justify-between aspect-video md:aspect-auto", s.color)}>
             <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">{s.label}</span>
             <span className="text-3xl font-display font-black mt-2 tabular-nums">{s.val}</span>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between border-b border-white/[0.05] pb-8 text-sm">
        <div className="flex bg-white/[0.02] p-1 rounded-xl border border-white/5 w-full lg:w-auto overflow-x-auto scrollbar-hide">
          {['All', 'Todo', 'In Progress', 'Completed', 'Review', 'Blocked'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={cn(
                "px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                filter === f ? "bg-white/[0.05] text-accent-primary shadow-sm ring-1 ring-white/10" : "text-text-secondary hover:text-text-primary hover:bg-white/[0.02]"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-primary transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search work..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-premium pl-11 py-2.5 text-xs"
          />
        </div>
      </div>

      {/* Tasks Table */}
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/[0.05]">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/60">Identifier</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/60">Execution</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/60">Completion Index</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/60">Deadline</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/60 text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6 min-w-[300px]">
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent-primary opacity-60 tracking-tighter">{task.project}</span>
                        <div className="w-1 h-1 bg-white/10 rounded-full" />
                        <TaskPriorityBadge priority={task.priority as any} />
                      </div>
                      <h4 className="font-bold text-text-primary group-hover:text-accent-primary transition-colors">{task.title}</h4>
                    </div>
                  </td>
                  <td className="px-6 py-6 min-w-[180px]">
                    <div className="flex items-center gap-3">
                       <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-accent-primary font-black text-[10px] group-hover:bg-accent-primary group-hover:text-bg-main transition-all">
                          {task.assignee.split(' ').map(n=>n[0]).join('')}
                       </div>
                       <div>
                          <p className="text-xs font-bold text-text-primary">{task.assignee}</p>
                          <p className="text-[9px] font-black text-text-secondary uppercase tracking-[0.15em] opacity-40">Lead Talent</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 min-w-[160px]">
                    <div className="space-y-2">
                       <div className="flex items-center justify-between text-[9px] font-black uppercase text-text-secondary tracking-[0.1em]">
                          <span className="text-text-primary/70">{task.progress}%</span>
                          <TaskStatusBadge status={task.status as any} />
                       </div>
                       <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden p-0.5 border border-white/5">
                          <div className="h-full bg-accent-primary rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(16,185,129,0.3)]" style={{ width: `${task.progress}%` }}></div>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                     <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] rounded-lg w-fit border border-white/5">
                        <Calendar size={12} className="text-text-secondary/50" />
                        <span className="text-[10px] font-bold text-text-primary/80">{task.date}</span>
                     </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-white/[0.05] rounded-lg transition-all text-text-secondary hover:text-text-primary">
                       <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTasks.length === 0 && (
          <div className="py-24 text-center space-y-6">
             <div className="w-20 h-20 bg-white/[0.02] rounded-3xl flex items-center justify-center mx-auto border border-white/5">
                <Layers size={32} className="text-text-secondary/20" />
             </div>
             <div>
                <p className="text-xl font-display font-bold text-text-primary">No Matching Units</p>
                <p className="text-xs text-text-secondary mt-2 opacity-60">Try refining your filter parameters.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

