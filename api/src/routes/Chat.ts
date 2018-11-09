import * as Express from 'express';
import { users } from '../repositories/User';
import { userMessages } from '../repositories/UserMessage';

const app = Express();

app.post('/histories', (req, res) => {
    const uid = req.body.uid;
    const u = users.findOrCreate(uid);
    return res.json(userMessages.histories(u.id));
});

export default app;
