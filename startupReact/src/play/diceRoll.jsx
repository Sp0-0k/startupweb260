import React from 'react';
import { RollEvent, RollNotifier } from './roomRolls.js';
import { LoginResponse } from './loginResponse.jsx';

export function DiceRoll(props) {
    const [diceTotal, setDiceTotal] = React.useState(props.diceTotal)
    const [diceType, setDiceType] = React.useState();
    const [diceNumber, setDiceNumber] = React.useState(1);
    const [displayError, setDisplayError] = React.useState(null);
    const sound = new Audio('/diceroll.mp3');

    async function rollDice() {
        if (diceType === undefined || diceNumber <= 0) {
            alert("Choose your dice type and quantity wisely, traveler.");
            return;
        }
        let total = 0;
        for (let i = 0; i < diceNumber; i++) {
            total += Math.floor(Math.random() * diceType) + 1;
        }

        setDiceTotal(total);
        sound.play().catch(e => console.log('Audio play failed', e));
        const newRoll = { type: 'roll', userName: props.userName, totalRoll: total, roomCode: props.roomCode, diceType: diceType, diceNumber: diceNumber };
        const response = await fetch('/api/rolls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRoll),
        });
        if (response?.status !== 201) {
            const body = await response.json();
            setDisplayError(`⚠ System Error: ${body.msg}`);
            return;
        }
        RollNotifier.broadcastEvent(newRoll);
    }

    const diceOptions = [4, 6, 8, 10, 12, 20, 100];

    return (
        <div className="glass-panel control-panel">
            <h2 className="panel-title">Dice Setup</h2>

            <div className="config-group">
                <label className="config-label">Quantity</label>
                <div className="number-input-wrapper">
                    <button type="button" className="spin-btn" onClick={() => setDiceNumber(Math.max(1, diceNumber - 1))}>-</button>
                    <input type="number" min="1" max="50" className="cinematic-input center-num" value={diceNumber} onChange={(e) => setDiceNumber(parseInt(e.target.value) || 1)} />
                    <button type="button" className="spin-btn" onClick={() => setDiceNumber(diceNumber + 1)}>+</button>
                </div>
            </div>

            <div className="config-group mt-3">
                <label className="config-label">Polyhedron</label>
                <div className="dice-grid">
                    {diceOptions.map(d => (
                        <button
                            key={d}
                            type="button"
                            className={`dice-btn ${diceType === d ? 'active' : ''}`}
                            onClick={() => setDiceType(d)}
                        >
                            d{d}
                        </button>
                    ))}
                </div>
            </div>

            <button type="button" className="cinematic-btn primary full-width mt-4" onClick={rollDice}>Cast Roll</button>

            <div className="result-display mt-4">
                <div className="scrying-orb">
                    <div className="orb-value">{diceTotal !== '' ? diceTotal : '--'}</div>
                </div>
            </div>

            <LoginResponse message={displayError} onHide={() => setDisplayError(null)} />
        </div>
    );
}