import * as Express from 'express';
import * as ExpressWs from 'express-ws';
import sockets from '../websocket/sockets';

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
                    sockets.addOperatorSocket(m.id, ws);
                } else {
                    const u = await userDao.findOrCreate(m.uid);
                    sockets.addUserSocket(u, ws);
                }
                ws.send(msg);
            }

            if (m.method === 'disconnect') {
                if (m.isOperator) {
                    sockets.removeOperatorSocket(m.id);
                } else {
                    const u = await userDao.findOrCreate(m.uid);
                    sockets.removeUserSocket(u);
                }
            }

            if (m.method === 'post') {
                const u = await userDao.findOrCreate(m.uid);
                const um = new UserMessage(u.id, m.message);
                console.log(um);
                await userMessageDao.add(um);
                const resp = JSON.stringify({
                    method: 'post',
                    message: um.body,
                    id: um.id,
                    operatorId: null,
                    createdAt: um.createdAt,
                });
                sockets.sendUser(u, resp);
                sockets.broadcastOperators(resp);
            }
        });
    });
};

export default {
    bind,
};
