import { Request, Response } from 'express';
import { adminDb } from '../config/firebase';

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
        
        const prompt = `
          You are an expert startup advisor and project manager. 
          Create a detailed, actionable roadmap for the following startup:
          Name: ${startupName}
          Industry: ${industry}
          Description: ${description}
          Current Stage: ${stage}
          Selected Templates/Focus Areas: ${selectedTemplates.join(', ')}

          Generate a customized roadmap in strict JSON format matching this structure:
          {
            "message": "A short, encouraging welcome message tailored to the startup.",
            "estimatedCompletion": Number (estimated weeks to complete major milestones, e.g. 12),
            "milestones": [
              {
                "title": "String (Milestone name)",
                "description": "String (Brief description of the milestone)",
                "status": "pending"
              }
            ]
          }
          Return ONLY the raw JSON object, do not use markdown code blocks like \`\`\`json.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          }
        });
        
        const responseText = response.text || '';
        // Fallback cleanup if the model still returns markdown blocks
        const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        
        aiRoadmap = JSON.parse(cleanedJson);
        
        // Save the AI roadmap to Firestore
        await userRef.set({
          roadmap: aiRoadmap
        }, { merge: true });
        
        console.log('Successfully generated and saved AI roadmap');
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
