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
        this.diceSides = diceSides;
        this.diceNum = diceNum;
        this.diceTotal = diceTotal;
        this.userName = userName;
        this.type = type;   
    }
}

class RollMessageNotifier {
    events = [];
    handlers = [];

    constructor() {

        setInterval(async () => {
            const diceType = pickDice(Math.floor(Math.random() * 6));
            const diceNumber = Math.floor(Math.random() * 10) + 1;
            const total = rollDice(diceNumber, diceType);
            const userName = randUser(Math.floor(Math.random() * 6));
            const type = 'roll';

            await fetch('/api/rolls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userName,
                    total: total,
                    room: '000',
                    diceType: diceType,
                    diceNumber: diceNumber
                }),
            })
            this.broadcastEvent(RollEvent.RollType, diceType, diceNumber, total, userName);
        }, 10000);
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

const RollNotifier = new RollMessageNotifier();
export { RollEvent, RollNotifier };