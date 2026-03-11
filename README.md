# DevTrack AI

### Engineering Project Planning & Execution System

* DevTrack AI is an AI-powered engineering productivity platform designed to help developers and teams plan, track, and analyze software development projects from idea to completion.
* The platform combines AI-powered planning, GitHub analytics, and engineering workflow management into a single system that mirrors real-world development processes used in professional software teams.

---

# Repository Description (GitHub Overview)

**DevTrack AI — AI-powered engineering productivity platform that generates project roadmaps, analyzes GitHub commits, and visualizes developer progress using a Clean Architecture .NET backend and React frontend.**

**Alternative shorter version**

AI-powered developer productivity platform for project planning, GitHub analytics, and engineering workflow tracking.

---

# What DevTrack AI Enables

* Generate AI-powered project development plans
* Track daily engineering progress
* Analyze GitHub commits and repository activity
* Manage tasks, sprints, and milestones
* Visualize engineering productivity and development velocity

---

# Key Features

## AI Development Planning

* AI Project Plan Generator
* Smart Task Suggestions
* Time Estimation Engine

---

## Engineering Workflow Tools

* Kanban Task Board
* Daily Engineering Log
* Weekly Sprint Planner
* Milestone Management

---

## GitHub Analytics

* GitHub Commit Analyzer
* Repository Progress Dashboard
* Developer Activity Feed

---

## Productivity & Insights

* Burn Down Charts
* Engineering Productivity Score
* Progress Heatmap
* Automated Progress Reports

---

## Documentation Automation

* Auto Documentation Generator
* README Builder
* Developer Portfolio Dashboard

---

## Collaboration

* Team Collaboration Workspace
* Smart Reminders
* Learning & Reflection Notes

---

# System Architecture

DevTrack AI is designed using **Clean Architecture** and **CQRS pattern** to ensure scalability, maintainability, and testability.

```
Client (React)
      ↓
API Layer (.NET Web API)
      ↓
Application Layer (CQRS)
      ↓
Domain Layer (Business Logic)
      ↓
Infrastructure Layer (EF Core, GitHub API, AI Services)
      ↓
Database (PostgreSQL / SQL Server)
```

---

# Architecture Benefits

* Clear separation of concerns
* Independent domain business logic
* Scalable integration with external services
* Maintainable and testable codebase

---

# Tech Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* Component-based architecture

---

## Backend

* .NET Web API
* Clean Architecture
* CQRS Pattern
* JWT Authentication

---

## Database

* PostgreSQL / SQL Server
* Entity Framework Core

---

## Integrations

* OpenAI / HuggingFace API
* GitHub REST API

---

# Project Structure

```
src/
 ├── API
 ├── Application
 │   ├── Commands
 │   ├── Queries
 │   └── DTOs
 ├── Domain
 │   ├── Entities
 │   ├── ValueObjects
 │   └── Interfaces
 ├── Infrastructure
 │   ├── Persistence
 │   ├── Repositories
 │   └── Services

tests/
 ├── UnitTests
 └── IntegrationTests
```

This structure follows **enterprise engineering practices used in scalable .NET systems.**

---




# How to Run the Project

## Clone Repository

```
git clone https://github.com/yourusername/devtrack-ai.git
cd devtrack-ai
```

---

## Run Backend

```
dotnet restore
dotnet run
```

---



# Images

![Architecture Image](./images/architecture.png)

---

# Links

You may be using **Markdown Live Preview**

https://markdownlivepreview.com/

---

# Tables

| Feature                | Description                              |
| ---------------------- | ---------------------------------------- |
| AI Planning            | Generates AI development roadmaps        |
| GitHub Analytics       | Analyzes commits and repository activity |
| Kanban Board           | Visual project task management           |
| Productivity Dashboard | Engineering insights and metrics         |





