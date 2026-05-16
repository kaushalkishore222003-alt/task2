import { motion } from 'motion/react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Target, 
  Zap, 
  BarChart3, 
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { ProductivityChart, ComparisonChart, DistributionChart } from '../../components/analytics/AnalyticsCharts';

export default function AnalyticsPage() {
  return (
    <div className="space-y-12 pb-24 text-sm font-medium">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight">Business Intelligence<span className="text-accent-primary">.</span></h1>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
             <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-accent-primary" /> Performance Matrix</span>
             <span className="w-1 h-1 bg-white/10 rounded-full" />
             <span className="text-text-primary/70">Q2 Analysis Batch</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <button className="btn-secondary group px-5 py-2.5 text-xs tracking-wider">
             <Filter size={16} className="mr-2" /> Parameters
           </button>
           <button className="btn-primary px-6 py-2.5 text-xs tracking-wider">
             <Download size={16} className="mr-2" /> Export Dataset
           </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Productivity Trends */}
        <div className="lg:col-span-8 space-y-8">
           <div className="card-premium p-8">
              <div className="flex items-center justify-between mb-10">
                 <div className="space-y-1">
                    <h3 className="text-xl font-display font-semibold text-text-primary">Velocity Index</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-text-secondary opacity-50">Work units completed per session</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                       <span className="text-[9px] font-black uppercase text-text-secondary tracking-widest">Active Output</span>
                    </div>
                 </div>
              </div>
              <ProductivityChart />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-premium p-8">
                 <div className="space-y-1 mb-8">
                    <h3 className="text-lg font-display font-semibold text-text-primary">Backlog Disparity</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-text-secondary opacity-50">Done vs Backlog comparison</p>
                 </div>
                 <ComparisonChart />
              </div>

              <div className="card-premium p-8">
                 <div className="space-y-1 mb-8">
                    <h3 className="text-lg font-display font-semibold text-text-primary">Talent Matrix</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-text-secondary opacity-50">Work distribution by segment</p>
                 </div>
                 <DistributionChart />
              </div>
           </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary ml-1">Tactical KPIs</h3>
              <div className="space-y-3">
                 {[
                   { label: 'Success Variance', val: '98.2%', trend: 'up', change: '+2.4%' },
                   { label: 'Latency Error', val: '1.4%', trend: 'down', change: '-0.8%' },
                   { label: 'Member Saturation', val: '74%', trend: 'up', change: '+12%' },
                   { label: 'Revenue/Head', val: '$14.2k', trend: 'up', change: '+450' },
                 ].map((kpi, i) => (
                   <div key={i} className="card-premium p-6 group">
                      <div className="flex items-center justify-between">
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">{kpi.label}</p>
                            <h4 className="text-2xl font-display font-bold mt-1.5 text-text-primary tabular-nums group-hover:text-accent-primary transition-colors">{kpi.val}</h4>
                         </div>
                         <div className={cn(
                           "flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black border",
                           kpi.trend === 'up' ? "bg-accent-soft text-accent-primary border-accent-primary/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                         )}>
                            {kpi.trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                            {kpi.change}
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="card-premium p-8 bg-gradient-to-br from-bg-card to-bg-main relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent-primary/10 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-110" />
              <div className="relative z-10 space-y-6">
                 <div className="w-12 h-12 bg-white/[0.03] border border-white/5 rounded-xl flex items-center justify-center text-accent-primary shadow-glow">
                    <Target size={22} />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xl font-display font-bold text-text-primary">Q2 Mission Target</h4>
                    <p className="text-xs text-text-secondary leading-relaxed opacity-80">You are currently 84% through the required cycles to hit quarterly objectives.</p>
                 </div>
                 <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.15em] text-text-secondary/60">
                       <span>Threshold Progress</span>
                       <span>84%</span>
                    </div>
                    <div className="w-full bg-white/[0.05] h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                       <div className="h-full bg-accent-primary rounded-full shadow-glow transition-all duration-1000" style={{ width: '84%' }}></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
