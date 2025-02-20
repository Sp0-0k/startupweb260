import React from 'react';

export function AudioMuteButton(){
    const[muteState, setMuteState] = React.useState(false);

    React.useEffect(() => {
        setMuteState(false);
    }, []);


    
    
    function toggleMuted() {
        if(muteState){
            setMuteState(false);
        }
        else{
            setMuteState(true);
        }
    }


    return (
        <div>
            <button className="btn btn-primary" onClick={toggleMuted} muted={muteState}>Mute|Unmute</button>
            <audio id="sound" autoPlay="autoplay" loop="loop">
                <source src="chillbackground.mp3" type="audio/ogg"/>
            </audio>
        </div>
      );
}