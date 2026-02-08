-- ============================================
-- Dynamic Seed Data (Works with YOUR actual user)
-- ============================================
-- This creates test data using your current Supabase user

BEGIN;

-- ============================================
-- Get your current user ID (you'll need to replace this)
-- Run this query first to get your user ID:
-- SELECT id, email FROM auth.users;
-- Then replace YOUR_USER_ID below with your actual UUID
-- ============================================

-- Example: If your user ID is 'abc123...', replace below
-- For now, we'll create a test startup with sample data

-- ============================================
-- TEST STARTUP
-- ============================================

INSERT INTO startups (id, name, industry, description, stage, owner_id)
SELECT 
  '10000000-0000-0000-0000-000000000001'::uuid,
  'TechStartup Demo',
  'SaaS',
  'AI-powered productivity platform for remote teams',
  'mvp',
  id
FROM auth.users
WHERE email = (SELECT email FROM auth.users LIMIT 1)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STARTUP MEMBER (Your account)
-- ============================================

INSERT INTO startup_members (startup_id, user_id, role, permissions)
SELECT 
  '10000000-0000-0000-0000-000000000001'::uuid,
  id,
  'owner',
  '{"can_edit": true, "can_delete": true, "can_invite": true}'::jsonb
FROM auth.users
WHERE email = (SELECT email FROM auth.users LIMIT 1)
ON CONFLICT (startup_id, user_id) DO NOTHING;

-- ============================================
-- TEST MILESTONES
-- ============================================

INSERT INTO milestones (id, startup_id, title, description, due_date, status, progress, created_by)
SELECT 
  '20000000-0000-0000-0000-000000000001'::uuid,
  '10000000-0000-0000-0000-000000000001'::uuid,
  'MVP Launch',
  'Complete and launch minimum viable product',
  CURRENT_DATE + INTERVAL '30 days',
  'in_progress',
  45,
  id
FROM auth.users
WHERE email = (SELECT email FROM auth.users LIMIT 1)
ON CONFLICT (id) DO NOTHING;

INSERT INTO milestones (id, startup_id, title, description, due_date, status, progress, created_by)
SELECT 
  '20000000-0000-0000-0000-000000000002'::uuid,
  '10000000-0000-0000-0000-000000000001'::uuid,
  'First 100 Users',
  'Acquire our first 100 paying customers',
  CURRENT_DATE + INTERVAL '60 days',
  'not_started',
  0,
  id
FROM auth.users
WHERE email = (SELECT email FROM auth.users LIMIT 1)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- TEST TASKS
-- ============================================

INSERT INTO tasks (startup_id, milestone_id, title, description, status, priority, assignee_id, estimated_hours, due_date, created_by)
SELECT 
  '10000000-0000-0000-0000-000000000001'::uuid,
  '20000000-0000-0000-0000-000000000001'::uuid,
  'Design landing page',
  'Create mockups and final designs for the marketing landing page',
  'done',
  'high',
  id,
  8,
  CURRENT_DATE + INTERVAL '5 days',
  id
FROM auth.users
WHERE email = (SELECT email FROM auth.users LIMIT 1);

INSERT INTO tasks (startup_id, milestone_id, title, description, status, priority, assignee_id, estimated_hours, due_date, created_by)
SELECT 
  '10000000-0000-0000-0000-000000000001'::uuid,
  '20000000-0000-0000-0000-000000000001'::uuid,
  'Build authentication system',
  'Implement user signup, login, and password reset flows',
  'in-progress',
  'high',
  id,
  16,
  CURRENT_DATE + INTERVAL '10 days',
  id
FROM auth.users
WHERE email = (SELECT email FROM auth.users LIMIT 1);

INSERT INTO tasks (startup_id, milestone_id, title, description, status, priority, estimated_hours, due_date, created_by)
SELECT 
  '10000000-0000-0000-0000-000000000001'::uuid,
  '20000000-0000-0000-0000-000000000001'::uuid,
  'Set up analytics dashboard',
  'Configure Google Analytics and Mixpanel tracking',
  'todo',
  'medium',
  8,
  CURRENT_DATE + INTERVAL '15 days',
  id
FROM auth.users
WHERE email = (SELECT email FROM auth.users LIMIT 1);

INSERT INTO tasks (startup_id, title, description, status, priority, assignee_id, estimated_hours, due_date, created_by)
SELECT 
  '10000000-0000-0000-0000-000000000001'::uuid,
  'Write product documentation',
  'Create user guides and API documentation',
  'todo',
  'low',
  id,
  12,
  CURRENT_DATE + INTERVAL '20 days',
  id
FROM auth.users
WHERE email = (SELECT email FROM auth.users LIMIT 1);

INSERT INTO tasks (startup_id, title, description, status, priority, assignee_id, estimated_hours, due_date, created_by)
SELECT 
  '10000000-0000-0000-0000-000000000001'::uuid,
  'Design mobile app mockups',
  'Create initial designs for iOS and Android apps',
  'in-progress',
  'high',
  id,
  20,
  CURRENT_DATE + INTERVAL '12 days',
  id
FROM auth.users
WHERE email = (SELECT email FROM auth.users LIMIT 1);

-- ============================================
-- TEST METRICS
-- ============================================

INSERT INTO metrics (startup_id, mrr, users_count, active_users, growth_rate, burn_rate, runway_months, cash_balance)
VALUES 
  (
    '10000000-0000-0000-0000-000000000001'::uuid,
    2500,
    45,
    32,
    15.5,
    8000,
    18,
    144000
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- TEST INVESTOR HUB
-- ============================================

INSERT INTO investor_hub (
  startup_id, 
  pitch_score, 
  problem_defined, 
  solution_articulated, 
  team_complete,
  fundraising_stage,
  target_amount,
  raised_amount
)
VALUES (
  '10000000-0000-0000-0000-000000000001'::uuid,
  87,
  true,
  true,
  false,
  'seed',
  500000,
  150000
)
ON CONFLICT (startup_id) DO NOTHING;

-- ============================================
-- TEST AI INSIGHTS
-- ============================================

INSERT INTO ai_insights (
  startup_id, 
  insight_type, 
  title, 
  description, 
  priority,
  category,
  action_items
)
VALUES 
  (
    '10000000-0000-0000-0000-000000000001'::uuid,
    'suggestion',
    'Strong MRR growth this month',
    'Your MRR grew 15% this month ($2,175 to $2,500). This is excellent momentum that puts you on track for $3,500 MRR by next quarter.',
    'low',
    'growth',
    ARRAY['Document successful acquisition channels', 'Plan scaling strategy']
  ),
  (
    '10000000-0000-0000-0000-000000000001'::uuid,
    'warning',
    'Several tasks unassigned',
    'You have unassigned high-priority tasks. Assign clear ownership to improve completion rates.',
    'high',
    'operations',
    ARRAY['Review unassigned tasks in next standup', 'Assign clear ownership']
  ),
  (
    '10000000-0000-0000-0000-000000000001'::uuid,
    'milestone',
    'MVP Launch is 45% complete',
    'Great progress on your MVP Launch milestone. At the current pace, you are on track to launch on schedule.',
    'medium',
    'progress',
    ARRAY['Maintain current velocity', 'Plan launch marketing']
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- TEST ACTIVITY LOG
-- ============================================

INSERT INTO activity_log (startup_id, user_id, action, entity_type, entity_id)
SELECT 
  '10000000-0000-0000-0000-000000000001'::uuid,
  id,
  'created',
  'task',
  (SELECT id FROM tasks WHERE title = 'Design landing page' LIMIT 1)
FROM auth.users
WHERE email = (SELECT email FROM auth.users LIMIT 1);

INSERT INTO activity_log (startup_id, user_id, action, entity_type, entity_id)
SELECT 
  '10000000-0000-0000-0000-000000000001'::uuid,
  id,
  'completed',
  'task',
  (SELECT id FROM tasks WHERE title = 'Design landing page' LIMIT 1)
FROM auth.users
WHERE email = (SELECT email FROM auth.users LIMIT 1);

INSERT INTO activity_log (startup_id, user_id, action, entity_type, entity_id)
SELECT 
  '10000000-0000-0000-0000-000000000001'::uuid,
  id,
  'started',
  'task',
  (SELECT id FROM tasks WHERE title = 'Build authentication system' LIMIT 1)
FROM auth.users
WHERE email = (SELECT email FROM auth.users LIMIT 1);

COMMIT;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Seed data created successfully!';
    RAISE NOTICE '🏢 Created: TechStartup Demo';
    RAISE NOTICE '📊 Added: 2 milestones, 5 tasks, metrics, and insights';
    RAISE NOTICE '🎯 Your dashboard should now show sample data';
    RAISE NOTICE '';
    RAISE NOTICE '⚡ Next steps:';
    RAISE NOTICE '   1. Refresh your application';
    RAISE NOTICE '   2. You should see the demo startup and tasks';
    RAISE NOTICE '   3. You can edit or delete this test data anytime';
END $$;
