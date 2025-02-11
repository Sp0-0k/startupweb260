import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function BasicButtonExample() {
  return (
    <DropdownButton id="dropdown-basic-button" title="Pick a dice">
          <Dropdown.Item href="#/d4">d4</Dropdown.Item>
          <Dropdown.Item href="#/d6">d6</Dropdown.Item>
          <Dropdown.Item href="#/d8">d8</Dropdown.Item>
          <Dropdown.Item href="#/d10">d10</Dropdown.Item>
          <Dropdown.Item href="#/d12">d12</Dropdown.Item>
          <Dropdown.Item href="#/d20">d20</Dropdown.Item>
          <Dropdown.Item href="#/d100">d100</Dropdown.Item>
    </DropdownButton>
  );
}

export default BasicButtonExample;

export function Play() {
  return (
    <main>
      <div className="container-fluid">
        <span className="text-reset">Name: username</span>
      <br />
        <span className="text-reset">Room: roomcode</span>
      </div>
      <h1 style={{"marginTop" : "0"}}>Lets roll some dice!</h1>
      
      <form method="get" action="play.html">
        <div data-mdb-input-init className="form-outline" style={{"width" : "7rem", "textAlign" : "center"}}>
          <input min="1" max="50" type="number" id="typeNumber" className="form-control" />
          <label className="form-label" id="typeNumber">Number of dice</label>
      </div>
      <div style={{"textAlign" : "center"}}>
          <BasicButtonExample> </BasicButtonExample>
      <br />
        <button className="btn btn-primary"type="submit">Roll</button>
      </div>
      </form>


      <div id="results">
      <h2>Results</h2>


      <div style={{"minWidth" : "40vh"}}>
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 641.2 419.7" style={{"enableBackground" :"new 0 0 641.2 419.7"}} xmlSpace="preserve">
      <g>
        <path className="st0" d="M474.1,363.2l56.2-209.7L376.8,0L167.1,56.2l-56.2,209.7l153.5,153.5L474.1,363.2L474.1,363.2L474.1,363.2z
          M519.8,156.3l-50.6,188.8l-87.6-327L519.8,156.3z M460.9,349.9L129,261L371.9,18.1L460.9,349.9z M174.7,63.8l188.8-50.6
         L124.2,252.6L174.7,63.8z M267.2,408.9L129,270.7l327,87.6L267.2,408.9z"/>
         <text x="50%" y="50%" textAnchor="middle" strokeWidth="2px" dy="0.3em" fontSize="4em">8</text>
        </g>
        </svg>      
      </div>
      </div>

      <ul id="roomResults" class="centeredText">
        Rolls in your room:
        <li class="player-roll">James rolled 1d20: 12</li>
        <li class="player-roll">Adam rolled 3d6: 9</li>
        <li class="player-roll">Anna rolled 5d10: 50</li>
      </ul>

      
    </main>
  );
}