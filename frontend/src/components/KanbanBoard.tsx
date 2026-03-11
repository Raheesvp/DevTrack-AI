import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Task, TaskStatus } from '../lib/taskData';
import { MoreHorizontal, Plus, Clock, MessageSquare } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface KanbanBoardProps {
    tasks: Task[];
    onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
}

const COLUMNS: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'Todo', label: 'To Do', color: 'bg-slate-500/10 text-slate-400' },
    { id: 'In Progress', label: 'In Progress', color: 'bg-blue-500/10 text-blue-400' },
    { id: 'Review', label: 'Review', color: 'bg-purple-500/10 text-purple-400' },
    { id: 'Done', label: 'Done', color: 'bg-green-500/10 text-green-400' },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskMove }) => {
    const onDragEnd = (result: DropResult) => {
        const { destination, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === result.source.droppableId) return;

        onTaskMove(draggableId, destination.droppableId as TaskStatus);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full overflow-x-auto pb-4">
                {COLUMNS.map((col) => (
                    <div key={col.id} className="flex flex-col min-w-[280px]">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <div className="flex items-center gap-2">
                                <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md", col.color)}>
                                    {col.label}
                                </span>
                                <span className="text-xs font-bold text-slate-500">
                                    {tasks.filter(t => t.status === col.id).length}
                                </span>
                            </div>
                            <button className="p-1 hover:bg-slate-100 rounded-md text-slate-500">
                                <Plus size={16} />
                            </button>
                        </div>

                        <Droppable droppableId={col.id}>
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={cn(
                                        "flex-1 space-y-4 p-2 rounded-2xl transition-colors min-h-[500px]",
                                        snapshot.isDraggingOver ? "bg-slate-100" : "bg-transparent"
                                    )}
                                >
                                    {tasks.filter(t => t.status === col.id).map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={cn(
                                                        "glass p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-grab active:cursor-grabbing",
                                                        snapshot.isDragging && "shadow-2xl shadow-blue-500/20 rotate-2 border-blue-500/30"
                                                    )}
                                                >
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex flex-wrap gap-1">
                                                            {task.tags.map(tag => (
                                                                <span key={tag} className="text-[8px] font-bold uppercase tracking-tighter bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <MoreHorizontal size={14} className="text-slate-600" />
                                                    </div>

                                                    <h4 className="text-sm font-bold text-slate-900 mb-2 leading-tight">
                                                        {task.title}
                                                    </h4>

                                                    <p className="text-[10px] text-slate-500 line-clamp-2 mb-4 font-medium">
                                                        {task.description}
                                                    </p>

                                                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                                                        <div className="flex items-center gap-3 text-slate-600">
                                                            <div className="flex items-center gap-1">
                                                                <Clock size={10} />
                                                                <span className="text-[9px] font-bold">4h</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <MessageSquare size={10} />
                                                                <span className="text-[9px] font-bold">2</span>
                                                            </div>
                                                        </div>
                                                        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-slate-700 to-slate-800 border border-white/10 p-0.5">
                                                            <img src={`https://ui-avatars.com/api/?name=${task.assignee || 'User'}&background=transparent&color=fff&size=32`} className="w-full h-full rounded-md" alt="user" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
};
