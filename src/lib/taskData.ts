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

export const initialData: Week[] = [
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
        title: "Document Service Domain + Application",
        deliverable: "All document business logic tested — zero DB, zero HTTP needed",
        description: "Build the complete Domain and Application layers for the Document Service — pure business logic with no database or HTTP dependencies.",
        technologies: ["Domain-Driven Design (DDD)", "Aggregate Roots", "Value Objects", "MediatR CQRS", "FluentValidation", "xUnit"],
        completed: false,
        days: [
            { id: 8, label: "Day 8", description: "Document aggregate + Value Objects + Domain Events", completed: false },
            { id: 9, label: "Day 9", description: "Repository interfaces + DocumentErrors + Domain unit tests", completed: false },
            { id: 10, label: "Day 10", description: "Application setup + UploadDocument + ArchiveDocument commands", completed: false },
            { id: 11, label: "Day 11", description: "UpdateDocument command + GetDocument + GetDocumentList queries", completed: false },
            { id: 12, label: "Day 12", description: "ValidationBehavior + AssemblyReference + pipeline wired", completed: false },
            { id: 13, label: "Day 13", description: "AddDocumentVersion command + GetDocumentVersions query", completed: false },
            { id: 14, label: "Day 14", description: "Full unit test suite (15+ tests) + Week 2 review build", completed: false },
        ]
    },
    {
        id: 3,
        title: "Document Service Infrastructure + Chunked Upload",
        deliverable: "Upload 500MB PDF → chunks → MinIO → event published to RabbitMQ",
        description: "Implement the full infrastructure layer — PostgreSQL persistence with EF Core and Dapper, MinIO file storage, MassTransit messaging, and chunked upload via the Tus protocol.",
        technologies: ["EF Core Fluent API", "PostgreSQL Row-Level Security", "Dapper", "MinIO SDK", "MassTransit", "RabbitMQ", "Tus Protocol", "Redis"],
        completed: false,
        days: [
            { id: 15, label: "Day 15", description: "EF Core DbContext + Fluent API configurations + Migration", completed: false },
            { id: 16, label: "Day 16", description: "PostgreSQL Row-Level Security + ITenantContext interceptor", completed: false },
            { id: 17, label: "Day 17", description: "DocumentRepository (EF Core writes) + DocumentReadRepository (Dapper reads)", completed: false },
            { id: 18, label: "Day 18", description: "IStorageService → MinioStorageService implementation", completed: false },
            { id: 19, label: "Day 19", description: "MassTransit setup + DocumentUploadedEvent publisher", completed: false },
            { id: 20, label: "Day 20", description: "Tus chunked upload: chunk tracking in Redis + assembly logic", completed: false },
            { id: 21, label: "Day 21", description: "Integration tests: upload file → stored in MinIO → event published", completed: false },
        ]
    },
    {
        id: 4,
        title: "Workflow Service (All 4 Layers)",
        deliverable: "Upload doc → workflow starts → approver emailed → SLA enforced automatically",
        description: "Build the entire Workflow Service — a state-machine-driven approval engine that auto-starts on document upload, enforces SLAs, and notifies approvers.",
        technologies: ["Stateless (State Machine library)", "Hangfire", "MS SQL with EF Core", "MassTransit Consumers"],
        completed: false,
        days: [
            { id: 22, label: "Day 22", description: "WorkflowDefinition + WorkflowInstance domain models + enums", completed: false },
            { id: 23, label: "Day 23", description: "Stage model + state machine (Stateless library) + domain events", completed: false },
            { id: 24, label: "Day 24", description: "Workflow Application layer: StartWorkflow + ApproveStage commands", completed: false },
            { id: 25, label: "Day 25", description: "RejectStage + EscalateStage commands + query handlers", completed: false },
            { id: 26, label: "Day 26", description: "Workflow Infrastructure: EF Core MS SQL + repositories", completed: false },
            { id: 27, label: "Day 27", description: "SLA Engine: Hangfire background job + auto-escalation logic", completed: false },
            { id: 28, label: "Day 28", description: "MassTransit consumer for DocumentUploadedEvent → auto-start workflow", completed: false },
        ]
    },
    {
        id: 5,
        title: "React Frontend",
        deliverable: "Fully usable professional UI — complete document lifecycle visible",
        description: "Build a fully professional React frontend — authentication flows, document management pages, and chunked file upload UI with real-time feedback.",
        technologies: ["React 18", "Vite", "TypeScript", "Zustand", "TanStack Query", "Tailwind CSS", "shadcn/ui", "tus-js-client"],
        completed: false,
        days: [
            { id: 29, label: "Day 29", description: "Vite + React 18 + TypeScript + shadcn/ui + Tailwind setup", completed: false },
            { id: 30, label: "Day 30", description: "Zustand auth store + TanStack Query setup + axios interceptors", completed: false },
            { id: 31, label: "Day 31", description: "Login + Register pages + protected routes + role-based rendering", completed: false },
            { id: 32, label: "Day 32", description: "Document list page: filters, pagination, status badges", completed: false },
            { id: 33, label: "Day 33", description: "Document detail page: metadata, version history, approval actions", completed: false },
            { id: 34, label: "Day 34", description: "Chunked upload UI: tus-js-client + progress bars + pause/resume/cancel", completed: false },
            { id: 35, label: "Day 35", description: "Drag-and-drop zone + multi-file queue + upload error handling", completed: false },
        ]
    },
    {
        id: 6,
        title: "Notification Service + SignalR + Elasticsearch",
        deliverable: "Upload → real-time progress → searchable content — zero page refreshes",
        description: "Add real-time push notifications via SignalR, email notifications via MailKit, in-app notification storage in MongoDB, and full-text document search powered by Elasticsearch.",
        technologies: ["SignalR WebSockets", "MailKit", "MongoDB", "Elasticsearch .NET client", "MassTransit Consumers"],
        completed: false,
        days: [
            { id: 36, label: "Day 36", description: "Notification Service: Domain + Application layers", completed: false },
            { id: 37, label: "Day 37", description: "Notification Infrastructure: MailKit email + MongoDB in-app storage", completed: false },
            { id: 38, label: "Day 38", description: "MassTransit consumers: workflow events → email + in-app notifications", completed: false },
            { id: 39, label: "Day 39", description: "SignalR Hub: tenant-scoped groups + real-time push events", completed: false },
            { id: 40, label: "Day 40", description: "React SignalR client: upload progress, workflow changes, notification badge", completed: false },
            { id: 41, label: "Day 41", description: "Elasticsearch indexing: DocumentParsedEvent triggers text indexing", completed: false },
            { id: 42, label: "Day 42", description: "Full-text search API: faceted search + relevance scoring + React search UI", completed: false },
        ]
    },
    {
        id: 7,
        title: "Production Hardening",
        deliverable: "One service down does not cascade. Every request traceable end-to-end.",
        description: "Make every service production-ready — distributed caching, resilience policies, health checks, and full distributed tracing across all 5 services.",
        technologies: ["IDistributedCache", "Redis", "Polly", "OpenTelemetry", "Seq", "Health Checks API"],
        completed: false,
        days: [
            { id: 43, label: "Day 43", description: "Redis caching: tenant config cache + document metadata cache", completed: false },
            { id: 44, label: "Day 44", description: "IDistributedCache abstraction + cache invalidation on update events", completed: false },
            { id: 45, label: "Day 45", description: "Polly retry policy: 3 attempts + exponential backoff", completed: false },
            { id: 46, label: "Day 46", description: "Polly circuit breaker: opens after 5 failures + 30s reset", completed: false },
            { id: 47, label: "Day 47", description: "Health checks: /health on all 5 services with DB + RabbitMQ + Redis", completed: false },
            { id: 48, label: "Day 48", description: "OpenTelemetry SDK: TraceId propagated through HTTP + RabbitMQ", completed: false },
            { id: 49, label: "Day 49", description: "Seq dashboard: full distributed trace across all 5 services verified", completed: false },
        ]
    },
    {
        id: 8,
        title: "Load Testing + Audit + Polish",
        deliverable: "1,000 concurrent users proven. Audit trail complete. Fully documented.",
        description: "Prove the system handles 1,000 concurrent users, build a complete audit trail service, and finalise all documentation and demo materials.",
        technologies: ["k6 Load Testing", "Audit Service Design", "Postman Collections", "README Documentation", "Demo Recording"],
        completed: false,
        days: [
            { id: 50, label: "Day 50", description: "k6 load test: 1,000 concurrent upload sessions", completed: false },
            { id: 51, label: "Day 51", description: "Analyse bottlenecks: tune PostgreSQL pool + Redis TTLs + RabbitMQ prefetch", completed: false },
            { id: 52, label: "Day 52", description: "Audit Service: Domain + Application + Infrastructure (all 4 layers)", completed: false },
            { id: 53, label: "Day 53", description: "Audit log query API: filter by user/tenant/action/date + CSV export", completed: false },
            { id: 54, label: "Day 54", description: "README + architecture diagram + Docker one-command startup", completed: false },
            { id: 55, label: "Day 55", description: "Postman collection: all endpoints with example requests + auth flows", completed: false },
            { id: 56, label: "Day 56", description: "Record demo video: upload → OCR → approve → search", completed: false },
        ]
    }
];
