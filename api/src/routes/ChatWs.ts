import * as Express from 'express';
import * as ExpressWs from 'express-ws';
import * as WebSocket from 'ws';

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

    const sockets:{[key: string]: WebSocket} = {};

    // {method: 'register', uid: 'xxxxxxxxx'}
    // {method: 'post', to: 'xxxxxxx', body: '......'}

    app.ws(path, (ws, req) => {
        ws.on('message', (msg) => {
            console.log(msg);

            const m = JSON.parse(msg.toString());

            if (m.method === 'register') {
                // 登録処理
                sockets[m.uid] = ws;
                ws.send(msg);
            }

            if (m.method === 'post') {
                sockets[m.to].send(msg);
            }
        });
    });
};

export default {
    bind,
};
