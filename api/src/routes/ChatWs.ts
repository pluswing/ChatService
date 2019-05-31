import * as Express from 'express';
import * as ExpressWs from 'express-ws';
import sockets from '../websocket/sockets';

import { UserMessage, UserMessageDAO } from '../repositories/UserMessage';
import { UserDAO } from '../repositories/User';
import * as jwt from 'jsonwebtoken';
import { OperatorDAO } from '../repositories/Operator';

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
    const operatorDao = new OperatorDAO();

    app.ws(path, (ws, req) => {
        ws.on('message', async (msg) => {
            console.log(msg);

            const m = JSON.parse(msg.toString());

            if (m.method === 'register') {
                // 登録処理
                if (m.isOperator) {
                    const decoded: any = jwt.verify(m.token, 'secret');
                    const operator = await operatorDao.find(decoded.sub);
                    if (operator != null) {
                        sockets.addOperatorSocket(operator, ws);
                    }
                } else {
                    const u = await userDao.findOrCreate(m.uid);
                    sockets.addUserSocket(u, ws);
                }
                ws.send(msg);
            }

            if (m.method === 'disconnect') {
                if (m.isOperator) {
                    const decoded: any = jwt.verify(m.token, 'secret');
                    const operator = await operatorDao.find(decoded.sub);
                    if (operator != null) {
                        sockets.removeOperatorSocket(operator);
                    }
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
                    body: um.body,
                    id: um.id,
                    operatorId: null,
                    createdAt: um.createdAt,
                    uid: u.uid,
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
