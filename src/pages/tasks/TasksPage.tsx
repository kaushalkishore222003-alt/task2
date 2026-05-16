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

const TASKS = [
  { id: 1, title: 'Finalize typography system for Fintech Rebrand', project: 'Fintech Rebrand', priority: 'High', status: 'In Progress', assignee: 'Alex Johnson', date: 'May 20', progress: 65 },
  { id: 2, title: 'Draft API documentation for new internal portal', project: 'API Refactor', priority: 'Medium', status: 'Todo', assignee: 'Sarah Chen', date: 'May 22', progress: 0 },
  { id: 3, title: 'Client review session - Phase 1 assets', project: 'Fintech Rebrand', priority: 'High', status: 'Completed', assignee: 'Alex Johnson', date: 'May 15', progress: 100 },
  { id: 4, title: 'Performance audit of the core engine', project: 'Systems Team', priority: 'Urgent', status: 'Blocked', assignee: 'Marcus Miller', date: 'Jun 02', progress: 15 },
  { id: 5, title: 'Asset preparation for Q3 Roadmap presentation', project: 'Strategy', priority: 'Medium', status: 'In Progress', assignee: 'Sarah Chen', date: 'May 18', progress: 45 },
];

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
        <div className="space-y-4">
          <h1 className="text-5xl editorial-heading text-ink">Work Units.</h1>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
             <span className="flex items-center gap-1.5"><Layers size={14} className="text-primary-dark" /> Enterprise Backlog</span>
             <span className="w-1 h-1 bg-gray-200 rounded-full" />
             <span className="text-ink">{TASKS.length} Units Distributed</span>
          </div>
        </div>

        <button className="flex items-center gap-2 px-8 py-4 bg-primary-dark text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-ink shadow-2xl shadow-primary-dark/20 transition-all active:scale-[0.98]">
          <Plus size={16} /> Allocate Task
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {[
          { label: 'Total', val: TASKS.length, color: 'bg-gray-50 text-ink' },
          { label: 'Live', val: 2, color: 'bg-primary-light text-primary-dark' },
          { label: 'Block', val: 1, color: 'bg-red-50 text-red-600' },
          { label: 'Review', val: 0, color: 'bg-amber-50 text-amber-600' },
          { label: 'Done', val: 1, color: 'bg-emerald-50 text-emerald-600' },
        ].map((s, i) => (
          <div key={i} className={cn("p-6 rounded-[2rem] border border-gray-100 flex flex-col justify-between aspect-square md:aspect-auto", s.color)}>
             <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{s.label}</span>
             <span className="text-4xl editorial-heading mt-2 tabular-nums">{s.val}</span>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between border-b border-gray-100 pb-10">
        <div className="flex bg-gray-100/50 p-1.5 rounded-[1.5rem] border border-gray-100 w-full lg:w-auto overflow-x-auto scrollbar-hide">
          {['All', 'Todo', 'In Progress', 'Completed', 'Review', 'Blocked'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={cn(
                "px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                filter === f ? "bg-white text-ink shadow-sm ring-1 ring-gray-100" : "text-gray-400 hover:text-gray-600"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-96">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            type="text" 
            placeholder="Search by keywords or project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-[2rem] py-4 pl-14 pr-8 text-sm focus:ring-4 focus:ring-primary-dark/5 focus:border-primary-dark outline-none transition-all placeholder-gray-300 font-medium"
          />
        </div>
      </div>

      {/* Tasks Table */}
      <div className="card-base rounded-[3rem] bg-white overflow-hidden border border-gray-100 shadow-xl shadow-gray-100/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Unit Identifier</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Assignment</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Metric</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Threshold</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-10 py-8 min-w-[320px]">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary-dark/40 italic">{task.project}</span>
                        <div className="w-1 h-1 bg-gray-200 rounded-full" />
                        <TaskPriorityBadge priority={task.priority as any} />
                      </div>
                      <h4 className="font-bold text-lg text-ink group-hover:text-primary-dark transition-colors">{task.title}</h4>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-2xl bg-primary-light flex items-center justify-center text-primary-dark font-black text-xs shadow-sm group-hover:bg-primary-dark group-hover:text-white transition-all">
                          {task.assignee.split(' ').map(n=>n[0]).join('')}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-ink">{task.assignee}</p>
                          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Lead Member</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="space-y-2">
                       <div className="flex items-center justify-between text-[10px] font-black uppercase text-gray-400 tracking-widest">
                          <span>{task.progress}%</span>
                          <TaskStatusBadge status={task.status as any} />
                       </div>
                       <div className="w-32 bg-gray-50 h-1.5 rounded-full overflow-hidden p-0.5 border border-gray-100">
                          <div className="h-full bg-primary-dark rounded-full transition-all duration-1000" style={{ width: `${task.progress}%` }}></div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                     <div className="flex items-center gap-2.5 px-4 py-2 bg-gray-50 rounded-2xl w-fit border border-gray-100">
                        <Calendar size={14} className="text-gray-300" />
                        <span className="text-[10px] font-black uppercase text-ink">{task.date}</span>
                     </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button className="p-3 hover:bg-gray-100 rounded-2xl transition-all text-gray-300 hover:text-ink">
                       <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTasks.length === 0 && (
          <div className="py-32 text-center space-y-6">
             <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto border border-gray-100">
                <BarChart3 size={32} className="text-gray-200" />
             </div>
             <div>
                <p className="text-2xl font-bold text-ink italic underline decoration-primary-light decoration-4 underline-offset-8">No matching Units.</p>
                <p className="text-sm text-gray-400 font-medium mt-2">Adjust your refinement parameters to locate data.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

