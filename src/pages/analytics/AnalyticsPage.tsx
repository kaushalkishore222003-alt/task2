import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import { TrendingUp, Users, CheckCircle2, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const VELOCITY_DATA = [
  { name: 'Mon', tasks: 12, velocity: 85 },
  { name: 'Tue', tasks: 18, velocity: 92 },
  { name: 'Wed', tasks: 15, velocity: 78 },
  { name: 'Thu', tasks: 22, velocity: 95 },
  { name: 'Fri', tasks: 30, velocity: 88 },
  { name: 'Sat', tasks: 10, velocity: 60 },
  { name: 'Sun', tasks: 5, velocity: 45 },
];

const CATEGORY_DATA = [
  { name: 'Design', value: 400, color: '#064E3B' },
  { name: 'Engineering', value: 300, color: '#10B981' },
  { name: 'Strategy', value: 200, color: '#D1FAE5' },
  { name: 'Review', value: 100, color: '#111827' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-5xl editorial-heading text-ink">Intelligence.</h1>
          <p className="text-gray-400 font-medium tracking-wide italic">Diagnostic Report — Workspace Velocity & Resource Allocation</p>
        </div>
        <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
           {['7 Days', '30 Days', '90 Days'].map((t, i) => (
             <button key={i} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", i === 1 ? "bg-white text-ink shadow-sm" : "text-gray-400")}>
                {t}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Avg Velocity', val: '92%', change: '+4.2%', up: true, icon: TrendingUp },
          { label: 'Active Talent', val: '18', change: '+2', up: true, icon: Users },
          { label: 'Units Killed', val: '1,240', change: '-12%', up: false, icon: CheckCircle2 },
          { label: 'Cycle Time', val: '3.4d', change: '-0.8d', up: true, icon: Clock },
        ].map((stat, i) => (
          <div key={i} className="card-base p-8 rounded-[2.5rem] bg-white group hover:shadow-2xl transition-all">
             <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-primary-dark group-hover:bg-primary-dark group-hover:text-white transition-all">
                   <stat.icon size={20} />
                </div>
                <div className={cn("flex items-center gap-1.5 text-[10px] font-black px-3 py-1 rounded-full", stat.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600")}>
                   {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                   {stat.change}
                </div>
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
             <h2 className="text-5xl editorial-heading text-ink italic">{stat.val}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-10">
           <div className="card-base p-10 rounded-[3rem] bg-white space-y-10">
              <div className="flex items-center justify-between">
                 <h3 className="text-2xl font-bold tracking-tight text-ink italic underline decoration-primary-light decoration-4 underline-offset-8">Production Velocity</h3>
                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary-dark" /> <span className="text-[10px] font-black uppercase text-gray-400">Tasks</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-200" /> <span className="text-[10px] font-black uppercase text-gray-400">Quality Index</span></div>
                 </div>
              </div>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={VELOCITY_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#064E3B" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#064E3B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af', textAnchor: 'middle' }}
                       dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                       contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', padding: '16px' }}
                       itemStyle={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}
                    />
                    <Area type="monotone" dataKey="tasks" stroke="#064E3B" strokeWidth={4} fillOpacity={1} fill="url(#colorTasks)" />
                    <Line type="monotone" dataKey="velocity" stroke="#E5E7EB" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-10">
              <div className="card-base p-10 rounded-[3rem] bg-ink text-white">
                 <h3 className="text-xl font-bold mb-10 italic">Allocation Share</h3>
                 <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie
                            data={CATEGORY_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={8}
                            dataKey="value"
                            stroke="none"
                         >
                            {CATEGORY_DATA.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                         </Pie>
                         <Tooltip cursor={false} />
                      </PieChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="grid grid-cols-2 gap-4 mt-8">
                    {CATEGORY_DATA.map((c, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                         <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{c.name}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="card-base p-10 rounded-[3rem] bg-gray-50/50">
                 <h3 className="text-xl font-bold text-ink mb-10 italic">Peak Performance Hours</h3>
                 <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={VELOCITY_DATA.slice(0, 5)}>
                          <Bar dataKey="tasks" fill="#064E3B" radius={[12, 12, 0, 0]} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
                 <p className="text-center text-[10px] font-black uppercase text-gray-400 tracking-widest mt-6">Optimized Window: 10:00 - 14:00</p>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <div className="card-base p-10 rounded-[3rem] bg-emerald-50/30 border-emerald-100 italic space-y-6">
              <h3 className="text-2xl font-bold text-emerald-900 leading-tight">Insight Generator.</h3>
              <p className="text-sm text-emerald-700 font-medium leading-relaxed">Your team's velocity peaked on Friday. This correlates with the reduced meeting load scheduled for end-of-week sessions.</p>
              <div className="pt-6 border-t border-emerald-100 flex justify-between items-center text-[10px] font-black uppercase text-emerald-600 tracking-widest">
                 <span>Confidence Score</span>
                 <span className="bg-white px-3 py-1 rounded-full shadow-sm">94%</span>
              </div>
           </div>

           <div className="space-y-6">
              <h3 className="text-3xl font-bold tracking-tight text-ink italic">Talent Output</h3>
              <div className="card-base p-8 rounded-[2rem] space-y-8">
                 {[
                   { name: 'Alex Johnson', roles: 'Lead', tasks: 42, score: 98 },
                   { name: 'Sarah Chen', roles: 'Dev', tasks: 38, score: 95 },
                   { name: 'Marcus Miller', roles: 'Product', tasks: 24, score: 88 },
                 ].map((talent, i) => (
                   <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-100 overflow-hidden ring-1 ring-gray-100 group-hover:scale-105 transition-transform">
                            <img src={`https://i.pravatar.cc/100?img=${i+4}`} alt={talent.name} className="w-full h-full object-cover" />
                         </div>
                         <div>
                            <p className="font-bold text-ink text-sm italic">{talent.name}</p>
                            <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{talent.roles}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-xl font-black text-ink">{talent.score}%</p>
                         <p className="text-[9px] font-black uppercase text-primary-dark tracking-widest">{talent.tasks} Units</p>
                      </div>
                   </div>
                 ))}
                 <button className="w-full py-4 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-ink hover:border-ink transition-all italic">Talent Audit Full Report</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
