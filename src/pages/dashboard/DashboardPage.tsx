export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-8 rounded-3xl bg-primary-dark text-white shadow-xl shadow-primary-dark/20 relative overflow-hidden group">
          <span className="text-[11px] font-bold uppercase tracking-widest opacity-60">Active Projects</span>
          <h2 className="text-6xl editorial-heading mt-2">12</h2>
          <div className="mt-6 flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-1 bg-white/20 rounded-full font-bold">↑ 4 this month</span>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
        </div>

        {[
          { label: 'Pending Tasks', value: '48', meta: '85% capacity reached' },
          { label: 'Completed', value: '124', meta: '↑ 12% vs last week', metaColor: 'text-emerald-600' },
          { label: 'Team Velocity', value: '92%', meta: 'Optimal range', progress: 92 },
        ].map((stat, i) => (
          <div key={i} className="card-base p-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</span>
            <h2 className="text-6xl editorial-heading mt-2 text-ink">{stat.value}</h2>
            {stat.progress ? (
               <div className="w-full bg-gray-100 h-1 mt-8 rounded-full overflow-hidden">
                 <div className="h-full bg-primary-dark rounded-full" style={{ width: `${stat.progress}%` }}></div>
               </div>
            ) : (
              <p className={cn("text-[11px] font-bold mt-6", stat.metaColor || "text-gray-400")}>{stat.meta}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold tracking-tight text-ink">Recent Projects</h3>
            <button className="text-sm font-bold text-primary-dark hover:underline underline-offset-4 decoration-2">View all projects</button>
          </div>
          
          <div className="grid gap-4">
            {[
              { name: 'Fintech Rebrand 2024', client: 'Eon Global', progress: 74, priority: 'High' },
              { name: 'Internal API Refactor', client: 'Systems Team', progress: 12, priority: 'Normal' },
              { name: 'Q3 Product Roadmap', client: 'Executive Board', progress: 100, priority: 'Completed' }
            ].map((project, i) => (
              <div key={i} className="card-base p-6 hover:border-primary-light hover:shadow-lg hover:shadow-primary-light/20 group">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className="font-bold text-lg text-ink group-hover:text-primary-dark transition-colors">{project.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Project Lead: {project.client}</p>
                  </div>
                  <span className={cn(
                    "px-3 py-1 text-[10px] font-bold uppercase rounded-full tracking-wider",
                    project.priority === 'High' ? "bg-primary-light text-primary-dark" : "bg-gray-100 text-gray-500"
                  )}>
                    {project.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 mb-2">
                  <span>Development Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-dark rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-bold tracking-tight text-ink">Productivity</h3>
          <div className="card-base p-10 flex flex-col items-center justify-center relative bg-gray-50/50">
             <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="96" cy="96" r="80" fill="transparent" stroke="#e5e7eb" strokeWidth="12" />
                  <circle 
                    cx="96" cy="96" r="80" fill="transparent" 
                    stroke="#064E3B" strokeWidth="12" 
                    strokeDasharray="502.4" strokeDashoffset="150" 
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl editorial-heading text-ink">74%</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Opt.</span>
                </div>
             </div>
             <div className="mt-10 w-full space-y-4">
               {[
                 { label: 'Design', val: '42%', dot: 'bg-primary-dark' },
                 { label: 'Engineering', val: '38%', dot: 'bg-accent' },
                 { label: 'Logistics', val: '20%', dot: 'bg-gray-300' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className={cn("w-2.5 h-2.5 rounded-full", item.dot)} />
                     <span className="text-xs font-bold text-gray-600 tracking-tight">{item.label}</span>
                   </div>
                   <span className="text-xs font-black text-ink">{item.val}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
