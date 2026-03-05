import React from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Cpu, Award } from 'lucide-react';
import { Week } from '../lib/taskData';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TrackerProps {
    weeks: Week[];
    onToggleDay: (weekId: number, dayId: number) => void;
    onToggleWeek: (weekId: number) => void;
}

export const Tracker: React.FC<TrackerProps> = ({ weeks, onToggleDay, onToggleWeek }) => {
    const [expandedWeek, setExpandedWeek] = React.useState<number | null>(weeks.find(w => !w.completed)?.id || 1);

    return (
        <div className="space-y-4 max-w-4xl mx-auto pb-20">
            {weeks.map((week) => {
                const isCompleted = week.days.every(d => d.completed);
                const completedDays = week.days.filter(d => d.completed).length;
                const isExpanded = expandedWeek === week.id;

                return (
                    <div
                        key={week.id}
                        className={cn(
                            "group overflow-hidden rounded-2xl transition-all duration-300",
                            isExpanded ? "glass ring-1 ring-white/20 shadow-2xl" : "bg-slate-800/40 border border-white/5 hover:bg-slate-800/60"
                        )}
                    >
                        {/* Week Header */}
                        <div
                            className="p-5 flex items-center justify-between cursor-pointer"
                            onClick={() => setExpandedWeek(isExpanded ? null : week.id)}
                        >
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleWeek(week.id);
                                    }}
                                    className="transition-transform active:scale-90"
                                >
                                    {isCompleted ? (
                                        <CheckCircle2 className="w-8 h-8 text-green-400 fill-green-400/10" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-slate-500">
                                            {completedDays}/7
                                        </div>
                                    )}
                                </button>
                                <div>
                                    <h3 className={cn(
                                        "text-lg font-bold transition-colors",
                                        isCompleted ? "text-slate-400 line-through decoration-green-500/50" : "text-white"
                                    )}>
                                        Week {week.id}: {week.title}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                        <span className="flex items-center gap-1"><Award className="w-3 h-3" /> {week.deliverable}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex flex-wrap gap-1 justify-end max-w-[200px]">
                                    {week.technologies.slice(0, 3).map(tech => (
                                        <span key={tech} className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-medium border border-blue-500/20">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                {isExpanded ? <ChevronUp className="text-slate-500" /> : <ChevronDown className="text-slate-500" />}
                            </div>
                        </div>

                        {/* Week Content */}
                        {isExpanded && (
                            <div className="px-5 pb-5 pt-0 border-t border-white/5 bg-black/10">
                                <div className="py-4">
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 italic">
                                        {week.description}
                                    </p>

                                    <div className="space-y-2">
                                        {week.days.map((day) => (
                                            <div
                                                key={day.id}
                                                onClick={() => onToggleDay(week.id, day.id)}
                                                className={cn(
                                                    "flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all border border-transparent",
                                                    day.completed ? "bg-green-500/5 border-green-500/10" : "hover:bg-white/5 hover:border-white/10"
                                                )}
                                            >
                                                {day.completed ? (
                                                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                                                ) : (
                                                    <Circle className="w-5 h-5 text-slate-600 shrink-0" />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <span className={cn(
                                                        "text-sm block transition-all",
                                                        day.completed ? "text-slate-500 line-through" : "text-slate-200"
                                                    )}>
                                                        <span className="font-bold mr-2 text-xs opacity-50">{day.label}</span>
                                                        {day.description}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-3">
                                        <Cpu className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Stack Acquired</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {week.technologies.map(tech => (
                                                    <span key={tech} className="text-xs text-slate-300 px-2 py-1 bg-white/5 rounded-md border border-white/5">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
