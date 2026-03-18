import React from 'react';
import { DiceRoll } from './diceRoll.jsx';
import { PlayerRolls } from './playerRolls.jsx';
import './play.css';

export function Play(props) {
  const [diceTotal, setDiceTotal] = React.useState(localStorage.getItem('diceTotal') || '');

  return (
    <div className="dashboard-container">
      <header className="dashboard-header fade-in">
        <div className="user-badge">
          <span className="badge-label">Adventurer</span>
          <span className="badge-value">{props.userName}</span>
        </div>
        <div className="room-badge">
          <span className="badge-label">Room</span>
          <span className="badge-value glow">{props.roomCode}</span>
        </div>
      </header>

      <div className="dashboard-grid fade-in-up">
        <DiceRoll diceTotal={diceTotal} userName={props.userName} roomCode={props.roomCode} />
        <PlayerRolls userName={props.userName} roomCode={props.roomCode} />
      </div>
    </div>
  );
}