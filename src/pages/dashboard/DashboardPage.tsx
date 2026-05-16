import { Plus, Layout, Zap, FileSpreadsheet, Send, TrendingUp, CheckCircle2, Clock, Users, MessageSquare, FileText } from "lucide-react";
import { StatCard } from "../../components/dashboard/StatCard";
import { CalendarWidget } from "../../components/dashboard/CalendarWidget";
import { cn } from "../../utils/cn";

export default function DashboardPage() {
  const activities = [
    { type: 'comment', user: 'Sarah Chen', target: 'Fintech Rebrand', time: '2m ago', icon: MessageSquare, color: 'text-blue-500 bg-blue-50' },
    { type: 'upload', user: 'Alex Marcus', target: 'Q3 Asset Pack', time: '15m ago', icon: FileText, color: 'text-amber-500 bg-amber-50' },
    { type: 'complete', user: 'You', target: 'Email Templates', time: '1h ago', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
    { type: 'join', user: 'David Kim', target: 'Product Team', time: '4h ago', icon: Users, color: 'text-primary-dark bg-primary-light/30' },
  ];

  return (
    <div className="space-y-12 pb-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight">Executive Dashboard<span className="text-accent-primary">.</span></h1>
          <p className="text-text-secondary font-medium tracking-wide flex items-center gap-2 text-sm">
            <Zap size={14} className="text-accent-primary" /> Intelligence Summary — <span className="text-text-primary/60">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button className="btn-secondary group px-5 py-2.5 text-xs tracking-wider">
             <FileSpreadsheet size={16} className="text-text-secondary group-hover:text-text-primary transition-colors mr-2" /> 
             Audit Matrix
           </button>
           <button className="btn-primary px-6 py-2.5 text-xs tracking-wider">
             <Plus size={18} className="mr-2" /> 
             Deploy Project
           </button>
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Active Talent" 
          value={18} 
          change="+2" 
          trend="up" 
          icon={Users} 
          description="Verified workforce members" 
        />
        <StatCard 
          label="Yield Rate" 
          value="94%" 
          change="+1.5%" 
          trend="up" 
          icon={TrendingUp} 
          description="Efficiency per workstream" 
        />
        <StatCard 
          label="Units Done" 
          value={142} 
          change="+24" 
          trend="up" 
          icon={CheckCircle2} 
          description="Total tasks finalized" 
        />
        <StatCard 
          label="Avg Cycle" 
          value="3.2d" 
          change="-0.4d" 
          trend="up" 
          icon={Clock} 
          description="Lead time to delivery" 
        />
      </div>

      {/* Main Grid: Projects & Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-10">
          {/* Workstreams */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-xl font-display font-semibold text-text-primary">Current Workstreams</h3>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> <span className="text-[10px] font-black uppercase text-text-secondary tracking-[0.2em]">Active</span></div>
                 <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/10" /> <span className="text-[10px] font-black uppercase text-text-secondary tracking-[0.2em]">Queue</span></div>
              </div>
            </div>
            
            <div className="grid gap-4">
              {[
                { name: 'Fintech Rebrand 2024', client: 'Eon Global', progress: 74, priority: 'High', status: 'Priority' },
                { name: 'Internal API Refactor', client: 'Systems Team', progress: 12, priority: 'Normal', status: 'In Review' },
              ].map((project, i) => (
                <div key={i} className="card-premium p-8 group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-bl-[4rem] group-hover:bg-accent-primary/[0.05] transition-colors pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8 relative z-10">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center text-accent-primary font-black text-xl group-hover:bg-accent-primary group-hover:text-bg-main transition-all shadow-sm">
                        {project.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-text-primary group-hover:text-accent-primary transition-colors">{project.name}</h4>
                        <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mt-1.5">{project.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex -space-x-3">
                         {[1,2,3,4].map(m => (
                           <img key={m} src={`https://i.pravatar.cc/100?img=${m+15}`} alt="member" className="w-9 h-9 rounded-full border-2 border-bg-card shadow-lg ring-1 ring-white/5" />
                         ))}
                         <div className="w-9 h-9 rounded-full bg-white/[0.05] border-2 border-bg-card flex items-center justify-center text-[10px] font-black text-text-secondary">+2</div>
                      </div>
                      <span className={cn(
                        "px-4 py-1.5 text-[9px] font-black uppercase rounded-lg tracking-widest border transition-all duration-300",
                        project.priority === 'High' ? "bg-accent-soft text-accent-primary border-accent-primary/20" : "bg-white/[0.03] text-text-secondary border-white/5"
                      )}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-text-secondary tracking-[0.2em]">
                      <span className="flex items-center gap-2"><Layout size={12} className="opacity-40" /> Completion Index</span>
                      <span className="text-text-primary bg-white/[0.05] px-2 py-0.5 rounded-md border border-white/5">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-white/[0.05] h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <div 
                        className="h-full bg-accent-primary rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(16,185,129,0.3)]" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Productivity Signals Section */}
          <div className="card-premium p-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-bg-card/80 to-transparent">
             <div className="space-y-3 text-center md:text-left">
                <h3 className="text-2xl font-bold tracking-tight text-text-primary">Talent Sync<span className="text-accent-primary">.</span></h3>
                <p className="text-sm text-text-secondary font-medium max-w-sm leading-relaxed">Collaborative insights from across your workspace in real-time.</p>
                <div className="flex items-center justify-center md:justify-start gap-4 pt-1">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} className="w-7 h-7 rounded-full border-2 border-bg-main shadow-lg" />)}
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary/60">14 Colleagues online</span>
                </div>
             </div>
             <div className="flex gap-3">
                <button className="w-12 h-12 bg-white/[0.03] border border-white/[0.08] rounded-xl flex items-center justify-center text-text-secondary hover:bg-accent-primary hover:text-bg-main hover:scale-105 transition-all duration-300"><MessageSquare size={18} /></button>
                <button className="w-12 h-12 bg-white/[0.03] border border-white/[0.08] rounded-xl flex items-center justify-center text-text-secondary hover:bg-accent-primary hover:text-bg-main hover:scale-105 transition-all duration-300"><Send size={18} /></button>
             </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Actions */}
          <div className="space-y-4">
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary ml-1">Operations</h3>
             <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Task', icon: CheckCircle2 },
                  { label: 'Project', icon: Layout },
                  { label: 'Report', icon: FileSpreadsheet },
                  { label: 'Signal', icon: Send },
                ].map((action, i) => (
                  <button key={i} className="card-premium p-5 flex flex-col items-center justify-center gap-3">
                     <div className="w-10 h-10 bg-white/[0.03] border border-white/5 rounded-xl flex items-center justify-center text-text-secondary group-hover:bg-accent-primary group-hover:text-bg-main transition-all">
                        <action.icon size={18} />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{action.label}</span>
                  </button>
                ))}
             </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-display font-semibold text-text-primary">Recent Signals</h3>
            <div className="card-premium p-6 space-y-6">
              {activities.map((act, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110 shadow-sm border border-white/5", act.color.replace('bg-', 'bg-opacity-10 bg-'))}>
                    <act.icon size={18} className={act.color.split(' ')[0]} />
                  </div>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="text-xs text-text-primary leading-tight font-medium">
                      <span className="font-bold">{act.user}</span>
                      <span className="opacity-60 font-normal"> updated </span>
                      <span className="font-semibold text-accent-primary">{act.target}</span>
                    </p>
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-40">{act.time}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-3.5 bg-white/[0.03] border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary hover:bg-white/[0.05] hover:text-text-primary transition-all">View Chronicle</button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-display font-semibold text-text-primary">Chronology</h3>
            <CalendarWidget />
          </div>
        </div>
      </div>
    </div>
  );
}


