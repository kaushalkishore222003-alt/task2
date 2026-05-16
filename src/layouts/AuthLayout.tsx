import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-bg-main flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-accent-primary/30">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-primary/3 rounded-full blur-[100px]" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-11 h-11 bg-accent-primary rounded-2xl flex items-center justify-center shadow-accent rotate-12 hover:rotate-0 transition-transform duration-500">
              <div className="w-6 h-6 bg-bg-main rounded-md rotate-45" />
            </div>
            <span className="text-3xl font-display font-bold text-text-primary tracking-tight">SyncroTask<span className="text-accent-primary">.</span></span>
          </div>
          <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.4em] opacity-40">Next-Gen Productivity Protocol</p>
        </motion.div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[480px] relative z-10 px-4 sm:px-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-bg-card/40 backdrop-blur-2xl border border-white/[0.08] rounded-[2.5rem] shadow-premium p-8 sm:p-12 overflow-hidden relative group"
        >
          {/* Subtle inner card glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <AnimatePresence mode="wait">
             <Outlet />
          </AnimatePresence>
        </motion.div>
        
        {/* Footer links */}
        <div className="mt-8 text-center space-x-6">
           <a href="#" className="text-[10px] font-black uppercase tracking-widest text-text-secondary/40 hover:text-accent-primary transition-colors">Documentation</a>
           <a href="#" className="text-[10px] font-black uppercase tracking-widest text-text-secondary/40 hover:text-accent-primary transition-colors">Privacy</a>
           <a href="#" className="text-[10px] font-black uppercase tracking-widest text-text-secondary/40 hover:text-accent-primary transition-colors">Status</a>
        </div>
      </div>
    </div>
  );
}
