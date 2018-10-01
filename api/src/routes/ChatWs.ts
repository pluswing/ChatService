import * as Express from 'express';
import * as ExpressWs from 'express-ws';

const { app, getWss, applyTo } = ExpressWs(Express());

applyTo(Express.Router());
getWss().clients.forEach((ws) => {
    if (ws.readyState !== ws.OPEN) {
        ws.terminate();
        return;
    }
    ws.ping();
});

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        console.log(msg);
        ws.send(msg);
    });
});

export default app;
