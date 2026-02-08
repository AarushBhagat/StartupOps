# 🚀 StartupOps Backend

## Complete Backend Infrastructure for Your Startup Platform

**Built with Supabase** - Production-ready in 30 minutes!

---

## 🎯 **START HERE**

**👉 New to this? Read: [START_HERE.md](START_HERE.md)** ⭐

This file has **everything you need** to get your backend running in 30 minutes.

---

## 📚 **Quick Navigation**

| What You Need | Read This | Time |
|---------------|-----------|------|
| 🆕 **First time setup** | [START_HERE.md](START_HERE.md) | 30 min |
| ⚡ **Quick setup guide** | [QUICKSTART.md](QUICKSTART.md) | 30 min |
| 📊 **Understand the database** | [DATABASE.md](DATABASE.md) | 15 min |
| 🚀 **Deploy to production** | [DEPLOYMENT.md](DEPLOYMENT.md) | 45 min |
| 📖 **Complete overview** | [SUMMARY.md](SUMMARY.md) | 10 min |
| 📁 **Folder structure** | [STRUCTURE.md](STRUCTURE.md) | 5 min |

---

## ✨ **What's Included**

### ✅ **Complete Backend Infrastructure**
- **PostgreSQL Database** (12 tables)
- **Authentication System** (email/password, roles)  
- **File Storage** (avatars, docs, pitch decks)
- **AI Features** (task generation, pitch analysis, insights)
- **Real-time Sync** (WebSocket connections)
- **Row Level Security** (enterprise-grade protection)

### ✅ **Ready-to-Use Features**
- User authentication & authorization
- Role-based access control (Leader/Team)
- Startup team management
- Task & milestone tracking
- Analytics & metrics
- AI-powered recommendations
- File uploads & storage
- Activity logging

### ✅ **Developer Experience**
- Complete TypeScript types
- Automatic migrations
- Test data included
- Comprehensive docs
- Production-ready

---

## 🏗️ **Architecture**

```
Your Frontend (React)
        ↓
   Supabase Backend
   ├── PostgreSQL Database (12 tables)
   ├── Authentication (JWT)
   ├── Storage (3 buckets)
   ├── Edge Functions (AI)
   └── Real-time (WebSocket)
        ↓
   OpenAI GPT-4 (AI features)
```

---

## 🚀 **30-Minute Setup**

### **Step 1: Create Account** (3 min)
- Go to [supabase.com](https://supabase.com)
- Sign up (GitHub recommended)
- Create project: "StartupOps"
- Save database password!

### **Step 2: Run SQL Scripts** (8 min)
- Open SQL Editor in Supabase
- Run these files **in order**:
  1. `database/01_schema.sql`
  2. `database/02_triggers.sql`
  3. `database/03_rls_policies.sql`
  4. `database/04_storage.sql`

### **Step 3: Deploy AI Functions** (10 min)
```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_REF
supabase functions deploy ai-task-generator
supabase functions deploy ai-pitch-analyzer
supabase functions deploy ai-insights-generator
```

### **Step 4: Configure Everything** (7 min)
1. Get OpenAI API key from [platform.openai.com](https://platform.openai.com)
2. Set secret: `supabase secrets set OPENAI_API_KEY=sk-...`
3. Create `.env` in Frontend folder:
   ```env
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
4. Restart frontend: `npm run dev`

### **Step 5: Test!** (2 min)
1. Open app: `http://localhost:5173`
2. Sign up → Create startup → Create task
3. Try AI task generation
4. ✅ **Done! Your backend is live!**

---

## 🎉 **That's It!**

Your backend is now **fully operational** with:
- ✅ Authentication & authorization
- ✅ Complete database (12 tables)
- ✅ File storage (3 buckets)
- ✅ AI features (3 Edge Functions)
- ✅ Real-time sync
- ✅ Enterprise security

---

## 📖 **Documentation**

| File | Purpose |
|------|---------|
| [START_HERE.md](START_HERE.md) | ⭐ Complete walkthrough |
| [QUICKSTART.md](QUICKSTART.md) | Detailed setup guide |
| [DATABASE.md](DATABASE.md) | Schema reference |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment |
| [SUMMARY.md](SUMMARY.md) | Feature overview |
| [STRUCTURE.md](STRUCTURE.md) | Folder organization |

---

## 🔐 **Security Built-In**

✅ **Row Level Security** - Users only see their data  
✅ **Role-Based Access** - Leader vs Team permissions  
✅ **JWT Authentication** - Secure tokens  
✅ **Encrypted Passwords** - bcrypt hashing  
✅ **SQL Injection Prevention** - Parameterized queries  
✅ **CORS Protection** - Origin validation  

---

## 🤖 **AI Features**

### **Task Generator** 🎯
Generate smart, contextual tasks based on startup stage and goals.

### **Pitch Analyzer** 📊
Score pitch decks on 6 dimensions with actionable feedback.

### **Insights Generator** 💡
Proactive recommendations based on metrics and patterns.

---

## 💰 **Costs**

### **Free Tier** (Perfect for MVP)
- 500MB database
- 1GB storage
- 50K monthly users
- 500K function calls
- **Cost: $0/month**

### **Production** (When you scale)
- Supabase Pro: $25/mo
- OpenAI: $10-30/mo
- **Total: ~$35-55/mo**

---

## 🐛 **Troubleshooting**

**Missing environment variables?**  
→ Check Frontend/.env exists and restart server

**RLS policy violation?**  
→ Run 03_rls_policies.sql again, ensure logged in

**Edge Function timeout?**  
→ Verify OpenAI key: `supabase secrets list`

**Can't upload files?**  
→ Run 04_storage.sql, check buckets exist

See [QUICKSTART.md](QUICKSTART.md) for detailed troubleshooting.

---

## 📚 **What's Next?**

1. **Customize** - Email templates, branding, settings
2. **Test** - Try all features with real data
3. **Deploy** - Follow [DEPLOYMENT.md](DEPLOYMENT.md) for production
4. **Scale** - Add payment, notifications, integrations

---

## 🔗 **Resources**

- [Supabase Docs](https://supabase.com/docs)
- [Edge Functions Guide](https://supabase.com/docs/guides/functions)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Supabase Discord](https://discord.supabase.com)

---

**Built with:**
- [Supabase](https://supabase.com) - Backend platform
- [PostgreSQL](https://postgresql.org) - Database
- [Deno](https://deno.land) - Edge runtime
- [OpenAI](https://openai.com) - AI features

**Status: 🟢 PRODUCTION READY**

---

**Ready to ship? Start with [START_HERE.md](START_HERE.md)! 🚀**
