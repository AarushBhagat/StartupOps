-- ============================================
-- HealthAI Startup Seed Data
-- Complete data for all dashboard pages
-- ============================================

BEGIN;

-- ============================================
-- Create HealthAI Startup
-- ============================================

INSERT INTO startups (id, name, industry, description, stage, owner_id)
SELECT 
  '11111111-1111-1111-1111-111111111111'::uuid,
  'HealthAI',
  'Healthcare Technology',
  'AI-powered diagnostic assistant helping doctors make faster, more accurate diagnoses',
  'mvp',
  id
FROM auth.users
ORDER BY created_at DESC
LIMIT 1
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  industry = EXCLUDED.industry,
  description = EXCLUDED.description,
  stage = EXCLUDED.stage;

-- ============================================
-- Add Startup Member
-- ============================================

INSERT INTO startup_members (startup_id, user_id, role, permissions)
SELECT 
  '11111111-1111-1111-1111-111111111111'::uuid,
  id,
  'owner',
  '{"can_edit": true, "can_delete": true, "can_invite": true}'::jsonb
FROM auth.users
ORDER BY created_at DESC
LIMIT 1
ON CONFLICT (startup_id, user_id) DO UPDATE SET
  role = EXCLUDED.role,
  permissions = EXCLUDED.permissions;

-- ============================================
-- Milestones for HealthAI
-- ============================================

INSERT INTO milestones (startup_id, name, description, target_date, status)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'MVP Development Complete', 'Finish core AI diagnostic features and user interface', CURRENT_DATE + INTERVAL '14 days', 'in_progress'),
  ('11111111-1111-1111-1111-111111111111', 'Clinical Trials Phase 1', 'Begin testing with 5 partner hospitals', CURRENT_DATE + INTERVAL '45 days', 'not_started'),
  ('11111111-1111-1111-1111-111111111111', 'FDA Pre-Submission', 'Submit pre-submission package to FDA', CURRENT_DATE + INTERVAL '90 days', 'not_started'),
  ('11111111-1111-1111-1111-111111111111', 'First 50 Doctors Onboarded', 'Onboard first 50 doctors to the platform', CURRENT_DATE + INTERVAL '60 days', 'not_started')
ON CONFLICT DO NOTHING;

-- ============================================
-- Tasks for HealthAI
-- ============================================

INSERT INTO tasks (startup_id, title, description, status, priority, category, story_points, due_date)
VALUES
  -- Product Tasks
  ('11111111-1111-1111-1111-111111111111', 'Integrate medical imaging AI model', 'Connect the diagnostic AI model with the imaging pipeline', 'in-progress', 'high', 'Product', 13, CURRENT_DATE + INTERVAL '7 days'),
  ('11111111-1111-1111-1111-111111111111', 'Build doctor dashboard UI', 'Create intuitive interface for doctors to review AI suggestions', 'in-progress', 'high', 'Product', 8, CURRENT_DATE + INTERVAL '10 days'),
  ('11111111-1111-1111-1111-111111111111', 'Implement HIPAA compliance features', 'Add encryption, audit logs, and access controls', 'todo', 'high', 'Technical', 13, CURRENT_DATE + INTERVAL '14 days'),
  
  -- Development Tasks
  ('11111111-1111-1111-1111-111111111111', 'Optimize AI inference speed', 'Reduce diagnostic time from 30s to under 5s', 'in-progress', 'high', 'Development', 13, CURRENT_DATE + INTERVAL '5 days'),
  ('11111111-1111-1111-1111-111111111111', 'Build secure API endpoints', 'Create REST API for hospital system integration', 'done', 'high', 'Development', 8, CURRENT_DATE - INTERVAL '2 days'),
  ('11111111-1111-1111-1111-111111111111', 'Write automated test suite', 'Create comprehensive tests for all features', 'in-progress', 'medium', 'Technical', 8, CURRENT_DATE + INTERVAL '12 days'),
  
  -- Research Tasks
  ('11111111-1111-1111-1111-111111111111', 'Conduct user interviews with doctors', 'Interview 20 doctors about pain points', 'done', 'high', 'Research', 13, CURRENT_DATE - INTERVAL '5 days'),
  ('11111111-1111-1111-1111-111111111111', 'Analyze competitor solutions', 'Deep dive into 5 main competitors', 'done', 'medium', 'Strategy', 8, CURRENT_DATE - INTERVAL '10 days'),
  ('11111111-1111-1111-1111-111111111111', 'Review latest medical AI research', 'Stay updated on newest diagnostic AI papers', 'todo', 'medium', 'Research', 5, CURRENT_DATE + INTERVAL '7 days'),
  
  -- Compliance & Legal
  ('11111111-1111-1111-1111-111111111111', 'Draft FDA submission documentation', 'Prepare technical and clinical documentation', 'todo', 'high', 'Compliance', 13, CURRENT_DATE + INTERVAL '30 days'),
  ('11111111-1111-1111-1111-111111111111', 'Complete HIPAA security assessment', 'Third-party security audit', 'in-progress', 'high', 'Compliance', 8, CURRENT_DATE + INTERVAL '20 days'),
  
  -- Marketing & Sales
  ('11111111-1111-1111-1111-111111111111', 'Create demo videos for hospitals', 'Produce 3 professional demos', 'todo', 'medium', 'Marketing', 5, CURRENT_DATE + INTERVAL '15 days'),
  ('11111111-1111-1111-1111-111111111111', 'Build relationships with hospital CTOs', 'Schedule meetings with 10 hospitals', 'in-progress', 'high', 'Sales', 8, CURRENT_DATE + INTERVAL '30 days'),
  ('11111111-1111-1111-1111-111111111111', 'Attend medical AI conference', 'Present at HIMSS conference', 'todo', 'medium', 'Marketing', 3, CURRENT_DATE + INTERVAL '45 days'),
  
  -- Team & Culture
  ('11111111-1111-1111-1111-111111111111', 'Hire senior ML engineer', 'Find experienced medical AI specialist', 'in-progress', 'high', 'People', 8, CURRENT_DATE + INTERVAL '25 days'),
  ('11111111-1111-1111-1111-111111111111', 'Setup weekly team standups', 'Establish regular communication rhythm', 'done', 'low', 'Culture', 2, CURRENT_DATE - INTERVAL '15 days')
