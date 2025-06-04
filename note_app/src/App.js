import React from 'react';
import './App.css';
import NoteContainer from './components/NoteContainer'; // Import the NoteContainer

// PUBLIC_INTERFACE
/**
 * Main App component for NoteEase.
 * Renders the NoteContainer which contains the core application logic and UI.
 */
function App() {
  return (
    <div className="app">
      <header style={{ backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)', padding: '10px 20px', textAlign: 'center' }}>
        <h1>NoteEase</h1>
      </header>
      <main>
        <NoteContainer />
      </main>
      <footer style={{ textAlign: 'center', padding: '10px', marginTop: '20px', borderTop: '1px solid var(--border-color)', fontSize: '0.9em', color: 'var(--text-color-secondary)'}}>
        <p>&copy; {new Date().getFullYear()} NoteEase App</p>
      </footer>
    </div>
  );
}

export default App;