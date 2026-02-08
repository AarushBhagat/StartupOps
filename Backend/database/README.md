# HealthAI Demo Database Setup

Comprehensive mock data for **HealthAI** - an AI-powered diagnostic assistant for judges presentation. This creates a complete, realistic startup dashboard with 8 months of growth history.

## 🎯 What Gets Created

After running these scripts, you'll have a fully populated HealthAI startup dashboard with:

- **1 Startup**: HealthAI (AI diagnostic assistant for healthcare)
- **8 Milestones**: Complete journey from MVP to Series A (3 completed, 2 in-progress, 3 upcoming)
- **30 Tasks**: Realistic mix - 6 completed, 19 in-progress, 5 todo
- **7 Months of Metrics**: Growth from 12 → 347 doctors, $0 → $98K MRR
- **6 Doctor Testimonials**: Authentic feedback from Cleveland Clinic, Mayo Clinic, Johns Hopkins, etc.
- **10 Activity Logs**: Recent achievements (partnerships, funding, product launches)
- **6 AI Insights**: Strategic recommendations with priority levels and action items
- **Investor Hub**: 89/100 pitch score, Series A stage, $2M raised/$10M target

## 📋 Prerequisites

1. **Supabase Project**: Have your Supabase project URL and keys ready
   - Project ID: `dmzojcammdzbghwugiej` (or your project ID)
   - Access to SQL Editor in Supabase dashboard

2. **Schema Setup**: Ensure `01_schema.sql` has been executed first
   - Creates all tables: startups, milestones, tasks, metrics, feedback, etc.
   - Sets up RLS policies and custom ENUM types

3. **Frontend Running**: Have the app running locally (optional, for testing)
   - URL: `http://localhost:3002` (or your dev server URL)

## 🚀 Setup Instructions

### Step 1: Create Demo User