ON CONFLICT DO NOTHING;

-- ============================================
-- Metrics for HealthAI
-- ============================================

INSERT INTO metrics (startup_id, metric_date, revenue, monthly_active_users, customer_acquisition_cost, burn_rate)
VALUES
  ('11111111-1111-1111-1111-111111111111', CURRENT_DATE - INTERVAL '90 days', 0, 5, 1500, 45000),
  ('11111111-1111-1111-1111-111111111111', CURRENT_DATE - INTERVAL '60 days', 2000, 12, 1200, 42000),
  ('11111111-1111-1111-1111-111111111111', CURRENT_DATE - INTERVAL '30 days', 8000, 28, 900, 40000),
  ('11111111-1111-1111-1111-111111111111', CURRENT_DATE, 15000, 47, 750, 38000)
ON CONFLICT DO NOTHING;

-- ============================================
-- Investor Hub for HealthAI
-- ============================================

INSERT INTO investor_hub (startup_id, pitch_deck_url, pitch_score, funding_stage, target_amount, raised_amount)
SELECT 
  '11111111-1111-1111-1111-111111111111'::uuid,
  'https://example.com/healthai-pitch.pdf',
  78,
  'seed',
  2000000,
  0
ON CONFLICT (startup_id) DO UPDATE SET
  pitch_deck_url = EXCLUDED.pitch_deck_url,
  pitch_score = EXCLUDED.pitch_score,
  funding_stage = EXCLUDED.funding_stage,
  target_amount = EXCLUDED.target_amount;

-- ============================================
-- Feedback for HealthAI
-- ============================================

INSERT INTO feedback (startup_id, feedback_type, message, rating, source)
SELECT 
  '11111111-1111-1111-1111-111111111111'::uuid,
  'feature_request',
  'Would love to see integration with Epic EMR system',
  5,
  'Dr. Sarah Johnson - Boston General'
FROM auth.users
ORDER BY created_at DESC
LIMIT 1;

INSERT INTO feedback (startup_id, feedback_type, message, rating, source)
SELECT 
  '11111111-1111-1111-1111-111111111111'::uuid,
  'bug_report',
  'AI suggestions sometimes take too long to load',
  3,
  'Dr. Michael Chen - Stanford Medical'
FROM auth.users
ORDER BY created_at DESC
LIMIT 1;

INSERT INTO feedback (startup_id, feedback_type, message, rating, source)
SELECT 
  '11111111-1111-1111-1111-111111111111'::uuid,
  'testimonial',
  'HealthAI has reduced our diagnostic time by 40%. Game changer!',
  5,
  'Dr. Emily Rodriguez - Mayo Clinic'
FROM auth.users
ORDER BY created_at DESC
LIMIT 1;

-- ============================================
-- Activity Log for HealthAI
-- ============================================

INSERT INTO activity_log (startup_id, user_id, action, entity_type, entity_id, description)
SELECT 
  '11111111-1111-1111-1111-111111111111'::uuid,
  id,
  'completed',
  'task',
  NULL,
  'Completed task: Build secure API endpoints'
FROM auth.users
ORDER BY created_at DESC
LIMIT 1;

INSERT INTO activity_log (startup_id, user_id, action, entity_type, entity_id, description)
SELECT 
  '11111111-1111-1111-1111-111111111111'::uuid,
  id,
  'updated',
  'milestone',
  NULL,
  'Updated milestone progress: MVP Development Complete (65%)'
FROM auth.users
ORDER BY created_at DESC
LIMIT 1;

INSERT INTO activity_log (startup_id, user_id, action, entity_type, entity_id, description)
SELECT 
  '11111111-1111-1111-1111-111111111111'::uuid,
  id,
  'created',
  'task',
  NULL,
  'Created new task: Integrate medical imaging AI model'
FROM auth.users
ORDER BY created_at DESC
LIMIT 1;

-- ============================================
-- AI Insights for HealthAI
-- ============================================

INSERT INTO ai_insights (startup_id, insight_type, title, content, priority, status)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'opportunity', 'Partnership Opportunity', 'Consider partnering with Epic Systems - they are actively seeking AI diagnostic partners', 'high', 'active'),
  ('11111111-1111-1111-1111-111111111111', 'risk', 'Regulatory Compliance', 'FDA approval timeline may extend beyond projections. Consider pre-submission meeting to clarify requirements', 'high', 'active'),
  ('11111111-1111-1111-1111-111111111111', 'optimization', 'Team Velocity', 'Development velocity has increased 30% this month. Consider adding more feature work to sprint', 'medium', 'active')
ON CONFLICT DO NOTHING;

COMMIT;

-- ============================================
-- Verification Query
-- ============================================
-- Run this to verify data was inserted:
-- SELECT name, industry FROM startups WHERE name = 'HealthAI';
-- SELECT COUNT(*) as task_count FROM tasks WHERE startup_id = '11111111-1111-1111-1111-111111111111';
-- SELECT COUNT(*) as milestone_count FROM milestones WHERE startup_id = '11111111-1111-1111-1111-111111111111';
