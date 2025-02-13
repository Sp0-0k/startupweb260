import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      dropDownValue: "Pick an dice"
    }
  }
  changeValue(text) {
    this.setState({dropDownValue: text})
  }
  render(){
  return (
    <DropdownButton id="dropdown-basic-button" title={this.state.dropDownValue}>
          <Dropdown.Item href="#/d4"><div onClick={(e) => this.changeValue(e.target.textContent)}>d4</div></Dropdown.Item>
          <Dropdown.Item href="#/d6"><div onClick={(e) => this.changeValue(e.target.textContent)}>d6</div></Dropdown.Item>
          <Dropdown.Item href="#/d8"><div onClick={(e) => this.changeValue(e.target.textContent)}>d8</div></Dropdown.Item>
          <Dropdown.Item href="#/d10"><div onClick={(e) => this.changeValue(e.target.textContent)}>d10</div></Dropdown.Item>
          <Dropdown.Item href="#/d12"><div onClick={(e) => this.changeValue(e.target.textContent)}>d12</div></Dropdown.Item>
          <Dropdown.Item href="#/d20"><div onClick={(e) => this.changeValue(e.target.textContent)}>d20</div></Dropdown.Item>
          <Dropdown.Item href="#/d100"><div onClick={(e) => this.changeValue(e.target.textContent)}>d100</div></Dropdown.Item>
    </DropdownButton>
  );
  }
}

export function Play() {
  return (
    <main>
      <div className="container-fluid" >
        <span className="text-reset">Name: username</span>
      <br />
        <span className="text-reset">Room: roomcode</span>
      </div>
      <h1>Lets roll some dice!</h1>
      
      <form method="get" action="play.html">
        <div data-mdb-input-init className="form-outline" style={{"width" : "7rem", "textAlign" : "center"}}>
          <input min="1" max="50" type="number" id="typeNumber" className="form-control" />
          <label className="form-label" id="typeNumber">Number of dice</label>
      </div>
      <div style={{"textAlign" : "center"}}>
        <App></App>
      <br />
        <button className="btn btn-primary centeredText"type="submit">Roll</button>
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

      <ul id="roomResults" className="centeredText">
        Rolls in your room:
        <li className="player-roll">James rolled 1d20: 12</li>
        <li className="player-roll">Adam rolled 3d6: 9</li>
        <li className="player-roll">Anna rolled 5d10: 50</li>
      </ul>

      
    </main>
  );
}