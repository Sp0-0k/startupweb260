import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownItem from 'react-bootstrap/DropdownItem'
import { RollEvent, RollNotifier } from './roomRolls.js';


export function DiceRoll(props) {
    const[diceTotal, setDiceTotal] = React.useState(props.diceTotal)
    const[diceType, setDiceType] = React.useState();
    const[diceNumber, setDiceNumber] = React.useState(0);

    async function rollDice(){
        let total = 0;
        for(let i = 0; i < diceNumber; i++){
            total += Math.floor(Math.random() * diceType) + 1;
        }
        setDiceTotal(total, diceType, diceNumber);
        await fetch('/api/rolls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: props.userName,
                totalRoll: total,
                roomCode: props.roomCode,
                diceType: diceType,
                diceNumber: diceNumber
            }),
        })
        RollNotifier.broadcastEvent(RollEvent.RollType, diceType, diceNumber, total, props.userName);
    }



    const [titleOfDropdown, setTitleOfDropdown] = React.useState(`Select a dice`);


    return (
        <div>
            <form> 
                <div data-mdb-input-init className="form-outline, container-fluid" style={{"width" : "7rem", "textAlign" : "center"}}>
                    <label className="form-label" id="typeNumber">Number of dice:</label>
                    <input min="1" max="50" type="number" id="typeNumber" className="form-control" value={diceNumber} onChange={(e) => setDiceNumber(e.target.value)} />
                </div>
                <br />
                <div style={{"textAlign" : "center"}}>
                <label>Dice type:</label>
            
                <DropdownButton id="dropdown-basic-button" title={titleOfDropdown}>
                    <DropdownItem ><div onClick={() => {setDiceType(4); setTitleOfDropdown("d4")}}>d4</div></DropdownItem>
                    <DropdownItem ><div onClick={() => {setDiceType(6); setTitleOfDropdown("d6")}}>d6</div></DropdownItem>
                    <DropdownItem ><div onClick={() => {setDiceType(8); setTitleOfDropdown("d8")}}>d8</div></DropdownItem>
                    <DropdownItem ><div onClick={() => {setDiceType(10); setTitleOfDropdown("d10")}}>d10</div></DropdownItem>
                    <DropdownItem ><div onClick={() => {setDiceType(12); setTitleOfDropdown("d12")}}>d12</div></DropdownItem>
                    <DropdownItem ><div onClick={() => {setDiceType(20); setTitleOfDropdown("d20")}}>d20</div></DropdownItem>
                    <DropdownItem ><div onClick={() => {setDiceType(100); setTitleOfDropdown("d100")}}>d100</div></DropdownItem>
                </DropdownButton>

                <button type="button" onClick={rollDice} className="btn btn-secondary">Roll</button>
                </div>
            </form>

            <div id="results">
            <h2>Results</h2>


        <div style={{"minWidth" : "40vh"}}>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 641.2 419.7" style={{"enableBackground" :"new 0 0 641.2 419.7", fill : "purple"}} xmlSpace="preserve">
        <g>
            <path className="st0" d="M474.1,363.2l56.2-209.7L376.8,0L167.1,56.2l-56.2,209.7l153.5,153.5L474.1,363.2L474.1,363.2L474.1,363.2z
            M519.8,156.3l-50.6,188.8l-87.6-327L519.8,156.3z M460.9,349.9L129,261L371.9,18.1L460.9,349.9z M174.7,63.8l188.8-50.6
            L124.2,252.6L174.7,63.8z M267.2,408.9L129,270.7l327,87.6L267.2,408.9z"/>
            <text x="50%" y="50%" textAnchor="middle" strokeWidth="2px" dy="0.3em" fontSize="4em" style={{"fill" : "gray"}}>{diceTotal}</text>
            </g>
            </svg>      
            </div>
        </div>
    </div>
    );



}