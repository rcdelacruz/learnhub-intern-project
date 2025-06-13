# Installation Guide

This guide will help you set up the LearnHub development environment on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm 8+** or **yarn** - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)
- **Docker & Docker Compose** - [Download here](https://www.docker.com/get-started)

### Verify Prerequisites

```bash
node --version  # Should be 18.0.0 or higher
npm --version   # Should be 8.0.0 or higher
git --version   # Any recent version
docker --version && docker-compose --version  # Any recent version
```

## Quick Setup (Recommended)

The fastest way to get started is using Docker Compose:

```bash
# 1. Clone the repository
git clone https://github.com/rcdelacruz/learnhub-intern-project.git
cd learnhub-intern-project

# 2. Copy environment file
cp .env.example .env.local

# 3. Start all services with Docker
docker-compose up -d

# 4. Install dependencies (if not using Docker for development)
npm install

# 5. Generate Prisma client and push database schema
npm run db:generate
npm run db:push

# 6. Access the application
# - Application: http://localhost:3000
# - Database: localhost:5432
# - pgAdmin: http://localhost:5050 (admin@learnhub.com / admin)
```

## Manual Setup

If you prefer to set up services manually:

### 1. Clone and Install

```bash
git clone https://github.com/rcdelacruz/learnhub-intern-project.git
cd learnhub-intern-project
npm install
```

### 2. Database Setup

Start PostgreSQL using Docker:

```bash
docker run --name learnhub-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=learnhub \
  -p 5432:5432 \
  -d postgres:15-alpine
```

Or install PostgreSQL locally and create a database named `learnhub`.

### 3. Redis Setup (Optional for real-time features)

```bash
docker run --name learnhub-redis \
  -p 6379:6379 \
  -d redis:7-alpine
```

### 4. Environment Configuration

Copy and configure your environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/learnhub?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (optional for development)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### 5. Database Initialization

```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# (Optional) Seed with sample data
npm run db:seed
```

### 6. Start Development Server

```bash
npm run dev
```

## Development Tools

### Database Management

**Prisma Studio** (Recommended):
```bash
npm run db:studio
# Opens at http://localhost:5555
```

**pgAdmin** (If using Docker Compose):
- URL: http://localhost:5050
- Email: admin@learnhub.com
- Password: admin

### API Testing

Install a REST client like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code extension)

### Code Editor Setup

**VS Code Extensions** (Recommended):
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## Verification

After setup, verify everything works:

1. **Application loads**: Visit http://localhost:3000
2. **Database connected**: Check console for connection messages
3. **Hot reload works**: Edit a file and see changes
4. **Database operations**: Try creating a user account

## Common Issues

### Port Conflicts

If ports are already in use:

```bash
# Check what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Database Connection Issues

1. Ensure PostgreSQL is running
2. Check DATABASE_URL in .env.local
3. Verify database exists and credentials are correct

### Permission Issues on Windows

Run PowerShell as Administrator:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Docker Issues

1. Ensure Docker Desktop is running
2. Try restarting Docker
3. Clear Docker cache: `docker system prune -a`

## Next Steps

Once your environment is set up:

1. Read the [Development Setup Guide](development-setup.md)
2. Review the [Git Workflow](../git-workflow/branching-strategy.md)
3. Check your assigned [Module Documentation](../modules/course-management.md)

## Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Search existing [GitHub Issues](https://github.com/rcdelacruz/learnhub-intern-project/issues)
3. Ask in the team chat
4. Create a new issue with detailed error information