import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Users, BarChart3, Zap } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { cn } from "../utils/cn";

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="bg-bg-main text-text-primary overflow-hidden selection:bg-accent-primary/30 min-h-screen">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-accent-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-bg-main/70 backdrop-blur-xl z-50 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-accent-primary rounded-xl flex items-center justify-center shadow-accent">
                 <div className="w-5 h-5 bg-bg-main rounded-md rotate-45" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight">SyncroTask<span className="text-accent-primary">.</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#features" className="text-text-secondary hover:text-text-primary text-[10px] font-black uppercase tracking-[0.2em] transition-colors">Features</a>
              <a href="#pricing" className="text-text-secondary hover:text-text-primary text-[10px] font-black uppercase tracking-[0.2em] transition-colors">Pricing</a>
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="btn-primary px-8 py-2.5 text-xs tracking-widest"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/auth/login" className="text-text-secondary hover:text-text-primary text-[10px] font-black uppercase tracking-[0.2em] transition-colors">Login</Link>
                  <Link
                    to="/auth/signup"
                    className="btn-primary px-8 py-2.5 text-xs tracking-widest"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 lg:pt-56 lg:pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/10 rounded-full mb-8"
          >
             <span className="flex h-2 w-2 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
             </span>
             <span className="text-[10px] font-bold text-text-primary tracking-widest uppercase opacity-70">2.0 Release Now Available</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-8xl font-display font-bold text-text-primary mb-10 tracking-tight leading-[1.1]"
          >
            Efficiency meets <br/> <span className="text-accent-primary italic">pure elegance</span>.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed opacity-80"
          >
            The all-in-one workspace for teams who value precision. Scale your operations with an interface designed for the next generation of builders.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6"
          >
            <Link
              to="/auth/signup"
              className="btn-primary px-10 py-4 text-sm tracking-widest"
            >
              Start Building <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
            <button className="btn-secondary px-10 py-4 text-sm tracking-widest">
              View the Manifesto
            </button>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6 border-t border-white/[0.02] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary/40 mb-16">Trusted by the innovators at</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-12 text-center items-center">
            {[
              { label: "Active Nodes", value: "2M+" },
              { label: "Execution Cycles", value: "450k" },
              { label: "Uptime SLA", value: "99.9%" },
              { label: "Engine Rating", value: "4.9/5" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-4xl lg:text-5xl font-display font-black text-text-primary mb-2 tabular-nums">{stat.value}</p>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-secondary opacity-50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Detail */}
       <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
             <h2 className="text-3xl lg:text-6xl font-display font-bold text-text-primary mb-6 tracking-tight italic">Relentless performance.</h2>
             <p className="text-text-secondary max-w-md mx-auto text-sm opacity-60">Every tool you need to maintain momentum, styled for extreme clarity and focus.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Fluid Execution", icon: Zap, desc: "Visual states that move with your team's velocity. No friction, just flow." },
              { title: "Network Sync", icon: Users, desc: "Collaborative nodes that respect individual focus. True asynchronous harmony." },
              { title: "Neural Insights", icon: BarChart3, desc: "Reporting that uncovers deep friction points using historical intelligence." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium p-10 group hover:border-accent-primary/20 transition-all duration-500"
              >
                <div className="w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mb-8 text-text-secondary group-hover:bg-accent-primary group-hover:text-bg-main group-hover:shadow-accent transition-all duration-500">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 tracking-tight text-text-primary group-hover:text-accent-primary transition-colors">{f.title}</h3>
                <p className="text-text-secondary leading-relaxed text-xs opacity-70 font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-white/[0.01] border-y border-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl lg:text-6xl font-display font-bold text-text-primary mb-6 italic tracking-tight">Investment in Focus.</h2>
            <p className="text-text-secondary text-sm opacity-60">Scalable plans for engineering teams at any stage.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Editorial", price: "$0", desc: "For solo craftsmen.", features: ["3 Active Nodes", "Global Backlog", "Base Intelligence"] },
              { name: "Vanguard", price: "$12", desc: "For rapid-fire teams.", features: ["30 Active Nodes", "Priority Stream", "Full Intelligence", "Custom Protocols"], popular: true },
              { name: "Network", price: "$49", desc: "For enterprise scale.", features: ["Unlimited Nodes", "Protocol Manager", "Hardened Security", "Identity Access"] },
            ].map((plan, i) => (
              <div key={i} className={cn(
                "p-10 rounded-[2.5rem] border transition-all duration-500 relative flex flex-col h-full",
                plan.popular ? "bg-bg-card border-accent-primary/30 shadow-accent scale-[1.03] z-10" : "bg-bg-card/40 border-white/5 text-text-primary"
              )}>
                {plan.popular && (
                  <span className="absolute top-0 right-10 -translate-y-1/2 bg-accent-primary text-bg-main px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-accent">Most Efficient</span>
                )}
                <div className="mb-10">
                  <h3 className="text-xl font-display font-bold mb-2 uppercase tracking-tight">{plan.name}</h3>
                  <p className={cn("text-[10px] font-black uppercase tracking-[0.15em]", plan.popular ? "text-accent-primary" : "text-text-secondary/60")}>{plan.desc}</p>
                </div>
                <div className="mb-10">
                  <span className="text-5xl font-display font-black tracking-tight">{plan.price}</span>
                  <span className={cn("text-[10px] font-bold uppercase ml-2 opacity-50")}>/ operational month</span>
                </div>
                <ul className="space-y-4 mb-12 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center space-x-3 group/item">
                      <CheckCircle className={cn("w-4 h-4 transition-colors", plan.popular ? "text-accent-primary" : "text-text-secondary/40")} />
                      <span className="text-xs text-text-secondary opacity-80 group-hover/item:opacity-100 transition-opacity">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/auth/signup"
                  className={cn(
                    "w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] text-center block transition-all duration-300",
                    plan.popular ? "bg-accent-primary text-bg-main hover:opacity-90" : "bg-white/10 text-text-primary hover:bg-white/20"
                  )}
                >
                  Acquire License
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden bg-gradient-to-br from-bg-card to-bg-main border border-white/[0.05]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-display font-bold mb-8 tracking-tight">Ready to align your <span className="italic text-accent-primary">future</span>?</h2>
              <p className="text-text-secondary text-lg mb-12 max-w-xl mx-auto opacity-70">Join 50,000+ engineers building at peak velocity with SyncroTask.</p>
              <Link to="/auth/signup" className="btn-primary px-12 py-4 text-sm tracking-widest inline-flex group">
                Establish Connection <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-[0.3em] opacity-40">© 2026 SyncroTask Ecosystem. Built for builders.</p>
          <div className="flex items-center gap-6">
             <a href="#" className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary/40 hover:text-accent-primary transition-colors">Privacy</a>
             <a href="#" className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary/40 hover:text-accent-primary transition-colors">Nodes</a>
             <a href="#" className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary/40 hover:text-accent-primary transition-colors">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
