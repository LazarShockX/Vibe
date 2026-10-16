# 🍃 Vibe

An AI-powered app that supports the development of web applications by interpreting user-provided prompts and autonomously generating corresponding code, structure, and interactive components. Built with Next.js, TypeScript, and integrated with OpenAI. Check out the app on Vercel: [vibe-two-ruddy.vercel.app/](https://vibe-two-ruddy.vercel.app/)

<p align="center">
  <img width="751" height="585" alt="Screenshot 2025-12-21 at 21 22 29" src="https://github.com/user-attachments/assets/d64e38cd-152e-4b5b-8b48-a50f6cbcd235" />
</p>

**Note:** AI features, such as code generation, are unavailable when the associated OpenAI account has insufficient credits.

## ✨ Features

### AI-Powered App Building
- Build web apps by describing an idea in natural language
- Live project preview with URL access
- Project and conversation history alongside generated code files
- Credit system with usage tracking

### Authentication & Security
- Secure authentication with Clerk
- User session management
- Protected routes and API endpoints

### Premium Features
- **Free Tier**: 3 monthly credits
- **Pro**: 100 monthly credits
- Subscription management via Clerk

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Form handling and validation
- **shadcn/ui** - Customizable and reusable components

### Backend & Database
- **tRPC** - End-to-end typesafe APIs
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Primary database (via Neon)

### AI
- **OpenAI** - Code generation
- **Inngest** - Background job processing and agent networks

### Additional Tools
- **[Clerk](https://clerk.com/)** - Authentication system and subscription billing
- **[E2B](https://e2b.dev/)** - Secure Cloud Sandbox for executing AI generated code
- **Docker** - Custom sandbox templates
- **TanStack Query** - Data fetching and caching

## 🚀 Getting Started

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# OpenAI
OPENAI_API_KEY="your_openai_api_key"

# E2B
E2B_API_KEY="your_e2b_api_key"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_next_public_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/"
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npx prisma generate` - Generate Prisma Client from schema
- `npx prisma db push` - Sync schema changes to the database
- `npx inngest-cli@latest dev` - Run Inngest Dev Server
