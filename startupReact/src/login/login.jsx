import React from 'react';

export function Login() {
  return (
    <main className='container-fluid text-center'>
        <h1>Welcome to your auto dice roller</h1>
            <h3>Log in and join a room</h3>


        <form method="get" action="play.html">
            <div className="form-group">
            <input type="email" className="form-control centeredText verticalSpacing" id="exampleInputEmail" placeholder="your@email.com" />
            </div>
            <div className="form-group">
            <input type="password" className="form-control centeredText verticalSpacing" id="exampleInputPassword" placeholder="password" />
            </div>
            <div className="form-group">
            <input type="text" className="form-control centeredText verticalSpacing" id="exampleInputRoomcode" placeholder="room code" />
            </div> 
            <div className="centeredText verticalSpacing">
            <button type="submit" className="btn btn-primary" disabled>Login</button>
            <button style={{"marginLeft":"15px"}}type="button" className="btn btn-primary" disabled>Create Account</button>
            </div>
        </form>
            
        <br />
        <h3>Need an excuse to leave work and play some D&D?</h3>
        <button type="button" className="btn btn-secondary" onClick={()=>alert('You have a meeting with the CEO')}>Generate Excuse</button>

    </main>
  );
}