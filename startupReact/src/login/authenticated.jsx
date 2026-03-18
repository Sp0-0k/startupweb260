import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {
  const navigate = useNavigate();
  const [isEditingRoom, setIsEditingRoom] = React.useState(false);
  const [newRoomCode, setNewRoomCode] = React.useState(props.roomCode);

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        localStorage.removeItem('roomCode');
        props.onLogout();
      });
  }

  function saveRoomChange() {
    if (newRoomCode && !isNaN(newRoomCode)) {
      localStorage.setItem('roomCode', newRoomCode);
      props.onRoomChange(newRoomCode);
      setIsEditingRoom(false);
    }
  }

  function cancelRoomChange() {
    setNewRoomCode(props.roomCode);
    setIsEditingRoom(false);
  }

  return (
    <div className="glass-panel auth-status-panel">
      <div className="loginInfo">
        <h2>Welcome, <span>{props.userName}</span></h2>
        {isEditingRoom ? (
          <div className="room-edit-container">
            <p className="edit-prompt">Enter New Room:</p>
            <input
              type="text"
              inputMode="numeric"
              className="cinematic-input small-input"
              value={newRoomCode}
              onChange={(e) => setNewRoomCode(e.target.value)}
              autoFocus
            />
          </div>
        ) : (
          <p>Your active room is <strong>{props.roomCode}</strong></p>
        )}
      </div>
      <div className="buttons-stack horizon">
        {isEditingRoom ? (
          <>
            <button className="cinematic-btn primary" onClick={saveRoomChange} disabled={!newRoomCode}>
              Save
            </button>
            <button className="cinematic-btn" onClick={cancelRoomChange}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="cinematic-btn primary" onClick={() => navigate('/play')}>
              Enter Room
            </button>
            <button className="cinematic-btn" onClick={() => setIsEditingRoom(true)}>
              Switch Room
            </button>
            <button className="cinematic-btn" onClick={() => logout()}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}