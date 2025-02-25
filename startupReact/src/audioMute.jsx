import React from 'react';

export function AudioMuteButton(){
    const[muteState, setMuteState] = React.useState(false);
    const[playState, setPlayState] = React.useState("Mute");

    React.useEffect(() => {
        setMuteState(false);
    }, []);


    
    
    function toggleMuted() {
        if(muteState){
            setMuteState(false);
            document.getElementById('sound').muted = false;
            setPlayState("Mute")
        }
        else{
            setMuteState(true);
            document.getElementById('sound').muted = true;
            setPlayState("Unmute")
        }
    }


    return (
        <div>
            <button className="btn btn-primary" onClick={toggleMuted} muted={muteState}>{playState}</button>
            <audio id="sound" autoPlay="autoplay" loop="loop">
                <source src="chillbackground.mp3" type="audio/ogg" mute={muteState}/>
            </audio>
        </div>
      );
}