import * as WebSocket from 'ws';
import { Operator } from '../repositories/Operator';
import { User } from '../repositories/User';

export class Sockets {
  private sockets: { [key: number]: WebSocket } = {};
  private operatorSockets: { [key: number]: WebSocket } = {};

  public addUserSocket(u: User, ws: WebSocket) {
    this.sockets[u.id] = ws;
  }

  public removeUserSocket(u: User) {
    delete this.sockets[u.id];
  }

  public addOperatorSocket(operator: Operator, ws: WebSocket) {
    this.operatorSockets[operator.id] = ws;
  }

  public removeOperatorSocket(operator: Operator) {
    this.removeOperatorSocketById(operator.id);
  }

  public sendUser(u: User, resp: string) {
    if (u.id in this.sockets) {
      const socket = this.sockets[u.id];
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(resp);
      } else {
        this.removeUserSocket(u);
      }
    }
  }

  public broadcastOperators(resp: string) {
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

  private removeOperatorSocketById(operatorId: number) {
    delete this.operatorSockets[operatorId];
  }
}

const sockets = new Sockets();

export default sockets;
