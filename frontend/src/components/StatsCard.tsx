import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    trend?: string;
    trendType?: 'up' | 'down' | 'neutral';
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, trend, trendType = 'neutral' }) => {
    return (
        <div className="glass p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all group">
            <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                </div>
                {trend && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trendType === 'up' ? 'bg-green-500/10 text-green-400' :
                            trendType === 'down' ? 'bg-red-500/10 text-red-400' :
                                'bg-slate-500/10 text-slate-400'
                        }`}>
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
            </div>
        </div>
    );
};
