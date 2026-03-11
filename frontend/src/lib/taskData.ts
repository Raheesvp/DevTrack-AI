export type TaskStatus = 'Todo' | 'In Progress' | 'Review' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    assignee?: string;
    dueDate?: string;
    estimatedHours?: number;
    actualHours?: number;
    tags: string[];
    createdAt: string;
    completedAt?: string;
    weekNumber: number;
}

export interface Milestone {
    id: string;
    title: string;
    targetDate: string;
    isReached: boolean;
}

export interface DailyLog {
    date: string;
    learned: string;
    productivityScore: number; // 0-100
    mood?: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    status: 'Active' | 'Completed' | 'Paused';
    category: string;
    tasks: Task[];
    milestones: Milestone[];
    logs: DailyLog[];
    createdAt: string;
}

export const generateProjectPlan = (name: string, daysReq: number): Project => {
    const tasks: Task[] = [];
    const isTech = /code|app|software|tech|api|dev/i.test(name);

    for (let i = 1; i <= daysReq; i++) {
        tasks.push({
            id: `task-${Date.now()}-${i}`,
            title: `${i % 2 === 0 ? 'Develop' : 'Research'} ${name} Component ${i}`,
            description: `Automated task for ${name} development day ${i}`,
            status: 'Todo',
            priority: i % 5 === 0 ? 'High' : 'Medium',
            tags: isTech ? ['Engineering'] : ['Creative'],
            createdAt: new Date().toISOString(),
            weekNumber: Math.ceil(i / 7),
            estimatedHours: 4
        });
    }

    return {
        id: Date.now().toString(),
        name,
        description: `Plan for ${name} - ${daysReq} days.`,
        status: 'Active',
        category: isTech ? 'Engineering' : 'Creative',
        tasks,
        milestones: [
            { id: 'm1', title: 'Phase 1 Complete', targetDate: 'Week 2', isReached: false },
            { id: 'm2', title: 'Beta Ready', targetDate: 'Week 4', isReached: false }
        ],
        logs: [],
        createdAt: new Date().toISOString()
    };
};

export const initialProjects: Project[] = [
    {
        id: '1',
        name: 'Document Management SaaS',
        description: 'Enterprise Clean Architecture Document System.',
        status: 'Active',
        category: 'Engineering',
        tasks: Array.from({ length: 14 }, (_, i) => ({
            id: `doc-task-${i}`,
            title: `Engineering Task ${i + 1}`,
            description: 'Core infrastructure development.',
            status: i < 5 ? 'Done' : 'Todo',
            priority: 'Medium',
            tags: ['Backend', 'C#'],
            createdAt: new Date().toISOString(),
            weekNumber: Math.ceil((i + 1) / 7),
            completedAt: i < 5 ? new Date().toISOString() : undefined
        })),
        milestones: [
            { id: 'm1', title: 'Gateway Setup', targetDate: '2026-03-10', isReached: true },
            { id: 'm2', title: 'Identity Ready', targetDate: '2026-03-15', isReached: false }
        ],
        logs: [
            { date: '2026-03-05', learned: 'Mastered YARP and JWT Tenant Auth.', productivityScore: 90 }
        ],
        createdAt: new Date().toISOString()
    }
];
