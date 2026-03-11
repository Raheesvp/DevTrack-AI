import { useState, useEffect, useMemo } from 'react'
import { generateProjectPlan, Project, Task, TaskStatus, DailyLog } from '../lib/taskData'
import { StatsCard } from '../components/StatsCard'
import { ProgressChart } from '../components/ProgressChart'
import { KanbanBoard } from '../components/KanbanBoard'
import { NotesView } from '../components/NotesView'
import { ProductivityHeatmap } from '../components/ProductivityHeatmap'
import { ReflectionLog } from '../components/ReflectionLog'
import { Schedule } from '../components/Schedule'
import { Logo } from '../components/Logo'
import { PlanImporter } from '../components/PlanImporter'
import {
  Plus, LayoutDashboard,
  ShieldCheck,
  TrendingUp, Zap, Clock, Bell,
  ListTodo, BarChart3,
  ArrowUpRight, ChevronRight,
  Trash2, BookOpen
} from 'lucide-react'

type ViewType = 'Dashboard' | 'Kanban' | 'Notes' | 'Analytics';

function Dashboard() {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('project_plan_enterprise_v3');
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id || '');
  const [view, setView] = useState<ViewType>('Dashboard');
  const [isImporterOpen, setIsImporterOpen] = useState(false);
  const [isGitHubConnected, setIsGitHubConnected] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDays, setNewProjectDays] = useState(14);
  const [projectPendingDeleteId, setProjectPendingDeleteId] = useState<string | null>(null);

  const activeProject = useMemo(() =>
    projects.find(p => p.id === activeProjectId) || projects[0]
    , [projects, activeProjectId]);

  useEffect(() => {
    localStorage.setItem('project_plan_enterprise_v3', JSON.stringify(projects));
  }, [projects]);

  const updateActiveProject = (updated: Project) => {
    setProjects(prev => prev.map(p => p.id === activeProjectId ? updated : p));
  };

  const confirmDeleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    setActiveProjectId(updated[0]?.id || '');
    if (updated.length === 0) {
      setView('Dashboard');
    }
    setProjectPendingDeleteId(null);
  };

  const handleTaskMove = (taskId: string, newStatus: TaskStatus) => {
    if (!activeProject) return;
    const updatedTasks = activeProject.tasks.map(t =>
      t.id === taskId ? { ...t, status: newStatus, completedAt: newStatus === 'Done' ? new Date().toISOString() : undefined } : t
    );
    updateActiveProject({ ...activeProject, tasks: updatedTasks });
  };

  const handleSaveLog = (log: DailyLog) => {
    if (!activeProject) return;
    updateActiveProject({ ...activeProject, logs: [...activeProject.logs, log] });
  };

  const handleCreateProject = () => {
    const trimmedName = newProjectName.trim();
    if (!trimmedName) return;
    const days = Number.isFinite(newProjectDays) ? Math.max(1, Math.min(120, newProjectDays)) : 14;
    const newProject = generateProjectPlan(trimmedName, days);
    setProjects(prev => [...prev, newProject]);
    setActiveProjectId(newProject.id);
    setNewProjectName('');
    setNewProjectDays(14);
  };

  const handleImportTasks = (newTasks: Task[], name: string) => {
    const newProject: Project = {
      id: `import-${Date.now()}`,
      name,
      description: `Imported plan with ${newTasks.length} tasks.`,
      status: 'Active',
      category: 'Imported',
      tasks: newTasks,
      milestones: [],
      logs: [],
      createdAt: new Date().toISOString()
    };
    setProjects(prev => [...prev, newProject]);
    setActiveProjectId(newProject.id);
    setIsImporterOpen(false);
  };

  if (!activeProject) {
    return (
      <div className="min-h-screen agency-bg text-slate-700 font-sans">
        <header className="h-24 px-8 md:px-12 border-b border-slate-200 bg-[rgba(255,255,255,0.82)] backdrop-blur-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="w-7 h-7" />
            <span className="font-black text-lg tracking-tighter text-slate-900 uppercase italic">PlanTrack.</span>
          </div>
        </header>

        <main className="px-6 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="glass border border-slate-200 rounded-3xl p-8 md:p-10 space-y-8">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Home</p>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mt-2">Welcome to PlanTrack</h1>
                <p className="text-sm md:text-base text-slate-500 mt-3">Start by creating your first project. No progress or analytics are shown until a project is added.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Name</label>
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Example: Sales CRM Platform"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Days</label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={newProjectDays}
                    onChange={(e) => setNewProjectDays(Number(e.target.value))}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleCreateProject}
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors"
                >
                  Add Project
                </button>
                <button
                  onClick={() => setIsImporterOpen(true)}
                  className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
                >
                  Import Existing Plan
                </button>
              </div>
            </div>
          </div>
          {isImporterOpen && <PlanImporter onImport={handleImportTasks} onClose={() => setIsImporterOpen(false)} />}
        </main>
      </div>
    );
  }

  // Metrics
  const totalTasks = activeProject.tasks.length;
  const completedTasks = activeProject.tasks.filter(t => t.status === 'Done').length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const chartData = activeProject.tasks.length > 0 ? Array.from(new Set(activeProject.tasks.map(t => t.weekNumber))).sort((a, b) => a - b).map(w => {
    const weekTasks = activeProject.tasks.filter(t => t.weekNumber === w);
    return {
      name: `W${w}`,
      value: Math.round((weekTasks.filter(t => t.status === 'Done').length / weekTasks.length) * 100)
    };
  }) : [];

  const heatmapData = (() => {
    const dateTotals = new Map<string, number>();

    activeProject.tasks.forEach((task) => {
      if (!task.completedAt) return;
      const dateKey = task.completedAt.slice(0, 10);
      dateTotals.set(dateKey, (dateTotals.get(dateKey) ?? 0) + 1);
    });

    activeProject.logs.forEach((log) => {
      const noteIntensity = Math.max(1, Math.round(log.productivityScore / 25));
      dateTotals.set(log.date, (dateTotals.get(log.date) ?? 0) + noteIntensity);
    });

    if (isGitHubConnected) {
      activeProject.logs.forEach((log) => {
        dateTotals.set(log.date, (dateTotals.get(log.date) ?? 0) + 1);
      });
    }

    return Array.from(dateTotals.entries()).map(([date, count]) => ({ date, count }));
  })();

  const latestLog = activeProject.logs[activeProject.logs.length - 1];
  const productivityIntensity = latestLog ? `${latestLog.productivityScore}/100` : 'No data';
  const productivityTrend = latestLog
    ? `${Math.max(1, Math.round(latestLog.productivityScore / 25))} intensity points from latest note`
    : 'Add a daily note to start tracking';

  return (
    <div className="min-h-screen agency-bg text-slate-700 font-sans flex overflow-hidden">
      {/* Sidebar - Enterprise Style */}
      <aside className="w-20 lg:w-72 bg-[rgba(255,255,255,0.78)] border-r border-slate-200 flex flex-col z-50 backdrop-blur-3xl">
        <div className="p-8 flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="hidden lg:block font-black text-xl tracking-tighter text-slate-900 uppercase italic">PlanTrack.</span>
        </div>

        <nav className="flex-1 px-4 space-y-4 py-8">
          <div className="space-y-1">
            <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-4 mb-4">View Modes</div>
            {[
              { id: 'Dashboard', icon: LayoutDashboard, label: 'Control Center' },
              { id: 'Kanban', icon: ListTodo, label: 'Work Board' },
              { id: 'Notes', icon: BookOpen, label: 'Logs & Notes' },
              { id: 'Analytics', icon: BarChart3, label: 'Performance' },
            ].map(item => (
              <div
                key={item.id}
                onClick={() => setView(item.id as ViewType)}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 group ${view === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                <item.icon size={20} className={view === item.id ? 'scale-110' : 'group-hover:scale-110 transition-transform'} />
                <span className="hidden lg:block text-sm font-bold tracking-tight">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="pt-8 space-y-1">
            <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-4 mb-4">Management</div>
            <div
              onClick={() => setProjectPendingDeleteId(activeProject.id)}
              className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer text-red-500/60 hover:bg-red-500/10 hover:text-red-500 transition-all group"
            >
              <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
              <span className="hidden lg:block text-sm font-bold tracking-tight">Delete Project</span>
            </div>
          </div>
        </nav>

        <div className="p-8 hidden lg:block">
          <div className="bg-gradient-to-br from-blue-100/80 to-transparent p-6 rounded-[32px] border border-slate-200">
            <p className="text-[10px] font-black text-blue-500 mb-2 uppercase tracking-widest leading-none">Sprint Velocity</p>
            <div className="flex justify-between items-end mb-4">
              <span className="text-3xl font-black text-slate-900">{progressPercent}%</span>
              <ArrowUpRight size={16} className="text-green-400 mb-1" />
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-transparent via-white/50 to-blue-100/60">
        {/* Header */}
        <header className="h-28 px-10 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-[rgba(255,255,255,0.82)] backdrop-blur-3xl z-40">
          {/* Project Selector Removed per User Request */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 pr-6 border-r border-slate-200">
              <button className="p-3 text-slate-500 hover:text-slate-900 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-900 border-2 border-white/10 p-0.5 shadow-xl">
              <img src="https://ui-avatars.com/api/?name=Admin&background=transparent&color=fff" className="w-full h-full rounded-[14px]" alt="user" />
            </div>
          </div>
        </header>

        <div className="p-10 max-w-8xl mx-auto space-y-12 pb-24">
          {view === 'Dashboard' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatsCard title="Total Completion" value={`${progressPercent}%`} icon={ShieldCheck} trend="+14% this week" trendType="up" />
                <StatsCard title="Pipeline Load" value={`${totalTasks} Tasks`} icon={TrendingUp} trend="Healthy" trendType="neutral" />
                <StatsCard title="Productivity Intensity" value={productivityIntensity} icon={Zap} trend={productivityTrend} trendType={latestLog ? 'up' : 'neutral'} />
                <StatsCard title="Delivery Weeks" value={`${chartData.length}`} icon={Clock} trend="On track" trendType="neutral" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <ProgressChart type="bar" data={chartData} title="Velocity Distribution" />
                    <ProductivityHeatmap
                      data={heatmapData}
                      isGitHubConnected={isGitHubConnected}
                      onConnectGitHub={() => setIsGitHubConnected(!isGitHubConnected)}
                    />
                  </div>
                  <div className="glass p-8 rounded-[40px] border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Milestone Tracking</h3>
                    </div>
                    <Schedule tasks={activeProject.tasks} />
                  </div>
                </div>
                <div className="lg:col-span-1 space-y-10">
                  <ReflectionLog logs={activeProject.logs} onSaveLog={handleSaveLog} />
                  <div className="glass p-8 rounded-[40px] border border-white/5">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Execution Queue</h3>
                    <div className="space-y-4">
                      {activeProject.tasks.filter(t => t.status === 'Todo').slice(0, 5).map(task => (
                        <div key={task.id} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{task.title}</span>
                          </div>
                          <ChevronRight size={14} className="text-slate-700 group-hover:text-blue-500 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === 'Kanban' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter mb-2">Work Delivery Board</h2>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global task lifecycle management</p>
                </div>
              </div>
              <KanbanBoard tasks={activeProject.tasks} onTaskMove={handleTaskMove} />
            </div>
          )}

          {view === 'Notes' && (
            <NotesView tasks={activeProject.tasks} logs={activeProject.logs} />
          )}

          {isImporterOpen && (
            <PlanImporter
              onImport={handleImportTasks}
              onClose={() => setIsImporterOpen(false)}
            />
          )}
        </div>
      </main>

      <div className="fixed bottom-12 right-12 z-[100]">
        <button className="w-18 h-18 rounded-[28px] bg-blue-600 text-white flex items-center justify-center shadow-[0_20px_50px_rgba(59,130,246,0.4)] hover:scale-110 active:scale-95 transition-all shadow-blue-500/50">
          <Plus size={28} />
        </button>
      </div>

      {projectPendingDeleteId && (
        <div className="fixed inset-0 z-[230] bg-slate-900/35 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl p-6">
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">Delete Project?</h3>
            <p className="text-sm text-slate-600">Are you sure you want to delete this project?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setProjectPendingDeleteId(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
              >
                No
              </button>
              <button
                onClick={() => confirmDeleteProject(projectPendingDeleteId)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
