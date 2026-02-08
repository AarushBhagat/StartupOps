# 🚀 StartupOps - Complete Startup Management Platform

<div align="center">

![StartupOps Logo](https://img.shields.io/badge/StartupOps-Platform-blue?style=for-the-badge)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**A modern, AI-powered platform for startup teams to manage tasks, track metrics, and collaborate effectively.**

</div>

---

<div align="center">

# 📺 **[WATCH DEMO VIDEO HERE](https://drive.google.com/drive/folders/1-VDqbi1mQ9GNS_rUbqkKLuulUFbSBoU6)** 🎥

## **🎬 [StartupOps - Full Project Walkthrough & Demo](https://drive.google.com/drive/folders/1-VDqbi1mQ9GNS_rUbqkKLuulUFbSBoU6)**

### **🔗 Google Drive Link:** [https://drive.google.com/drive/folders/1-VDqbi1mQ9GNS_rUbqkKLuulUFbSBoU6](https://drive.google.com/drive/folders/1-VDqbi1mQ9GNS_rUbqkKLuulUFbSBoU6)

**The demo video includes:**
- ✅ Complete feature walkthrough
- ✅ Setup and deployment guide  
- ✅ Architecture overview
- ✅ Live platform demonstration
- ✅ AI features showcase

</div>

---

<div align="center">

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture)

</div>

---

## 🎯 Overview

**StartupOps** is a comprehensive platform designed to help startup teams streamline their operations, track key metrics, manage tasks, and leverage AI-powered insights for better decision-making. Built with modern web technologies and enterprise-grade security.

### Why StartupOps?

- ✅ **All-in-One Solution** - Tasks, analytics, team management, and investor tools in one place
- ✅ **AI-Powered** - Smart task generation, pitch analysis, and proactive insights
- ✅ **Role-Based Access** - Separate dashboards for leaders and team members
- ✅ **Real-Time Collaboration** - Live updates and notifications
- ✅ **Production Ready** - Enterprise-grade security with Row Level Security (RLS)
- ✅ **Modern Tech Stack** - React, TypeScript, Supabase, TailwindCSS

---

## ✨ Features

### 🎯 Core Features

#### For Startup Leaders
- **📊 Advanced Analytics Dashboard**
  - Revenue tracking (MRR, ARR)
  - Burn rate and runway calculations
  - Customer acquisition metrics
  - Growth charts and visualizations
  - Milestone progress tracking

- **💼 Investor Hub**
  - Pitch deck management
  - Fundraising status tracking
  - Investor readiness scoring
  - Document management

- **👥 Team Management**
  - Member roles and permissions
  - Activity monitoring
  - Performance insights

#### For Team Members
- **✅ Task Management**
  - Create, assign, and track tasks
  - Priority levels and deadlines
  - Status tracking (Todo, In Progress, Done)
  - Task filtering and search

- **📈 Personal Dashboard**
  - Task overview
  - Team activity feed
  - Quick actions

#### Shared Features
- **🤖 AI-Powered Tools**
  - Smart task generation based on context
  - Pitch deck analysis and scoring
  - Proactive insights and recommendations
  - Natural language processing

- **🔒 Authentication & Security**
  - Email/password authentication
  - Email verification
  - Password reset functionality
  - Role-based access control (RBAC)
  - Row Level Security (RLS)

- **💬 Feedback System**
  - Bug reporting
  - Feature requests
  - User feedback collection

- **⚙️ User Settings**
  - Email notifications toggle
  - Profile management
  - Theme preferences
  - Privacy settings

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND (React + TypeScript)          │
│                                                           │
│  ├── Components (40+ React Components)                   │
│  ├── Contexts (Auth, Theme)                             │
│  ├── Hooks (Custom React Hooks)                         │
│  ├── UI Library (Radix UI + shadcn/ui)                  │
│  └── Styling (TailwindCSS + Framer Motion)              │
└─────────────────────┬───────────────────────────────────┘
                      │ REST API / WebSocket
                      ↓
