import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';


import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { About } from './about/about';
import { AudioMuteButton } from './audioMute';
import { AuthState } from './login/authState';

export default function App() {

  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const [roomCode, setRoomCode] = React.useState(localStorage.getItem('roomCode') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);


  return (
  <BrowserRouter>
  <div className='body bg-dark text-light'>
    <header className="container-fluid">
      <nav className = "navbar fixed-top navbar-dark" style={{"borderBottom" : "white thin solid"}}>
        <span><img src="dice2.png" style={{"height": "5vh"}}/></span><a className = "navbar-brand menuItems" href="#">5e Dice Tools</a>
        <menu className ="navbar-nav">
          <li className="nav-item menuItems"><NavLink className="nav-link" to="/">Home</NavLink></li>
          <li className="nav-item menuItems"><NavLink className="nav-link" to="about">About</NavLink></li>
          {authState === AuthState.Authenticated && (<li className="nav-item menuItems"><NavLink className = "nav-link" to="play">Play</NavLink></li>)}
        </menu>
      </nav>
    </header>

    <Routes>
      <Route path='/' element={<Login userName={userName} authState={authState} roomCode={roomCode} onAuthChange={(username, authState, roomCode) => {setAuthState(authState); setUserName(userName); setRoomCode(roomCode)}}/>} exact />
      <Route path='/play' element={<Play userName={userName} roomCode={roomCode}/>} />
      <Route path='/about' element={<About />} />
      <Route path='*' element={<NotFound />} />
    </Routes>


    <footer className="bg-dark text-white-50">
      <div className="container-fluid">
        <span className="text-reset">Kirk McMasters</span>
        <a className="text-reset" href="https://github.com/Sp0-0k/startupweb260">GitHub</a>
        <a><AudioMuteButton /></a>
      </div>
    </footer>

  </div>
  </BrowserRouter>
  );
};

function NotFound() {
  return <main className='container-fluid text-center'>404: Return to sender. Address unknown.</main>;
}
