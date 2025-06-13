# Git Branching Strategy

We follow a **GitFlow-inspired** branching strategy that balances collaboration with simplicity for our 7-intern team.

## Branch Structure

### Main Branches

- **`main`** - Production-ready code
  - Always deployable
  - Protected branch requiring PR reviews
  - Automatically deploys to production
  - Only accepts merges from `develop`

- **`develop`** - Integration branch
  - Latest development changes
  - Staging environment deployment
  - Where feature branches merge
  - Base for all feature development

### Supporting Branches

- **`feature/*`** - New features and enhancements
  - Branch from: `develop`
  - Merge to: `develop`
  - Naming: `feature/module-name-feature-description`
  - Examples: `feature/course-management-crud`, `feature/student-dashboard`

- **`bugfix/*`** - Bug fixes
  - Branch from: `develop` (or `main` for hotfixes)
  - Merge to: `develop` (and `main` for hotfixes)
  - Naming: `bugfix/issue-description`
  - Examples: `bugfix/login-error`, `bugfix/course-enrollment-fix`

- **`hotfix/*`** - Critical production fixes
  - Branch from: `main`
  - Merge to: both `main` and `develop`
  - Naming: `hotfix/critical-issue-description`

## Workflow Process

### 1. Feature Development

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/course-management-crud

# Work on your feature
# ... make changes, commit regularly ...

# Push feature branch
git push origin feature/course-management-crud

# Create Pull Request to develop
```

### 2. Module-Specific Branches

Each intern works primarily on their module:

```bash
# Course Management (Intern #1)
feature/course-management-*
bugfix/course-management-*

# Student Management (Intern #2)
feature/student-management-*
bugfix/student-management-*

# And so on...
```

## Branch Naming Conventions

### Feature Branches
- `feature/module-name-feature-description`
- `feature/course-management-lesson-creation`
- `feature/student-management-progress-tracking`
- `feature/payment-stripe-integration`

### Bug Fix Branches
- `bugfix/module-name-issue-description`
- `bugfix/course-management-video-upload`
- `bugfix/assessment-timer-issue`

### Documentation Branches
- `docs/section-name`
- `docs/api-documentation`
- `docs/deployment-guide`

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only changes
- **style**: Formatting, missing semicolons, etc.
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests
- **chore**: Maintain

### Examples
```bash
feat(course-management): add course creation form
fix(student-dashboard): resolve progress calculation bug
docs(api): update authentication endpoints
style(ui): format button components with prettier
refactor(database): optimize user queries
test(assessment): add unit tests for grading logic
chore(deps): update dependencies to latest versions
```

### Scope Guidelines
Use your module name as scope:
- `course-management`
- `student-management`
- `instructor-management`
- `assessment-system`
- `communication-system`
- `payment-enrollment`
- `analytics-reporting`

## Daily Workflow

### Morning Routine
```bash
# Sync with latest changes
git checkout develop
git pull origin develop

# Rebase your feature branch
git checkout feature/your-feature
git rebase develop

# Continue working
```

### Before Pushing
```bash
# Stage changes
git add .

# Commit with conventional message
git commit -m "feat(course-management): add lesson video upload"

# Push to remote
git push origin feature/your-feature
```

### End of Day
```bash
# Ensure all changes are committed and pushed
git status
git push origin feature/your-feature
```

## Code Review Process

### Before Creating PR
1. **Self-review**: Check your own code first
2. **Test**: Run tests locally
3. **Lint**: Fix any linting issues
4. **Rebase**: Rebase on develop if needed

### PR Requirements
- [ ] Descriptive title and description
- [ ] Reference related issues
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No merge conflicts
- [ ] CI/CD pipeline passing

### Review Guidelines
- **Be constructive**: Suggest improvements, don't just criticize
- **Be specific**: Point to exact lines and explain the issue
- **Be timely**: Review PRs within 24 hours
- **Be thorough**: Check functionality, not just syntax

## Emergency Procedures

### Hotfix Process
```bash
# For critical production bugs
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-fix

# Make minimal fix
# Test thoroughly
# Create PR to main AND develop

# After merge, ensure both branches are updated
```

### Rollback Process
```bash
# If production deployment fails
git checkout main
git revert <commit-hash>
git push origin main

# Coordinate with team lead
```

## Best Practices

### Do's ✅
- Pull before starting work
- Commit frequently with clear messages
- Keep feature branches focused and small
- Rebase before creating PR
- Write descriptive PR descriptions
- Tag team members for review

### Don'ts ❌
- Don't work directly on main or develop
- Don't force push to shared branches
- Don't commit large binary files
- Don't mix multiple features in one branch
- Don't merge without review
- Don't delete branches until fully merged

## Conflict Resolution

### Merge Conflicts
```bash
# During rebase or merge
git status  # See conflicted files

# Edit files to resolve conflicts
# Remove conflict markers (<<<<, ====, >>>>)

# Stage resolved files
git add <resolved-file>

# Continue rebase/merge
git rebase --continue
# or
git merge --continue
```

### Getting Help
1. Check Git documentation
2. Ask team members
3. Use GitHub's conflict resolution UI
4. Schedule pair programming session

## Tools and Aliases

### Useful Git Aliases
```bash
# Add to ~/.gitconfig
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
    lg = log --oneline --graph --decorate --all
    
# Usage
git co develop
git br feature/my-feature
git ci -m "feat: add new feature"
```

### VS Code Extensions
- GitLens
- Git Graph
- Git History
- GitHub Pull Requests

## Troubleshooting

### Common Issues

**Issue**: "Your branch is behind origin/develop"
```bash
git pull origin develop
# or
git fetch origin
git rebase origin/develop
```

**Issue**: "Cannot push to protected branch"
```bash
# Create PR instead of direct push
# Ensure you're not on main/develop
git checkout -b feature/my-fix
```

**Issue**: "Merge conflicts in package-lock.json"
```bash
# Delete and regenerate
rm package-lock.json
npm install
git add package-lock.json
```

This branching strategy ensures smooth collaboration while maintaining code quality and deployment safety.