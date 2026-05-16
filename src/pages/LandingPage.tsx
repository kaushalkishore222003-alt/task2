import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Users, BarChart3, Zap } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { cn } from "../utils/cn";

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="bg-white overflow-hidden selection:bg-primary-light">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between h-24 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-dark rounded-lg flex items-center justify-center">
                 <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
              </div>
              <span className="text-2xl font-bold text-primary-dark tracking-tighter">Syncro.</span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#features" className="text-gray-500 hover:text-ink font-bold text-sm uppercase tracking-widest transition-colors">Features</a>
              <a href="#pricing" className="text-gray-500 hover:text-ink font-bold text-sm uppercase tracking-widest transition-colors">Pricing</a>
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-primary-dark text-white px-8 py-3.5 rounded-full font-bold hover:bg-ink transition-all shadow-xl shadow-primary-dark/10 active:scale-95"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/auth/login" className="text-gray-500 hover:text-ink font-bold text-sm uppercase tracking-widest transition-colors">Login</Link>
                  <Link
                    to="/auth/signup"
                    className="bg-primary-dark text-white px-8 py-3.5 rounded-full font-bold hover:bg-ink transition-all shadow-xl shadow-primary-dark/10 active:scale-95"
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
      <section className="pt-40 pb-20 lg:pt-56 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-9xl editorial-heading text-ink mb-10"
          >
            Efficiency <span className="text-gray-200">meets</span> Elegance.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            The all-in-one workspace for teams who value precision. Scale your operations with an interface that feels like high-end print.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8"
          >
            <Link
              to="/auth/signup"
              className="px-10 py-5 bg-primary-dark text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all shadow-xl flex items-center justify-center group uppercase tracking-widest"
            >
              Get Started <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-10 py-5 bg-white border border-gray-100 text-ink rounded-full font-bold text-lg hover:border-ink transition-all uppercase tracking-widest">
              The Manifesto
            </button>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: "Active Users", value: "2M+" },
            { label: "Projects Managed", value: "450k" },
            { label: "Uptime Support", value: "99.9%" },
            { label: "Customer Rating", value: "4.9/5" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl lg:text-6xl font-black text-ink mb-2 tabular-nums">{stat.value}</p>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Detail */}
       <section id="features" className="py-32 bg-gray-50/50 px-6 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl lg:text-7xl editorial-heading text-ink mb-6 italic">Built for the <br/> relentless.</h2>
            <p className="text-gray-500 max-w-sm font-medium">Every tool you need to maintain momentum, styled for clarity and focus.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Fluid Kanban", icon: Zap, desc: "Visual states that move with your team's velocity." },
              { title: "Member Sync", icon: Users, desc: "Collaborative tools that respect the individual focus." },
              { title: "Deep Insights", icon: BarChart3, desc: "Reporting that uncovers the hidden friction in your process." }
            ].map((f, i) => (
              <div key={i} className="group p-10 bg-white rounded-[2.5rem] border border-gray-100 hover:border-primary-dark/20 transition-all hover:shadow-2xl hover:shadow-primary-dark/5">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary-dark group-hover:text-white transition-all">
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight text-ink">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-7xl editorial-heading text-ink mb-6">Investment in <span className="text-gray-200 uppercase text-3xl font-sans not-italic font-black tracking-widest">Focus</span>.</h2>
            <p className="text-gray-500 font-medium">Clear plans for teams of every scale.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Editorial", price: "$0", desc: "For solo craftsmen.", features: ["3 Active Projects", "Unlimited Tasks", "Basic Analytics"] },
              { name: "Vanguard", price: "$12", desc: "For high-octane teams.", features: ["30 Active Projects", "Priority Support", "Advanced Analytics", "Custom Workflow"], popular: true },
              { name: "Archive", price: "$49", desc: "For large institutions.", features: ["Unlimited Projects", "Dedicated Manager", "Enterprise Security", "SSO & SAML"] },
            ].map((plan, i) => (
              <div key={i} className={cn(
                "p-10 rounded-[3rem] border transition-all relative",
                plan.popular ? "bg-primary-dark text-white border-primary-dark shadow-2xl scale-105 z-10" : "bg-white border-gray-100 text-ink"
              )}>
                {plan.popular && (
                  <span className="absolute top-0 right-10 -translate-y-1/2 bg-white text-primary-dark px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Best Value</span>
                )}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-2 uppercase tracking-tighter">{plan.name}</h3>
                  <p className={cn("text-xs font-medium uppercase tracking-widest", plan.popular ? "text-primary-light" : "text-gray-400")}>{plan.desc}</p>
                </div>
                <div className="mb-10">
                  <span className="text-6xl font-black">{plan.price}</span>
                  <span className={cn("text-xs font-bold uppercase ml-2", plan.popular ? "text-primary-light" : "text-gray-400")}>/ month</span>
                </div>
                <ul className="space-y-4 mb-12">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center space-x-3">
                      <CheckCircle className={cn("w-4 h-4", plan.popular ? "text-primary-light" : "text-primary-dark")} />
                      <span className="text-sm font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/auth/signup"
                  className={cn(
                    "w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs text-center block transition-all",
                    plan.popular ? "bg-white text-primary-dark hover:bg-primary-light" : "bg-primary-dark text-white hover:bg-ink"
                  )}
                >
                  Acquire Access
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 italic">
        <div className="max-w-7xl mx-auto bg-primary-dark rounded-[2.5rem] p-12 lg:p-24 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-display">Ready to align your team?</h2>
              <p className="text-primary-light text-xl mb-12 max-w-xl mx-auto">Join 50,000+ teams who are building the future with SyncroTask.</p>
              <Link to="/auth/signup" className="px-12 py-5 bg-white text-primary-dark rounded-full font-bold text-xl hover:scale-105 transition-transform inline-block">
                Get Started Now
              </Link>
            </div>
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 SyncroTask. Made for the builders.</p>
        </div>
      </footer>
    </div>
  );
}
