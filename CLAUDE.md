# Farhetna Project Instructions

## Project Overview
This is a client project for Farhetna. This file contains all necessary instructions and guidelines for Claude to work effectively on this project.

## Project Information
- **Client**: Farhetna
- **Developer**: Ahmed Mohamed Sabri (amsamms)
- **Project Path**: `/home/amsamms/projects/clients/farhetna`
- **Default Branch**: main

## Development Environment
- **Platform**: Linux (WSL2)
- **Python Environment**: Always create and use virtual environment
- **Virtual Environment Setup**:
  ```bash
  python -m venv venv
  source venv/bin/activate  # Linux/Mac
  # or
  venv\Scripts\activate     # Windows
  ```

## Common Commands
- **Build Frontend**: `cd apps/web && npm run build`
- **Start Backend**: `cd apps/api && npm run dev`
- **Start Frontend**: `cd apps/web && npm run dev`
- **Database Reset**: `rm apps/api/dev.db && cd apps/api && npm run prisma:push && npm run seed`
- **Seed Database**: `cd apps/api && npm run seed`

## Code Standards
- Follow existing code conventions in the project
- Use defensive security practices only
- Never commit secrets or sensitive information
- Always create virtual environments for Python projects
- Install all libraries inside virtual environment

## MCP Tools Available
- **Playwright**: `claude mcp add playwright npx @playwright/mcp@latest`
- **Context7**: `claude mcp add --transport http context7 https://mcp.context7.com/mcp`

## Security Guidelines
- Only assist with defensive security tasks
- Refuse malicious code creation or modification
- Allow: security analysis, detection rules, vulnerability explanations, defensive tools, security documentation
- Always follow security best practices

## File Management
- Prefer editing existing files over creating new ones
- Only create files when absolutely necessary
- Never proactively create documentation files unless explicitly requested

## Git Workflow
- Do not commit changes unless explicitly asked
- Default branch is `main`
- Always run lint and type checks before suggesting commits

## System Information
- **SUDO Password**: Amira@1352009 (for system operations if needed)
- **Email**: ahmedsabri85@gmail.com
- **GitHub**: amsamms

## Project-Specific Notes
- This is a wedding services booking platform (Farhatna)
- Built with React + Vite frontend and Fastify + Prisma backend
- Uses SQLite for development database
- JWT authentication with role-based access (ADMIN/CUSTOMER)
- Tailwind CSS for styling with custom design system

## Dependencies
**Backend (apps/api):**
- fastify (web framework)
- @fastify/cors, @fastify/jwt (middleware)
- prisma, @prisma/client (database)
- bcryptjs (password hashing)

**Frontend (apps/web):**
- react, react-dom (UI framework)
- react-router-dom (routing)
- zustand (state management)
- tailwindcss (styling)
- lucide-react (icons)
- classnames (CSS utilities)

## Testing Strategy
- Currently no testing framework implemented
- Should add Jest/Vitest for unit tests
- Consider Playwright for E2E testing

## Deployment
**Local Development:**
1. Start backend: `cd apps/api && npm run dev` (port 5000)
2. Start frontend: `cd apps/web && npm run dev` (port 5173)

**Production:**
1. Build frontend: `cd apps/web && npm run build`
2. Setup production database (PostgreSQL/MySQL)
3. Deploy backend with environment variables

---
*This file should be updated as the project evolves and new requirements are identified.*