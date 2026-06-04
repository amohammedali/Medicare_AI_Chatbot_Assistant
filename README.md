MediMind AI 🧠
MediMind AI is an intelligent, 24/7 medical assistant chatbot built with Next.js, Gemini 2.0 Flash, and MongoDB. It features a stunning 3D glassmorphism interface and provides detailed, evidence-informed responses to health queries, medicine searches, and drug interactions.

🌟 Features
Conversational AI: Powered by Google's latest Gemini 2.0 Flash model.
Dynamic Imagery: Automatically generates and displays relevant images for queries using Pollinations AI.
Secure Authentication: Full registration and login system powered by MongoDB, Mongoose, bcryptjs, and JWT session tokens.
Premium UI/UX: Built with a fully responsive frosted-glass aesthetic over an animated Three.js particle background.
Offline Fallback Mode: Gracefully handles API rate limits by providing simulated, perfectly-formatted medical responses.
Markdown Formatting: Renders clean, bulleted lists and clickable reference links directly in the chat.
🚀 Tech Stack
Frontend: Next.js (App Router), React, CSS (Glassmorphism), Three.js (Background)
Backend: Next.js Serverless API Routes
Database: MongoDB & Mongoose
Authentication: JSON Web Tokens (JWT) & bcryptjs
AI Integration: @google/genai SDK
⚙️ Getting Started
1. Clone the repository
```bash git clone https://github.com/your-username/AI_chatbot.git cd AI_chatbot ```

2. Install dependencies
```bash npm install ```

3. Set up Environment Variables
Create a .env.local file in the root directory and add the following keys: ```env

Google Gemini API Key
GEMINI_API_KEY="your_google_gemini_api_key_here"

MongoDB Connection String (Atlas or Local)
MONGODB_URI="mongodb://127.0.0.1:27017/chatbot"

JWT Secret for secure sessions
JWT_SECRET="generate_a_random_secure_string_here" ```

4. Run the Development Server
```bash npm run dev ``` Open http://localhost:3000 in your browser to see the application!

🔒 Authentication Flow
The application strictly protects the /chat route. Users must create an account on the landing page /register or sign in via /login. Data is securely stored in your MongoDB database.

⚠️ Disclaimer
MediMind AI provides informational assistance only. It cannot diagnose, treat, or replace the advice of a licensed healthcare professional.
