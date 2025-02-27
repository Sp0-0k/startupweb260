

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

        setInterval(() => {
            const diceType = 20;
            const diceNumber = Math.floor(Math.random() * 10) + 1;
            const total = 3;
            const userName = 'James';
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

const RollNotifier = new RollMessageNotifier();
export { RollEvent, RollNotifier };