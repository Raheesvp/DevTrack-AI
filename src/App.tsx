import { useState, useEffect } from 'react'
import { initialData, Week } from './lib/taskData'
import { ProgressDashboard } from './components/ProgressDashboard'
import { Tracker } from './components/Tracker'
import { Rocket, Github, ExternalLink } from 'lucide-react'

function App() {
  const [weeks, setWeeks] = useState<Week[]>(() => {
    const saved = localStorage.getItem('sprint_progress');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('sprint_progress', JSON.stringify(weeks));
  }, [weeks]);

  const handleToggleDay = (weekId: number, dayId: number) => {
    setWeeks(prev => prev.map(w => {
      if (w.id !== weekId) return w;
      const updatedDays = w.days.map(d =>
        d.id === dayId ? { ...d, completed: !d.completed } : d
      );
      return { ...w, days: updatedDays, completed: updatedDays.every(d => d.completed) };
    }));
  };

  const handleToggleWeek = (weekId: number) => {
    setWeeks(prev => prev.map(w => {
      if (w.id !== weekId) return w;
      const targetState = !w.completed;
      return {
        ...w,
        completed: targetState,
        days: w.days.map(d => ({ ...d, completed: targetState }))
      };
    }));
  };

  return (
    <div className="min-h-screen text-slate-200 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">SaaS Sprint</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-blue-400 transition-colors">Documentation</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Resources</a>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-4 text-white">
              <Github className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
              <button className="px-4 py-1.5 rounded-full bg-white text-slate-950 text-xs font-bold hover:bg-blue-400 hover:text-white transition-all">
                Share Progress
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Header Section */}
        <section className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Live Sprint Tracker
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4">
            Document Management <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              56-Day SaaS Sprint
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            A high-performance roadmap covering 8 weeks of intensive engineering.
            From Docker foundation to production-scale load testing.
          </p>
        </section>

        {/* Dashboards */}
        <ProgressDashboard weeks={weeks} />

        {/* Main Content */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              Weekly Roadmap
              <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-slate-500">v1.0.4</span>
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ExternalLink className="w-3 h-3" />
              Sync with Jira
            </div>
          </div>

          <Tracker
            weeks={weeks}
            onToggleDay={handleToggleDay}
            onToggleWeek={handleToggleWeek}
          />
        </div>
      </main>

      {/* Footer / Contact */}
      <footer className="border-t border-white/5 py-12 bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-slate-500 text-sm">
            © 2026 SaaS Engineering Sprint. All rights reserved.
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
