import React from 'react';
import { RollEvent, RollNotifier } from './roomRolls.js';
import './play.css';

export function PlayerRolls(props) {
    const userName = props.userName;
    const [events, setEvent] = React.useState([]);

    React.useEffect(() => {
        RollNotifier.addHandler(handleRollEvent);
        RollNotifier.setRoomCode(props.roomCode);

        return () => {
            RollNotifier.removeHandler(handleRollEvent);
        };
    }, [props.roomCode]);

    function handleRollEvent(event) {
        setEvent((prevEvents) => {
            let newEvents = [event, ...prevEvents];
            if (newEvents.length > 5) {
                newEvents = newEvents.slice(0, 5);
            }
            return newEvents;
        });
    }

    function createMessageArray() {
        if (events.length === 0) {
            return <div className="event empty">// The ledger is empty. Roll to begin the tale...</div>;
        }

        const messageArray = [];
        for (const [i, event] of events.entries()) {
            let message = 'An unknown magic was spoken.';
            if (event.type === RollEvent.RollType) {
                message = `[${event.userName}] rolled ${event.diceNumber}d${event.diceType} → OUTCOME: ${event.totalRoll}`;
            }
            else if (event.type === RollEvent.CritType) {
                message = `[${event.userName}] STRUCK A CRITICAL BLOW!`;
            }
            messageArray.push(
                <div key={i} className={`event ${i === 0 ? 'newest' : ''}`}>
                    <span className="timestamp">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                    <span className="log-msg">{message}</span>
                </div>
            );
        }
        return messageArray;
    }

    return (
        <div className="glass-panel log-panel">
            <h2 className="panel-title">Adventurer's Log</h2>
            <div className="parchment-feed">
                {createMessageArray()}
            </div>
        </div>
    );
}