import React from 'react';
import './room.css';

export function Room(props) {
  const [rolls, setRolls] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchRolls = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/rolls/${props.roomCode}`);
      const data = await response.json();
      setRolls(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setRolls([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchRolls();
  }, [props.roomCode]);

  const rollsRows = [];
  if (rolls.length) {
    const reversedRolls = [...rolls].reverse();

    for (const [i, roll] of reversedRolls.entries()) {
      rollsRows.push(
        <tr key={i} className="cinematic-row">
          <td className="user-cell"><span className="dot"></span>{roll.userName.split('@')[0]}</td>
          <td className="data-cell">d{roll.diceType}</td>
          <td className="data-cell">x{roll.diceNumber}</td>
          <td className="highlight-cell">{roll.totalRoll}</td>
          <td className="date-cell">{new Date(roll.date).toLocaleDateString()} <span className="time">{new Date(roll.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></td>
        </tr>
      );
    }
  } else {
    rollsRows.push(
      <tr key='0' className="cinematic-row empty-row">
        <td colSpan='5'>{loading ? 'Consulting the archives...' : 'The ledger is empty. No tales have been recorded here.'}</td>
      </tr>
    );
  }

  return (
    <div className="room-container fade-in">
      <div className="room-header">
        <div className="title-group">
          <h2>Gathering at <span>{props.roomCode}</span></h2>
          <p className="subtitle">Chronicle of Rolls</p>
        </div>
        <button
          className="cinematic-btn primary refresh-btn"
          onClick={fetchRolls}
          disabled={loading}
        >
          {loading ? 'Reading...' : 'Turn Page'}
        </button>
      </div>

      <div className="glass-panel table-wrapper">
        <table className="cinematic-table">
          <thead>
            <tr>
              <th>Adventurer</th>
              <th>Polyhedron</th>
              <th>Quantity</th>
              <th>Outcome</th>
              <th>Recorded At</th>
            </tr>
          </thead>
          <tbody>{rollsRows}</tbody>
        </table>
      </div>
    </div>
  );
}
