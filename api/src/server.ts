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

app.get('/', (req, res) => {
    return res.send('Hello TS world.');
});

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        console.log(msg);
        ws.send(msg);
    });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

export default app;
