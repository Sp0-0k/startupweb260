import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {DiceRoll} from './diceRoll.jsx';
import DropdownButton from 'react-bootstrap/DropdownButton';


export function Play(props) {

  return (
    <main>
      <div className="container-fluid" >
        <span className="text-reset">Name: {props.userName}</span>
      <br />
        <span className="text-reset">Room: {props.roomCode}</span>
      </div>
      <h1>Lets roll some dice!</h1>

      <DiceRoll/>

      <ul id="roomResults" className="centeredText">
        Rolls in your room:
        <li className="player-roll">James rolled 1d20: 12</li>
        <li className="player-roll">Adam rolled 3d6: 9</li>
        <li className="player-roll">Anna rolled 5d10: 50</li>
      </ul>

      
    </main>
  );
}