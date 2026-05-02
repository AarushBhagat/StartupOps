import { Request, Response } from 'express';
import { adminDb } from '../config/firebase';
import * as crypto from 'crypto';

// Fast memory cache for AI Roadmap generations (Hash key based)
const roadmapCache: Record<string, any> = {};

export const onboardStartup = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { startupName, industry, description, stage, selectedTemplates } = req.body;

    if (!startupName || !industry || !description || !stage) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 1. Save data to Firestore (Startup profile under the user)
    const userRef = adminDb.collection('users').doc(userId);

    // Use merge: true so we don't overwrite existing fields like email
    await userRef.set({
      startupProfile: {
        startupName,
        industry,
        description,
        stage,
        selectedTemplates: selectedTemplates || [],
        onboardedAt: new Date().toISOString()
      }
    }, { merge: true });

    // 2. Generate customized AI roadmap
    let aiRoadmap = null;
    try {
      if (process.env.GEMINI_API_KEY) {
        // Load the new SDK dynamically or statically
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const TEMPLATE_CONFIG: Record<string, { name: string; milestones: string[]; estimatedWeeks: number }> = {
          'mvp-launch': { name: "MVP Launch Roadmap", milestones: ["Idea Validation", "Feature Planning", "MVP Development", "Launch & Feedback"], estimatedWeeks: 12 },
          'product-market-fit': { name: "Product-Market Fit Framework", milestones: ["Customer Discovery", "Problem Validation", "Solution Testing"], estimatedWeeks: 8 },
          'fundraising': { name: "Fundraising Preparation", milestones: ["Pitch Deck", "Financial Planning", "Investor Outreach"], estimatedWeeks: 10 },
          'team-building': { name: "Team Building & Culture", milestones: ["Hiring Plan", "Core Team Setup"], estimatedWeeks: 6 },
          'growth-marketing': { name: "Growth & Marketing Plan", milestones: ["Audience Research", "Acquisition Strategy", "Execution", "Optimization"], estimatedWeeks: 10 },
          'innovation': { name: "Innovation & Experimentation", milestones: ["Hypothesis Creation", "Experiment Design", "Iteration"], estimatedWeeks: 8 }
        };

        const combinedMilestones: string[] = [];
        let maxWeeks = 0;
        const validTemplates: string[] = [];

        // Map frontend template IDs to our strict backend configuration
        for (const tId of (selectedTemplates || [])) {
          const t = TEMPLATE_CONFIG[tId];
          if (t) {
            combinedMilestones.push(...t.milestones);
            validTemplates.push(t.name);
            if (t.estimatedWeeks > maxWeeks) maxWeeks = t.estimatedWeeks;
          }
        }

        // Fallback safety
        if (combinedMilestones.length === 0) {
          combinedMilestones.push("Define Core Features", "Launch MVP");
          validTemplates.push("Default MVP");
          maxWeeks = 12;
        }

        // Caching Layer implementation
        const cacheKey = crypto.createHash('sha256').update(`${startupName}-${industry}-${stage}-${validTemplates.join(',')}`).digest('hex');

        if (roadmapCache[cacheKey]) {
          console.log('Serving instant roadmap from memory Redis/hash cache');
          aiRoadmap = roadmapCache[cacheKey];
        } else {
          // Implementing the EXACT prompt required
          const prompt = `
You are a startup advisor.

Generate a customized roadmap using the provided milestones.

Startup Details:
Name: ${startupName}
Industry: ${industry}
Description: ${description}
Stage: ${stage}

Selected Template: ${validTemplates.join(', ')}

Milestones (STRICT ORDER):
${combinedMilestones.map((m, i) => `${i+1}. ${m}`).join('\\n')}

Instructions:
- Use EXACT milestone titles provided
- Generate only descriptions (max 15 words each)
- Keep response concise
- Do not add extra milestones

Return JSON:
{
  "message": "short encouraging message",
  "estimatedCompletion": ${maxWeeks},
  "milestones": [
    {
      "title": "milestone title",
      "description": "short description",
      "status": "pending"
    }
  ]
}

Return ONLY JSON
`.trim();

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              maxOutputTokens: 300, // Token Cap applied
              temperature: 0.5    // Low temp for predictability
            }
          });

          const responseText = response.text || '';
          const cleanedJson = responseText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();

          aiRoadmap = JSON.parse(cleanedJson);
          roadmapCache[cacheKey] = aiRoadmap; // Store in cache
          console.log('Successfully generated and cached template roadmap');
        }

        // Save the AI roadmap to Firestore
        await userRef.set({
          roadmap: aiRoadmap
        }, { merge: true });
      } else {
        console.warn('GEMINI_API_KEY is not set. Skipping AI generation.');
      }
    } catch (aiError) {
      console.error('Error generating AI roadmap:', aiError);
      // Fallback to null roadmap if AI fails so the request doesn't completely fail
    }

    const finalRoadmap = aiRoadmap || {
      message: "Welcome to StartupOps! Your personalized AI roadmap couldn't be generated right now, but you can set up your tasks manually.",
      estimatedCompletion: 12,
      milestones: [
        { title: "Define Core Features", status: "pending", description: "Set up the basic functionality of your product." }
      ]
    };

    return res.status(200).json({
      message: 'Onboarding complete',
      roadmap: finalRoadmap
    });

  } catch (error) {
    console.error('Error in onboardStartup:', error);
    return res.status(500).json({ error: 'Internal server error during onboarding' });
  }
};

export const generateTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const userRef = adminDb.collection('users').doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    const context = userData?.startupProfile
      ? `Startup Context: Name: ${userData.startupProfile.startupName}, Industry: ${userData.startupProfile.industry}, Stage: ${userData.startupProfile.stage}.`
      : 'You are an expert startup advisor and project manager.';

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API not configured.' });
    }

    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const fullPrompt = `
      ${context}
      
      The user has requested to add a new task or milestone.
      User Request/Prompt: "${prompt}"

      Generate 1 to 3 relevant, actionable tasks/milestones based on this request in strict JSON format matching this structure exactly:
      [
        {
          "title": "String (Task/Milestone name)",
          "description": "String (Detailed description of the task)",
          "status": "todo",
          "priority": "medium"
        }
      ]
      Return ONLY the raw JSON array, do not use markdown code blocks like \`\`\`json.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const responseText = response.text || '';
    const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

    const generatedTasks = JSON.parse(cleanedJson);

    return res.status(200).json({
      message: 'Generated successfully',
      tasks: generatedTasks
    });

  } catch (error) {
    console.error('Error generating task:', error);
    return res.status(500).json({ error: 'Internal server error during task generation' });
  }
};
