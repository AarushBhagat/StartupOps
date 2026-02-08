-- HealthAI Demo Data for Judge Presentation
-- Comprehensive mock data showing all dashboard features
-- Run this in Supabase SQL Editor

-- IMPORTANT: This uses hardcoded user jhanviarora11105@gmail.com
-- Make sure this user exists before running this script!

DO $$
DECLARE
  user_uuid UUID;
BEGIN
  -- Get the user ID for jhanviarora11105@gmail.com
  SELECT id INTO user_uuid FROM auth.users WHERE email = 'jhanviarora11105@gmail.com' LIMIT 1;
  
  -- If user doesn't exist, raise an error
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION 'User jhanviarora11105@gmail.com not found. Please sign up first!';
  END IF;
  
  -- Store it in a temporary table for use below
  CREATE TEMP TABLE IF NOT EXISTS temp_user (user_id UUID);
  DELETE FROM temp_user;
  INSERT INTO temp_user VALUES (user_uuid);
END $$;

-- Disable triggers temporarily to avoid conflicts during bulk insert
SET session_replication_role = 'replica';

-- 1. Create HealthAI Startup
INSERT INTO startups (id, name, industry, description, stage, owner_id, created_at, updated_at)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'HealthAI',
  'Healthcare Technology',
  'AI-powered diagnostic assistant helping doctors make faster, more accurate diagnoses using machine learning and medical imaging analysis.',
  'scaling',
  (SELECT user_id FROM temp_user),
  NOW() - INTERVAL '8 months',
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  industry = EXCLUDED.industry,
  description = EXCLUDED.description,
  stage = EXCLUDED.stage,
  owner_id = EXCLUDED.owner_id,
  updated_at = EXCLUDED.updated_at;

-- 2. Add Team Members
INSERT INTO startup_members (startup_id, user_id, role)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'owner')
ON CONFLICT (startup_id, user_id) DO UPDATE SET
  role = EXCLUDED.role;

-- 3. Create Comprehensive Milestones (8 milestones showing full journey)
INSERT INTO milestones (id, startup_id, title, description, due_date, status, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 
 'MVP Development', 
 'Build core AI diagnostic engine with basic image analysis capabilities',
 NOW() - INTERVAL '6 months',
 'completed',
 NOW() - INTERVAL '8 months',
 NOW() - INTERVAL '6 months'),

('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000',
 'Initial Clinical Validation',
 'Complete first round of testing with 5 partner clinics and gather initial accuracy metrics',
 NOW() - INTERVAL '4 months',
 'completed',
 NOW() - INTERVAL '7 months',
 NOW() - INTERVAL '4 months'),

('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000',
 'Seed Funding Secured',
 'Raise $2M seed round from healthcare-focused VCs',
 NOW() - INTERVAL '3 months',
 'completed',
 NOW() - INTERVAL '5 months',
 NOW() - INTERVAL '3 months'),

('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000',
 'FDA Pre-Submission Meeting',
 'Prepare and submit 510(k) pre-submission package to FDA for SaMD classification',
 NOW() + INTERVAL '1 month',
 'in_progress',
 NOW() - INTERVAL '3 months',
 NOW()),

('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000',
 'Expand to 50 Clinical Partners',
 'Onboard 50 hospitals and clinics across major metropolitan areas',
 NOW() + INTERVAL '2 months',
 'in_progress',
 NOW() - INTERVAL '2 months',
 NOW()),

('550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440000',
 'Full FDA 510(k) Submission',
 'Submit complete 510(k) application with clinical validation data',
 NOW() + INTERVAL '4 months',
 'not_started',
 NOW() - INTERVAL '1 month',
 NOW()),

('550e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440000',
 'Series A Fundraising',
 'Raise $10M Series A to scale operations and expand clinical trials',
 NOW() + INTERVAL '5 months',
 'not_started',
 NOW() - INTERVAL '1 month',
 NOW()),

('550e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440000',
 'International Expansion',
 'Launch in European markets with CE Mark certification',
 NOW() + INTERVAL '8 months',
 'not_started',
 NOW(),
 NOW())
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at;

