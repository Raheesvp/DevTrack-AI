export interface Day {
    id: number;
    label: string;
    description: string;
    completed: boolean;
}

export interface Week {
    id: number;
    title: string;
    deliverable: string;
    description: string;
    technologies: string[];
    days: Day[];
    completed: boolean;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    weeks: Week[];
    status: 'Active' | 'Completed' | 'Paused';
    category: string;
}

const documentSaaSWeeks: Week[] = [
    {
        id: 1,
        title: "Foundation",
        deliverable: "Register tenant → Login → JWT → Gateway routes correctly",
        description: "Stand up the entire infrastructure skeleton — Docker, Clean Architecture solution, shared libraries, YARP API Gateway, and a fully working Identity Service with JWT authentication.",
        technologies: ["Docker Compose", ".NET Clean Architecture", "YARP", "JWT", "ASP.NET Core Identity", "Integration Testing"],
        completed: true,
        days: [
            { id: 1, label: "Day 1", description: "Docker Compose: 6 containers running", completed: true },
            { id: 2, label: "Day 2", description: "Solution scaffold: 23 projects, Clean Architecture", completed: true },
            { id: 3, label: "Day 3", description: "Shared.Domain + Shared.Contracts libraries", completed: true },
            { id: 4, label: "Day 4", description: "YARP API Gateway: JWT, rate limiting, tenant middleware", completed: true },
            { id: 5, label: "Day 5", description: "Identity Service: Domain + Application layers", completed: true },
            { id: 6, label: "Day 6", description: "Identity Service: Infrastructure + API running :5001", completed: true },
            { id: 7, label: "Day 7", description: "Gateway wired to Identity: end-to-end integration test", completed: true },
        ]
    },
    {
        id: 2,
        title: "Doc Domain",
        deliverable: "All document business logic tested",
        description: "Build the complete Domain and Application layers for the Document Service.",
        technologies: ["DDD", "MediatR", "FluentValidation", "xUnit"],
        completed: false,
        days: [
            { id: 8, label: "Day 8", description: "Document aggregate + Value Objects", completed: false },
            { id: 9, label: "Day 9", description: "Repository interfaces + unit tests", completed: false },
            { id: 10, label: "Day 10", description: "Application setup + Upload command", completed: false },
            { id: 11, label: "Day 11", description: "Update command + Query handlers", completed: false },
            { id: 12, label: "Day 12", description: "ValidationBehavior + pipeline wired", completed: false },
            { id: 13, label: "Day 13", description: "Versioning command + query", completed: false },
            { id: 14, label: "Day 14", description: "Full unit test suite review", completed: false },
        ]
    },
    // Truncating for brevity in initialization, but keeping the structure
    {
        id: 3,
        title: "Infrastructure",
        deliverable: "MinIO + RabbitMQ Integration",
        description: "PostgreSQL, MinIO file storage, and MassTransit messaging.",
        technologies: ["PostgreSQL", "MinIO", "MassTransit", "RabbitMQ"],
        completed: false,
        days: Array.from({ length: 7 }, (_, i) => ({ id: 15 + i, label: `Day ${15 + i}`, description: "Infrastructure setup", completed: false }))
    }
];

export const initialProjects: Project[] = [
    {
        id: '1',
        name: 'Document Management SaaS',
        description: 'An enterprise-grade document service with clean architecture.',
        weeks: documentSaaSWeeks,
        status: 'Active',
        category: 'Engineering'
    },
    {
        id: '2',
        name: 'E-Commerce Platform',
        description: 'Microservices based shopping experience.',
        weeks: [], // Empty for now, user can add
        status: 'Paused',
        category: 'Product'
    }
];
