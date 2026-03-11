import React, { useState } from 'react';
import { Brain, Sparkles, Send, X, Star } from 'lucide-react';
import { DailyLog } from '../lib/taskData';
import dayjs from 'dayjs';

interface ReflectionLogProps {
    logs: DailyLog[];
    onSaveLog: (log: DailyLog) => void;
}

export const ReflectionLog: React.FC<ReflectionLogProps> = ({ logs, onSaveLog }) => {
    const [learnedText, setLearnedText] = useState('');
    const [score, setScore] = useState(80);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = () => {
        if (!learnedText.trim()) return;
        onSaveLog({
            date: dayjs().format('YYYY-MM-DD'),
            learned: learnedText,
            productivityScore: score
        });
        setLearnedText('');
        setIsOpen(false);
    };

    const todayLog = logs.find(l => l.date === dayjs().format('YYYY-MM-DD'));

    return (
        <div className="relative">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="glass w-full p-4 rounded-3xl border border-slate-200 flex items-center justify-between hover:border-blue-500/30 transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                            <Brain size={20} className="text-white" />
                        </div>
                        <div className="text-left">
                            <h4 className="text-sm font-black text-slate-900 uppercase italic">Daily Reflection</h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                {todayLog ? 'Already logged today' : 'What did you learn today?'}
                            </p>
                        </div>
                    </div>
                </button>
            ) : (
                <div className="glass p-6 rounded-[32px] border border-blue-500/20 space-y-4 animate-in slide-in-from-bottom-4 duration-300 shadow-2xl shadow-blue-500/10">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                            <Sparkles className="text-blue-400" size={16} />
                            <h4 className="text-sm font-black text-slate-900 uppercase italic">Knowledge Log</h4>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-slate-900 transition-colors">
                            <X size={16} />
                        </button>
                    </div>

                    <textarea
                        value={learnedText}
                        onChange={(e) => setLearnedText(e.target.value)}
                        placeholder="I mastered React DND today and fixed the API gateway..."
                        className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 resize-none"
                        rows={4}
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex-1 max-w-[140px]">
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Productivity Score: {score}</p>
                            <input
                                type="range"
                                min="0" max="100"
                                value={score}
                                onChange={(e) => setScore(parseInt(e.target.value))}
                                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Recent Reflections List */}
            <div className="mt-8 space-y-4">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Recent Knowledge</h5>
                {logs.slice(-3).reverse().map((log, i) => (
                    <div key={i} className="glass p-4 rounded-2xl border border-slate-200 bg-white">
                        <div className="flex justify-between mb-1">
                            <span className="text-[9px] font-bold text-blue-400 uppercase">{dayjs(log.date).format('MMM D, YYYY')}</span>
                            <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500">
                                <Star size={8} fill="currentColor" />
                                {log.productivityScore}
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-700 leading-relaxed italic line-clamp-2">"{log.learned}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
