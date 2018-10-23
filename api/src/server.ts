import * as Express from 'express';
import * as BodyParser from 'body-parser';

import Chat from './routes/Chat';
import ChatWs from './routes/ChatWs';

const app = Express();
app.use(BodyParser.json());
app.use(BodyParser.raw());
app.use(BodyParser.text());
app.use(BodyParser.urlencoded());

app.use('/v1/chat/', Chat);
ChatWs.bind('/v1/chat/ws/', app);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

export default app;
