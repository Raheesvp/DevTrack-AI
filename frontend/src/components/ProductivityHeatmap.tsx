import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import dayjs from 'dayjs';
import { Github, Zap } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface HeatmapData {
    date: string;
    count: number;
}

interface ProductivityHeatmapProps {
    data: HeatmapData[];
    onConnectGitHub?: () => void;
    isGitHubConnected?: boolean;
}

export const ProductivityHeatmap: React.FC<ProductivityHeatmapProps> = ({ data, onConnectGitHub, isGitHubConnected }) => {
    const today = dayjs().toDate();
    const threeMonthsAgo = dayjs().subtract(3, 'month').toDate();

    return (
        <div className="glass p-8 rounded-[40px] border border-white/5 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Productivity intensity</h3>
                <button
                    onClick={onConnectGitHub}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${isGitHubConnected ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'}`}
                >
                    <Github size={12} /> {isGitHubConnected ? 'Integrated' : 'Connect GitHub'}
                </button>
            </div>

            <div className="heatmap-container relative z-10">
                <CalendarHeatmap
                    startDate={threeMonthsAgo}
                    endDate={today}
                    values={data}
                    classForValue={(value: any) => {
                        if (!value || value.count === 0) return 'color-empty';
                        return `color-github-${Math.min(value.count, 4)}`;
                    }}
                    tooltipDataAttrs={(value: any): any => {
                        if (!value || !value.date) return {};
                        return {
                            'data-tooltip-id': 'heatmap-tooltip',
                            'data-tooltip-content': `${dayjs(value.date).format('MMM D')}: ${value.count} contributions`,
                        };
                    }}
                />
                <Tooltip
                    id="heatmap-tooltip"
                    className="!bg-[#121A2E] !text-white !p-2 !rounded-lg !text-[10px] !font-bold !border !border-white/10 !shadow-2xl z-[100]"
                />
            </div>

            <style>{`
                .heatmap-container .react-calendar-heatmap rect {
                    rx: 2;
                    ry: 2;
                    transition: fill 0.3s ease;
                }
                .heatmap-container .react-calendar-heatmap .color-empty {
                    fill: rgba(255, 255, 255, 0.02);
                }
                .heatmap-container .react-calendar-heatmap .color-github-1 { fill: #1e3a8a; }
                .heatmap-container .react-calendar-heatmap .color-github-2 { fill: #1d4ed8; }
                .heatmap-container .react-calendar-heatmap .color-github-3 { fill: #3b82f6; }
                .heatmap-container .react-calendar-heatmap .color-github-4 { fill: #60a5fa; }
            `}</style>

            <div className="flex items-center justify-between mt-8 relative z-10">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-slate-600 uppercase">Less</span>
                    <div className="flex gap-1.5">
                        {[0, 1, 2, 3, 4].map(i => (
                            <div key={i} className={`w-3 h-3 rounded-sm ${i === 0 ? 'bg-white/5' : `color-github-${i}`}`}
                                style={{ backgroundColor: i === 0 ? undefined : i === 1 ? '#1e3a8a' : i === 2 ? '#1d4ed8' : i === 3 ? '#3b82f6' : '#60a5fa' }} />
                        ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase">More</span>
                </div>

                {isGitHubConnected && (
                    <div className="flex items-center gap-2 text-[9px] font-black text-green-500 uppercase tracking-widest animate-pulse">
                        <Zap size={10} fill="currentColor" /> Live Push Data Syncing
                    </div>
                )}
            </div>

            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -mr-32 -mt-32 rounded-full pointer-events-none" />
        </div>
    );
};
