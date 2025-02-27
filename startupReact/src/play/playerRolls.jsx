import React from 'react';

import { RollEvent, RollNotifier } from './roomRolls.js';
import './play.css';

export function PlayerRolls(props) {
    const userName = props.userName;

    const [events, setEvent] = React.useState([]);

    React.useEffect(() => {
        RollNotifier.addHandler(handleRollEvent);

        return () => {
            RollNotifier.removeHandler(handleRollEvent);
        };
}, []);

    function handleRollEvent(event){
        setEvent((prevEvents) => {
            let newEvents = [event, ...prevEvents];
            if (newEvents.length > 3){
                newEvents = newEvents.slice(0, 3);
            }
            return newEvents;
        });
    }

    function createMessageArray(){
        const messageArray = [];
        for (const [i, event] of events.entries()){
            let message = 'unknown';
            if (event.type === RollEvent.RollType) {
                message = `${event.userName} rolled ${event.diceNum} d${event.diceSides}: ${event.diceTotal}`;
            }
            else if (event.type === RollEvent.CritType) {
                message = `${event.userName} rolled a crit!`;
            }
            messageArray.push(
                <div key={i} className='event'>
                    {message}
                </div>
            );
        }
        return messageArray;
    }

    return (
        <div className='players centered-text'>
            Current Rolls:
            <div id='player-messages'>{createMessageArray()}</div>
    </div>
  );
}