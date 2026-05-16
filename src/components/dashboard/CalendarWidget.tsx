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
    <div className="card-base p-8 rounded-[2.5rem] bg-ink text-white shadow-2xl relative overflow-hidden h-full">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-dark/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h4 className="text-xl font-bold italic">{format(currentMonth, 'MMMM yyyy')}</h4>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><ChevronLeft size={16} /></button>
            <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {dayLabels.map(label => (
            <div key={label} className="text-center text-[10px] font-black uppercase text-white/30 py-2">
              {label}
            </div>
          ))}
          {days.map((day, idx) => {
            const hasEvent = events.some(e => isSameDay(e.date, day));
            return (
              <div 
                key={idx} 
                className={cn(
                  "aspect-square flex flex-col items-center justify-center rounded-xl text-[11px] font-bold transition-all relative cursor-pointer",
                  !isSameMonth(day, monthStart) ? "text-white/10" : "text-white/80 hover:bg-white/5",
                  isSameDay(day, selectedDate) && "bg-primary-dark text-white shadow-lg shadow-primary-dark/50"
                )}
              >
                {format(day, 'd')}
                {hasEvent && !isSameDay(day, selectedDate) && (
                  <div className="absolute bottom-1.5 w-1 h-1 bg-primary-light rounded-full" />
                )}
              </div>
            );
          })}
        </div>

        <div className="space-y-4 pt-4 border-t border-white/10">
           <p className="text-[10px] font-black uppercase tracking-widest text-primary-light/40">Agenda for Today</p>
           <div className="space-y-3">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary-light shadow-[0_0_8px_rgba(209,250,229,0.5)]" />
                 <span className="text-xs font-bold">Release v2.0 Production</span>
                 <span className="text-[8px] font-black bg-white/10 px-2 py-0.5 rounded ml-auto">14:00</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
