import { motion } from "motion/react";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export const StatCard = ({ label, value, change, trend, icon: Icon, description, className }: StatCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("card-premium p-6 group hover:shadow-glow/5", className)}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-10 h-10 bg-white/[0.03] border border-white/5 rounded-xl flex items-center justify-center text-text-secondary group-hover:bg-accent-primary group-hover:text-bg-main transition-all duration-300">
          <Icon size={18} />
        </div>
        {change && (
          <div className={cn(
            "flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded-lg border",
            trend === "up" ? "bg-accent-soft text-accent-primary border-accent-primary/20" : "bg-red-500/10 text-red-400 border-red-500/20"
          )}>
            {trend === "up" ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {change}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">{label}</p>
        <h2 className="text-4xl font-display font-extrabold text-text-primary tabular-nums tracking-tight">{value}</h2>
        {description && <p className="text-[10px] text-text-secondary font-medium tracking-wide opacity-50">{description}</p>}
      </div>
    </motion.div>
  );
};
