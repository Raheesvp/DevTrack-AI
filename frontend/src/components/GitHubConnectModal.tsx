import React, { useState } from 'react';
import { Github, ShieldCheck, Zap, X, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GitHubConnectModalProps {
    onClose: () => void;
    onConnect: () => void;
}

export const GitHubConnectModal: React.FC<GitHubConnectModalProps> = ({ onClose, onConnect }) => {
    const [step, setStep] = useState<'intro' | 'authorizing' | 'success'>('intro');

    const handleAuthorize = () => {
        setStep('authorizing');
        setTimeout(() => {
            setStep('success');
            setTimeout(() => {
                onConnect();
            }, 2000);
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#000]/80 backdrop-blur-xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-lg glass border border-white/10 rounded-[48px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
            >
                <div className="p-10">
                    <div className="flex justify-between items-start mb-10">
                        <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10">
                            <Github size={32} className="text-white" />
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                            <X size={20} className="text-slate-500" />
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 'intro' && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">Connect your<br />GitHub Account</h2>
                                <p className="text-slate-400 font-medium leading-relaxed">Sync your contribution activity, repository metadata, and live push events directly into your project roadmap.</p>

                                <div className="space-y-3 pt-4">
                                    {[
                                        { icon: Zap, text: "Live Push-Event Heatmap Sync" },
                                        { icon: ShieldCheck, text: "Secure OAuth Authentication" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                                            <item.icon size={16} className="text-blue-500" />
                                            {item.text}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleAuthorize}
                                    className="w-full bg-white text-black py-6 rounded-[32px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all mt-10"
                                >
                                    Authorize Project Pro <ArrowRight size={16} />
                                </button>
                            </motion.div>
                        )}

                        {step === 'authorizing' && (
                            <motion.div
                                key="authorizing"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center space-y-8"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-500/20 blur-[50px] animate-pulse rounded-full" />
                                    <Loader2 size={64} className="text-blue-500 animate-spin relative z-10" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Authorizing through GitHub</h3>
                                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Waiting for response...</p>
                                </div>
                            </motion.div>
                        )}

                        {step === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-20 text-center space-y-8"
                            >
                                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                                    <ShieldCheck size={40} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Integration Success</h3>
                                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-2">Connecting to your data stream...</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};
