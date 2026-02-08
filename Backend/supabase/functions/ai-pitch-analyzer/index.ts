// ============================================
// AI Pitch Analyzer Edge Function
// ============================================
// Analyzes startup pitches and provides detailed feedback

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const openAIKey = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PitchRequest {
  startupId: string
  pitchContent: string
  startupInfo?: {
    name: string
    industry: string
    stage: string
    description: string
  }
}

interface PitchAnalysis {
  score: number
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  detailed_feedback: {
    problem: { score: number; feedback: string }
    solution: { score: number; feedback: string }
    market: { score: number; feedback: string }
    team: { score: number; feedback: string }
    traction: { score: number; feedback: string }
    financials: { score: number; feedback: string }
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { startupId, pitchContent, startupInfo }: PitchRequest = await req.json()

    if (!startupId || !pitchContent) {
      throw new Error('Missing required fields: startupId and pitchContent')
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

    // Get startup info if not provided
    if (!startupInfo) {
      const { data: startup } = await supabaseClient
        .from('startups')
        .select('name, industry, stage, description')
        .eq('id', startupId)
        .single()
      
      if (startup) {
        startupInfo = startup as any
      }
    }

    console.log('Analyzing pitch for:', startupInfo?.name || startupId)

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
            content: `You are an expert venture capital investor who evaluates startup pitches. 

Analyze the pitch across these 6 dimensions:
1. Problem - Is there a clear, compelling problem being solved?
2. Solution - Is the solution innovative and well-explained?
3. Market - Is the market size and opportunity clear?
4. Team - Is the team capable and experienced?
5. Traction - Are there metrics, users, or revenue?
6. Financials - Is the business model and unit economics explained?

For each dimension, provide:
- score (0-100)
- feedback (2-3 sentences of specific, actionable feedback)

Also provide:
- overall score (0-100, weighted average)
- 3-5 key strengths
- 3-5 key weaknesses
- 5-7 specific recommendations for improvement

Return ONLY a JSON object matching this exact structure:
{
  "score": 75,
  "strengths": ["Clear problem statement", "Strong founding team"],
  "weaknesses": ["Market size unclear", "No traction metrics"],
  "recommendations": ["Add TAM/SAM/SOM analysis", "Include customer testimonials"],
  "detailed_feedback": {
    "problem": {"score": 85, "feedback": "..."},
    "solution": {"score": 75, "feedback": "..."},
    "market": {"score": 60, "feedback": "..."},
    "team": {"score": 80, "feedback": "..."},
    "traction": {"score": 50, "feedback": "..."},
    "financials": {"score": 70, "feedback": "..."}
  }
}`
          },
          {
            role: 'user',
            content: `Startup: ${startupInfo?.name || 'Unknown'}
Industry: ${startupInfo?.industry || 'Not specified'}
Stage: ${startupInfo?.stage || 'Not specified'}

Pitch:
${pitchContent}`
          }
        ],
        temperature: 0.3,
        max_tokens: 3000,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenAI API error:', error)
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    console.log('OpenAI response received, parsing...')

    // Parse the JSON response
    let analysis: PitchAnalysis
    try {
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      analysis = JSON.parse(cleanContent)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content)
      throw new Error('Invalid response format from AI')
    }

    // Validate analysis structure
    if (!analysis.score || !analysis.detailed_feedback) {
      throw new Error('Invalid analysis structure')
    }

    // Store analysis in database
    const { error: insertError } = await supabaseClient
      .from('ai_insights')
      .insert({
        startup_id: startupId,
        insight_type: 'performance',
        title: `Pitch Analysis Score: ${analysis.score}/100`,
        description: `Analyzed your pitch deck. Key strengths: ${analysis.strengths.slice(0, 2).join(', ')}. Areas for improvement: ${analysis.weaknesses.slice(0, 2).join(', ')}.`,
        priority: analysis.score < 60 ? 'high' : analysis.score < 80 ? 'medium' : 'low',
        category: 'pitch_analysis',
        action_items: analysis.recommendations,
      })

    if (insertError) {
      console.error('Error storing insight:', insertError)
      // Don't fail the request if insight storage fails
    }

    console.log('Pitch analysis completed successfully')

    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in ai-pitch-analyzer:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to analyze pitch',
        details: error.toString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
