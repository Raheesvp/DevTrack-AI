import React from 'react';
import { Task, DailyLog } from '../lib/taskData';
import { BookOpen, Calendar, Clock, Sparkles } from 'lucide-react';
import dayjs from 'dayjs';

interface NotesViewProps {
    tasks: Task[];
    logs: DailyLog[];
}

export const NotesView: React.FC<NotesViewProps> = ({ tasks, logs }) => {
    // Group logs by week
    const weeks = Array.from(new Set(tasks.map(t => t.weekNumber))).sort((a, b) => a - b);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter mb-2">Knowledge repository</h2>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Daily & Weekly Learning Insights</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Learning Stream */}
                <div className="lg:col-span-2 space-y-8">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Daily Logs</h3>
                    {logs.length > 0 ? (
                        logs.slice().reverse().map((log, i) => (
                            <div key={i} className="glass p-8 rounded-[32px] border border-slate-200 bg-white hover:bg-slate-50 transition-all">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-600/20 rounded-xl">
                                            <Calendar size={16} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-black text-slate-900 italic">{dayjs(log.date).format('MMMM D, YYYY')}</span>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Productivity: {log.productivityScore}/100</p>
                                        </div>
                                    </div>
                                    <Sparkles className="text-blue-500/40" size={20} />
                                </div>
                                <p className="text-slate-700 leading-relaxed font-medium italic">"{log.learned}"</p>
                                <div className="mt-6 pt-6 border-t border-slate-200 flex gap-2">
                                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest px-2 py-1 rounded bg-slate-100 border border-slate-200">Saved to Knowledge Base</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="glass p-20 rounded-[40px] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center opacity-60">
                            <BookOpen size={48} className="mb-4 text-slate-600" />
                            <h4 className="text-lg font-bold text-slate-900 uppercase italic">No learning entries found</h4>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Start logging your daily reflections in the dashboard.</p>
                        </div>
                    )}
                </div>

                {/* Weekly Summary Column */}
                <div className="lg:col-span-1 space-y-8">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Weekly Success</h3>
                    {weeks.map(week => {
                        const weekTasks = tasks.filter(t => t.weekNumber === week);
                        const completedCount = weekTasks.filter(t => t.status === 'Done').length;
                        return (
                            <div key={week} className="glass p-6 rounded-[32px] border border-slate-200 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Clock size={64} />
                                </div>
                                <h4 className="text-xs font-black text-blue-500 uppercase tracking-widest mb-4">Week {week} Progress</h4>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="text-3xl font-black text-slate-900 italic tabular-nums">{completedCount}/{weekTasks.length}</div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase leading-tight">Tasks<br />Executed</div>
                                </div>
                                <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${(completedCount / weekTasks.length) * 100}%` }} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
