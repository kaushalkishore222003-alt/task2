import { cn } from "../../utils/cn";
import { Calendar, ChevronRight, MessageSquare, Plus, FileText, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  const activities = [
    { type: 'comment', user: 'Sarah Chen', target: 'Fintech Rebrand', time: '2m ago', icon: MessageSquare, color: 'text-blue-500 bg-blue-50' },
    { type: 'upload', user: 'Alex Marcus', target: 'Q3 Asset Pack', time: '15m ago', icon: FileText, color: 'text-amber-500 bg-amber-50' },
    { type: 'complete', user: 'You', target: 'Email Templates', time: '1h ago', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl editorial-heading text-ink">Overview.</h1>
          <p className="text-gray-400 font-medium mt-1">Status Report — Friday, May 16, 2026</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-ink transition-all">
             Export CSV
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-primary-dark text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-ink shadow-xl shadow-primary-dark/20 transition-all">
             <Plus size={16} /> New Proposal
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-8 rounded-[2.5rem] bg-primary-dark text-white shadow-xl shadow-primary-dark/20 relative overflow-hidden group">
          <span className="text-[11px] font-bold uppercase tracking-widest opacity-60">Active Projects</span>
          <h2 className="text-7xl editorial-heading mt-2 tabular-nums">12</h2>
          <div className="mt-6 flex items-center gap-2">
            <span className="text-[10px] px-3 py-1.5 bg-white/20 rounded-full font-black uppercase tracking-widest">↑ 4 active</span>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
        </div>

        {[
          { label: 'Pending Tasks', value: '48', meta: '85% capacity reached' },
          { label: 'Completed', value: '124', meta: '↑ 12% vs last week', metaColor: 'text-emerald-600' },
          { label: 'Team Velocity', value: '92%', meta: 'Optimal range', progress: 92 },
        ].map((stat, i) => (
          <div key={i} className="card-base p-8 rounded-[2.5rem]">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</span>
            <h2 className="text-7xl editorial-heading mt-2 text-ink tabular-nums">{stat.value}</h2>
            {stat.progress ? (
               <div className="w-full bg-gray-100 h-1 mt-8 rounded-full overflow-hidden">
                 <div className="h-full bg-primary-dark rounded-full" style={{ width: `${stat.progress}%` }}></div>
               </div>
            ) : (
              <p className={cn("text-[11px] font-black uppercase tracking-widest mt-6", stat.metaColor || "text-gray-400")}>{stat.meta}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold tracking-tight text-ink italic">Current Workstreams</h3>
            <button className="text-xs font-black uppercase tracking-widest text-primary-dark hover:underline underline-offset-4 decoration-2">Registry</button>
          </div>
          
          <div className="grid gap-6">
            {[
              { name: 'Fintech Rebrand 2024', client: 'Eon Global', progress: 74, priority: 'High', delay: 0 },
              { name: 'Internal API Refactor', client: 'Systems Team', progress: 12, priority: 'Normal', delay: 0.1 },
              { name: 'Q3 Product Roadmap', client: 'Executive Board', progress: 100, priority: 'Completed', delay: 0.2 }
            ].map((project, i) => (
              <div key={i} className="card-base p-8 rounded-[2rem] hover:border-primary-light hover:shadow-2xl hover:shadow-primary-light/10 group transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-primary-dark font-black text-xl group-hover:bg-primary-dark group-hover:text-white transition-all">
                      {project.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-ink group-hover:text-primary-dark transition-colors">{project.name}</h4>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{project.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                       {[1,2,3].map(m => (
                         <div key={m} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white overflow-hidden ring-1 ring-gray-100">
                           <img src={`https://i.pravatar.cc/100?img=${m+10}`} alt="member" className="w-full h-full object-cover" />
                         </div>
                       ))}
                    </div>
                    <span className={cn(
                      "px-4 py-1.5 text-[10px] font-black uppercase rounded-full tracking-wider",
                      project.priority === 'High' ? "bg-primary-light text-primary-dark" : 
                      project.priority === 'Completed' ? "bg-gray-100 text-emerald-600 border border-emerald-100" : "bg-gray-50 text-gray-400"
                    )}>
                      {project.priority}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-black uppercase text-gray-400 tracking-widest">
                    <span>Completion index</span>
                    <span className="text-ink">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden p-0.5 border border-gray-100">
                    <div className="h-full bg-primary-dark rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold tracking-tight text-ink">Recent Signals</h3>
            <div className="card-base p-8 rounded-[2rem] space-y-6">
              {activities.map((act, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", act.color)}>
                    <act.icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-ink">
                      <span className="font-bold">{act.user}</span>
                      <span className="text-gray-400"> updated </span>
                      <span className="font-bold text-primary-dark group-hover:underline">{act.target}</span>
                    </p>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-4 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-100 transition-all">Audit Log</button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-bold tracking-tight text-ink">Upcoming</h3>
            <div className="card-base p-8 rounded-[2rem] bg-ink text-white shadow-2xl relative overflow-hidden">
               <Calendar className="absolute -top-6 -right-6 w-32 h-32 opacity-5 text-white italic" />
               <div className="relative z-10 space-y-6">
                  <div className="pb-4 border-b border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-light/60 mb-1">Today's Milestone</p>
                    <h4 className="text-xl font-bold italic">Brand Guideline Release</h4>
                  </div>
                  <div className="space-y-4">
                     {[
                       { time: '14:00', task: 'Team Alignment Sync', cat: 'Sync' },
                       { time: '16:30', task: 'Asset Review: Phase 2', cat: 'Critical' }
                     ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between group cursor-default">
                          <div className="flex items-center gap-3">
                             <span className="text-xs font-mono text-primary-light/40">{item.time}</span>
                             <span className="text-xs font-bold group-hover:text-primary-light transition-colors">{item.task}</span>
                          </div>
                          <span className="text-[9px] font-black px-2 py-0.5 bg-white/10 rounded uppercase tracking-widest">{item.cat}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

