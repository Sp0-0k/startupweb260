import React from 'react';

export function AudioMuteButton(){
    
    
    function toggleMuted() {
        var sound = document.getElementById('sound');
        sound.muted = !sound.muted;
    }


    return (
        <div>
            <button className="btn btn-primary" onClick={toggleMuted()}>Mute|Unmute</button>
            <audio id="sound" autoPlay="autoplay" loop="loop">
                <source src="chillbackground.mp3" type="audio/ogg"/>
            </audio>
        </div>
      );
}