import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';

interface Milestone {
    id: number;
    title: string;
    date: string;
    completed: boolean;
}

interface TimelineProps {
    milestones: Milestone[];
}

export const Timeline: React.FC<TimelineProps> = ({ milestones }) => {
    return (
        <div className="glass p-6 rounded-3xl border border-white/5">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Project Milestones</h3>

            <div className="relative space-y-8">
                {/* Vertical Line */}
                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-white/5" />

                {milestones.map((ms) => (
                    <div key={ms.id} className="relative flex items-start gap-4 pl-1">
                        <div className={`mt-1.5 w-4 h-4 rounded-full border-2 z-10 ${ms.completed ? 'bg-green-500 border-green-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-900 border-slate-700'
                            }`}>
                            {ms.completed && <CheckCircle2 className="w-3 h-3 text-white absolute -top-0.5 -left-0.5" />}
                        </div>

                        <div className="flex-1">
                            <h4 className={`text-sm font-bold ${ms.completed ? 'text-white' : 'text-slate-500'}`}>
                                {ms.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-[10px] font-bold text-slate-600 uppercase">
                                <Calendar size={10} />
                                {ms.date}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