┌─────────────────────────────────────────────────────────┐
│                  SUPABASE BACKEND                        │
│                                                           │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │   Auth      │  │  PostgreSQL  │  │  Edge         │  │
│  │   System    │  │  Database    │  │  Functions    │  │
│  │             │  │              │  │  (AI)         │  │
│  │  - JWT      │  │  - 12 tables │  │  - GPT-4      │  │
│  │  - RBAC     │  │  - RLS       │  │  - Tasks      │  │
│  │  - Sessions │  │  - Triggers  │  │  - Pitch      │  │
│  └─────────────┘  └──────────────┘  └───────────────┘  │
│                                                           │
│  ┌─────────────┐  ┌──────────────┐                      │
│  │  Storage    │  │  Real-time   │                      │
│  │  (S3)       │  │  (WebSocket) │                      │
│  │             │  │              │                      │
│  │  - Avatars  │  │  - Live sync │                      │
│  │  - Docs     │  │  - Presence  │                      │
│  │  - Pitch    │  │  - Updates   │                      │
│  └─────────────┘  └──────────────┘                      │
└─────────────────────────────────────────────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────────────────────┐
│               EXTERNAL SERVICES                          │
│  - OpenAI API (AI features)                             │
│  - Email Service (Notifications)                        │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18.3.1
- **Language:** TypeScript 5.5
- **Build Tool:** Vite
- **Styling:** TailwindCSS + Custom CSS
- **UI Components:** Radix UI + shadcn/ui
- **Animations:** Framer Motion (Motion) + GSAP
- **Charts:** Recharts
- **Forms:** React Hook Form
- **Icons:** Lucide React + React Icons
- **Carousel:** Embla Carousel
- **State Management:** React Context API
- **Routing:** React Router (built-in)

### Backend
- **Platform:** Supabase (PostgreSQL)
- **Database:** PostgreSQL 15
- **Authentication:** Supabase Auth (JWT)
- **Storage:** Supabase Storage (S3-compatible)
- **Edge Functions:** Deno Runtime
- **AI Integration:** OpenAI GPT-4 API
- **Real-time:** Supabase Realtime (WebSocket)

