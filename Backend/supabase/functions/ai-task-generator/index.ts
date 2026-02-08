// ============================================
// AI Task Generator Edge Function
// ============================================
// Generates smart tasks based on startup context

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const openAIKey = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TaskRequest {
  prompt: string
  startupId: string
  startupDescription?: string
}

interface GeneratedTask {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  estimated_hours: number
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, startupId, startupDescription }: TaskRequest = await req.json()

    if (!prompt || !startupId) {
      throw new Error('Missing required fields: prompt and startupId')
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

    // Get startup info from database
    const { data: startup, error: startupError } = await supabaseClient
      .from('startups')
      .select('name, industry, stage, description')
      .eq('id', startupId)
      .single()

    if (startupError) {
      console.error('Error fetching startup:', startupError)
    }

    // Build context for AI
    const context = `
Startup Name: ${startup?.name || 'Unknown'}
Industry: ${startup?.industry || 'Not specified'}
Stage: ${startup?.stage || 'idea'}
Description: ${startup?.description || startupDescription || 'Not provided'}

Generate specific, actionable tasks for: ${prompt}
    `.trim()

    console.log('Generating tasks with context:', context)

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
            content: `You are a startup operations expert. Generate 5-8 specific, actionable tasks based on the user's request.

For each task, provide:
1. title (concise, action-oriented, 3-7 words)
2. description (detailed explanation with context, 1-2 paragraphs)
3. priority (low/medium/high based on impact and urgency)
4. estimated_hours (realistic time estimate)

Return ONLY a JSON array of task objects. No markdown, no explanations.
Example format:
[
  {
    "title": "Set up Google Analytics",
    "description": "Install and configure Google Analytics 4 on the website to track user behavior, page views, and conversion events. Set up custom events for key user actions like signups and purchases.",
    "priority": "high",
    "estimated_hours": 3
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

    console.log('OpenAI response:', content)

    // Parse the JSON response
    let tasks: GeneratedTask[]
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      tasks = JSON.parse(cleanContent)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content)
      throw new Error('Invalid response format from AI')
    }

    // Validate and clean tasks
    const validTasks = tasks.filter(task => 
      task.title && 
      task.description && 
      ['low', 'medium', 'high'].includes(task.priority) &&
      task.estimated_hours > 0
    ).map(task => ({
      ...task,
      estimated_hours: Math.min(Math.max(task.estimated_hours, 0.5), 40) // Clamp between 0.5 and 40 hours
    }))

    if (validTasks.length === 0) {
      throw new Error('No valid tasks generated')
    }

    console.log(`Generated ${validTasks.length} valid tasks`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        tasks: validTasks,
        count: validTasks.length
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in ai-task-generator:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to generate tasks',
        details: error.toString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
