import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        setMessage(`✅ Welcome Logged in as: ${data.username}`);

        // Trigger redirect
        if (onLoginSuccess) {
          setTimeout(() => {
            onLoginSuccess(); // navigates to /dashboard
          }, 1000); // Optional: 1s delay to let the message appear
        }
      } else {
        setMessage('❌ Invalid credentials.');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Login failed. Backend issue?');
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>🔐 Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: 'block', marginBottom: 10, padding: 20 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', marginBottom: 30, padding: 20 }}
        />
        <button type="submit" style={{ padding: '20px 40px' }}>Login</button>
      </form>
      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </div>
  );
}

export default Login;
