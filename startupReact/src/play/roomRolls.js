

const RollEvent = {
    RollType: 'roll',
    CritType: 'crit',
};

class RollEventMessage {
    constructor(diceSides, diceNum, diceTotal, userName) {
        this.diceSides = diceSides;
        this.diceNum = diceNum;
        this.diceTotal = diceTotal;
        this.userName = userName;   
    }
}

class RollMessageNotifier {
    events = [];
    handlers = [];

    constructor() {

        setInterval(() => {
            const diceType = 20;
            const diceNumber = Math.floor(Math.random() * 10) + 1;
            const total = 5;
            const userName = 'James';
            this.broadcastEvent(diceType, diceNumber, total, userName);
        })
    }

    broadcastEvent(diceSides, diceNum, diceTotal, userName) {
        const event = new RollEventMessage(diceSides, diceNum, diceTotal, userName);
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