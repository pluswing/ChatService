import * as Express from 'express';
import { UserDAO } from '../repositories/User';
import { UserMessageDAO } from '../repositories/UserMessage';

const app = Express();

app.post('/histories', async (req, res) => {
  const uid = req.body.uid;
  const userDao = new UserDAO();
  const userMessageDao = new UserMessageDAO();
  const u = await userDao.findOrCreate(uid);
  const histories = await userMessageDao.histories(u);
  return res.json(histories);
});

export default app;