### Database Schema
- **12 Tables:** profiles, startups, startup_members, subscriptions, tasks, milestones, metrics, investor_hub, feedback, ai_insights, user_settings, activity_log
- **Row Level Security (RLS)** on all tables
- **Automatic Triggers** for timestamps and calculations
- **Foreign Key Relationships** for data integrity

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- Node.js 18+ and npm installed
- A Supabase account ([sign up free](https://supabase.com))
- Git installed
- A code editor (VS Code recommended)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/AarushBhagat/StartupOps.git
cd StartupOps
```

### 2️⃣ Backend Setup (Supabase)

#### Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Name it "StartupOps"
3. Save your database password securely
4. Wait for project initialization (~2 minutes)

#### Run Database Migrations

Navigate to SQL Editor in your Supabase dashboard and run these files **in order**:

```sql
-- Run these scripts in order from Backend/database/
1. 01_schema.sql          (Creates all tables)
2. 02_triggers.sql        (Adds automatic triggers)
3. 03_rls_policies.sql    (Enables security policies)
4. 04_storage.sql         (Sets up file storage)
```

#### Deploy Edge Functions (Optional - for AI features)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy AI functions
cd Backend
supabase functions deploy ai-task-generator
supabase functions deploy ai-pitch-analyzer
supabase functions deploy ai-insights-generator
```

#### Get Your API Keys

1. Go to Settings → API in your Supabase dashboard
2. Copy `anon/public` key and `Project URL`
3. Keep these for the next step

**📖 Detailed Backend Guide:** See [Backend/README.md](Backend/README.md)

### 3️⃣ Frontend Setup

#### Install Dependencies

```bash
cd Frontend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the Frontend directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

**📖 Detailed Frontend Guide:** See [Frontend/README.md](Frontend/README.md)

### 4️⃣ Test the Application

1. **Sign Up:** Create a new account at `/signup`
2. **Verify Email:** Check your email for verification link (if enabled)
3. **Complete Onboarding:** Fill in your startup details
4. **Explore Dashboard:** Try the leader or team dashboard
5. **Create Tasks:** Add tasks and assign them
6. **Check Analytics:** View metrics and charts

---

## 📁 Project Structure

```
StartupOps/
├── Backend/                          # Supabase backend
│   ├── database/                     # SQL migration files
│   │   ├── 01_schema.sql            # Database schema
│   │   ├── 02_triggers.sql          # Automatic triggers
│   │   ├── 03_rls_policies.sql      # Security policies
│   │   ├── 04_storage.sql           # File storage setup
│   │   ├── 05_seed_data.sql         # Sample data
│   │   └── 09_healthai_demo_data_fixed.sql
│   ├── supabase/
│   │   ├── config.toml              # Supabase configuration
│   │   └── functions/               # Edge functions (AI)
│   │       ├── ai-task-generator/
│   │       ├── ai-pitch-analyzer/
│   │       └── ai-insights-generator/
│   ├── scripts/                     # Deployment scripts
│   ├── README.md                    # Backend documentation
│   ├── QUICKSTART.md               # Quick setup guide
│   ├── DATABASE.md                  # Database documentation
│   ├── DEPLOYMENT.md                # Deployment guide
│   └── SUMMARY.md                   # Architecture overview
│
├── Frontend/                         # React frontend
│   ├── src/
│   │   ├── components/              # 40+ React components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── LeaderDashboard.tsx
│   │   │   ├── TeamDashboard.tsx
│   │   │   ├── TasksPage.tsx
│   │   │   ├── AnalyticsPage.tsx
│   │   │   ├── InvestorHubPage.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── Onboarding.tsx
│   │   │   └── ui/                  # Reusable UI components
│   │   ├── contexts/                # React contexts
│   │   │   └── AuthContext.tsx      # Authentication state
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useUser.ts
│   │   │   ├── useTasks.ts
│   │   │   ├── useAnalytics.ts
│   │   │   ├── useStartups.ts
│   │   │   └── useAI.ts
│   │   ├── lib/                     # Utilities
│   │   │   ├── supabase.ts         # Supabase client
│   │   │   └── utils.ts            # Helper functions
│   │   ├── styles/                  # CSS files
│   │   ├── App.tsx                  # Main app component
│   │   └── main.tsx                 # Entry point
│   ├── public/                      # Static assets
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts              # Vite configuration
│   ├── tailwind.config.js          # TailwindCSS config
│   ├── tsconfig.json               # TypeScript config
│   └── .env.example                # Environment template
│
├── .gitignore
└── README.md                        # This file
```

---

## 📖 Documentation

### Comprehensive Guides

| Document | Description | Time to Read |
|----------|-------------|--------------|
| [Backend README](Backend/README.md) | Complete backend overview | 10 min |
| [Backend START_HERE](Backend/START_HERE.md) | First-time setup guide | 30 min |
| [Backend QUICKSTART](Backend/QUICKSTART.md) | Quick setup steps | 15 min |
| [Backend DATABASE](Backend/DATABASE.md) | Database schema & tables | 15 min |
| [Backend DEPLOYMENT](Backend/DEPLOYMENT.md) | Production deployment | 45 min |
| [Backend SUMMARY](Backend/SUMMARY.md) | Architecture overview | 10 min |
| [Backend STRUCTURE](Backend/STRUCTURE.md) | Folder organization | 5 min |

### Key Features Documentation

- **Authentication System:** JWT-based auth with email verification
- **Role-Based Access:** Leader and Team member roles with different permissions
- **Database Security:** Row Level Security (RLS) on all tables
- **AI Integration:** OpenAI GPT-4 for task generation, pitch analysis, insights
- **Real-time Updates:** WebSocket connections for live data sync
- **File Storage:** Avatar uploads, pitch decks, documents

---

## 🔐 Security Features

### Enterprise-Grade Protection

- ✅ **Row Level Security (RLS)** - Users only see their own data
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Role-Based Access Control** - Leader/Team member permissions
- ✅ **Startup Permissions** - Owner/Admin/Member levels
- ✅ **Password Hashing** - Bcrypt with proper salting
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **XSS Protection** - Input sanitization
- ✅ **CORS Configuration** - Controlled cross-origin requests
- ✅ **Environment Variables** - Secure credential management
- ✅ **API Rate Limiting** - DDoS protection

---

## 🎨 Screenshots

> Add screenshots of your application here:
> - Dashboard view
> - Task management
> - Analytics page
> - Investor hub
> - Mobile responsive views

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/AmazingFeature`
3. **Commit your changes:** `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch:** `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📝 To-Do / Roadmap

- [ ] Mobile app (React Native)
- [ ] Stripe payment integration
- [ ] Team chat/messaging
- [ ] Calendar integration
- [ ] Email notifications
- [ ] Advanced reporting
- [ ] API documentation
- [ ] Multi-language support
- [ ] Dark mode themes
- [ ] Export data functionality

---

## 🐛 Known Issues

- Email verification may be slow (check spam folder)
- File upload size limited to 50MB
- AI features require OpenAI API key

Report issues: [GitHub Issues](https://github.com/AarushBhagat/StartupOps/issues)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team / Authors

- **Developer:** Aarush
- **GitHub:** [@AarushBhagat](https://github.com/AarushBhagat)
- **Email:** aarushbhagat093@gmail.com

---

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Backend infrastructure
- [Radix UI](https://www.radix-ui.com/) - UI components
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [OpenAI](https://openai.com/) - AI capabilities
- [Vercel](https://vercel.com/) - Hosting platform

---

## 📞 Support

Need help? Here's where to reach us:

- **Documentation:** Check the [docs](Backend/README.md) first
- **Issues:** [GitHub Issues](https://github.com/AarushBhagat/StartupOps/issues)
- **Email:** aarushbhagat093@gmail.com

---

## ⭐ Star Us!

If you find this project useful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**Built with ❤️ by the StartupOps Team**

[Website](https://startupops.com) • [Documentation](Backend/README.md) • [Demo Video](https://drive.google.com/drive/folders/1-VDqbi1mQ9GNS_rUbqkKLuulUFbSBoU6)

</div>
