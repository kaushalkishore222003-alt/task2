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
    Urgent: "bg-red-100 text-red-700 border-red-200",
    High: "bg-orange-50 text-orange-700 border-orange-100",
    Medium: "bg-blue-50 text-blue-700 border-blue-100",
    Low: "bg-gray-50 text-gray-500 border-gray-100"
  };
  return (
    <span className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border", colors[priority])}>
      {priority}
    </span>
  );
};

export const TaskStatusBadge = ({ status }: { status: Task['status'] }) => {
  const colors = {
    Todo: "bg-gray-50 text-gray-400 border-gray-100",
    "In Progress": "bg-primary-light text-primary-dark border-primary-light",
    Review: "bg-amber-50 text-amber-600 border-amber-100",
    Blocked: "bg-red-50 text-red-500 border-red-100",
    Completed: "bg-emerald-50 text-emerald-600 border-emerald-100"
  };
  return (
    <span className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border", colors[status])}>
      {status}
    </span>
  );
};
