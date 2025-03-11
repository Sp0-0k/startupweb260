function rollDice(diceNumber, diceType){
    let total = 0;
    for(let i = 0; i < diceNumber; i++){
        total += Math.floor(Math.random() * diceType) + 1;
    }
    return(total);
}

function pickDice(inputNum){
    let diceType = 0;
    switch(inputNum){
        case 0:
            diceType = 4;
            break;
        case 1:
            diceType = 6;
            break;
        case 2:
            diceType = 8;
            break;
        case 3:
            diceType = 10;
            break;
        case 4:
            diceType = 12;
            break;
        case 5:
            diceType = 20;
            break;
        case 6:
            diceType = 100;
            break;
        default:
            diceType = 20;
    }
    return diceType;
}

function randUser(inputNum){
    let userName = '';
    switch(inputNum){
        case 0:
            userName = 'James';
            break;
        case 1:
            userName = 'Kirk';
            break;
        case 2:
            userName = 'Megan';
            break;
        case 3:
            userName = 'Jen';
            break;
        case 4:
            userName = 'Chris';
            break;
        case 5:
            userName = 'Alex';
            break;
        case 6:
            userName = 'Sam';
            break;
        default:
            userName = 'Anna';
    }
    return userName;
}

const RollEvent = {
    RollType: 'roll',
    CritType: 'crit',
};

class RollEventMessage {
    constructor(type, diceSides, diceNum, diceTotal, userName) {
        this.type = type;
        this.diceSides = diceSides;
        this.diceNum = diceNum;
        this.diceTotal = diceTotal;
        this.userName = userName;
        this.timestamp = Date.now();
    }
}

class RollMessageNotifier {
    events = [];
    handlers = [];

    constructor() {

        setInterval(() => {
            const diceType = pickDice(Math.floor(Math.random() * 6));
            const diceNumber = Math.floor(Math.random() * 10) + 1;
            const total = rollDice(diceNumber, diceType);
            const userName = randUser(Math.floor(Math.random() * 6));
            const type = 'roll';
            this.broadcastEvent(RollEvent.RollType, diceType, diceNumber, total, userName);
        }, 5000);
    }

    broadcastEvent(type, diceSides, diceNum, diceTotal, userName) {
        const event = new RollEventMessage(type, diceSides, diceNum, diceTotal, userName);
        this.receiveEvent(event);
    }

    addHandler(handler){
        this.handlers.push(handler);
    }

    removeHandler(handler){
        this.handlers.filter((h) => h !== handler);
    }

    receiveEvent(event){
        this.events.push(event);
        this.handlers.forEach((h) => h(event));
    }
}

// Function to save a roll to the server
async function saveRollToServer(diceSides, diceNum, diceTotal, userName, roomCode) {
  try {
    const response = await fetch('/api/roll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        diceSides,
        diceNum,
        diceTotal,
        userName,
        type: 'roll',
        roomCode
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving roll:', error);
  }
}

// Fix fetchRecentRolls to use RollEventMessage instead of RollEvent
async function fetchRecentRolls(roomCode = null, limit = 10) {
  try {
    let url = `/api/rolls?limit=${limit}`;
    if (roomCode) {
      url += `&roomCode=${roomCode}`;
    }
    
    console.log(`Fetching rolls from: ${url}`);
    const response = await fetch(url);
    
    // Check if response is ok
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Received roll data:', data);
    
    // Convert server data to roll events
    // Make sure you're using the correct constructor from your code
    return data.rolls.map(roll => new RollEventMessage(
      roll.type,
      roll.diceSides,
      roll.diceNum,
      roll.diceTotal,
      roll.userName
    ));
  } catch (error) {
    console.error('Error fetching rolls:', error);
    return []; // Return empty array on error
  }
}

// Then modify your existing roll functions to save to server
// For example, in your performRoll function:
function performRoll(userName, diceSides, diceNum, roomCode) {
  // Your existing dice rolling logic
  const diceTotal = calculateDiceRoll(diceNum, diceSides);
  
  // Create local event
  const rollEvent = new RollEvent(userName, diceSides, diceNum, diceTotal, RollEvent.RollType);
  
  // Notify local listeners
  RollNotifier.notifyHandlers(rollEvent);
  
  // Save to server
  saveRollToServer(diceSides, diceNum, diceTotal, userName, roomCode);
  
  return rollEvent;
}

// Fix the loadRollHistory function to properly return a Promise
function loadRollHistory(roomCode) {
  return fetchRecentRolls(roomCode).then(rolls => {
    // Process each roll through the notifier system
    rolls.forEach(roll => {
      RollNotifier.notifyHandlers(roll);
    });
    return rolls; // Return rolls to continue the Promise chain
  });
}

const RollNotifier = new RollMessageNotifier();
export { RollEvent, RollNotifier, saveRollToServer, fetchRecentRolls, loadRollHistory };