import React from 'react';
import { Task } from '../lib/taskData';
import { Calendar, Clock, CheckCircle2, Circle } from 'lucide-react';

interface ScheduleProps {
    tasks: Task[];
}

export const Schedule: React.FC<ScheduleProps> = ({ tasks }) => {
    // Group tasks by week
    const weeks = Array.from(new Set(tasks.map(t => t.weekNumber))).sort((a, b) => a - b);

    return (
        <div className="glass p-8 rounded-[40px] border border-slate-200 relative overflow-hidden h-full flex flex-col">
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Project Roadmap</h3>
                    <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">Execution Schedule</h2>
                </div>
                <div className="bg-slate-100 p-2 rounded-xl">
                    <Calendar size={18} className="text-blue-500" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-10 custom-scrollbar relative z-10">
                {weeks.map(week => {
                    const weekTasks = tasks.filter(t => t.weekNumber === week);

                    return (
                        <div key={week} className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest whitespace-nowrap">Week {week} Strategy</span>
                                <div className="h-px w-full bg-gradient-to-r from-blue-500/30 to-transparent" />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {weekTasks.map((task, idx) => (
                                    <div key={task.id} className="group relative pl-6 border-l border-slate-200 hover:border-blue-500/50 transition-colors py-2">
                                        <div className="absolute left-[-5px] top-4 w-2 h-2 rounded-full bg-slate-600 border border-slate-300 group-hover:bg-blue-500 group-hover:border-blue-400 transition-all" />

                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Day {((week - 1) * 7) + idx + 1}</span>
                                                    {task.status === 'Done' ? (
                                                        <CheckCircle2 size={12} className="text-green-500" />
                                                    ) : (
                                                        <Circle size={12} className="text-slate-700" />
                                                    )}
                                                </div>
                                                <h4 className={`text-sm font-bold ${task.status === 'Done' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                                                    {task.title}
                                                </h4>
                                                <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[280px]">
                                                    {task.status === 'Done' ? 'Successfully completed and logged.' : 'Identify constraints and execute primary objectives.'}
                                                </p>
                                            </div>

                                            <div className="flex flex-col items-end gap-1">
                                                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${task.priority === 'High' ? 'bg-red-500/10 text-red-500' :
                                                        task.priority === 'Medium' ? 'bg-orange-500/10 text-orange-400' :
                                                            'bg-blue-500/10 text-blue-400'
                                                    }`}>
                                                    {task.priority}
                                                </span>
                                                <div className="flex items-center gap-1 text-[9px] font-bold text-slate-600">
                                                    <Clock size={10} /> {task.estimatedHours}h
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Background Accent */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-600/5 blur-[100px] -ml-32 -mb-32 rounded-full pointer-events-none" />
        </div>
    );
};