-- 4. Create Comprehensive Tasks (30 tasks across all categories)
INSERT INTO tasks (id, startup_id, title, description, priority, status, tags, due_date, created_by, created_at, updated_at) VALUES
-- Completed Tasks
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440000',
 'Design AI Model Architecture',
 'Design neural network architecture for medical image analysis with attention mechanisms',
 'high', 'done', ARRAY['Development', 'AI'],
 NOW() - INTERVAL '6 months', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '8 months', NOW() - INTERVAL '6 months'),

('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440000',
 'Train Initial ML Models',
 'Train models on 10K medical images with validated diagnoses',
 'high', 'done', ARRAY['Development', 'AI'],
 NOW() - INTERVAL '5 months', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '7 months', NOW() - INTERVAL '5 months'),

('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440000',
 'Build Doctor Dashboard UI',
 'Create intuitive interface for doctors to upload images and view AI insights',
 'high', 'done', ARRAY['Product', 'UI'],
 NOW() - INTERVAL '5 months', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '6 months', NOW() - INTERVAL '5 months'),

('550e8400-e29b-41d4-a716-446655440107', '550e8400-e29b-41d4-a716-446655440000',
 'Analyze Clinical Trial Results',
 'Compile accuracy metrics from 5 partner hospitals (target: 94% accuracy)',
 'high', 'done', ARRAY['Research', 'Clinical'],
 NOW() - INTERVAL '4 months', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '5 months', NOW() - INTERVAL '4 months'),

('550e8400-e29b-41d4-a716-446655440111', '550e8400-e29b-41d4-a716-446655440000',
 'Complete HIPAA Compliance Audit',
 'Third-party security audit and BAA agreements with all partners',
 'high', 'done', ARRAY['Compliance', 'Security'],
 NOW() - INTERVAL '2 months', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '4 months', NOW() - INTERVAL '2 months'),

('550e8400-e29b-41d4-a716-446655440122', '550e8400-e29b-41d4-a716-446655440000',
 'Implement OKR Framework',
 'Roll out quarterly OKRs across all teams with tracking dashboards',
 'medium', 'done', ARRAY['Operations', 'Management'],
 NOW() - INTERVAL '1 month', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '3 months', NOW() - INTERVAL '1 month'),

-- In Progress Tasks
('550e8400-e29b-41d4-a716-446655440104', '550e8400-e29b-41d4-a716-446655440000',
 'Implement Real-time Processing',
 'Optimize model inference to provide results within 3 seconds',
 'high', 'in-progress', ARRAY['Development', 'Performance'],
 NOW() + INTERVAL '2 weeks', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '1 month', NOW() - INTERVAL '3 days'),

('550e8400-e29b-41d4-a716-446655440105', '550e8400-e29b-41d4-a716-446655440000',
 'Add Multi-Modal Analysis',
 'Integrate support for CT scans, MRIs, and X-rays in single platform',
 'high', 'in-progress', ARRAY['Product', 'AI'],
 NOW() + INTERVAL '3 weeks', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '2 months', NOW() - INTERVAL '1 day'),

('550e8400-e29b-41d4-a716-446655440106', '550e8400-e29b-41d4-a716-446655440000',
 'Build Patient History Integration',
 'Connect with EHR systems (Epic, Cerner) to pull patient context',
 'medium', 'in-progress', ARRAY['Development', 'Integration'],
 NOW() + INTERVAL '1 month', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '3 weeks', NOW() - INTERVAL '2 days'),

('550e8400-e29b-41d4-a716-446655440108', '550e8400-e29b-41d4-a716-446655440000',
 'Expand Clinical Trial to 15 Sites',
 'Recruit oncology and radiology departments at major hospitals',
 'high', 'in-progress', ARRAY['Research', 'Clinical'],
 NOW() + INTERVAL '6 weeks', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '2 months', NOW() - INTERVAL '4 days'),

('550e8400-e29b-41d4-a716-446655440109', '550e8400-e29b-41d4-a716-446655440000',
 'Publish Research Paper',
 'Submit findings to NEJM or Nature Medicine on AI diagnostic accuracy',
 'medium', 'in-progress', ARRAY['Research', 'Marketing'],
 NOW() + INTERVAL '2 months', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '1 month', NOW() - INTERVAL '1 week'),

