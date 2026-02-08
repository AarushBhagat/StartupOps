# 🎨 StartupOps Frontend

**Modern, responsive React + TypeScript frontend for the StartupOps platform**

Built with React 18, TypeScript, Vite, TailwindCSS, and Radix UI components.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase backend configured (see [Backend README](../Backend/README.md))

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Add your Supabase credentials to .env
# VITE_SUPABASE_URL=your_project_url
# VITE_SUPABASE_ANON_KEY=your_anon_key

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📦 Tech Stack

### Core
- **React** 18.3.1 - UI library
- **TypeScript** 5.5 - Type safety
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS

### UI Components
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Beautiful component library
- **Lucide React** - Icon library
- **React Icons** - Additional icons

### Animations
- **Framer Motion** (Motion) - Advanced animations
- **GSAP** - Timeline-based animations

### Data & State
- **@supabase/supabase-js** - Backend client
- **React Context API** - State management
- **React Hook Form** - Form handling

### Charts & Visualization
- **Recharts** - Data visualization
- **Embla Carousel** - Carousels

---

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.tsx    # Main dashboard router
│   │   ├── LeaderDashboard.tsx
│   │   ├── TeamDashboard.tsx
│   │   ├── TasksPage.tsx
│   │   ├── AnalyticsPage.tsx
│   │   ├── InvestorHubPage.tsx
│   │   ├── FeedbackPage.tsx
│   │   ├── SettingsPage.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Onboarding.tsx
│   │   └── ui/             # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       └── ...
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication state
│   ├── hooks/              # Custom hooks
│   │   ├── useUser.ts      # User data hook
│   │   ├── useTasks.ts     # Task management
│   │   ├── useAnalytics.ts # Analytics data
│   │   ├── useStartups.ts  # Startup data
│   │   └── useAI.ts        # AI features
│   ├── lib/                # Utilities
│   │   ├── supabase.ts     # Supabase client
│   │   └── utils.ts        # Helper functions
│   ├── styles/             # CSS files
│   ├── assets/             # Images, fonts
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # TailwindCSS config
├── tsconfig.json          # TypeScript config
└── .env.example           # Environment template
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Type checking
npm run type-check   # Check TypeScript types

# Linting
npm run lint         # Run ESLint
```

---

## 🎯 Key Features

### Authentication
- Email/password signup and login
- Email verification
- Password reset
- Role-based access (Leader/Team)
- Protected routes

### Dashboards
- **Leader Dashboard**: Analytics, team overview, AI insights
- **Team Dashboard**: Tasks, activity feed, quick actions

### Task Management
- Create, edit, delete tasks
- Assign to team members
- Set priority and deadlines
- Filter and search
- Status tracking

### Analytics
- Revenue metrics (MRR, ARR)
- Burn rate and runway
- Customer acquisition
- Growth charts
- Milestone progress

### Investor Hub
- Pitch deck upload
- Fundraising status
- Investor readiness score
- Document management

### AI Features
- Smart task generation
- Pitch deck analysis
- Proactive insights

### Settings
- User profile management
- Email notifications
- Theme preferences
- Privacy settings

---

## 🔑 Environment Variables

Create a `.env` file with:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: OpenAI (for AI features)
VITE_OPENAI_API_KEY=your-openai-key
```

**Get your Supabase credentials:**
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the `URL` and `anon/public` key

---

## 🎨 Customization

### Theme
Edit colors in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {...},
      secondary: {...},
    }
  }
}
```

### Components
UI components are in `src/components/ui/` - fully customizable.

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

**Supabase connection error**
- Check `.env` file exists and has correct credentials
- Verify Supabase project is running
- Check network connection

**Type errors**
```bash
npm run type-check
```

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Supabase Docs](https://supabase.com/docs)

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

MIT License - see [LICENSE](../LICENSE) file.

---

**Built with ❤️ by the StartupOps Team**
  