"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ThreeBackground from '@/components/ThreeBackground';
import { loginUser } from '@/lib/auth';
import '../globals.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = await loginUser(username, password);
    if (result.success) {
      router.push('/chat');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <>
      <ThreeBackground />
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        
        <div className="hero" style={{ flexDirection: 'column', padding: '3rem', background: 'rgba(10, 20, 30, 0.75)', border: '1px solid rgba(45, 212, 191, 0.5)', width: '100%', maxWidth: '400px' }}>
          <i className="fas fa-user-circle logo-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#eef5ff' }}>Welcome Back</h2>
          
          {error && <div style={{ color: '#ef4444', marginBottom: '1rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #ef4444' }}>{error}</div>}

          <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div className="chat-input-area" style={{ padding: 0, background: 'transparent', border: 'none' }}>
              <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div className="chat-input-area" style={{ padding: 0, background: 'transparent', border: 'none' }}>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>
            
            <button type="submit" style={{
              background: 'linear-gradient(95deg, #2dd4bf, #0891b2)',
              color: '#0f172a',
              padding: '1rem',
              borderRadius: '3rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.1rem',
              marginTop: '1rem'
            }}>
              Login
            </button>
          </form>

          <p style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.8 }}>
            Don't have an account? <Link href="/register" style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}
