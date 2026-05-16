import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  MoreHorizontal, 
  Search, 
  Filter, 
  Plus,
  Calendar,
  User as UserIcon,
  ChevronDown
} from 'lucide-react';
import { cn } from '../../utils/cn';

const TASKS = [
  { id: 1, title: 'Finalize typography system for Fintech Rebrand', project: 'Fintech Rebrand', priority: 'High', status: 'In Progress', assignee: 'Alex Johnson', date: 'May 20' },
  { id: 2, title: 'Draft API documentation for new internal portal', project: 'API Refactor', priority: 'Medium', status: 'Todo', assignee: 'Sarah Chen', date: 'May 22' },
  { id: 3, title: 'Client review session - Phase 1 assets', project: 'Fintech Rebrand', priority: 'High', status: 'Completed', assignee: 'Alex Johnson', date: 'May 15' },
  { id: 4, title: 'Performance audit of the core engine', project: 'Systems Team', priority: 'Low', status: 'Todo', assignee: 'Marcus Miller', date: 'Jun 02' },
  { id: 5, title: 'Asset preparation for Q3 Roadmap presentation', project: 'Strategy', priority: 'Medium', status: 'In Progress', assignee: 'Sarah Chen', date: 'May 18' },
];

export default function TasksPage() {
  const [filter, setFilter] = useState<'All' | 'Todo' | 'In Progress' | 'Completed'>('All');
  const [search, setSearch] = useState('');

  const filteredTasks = TASKS.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                         task.project.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || task.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-5xl editorial-heading text-ink">Work Items.</h1>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
             <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-primary-dark" /> {TASKS.length} Total Units</span>
             <span className="w-1 h-1 bg-gray-200 rounded-full" />
             <span className="text-ink">14 Pending Release</span>
          </div>
        </div>

        <button className="flex items-center gap-2 px-8 py-4 bg-primary-dark text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-ink shadow-2xl shadow-primary-dark/20 transition-all active:scale-95">
          <Plus size={16} /> Assign Task
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex bg-gray-100/50 p-1 rounded-2xl border border-gray-100 w-full md:w-auto">
          {['All', 'Todo', 'In Progress', 'Completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={cn(
                "px-6 py-2.5 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all",
                filter === f ? "bg-white text-ink shadow-sm ring-1 ring-gray-100" : "text-gray-400 hover:text-gray-600"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
          <input 
            type="text" 
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl py-3 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary-dark/10 focus:border-primary-dark outline-none transition-all placeholder-gray-300"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group card-base p-6 rounded-3xl hover:border-primary-dark/20 hover:shadow-xl hover:shadow-primary-dark/5 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all bg-white"
            >
              <div className="flex items-center gap-6 min-w-0 flex-1">
                <button className={cn(
                  "shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all border",
                  task.status === 'Completed' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-gray-50 text-gray-300 border-gray-100 group-hover:bg-white group-hover:border-primary-dark/20"
                )}>
                  {task.status === 'Completed' ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                     <span className="text-[9px] font-black uppercase tracking-widest text-primary-dark/40 italic">{task.project}</span>
                     <span className="w-1 h-1 bg-gray-200 rounded-full" />
                     <span className={cn(
                       "text-[9px] font-black uppercase tracking-tighter",
                       task.priority === 'High' ? "text-red-500" : "text-gray-400"
                     )}>
                        {task.priority} Priority
                     </span>
                  </div>
                  <h4 className={cn(
                    "text-lg font-bold text-ink truncate group-hover:text-primary-dark transition-colors",
                    task.status === 'Completed' && "text-gray-300 line-through decoration-emerald-200 decoration-2"
                  )}>
                    {task.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-10 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-gray-50">
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl text-[10px] font-bold text-gray-500">
                       <Calendar size={12} className="opacity-40" />
                       {task.date}
                    </div>
                    <div className="flex items-center gap-2 group/user cursor-pointer">
                       <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary-dark font-black text-[10px]">
                          {task.assignee.split(' ').map(n=>n[0]).join('')}
                       </div>
                    </div>
                 </div>
                 
                 <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-300 hover:text-ink">
                    <MoreHorizontal size={20} />
                 </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-20 text-center space-y-4">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                <Search size={32} className="text-gray-200" />
             </div>
             <div>
                <p className="text-xl font-bold text-ink">No units match your criteria.</p>
                <p className="text-sm text-gray-400 font-medium">Try refining your search or filter parameters.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
