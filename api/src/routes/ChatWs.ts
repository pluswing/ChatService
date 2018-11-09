import * as Express from 'express';
import * as ExpressWs from 'express-ws';
import * as WebSocket from 'ws';

import { users } from '../repositories/User';
import { userMessages, UserMessage } from '../repositories/UserMessage';

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

    const sockets:{[key: number]: WebSocket} = {};

    // {method: 'register', uid: 'xxxxxxxxx'}
    // {method: 'post', to: 'xxxxxxx', body: '......'}

    app.ws(path, (ws, req) => {
        ws.on('message', (msg) => {
            console.log(msg);

            const m = JSON.parse(msg.toString());

            if (m.method === 'register') {
                // 登録処理
                const u = users.findOrCreate(m.uid);
                sockets[u.id] = ws;
                ws.send(msg);
            }

            if (m.method === 'post') {
                const u = users.findOrCreate(m.to);
                userMessages.add(new UserMessage(u.id, m.message));
                sockets[u.id].send(msg);
            }
        });
    });
};

export default {
    bind,
};
