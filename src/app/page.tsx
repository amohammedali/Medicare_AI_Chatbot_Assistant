"use client";

import React from 'react';
import Link from 'next/link';
import ThreeBackground from '@/components/ThreeBackground';
import './globals.css';

export default function LandingPage() {
  return (
    <>
      <ThreeBackground />
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
        
        <div className="hero" style={{ flexDirection: 'column', padding: '4rem 3rem', background: 'rgba(10, 20, 30, 0.65)', border: '1px solid rgba(45, 212, 191, 0.5)' }}>
          <i className="fas fa-brain logo-icon" style={{ fontSize: '4rem', marginBottom: '1rem' }}></i>
          <div className="logo-text">
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>MediMind AI</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>Your Intelligent, 24/7 Medical Assistant</p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <Link href="/register" style={{
              background: 'linear-gradient(95deg, #2dd4bf, #0891b2)',
              color: '#0f172a',
              padding: '1rem 2.5rem',
              borderRadius: '3rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: '1.1rem',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 15px rgba(45, 212, 191, 0.4)'
            }}>
              Get Started
            </Link>
            <Link href="/login" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#eef5ff',
              padding: '1rem 2.5rem',
              borderRadius: '3rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: '1.1rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'background 0.2s'
            }}>
              Login
            </Link>
          </div>
        </div>

        <div className="features-grid" style={{ marginTop: '4rem', width: '100%' }}>
          <div className="feature-card" style={{ pointerEvents: 'none' }}>
            <div className="feature-icon"><i className="fas fa-capsules"></i></div>
            <h3>Medicine Search</h3>
            <p>Instant lookup by name, category, or condition with detailed usage info.</p>
          </div>
          <div className="feature-card" style={{ pointerEvents: 'none' }}>
            <div className="feature-icon"><i className="fas fa-exclamation-triangle"></i></div>
            <h3>Drug Interaction Alerts</h3>
            <p>Warnings for harmful medicine combinations & contraindications.</p>
          </div>
          <div className="feature-card" style={{ pointerEvents: 'none' }}>
            <div className="feature-icon"><i className="fas fa-robot"></i></div>
            <h3>AI-Powered Q&A</h3>
            <p>NLP-driven conversation for general health queries.</p>
          </div>
        </div>
        
        <div className="disclaimer" style={{ marginTop: '3rem' }}>
            <i className="fas fa-info-circle"></i> Informational use only. This platform does not replace licensed medical professionals.
        </div>
      </div>
    </>
  );
}
