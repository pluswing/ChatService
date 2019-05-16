import * as WebSocket from 'ws';
import { User } from '../repositories/User';

class Sockets {
    private sockets: { [key: number]: WebSocket } = {};
    private operatorSockets: { [key: number]: WebSocket } = {};

    addUserSocket(u: User, ws: WebSocket) {
        this.sockets[u.id] = ws;
    }

    addOperatorSocket(id: number, ws: WebSocket) {
        this.operatorSockets[id] = ws;
    }

    sendUser(u: User, resp: string) {
        this.sockets[u.id].send(resp);
    }

    broadcastOperators(resp: string) {
        Object.keys(this.operatorSockets).forEach((id) => {
            this.operatorSockets[parseInt(id, 10)].send(resp);
        });
    }
}

const sockets = new Sockets();

export default sockets;
