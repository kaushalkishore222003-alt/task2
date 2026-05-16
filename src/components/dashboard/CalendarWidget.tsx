import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval 
} from 'date-fns';
import { cn } from '../../utils/cn';

export const CalendarWidget = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const selectedDate = new Date(); // Mock today

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Mock events
  const events = [
    { date: new Date(), title: 'Release v2.0' },
    { date: addDays(new Date(), 2), title: 'Stakeholder Sync' }
  ];

  return (
    <div className="card-premium p-6 relative overflow-hidden h-full">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.05]">
          <h4 className="text-lg font-display font-bold text-text-primary">{format(currentMonth, 'MMMM yyyy')}</h4>
          <div className="flex gap-1">
            <button onClick={prevMonth} className="p-1.5 hover:bg-white/[0.05] rounded-lg transition-colors text-text-secondary"><ChevronLeft size={16} /></button>
            <button onClick={nextMonth} className="p-1.5 hover:bg-white/[0.05] rounded-lg transition-colors text-text-secondary"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {dayLabels.map(label => (
            <div key={label} className="text-center text-[10px] font-black uppercase text-text-secondary/40 py-2">
              {label}
            </div>
          ))}
          {days.map((day, idx) => {
            const hasEvent = events.some(e => isSameDay(e.date, day));
            const isToday = isSameDay(day, selectedDate);
            return (
              <div 
                key={idx} 
                className={cn(
                  "aspect-square flex flex-col items-center justify-center rounded-lg text-[11px] font-bold transition-all relative cursor-pointer",
                  !isSameMonth(day, monthStart) ? "text-text-secondary/10" : "text-text-primary/70 hover:bg-white/[0.05]",
                  isToday && "bg-accent-primary text-bg-main shadow-glow font-black"
                )}
              >
                {format(day, 'd')}
                {hasEvent && !isToday && (
                  <div className="absolute bottom-1.5 w-1 h-1 bg-accent-primary rounded-full shadow-[0_0_4px_rgba(16,185,129,0.5)]" />
                )}
              </div>
            );
          })}
        </div>

        <div className="space-y-4 pt-4 border-t border-white/[0.05]">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/40">Today's Agenda</p>
           <div className="space-y-1">
              <div className="flex items-center gap-3 p-2 hover:bg-white/[0.02] rounded-lg transition-colors group">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                 <span className="text-xs font-semibold text-text-primary/90 group-hover:text-accent-primary transition-colors">Release v2.0 Platform</span>
                 <span className="text-[8px] font-black border border-white/10 px-1.5 py-0.5 rounded text-text-secondary ml-auto">14:00</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
