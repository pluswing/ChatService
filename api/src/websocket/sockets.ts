import * as WebSocket from 'ws';
import { User } from '../repositories/User';

class Sockets {
    private sockets: { [key: number]: WebSocket } = {};
    private operatorSockets: { [key: number]: WebSocket } = {};

    addUserSocket(u: User, ws: WebSocket) {
        this.sockets[u.id] = ws;
    }

    removeUserSocket(u: User) {
        delete this.sockets[u.id];
    }

    addOperatorSocket(id: number, ws: WebSocket) {
        this.operatorSockets[id] = ws;
    }

    removeOperatorSocket(id: number) {
        delete this.operatorSockets[id];
    }

    sendUser(u: User, resp: string) {
        if (u.id in this.sockets) {
            const socket = this.sockets[u.id];
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(resp);
            } else {
                this.removeUserSocket(u);
            }
        }
    }

    broadcastOperators(resp: string) {
        Object.keys(this.operatorSockets).forEach((id) => {
            const operatorId = parseInt(id, 10);
            const socket = this.operatorSockets[operatorId];
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(resp);
            } else {
                this.removeOperatorSocket(operatorId);
            }
        });
    }
}

const sockets = new Sockets();

export default sockets;
