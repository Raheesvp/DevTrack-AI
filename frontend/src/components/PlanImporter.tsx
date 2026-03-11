import React, { useState } from 'react';
import { X, Copy, Wand2, FileText } from 'lucide-react';
import { Task } from '../lib/taskData';

interface PlanImporterProps {
    onImport: (tasks: Task[], name: string) => void;
    onClose: () => void;
}

export const PlanImporter: React.FC<PlanImporterProps> = ({ onImport, onClose }) => {
    const [pastedText, setPastedText] = useState('');
    const [projectName, setProjectName] = useState('');

    const handleParse = () => {
        // Simple logic to extract tasks from bullet points or lines
        const lines = pastedText.split('\n').filter(line => line.trim().length > 0);
        const tasks: Task[] = lines.map((line, index) => {
            const cleanTitle = line.replace(/^[\s-•*0-9.]+\s*/, '').trim();
            return {
                id: `pasted-${Date.now()}-${index}`,
                title: cleanTitle,
                description: 'Imported from pasted plan.',
                status: 'Todo',
                priority: 'Medium',
                tags: ['Imported'],
                createdAt: new Date().toISOString(),
                weekNumber: Math.ceil((index + 1) / 5), // Assumes ~5 tasks per week
                estimatedHours: 4
            };
        });

        onImport(tasks, projectName || 'Imported Plan');
    };

    return (
        <div className="fixed inset-0 bg-[#0F172A]/95 backdrop-blur-3xl z-[200] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
            <div className="w-full max-w-2xl glass border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(31,41,55,0.5)]">
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Plan Importer</h2>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Import from Notion, Markdown, or GPT</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-slate-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-10 space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <label className="block">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Project Name</span>
                                <input
                                    type="text"
                                    placeholder="Enter name for this plan..."
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="w-full bg-[#1F2937]/50 border border-white/5 rounded-2xl p-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold"
                                />
                            </label>
                            <label className="block">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Paste Plan Content</span>
                                <textarea
                                    rows={8}
                                    placeholder="Paste your bullet points, Notion table content, or Markdown here..."
                                    value={pastedText}
                                    onChange={(e) => setPastedText(e.target.value)}
                                    className="w-full bg-[#1F2937]/50 border border-white/5 rounded-2xl p-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold resize-none"
                                />
                            </label>
                        </div>
                        <button
                            onClick={handleParse}
                            disabled={!pastedText}
                            className="w-full bg-blue-600 text-white rounded-2xl py-5 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-600/20"
                        >
                            <Wand2 size={16} /> Parse into Tasks
                        </button>
                    </div>
                </div>

                <div className="p-8 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <FileText size={14} />
                            <span className="text-[10px] font-bold uppercase">Notion Ready</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Copy size={14} />
                            <span className="text-[10px] font-bold uppercase">Markdown Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