('550e8400-e29b-41d4-a716-446655440110', '550e8400-e29b-41d4-a716-446655440000',
 'Prepare FDA Pre-Sub Package',
 'Compile clinical data, risk analysis, and device description for FDA',
 'urgent', 'in-progress', ARRAY['Compliance', 'Regulatory'],
 NOW() + INTERVAL '3 weeks', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '2 months', NOW() - INTERVAL '1 day'),

('550e8400-e29b-41d4-a716-446655440112', '550e8400-e29b-41d4-a716-446655440000',
 'Implement SOC 2 Type II',
 'Complete SOC 2 Type II certification for enterprise customers',
 'high', 'in-progress', ARRAY['Compliance', 'Security'],
 NOW() + INTERVAL '2 months', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '3 months', NOW() - INTERVAL '5 days'),

('550e8400-e29b-41d4-a716-446655440113', '550e8400-e29b-41d4-a716-446655440000',
 'Launch Healthcare Provider Webinar Series',
 'Monthly webinars showcasing AI diagnostic capabilities to 200+ doctors',
 'medium', 'in-progress', ARRAY['Marketing', 'Education'],
 NOW() + INTERVAL '2 weeks', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '1 month', NOW() - INTERVAL '3 days'),

('550e8400-e29b-41d4-a716-446655440115', '550e8400-e29b-41d4-a716-446655440000',
 'Create Case Study from Mayo Clinic Trial',
 'Document 96% accuracy improvement with video testimonials from doctors',
 'medium', 'in-progress', ARRAY['Marketing', 'Content'],
 NOW() + INTERVAL '3 weeks', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '3 weeks', NOW() - INTERVAL '2 days'),

('550e8400-e29b-41d4-a716-446655440116', '550e8400-e29b-41d4-a716-446655440000',
 'Build Sales Pipeline for Enterprise',
 'Target 20 major hospital systems with direct sales outreach',
 'high', 'in-progress', ARRAY['Sales', 'Business Development'],
 NOW() + INTERVAL '1 month', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '1 month', NOW() - INTERVAL '1 week'),

('550e8400-e29b-41d4-a716-446655440117', '550e8400-e29b-41d4-a716-446655440000',
 'Update Investor Pitch Deck',
 'Add latest clinical results, user metrics, and Series A projections',
 'high', 'in-progress', ARRAY['Fundraising', 'Investor Relations'],
 NOW() + INTERVAL '1 week', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '2 weeks', NOW() - INTERVAL '1 day'),

('550e8400-e29b-41d4-a716-446655440119', '550e8400-e29b-41d4-a716-446655440000',
 'Prepare Financial Projections',
 'Build 5-year model showing path to $100M ARR with unit economics',
 'high', 'in-progress', ARRAY['Finance', 'Strategy'],
 NOW() + INTERVAL '2 weeks', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '1 month', NOW() - INTERVAL '4 days'),

('550e8400-e29b-41d4-a716-446655440120', '550e8400-e29b-41d4-a716-446655440000',
 'Hire VP of Clinical Affairs',
 'Recruit experienced medical director from top hospital or healthtech company',
 'urgent', 'in-progress', ARRAY['Hiring', 'Team'],
 NOW() + INTERVAL '4 weeks', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '2 months', NOW() - INTERVAL '3 days'),

('550e8400-e29b-41d4-a716-446655440121', '550e8400-e29b-41d4-a716-446655440000',
 'Expand Engineering Team',
 'Hire 5 ML engineers and 3 backend engineers',
 'high', 'in-progress', ARRAY['Hiring', 'Team'],
 NOW() + INTERVAL '3 months', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '2 months', NOW() - INTERVAL '1 week'),

('550e8400-e29b-41d4-a716-446655440123', '550e8400-e29b-41d4-a716-446655440000',
 'Scale Cloud Infrastructure',
 'Migrate to Kubernetes with auto-scaling for 10K daily image analyses',
 'high', 'in-progress', ARRAY['Infrastructure', 'DevOps'],
 NOW() + INTERVAL '5 weeks', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '6 weeks', NOW() - INTERVAL '2 days'),