1. Open [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to your project → **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of `00_create_demo_user.sql`
5. Click **Run** (or press `Ctrl+Enter`)

**What this does:**
- Creates user account: `jhanviarora11105@gmail.com` / `abc123`
- Sets up authentication in `auth.users` and `auth.identities`
- Confirms email automatically (no verification needed)

**Expected Output:**
```
NOTICE: User created successfully with ID: [uuid]
```

Or if already exists:
```
NOTICE: User already exists with ID: [uuid]
```

### Step 2: Load HealthAI Demo Data

1. In the same SQL Editor, open a **New Query**
2. Copy and paste the contents of `09_healthai_demo_data_fixed.sql`
3. Click **Run** (or press `Ctrl+Enter`)

**What this does:**
- Creates HealthAI startup owned by the demo user
- Populates all 8 milestones with realistic timelines
- Adds 30 detailed tasks across Development, Compliance, Sales, etc.
- Inserts 7 months of growth metrics showing accelerating progress
- Adds 6 authentic doctor testimonials from major hospitals
- Creates 10 recent activity logs (partnerships, funding events)
- Generates 6 AI insights with strategic recommendations

**Expected Output:**
```
status: HealthAI Demo Data Loaded Successfully!
milestones: 8
tasks: 30
metrics: 7
feedback_entries: 6
activities: 10
ai_insights: 6
```

### Step 3: Login and Explore

1. Go to your app: `http://localhost:3002` (or your frontend URL)
2. Click **Login** or **Sign In**
3. Enter credentials:
   - **Email**: `jhanviarora11105@gmail.com`
   - **Password**: `abc123`
4. You'll be redirected to the HealthAI dashboard

## 🎨 Dashboard Features to Show Judges

### **Roadmap & Milestones**
- 8 milestones covering 8-month journey
- Status indicators: ✅ Completed | 🔄 In Progress | ⏳ Not Started
- Clear progression from MVP → Seed Funding → Series A

### **Task Management (30 Tasks)**
- **Completed (6)**: HIPAA compliance, clinical trials, OKR framework
- **In Progress (19)**: FDA submission, Series A prep, enterprise deals
- **Todo (5)**: Healthcare conference, board meetings, SOC 2
- Tags: Development, AI, Compliance, Sales, Clinical, etc.
- Priority levels: Urgent, High, Medium

### **Growth Metrics (7 Months)**
| Month | MRR | Active Doctors | Burn Rate | CAC |
|-------|-----|----------------|-----------|-----|
| Month 1 | $0 | 12 | $180K | $5,200 |
| Month 4 | $28K | 89 | $210K | $3,600 |
| **Current** | **$98K** | **347** | **$255K** | **$2,400** |

**Key Insights:**
- 📈 MRR growing ~40% monthly
- 📈 Customer base expanding rapidly
- 📉 CAC decreasing (excellent unit economics)
- 💰 Monthly burn controlled at ~$255K

### **Doctor Testimonials (6 Entries)**
Real feedback from:
- Dr. Sarah Chen (Mayo Clinic) - 40% improvement in diagnosis time
- Dr. Michael Rodriguez (Johns Hopkins) - Radiology accuracy breakthrough
- Dr. Emily Thompson (Cleveland Clinic) - MRI analysis excellence
- Dr. James Park (Stanford) - 94% accuracy in clinical trials
- Dr. Lisa Patel (UCSF) - HIPAA compliance leadership
- Dr. Robert Martinez (MGH) - Lung cancer screening success

### **Activity Feed (10 Recent Events)**
- ✅ Completed HIPAA Compliance Audit
- 📊 Updated FDA submission progress (75%)
- 💼 Signed Cleveland Clinic pilot ($150K)
- 💰 Received a16z Bio + Health term sheet ($10M Series A)
- 🚀 Launched Multi-Modal Analysis v2.0
- 👥 Hired VP of Clinical Affairs from Johns Hopkins

### **AI Insights (6 Strategic Recommendations)**
1. **Enterprise Healthcare Partnerships** (High Priority)
   - Opportunity: $5M+ ARR from 3-4 major hospital contracts
2. **FDA Regulatory Timeline Risk** (High Priority)
   - Warning: 6-12 month approval timeline is aggressive
3. **Reduce Customer Acquisition Cost** (Medium)
   - Optimization: CAC down to $1,800 via referral programs
4. **International Expansion** (Medium)
   - Trend: EU market growing at 42% CAGR
5. **Strategic Partnerships with GE Healthcare** (High)
   - Opportunity: Distribution to 10,000+ hospitals
6. **Optimize Model Inference Costs** (Medium)
   - Performance: 40% cost reduction possible

### **Investor Hub**
- 🎯 Pitch Score: **89/100** (Excellent)
- 💰 Fundraising: **Series A** stage
- 📊 Target: **$10M** | Raised: **$2M** (from seed)
- ✅ All readiness flags: Problem defined, Solution articulated, Team complete, etc.
- 👥 Customer testimonials: **6** (from top hospitals)

## 🔧 Troubleshooting

### Error: "User jhanviarora11105@gmail.com not found"
**Solution:** Run `00_create_demo_user.sql` first before running the demo data script.

### Error: "duplicate key value violates unique constraint"
**Solution:** Data already exists. To reset:
```sql
-- Delete existing HealthAI data
DELETE FROM startups WHERE id = '550e8400-e29b-41d4-a716-446655440000';
-- This cascades to all related tables
-- Then re-run 09_healthai_demo_data_fixed.sql
```

### Error: "column 'user_name' does not exist"
**Solution:** Make sure you're using the latest version of `09_healthai_demo_data_fixed.sql` that matches the schema.

### Error: "invalid input value for enum"
**Solution:** Verify `01_schema.sql` was run first to create all ENUM types:
- `startup_stage`, `member_role`, `task_status`, `milestone_status`, etc.

### Can't login with demo credentials
1. Verify user exists:
   ```sql
   SELECT id, email, email_confirmed_at 
   FROM auth.users 
   WHERE email = 'jhanviarora11105@gmail.com';
   ```
2. Check Supabase Auth settings (Email auth should be enabled)
3. Verify frontend is connected to correct Supabase project

## 📁 File Structure

```
Backend/database/
├── 01_schema.sql                      # Core database schema (run first)
├── 00_create_demo_user.sql            # Demo user creation
├── 09_healthai_demo_data_fixed.sql    # HealthAI mock data (comprehensive)
└── README.md                          # This file
```

## 🎭 Demo Credentials

**Email:** `jhanviarora11105@gmail.com`  
**Password:** `abc123`

⚠️ **Security Note:** These are demo credentials for presentation purposes only. Never use simple passwords in production!

## 📊 Data Timeline

The demo data spans **8 months** of realistic startup growth:

- **8 months ago**: Company founded, MVP development started
- **6 months ago**: Seed funding ($2M), first doctors onboarded
- **4 months ago**: Clinical validation completed (94% accuracy)
- **2 months ago**: HIPAA compliance achieved, MRR growing
- **Current**: 347 doctors, $98K MRR, preparing Series A ($10M target)

## 💡 Tips for Judge Presentation

1. **Start with Dashboard Overview**: Show the comprehensive view with all metrics
2. **Highlight Growth Trajectory**: Demonstrate 7-month metrics progression
3. **Show Real Testimonials**: Doctor feedback from Mayo Clinic, Johns Hopkins, etc.
4. **Discuss AI Insights**: Strategic recommendations show product intelligence
5. **Present Investor Readiness**: 89/100 pitch score, all readiness flags ✅
6. **Navigate Live Features**: Click through milestones, tasks, feedback, activity feed

## 🔄 Resetting Demo Data

To clean up and start fresh:

```sql
-- Remove HealthAI startup (cascades to all related data)
DELETE FROM startups WHERE id = '550e8400-e29b-41d4-a716-446655440000';

-- Optional: Remove demo user
DELETE FROM auth.users WHERE email = 'jhanviarora11105@gmail.com';
```

Then re-run both SQL scripts.

## 📞 Support

If you encounter issues:
1. Check Supabase logs in Dashboard → Logs
2. Verify schema matches by reviewing `01_schema.sql`
3. Ensure all ENUM types are created
4. Check RLS policies are not blocking inserts

---

**Ready to impress the judges!** 🚀

This demo showcases:
- ✅ Real-world startup progression
- ✅ Comprehensive feature set
- ✅ Data-driven decision making
- ✅ AI-powered insights
- ✅ Investor-ready metrics
