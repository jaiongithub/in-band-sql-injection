import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Challenge1 from './Challenge1';
import Login from './Login';
import ArticleLanding from './ArticleLanding';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/challenge1" element={<Challenge1 />} />
        <Route path="/login" element={<LoginWrapper />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ArticleLanding />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

// Landing Page with immersive mission dashboard
function Landing() {
  const navigate = useNavigate();
  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>🕵️‍♂️ Mission Dashboard: Operation Blacklight</h1>
      <p style={introStyle}>
        Welcome, Agent Z. Intel from HQ has flagged unusual activities across several dark web nodes.
        You're being deployed to uncover the truth. Each mission will bring you closer to unraveling
        the syndicate's hidden operations. Choose your tasks carefully and dig deep. 🧠
      </p>

      <div style={taskContainer}>
        <Task
  emoji="🛍️"
  title="Task 1: ShadowMart Recon"
  description="ShadowMart’s listings don’t match their licenses. Begin your surveillance by checking what products they're truly offering. Illegal trade might be masked under innocent labels."
  customButton={
    <a href="/challenge1" target="_blank" rel="noopener noreferrer" style={btnStyle}>
      Investigate ShadowMart
    </a>
  }
/>

<Task
  emoji="🔓"
  title="Task 2: Access Breach"
  description="A secure portal has been discovered. We suspect logged-in users access sensitive content. Bypass the login gateway and gain deeper access to classified data."
  customButton={
    <a href="/login" target="_blank" rel="noopener noreferrer" style={btnStyle}>
      Attempt Login Bypass
    </a>
  }
/>

        <Task
          emoji="📊"
          title="Task 3: Recon Field Analysis"
          description="Our data intercepts show patterns in how information is displayed. Determine how many data channels (columns) are exposed via their article listings."
        />

        <Task
          emoji="🔍"
          title="Task 4: Signal Detection"
          description="Not all channels carry meaningful signals. Identify which data fields can transmit text-based information — they’ll be your key to extraction."
        />

        <Task
          emoji="💾"
          title="Task 5: Backend Fingerprint"
          description="Identify the type of database powering the operation. Knowing their tech stack is crucial for tailoring your future exploits."
        />

        <Task
          emoji="🧬"
          title="Task 6: Version Trace"
          description="Every system leaves a fingerprint. Pinpoint the exact database version — it may expose known vulnerabilities or misconfigurations."
        />

        <Task
          emoji="🗂️"
          title="Task 7: Table Sweep"
          description="Probe the backend and extract a map of all accessible tables. Intelligence suspects there's more beneath the surface — how many storage vaults are there?"
        />

        <Task
          emoji="👑"
          title="Task 8: KingPin Credentials"
          description="We believe 'KingPin' is orchestrating the core ops. Retrieve his password — this may unlock deeper systems or expose leadership ties."
        />

        <Task
          emoji="📛"
          title="Task 9: KingPin ID Trace"
          description="We need to verify KingPin’s real identity. Extract any aliases, emails, or nicknames associated with his credentials to proceed with arrest protocols."
        />

        <Task
          emoji="📦"
          title="Task 10: Data Compression Test"
          description="Test whether multiple pieces of data can be packed into a single visible output. This could be used to exfiltrate several records at once undetected."
        />
      </div>
    </div>
  );
}

// Task UI Component
function Task({ emoji, title, description, action, onClick, customButton }) {
  return (
    <div style={taskStyle}>
      <h2>{emoji} {title}</h2>
      <p>{description}</p>
      {customButton
        ? customButton
        : action && <button onClick={onClick} style={btnStyle}>{action}</button>}
    </div>
  );
}

// Wrap Login to redirect after success
function LoginWrapper() {
  const navigate = useNavigate();
  return <Login onLoginSuccess={() => navigate('/dashboard')} />;
}

// Styling
const containerStyle = {
  backgroundColor: '#1e1e2f',
  color: '#ffffff',
  padding: '40px',
  minHeight: '100vh',
  fontFamily: 'Segoe UI, sans-serif'
};

const headerStyle = {
  fontSize: '2.4rem',
  marginBottom: '20px'
};

const introStyle = {
  fontSize: '1.2rem',
  marginBottom: '30px',
  lineHeight: '1.6'
};

const taskContainer = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '30px'
};

const taskStyle = {
  backgroundColor: '#2a2a3d',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.4)'
};

const btnStyle = {
  marginTop: '10px',
  padding: '10px 15px',
  fontSize: '1rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default App;