('550e8400-e29b-41d4-a716-446655440125', '550e8400-e29b-41d4-a716-446655440000',
 'Build Doctor Training Program',
 'Create certification program for doctors using AI diagnostic tool',
 'medium', 'in-progress', ARRAY['Customer Success', 'Education'],
 NOW() + INTERVAL '1 month', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '3 weeks', NOW() - INTERVAL '5 days'),

('550e8400-e29b-41d4-a716-446655440127', '550e8400-e29b-41d4-a716-446655440000',
 'Explore Hospital Network Partnerships',
 'Negotiate pilot agreements with HCA Healthcare and Kaiser Permanente',
 'urgent', 'in-progress', ARRAY['Business Development', 'Partnerships'],
 NOW() + INTERVAL '2 months', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '1 month', NOW() - INTERVAL '2 days'),

('550e8400-e29b-41d4-a716-446655440129', '550e8400-e29b-41d4-a716-446655440000',
 'Patent AI Diagnostic Algorithm',
 'File provisional patent applications for core ML innovations',
 'high', 'in-progress', ARRAY['Legal', 'IP'],
 NOW() + INTERVAL '5 weeks', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '2 months', NOW() - INTERVAL '6 days'),

('550e8400-e29b-41d4-a716-446655440130', '550e8400-e29b-41d4-a716-446655440000',
 'Build Strategic Advisory Board',
 'Recruit 5 prominent doctors and 2 healthcare executives as advisors',
 'medium', 'in-progress', ARRAY['Strategy', 'Network'],
 NOW() + INTERVAL '6 weeks', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '1 month', NOW() - INTERVAL '1 week'),

-- Pending/Todo Tasks
('550e8400-e29b-41d4-a716-446655440114', '550e8400-e29b-41d4-a716-446655440000',
 'Attend HIMSS Conference',
 'Showcase product at Healthcare IT conference - target 50 qualified leads',
 'high', 'todo', ARRAY['Marketing', 'Events'],
 NOW() + INTERVAL '6 weeks', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '2 weeks', NOW()),

('550e8400-e29b-41d4-a716-446655440118', '550e8400-e29b-41d4-a716-446655440000',
 'Schedule Series A Investor Meetings',
 'Meet with 15 top healthcare VCs (a16z Bio, Foresite, Google Ventures)',
 'urgent', 'todo', ARRAY['Fundraising', 'Investor Relations'],
 NOW() + INTERVAL '2 months', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '3 weeks', NOW()),

('550e8400-e29b-41d4-a716-446655440124', '550e8400-e29b-41d4-a716-446655440000',
 'Implement Disaster Recovery',
 'Multi-region backup with 99.99% uptime SLA',
 'high', 'todo', ARRAY['Infrastructure', 'Security'],
 NOW() + INTERVAL '6 weeks', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '1 month', NOW()),

('550e8400-e29b-41d4-a716-446655440126', '550e8400-e29b-41d4-a716-446655440000',
 'Launch 24/7 Clinical Support',
 'Hire medical support team for round-the-clock assistance',
 'high', 'todo', ARRAY['Customer Success', 'Operations'],
 NOW() + INTERVAL '7 weeks', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '2 weeks', NOW()),

