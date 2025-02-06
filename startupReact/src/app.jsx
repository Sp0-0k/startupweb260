import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';


import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { About } from './about/about';

export default function App() {
  return (
  <BrowserRouter>
  <div className='body bg-dark text-light'>
    <header className="container-fluid">
      <nav className = "navbar fixed-top navbar-dark" style={{"border-bottom" : "white thin solid"}}>
        <span><img src="dice2.png" style={{"height": "5vh"}}/></span><a className = "navbar-brand menuItems" href="#">5e Dice Tools</a>
        <menu className ="navbar-nav">
          <li className="nav-item menuItems"><NavLink className="nav-link active" to="/">Home</NavLink></li>
          <li className="nav-item menuItems"><NavLink className="nav-link" to="about">About</NavLink></li>
          <li className="nav-item menuItems"><NavLink className = "nav-link" to="play">Play</NavLink></li>
        </menu>
      </nav>
    </header>

    <Routes>
      <Route path='/' element={<Login />} exact />
      <Route path='/play' element={<Play />} />
      <Route path='/about' element={<About />} />
      <Route path='*' element={<NotFound />} />
    </Routes>


    <footer className="bg-dark text-white-50">
      <div className="container-fluid">
        <span className="text-reset">Kirk McMasters</span>
        <a className="text-reset" href="https://github.com/Sp0-0k/startupweb260">GitHub</a>
      </div>
    </footer>

  </div>
  </BrowserRouter>
  );
};

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
