import React from 'react';

import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const [roomCode, setRoomCode] = React.useState('');

  async function loginUser() {
    localStorage.setItem('userName', userName);
    localStorage.setItem('roomCode', roomCode);
    props.onLogin(userName, roomCode);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    localStorage.setItem('roomCode', roomCode);
    props.onLogin(userName, roomCode);
  }



return (
    <>
        <h3>Log in and join a room</h3>
        <form method="get" action="play.html">
            <div className="form-group">
                <input type="email" className="form-control centeredText verticalSpacing" id="exampleInputEmail" placeholder="your@email.com" onChange={(e) => setUserName(e.target.value)}/>
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
        </form>
        </>
    );

}