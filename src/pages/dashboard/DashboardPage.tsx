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
        <div className="space-y-1">
          <h1 className="text-5xl editorial-heading text-ink">Dashboard.</h1>
          <p className="text-gray-400 font-medium tracking-wide flex items-center gap-2">
            <Zap size={14} className="text-primary-dark" /> Enterprise Performance Summary — <span className="italic">May 16, 2026</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-ink transition-all group">
             <FileSpreadsheet size={16} className="text-gray-400 group-hover:text-ink transition-colors" /> Generate Audit
           </button>
           <button className="flex items-center gap-2 px-8 py-4 bg-primary-dark text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-ink shadow-2xl shadow-primary-dark/20 transition-all active:scale-[0.98]">
             <Plus size={16} /> New Deployment
           </button>
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-12">
          {/* Workstreams */}
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <h3 className="text-3xl font-bold tracking-tight text-ink italic">Current Workstreams</h3>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary-dark" /> <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Active</span></div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-200" /> <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Queue</span></div>
              </div>
            </div>
            
            <div className="grid gap-6">
              {[
                { name: 'Fintech Rebrand 2024', client: 'Eon Global', progress: 74, priority: 'High', status: 'Priority' },
                { name: 'Internal API Refactor', client: 'Systems Team', progress: 12, priority: 'Normal', status: 'In Review' },
              ].map((project, i) => (
                <div key={i} className="card-base p-10 rounded-[3rem] hover:border-primary-dark/20 hover:shadow-2xl hover:shadow-primary-dark/5 group transition-all bg-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50/50 rounded-bl-[4rem] group-hover:bg-primary-light/10 transition-colors pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-10 relative z-10">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center text-primary-dark font-black text-2xl group-hover:bg-primary-dark group-hover:text-white transition-all shadow-sm">
                        {project.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-2xl text-ink group-hover:text-primary-dark transition-colors">{project.name}</h4>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1.5">{project.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex -space-x-3">
                         {[1,2,3,4].map(m => (
                           <img key={m} src={`https://i.pravatar.cc/100?img=${m+15}`} alt="member" className="w-10 h-10 rounded-full border-4 border-white shadow-sm ring-1 ring-gray-100" />
                         ))}
                         <div className="w-10 h-10 rounded-full bg-gray-50 border-4 border-white flex items-center justify-center text-[10px] font-black text-gray-400">+2</div>
                      </div>
                      <span className={cn(
                        "px-6 py-2 text-[10px] font-black uppercase rounded-full tracking-widest border",
                        project.priority === 'High' ? "bg-primary-light text-primary-dark border-primary-light" : "bg-gray-50 text-gray-400 border-gray-100"
                      )}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[11px] font-black uppercase text-gray-400 tracking-widest">
                      <span className="flex items-center gap-2"><Layout size={12} className="opacity-40" /> Completion Index</span>
                      <span className="text-ink bg-gray-50 px-3 py-1 rounded-full">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden p-0.5 border border-gray-100">
                      <div className="h-full bg-primary-dark rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(6,78,59,0.2)]" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Productivity Signals Section */}
          <div className="card-base p-10 rounded-[3rem] bg-gray-50/50 border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10">
             <div className="space-y-4 text-center md:text-left">
                <h3 className="text-3xl font-black tracking-tight text-ink">Talent Sync.</h3>
                <p className="text-sm text-gray-500 font-medium max-w-sm leading-relaxed">Collaborative insights from across your workspace in real-time.</p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />)}
                   </div>
                   <span className="text-xs font-bold text-gray-400">14 Colleagues online</span>
                </div>
             </div>
             <div className="flex gap-4">
                <button className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-dark shadow-sm hover:bg-primary-dark hover:text-white transition-all"><MessageSquare size={20} /></button>
                <button className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-dark shadow-sm hover:bg-primary-dark hover:text-white transition-all"><Send size={20} /></button>
             </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-12">
          {/* Quick Actions */}
          <div className="space-y-6">
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Quick Operations</h3>
             <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Task', icon: CheckCircle2 },
                  { label: 'Project', icon: Layout },
                  { label: 'Report', icon: FileSpreadsheet },
                  { label: 'Signal', icon: Send },
                ].map((action, i) => (
                  <button key={i} className="card-base p-4 rounded-3xl bg-white border border-gray-100 flex flex-col items-center justify-center gap-3 group hover:border-primary-dark transition-all">
                     <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-primary-dark group-hover:text-white transition-all">
                        <action.icon size={18} />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-ink">{action.label}</span>
                  </button>
                ))}
             </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-3xl font-bold tracking-tight text-ink italic">Signals</h3>
            <div className="card-base p-10 rounded-[3rem] bg-white space-y-8 border border-gray-100 shadow-xl shadow-gray-100/50">
              {activities.map((act, i) => (
                <div key={i} className="flex gap-6 group cursor-pointer">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110 shadow-sm", act.color)}>
                    <act.icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm text-ink leading-tight">
                      <span className="font-black text-ink">{act.user}</span>
                      <span className="text-gray-400"> updated </span>
                      <span className="font-bold text-primary-dark group-hover:underline">{act.target}</span>
                    </p>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{act.time}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-5 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-100 hover:text-ink transition-all italic">View full chronicle</button>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-3xl font-bold tracking-tight text-ink italic">Chronology</h3>
            <CalendarWidget />
          </div>
        </div>
      </div>
    </div>
  );
}


