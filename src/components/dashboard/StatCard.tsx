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
      animate={{ opacity: 1, y: 0 }}
      className={cn("card-base p-8 rounded-[2.5rem] bg-white group hover:shadow-2xl transition-all border border-gray-100", className)}
    >
      <div className="flex items-start justify-between mb-8">
        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-primary-dark group-hover:bg-primary-dark group-hover:text-white transition-all shadow-sm">
          <Icon size={20} />
        </div>
        {change && (
          <div className={cn(
            "flex items-center gap-1.5 text-[10px] font-black px-3 py-1 rounded-full",
            trend === "up" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
          )}>
            {trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {change}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
        <h2 className="text-5xl editorial-heading text-ink italic tabular-nums leading-none">{value}</h2>
        {description && <p className="text-[10px] text-gray-400 font-medium mt-2">{description}</p>}
      </div>
    </motion.div>
  );
};
