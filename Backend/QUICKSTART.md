# StartupOps Backend - Quick Start Guide

## 🎯 **FASTEST PATH TO GET RUNNING** (30 minutes)

Follow these steps exactly and your backend will be fully functional!

---

## ✅ **Step 1: Create Supabase Account** (5 minutes)

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** → Sign up with GitHub (fastest)
3. Verify your email

---

## ✅ **Step 2: Create Project** (3 minutes)

1. Click **"New Project"**
2. Fill in:
   - **Organization**: Create new or select existing
   - **Project Name**: `StartupOps`
   - **Database Password**: Generate strong password → **SAVE IT!**
   - **Region**: Select closest to you
   - **Plan**: Free tier (perfect to start)
3. Click **"Create new project"**
4. Wait 2-3 minutes for setup ☕

---

## ✅ **Step 3: Connect Frontend** (2 minutes)

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these two values:
   - `Project URL`
   - `anon public` key

3. Create `.env` in your **Frontend folder**:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Restart frontend dev server: `npm run dev`

---

## ✅ **Step 4: Run Database Scripts** (8 minutes)

In Supabase Dashboard → **SQL Editor**:

### Run these scripts **IN ORDER** (copy & paste each entire file):

#### 4.1 Create Schema (3 min)
```
Copy all content from: Backend/database/01_schema.sql
Paste into SQL Editor → Click "Run"
```
✅ Should see: "✅ Database schema created successfully!"

#### 4.2 Create Triggers (2 min)
```
Copy all content from: Backend/database/02_triggers.sql
Paste into SQL Editor → Click "Run"
```
✅ Should see: "✅ Database triggers and functions created successfully!"

#### 4.3 Set Up Security (2 min)
```
Copy all content from: Backend/database/03_rls_policies.sql
Paste into SQL Editor → Click "Run"
```
✅ Should see: "✅ Row Level Security policies created successfully!"

#### 4.4 Set Up Storage (1 min)
```
Copy all content from: Backend/database/04_storage.sql
Paste into SQL Editor → Click "Run"
```
✅ Should see: "✅ Storage buckets and policies created successfully!"

#### 4.5 Add Test Data - OPTIONAL (1 min)
```
Copy all content from: Backend/database/05_seed_data.sql
Paste into SQL Editor → Click "Run"
```

---

## ✅ **Step 5: Deploy AI Functions** (10 minutes)

### Install Supabase CLI:

**Windows:**
```powershell
npm install -g supabase
```

**Mac/Linux:**
```bash
brew install supabase/tap/supabase
```

### Login & Deploy:

```bash
# Login to Supabase
supabase login

# Go to backend folder
cd Backend

# Link to your project (get ref from: Settings → General → Reference ID)
supabase link --project-ref your-project-ref-here

# Deploy all AI functions
supabase functions deploy ai-task-generator
supabase functions deploy ai-pitch-analyzer
supabase functions deploy ai-insights-generator
```

---

## ✅ **Step 6: Configure AI (OpenAI)** (3 minutes)

### Get OpenAI API Key:
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create account (if needed)
3. Click **"Create new secret key"**
4. Copy the key (starts with `sk-...`)

### Add to Supabase:

**Option A - Via CLI (Recommended):**
```bash
supabase secrets set OPENAI_API_KEY=sk-your-key-here
```

**Option B - Via Dashboard:**
1. Go to **Project Settings** → **Edge Functions**
2. Scroll to **Function Secrets**
3. Add secret:
   - Name: `OPENAI_API_KEY`
   - Value: `sk-your-key-here`
4. Click **"Add"**

---

## ✅ **Step 7: Test Everything** (5 minutes)

### 7.1 Test Auth:
```
1. Open frontend: http://localhost:5173
2. Click "Sign Up"
3. Create account with your email
4. Check email for verification link
5. Click link → Login
```
✅ If you can login → **Auth works!**

### 7.2 Test Database:
```
1. After login, create a startup
2. Go to Supabase → Table Editor → "startups"
3. See your startup there?
```
✅ If yes → **Database works!**

### 7.3 Test AI Functions:
```
1. In app, try creating tasks with AI
2. Or analyze a pitch
3. Check if it generates results
```
✅ If AI responds → **Everything works!**

---

## 🎉 **YOU'RE DONE!**

Your backend is fully functional with:
- ✅ Authentication & Authorization
- ✅ PostgreSQL Database
- ✅ Row Level Security
- ✅ File Storage
- ✅ AI-powered features
- ✅ Real-time capabilities

---

## 🐛 **Troubleshooting**

### "Missing Supabase environment variables"
→ Check Frontend/.env file exists and has correct values
→ Restart dev server: `npm run dev`

### "Row Level Security policy violation"
→ Run 03_rls_policies.sql again
→ Make sure you're logged in

### "Edge Function timeout"
→ Check OpenAI key is set: `supabase secrets list`
→ Check OpenAI account has credits

### "Can't upload files"
→ Run 04_storage.sql again
→ Check bucket exists in Supabase → Storage

### SQL script errors
→ Run scripts in exact order (01 → 02 → 03 → 04)
→ Check for previous errors in output

---

## 📊 **Verify Backend Health**

Go to Supabase Dashboard:

### Database:
✅ Go to **Table Editor** → Should see 12 tables

### Storage:
✅ Go to **Storage** → Should see 3 buckets

### Auth:
✅ Go to **Authentication** → Should see your test user

### Edge Functions:
✅ Go to **Edge Functions** → Should see 3 functions

---

## 🚀 **Next Steps**

### Production Deployment:
1. See `DEPLOYMENT.md` for production setup
2. Set up custom domain
3. Configure email templates
4. Set up monitoring

### Add Features:
1. Stripe payment integration
2. Email notifications
3. Slack/Discord webhooks
4. More AI features

---

## 💰 **Costs**

**Current Setup:**
- Supabase Free Tier: **$0/month**
- OpenAI (light usage): **$5-10/month**
- **Total: ~$5-10/month**

**When you scale:**
- Supabase Pro: $25/month (unlimited API requests)
- OpenAI (moderate): $20-50/month
- **Total: ~$45-75/month**

---

## 📚 **Resources**

- [Supabase Docs](https://supabase.com/docs)
- [Edge Functions Guide](https://supabase.com/docs/guides/functions)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [OpenAI API Docs](https://platform.openai.com/docs)

---

## 💬 **Need Help?**

- Supabase Discord: [discord.supabase.com](https://discord.supabase.com)
- OpenAI Community: [community.openai.com](https://community.openai.com)
- Check `DATABASE.md` for schema details

---

**Ready to ship? Let's GO! 🚀**
