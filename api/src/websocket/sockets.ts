import * as WebSocket from 'ws';
import { User } from '../repositories/User';
import { Operator } from '../repositories/Operator';

class Sockets {
    private sockets: { [key: number]: WebSocket } = {};
    private operatorSockets: { [key: number]: WebSocket } = {};

    addUserSocket(u: User, ws: WebSocket) {
        this.sockets[u.id] = ws;
    }

    removeUserSocket(u: User) {
        delete this.sockets[u.id];
    }

    addOperatorSocket(operator: Operator, ws: WebSocket) {
        this.operatorSockets[operator.id] = ws;
    }

    removeOperatorSocket(operator: Operator) {
        this.removeOperatorSocketById(operator.id);
    }

    private removeOperatorSocketById(operatorId: number) {
        delete this.operatorSockets[operatorId];
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
                this.removeOperatorSocketById(operatorId);
            }
        });
    }
}

const sockets = new Sockets();

export default sockets;
