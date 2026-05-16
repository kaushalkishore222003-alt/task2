import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Copy, Check, Shield, Globe, Lock, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});

  if (!user) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [id]: true });
    setTimeout(() => setCopied({ ...copied, [id]: false }), 2000);
  };

  const settingsSections = [
    {
      title: "Workspace Configuration",
      desc: "Identifier and organizational parameters for your node.",
      items: [
        { label: "Workspace ID", value: user.workspaceId, id: "ws-id", mono: true },
        { label: "Organization ID", value: `ORG-${user.workspaceId.split('-')[1]}`, id: "org-id", mono: true },
        { label: "Account Cluster", value: user.role === 'ADMIN' ? 'Tier-1 Admin' : 'Standard Node', id: "acc-type" },
      ]
    },
    {
      title: "Security Protocols",
      desc: "Encryption and access control settings.",
      items: [
        { label: "Encryption", value: "AES-256 GCM", id: "enc" },
        { label: "Auth Protocol", value: "Bio-Sync 2.0", id: "auth" },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="header space-y-2">
        <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight">System Settings<span className="text-accent-primary">.</span></h1>
        <p className="text-sm text-text-secondary font-medium opacity-60">Global configuration for your operational environment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-4">
           {["General", "Security", "Network", "Billing", "API Access"].map((tab) => (
             <button 
               key={tab}
               className="w-full text-left px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-white/[0.03] text-text-secondary hover:text-accent-primary flex items-center justify-between group"
             >
               {tab}
               <div className="w-1.5 h-1.5 rounded-full bg-accent-primary opacity-0 group-hover:opacity-100 transition-opacity shadow-accent" />
             </button>
           ))}
        </div>

        <div className="md:col-span-8 space-y-10">
           {settingsSections.map((section, idx) => (
             <div key={idx} className="space-y-6">
                <div className="space-y-1">
                   <h3 className="text-xl font-display font-bold text-text-primary">{section.title}</h3>
                   <p className="text-xs text-text-secondary opacity-50">{section.desc}</p>
                </div>

                <div className="card-premium divide-y divide-white/[0.03] overflow-hidden">
                   {section.items.map((item) => (
                     <div key={item.id} className="p-6 flex items-center justify-between group/item hover:bg-white/[0.01] transition-colors">
                        <div className="space-y-1">
                           <p className="text-[10px] font-black text-text-secondary/50 uppercase tracking-widest">{item.label}</p>
                           <p className={`text-sm text-text-primary font-bold ${item.mono ? 'font-mono tracking-wider' : ''}`}>
                             {item.value}
                           </p>
                        </div>
                        <div className="flex items-center gap-2">
                           <button 
                             onClick={() => handleCopy(item.value, item.id)}
                             className="p-2 hover:bg-white/[0.05] rounded-xl text-text-secondary hover:text-accent-primary transition-all relative"
                           >
                              {copied[item.id] ? <Check size={16} className="text-accent-primary" /> : <Copy size={16} />}
                              
                              <AnimatePresence>
                               {copied[item.id] && (
                                 <motion.div
                                   initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                   animate={{ opacity: 1, scale: 1, x: 0 }}
                                   exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                   className="absolute right-full mr-3 px-3 py-1 bg-accent-primary text-bg-main rounded-md text-[9px] font-black uppercase tracking-widest shadow-accent whitespace-nowrap pointer-events-none"
                                 >
                                   Copied
                                 </motion.div>
                               )}
                             </AnimatePresence>
                           </button>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           ))}

           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
             {[
               { label: "Privacy Status", val: "High", icon: Lock, color: "text-emerald-400" },
               { label: "Sync Latency", val: "12ms", icon: Globe, color: "text-blue-400" },
               { label: "Node Health", val: "Optimal", icon: Shield, color: "text-accent-primary" },
             ].map((m, i) => (
               <div key={i} className="card-premium p-6 flex flex-col items-center text-center space-y-4">
                  <div className={`p-3 bg-white/[0.03] rounded-xl ${m.color}`}>
                    <m.icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-text-secondary/40 uppercase tracking-widest">{m.label}</p>
                    <p className="text-sm font-bold text-text-primary">{m.val}</p>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}

