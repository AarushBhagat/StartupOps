-- ============================================
-- Optional Seed Data for Testing
-- ============================================
-- Run this to create test data for development

BEGIN;

-- ============================================
-- TEST USERS (Password for all: Test1234!)
-- ============================================

-- Note: You'll need to create these users through Supabase Auth UI or API
-- This script just creates the profile data

-- Test Leader User
INSERT INTO profiles (id, email, full_name, role, onboarding_completed)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'leader@test.com', 'John Leader', 'leader', true)
ON CONFLICT (id) DO NOTHING;

-- Test Team Member
INSERT INTO profiles (id, email, full_name, role, onboarding_completed)
VALUES 
  ('00000000-0000-0000-0000-000000000002', 'team@test.com', 'Jane Team', 'team', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- TEST STARTUP
-- ============================================

INSERT INTO startups (id, name, industry, description, stage, owner_id)
VALUES (
  '10000000-0000-0000-0000-000000000001',
  'TechStartup Demo',
  'SaaS',
  'AI-powered productivity platform for remote teams',
  'mvp',
  '00000000-0000-0000-0000-000000000001'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- TEST STARTUP MEMBERS
-- ============================================

INSERT INTO startup_members (startup_id, user_id, role, permissions)
VALUES 
  (
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'owner',
    '{"can_edit": true, "can_delete": true, "can_invite": true}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    'member',
    '{"can_edit": false, "can_delete": false, "can_invite": false}'::jsonb
  )
ON CONFLICT (startup_id, user_id) DO NOTHING;

-- ============================================
-- TEST MILESTONES
-- ============================================

INSERT INTO milestones (id, startup_id, title, description, due_date, status, progress, created_by)
VALUES 
  (
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'MVP Launch',
    'Complete and launch minimum viable product',
    CURRENT_DATE + INTERVAL '30 days',
    'in_progress',
    45,
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'First 100 Users',
    'Acquire our first 100 paying customers',
    CURRENT_DATE + INTERVAL '60 days',
    'not_started',
    0,
    '00000000-0000-0000-0000-000000000001'
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- TEST TASKS
-- ============================================

INSERT INTO tasks (startup_id, milestone_id, title, description, status, priority, assignee_id, estimated_hours, created_by)
VALUES 
  (
    '10000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    'Design landing page',
    'Create mockups and final designs for the marketing landing page',
    'done',
    'high',
    '00000000-0000-0000-0000-000000000001',
    8,
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '10000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    'Build authentication system',
    'Implement user signup, login, and password reset flows',
    'in-progress',
    'high',
    '00000000-0000-0000-0000-000000000002',
    16,
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '10000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    'Set up analytics',
    'Configure Google Analytics and Mixpanel tracking',
    'todo',
    'medium',
    NULL,
    4,
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '10000000-0000-0000-0000-000000000001',
    NULL,
    'Write product documentation',
    'Create user guides and API documentation',
    'todo',
    'low',
    '00000000-0000-0000-0000-000000000002',
    12,
    '00000000-0000-0000-0000-000000000001'
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- TEST METRICS
-- ============================================

INSERT INTO metrics (startup_id, mrr, users_count, active_users, growth_rate, burn_rate, runway_months, cash_balance)
VALUES 
  (
    '10000000-0000-0000-0000-000000000001',
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
  '10000000-0000-0000-0000-000000000001',
  75,
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
    '10000000-0000-0000-0000-000000000001',
    'suggestion',
    'Strong MRR growth this month',
    'Your MRR grew 15% this month ($2,175 to $2,500). This is excellent momentum that puts you on track for $3,500 MRR by next quarter.',
    'low',
    'growth',
    ARRAY['Document successful acquisition channels', 'Plan scaling strategy']
  ),
  (
    '10000000-0000-0000-0000-000000000001',
    'warning',
    'Several tasks unassigned',
    'You have 2 high-priority tasks with no assignee. Unassigned tasks are 3x more likely to miss deadlines.',
    'high',
    'operations',
    ARRAY['Review unassigned tasks in next standup', 'Assign clear ownership']
  ),
  (
    '10000000-0000-0000-0000-000000000001',
    'milestone',
    'MVP Launch is 45% complete',
    'Great progress on your MVP Launch milestone. At the current pace, you''re on track to launch on schedule.',
    'medium',
    'progress',
    ARRAY['Maintain current velocity', 'Plan launch marketing']
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- TEST FEEDBACK
-- ============================================

INSERT INTO feedback (
  user_id,
  startup_id,
  type,
  title,
  message,
  status,
  priority
)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'feature',
  'Add Slack integration',
  'It would be great to get task notifications in Slack. This would help our team stay synchronized.',
  'open',
  'medium'
)
ON CONFLICT DO NOTHING;

COMMIT;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Test data created successfully!';
    RAISE NOTICE '📧 Test accounts:';
    RAISE NOTICE '   - leader@test.com (password: Test1234!)';
    RAISE NOTICE '   - team@test.com (password: Test1234!)';
    RAISE NOTICE '🏢 Test startup: TechStartup Demo';
    RAISE NOTICE '⚠️  Remember to create these auth users in Supabase Auth!';
END $$;
