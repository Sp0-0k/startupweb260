import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {DiceRoll} from './diceRoll.jsx';
import { PlayerRolls } from './playerRolls.jsx';
import DropdownButton from 'react-bootstrap/DropdownButton';


export function Play(props) {
  const [diceTotal, setDiceTotal] = React.useState(localStorage.getItem('diceTotal') || 0);

  return (
    <main>
      <div className="container-fluid" >
        <span className="text-reset">Name: {props.userName}</span>
      <br />
        <span className="text-reset">Room: {props.roomCode}</span>
      </div>
      <h1>Lets roll some dice!</h1>

      <DiceRoll diceTotal={diceTotal}/>

      {/* <PlayerRolls userName={props.userName} /> */}

      
    </main>
  );
}