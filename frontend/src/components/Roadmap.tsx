import React from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Clock, Tag } from 'lucide-react';
import { Task } from '../lib/taskData';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface RoadmapProps {
    tasks: Task[];
    onToggleTask: (taskId: string) => void;
}

export const Roadmap: React.FC<RoadmapProps> = ({ tasks, onToggleTask }) => {
    const weeks = Array.from(new Set(tasks.map(t => t.weekNumber))).sort((a, b) => a - b);
    const [expandedWeeks, setExpandedWeeks] = React.useState<number[]>(weeks);

    const toggleWeek = (week: number) => {
        setExpandedWeeks(prev =>
            prev.includes(week) ? prev.filter(w => w !== week) : [...prev, week]
        );
    };

    return (
        <div className="space-y-6">
            {weeks.map((week) => {
                const weekTasks = tasks.filter(t => t.weekNumber === week);
                const isCompleted = weekTasks.every(t => t.status === 'Done');
                const completedCount = weekTasks.filter(t => t.status === 'Done').length;
                const isExpanded = expandedWeeks.includes(week);

                return (
                    <div
                        key={week}
                        className={cn(
                            "group overflow-hidden rounded-[32px] transition-all duration-300",
                            isExpanded ? "glass ring-1 ring-white/10 shadow-2xl" : "bg-white/[0.02] border border-white/5 hover:bg-white/[0.05]"
                        )}
                    >
                        {/* Week Header */}
                        <div
                            className="p-6 flex items-center justify-between cursor-pointer"
                            onClick={() => toggleWeek(week)}
                        >
                            <div className="flex items-center gap-6">
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all",
                                    isCompleted ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                                )}>
                                    {completedCount}/{weekTasks.length}
                                </div>
                                <div>
                                    <h3 className={cn(
                                        "text-lg font-black italic tracking-tighter uppercase leading-none mb-1",
                                        isCompleted ? "text-slate-500 line-through" : "text-white"
                                    )}>
                                        Phase {week}: Execution Sprint
                                    </h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                        {weekTasks.length} Deliverables scheduled
                                    </p>
                                </div>
                            </div>
                            {isExpanded ? <ChevronUp className="text-slate-600" /> : <ChevronDown className="text-slate-600" />}
                        </div>

                        {/* Week Content */}
                        {isExpanded && (
                            <div className="px-6 pb-6 pt-0 border-t border-white/5 animate-in slide-in-from-top-2 duration-300">
                                <div className="space-y-3 mt-6">
                                    {weekTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onToggleTask(task.id);
                                            }}
                                            className={cn(
                                                "flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border",
                                                task.status === 'Done' ? "bg-green-500/5 border-green-500/10" : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/5"
                                            )}
                                        >
                                            <div className="flex items-center gap-4 min-w-0">
                                                {task.status === 'Done' ? (
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                                ) : (
                                                    <Circle className="w-5 h-5 text-slate-700 shrink-0" />
                                                )}
                                                <div className="min-w-0">
                                                    <span className={cn(
                                                        "text-sm font-bold block truncate",
                                                        task.status === 'Done' ? "text-slate-500 line-through" : "text-slate-200"
                                                    )}>
                                                        {task.title}
                                                    </span>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1">
                                                            <Tag size={10} /> {task.priority}
                                                        </span>
                                                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1">
                                                            <Clock size={10} /> {task.estimatedHours}h
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-1">
                                                {task.tags.map(tag => (
                                                    <span key={tag} className="px-2 py-0.5 rounded-lg bg-white/5 text-[8px] font-bold text-slate-500 uppercase border border-white/5">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
