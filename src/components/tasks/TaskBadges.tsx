import { motion } from "motion/react";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  MoreHorizontal, 
  Search, 
  Filter, 
  Plus,
  Calendar,
  MessageSquare,
  Paperclip,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface Task {
  id: number;
  title: string;
  project: string;
  priority: 'High' | 'Medium' | 'Low' | 'Urgent';
  status: 'Todo' | 'In Progress' | 'Review' | 'Blocked' | 'Completed';
  assignee: string;
  date: string;
  progress: number;
}

export const TaskPriorityBadge = ({ priority }: { priority: Task['priority'] }) => {
  const colors = {
    Urgent: "bg-red-500/10 text-red-400 border-red-500/20",
    High: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Medium: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Low: "bg-white/5 text-text-secondary border-white/10"
  };
  return (
    <span className={cn("px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-[0.1em] border transition-colors", colors[priority])}>
      {priority}
    </span>
  );
};

export const TaskStatusBadge = ({ status }: { status: Task['status'] }) => {
  const colors = {
    Todo: "bg-white/5 text-text-secondary/60 border-white/10",
    "In Progress": "bg-accent-soft text-accent-primary border-accent-primary/20",
    Review: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Blocked: "bg-red-500/10 text-red-500 border-red-500/20",
    Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  };
  return (
    <span className={cn("px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-[0.1em] border transition-colors", colors[status])}>
      {status}
    </span>
  );
};
