import { useState, useEffect, useMemo } from 'react'
import { initialProjects, Project } from './lib/taskData'
import { Tracker } from './components/Tracker'
import { StatsCard } from './components/StatsCard'
import { ProgressChart } from './components/ProgressChart'
import { Timeline } from './components/Timeline'
import {
  Rocket, Plus, LayoutDashboard, Settings,
  FolderKanban, Users, ShieldCheck, Database,
  TrendingUp, Zap, Clock
} from 'lucide-react'

function App() {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('project_pro_data');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);

  const activeProject = useMemo(() =>
    projects.find(p => p.id === activeProjectId) || projects[0]
    , [projects, activeProjectId]);

  useEffect(() => {
    localStorage.setItem('project_pro_data', JSON.stringify(projects));
  }, [projects]);

  const handleToggleDay = (weekId: number, dayId: number) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== activeProjectId) return p;
      return {
        ...p,
        weeks: p.weeks.map(w => {
          if (w.id !== weekId) return w;
          const updatedDays = w.days.map(d =>
            d.id === dayId ? { ...d, completed: !d.completed } : d
          );
          return { ...w, days: updatedDays, completed: updatedDays.every(d => d.completed) };
        })
      };
    }));
  };

  const handleToggleWeek = (weekId: number) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== activeProjectId) return p;
      return {
        ...p,
        weeks: p.weeks.map(w => {
          if (w.id !== weekId) return w;
          const targetState = !w.completed;
          return {
            ...w,
            completed: targetState,
            days: w.days.map(d => ({ ...d, completed: targetState }))
          };
        })
      };
    }));
  };

  const totalTasks = activeProject.weeks.reduce((acc, w) => acc + w.days.length, 0);
  const completedTasks = activeProject.weeks.reduce((acc, w) => acc + w.days.filter(d => d.completed).length, 0);
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const chartData = activeProject.weeks.map(w => ({
    name: `W${w.id}`,
    value: Math.round((w.days.filter(d => d.completed).length / 7) * 100)
  }));

  const milestones = [
    { id: 1, title: 'Project Kickoff', date: 'Week 1', completed: activeProject.weeks[0]?.completed || false },
    { id: 2, title: 'MVP Development', date: 'Week 4', completed: activeProject.weeks[3]?.completed || false },
    { id: 3, title: 'Beta Release', date: 'Week 6', completed: activeProject.weeks[5]?.completed || false },
    { id: 4, title: 'Final Launch', date: 'Week 8', completed: activeProject.weeks[7]?.completed || false },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-16 lg:w-72 bg-[#1F2937]/50 border-r border-white/5 flex flex-col z-50">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <span className="hidden lg:block font-extrabold text-xl tracking-tighter text-white uppercase italic">ProjectPro.</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">Main Menu</div>
          {[
            { icon: LayoutDashboard, label: 'Dashboard', active: true },
            { icon: FolderKanban, label: 'Projects', active: false },
            { icon: Users, label: 'Team', active: false },
            { icon: Database, label: 'Infrastructure', active: false },
            { icon: Settings, label: 'Settings', active: false },
          ].map(item => (
            <div key={item.label} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${item.active ? 'bg-blue-600/10 text-blue-400 ring-1 ring-blue-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <item.icon size={20} />
              <span className="hidden lg:block text-sm font-bold">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="p-8 hidden lg:block">
          <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 p-6 rounded-3xl border border-white/5">
            <p className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-widest leading-none">Usage Quota</p>
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-black text-white">84%</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Upgrade Soon</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: '84%' }} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-transparent to-blue-500/5">
        {/* Header */}
        <header className="h-24 px-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#0F172A]/80 backdrop-blur-xl z-40">
          <div className="flex items-center gap-6">
            <div className="hidden md:block">
              <h1 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Active Project</h1>
              <select
                value={activeProjectId}
                onChange={(e) => setActiveProjectId(e.target.value)}
                className="bg-transparent text-xl font-bold text-white border-none focus:ring-0 p-0 cursor-pointer"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id} className="bg-[#1F2937]">{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-[#0F172A] text-xs font-black uppercase tracking-widest hover:bg-blue-400 hover:text-white transition-all">
              <Plus size={16} /> New Project
            </button>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 border-2 border-white/10 p-0.5">
              <img src="https://ui-avatars.com/api/?name=User&background=transparent&color=fff" className="w-full h-full rounded-[14px]" alt="user" />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard title="Completed" value={`${completedTasks}/${totalTasks}`} icon={ShieldCheck} trend="+4 today" trendType="up" />
            <StatsCard title="Progress" value={`${progressPercent}%`} icon={TrendingUp} trend="+12%" trendType="up" />
            <StatsCard title="Resources" value="24 units" icon={Database} trend="Stable" trendType="neutral" />
            <StatsCard title="Time Spent" value="218h" icon={Clock} trend="+8.2h" trendType="down" />
          </div>

          {/* Charts & Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                <ProgressChart
                  type="bar"
                  data={chartData}
                  title="Weekly Velocity"
                />
                <ProgressChart
                  type="pie"
                  data={[
                    { name: 'Engineering', value: 40, color: '#3B82F6' },
                    { name: 'Design', value: 25, color: '#A855F7' },
                    { name: 'DevOps', value: 20, color: '#10B981' },
                    { name: 'Testing', value: 15, color: '#f59e0b' },
                  ]}
                  title="Unit Distribution"
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <Timeline milestones={milestones} />
            </div>
          </div>

          {/* Feature Roadmap (The Tracker) */}
          <section className="bg-white/5 rounded-[40px] p-2 border border-white/5">
            <div className="p-6 md:p-10">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none mb-2">Feature Roadmap</h2>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Execution Queue • 56 Day Sprint</p>
                </div>
                <div className="p-4 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black text-[10px] uppercase tracking-widest">
                  {activeProject.status}
                </div>
              </div>

              {activeProject.weeks.length > 0 ? (
                <Tracker
                  weeks={activeProject.weeks}
                  onToggleDay={handleToggleDay}
                  onToggleWeek={handleToggleWeek}
                />
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center opacity-40">
                  <FolderKanban size={48} className="mb-4 text-slate-600" />
                  <h3 className="text-lg font-bold text-white">No Roadmap Defined</h3>
                  <p className="text-sm text-slate-500">Add weeks and days to start tracking progress.</p>
                  <button className="mt-6 px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-widest">
                    Initialize Template
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Quick Action */}
      <div className="fixed bottom-10 right-10 z-[100]">
        <button className="w-16 h-16 rounded-[24px] bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-500/50 hover:scale-110 active:scale-90 transition-all">
          <Zap size={24} fill="currentColor" />
        </button>
      </div>
    </div>
  )
}

export default App
