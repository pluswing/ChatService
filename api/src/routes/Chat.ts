import * as Express from 'express';
import { users } from '../repositories/User';
import { userMessages } from '../repositories/UserMessage';

const app = Express();

app.post('/histories', async (req, res) => {
    const uid = req.body.uid;
    const u = await users.findOrCreate(uid);
    return res.json(await userMessages.histories(u));
});

export default app;
