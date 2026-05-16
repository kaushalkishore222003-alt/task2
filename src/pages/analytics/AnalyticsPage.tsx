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
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-5xl editorial-heading text-ink">Intelligence.</h1>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
             <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-primary-dark" /> Deep Performance Metrics</span>
             <span className="w-1 h-1 bg-gray-200 rounded-full" />
             <span className="text-ink">May 2026 Batch</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-ink transition-all">
             <Filter size={16} /> Parameters
           </button>
           <button className="flex items-center gap-2 px-8 py-4 bg-primary-dark text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-ink shadow-2xl shadow-primary-dark/20 transition-all active:scale-[0.98]">
             <Download size={16} /> Full Intelligence Report
           </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Productivity Trends */}
        <div className="lg:col-span-8 space-y-8">
           <div className="card-base p-10 rounded-[3rem] bg-white border border-gray-100 shadow-xl shadow-gray-100/30">
              <div className="flex items-center justify-between mb-12">
                 <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tight text-ink">Velocity Chronicle</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Work units completed per session</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-primary-dark" />
                       <span className="text-[10px] font-black uppercase text-gray-400">Output</span>
                    </div>
                 </div>
              </div>
              <ProductivityChart />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-base p-10 rounded-[3rem] bg-white border border-gray-100 shadow-xl shadow-gray-100/30">
                 <div className="space-y-1 mb-10">
                    <h3 className="text-xl font-black tracking-tight text-ink">Status Disparity</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Done vs Backlog comparison</p>
                 </div>
                 <ComparisonChart />
              </div>

              <div className="card-base p-10 rounded-[3rem] bg-white border border-gray-100 shadow-xl shadow-gray-100/30">
                 <div className="space-y-1 mb-10">
                    <h3 className="text-xl font-black tracking-tight text-ink">Talent Allocation</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Work distribution by department</p>
                 </div>
                 <DistributionChart />
              </div>
           </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-12">
           <div className="space-y-8">
              <h3 className="text-3xl font-bold tracking-tight text-ink italic">Tactical KPIs</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Success Variance', val: '98.2%', trend: 'up', change: '+2.4%' },
                   { label: 'Latency Error', val: '1.4%', trend: 'down', change: '-0.8%' },
                   { label: 'Member Saturation', val: '74%', trend: 'up', change: '+12%' },
                   { label: 'Revenue/Head', val: '$14.2k', trend: 'up', change: '+450' },
                 ].map((kpi, i) => (
                   <div key={i} className="card-base p-8 rounded-[2rem] bg-white border border-gray-100 group hover:border-primary-dark transition-all">
                      <div className="flex items-center justify-between">
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{kpi.label}</p>
                            <h4 className="text-4xl editorial-heading mt-2 text-ink tabular-nums italic group-hover:text-primary-dark transition-colors">{kpi.val}</h4>
                         </div>
                         <div className={cn(
                           "flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black",
                           kpi.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                         )}>
                            {kpi.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                            {kpi.change}
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="card-base p-10 rounded-[3rem] bg-ink text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-dark/20 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-8">
                 <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-primary-light">
                    <Target size={24} />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-2xl font-bold italic">Q2 Mission Target</h4>
                    <p className="text-sm text-white/50 leading-relaxed font-medium">You are currently 84% through the required cycles to hit the quarterly objectives.</p>
                 </div>
                 <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest opacity-60">
                       <span>Threshold Progress</span>
                       <span>84%</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden p-0.5">
                       <div className="h-full bg-primary-light rounded-full shadow-[0_0_12px_rgba(209,250,229,0.3)] transition-all duration-1000" style={{ width: '84%' }}></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
