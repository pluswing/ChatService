import * as Express from 'express';

const app = Express();

class Message {
    constructor(id: number, message: string) {
        this.id = id;
        this.message = message;
    }
    id: number;
    message: string;
}
const messages : Message[] = [];

app.post('/post', (req, res) => {
    const m = new Message(messages.length + 1, req.body.message);
    messages.push(m);
    res.json(m);
});

app.post('/histories', (req, res) => {
    return res.json(messages);
});

export default app;