('550e8400-e29b-41d4-a716-446655440128', '550e8400-e29b-41d4-a716-446655440000',
 'Research International Markets',
 'Analyze regulatory requirements for EU, UK, and Canada expansion',
 'medium', 'todo', ARRAY['Strategy', 'Research'],
 NOW() + INTERVAL '3 months', (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '2 weeks', NOW())

ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  priority = EXCLUDED.priority,
  updated_at = EXCLUDED.updated_at;

-- 5. Add Impressive Growth Metrics
INSERT INTO metrics (startup_id, mrr, users_count, burn_rate, customer_acquisition_cost, recorded_at) VALUES
-- Month 1 (6 months ago)
('550e8400-e29b-41d4-a716-446655440000', 0, 12, 180000, 5200, NOW() - INTERVAL '6 months'),
-- Month 2 (5 months ago)
('550e8400-e29b-41d4-a716-446655440000', 5000, 28, 185000, 4800, NOW() - INTERVAL '5 months'),
-- Month 3 (4 months ago)
('550e8400-e29b-41d4-a716-446655440000', 12000, 47, 195000, 4200, NOW() - INTERVAL '4 months'),
-- Month 4 (3 months ago)
('550e8400-e29b-41d4-a716-446655440000', 28000, 89, 210000, 3600, NOW() - INTERVAL '3 months'),
-- Month 5 (2 months ago)
('550e8400-e29b-41d4-a716-446655440000', 45000, 156, 225000, 3100, NOW() - INTERVAL '2 months'),
-- Month 6 (1 month ago)
('550e8400-e29b-41d4-a716-446655440000', 67000, 234, 240000, 2800, NOW() - INTERVAL '1 month'),
-- Current month
('550e8400-e29b-41d4-a716-446655440000', 98000, 347, 255000, 2400, NOW())
ON CONFLICT DO NOTHING;

-- 6. Add Investor Hub Data
INSERT INTO investor_hub (startup_id, pitch_score, fundraising_stage, target_amount, raised_amount, 
  problem_defined, solution_articulated, team_complete, competitive_analysis, financials_ready,
  customer_testimonials, created_at, last_updated) VALUES
('550e8400-e29b-41d4-a716-446655440000',
 89,  -- High pitch score
 'series-a',  -- Series A fundraising stage
 10000000,  -- $10M target
 2000000,  -- $2M already raised (seed)
 true, true, true, true, true,  -- All readiness flags true
 6,  -- 6 customer testimonials
 NOW() - INTERVAL '3 months', NOW())
ON CONFLICT (startup_id) DO UPDATE SET
  pitch_score = EXCLUDED.pitch_score,
  fundraising_stage = EXCLUDED.fundraising_stage,
  target_amount = EXCLUDED.target_amount,
  raised_amount = EXCLUDED.raised_amount,
  last_updated = EXCLUDED.last_updated;

-- 7. Add Authentic Feedback
INSERT INTO feedback (startup_id, user_id, type, category, title, message, status, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'feature', 'AI Diagnostics',
 'Pediatric case support needed',
 'The AI diagnostic assistant has dramatically reduced our time to diagnosis in oncology cases. We''ve seen a 40% improvement in early detection rates. The interface is intuitive and the confidence scores help us make better decisions. Would love to see support for pediatric cases next!',
 'resolved', NOW() - INTERVAL '2 weeks'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'improvement', 'Radiology',
 'Excellent radiology pattern detection',
 'Absolutely game-changing for our radiology department. The AI catches subtle patterns in chest X-rays that even experienced radiologists might miss. We''ve integrated it into our daily workflow and our diagnostic accuracy has improved measurably. The real-time processing is impressive - results in under 3 seconds!',
 'resolved', NOW() - INTERVAL '3 weeks'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'feature', 'EMR Integration',
 'Epic EMR integration request',
 'Really impressed with the MRI analysis capabilities. The multi-modal integration works seamlessly. Only feedback: would be great to have better integration with Epic EMR for automatically pulling patient history. Overall, this is the future of diagnostic medicine.',
 'in-progress', NOW() - INTERVAL '5 days'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'improvement', 'Clinical Trials',
 'Outstanding clinical trial results',
 'We''ve been using HealthAI in our clinical trials for 3 months now. The accuracy is consistently above 94%, which is remarkable. The explainable AI features help us understand the reasoning, which is crucial for clinical acceptance. This will save countless lives.',
 'resolved', NOW() - INTERVAL '1 month'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'other', 'Compliance',
 'Enterprise licensing inquiry',
 'The patient safety features and audit trails are exactly what we need for regulatory compliance. HIPAA compliance is rock solid. As Chief of Radiology, I''m recommending this to our entire network of 12 hospitals. Would love to discuss enterprise licensing.',
 'resolved', NOW() - INTERVAL '6 weeks'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'bug', 'File Upload',
 'Large CT scan upload timeout',
 'Great product overall! Had one minor issue with CT scan uploads timing out for very large files (>500MB). Support team was responsive and fixed it within 24 hours. The diagnostic insights for lung cancer screening are exceptional.',
 'resolved', NOW() - INTERVAL '10 days')
ON CONFLICT DO NOTHING;

-- 8. Add Rich Activity Log
INSERT INTO activity_log (startup_id, user_id, action, entity_type, entity_id, metadata, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 
 'Completed HIPAA Compliance Audit', 'task', '550e8400-e29b-41d4-a716-446655440111',
 '{"description": "All security controls validated by third-party auditor"}', NOW() - INTERVAL '2 hours'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user),
 'Updated progress on FDA Pre-Submission Meeting', 'milestone', '550e8400-e29b-41d4-a716-446655440004',
 '{"progress": 75, "description": "Submitted initial documentation package"}', NOW() - INTERVAL '5 hours'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user),
 'Updated pitch deck with Q4 metrics', 'startup', '550e8400-e29b-41d4-a716-446655440000',
 '{"doctors": 347, "accuracy": 96, "mrr": 98000, "pitch_score": 89}', NOW() - INTERVAL '1 day'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user),
 'Signed pilot agreement with Cleveland Clinic', 'startup', '550e8400-e29b-41d4-a716-446655440000',
 '{"partner": "Cleveland Clinic", "contract_value": 150000, "duration_months": 6, "doctors": 25}', NOW() - INTERVAL '2 days'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user),
 'Completed clinical trial analysis', 'task', '550e8400-e29b-41d4-a716-446655440107',
 '{"accuracy": 94.2, "hospital_sites": 5, "description": "Results published"}', NOW() - INTERVAL '3 days'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user),
 'Received Series A term sheet from a16z Bio + Health', 'startup', '550e8400-e29b-41d4-a716-446655440000',
 '{"amount": 10000000, "investor": "Andreessen Horowitz Bio + Health", "round": "Series A"}', NOW() - INTERVAL '5 days'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user),
 'Launched Multi-Modal Analysis v2.0', 'startup', '550e8400-e29b-41d4-a716-446655440000',
 '{"version": "2.0", "features": ["CT", "MRI", "X-Ray", "Ultrasound"], "type": "product_launch"}', NOW() - INTERVAL '1 week'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user),
 'Hired VP of Clinical Affairs', 'startup', '550e8400-e29b-41d4-a716-446655440000',
 '{"position": "VP Clinical Affairs", "name": "Dr. Amanda Foster", "previous": "Johns Hopkins"}', NOW() - INTERVAL '10 days'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user),
 'Completed Initial Clinical Validation', 'milestone', '550e8400-e29b-41d4-a716-446655440002',
 '{"accuracy": 94, "description": "Published validation results"}', NOW() - INTERVAL '4 months'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user),
 'Completed Seed Funding', 'milestone', '550e8400-e29b-41d4-a716-446655440003',
 '{"amount": 2000000, "investors": ["Khosla Ventures", "General Catalyst"]}', NOW() - INTERVAL '3 months')
