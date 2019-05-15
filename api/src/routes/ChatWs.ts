import * as Express from 'express';
import * as ExpressWs from 'express-ws';
import * as WebSocket from 'ws';

import { UserMessage, UserMessageDAO } from '../repositories/UserMessage';
import { UserDAO } from '../repositories/User';

const bind = (path: string, originalApp: Express.Application) => {

    const { app, getWss, applyTo } = ExpressWs(originalApp);

    applyTo(Express.Router());

    getWss().clients.forEach((ws) => {
        if (ws.readyState !== ws.OPEN) {
            ws.terminate();
            return;
        }
        ws.ping();
    });

    const sockets: { [key: number]: WebSocket } = {};
    const operatorSockets: { [key: number]: WebSocket } = {};

    // {method: 'register', uid: 'xxxxxxxxx'}
    // {method: 'post', to: 'xxxxxxx', body: '......'}

    const userDao = new UserDAO();
    const userMessageDao = new UserMessageDAO();

    app.ws(path, (ws, req) => {
        ws.on('message', async (msg) => {
            console.log(msg);

            const m = JSON.parse(msg.toString());

            if (m.method === 'register') {
                // 登録処理
                if (m.isOperator) {
                    operatorSockets[m.id] = ws;
                } else {
                    const u = await userDao.findOrCreate(m.uid);
                    sockets[u.id] = ws;
                }
                ws.send(msg);
            }

            if (m.method === 'post') {
                const u = await userDao.findOrCreate(m.uid);
                const um = new UserMessage(u.id, m.message);
                console.log(um);
                await userMessageDao.add(um);
                const resp = JSON.stringify({
                    method: 'post',
                    message: m.message,
                    id: um.id,
                    operatorId: null,
                });
                sockets[u.id].send(resp);
                // broadcast operators
                Object.keys(operatorSockets).forEach((id) => {
                    operatorSockets[parseInt(id, 10)].send(resp);
                });
            }
        });
    });
};

export default {
    bind,
};
