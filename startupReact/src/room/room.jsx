import React from 'react';

import './room.css';

export function Room(props) {
  const [rolls, setRolls] = React.useState([]);


  React.useEffect(() => {
    fetch(`/api/rolls/${props.roomCode}`)
      .then((response) => response.json())
      .then((rolls) => {
        setRolls(rolls);
      });
  }, []);

  const rollsRows = [];
  if (rolls.length) {
    // Create a copy of the array and reverse it so newest rolls appear first
    const reversedRolls = [...rolls].reverse();
    
    for (const [i, rolls] of reversedRolls.entries()) {
      rollsRows.push(
        <tr key={i}>
          <td>{rolls.userName.split('@')[0]}</td>
          <td>{rolls.totalRoll}</td>
          <td>{rolls.diceType}</td>
          <td>{rolls.diceNumber}</td>
        </tr>
      );
    }
  } else {
    rollsRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to roll in your room</td>
      </tr>
    );
  }

  return (
    <main className='container-fluid bg-dark text-center'>
      <table className='table table-warning table-striped-columns'>
        <thead className='table-dark'>
          <tr>
            <th>Name</th>
            <th>Total</th>
            <th>Dice Type</th>
            <th>Number of Dice</th>
          </tr>
        </thead>
        <tbody id='rolls'>{rollsRows}</tbody>
      </table>
    </main>
  );
}
