import React from 'react';
import { LoginResponse } from './loginResponse.jsx';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const [roomCode, setRoomCode] = React.useState('');

  async function loginUser() {
    loginOrCreate('/api/auth/login');
  }

  async function createUser() {
    loginOrCreate('/api/auth/create');
  }


  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ name: userName, password: password, roomCode: roomCode }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      localStorage.setItem('roomCode', roomCode);
      props.onLogin(userName, roomCode);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }



  return (
    <div className="glass-panel login-panel">
      <h3 className="panel-title">Enter the Room</h3>
      <div className="form-group-stack">
        <input type="text" className="cinematic-input" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
        <input type="password" className="cinematic-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <input type="text" inputMode="numeric" className="cinematic-input" placeholder="Room Code" onChange={(e) => setRoomCode(e.target.value)} />
      </div>
      <div className="buttons-stack">
        <button type="submit" className="cinematic-btn primary" onClick={() => loginUser()} disabled={!userName || !password || !roomCode}>Join Session</button>
        <button type="button" className="cinematic-btn" onClick={() => createUser()} disabled={!userName || !password || !roomCode}>Sign Ledger</button>
      </div>
      <LoginResponse message={displayError} onHide={() => setDisplayError(null)} />
    </div>
  );

}