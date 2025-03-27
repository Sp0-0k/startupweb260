const RollEvent = {
    RollType: 'roll',
    CritType: 'crit',
};

class RollEventMessage {
    constructor(type, diceSides, diceNum, diceTotal, userName) {
        this.diceType = diceSides;
        this.diceNumber = diceNum;
        this.totalRoll = diceTotal;
        this.userName = userName;
        this.type = type;   
    }
}

class RollMessageNotifier {
    events = [];
    handlers = [];
    roomCode = '000';

    constructor() {
        // Use secure protocol if page is secure
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        
        // For local development, hardcode the backend port
        // In production, use empty string to use the same port
        const port = window.location.hostname === 'localhost' ? ':4000' : '';
        
        // Create WebSocket connection (no /ws path)
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}${port}`);
        
        console.log(`Connecting to WebSocket: ${protocol}://${window.location.hostname}${port}`);
        
        this.socket.onopen = () => {
            console.log('WebSocket connection established');
            this.receiveEvent(new RollEventMessage('connected', 0, 0, 0, ''));
        };
        
        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.socket.onclose = (event) => {
            this.receiveEvent(new RollEventMessage('disconnected', 0, 0, 0, ''));
        }
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                if (event.roomCode === this.roomCode) {
                    this.receiveEvent(event);
                }
            } catch (error) {
                console.error('Error processing message:', error);
            }
        }
    }

    broadcastEvent(newRoll) {
        this.socket.send(JSON.stringify(newRoll));
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

    setRoomCode(roomCode){
        this.roomCode = roomCode;
    }
}

const RollNotifier = new RollMessageNotifier();
export { RollEvent, RollNotifier };