ON CONFLICT DO NOTHING;

-- 9. Add AI Insights
INSERT INTO ai_insights (startup_id, insight_type, title, description, priority, category, action_items, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'suggestion',
 'Enterprise Healthcare Partnerships',
 'Analysis shows 67% of hospital networks are actively seeking AI diagnostic solutions. Your clinical accuracy metrics (94%+) position you well for enterprise deals. Recommend targeting top 20 hospital systems with dedicated enterprise sales team. Potential: $5M+ ARR from 3-4 major contracts.',
 'high', 'Sales & Growth', 
 ARRAY['Build dedicated enterprise sales team', 'Create enterprise pricing tier', 'Target top 20 US hospital systems', 'Develop case studies from Cleveland Clinic pilot'],
 NOW() - INTERVAL '3 days'),

('550e8400-e29b-41d4-a716-446655440000', 'warning',
 'FDA Regulatory Timeline Risk',
 'FDA 510(k) approval typically takes 6-12 months. Current timeline for submission is aggressive. Recommend allocating additional resources to regulatory affairs and considering expedited review pathways. Delay could impact Series A fundraising timeline and revenue projections.',
 'high', 'Compliance & Legal',
 ARRAY['Hire additional regulatory affairs consultant', 'Explore FDA Breakthrough Device designation', 'Build 3-month buffer into timeline', 'Prepare contingency plan for Series A timing'],
 NOW() - INTERVAL '5 days'),

