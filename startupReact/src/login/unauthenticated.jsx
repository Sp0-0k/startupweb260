import React from 'react';
import { LoginResponse } from './loginResponse.jsx';
import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const [roomCode, setRoomCode] = React.useState('');

  async function loginUser() {
    loginOrCreate('/api/auth/login');
  }

  async function createUser() {
    loginOrCreate('/api/auth/create');
  }


  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ name: userName, password: password, roomCode: roomCode }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      localStorage.setItem('roomCode', roomCode);
      props.onLogin(userName, roomCode);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }



return (
    <>
        <h3>Log in and join a room</h3>
        <div className='input-group mb-3'>
            <div className="form-group">
                <input type="username" className="form-control centeredText verticalSpacing" id="exampleInputUsername" placeholder="username" onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div className="form-group">
                <input type="password" className="form-control centeredText verticalSpacing" id="exampleInputPassword" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control centeredText verticalSpacing" id="exampleInputRoomcode" placeholder="room code" onChange={(e) => setRoomCode(e.target.value)}/>
            </div> 
            <div className="centeredText verticalSpacing">
                <button type="submit" className="btn btn-primary" onClick={() => loginUser()} disabled={!userName || !password || !roomCode}>Login</button>
                <button style={{"marginLeft":"15px"}}type="button" className="btn btn-primary" onClick={() => createUser()} disabled={!userName || !password || !roomCode}>Create Account</button>
            </div>
        </div>


    <LoginResponse message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );

}