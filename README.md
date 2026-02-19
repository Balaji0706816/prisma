# PrismaWeb - Next.js Project with Prisma & Neon Database

This is a [Next.js](https://nextjs.org) project with Prisma ORM and Neon PostgreSQL database, featuring authentication and an admin panel for lead management.

## Project Setup Process

### 1. Initial Setup
- Created Next.js project using `create-next-app`
- Installed all necessary dependencies

### 2. Database Configuration
- Created a project on [Neon.com](https://neon.com) (serverless PostgreSQL)
- Retrieved database connection strings (DATABASE_URL and DIRECT_URL)
- Added connection strings to `.env.local` file
- Configured Prisma with Neon adapter (`@prisma/adapter-neon`)

### 3. Database Schema Setup
Created Prisma schema (`prisma/schema.prisma`) with the following models:

**Authentication Models:**
- `User` - User accounts with role-based access (USER/ADMIN)
- `Account` - OAuth account connections
- `Session` - User sessions
- `VerificationToken` - Email verification tokens

**Business Models:**
- `Lead` - Contact form submissions with status tracking (NEW, CONTACTED, QUALIFIED, WON, LOST, SPAM)
- `Service` - Available services
- `Industry` - Industry categories
- `LeadService` - Many-to-many relationship between leads and services
- `DocPage` - Documentation pages

### 4. Authentication Setup
- Configured NextAuth v5 with GitHub OAuth provider
- Set up Prisma adapter for database sessions
- Created authentication route handler at `/app/api/auth/[...nextauth]/route.ts`
- Implemented role-based access control (ADMIN role)
- Session management with database strategy

### 5. Admin Panel
- Created protected admin layout (`/app/admin/layout.tsx`)
  - Requires authentication
  - Checks for ADMIN role
  - Redirects unauthorized users
- Built admin dashboard (`/app/admin/page.tsx`)
- Created leads management page (`/app/admin/leads/page.tsx`)
  - Displays all leads with details
  - Shows industry, services, and status
  - Table view with sorting by creation date

### 6. API Routes
- **POST `/api/leads`** - Lead submission endpoint
  - Validates input with Zod schema
  - Includes honeypot anti-spam protection
  - Creates lead with associated services and industry
  - Returns success response with lead ID

### 7. Configuration Files
- **`next.config.ts`** - Webpack configuration for proper module resolution
- **`postcss.config.mjs`** - Tailwind CSS v4 configuration
- **`tsconfig.json`** - TypeScript configuration with path aliases
- **`auth.ts`** - NextAuth configuration with GitHub provider

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **Database:** Neon PostgreSQL (serverless)
- **ORM:** Prisma 7.4.0
- **Authentication:** NextAuth v5 (beta)
- **Validation:** Zod
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript

## Getting Started

### Prerequisites
- Node.js installed
- Neon database account (or any PostgreSQL database)
- GitHub OAuth app credentials (for authentication)

### Environment Variables
Create a `.env.local` file with:

```env
DATABASE_URL="your-neon-database-url"
DIRECT_URL="your-neon-direct-url"
GITHUB_ID="your-github-oauth-client-id"
GITHUB_SECRET="your-github-oauth-client-secret"
```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
prismaweb/
├── app/
│   ├── admin/           # Admin panel pages
│   │   ├── layout.tsx   # Protected admin layout
│   │   ├── page.tsx     # Admin dashboard
│   │   └── leads/       # Leads management
│   ├── api/
│   │   ├── auth/        # NextAuth routes
│   │   └── leads/       # Lead API endpoints
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── lib/
│   └── db.ts           # Prisma client instance
├── prisma/
│   └── schema.prisma   # Database schema
├── auth.ts             # NextAuth configuration
└── next.config.ts      # Next.js configuration
```

## Features Implemented

✅ Database connection with Neon PostgreSQL  
✅ Prisma ORM setup with Neon adapter  
✅ NextAuth authentication with GitHub OAuth  
✅ Role-based access control (ADMIN/USER)  
✅ Protected admin panel  
✅ Leads management system  
✅ API endpoint for lead submissions  
✅ Input validation with Zod  
✅ Anti-spam protection (honeypot)  
✅ Tailwind CSS styling  
✅ TypeScript type safety  

## Next Steps

- [ ] Build public-facing contact form
- [ ] Add lead status update functionality
- [ ] Implement service and industry management
- [ ] Add documentation pages
- [ ] Deploy to production

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth Documentation](https://next-auth.js.org)
- [Neon Documentation](https://neon.tech/docs)
