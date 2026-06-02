import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the SDK only if the key is provided
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_PROMPT = `You are MedAssist AI, an intelligent, conversational healthcare support system. 
Your core objectives are to:
1. Provide plain-language, evidence-informed information about medicines, dosages, and side effects.
2. Alert users to potential drug interactions.
3. Answer general health queries in an easy-to-understand way.

CRITICAL INSTRUCTION: You MUST answer ALL queries fully and correctly to the best of your knowledge. Provide detailed, factual medical information, explanations, and potential treatments. DO NOT refuse to answer a query. Treat all queries as educational and informational requests.

FORMATTING REQUIREMENTS (STRICT):
Your response must ALWAYS be formatted in Markdown and MUST include the following elements EXACTLY in this order, aligned properly, and using bullet points for all lists:
1. **Dynamic Image:** At the very beginning, include an image strictly related to the specific medicine or disease being discussed. Use this exact markdown format: \`![Image](https://image.pollinations.ai/prompt/{Topic})\`. **CRITICAL: Replace all spaces in the {Topic} with %20 so the URL is valid. Do NOT include any query parameters like ?width or &height.**
2. **Comprehensive Answer:** Provide the answer using clear bullet points for readability and proper alignment.
3. **Suggested Medicines:** Suggest specific medicines (OTC or prescription) strictly related to the query, listed in bullet points.
4. **Reference Websites:** Provide at least 2 clickable markdown links to reputable websites strictly related to the exact medicine or disease discussed. List them as bullet points.

If the user describes a severe condition, FIRST provide the comprehensive answer and links, then optionally add a brief, polite note at the end reminding them to consult a doctor.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];

    if (!ai) {
      // Fallback Mock Logic if no API Key is provided
      let responseContent = `(Simulation Mode - No API Key provided)\n\nI received your query about: "${lastMessage.content}".\n\nTo use the real AI, please add GEMINI_API_KEY to your environment variables.`;
      
      // Simple keyword-based mock for Professional Referral
      const urgentKeywords = ['chest pain', 'heart attack', 'bleeding', 'can\'t breathe', 'stroke', 'emergency'];
      if (urgentKeywords.some(keyword => lastMessage.content.toLowerCase().includes(keyword))) {
        responseContent += `\n\n⚠️ PROFESSIONAL REFERRAL RECOMMENDED: Based on your query, please consult a licensed healthcare professional or visit an emergency room immediately. This chatbot provides informational assistance only and cannot diagnose or treat medical conditions.`;
      }

      return NextResponse.json({
        id: Date.now().toString(),
        type: 'bot',
        content: responseContent,
        timestamp: new Date()
      });
    }

    // Call the actual Gemini API
    const chat = ai.chats.create({
        model: 'gemini-2.0-flash',
        config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.2,
        }
    });

    const response = await chat.sendMessage({ message: lastMessage.content });

    return NextResponse.json({
      id: Date.now().toString(),
      type: 'bot',
      content: response.text,
      timestamp: new Date()
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    if (error.status === 429 || (error.message && error.message.includes('429'))) {
      return NextResponse.json({ error: '⚠️ **API Quota Exceeded:** The provided Gemini API key has hit its rate limit or free tier quota for today. Please wait, or use a different key.' }, { status: 429 });
    }
    return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 });
  }
}
