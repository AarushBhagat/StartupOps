// Template-specific roadmaps and tasks

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  milestone: string;
  due: string;
  requirements?: string[];
  steps?: { id: string; text: string; completed: boolean }[];
  tags?: string[];
}

export interface Milestone {
  id: string;
  title: string;
  due: string;
  progress: number;
  tasks: number;
  completed: number;
  delayed?: boolean;
  description: string;
}

export interface TemplateRoadmap {
  id: string;
  name: string;
  milestones: Milestone[];
  tasks: Task[];
}

export const templateRoadmaps: Record<string, TemplateRoadmap> = {
  'mvp-launch': {
    id: 'mvp-launch',
    name: 'MVP Launch Roadmap',
    milestones: [
      {
        id: 'mvp-1',
        title: 'Define MVP Scope',
        due: 'Week 3',
        progress: 0,
        tasks: 4,
        completed: 0,
        description: 'Identify core features and user stories'
      },
      {
        id: 'mvp-2',
        title: 'Design & Prototype',
        due: 'Week 6',
        progress: 0,
        tasks: 4,
        completed: 0,
        description: 'Create UI/UX designs and clickable prototype'
      },
      {
        id: 'mvp-3',
        title: 'Build MVP',
        due: 'Week 10',
        progress: 0,
        tasks: 4,
        completed: 0,
        description: 'Develop core functionality and features'
      },
      {
        id: 'mvp-4',
        title: 'Launch & Test',
        due: 'Week 12',
        progress: 0,
        tasks: 3,
        completed: 0,
        description: 'Deploy to production and gather user feedback'
      }
    ],
    tasks: [
      // Milestone 1: Define MVP Scope
      {
        id: 'mvp-task-1',
        title: 'Conduct user research interviews',
        description: 'Interview 10-15 potential users to understand their pain points and needs',
        status: 'done',
        priority: 'high',
        milestone: 'Define MVP Scope',
        due: 'Week 1',
        requirements: ['User interview script', 'Recording setup', 'Consent forms'],
        tags: ['research', 'users']
      },
      {
        id: 'mvp-task-2',
        title: 'Define core user stories',
        description: 'Write user stories for the 3-5 most critical features',
        status: 'done',
        priority: 'high',
        milestone: 'Define MVP Scope',
        due: 'Week 2',
        tags: ['planning', 'product']
      },
      {
        id: 'mvp-task-3',
        title: 'Prioritize feature backlog',
        description: 'Use MoSCoW method to prioritize features for MVP',
        status: 'in-progress',
        priority: 'medium',
        milestone: 'Define MVP Scope',
        due: 'Week 2',
        tags: ['planning']
      },
      {
        id: 'mvp-task-4',
        title: 'Create product requirements doc',
        description: 'Document detailed requirements for MVP features',
        status: 'todo',
        priority: 'high',
        milestone: 'Define MVP Scope',
        due: 'Week 3',
        tags: ['documentation']
      },
      // Milestone 2: Design & Prototype
      {
        id: 'mvp-task-5',
        title: 'Design user flows',
        description: 'Map out user journeys for key features',
        status: 'in-progress',
        priority: 'high',
        milestone: 'Design & Prototype',
        due: 'Week 4',
        tags: ['design', 'ux']
      },
      {
        id: 'mvp-task-6',
        title: 'Create wireframes',
        description: 'Design low-fidelity wireframes for all screens',
        status: 'todo',
        priority: 'high',
        milestone: 'Design & Prototype',
        due: 'Week 4',
        tags: ['design', 'wireframes']
      },
      // Milestone 3: Build MVP
      {
        id: 'mvp-task-9',
        title: 'Set up development environment',
        description: 'Configure Git, CI/CD, and development tools',
        status: 'review',
        priority: 'high',
        milestone: 'Build MVP',
        due: 'Week 7',
        tags: ['development', 'setup']
      },
      {
        id: 'mvp-task-10',
        title: 'Build backend infrastructure',
        description: 'Set up database, API, and authentication',
        status: 'in-progress',
        priority: 'high',
        milestone: 'Build MVP',
        due: 'Week 8',
        tags: ['development', 'backend']
      },
      {
        id: 'mvp-task-11',
        title: 'Develop core features',
        description: 'Implement the 3-5 core MVP features',
        status: 'in-progress',
        priority: 'high',
        milestone: 'Build MVP',
        due: 'Week 9',
        tags: ['development', 'frontend']
      },
      {
        id: 'mvp-task-12',
        title: 'Write automated tests',
        description: 'Create unit and integration tests for critical paths',
        status: 'todo',
        priority: 'medium',
        milestone: 'Build MVP',
        due: 'Week 10',
        tags: ['development', 'testing']
      },
      // Milestone 4: Launch & Test
      {
        id: 'mvp-task-13',
        title: 'Deploy to production',
        description: 'Launch MVP to production environment',
        status: 'todo',
        priority: 'high',
        milestone: 'Launch & Test',
        due: 'Week 11',
        tags: ['launch', 'deployment']
      },
      {
        id: 'mvp-task-14',
        title: 'Onboard beta users',
        description: 'Invite 20-30 early users to test the MVP',
        status: 'todo',
        priority: 'high',
        milestone: 'Launch & Test',
        due: 'Week 11',
        tags: ['launch', 'users']
      }
    ]
  },

  'product-market-fit': {
    id: 'product-market-fit',
    name: 'Product-Market Fit Framework',
    milestones: [
      {
        id: 'pmf-1',
        title: 'Validate Problem',
        due: 'Week 3',
        progress: 0,
        tasks: 3,
        completed: 0,
        description: 'Confirm the problem is real and worth solving'
      },
      {
        id: 'pmf-2',
        title: 'Identify Target Customers',
        due: 'Week 6',
        progress: 0,
        tasks: 4,
        completed: 0,
        description: 'Define and reach your ideal customer profile'
      },
      {
        id: 'pmf-3',
        title: 'Test Value Proposition',
        due: 'Week 9',
        progress: 0,
        tasks: 5,
        completed: 0,
        description: 'Validate that your solution resonates with users'
      }
    ],
    tasks: [
      {
        id: 'pmf-task-1',
        title: 'Conduct problem discovery interviews',
        description: 'Interview 20+ people in your target market',
        status: 'done',
        priority: 'high',
        milestone: 'Validate Problem',
        due: 'Week 2',
        tags: ['research', 'validation']
      },
      {
        id: 'pmf-task-2',
        title: 'Quantify problem severity',
        description: 'Survey to measure how painful the problem is',
        status: 'in-progress',
        priority: 'high',
        milestone: 'Validate Problem',
        due: 'Week 2',
        tags: ['research', 'survey']
      },
      {
        id: 'pmf-task-3',
        title: 'Analyze competitive landscape',
        description: 'Research existing solutions and alternatives',
        status: 'todo',
        priority: 'medium',
        milestone: 'Validate Problem',
        due: 'Week 3',
        tags: ['research', 'competition']
      },
      {
        id: 'pmf-task-4',
        title: 'Create customer personas',
        description: 'Develop 2-3 detailed buyer personas',
        status: 'in-progress',
        priority: 'high',
        milestone: 'Identify Target Customers',
        due: 'Week 4',
        tags: ['customers', 'personas']
      },
      {
        id: 'pmf-task-5',
        title: 'Define ideal customer profile',
        description: 'Document characteristics of your perfect customer',
        status: 'review',
        priority: 'high',
        milestone: 'Identify Target Customers',
        due: 'Week 4',
        tags: ['customers', 'icp']
      },
      {
        id: 'pmf-task-6',
        title: 'Build customer acquisition channels',
        description: 'Identify and test 3-5 channels to reach customers',
        status: 'todo',
        priority: 'medium',
        milestone: 'Identify Target Customers',
        due: 'Week 5',
        tags: ['marketing', 'acquisition']
      },
      {
        id: 'pmf-task-7',
        title: 'Create landing page',
        description: 'Build a landing page to test value proposition',
        status: 'todo',
        priority: 'high',
        milestone: 'Identify Target Customers',
        due: 'Week 6',
        tags: ['marketing', 'landing']
      },
      {
        id: 'pmf-task-8',
        title: 'Run value proposition experiments',
        description: 'A/B test different value propositions',
        status: 'todo',
        priority: 'high',
        milestone: 'Test Value Proposition',
        due: 'Week 7',
        tags: ['testing', 'validation']
      },
      {
        id: 'pmf-task-9',
        title: 'Measure Sean Ellis test score',
        description: 'Survey users: "How would you feel if you could no longer use this?"',
        status: 'todo',
        priority: 'high',
        milestone: 'Test Value Proposition',
        due: 'Week 8',
        tags: ['metrics', 'pmf']
      },
      {
        id: 'pmf-task-10',
        title: 'Track retention metrics',
        description: 'Measure Day 1, Day 7, Day 30 retention rates',
        status: 'todo',
        priority: 'high',
        milestone: 'Test Value Proposition',
        due: 'Week 8',
        tags: ['metrics', 'retention']
      }
    ]
  },

  'fundraising': {
    id: 'fundraising',
    name: 'Fundraising Preparation',
    milestones: [
      {
        id: 'fund-1',
        title: 'Build Financial Model',
        due: 'Week 2',
        progress: 0,
        tasks: 3,
        completed: 0,
        description: 'Create detailed financial projections'
      },
      {
        id: 'fund-2',
        title: 'Create Pitch Materials',
        due: 'Week 4',
        progress: 0,
        tasks: 4,
        completed: 0,
        description: 'Design compelling pitch deck and materials'
      },
      {
        id: 'fund-3',
        title: 'Investor Outreach',
        due: 'Week 8',
        progress: 0,
        tasks: 3,
        completed: 0,
        description: 'Connect with and pitch to investors'
      }
    ],
    tasks: [
      {
        id: 'fund-task-1',
        title: 'Build 3-year financial model',
        description: 'Create detailed revenue, expense, and cash flow projections',
        status: 'in-progress',
        priority: 'high',
        milestone: 'Build Financial Model',
        due: 'Week 1',
        tags: ['financial', 'planning']
      },
      {
        id: 'fund-task-2',
        title: 'Determine raise amount',
        description: 'Calculate how much capital you need and for what milestones',
        status: 'done',
        priority: 'high',
        milestone: 'Build Financial Model',
        due: 'Week 1',
        tags: ['financial', 'strategy']
      },
      {
        id: 'fund-task-3',
        title: 'Prepare cap table',
        description: 'Document current ownership and projected dilution',
        status: 'review',
        priority: 'medium',
        milestone: 'Build Financial Model',
        due: 'Week 2',
        tags: ['financial', 'equity']
      },
      {
        id: 'fund-task-4',
        title: 'Design investor pitch deck',
        description: 'Create 12-15 slide pitch deck covering problem, solution, traction',
        status: 'in-progress',
        priority: 'high',
        milestone: 'Create Pitch Materials',
        due: 'Week 3',
        tags: ['pitch', 'design']
      },
      {
        id: 'fund-task-5',
        title: 'Write executive summary',
        description: '1-page summary of your business and opportunity',
        status: 'review',
        priority: 'high',
        milestone: 'Create Pitch Materials',
        due: 'Week 3',
        tags: ['pitch', 'documents']
      },
      {
        id: 'fund-task-6',
        title: 'Prepare data room',
        description: 'Organize all due diligence documents (financials, legal, etc)',
        status: 'todo',
        priority: 'medium',
        milestone: 'Create Pitch Materials',
        due: 'Week 4',
        tags: ['documents', 'due-diligence']
      },
      {
        id: 'fund-task-8',
        title: 'Build investor target list',
        description: 'Research and list 50+ relevant investors',
        status: 'todo',
        priority: 'high',
        milestone: 'Investor Outreach',
        due: 'Week 5',
        tags: ['investors', 'research']
      },
      {
        id: 'fund-task-9',
        title: 'Secure warm introductions',
        description: 'Get intros to at least 20 investors through network',
        status: 'todo',
        priority: 'high',
        milestone: 'Investor Outreach',
        due: 'Week 6',
        tags: ['investors', 'networking']
      }
    ]
  },

  'team-building': {
    id: 'team-building',
    name: 'Team Building & Culture',
    milestones: [
      {
        id: 'team-1',
        title: 'Define Roles & Culture',
        due: 'Week 2',
        progress: 0,
        tasks: 3,
        completed: 0,
        description: 'Establish team structure and values'
      },
      {
        id: 'team-2',
        title: 'Recruit Key Hires',
        due: 'Week 6',
        progress: 0,
        tasks: 5,
        completed: 0,
        description: 'Hire critical team members'
      }
    ],
    tasks: [
      {
        id: 'team-task-1',
        title: 'Define company values',
        description: 'Establish 3-5 core company values and culture principles',
        status: 'done',
        priority: 'high',
        milestone: 'Define Roles & Culture',
        due: 'Week 1',
        tags: ['culture', 'values']
      },
      {
        id: 'team-task-2',
        title: 'Create organizational chart',
        description: 'Map out current and future team structure',
        status: 'in-progress',
        priority: 'medium',
        milestone: 'Define Roles & Culture',
        due: 'Week 1',
        tags: ['planning', 'structure']
      },
      {
        id: 'team-task-3',
        title: 'Write job descriptions',
        description: 'Create detailed JDs for next 3-5 hires',
        status: 'todo',
        priority: 'high',
        milestone: 'Define Roles & Culture',
        due: 'Week 2',
        tags: ['hiring', 'planning']
      },
      {
        id: 'team-task-4',
        title: 'Set up hiring pipeline',
        description: 'Choose ATS and create hiring workflow',
        status: 'review',
        priority: 'medium',
        milestone: 'Recruit Key Hires',
        due: 'Week 3',
        tags: ['hiring', 'tools']
      },
      {
        id: 'team-task-5',
        title: 'Source candidates',
        description: 'Post jobs and reach out to potential candidates',
        status: 'in-progress',
        priority: 'high',
        milestone: 'Recruit Key Hires',
        due: 'Week 4',
        tags: ['hiring', 'recruitment']
      },
      {
        id: 'team-task-6',
        title: 'Conduct interviews',
        description: 'Screen and interview top candidates',
        status: 'todo',
        priority: 'high',
        milestone: 'Recruit Key Hires',
        due: 'Week 5',
        tags: ['hiring', 'interviews']
      },
      {
        id: 'team-task-7',
        title: 'Make offers',
        description: 'Extend offers to selected candidates',
        status: 'todo',
        priority: 'high',
        milestone: 'Recruit Key Hires',
        due: 'Week 6',
        tags: ['hiring', 'offers']
      },
      {
        id: 'team-task-8',
        title: 'Create onboarding process',
        description: 'Build onboarding materials and checklist',
        status: 'todo',
        priority: 'medium',
        milestone: 'Recruit Key Hires',
        due: 'Week 6',
        tags: ['onboarding', 'process']
      }
    ]
  },

  'growth-marketing': {
    id: 'growth-marketing',
    name: 'Growth & Marketing Plan',
    milestones: [
      {
        id: 'growth-1',
        title: 'Setup Growth Infrastructure',
        due: 'Week 2',
        progress: 0,
        tasks: 4,
        completed: 0,
        description: 'Set up tracking and marketing tools'
      },
      {
        id: 'growth-2',
        title: 'Launch Marketing Campaigns',
        due: 'Week 6',
        progress: 0,
        tasks: 5,
        completed: 0,
        description: 'Execute multi-channel marketing strategy'
      },
      {
        id: 'growth-3',
        title: 'Optimize & Scale',
        due: 'Week 10',
        progress: 0,
        tasks: 5,
        completed: 0,
        description: 'Analyze and double down on what works'
      }
    ],
    tasks: [
      {
        id: 'growth-task-1',
        title: 'Set up analytics',
        description: 'Implement Google Analytics, Mixpanel, or Amplitude',
        status: 'done',
        priority: 'high',
        milestone: 'Setup Growth Infrastructure',
        due: 'Week 1',
        tags: ['analytics', 'tools']
      },
      {
        id: 'growth-task-2',
        title: 'Define growth metrics',
        description: 'Establish North Star metric and key growth KPIs',
        status: 'in-progress',
        priority: 'high',
        milestone: 'Setup Growth Infrastructure',
        due: 'Week 1',
        tags: ['metrics', 'strategy']
      },
      {
        id: 'growth-task-3',
        title: 'Build marketing tech stack',
        description: 'Set up email, CRM, social media management tools',
        status: 'review',
        priority: 'medium',
        milestone: 'Setup Growth Infrastructure',
        due: 'Week 2',
        tags: ['tools', 'marketing']
      },
      {
        id: 'growth-task-4',
        title: 'Create content calendar',
        description: 'Plan 3 months of content across all channels',
        status: 'done',
        priority: 'medium',
        milestone: 'Setup Growth Infrastructure',
        due: 'Week 2',
        tags: ['content', 'planning']
      },
      {
        id: 'growth-task-5',
        title: 'Launch SEO campaign',
        description: 'Optimize website and create SEO content',
        status: 'in-progress',
        priority: 'high',
        milestone: 'Launch Marketing Campaigns',
        due: 'Week 3',
        tags: ['seo', 'marketing']
      },
      {
        id: 'growth-task-6',
        title: 'Start content marketing',
        description: 'Publish blog posts, videos, and social content',
        status: 'review',
        priority: 'high',
        milestone: 'Launch Marketing Campaigns',
        due: 'Week 4',
        tags: ['content', 'marketing']
      },
      {
        id: 'growth-task-7',
        title: 'Run paid acquisition tests',
        description: 'Test Google Ads, Facebook Ads, LinkedIn Ads',
        status: 'todo',
        priority: 'high',
        milestone: 'Launch Marketing Campaigns',
        due: 'Week 5',
        tags: ['paid-ads', 'marketing']
      },
      {
        id: 'growth-task-8',
        title: 'Build email nurture sequences',
        description: 'Create automated email campaigns',
        status: 'todo',
        priority: 'medium',
        milestone: 'Launch Marketing Campaigns',
        due: 'Week 5',
        tags: ['email', 'automation']
      },
      {
        id: 'growth-task-9',
        title: 'Launch referral program',
        description: 'Build and promote user referral program',
        status: 'todo',
        priority: 'medium',
        milestone: 'Launch Marketing Campaigns',
        due: 'Week 6',
        tags: ['referral', 'growth']
      },
      {
        id: 'growth-task-10',
        title: 'Analyze channel performance',
        description: 'Evaluate ROI of each marketing channel',
        status: 'todo',
        priority: 'high',
        milestone: 'Optimize & Scale',
        due: 'Week 7',
        tags: ['analytics', 'optimization']
      },
      {
        id: 'growth-task-11',
        title: 'Optimize conversion funnels',
        description: 'A/B test and improve signup/purchase flows',
        status: 'todo',
        priority: 'high',
        milestone: 'Optimize & Scale',
        due: 'Week 8',
        tags: ['conversion', 'optimization']
      },
      {
        id: 'growth-task-12',
        title: 'Scale winning channels',
        description: 'Increase budget on highest ROI channels',
        status: 'todo',
        priority: 'high',
        milestone: 'Optimize & Scale',
        due: 'Week 9',
        tags: ['scaling', 'marketing']
      },
      {
        id: 'growth-task-13',
        title: 'Build growth loops',
        description: 'Create viral/retention loops to sustain growth',
        status: 'todo',
        priority: 'medium',
        milestone: 'Optimize & Scale',
        due: 'Week 10',
        tags: ['growth', 'product']
      },
      {
        id: 'growth-task-14',
        title: 'Report on growth metrics',
        description: 'Create dashboard and monthly growth reports',
        status: 'todo',
        priority: 'medium',
        milestone: 'Optimize & Scale',
        due: 'Week 10',
        tags: ['reporting', 'analytics']
      }
    ]
  },

  'innovation': {
    id: 'innovation',
    name: 'Innovation & Experimentation',
    milestones: [
      {
        id: 'innov-1',
        title: 'Build Experimentation Framework',
        due: 'Week 3',
        progress: 0,
        tasks: 3,
        completed: 0,
        description: 'Set up systematic approach to testing ideas'
      },
      {
        id: 'innov-2',
        title: 'Run Experiments',
        due: 'Week 8',
        progress: 0,
        tasks: 4,
        completed: 0,
        description: 'Test new features and business models'
      },
      {
        id: 'innov-3',
        title: 'Scale Winners',
        due: 'Week 12',
        progress: 0,
        tasks: 2,
        completed: 0,
        description: 'Double down on successful experiments'
      }
    ],
    tasks: [
      {
        id: 'innov-task-1',
        title: 'Create experiment process',
        description: 'Define hypothesis→test→learn framework',
        status: 'done',
        priority: 'high',
        milestone: 'Build Experimentation Framework',
        due: 'Week 1',
        tags: ['process', 'innovation']
      },
      {
        id: 'innov-task-2',
        title: 'Build experiment backlog',
        description: 'List 20+ ideas to test',
        status: 'in-progress',
        priority: 'high',
        milestone: 'Build Experimentation Framework',
        due: 'Week 2',
        tags: ['planning', 'ideas']
      },
      {
        id: 'innov-task-3',
        title: 'Set up A/B testing tools',
        description: 'Implement Optimizely, VWO, or custom solution',
        status: 'todo',
        priority: 'medium',
        milestone: 'Build Experimentation Framework',
        due: 'Week 3',
        tags: ['tools', 'testing']
      },
      {
        id: 'innov-task-4',
        title: 'Run feature experiments',
        description: 'Test 3-5 new product features with users',
        status: 'in-progress',
        priority: 'high',
        milestone: 'Run Experiments',
        due: 'Week 5',
        tags: ['product', 'testing']
      },
      {
        id: 'innov-task-5',
        title: 'Test pricing models',
        description: 'Experiment with different pricing strategies',
        status: 'review',
        priority: 'high',
        milestone: 'Run Experiments',
        due: 'Week 6',
        tags: ['pricing', 'monetization']
      },
      {
        id: 'innov-task-6',
        title: 'Explore new markets',
        description: 'Test product in 2-3 adjacent markets',
        status: 'todo',
        priority: 'medium',
        milestone: 'Run Experiments',
        due: 'Week 7',
        tags: ['market', 'expansion']
      },
      {
        id: 'innov-task-7',
        title: 'Analyze experiment results',
        description: 'Review data and document learnings',
        status: 'todo',
        priority: 'high',
        milestone: 'Run Experiments',
        due: 'Week 8',
        tags: ['analytics', 'learnings']
      },
      {
        id: 'innov-task-8',
        title: 'Productize winning experiments',
        description: 'Build out successful experiments into full features',
        status: 'todo',
        priority: 'high',
        milestone: 'Scale Winners',
        due: 'Week 10',
        tags: ['product', 'development']
      },
      {
        id: 'innov-task-9',
        title: 'Create innovation playbook',
        description: 'Document process and best practices',
        status: 'todo',
        priority: 'medium',
        milestone: 'Scale Winners',
        due: 'Week 12',
        tags: ['documentation', 'process']
      }
    ]
  }
};

export const getTemplatesRoadmap = (templateIds: string[]): { milestones: Milestone[], tasks: Task[] } => {
  const allMilestones: Milestone[] = [];
  const allTasks: Task[] = [];

  templateIds.forEach(templateId => {
    const roadmap = templateRoadmaps[templateId];
    if (roadmap) {
      allMilestones.push(...roadmap.milestones);
      allTasks.push(...roadmap.tasks);
    }
  });

  return { milestones: allMilestones, tasks: allTasks };
};
