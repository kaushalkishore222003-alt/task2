import { useState } from 'react';
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreHorizontal, Plus, Clock, MessageSquare, Paperclip, GripVertical } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Task {
  id: string;
  content: string;
  priority: 'High' | 'Medium' | 'Low';
  comments: number;
  files: number;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const INITIAL_DATA: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: 'task-1', content: 'Define Q3 typography system', priority: 'High', comments: 4, files: 2 },
      { id: 'task-2', content: 'Market research for expansion', priority: 'Low', comments: 0, files: 1 },
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      { id: 'task-3', content: 'Refactor core API authentication', priority: 'High', comments: 12, files: 5 },
    ]
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      { id: 'task-4', content: 'Social media asset pack v2', priority: 'Medium', comments: 8, files: 14 },
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: 'task-5', content: 'Brand guidelines documentation', priority: 'Medium', comments: 2, files: 1 },
    ]
  }
];

function SortableTaskCard({ task, color }: { task: Task; color: string; key?: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "card-base p-4 rounded-2xl bg-white hover:border-primary-dark/20 transition-all cursor-default group border shadow-sm",
        isDragging && "opacity-50 ring-2 ring-primary-dark/10 shadow-2xl scale-105 z-50 border-primary-dark/40"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-1 h-8 rounded-full", color)} />
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 text-gray-200 hover:text-gray-400">
           <GripVertical size={16} />
        </div>
      </div>
      
      <p className="text-sm font-bold text-ink mb-6 line-clamp-2 italic">{task.content}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-1 text-[9px] font-black uppercase text-gray-300">
             <MessageSquare size={12} /> {task.comments}
           </div>
           <div className="flex items-center gap-1 text-[9px] font-black uppercase text-gray-300">
             <Paperclip size={12} /> {task.files}
           </div>
        </div>
        <div className={cn(
          "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest",
          task.priority === 'High' ? "bg-red-50 text-red-500" :
          task.priority === 'Medium' ? "bg-amber-50 text-amber-500" : "bg-emerald-50 text-emerald-500"
        )}>
          {task.priority}
        </div>
      </div>
    </div>
  );
}

export default function KanbanPage() {
  const [columns, setColumns] = useState<Column[]>(INITIAL_DATA);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStart = (event: any) => {
    const { active } = event;
    const task = columns.flatMap(c => c.tasks).find(t => t.id === active.id);
    setActiveTask(task || null);
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeColumn = columns.find(c => c.tasks.some(t => t.id === activeId));
    const overColumn = columns.find(c => c.id === overId || c.tasks.some(t => t.id === overId));

    if (!activeColumn || !overColumn) return;

    if (activeColumn.id !== overColumn.id) {
      setColumns(prev => {
        const newCols = [...prev];
        const activeTaskIdx = activeColumn.tasks.findIndex(t => t.id === activeId);
        const task = activeColumn.tasks[activeTaskIdx];
        
        // Remove from source
        const sourceColIdx = newCols.findIndex(c => c.id === activeColumn.id);
        newCols[sourceColIdx].tasks = activeColumn.tasks.filter(t => t.id !== activeId);
        
        // Add to target
        const targetColIdx = newCols.findIndex(c => c.id === overColumn.id);
        newCols[targetColIdx].tasks = [...overColumn.tasks, task];
        
        return newCols;
      });
    } else {
      const activeIdx = activeColumn.tasks.findIndex(t => t.id === activeId);
      const overIdx = activeColumn.tasks.findIndex(t => t.id === overId);
      
      if (activeIdx !== overIdx) {
        setColumns(prev => {
          const newCols = [...prev];
          const colIdx = newCols.findIndex(c => c.id === activeColumn.id);
          newCols[colIdx].tasks = arrayMove(activeColumn.tasks, activeIdx, overIdx);
          return newCols;
        });
      }
    }
    setActiveTask(null);
  };

  return (
    <div className="h-full flex flex-col space-y-10 min-h-[calc(100vh-10rem)]">
      <div className="flex items-end justify-between">
         <div className="space-y-4">
            <h1 className="text-5xl editorial-heading text-ink">Kanban Board.</h1>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
               <Clock size={12} className="text-primary-dark" /> Optimized Workflow Management
            </p>
         </div>
         <div className="flex -space-x-3">
             {[1,2,3,4,5].map(i => (
               <img key={i} src={`https://i.pravatar.cc/100?img=${i+5}`} className="w-10 h-10 rounded-full border-4 border-white shadow-sm ring-1 ring-gray-100" />
             ))}
             <button className="w-10 h-10 rounded-full bg-primary-dark text-white border-4 border-white flex items-center justify-center text-xs font-black shadow-lg">
                +8
             </button>
         </div>
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide flex-1">
          {columns.map((column) => (
            <div key={column.id} className="flex-1 min-w-[320px] flex flex-col group/col">
              <div className="flex items-center justify-between mb-6 px-4">
                 <div className="flex items-center gap-3">
                    <h3 className="text-xs font-black uppercase tracking-widest text-ink group-hover/col:text-primary-dark transition-colors">{column.title}</h3>
                    <span className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-400 border border-gray-100 italic">
                      {column.tasks.length}
                    </span>
                 </div>
                 <button className="p-2 text-gray-200 hover:text-ink transition-colors">
                   <MoreHorizontal size={18} />
                 </button>
              </div>

              <div className="flex-1 bg-gray-50/50 rounded-[2.5rem] p-4 border border-dashed border-gray-100 space-y-4">
                <SortableContext items={column.tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                  {column.tasks.map((task) => (
                    <SortableTaskCard 
                      key={task.id} 
                      task={task} 
                      color={
                        column.id === 'todo' ? 'bg-gray-200' :
                        column.id === 'in-progress' ? 'bg-primary-dark' :
                        column.id === 'review' ? 'bg-amber-400' : 'bg-emerald-400'
                      } 
                    />
                  ))}
                </SortableContext>
                <button className="w-full py-4 rounded-2xl border border-dashed border-gray-200 text-gray-300 flex items-center justify-center gap-2 hover:bg-white hover:border-primary-dark/20 hover:text-primary-dark transition-all group/add">
                   <Plus size={16} className="group-hover/add:scale-110 transition-transform" />
                   <span className="text-[10px] font-black uppercase tracking-widest">New Unit</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}>
          {activeTask ? (
            <div className="card-base p-4 rounded-2xl bg-white border-primary-dark/40 shadow-2xl border scale-105">
               <p className="text-sm font-bold text-ink italic">{activeTask.content}</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
