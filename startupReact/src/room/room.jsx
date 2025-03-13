import React from 'react';

import './Room.css';

export function Room(props) {
  const [rolls, setRolls] = React.useState([]);

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    fetch('/api/rolls/${props.roomCode}')
      .then((response) => response.json())
      .then((rolls) => {
        setRolls(rolls);
      });
  }, []);

  // Demonstrates rendering an array with React
  const rollsRows = [];
  if (rolls.length) {
    for (const [i, roll] of rolls.entries()) {
      rollsRows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{roll.name.split('@')[0]}</td>
          <td>{roll.score}</td>
          <td>{roll.date}</td>
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
    <main className='container-fluid bg-secondary text-center'>
      <table className='table table-warning table-striped-columns'>
        <thead className='table-dark'>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody id='scores'>{scoreRows}</tbody>
      </table>
    </main>
  );
}
