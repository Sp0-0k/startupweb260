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

        let port = window.location.port;
        const protocol = window.location.protocol === 'https:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = (event) => {
            this.receiveEvent(new RollEventMessage('connected', 0, 0, 0, ''));
        }
        this.socket.onclose = (event) => {
            this.receiveEvent(new RollEventMessage('disconnected', 0, 0, 0, ''));
        }
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            } catch (error) {
                console.error('Error processing message:', error);
            }
        }
    }

    broadcastEvent(newRoll) {
        const newRollMessage = new RollEventMessage(newRoll.type, newRoll.diceSides, newRoll.diceNum, newRoll.diceTotal, newRoll.userName);
        this.socket.send(JSON.stringify(newRollMessage));
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