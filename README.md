# 🧠 MediMind AI – Intelligent Medical Assistant Chatbot

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge\&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge\&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge\&logo=mongodb)
![Gemini](https://img.shields.io/badge/Google-Gemini%202.0%20Flash-orange?style=for-the-badge\&logo=google)
![JWT](https://img.shields.io/badge/JWT-Authentication-red?style=for-the-badge\&logo=jsonwebtokens)

### 🚀 AI-Powered Healthcare Assistant with Secure Authentication, Medicine Search, Drug Interaction Analysis, and Intelligent Health Guidance

</div>

---

## 📖 Overview

**MediMind AI** is an advanced AI-powered healthcare assistant designed to provide users with quick, intelligent, and informative responses to medical queries.

Built using **Next.js**, **Google Gemini 2.0 Flash**, and **MongoDB**, the application combines conversational AI with a modern glassmorphism user interface to deliver a seamless healthcare experience.

The chatbot assists users with:

* 💊 Medicine information and usage guidance
* ⚠️ Drug interaction awareness
* 🩺 General health-related questions
* 📚 Educational medical information
* 🖼️ Dynamic AI-generated medical imagery
* 🔐 Secure user authentication and personalized access

---

## ✨ Key Features

### 🤖 AI-Powered Medical Assistant

* Powered by **Google Gemini 2.0 Flash**
* Generates detailed, context-aware responses
* Supports a wide range of healthcare and medicine-related queries

### 💊 Medicine Search & Information

* Search medications instantly
* Learn about common uses and precautions
* Understand potential side effects

### ⚠️ Drug Interaction Awareness

* Provides informational insights about possible medicine interactions
* Helps users stay informed before consulting healthcare professionals

### 🖼️ Dynamic Medical Imagery

* Automatically generates relevant images based on user queries
* Powered by Pollinations AI

### 🔐 Secure Authentication System

* User Registration & Login
* Password hashing using bcryptjs
* JWT-based session authentication
* Protected routes and secure access

### 🎨 Premium User Interface

* Modern glassmorphism design
* Responsive layout for all devices
* Animated Three.js particle background
* Smooth user experience

### 📱 Fully Responsive

* Desktop
* Tablet
* Mobile devices

### 🛡️ Offline Fallback Mode

* Handles API rate limits gracefully
* Generates simulated medical responses when external AI services are unavailable

### 📝 Rich Text Formatting

* Markdown support
* Bullet-point responses
* Clickable references and links

---

## 🏗️ System Architecture

```text
User
 │
 ▼
Next.js Frontend
 │
 ├── Authentication Layer (JWT)
 │
 ├── Medical Chat Interface
 │
 ▼
API Routes
 │
 ├── Gemini AI Integration
 ├── Medicine Search Logic
 └── Image Generation Service
 │
 ▼
MongoDB Database
```

---

## 🚀 Tech Stack

### Frontend

* Next.js (App Router)
* React
* CSS3
* Glassmorphism UI
* Three.js

### Backend

* Next.js API Routes
* Serverless Architecture

### Database

* MongoDB Atlas
* Mongoose ODM

### Authentication

* JWT (JSON Web Tokens)
* bcryptjs

### Artificial Intelligence

* Google Gemini 2.0 Flash
* Pollinations AI

---

## 📂 Project Structure

```bash
MediMind-AI/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── login/
│   │   ├── register/
│   │   └── chat/
│   │
│   ├── lib/
│   │   ├── mongodb.ts
│   │   └── auth.ts
│   │
│   └── models/
│       └── User.ts
│
├── public/
├── .env.local
├── package.json
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/amohammedali/Medicare_AI_Chatbot_Assistant.git

cd Medicare_AI_Chatbot_Assistant
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a file named:

```bash
.env.local
```

Add the following:

```env
# Google Gemini API Key
GEMINI_API_KEY=your_google_gemini_api_key

# MongoDB Connection String
MONGODB_URI=mongodb://127.0.0.1:27017/chatbot

# JWT Secret
JWT_SECRET=your_super_secure_secret_key
```

---

## 4️⃣ Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🔐 Authentication Flow

### Registration

```text
/register
```

Users create an account.

### Login

```text
/login
```

Users authenticate using email and password.

### Protected Chat Route

```text
/chat
```

Only authenticated users can access the chatbot.

### Security Measures

* Password Hashing (bcryptjs)
* JWT Authentication
* Protected API Routes
* Secure Session Handling

---

# 💡 Example Use Cases

### Medicine Information

```text
What is Paracetamol used for?
```

### Drug Interaction

```text
Can I take Ibuprofen with Aspirin?
```

### Health Education

```text
What are the symptoms of Vitamin D deficiency?
```

### Wellness Guidance

```text
Give me tips for improving sleep quality.
```

---

# 🌍 Future Enhancements

* 🏥 Doctor Appointment Integration
* 📅 Medicine Reminder System
* 📊 Personal Health Dashboard
* 🎙️ Voice Assistant Support
* 🌐 Multi-language Support
* 📱 Mobile Application
* 📈 AI Health Analytics

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

### Mohammed Ali

AI & Full-Stack Developer

* Healthcare AI Applications
* Agentic AI Systems
* Next.js & React Development
* MongoDB & Cloud Technologies

---

# ⚠️ Medical Disclaimer

**MediMind AI is intended solely for informational and educational purposes.**

The application does **not** provide medical diagnoses, treatment plans, prescriptions, or emergency medical advice.

Always consult a qualified healthcare professional before making any medical decisions, starting new medications, changing treatments, or interpreting health-related information.

In case of a medical emergency, contact your local emergency services or healthcare provider immediately.

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a Star!

**Made with ❤️ using Next.js, Gemini AI, and MongoDB**

</div>
