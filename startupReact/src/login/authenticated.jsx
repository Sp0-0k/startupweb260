import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        localStorage.removeItem('roomCode');
        props.onLogout();
      });
  }

  return (
    <div className="glass-panel auth-status-panel">
      <div className="loginInfo">
        <h2>Welcome, <span>{props.userName}</span></h2>
        <p>Your active room is <strong>{props.roomCode}</strong></p>
      </div>
      <div className="buttons-stack horizon">
        <button className="cinematic-btn primary" onClick={() => navigate('/play')}>
          Enter Room
        </button>
        <button className="cinematic-btn" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </div>
  );
}