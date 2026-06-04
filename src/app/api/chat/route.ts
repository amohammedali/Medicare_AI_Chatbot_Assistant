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
  let query = "";
  try {
    const { messages } = await request.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    query = lastMessage?.content?.toLowerCase() || "";

    if (!ai) {
      // Fallback Mock Logic if no API Key is provided
      let responseContent = `(Simulation Mode - No API Key provided)\n\nI received your query about: "${lastMessage.content}".\n\nTo use the real AI, please add GEMINI_API_KEY to your environment variables.`;
      
      // Simple keyword-based mock for Professional Referral
      const urgentKeywords = ['chest pain', 'heart attack', 'bleeding', 'can\'t breathe', 'stroke', 'emergency'];
      if (urgentKeywords.some(keyword => query.includes(keyword))) {
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
      // Offline fallback for demo purposes when quota is exhausted
      let topic = "Medicine";
      if (query.includes("metformin")) topic = "Metformin";
      else if (query.includes("burn")) topic = "Burn%20Treatment";
      else if (query.includes("ibuprofen") || query.includes("aspirin")) topic = "Painkillers";

      const fallbackContent = `![${topic}](https://placehold.co/600x300/102030/2dd4bf?text=${topic})
      
### Offline Fallback Response
(Your API Quota is currently exhausted, providing a simulated offline answer)

* **Dosage / Usage:** Follow standard medical guidelines for ${topic}. Always consult a healthcare professional.
* **Side Effects:** May include standard mild reactions. Seek help if symptoms persist.

### Suggested Medicines
* Generic ${topic} formulation
* Standard OTC alternatives

### Reference Websites
* [WebMD Reference](https://www.webmd.com)
* [Mayo Clinic Guidelines](https://www.mayoclinic.org)`;

      return NextResponse.json({
        id: Date.now().toString(),
        type: 'bot',
        content: fallbackContent,
        timestamp: new Date()
      });
    }
    return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 });
  }
}
