# LearnHub - E-Learning Platform
## 3-Month Intern Training Project

A comprehensive e-learning platform built with Next.js 14, TypeScript, and modern development practices. This project serves as a training ground for 7 interns to develop full-stack skills while building a production-ready application.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/rcdelacruz/learnhub-intern-project.git
cd learnhub-intern-project
```

2. **Start with Docker (Recommended)**
```bash
# Start all services (Next.js app + PostgreSQL + Redis)
docker-compose up -d

# The app will be available at http://localhost:3000
# PostgreSQL at localhost:5432
# Redis at localhost:6379
```

3. **Manual setup (Alternative)**
```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start PostgreSQL (via Docker)
docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

## 📁 Project Structure

```
learnhub-platform/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main application pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   └── shared/           # Shared business components
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Database connection
│   └── utils.ts          # Utility functions
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── modules/              # Business logic modules
│   ├── courses/          # Course management
│   ├── students/         # Student management
│   ├── instructors/      # Instructor management
│   ├── assessments/      # Assessment system
│   ├── communication/    # Communication system
│   ├── payments/         # Payment & enrollment
│   └── analytics/        # Analytics & reporting
├── docs/                 # MkDocs documentation
├── docker/               # Docker configuration
├── .github/              # GitHub Actions workflows
└── tests/                # Test files
```

## 🏗️ Module Assignment

Each intern will be responsible for one module:

1. **Course Management** - Course creation, curriculum design, content organization
2. **Student Management** - Student profiles, progress tracking, enrollment
3. **Instructor Management** - Instructor tools, course authoring, analytics
4. **Assessment System** - Quizzes, exams, grading, anti-cheating
5. **Communication System** - Forums, messaging, notifications, Q&A
6. **Payment & Enrollment** - Billing, subscriptions, enrollment workflow
7. **Analytics & Reporting** - Platform metrics, insights, custom reports

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **State Management**: Zustand, React Query
- **Real-time**: Socket.io
- **Testing**: Jest, React Testing Library, Playwright
- **Deployment**: Docker, Vercel
- **Documentation**: MkDocs

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
npm run db:migrate   # Run migrations
npm run db:reset     # Reset database

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Docker
npm run docker:dev   # Start with Docker Compose
npm run docker:down  # Stop Docker services
npm run docker:build # Build Docker image

# Documentation
npm run docs:dev     # Serve documentation locally
npm run docs:build   # Build documentation
npm run docs:deploy  # Deploy to GitHub Pages
```

## 📖 Documentation

Full documentation is available at: https://rcdelacruz.github.io/learnhub-intern-project

### Quick Links
- [Getting Started](docs/getting-started.md)
- [Git Workflow](docs/git-workflow.md)
- [Module Development Guide](docs/module-development.md)
- [API Documentation](docs/api-reference.md)
- [Deployment Guide](docs/deployment.md)

## 🌊 Git Workflow

We follow GitFlow with feature branches:

```bash
# Create feature branch
git checkout -b feature/course-management-crud

# Make changes and commit
git add .
git commit -m "feat: add course CRUD operations"

# Push and create PR
git push origin feature/course-management-crud
```

See [Git Workflow Guide](docs/git-workflow.md) for detailed instructions.

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests for specific module
npm run test -- modules/courses

# Run E2E tests
npx playwright test

# Test coverage
npm run test:coverage
```

## 🚢 Deployment

### Development
- Automatically deployed to Vercel on PR creation
- Preview URL provided in PR comments

### Production
- Deployed to production on merge to `main`
- Environment variables managed in Vercel dashboard

## 🤝 Contributing

1. Choose your assigned module
2. Create feature branch from `develop`
3. Implement feature with tests
4. Submit PR with detailed description
5. Address review feedback
6. Merge after approval

## 📋 Project Timeline

- **Month 1**: Core module development and basic CRUD operations
- **Month 2**: Integration, advanced features, and real-time functionality
- **Month 3**: Testing, optimization, and individual presentations

## 🎯 Learning Objectives

- Master Next.js 14 with App Router
- Build enterprise-grade applications
- Practice modern development workflows
- Learn containerized development
- Understand ERP system architecture
- Develop collaboration skills

## 🆘 Support

- **Documentation**: Check the docs/ folder first
- **Issues**: Create GitHub issues for bugs
- **Questions**: Use GitHub Discussions
- **Emergency**: Contact project lead

## 📄 License

This project is for educational purposes only.

---

**Ready to start building? Check out the [Getting Started Guide](docs/getting-started.md)!**