('550e8400-e29b-41d4-a716-446655440000', 'suggestion',
 'Reduce Customer Acquisition Cost',
 'Your CAC has dropped from $5,200 to $2,400 over 6 months - excellent progress! AI analysis suggests focusing on referral programs from existing satisfied doctors could reduce CAC below $2,000. Current NPS of 73 indicates strong word-of-mouth potential. Implement formal referral rewards program.',
 'medium', 'Sales & Growth',
 ARRAY['Launch doctor referral program with incentives', 'Create shareable case study content', 'Build automated referral tracking system', 'Set target: reduce CAC to $1,800 by Q3'],
 NOW() - INTERVAL '1 week'),

('550e8400-e29b-41d4-a716-446655440000', 'trend',
 'International Expansion Timing',
 'European healthcare AI market growing at 42% CAGR. Your technology stack is ready for CE Mark certification (simpler than FDA). Recommend starting EU expansion parallel to US growth. UK and Germany represent $50M+ market opportunity. Begin regulatory preparation now for Q3 2026 launch.',
 'medium', 'Strategy & Planning',
 ARRAY['Research CE Mark certification requirements', 'Identify UK and Germany hospital partners', 'Budget $200K for EU regulatory prep', 'Hire EU business development lead in Q2 2026'],
 NOW() - INTERVAL '2 weeks'),

('550e8400-e29b-41d4-a716-446655440000', 'suggestion',
 'Strategic Partnership with Imaging Equipment Manufacturers',
 'Consider partnerships with GE Healthcare, Siemens Healthineers, or Philips to bundle your AI software with their imaging equipment. This could provide distribution to 10,000+ hospitals globally. Precedent: Zebra Medical''s partnership with GE generated $30M+ ARR.',
 'high', 'Partnerships',
 ARRAY['Schedule meetings with GE Healthcare BD team', 'Prepare partnership deck highlighting integration benefits', 'Research Siemens and Philips partnership programs', 'Define revenue share and co-marketing structure'],
 NOW() - INTERVAL '10 days'),

('550e8400-e29b-41d4-a716-446655440000', 'performance',
 'Optimize Model Inference Costs',
 'Current cloud infrastructure costs are $45K/month for ML inference. Analysis shows 40% cost reduction possible through: 1) Model quantization (8-bit inference), 2) Optimized GPU utilization, 3) Spot instance usage. This would improve unit economics and extend runway by 4 months.',
 'medium', 'Technology & Product',
 ARRAY['Implement 8-bit model quantization', 'Optimize GPU batch processing', 'Migrate 60% of workload to spot instances', 'Target: reduce costs to $27K/month'],
 NOW() - INTERVAL '2 weeks')
ON CONFLICT DO NOTHING;

-- Re-enable triggers after bulk insert
SET session_replication_role = 'origin';

-- Summary Query - View all HealthAI data
SELECT 
  'HealthAI Demo Data Loaded Successfully!' as status,
  (SELECT COUNT(*) FROM milestones WHERE startup_id = '550e8400-e29b-41d4-a716-446655440000') as milestones,
  (SELECT COUNT(*) FROM tasks WHERE startup_id = '550e8400-e29b-41d4-a716-446655440000') as tasks,
  (SELECT COUNT(*) FROM metrics WHERE startup_id = '550e8400-e29b-41d4-a716-446655440000') as metrics,
  (SELECT COUNT(*) FROM feedback WHERE startup_id = '550e8400-e29b-41d4-a716-446655440000') as feedback_entries,
  (SELECT COUNT(*) FROM activity_log WHERE startup_id = '550e8400-e29b-41d4-a716-446655440000') as activities,
  (SELECT COUNT(*) FROM ai_insights WHERE startup_id = '550e8400-e29b-41d4-a716-446655440000') as ai_insights;
