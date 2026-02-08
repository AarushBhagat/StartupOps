// ============================================
// AI Insights Generator Edge Function
// ============================================
// Generates proactive insights based on startup metrics and tasks

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const openAIKey = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface InsightsRequest {
  startupId: string
  metricsData?: {
    mrr: number
    users: number
    growth: number
    burn_rate: number
  }
  tasksData?: {
    total: number
    completed: number
    overdue: number
  }
}

interface GeneratedInsight {
  type: 'positive' | 'warning' | 'suggestion' | 'info'
  category: string
  title: string
  description: string
  action?: string
  icon?: string
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { startupId, metricsData, tasksData }: InsightsRequest = await req.json()

    if (!startupId) {
      throw new Error('Missing required field: startupId')
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get startup info
    const { data: startup } = await supabaseClient
      .from('startups')
      .select('name, industry, stage, description')
      .eq('id', startupId)
      .single()

    // Get latest metrics if not provided
    let metrics = metricsData
    if (!metrics) {
      const { data: latestMetrics } = await supabaseClient
        .from('metrics')
        .select('mrr, users_count, growth_rate, burn_rate')
        .eq('startup_id', startupId)
        .order('recorded_at', { ascending: false })
        .limit(1)
        .single()
      
      if (latestMetrics) {
        metrics = {
          mrr: latestMetrics.mrr,
          users: latestMetrics.users_count,
          growth: latestMetrics.growth_rate,
          burn_rate: latestMetrics.burn_rate,
        }
      }
    }

    // Get task stats if not provided
    let tasks = tasksData
    if (!tasks) {
      const { data: taskStats } = await supabaseClient
        .from('tasks')
        .select('status, due_date')
        .eq('startup_id', startupId)
      
      if (taskStats) {
        const now = new Date()
        tasks = {
          total: taskStats.length,
          completed: taskStats.filter(t => t.status === 'done').length,
          overdue: taskStats.filter(t => 
            t.due_date && new Date(t.due_date) < now && t.status !== 'done'
          ).length,
        }
      }
    }

    // Build context
    const context = `
Startup: ${startup?.name || 'Unknown'}
Industry: ${startup?.industry || 'Not specified'}
Stage: ${startup?.stage || 'idea'}

Current Metrics:
- MRR: $${metrics?.mrr || 0}
- Users: ${metrics?.users || 0}
- Growth Rate: ${metrics?.growth || 0}%
- Monthly Burn: $${metrics?.burn_rate || 0}

Task Status:
- Total Tasks: ${tasks?.total || 0}
- Completed: ${tasks?.completed || 0}
- Overdue: ${tasks?.overdue || 0}

Generate 3-5 actionable insights to help this startup succeed.
    `.trim()

    console.log('Generating insights for:', startup?.name || startupId)

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are a startup advisor AI that generates proactive, actionable insights.

Based on the startup's data, generate 3-5 insights. Each insight should be:
- Specific and actionable
- Based on the actual data provided
- Relevant to the startup's stage and situation

For each insight, provide:
- type: 'positive' (celebrating wins), 'warning' (critical issues), 'suggestion' (opportunities), or 'info' (FYI)
- category: e.g., 'growth', 'operations', 'finance', 'team', 'product'
- title: Short, attention-grabbing headline (3-7 words)
- description: 2-3 sentences explaining the insight and why it matters
- action: Specific next step to take (optional, 1 sentence)

Return ONLY a JSON array of insight objects. Example:
[
  {
    "type": "warning",
    "category": "operations",
    "title": "8 tasks overdue this week",
    "description": "Your team has 8 overdue tasks, which could impact velocity and morale. This represents 25% of active work and suggests potential bottlenecks.",
    "action": "Review overdue tasks in today's standup and reassign or break down large tasks."
  },
  {
    "type": "positive",
    "category": "growth",
    "title": "MRR grew 15% this month",
    "description": "Your MRR increased from $8,500 to $9,775, showing strong momentum. This growth rate puts you on track to hit $12K MRR by Q2.",
    "action": "Document what's working and double down on successful channels."
  }
]`
          },
          {
            role: 'user',
            content: context
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenAI API error:', error)
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    console.log('OpenAI response received')

    // Parse the JSON response
    let insights: GeneratedInsight[]
    try {
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      insights = JSON.parse(cleanContent)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content)
      throw new Error('Invalid response format from AI')
    }

    // Store insights in database
    const insightsToStore = insights.map(insight => ({
      startup_id: startupId,
      insight_type: insight.type === 'warning' ? 'warning' : 
                   insight.type === 'positive' ? 'milestone' : 'suggestion',
      title: insight.title,
      description: insight.description,
      priority: insight.type === 'warning' ? 'high' : 
               insight.type === 'positive' ? 'low' : 'medium',
      category: insight.category,
      action_items: insight.action ? [insight.action] : [],
    }))

    const { error: insertError } = await supabaseClient
      .from('ai_insights')
      .insert(insightsToStore)

    if (insertError) {
      console.error('Error storing insights:', insertError)
      // Don't fail the request if storage fails
    }

    console.log(`Generated and stored ${insights.length} insights`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        insights,
        count: insights.length
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in ai-insights-generator:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to generate insights',
        details: error.toString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
