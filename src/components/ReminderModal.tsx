"use client";

import React, { useState } from 'react';

export interface Reminder {
  id: string;
  medicationName: string;
  time: string;
  active: boolean;
}

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReminderModal({ isOpen, onClose }: ReminderModalProps) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [medName, setMedName] = useState('');
  const [time, setTime] = useState('');

  if (!isOpen) return null;

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (medName.trim() && time) {
      setReminders([
        ...reminders,
        { id: Date.now().toString(), medicationName: medName, time, active: true }
      ]);
      setMedName('');
      setTime('');
    }
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '500px',
        padding: '2rem',
        background: 'var(--background-sidebar)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 className="text-gradient">Medication Reminders</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
        </div>

        <form onSubmit={handleAddReminder} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input 
            type="text" 
            placeholder="Medication Name" 
            value={medName}
            onChange={e => setMedName(e.target.value)}
            style={{ flex: 2, padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)', outline: 'none' }}
          />
          <input 
            type="time" 
            value={time}
            onChange={e => setTime(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)', outline: 'none' }}
          />
          <button type="submit" className="btn" disabled={!medName || !time}>Add</button>
        </form>

        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {reminders.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: '2rem 0' }}>No reminders set yet.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {reminders.map(r => (
                <li key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--background-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div>
                    <h4 style={{ margin: 0, color: r.active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{r.medicationName}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{r.time}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => toggleReminder(r.id)} style={{ padding: '0.25rem 0.75rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                      {r.active ? 'Disable' : 'Enable'}
                    </button>
                    <button onClick={() => deleteReminder(r.id)} style={{ padding: '0.25rem 0.75rem', background: 'rgba(239, 83, 80, 0.2)', border: '1px solid var(--danger-color)', color: 'var(--danger-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
