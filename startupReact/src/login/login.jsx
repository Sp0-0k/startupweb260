import React from 'react';
import { AuthState } from './authState';
import { Authenticated } from './authenticated';
import { Unauthenticated } from './unauthenticated';


export function Login({userName, authState, onAuthChange, roomCode}) {
  return (
    <main className='container-fluid text-center'>
        <div>
            {authState !== AuthState.Unknown && <h1>Welcome to 5e Dice Tools!</h1>}
            {authState === AuthState.Authenticated && (
              <Authenticated userName={userName} roomCode={roomCode} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated, roomCode)} />)}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated userName={userName} roomCode={roomCode} onLogin={(loginUserName, loginRoomCode) => {onAuthChange(loginUserName, AuthState.Authenticated, loginRoomCode);}}/>)}
        </div>



            
        <br />
        <h3>Need an excuse to leave work and play some D&D?</h3>
        <button type="button" className="btn btn-secondary" onClick={()=>alert('You have a meeting with the CEO')}>Generate Excuse</button>

    </main>
  );
}