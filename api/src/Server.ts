import * as Express from 'express';
import * as BodyParser from 'body-parser';

import Chat from './routes/Chat';
import ChatWs from './routes/ChatWs';
import Operator from './routes/Operator';

const app = Express();
app.use(BodyParser.json());
app.use(BodyParser.raw());
app.use(BodyParser.text());
app.use(BodyParser.urlencoded());

// Crossを有効
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
               'Origin, X-Requested-With, Content-Type, Authorization, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});
// Optionsも必要
app.options('*', (req, res) => {
    res.sendStatus(200);
});

app.use('/v1/chat/', Chat);
ChatWs.bind('/v1/chat/ws/', app);
app.use('/v1/operator', Operator);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

export default app;
