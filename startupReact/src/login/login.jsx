import React from 'react';
import { AuthState } from './authState';
import { Authenticated } from './authenticated';
import { Unauthenticated } from './unauthenticated';
import { GetExcuse } from './getExcuse';
import './login.css';

export function Login({ userName, authState, onAuthChange, roomCode }) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        {authState !== AuthState.Unknown && (
          <h1 className="hero-title">Welcome to <span>5e Dice Tools</span></h1>
        )}
        <p className="hero-subtitle">Your room, your dice, your story. Pull up a chair.</p>

        <div className="auth-container">
          {authState === AuthState.Authenticated && (
            <Authenticated
              userName={userName}
              roomCode={roomCode}
              onLogout={() => onAuthChange(userName, AuthState.Unauthenticated, roomCode)}
              onRoomChange={(newRoomCode) => onAuthChange(userName, AuthState.Authenticated, newRoomCode)}
            />
          )}
          {authState === AuthState.Unauthenticated && (
            <Unauthenticated userName={userName} roomCode={roomCode} onLogin={(loginUserName, loginRoomCode) => { onAuthChange(loginUserName, AuthState.Authenticated, loginRoomCode); }} />
          )}
        </div>

        <div className="excuse-container">
          <h3>Need an excuse to leave the forge and play?</h3>
          <button type="button" className="cinematic-btn" onClick={() => GetExcuse()}>Consult the Oracle</button>
        </div>
      </div>
    </section>
  );
}