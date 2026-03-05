import React, { useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, LineChart, Line, Cell
} from 'recharts';
import { Week } from '../lib/taskData';

interface DashboardProps {
    weeks: Week[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl outline-none">
                <p className="text-white font-medium mb-1">{label}</p>
                <p className="text-blue-400 text-sm">
                    {payload[0].name}: {payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

export const ProgressDashboard: React.FC<DashboardProps> = ({ weeks }) => {
    const weeklyData = useMemo(() => {
        return weeks.map(w => ({
            name: `W${w.id}`,
            done: w.days.filter(d => d.completed).length,
            total: 7
        }));
    }, [weeks]);

    const dailyData = useMemo(() => {
        return weeks.flatMap(w => w.days).map(d => ({
            day: `D${d.id}`,
            val: d.completed ? 1 : 0
        }));
    }, [weeks]);

    const totalDone = useMemo(() => {
        return weeks.flatMap(w => w.days).filter(d => d.completed).length;
    }, [weeks]);

    const overallPct = Math.round((totalDone / 56) * 100);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <div className="relative w-40 h-40 mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="80"
                            cy="80"
                            r="74"
                            fill="transparent"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="12"
                        />
                        <circle
                            cx="80"
                            cy="80"
                            r="74"
                            fill="transparent"
                            stroke="url(#gradient)"
                            strokeWidth="12"
                            strokeDasharray={465}
                            strokeDashoffset={465 - (465 * overallPct) / 100}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#22c55e" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-white">{overallPct}%</span>
                        <span className="text-xs text-slate-400 uppercase tracking-widest">Progress</span>
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-white">Overall Speed</h2>
                <p className="text-slate-400 text-sm mt-1">{totalDone} of 56 days crushed</p>
            </div>

            <div className="space-y-6">
                <div className="glass p-6 rounded-2xl h-64">
                    <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Weekly Velocity</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <BarChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <YAxis domain={[0, 7]} hide />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="done" radius={[4, 4, 0, 0]}>
                                {weeklyData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.done === 7 ? '#22c55e' : '#3b82f6'} fillOpacity={0.8} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass p-6 rounded-2xl h-40">
                    <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">Timeline Pulse</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dailyData}>
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="stepAfter"
                                dataKey="val"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4, fill: '#22c55e', stroke: 'white' }}
                                animationDuration={1500}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
