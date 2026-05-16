import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { User, Mail, Calendar, Shield, BadgeCheck, Copy, Check, Info, Layout, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../utils/cn";
import { PROJECTS, TASKS } from "../../data/constants";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const completedTasks = TASKS.filter(t => t.status === 'Completed').length;
  const activeProjects = PROJECTS.filter(p => p.status !== 'Completed').length;

  const handleCopy = () => {
    navigator.clipboard.writeText(user.workspaceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="header space-y-2">
        <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight">Account Profile<span className="text-accent-primary">.</span></h1>
        <p className="text-sm text-text-secondary font-medium opacity-60">Manage your professional identity and workspace ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1 space-y-6">
          <div className="card-premium p-8 text-center space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-accent-primary/20 rounded-full blur-2xl" />
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="relative w-32 h-32 rounded-full border-2 border-white/10 shadow-glow mx-auto object-cover"
              />
              <div className="absolute bottom-1 right-1 w-8 h-8 bg-accent-primary rounded-xl flex items-center justify-center border-2 border-bg-card shadow-accent">
                <Shield className="text-bg-main w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-text-primary">{user.name}</h3>
              <p className="text-[10px] font-black uppercase text-accent-primary tracking-[0.2em] mt-1">{user.role} NODE</p>
            </div>
          </div>

          <div className="card-premium p-6 space-y-6">
             <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase text-text-secondary/40 tracking-widest border-b border-white/5 pb-2">Operational Status</h4>
                <div className="flex items-center space-x-3 text-accent-primary">
                   <BadgeCheck size={18} className="shadow-glow" />
                   <span className="text-xs font-bold uppercase tracking-wider">Verified Professional</span>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                   <p className="text-[9px] font-black text-text-secondary/40 uppercase tracking-widest">Active Units</p>
                   <div className="flex items-center gap-2">
                      <Layout size={14} className="text-text-primary/60" />
                      <span className="text-xl font-display font-black text-text-primary">{activeProjects}</span>
                   </div>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] font-black text-text-secondary/40 uppercase tracking-widest">Completed</p>
                   <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span className="text-xl font-display font-black text-text-primary">{completedTasks}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
           <div className="card-premium p-10 space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-text-secondary/50 uppercase tracking-widest">Full Legal Name</p>
                  <div className="flex items-center space-x-2 text-text-primary font-bold">
                    <User size={16} className="text-accent-primary/60" />
                    <span>{user.name}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-text-secondary/50 uppercase tracking-widest">Authored Email</p>
                  <div className="flex items-center space-x-2 text-text-primary font-bold">
                    <Mail size={16} className="text-accent-primary/60" />
                    <span>{user.email}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-text-secondary/50 uppercase tracking-widest">Member Since</p>
                  <div className="flex items-center space-x-2 text-text-primary font-bold">
                    <Calendar size={16} className="text-accent-primary/60" />
                    <span>{new Date(user.joinedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {/* Premium Workspace ID Card */}
                <div className="space-y-3">
                   <div className="flex items-center gap-2">
                     <p className="text-[10px] font-black text-text-secondary/50 uppercase tracking-widest">Workspace ID</p>
                     <div className="group relative">
                        <Info size={12} className="text-text-secondary/30 cursor-help hover:text-accent-primary transition-colors" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-bg-card border border-white/10 rounded-lg text-[9px] text-text-secondary font-bold uppercase tracking-widest text-center shadow-glow opacity-0 group-hover:opacity-100 pointer-events-none transition-all scale-95 group-hover:scale-100 z-50">
                           Unique identifier for your workspace
                        </div>
                     </div>
                   </div>
                   
                   <div className="relative group/id max-w-[240px]">
                      <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary/20 to-accent-soft/20 rounded-xl blur opacity-0 group-hover/id:opacity-100 transition duration-500" />
                      <div className="relative flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm group-hover/id:border-accent-primary/30 transition-colors">
                         <span className="text-text-primary font-mono text-sm font-bold tracking-wider">{user.workspaceId}</span>
                         <button 
                           onClick={handleCopy}
                           className="p-1.5 hover:bg-white/5 rounded-lg text-text-secondary hover:text-accent-primary transition-all active:scale-90"
                         >
                            {copied ? <Check size={14} className="text-accent-primary" /> : <Copy size={14} />}
                         </button>
                      </div>
                      
                      <AnimatePresence>
                        {copied && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, x: '-50%' }}
                            animate={{ opacity: 1, y: 0, x: '-50%' }}
                            exit={{ opacity: 0, y: -10, x: '-50%' }}
                            className="absolute top-[-40px] left-1/2 bg-accent-primary text-bg-main px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-accent whitespace-nowrap"
                          >
                            Workspace ID Copied
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex justify-end gap-4 text-sm font-medium">
                <button className="btn-secondary px-6 py-2.5 text-xs tracking-widest">Export Dataset</button>
                <button className="btn-primary px-6 py-2.5 text-xs tracking-widest">Update Identity</button>
              </div>
           </div>

           <div className="card-premium bg-gradient-to-br from-bg-card to-bg-main p-8 border border-accent-primary/10 flex items-center justify-between relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-accent-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 space-y-1">
                <h4 className="font-display font-bold text-text-primary">Ecosystem Security</h4>
                <p className="text-xs text-text-secondary opacity-60">Two-factor biometric authentication active.</p>
              </div>
              <button className="btn-secondary px-5 py-2.5 text-[10px] font-black tracking-widest relative z-10">Protocols</button>
           </div>
        </div>
      </div>
    </div>
  );
}
