import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  FilePieChart, 
  Clock, 
  CheckCircle2,
  Calendar,
  Layers,
  Search
} from 'lucide-react';
import { cn } from '../../utils/cn';

const REPORTS = [
  { id: 1, name: 'Quarterly Performance Audit - Q1', type: 'System Audit', date: 'Apr 02, 2026', size: '2.4 MB', icon: FileSpreadsheet, color: 'text-emerald-500 bg-emerald-50' },
  { id: 2, name: 'Talent Utilization Matrix', type: 'Workforce', date: 'May 10, 2026', size: '1.1 MB', icon: FilePieChart, color: 'text-primary-dark bg-primary-light' },
  { id: 3, name: 'Velocity Regression Analysis', type: 'Intelligence', date: 'May 12, 2026', size: '4.2 MB', icon: FileText, color: 'text-amber-500 bg-amber-50' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-5xl editorial-heading text-ink">Archive.</h1>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
             <span className="flex items-center gap-1.5"><FileText size={14} className="text-primary-dark" /> Document Registry</span>
             <span className="w-1 h-1 bg-gray-200 rounded-full" />
             <span className="text-ink">128 Documents Protected</span>
          </div>
        </div>

        <button className="flex items-center gap-2 px-8 py-4 bg-primary-dark text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-ink shadow-2xl shadow-primary-dark/20 transition-all active:scale-[0.98]">
          <FileText size={16} /> Compile New Report
        </button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: 'Weekly Recap', desc: 'Detailed work unit summary', icon: Clock },
           { label: 'Monthly Audit', desc: 'Strategic objectives review', icon: Target },
           { label: 'Intelligence', desc: 'Performance variance deep-dive', icon: Zap },
         ].map((cat, i) => (
           <div key={i} className="card-base p-10 rounded-[3rem] bg-white border border-gray-100 group hover:border-primary-dark transition-all cursor-pointer">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-primary-dark group-hover:text-white transition-all mb-8">
                 <cat.icon size={24} />
              </div>
              <h3 className="text-2xl font-black text-ink">{cat.label}</h3>
              <p className="text-sm text-gray-400 font-medium mt-2">{cat.desc}</p>
           </div>
         ))}
      </div>

      {/* Reports List */}
      <div className="space-y-8">
         <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <h3 className="text-3xl font-bold tracking-tight text-ink italic">Recent Distributions</h3>
            <div className="relative w-72">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
               <input className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-[10px] font-black uppercase tracking-widest placeholder-gray-300 outline-none" placeholder="Search archive..." />
            </div>
         </div>

         <div className="grid gap-6">
            {REPORTS.map((report) => (
              <div key={report.id} className="card-base p-8 rounded-[2.5rem] bg-white flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:shadow-2xl transition-all">
                 <div className="flex items-center gap-6">
                    <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-transform group-hover:rotate-6", report.color)}>
                       <report.icon size={28} />
                    </div>
                    <div>
                       <h4 className="font-bold text-xl text-ink group-hover:text-primary-dark transition-colors">{report.name}</h4>
                       <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{report.type}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{report.size}</span>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-8">
                    <div className="text-right hidden md:block">
                       <p className="text-xs font-bold text-ink italic">{report.date}</p>
                       <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Released</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-ink hover:text-white transition-all">
                       <Download size={14} /> Download
                    </button>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}

// Simple placeholder for Target and Zap to avoid import issues if not explicitly passed
const Target = ({ size }: { size: number }) => <CheckCircle2 size={size} />;
const Zap = ({ size }: { size: number }) => <Layers size={size} />;
