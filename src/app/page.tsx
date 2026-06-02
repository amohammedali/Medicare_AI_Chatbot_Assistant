"use client";

import React, { useState, useRef, useEffect } from 'react';
import './globals.css';
import ThreeBackground from '@/components/ThreeBackground';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'bot',
      content: "Hello! I'm your AI medical assistant. Ask me about medicines, dosages, interactions, or general health info. **Remember:** I provide informational support only. For emergencies, contact a doctor.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) {
        const errData = await response.json();
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'bot',
          content: errData.error || 'API Response Error',
          timestamp: new Date()
        }]);
        return; // Exit early to avoid throwing an exception
      }

      const data = await response.json();
      
      const botMsg: Message = {
        id: data.id || (Date.now() + 1).toString(),
        type: 'bot',
        content: data.content,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error: any) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content: error.message || 'Sorry, I encountered an error connecting to the server. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCardClick = (exampleQuery: string) => {
    handleSendMessage(exampleQuery);
  };

  return (
    <>
      <ThreeBackground />
      <div className="app-container">
        <div className="hero">
            <div className="logo-area">
                <i className="fas fa-brain logo-icon"></i>
                <div className="logo-text">
                    <h1>MediMind AI</h1>
                    <p>Intelligent Medical Assistant · 24/7</p>
                </div>
            </div>
            <div className="badge"><i className="fas fa-shield-alt"></i> HIPAA Ready · Evidence-Informed</div>
        </div>

        {/* Feature Cards - Interactive */}
        <div className="features-grid">
            <div className="feature-card" onClick={() => handleCardClick('Tell me about Amoxicillin uses')}>
                <div className="feature-icon"><i className="fas fa-capsules"></i></div>
                <h3>Medicine Search</h3>
                <p>Instant lookup by name, category, or condition with detailed usage info.</p>
            </div>
            <div className="feature-card" onClick={() => handleCardClick('Ibuprofen and Aspirin interaction?')}>
                <div className="feature-icon"><i className="fas fa-exclamation-triangle"></i></div>
                <h3>Drug Interaction Alerts</h3>
                <p>Warnings for harmful medicine combinations & contraindications.</p>
            </div>
            <div className="feature-card" onClick={() => handleCardClick('What is the dosage of Metformin and side effects?')}>
                <div className="feature-icon"><i className="fas fa-tablets"></i></div>
                <h3>Dosage & Side Effects</h3>
                <p>Jargon-free dosage guidelines, precautions & adverse effects.</p>
            </div>
            <div className="feature-card" onClick={() => handleCardClick('Can you remind me to take my medication?')}>
                <div className="feature-icon"><i className="fas fa-bell"></i></div>
                <h3>Medication Reminders</h3>
                <p>Schedule-based alerts to maintain consistent routines.</p>
            </div>
            <div className="feature-card" onClick={() => handleCardClick('What helps with seasonal allergies?')}>
                <div className="feature-icon"><i className="fas fa-robot"></i></div>
                <h3>AI-Powered Q&A</h3>
                <p>NLP-driven conversation for general health queries.</p>
            </div>
            <div className="feature-card" onClick={() => handleCardClick('I have severe chest pain and difficulty breathing')}>
                <div className="feature-icon"><i className="fas fa-user-md"></i></div>
                <h3>Professional Referral</h3>
                <p>Detects critical symptoms → prompts doctor consultation.</p>
            </div>
        </div>

        {/* Chatbot Interface */}
        <div className="chat-section">
            <div className="chat-header">
                <h3><i className="fas fa-comment-dots"></i> AI Health Assistant</h3>
                <div className="status"><i className="fas fa-circle" style={{fontSize: '0.6rem', color: '#2dd4bf'}}></i> Active & secure</div>
            </div>
            <div className="chat-messages" id="chatMessages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}>
                        <div className="avatar">
                            <i className={msg.type === 'user' ? 'fas fa-user' : 'fas fa-stethoscope'}></i>
                        </div>
                        <div className="message-text">
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    img: ({node, ...props}) => <img style={{maxWidth: '100%', borderRadius: '8px', marginBottom: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)'}} {...props} />,
                                    a: ({node, ...props}) => <a style={{color: '#2dd4bf', textDecoration: 'underline'}} target="_blank" rel="noopener noreferrer" {...props} />,
                                    ul: ({node, ...props}) => <ul style={{paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'disc'}} {...props} />,
                                    ol: ({node, ...props}) => <ol style={{paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'decimal'}} {...props} />,
                                    li: ({node, ...props}) => <li style={{marginBottom: '0.4rem', lineHeight: '1.5'}} {...props} />,
                                    p: ({node, ...props}) => <p style={{marginBottom: '0.8rem'}} {...props} />,
                                    h3: ({node, ...props}) => <h3 style={{marginTop: '1.2rem', marginBottom: '0.6rem', color: '#5eead4'}} {...props} />,
                                    h4: ({node, ...props}) => <h4 style={{marginTop: '1rem', marginBottom: '0.4rem', color: '#2dd4bf'}} {...props} />
                                }}
                            >
                                {msg.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}
                
                {isTyping && (
                   <div className="message bot-message">
                       <div className="avatar"><i className="fas fa-stethoscope"></i></div>
                       <div className="message-text" style={{ fontStyle: 'italic', opacity: 0.7 }}>Thinking...</div>
                   </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            
            <form className="chat-input-area" onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}>
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g., What is the usual dose of amoxicillin? or Ibuprofen and paracetamol interaction..." 
                  autoComplete="off"
                  disabled={isTyping}
                />
                <button type="submit" disabled={!inputValue.trim() || isTyping}>
                    <i className="fas fa-paper-plane"></i> Send
                </button>
            </form>
        </div>
        <div className="disclaimer">
            <i className="fas fa-info-circle"></i> Informational use only. This chatbot does not replace licensed medical professionals. Always consult a doctor for clinical decisions.
        </div>
      </div>
    </>
  );
}
