import React from 'react';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { About } from './about/about';
import { Room } from './room/room';
import { AuthState } from './login/authState';
import { ThemeChanger } from './themeChanger';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const [roomCode, setRoomCode] = React.useState(localStorage.getItem('roomCode') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="glass-header">
          <NavLink className="brand" to="/">
            <img src="dice2.png" alt="logo" />
            <span>5e Dice Tools</span>
          </NavLink>
          <nav>
            <ul className="nav-menu">
              <li><NavLink className="nav-link" end to="/">Home</NavLink></li>
              <li><NavLink className="nav-link" to="/about">Lore</NavLink></li>
              {authState === AuthState.Authenticated && (
                <li><NavLink className="nav-link" to="/play">Cast Dice</NavLink></li>
              )}
              {authState === AuthState.Authenticated && (
                <li><NavLink className="nav-link" to="/room">Room Chronicals</NavLink></li>
              )}
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path='/' element={<Login userName={userName} authState={authState} roomCode={roomCode} onAuthChange={(userName, authState, roomCode) => { setAuthState(authState); setUserName(userName); setRoomCode(roomCode) }} />} exact />
            <Route path='/play' element={<Play userName={userName} roomCode={roomCode} />} />
            <Route path='/room' element={<Room userName={userName} roomCode={roomCode} />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>

        <footer className="glass-footer">
          <div className="author">Forged by Kirk McMasters</div>
          <div className="footer-links">
            <ThemeChanger />
            <a href="https://github.com/Sp0-0k/startupweb260" target="_blank" rel="noreferrer">Arcane Source</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid text-center'>404: The path you seek is lost to the fog.</main>;
}
