import React from 'react';
import './room.css';

export function Room(props) {
  const [rolls, setRolls] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Function to fetch rolls from the database
  const fetchRolls = async () => {
    setLoading(true);
      const response = await fetch(`/api/rolls/${props.roomCode}`);
      const data = await response.json();
      setRolls(data);
      setLoading(false);
  };

  // Initial fetch when component mounts
  React.useEffect(() => {
    fetchRolls();
  }, [props.roomCode]);

  const rollsRows = [];
  if (rolls.length) {
    // Create a copy of the array and reverse it so newest rolls appear first
    const reversedRolls = [...rolls].reverse();
    
    for (const [i, roll] of reversedRolls.entries()) {
      rollsRows.push(
        <tr key={i}>
          <td>{roll.userName.split('@')[0]}</td>
          <td>{roll.totalRoll}</td>
          <td>{roll.diceType}</td>
          <td>{roll.diceNumber}</td>
        </tr>
      );
    }
  } else {
    rollsRows.push(
      <tr key='0'>
        <td colSpan='4'>{loading ? 'Loading...' : 'Be the first to roll in your room'}</td>
      </tr>
    );
  }

  return (
    <main className='container-fluid text-center'>
      <div className="justify-content-between align-items-center mb-3">
        <h3 className="text-dark">Room {props.roomCode}'s Rolls</h3>
        <br />
        <button 
          className="btn btn-primary" 
          onClick={fetchRolls} 
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh Rolls'}
        </button>
      </div>
      
      <table className='table table-warning table-striped-columns'>
        <thead className='table-active'>
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
