"use client";

import React from 'react';

export type MessageType = 'user' | 'bot' | 'system';

export interface ChatMessageProps {
  type: MessageType;
  content: string;
  timestamp?: Date;
}

export default function ChatMessage({ type, content, timestamp }: ChatMessageProps) {
  const isUser = type === 'user';
  
  return (
    <div 
      className={`glass-panel animate-fade-in`} 
      style={{ 
        padding: '1.25rem', 
        marginBottom: '1rem', 
        maxWidth: '85%', 
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        marginLeft: isUser ? 'auto' : '0',
        background: isUser ? 'var(--background-user-bubble)' : 'var(--background-bot-bubble)',
        color: isUser ? 'var(--text-user-bubble)' : 'var(--text-primary)',
        border: type === 'system' ? '1px solid var(--warning-color)' : '1px solid var(--border-color)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        {!isUser && (
          <div style={{
            minWidth: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--accent-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '0.8rem'
          }}>
            AI
          </div>
        )}
        <div style={{ flex: 1 }}>
          <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{content}</p>
          {timestamp && (
            <div style={{ 
              fontSize: '0.75rem', 
              color: isUser ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)', 
              marginTop: '0.5rem',
              textAlign: isUser ? 'right' : 'left'
            }}>
              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
