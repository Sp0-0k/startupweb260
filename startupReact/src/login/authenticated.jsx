import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  const navigate = useNavigate();

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

  return (
    <div>
      <div className='loginInfo'>Welcome {props.userName} <br /> Your room is {props.roomCode}</div>
      <Button style={{ margin: '5px' }} variant='primary' onClick={() => navigate('/play')}>
        Play
      </Button>
      <Button style={{ margin: '5px' }} variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}