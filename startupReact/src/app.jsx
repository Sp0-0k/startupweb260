import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (<div className='body bg-dark text-light'>
    <header className="container-fluid">
      <nav className = "navbar fixed-top navbar-dark" style={{"border-bottom" : "white thin solid"}}>
        <span><img src="dice2.png" style={{"height": "5vh"}}/></span><a className = "navbar-brand menuItems" href="#">5e Dice Tools</a>
        <menu className ="navbar-nav">
          <li className="nav-item menuItems"><a className="nav-link active" href="index.html">Home</a></li>
          <li className="nav-item menuItems"><a className="nav-link" href="about.html">About</a></li>
          <li className="nav-item menuItems"><a className = "nav-link" href="play.html">Play</a></li>
        </menu>
      </nav>
    </header>



    <main>This is a test</main>


    <footer className="bg-dark text-white-50">
      <div className="container-fluid">
        <span className="text-reset">Kirk McMasters</span>
        <a className="text-reset" href="https://github.com/Sp0-0k/startupweb260">GitHub</a>
      </div>
    </footer>

  </div>
  );
};
