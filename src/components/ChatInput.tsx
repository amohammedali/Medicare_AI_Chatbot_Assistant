"use client";

import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', background: 'var(--background-sidebar)', backdropFilter: 'blur(16px)' }}>
      <form style={{ display: 'flex', gap: '1rem', maxWidth: '1000px', margin: '0 auto' }} onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about a medication, interaction, or symptom..." 
          disabled={disabled}
          style={{ 
            flex: 1, 
            padding: '1rem 1.5rem', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid var(--border-color)', 
            background: 'var(--input-bg)', 
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
            outline: 'none',
            fontSize: '1rem',
            opacity: disabled ? 0.6 : 1
          }} 
        />
        <button 
          type="submit" 
          className="btn" 
          disabled={!inputValue.trim() || disabled}
          style={{ 
            borderRadius: 'var(--radius-lg)', 
            padding: '0 2rem',
            opacity: (!inputValue.trim() || disabled) ? 0.6 : 1,
            cursor: (!inputValue.trim() || disabled) ? 'not-allowed' : 'pointer'
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
