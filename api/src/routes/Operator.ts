import * as Express from 'express';

import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { OperatorDAO } from '../repositories/Operator';
import { UserDAO } from '../repositories/User';
import { UserMessage, UserMessageDAO } from '../repositories/UserMessage';
import { sendUser, broadcastOperators } from '../redis';

const opRepo = new OperatorDAO();

const secret = process.env.SECRET || '';
const signOptions = {
  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
  ...signOptions,
};
passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    const operator = await opRepo.find(jwtPayload.sub);
    if (operator) {
      done(null, operator);
    } else {
      done(null, false);
    }
  }),
);

const app = Express();
app.use(passport.initialize());

// unsecure API
app.post('/authenticate', async (req, res) => {
  // LOGIN token発行
  const loginId = req.body.loginId;
  const password = req.body.password;
  try {
    const operator = await opRepo.login(loginId, password);
    const payload = { sub: operator.loginId };
    const token = jwt.sign(payload, secret, signOptions);
    res.json({
      operator,
      success: true,
      token,
    });
  } catch (e) {
    res.status(401).json({
      success: false,
    });
  }
});

// secure API
app.use(passport.authenticate('jwt', { session: false }));

app.post('/users', async (req, res) => {
  const repo = new UserDAO();
  const mrepo = new UserMessageDAO();
  const users = await repo.list();
  const data: any[] = [];
  for (const user of users) {
    const row: { [key: string]: any } = {};
    row.user = user;
    console.log(user);
    row.message = await mrepo.latestMessage(user);
    data.push(row);
  }
  console.log('users res');
  res.json({ data });
});

app.post('/activities', async (req, res) => {
  const mrepo = new UserMessageDAO();
  const messages = await mrepo.activities();
  return res.json({ messages });
});

app.post('/messages', async (req, res) => {
  const uid = req.body.uid;
  const urepo = new UserDAO();
  const user = await urepo.findOrCreate(uid);
  const mrepo = new UserMessageDAO();
  const messages = await mrepo.histories(user);
  return res.json({ messages });
});

app.post('/send', async (req, res) => {
  const { uid, body, createdAt } = req.body;
  const urepo = new UserDAO();
  const user = await urepo.findOrCreate(uid);
  const mrepo = new UserMessageDAO();
  const userMessage = new UserMessage(user.id, body);
  userMessage.createdAt = new Date(createdAt);
  userMessage.operatorId = req.user.id;
  const um = await mrepo.add(userMessage);
  const resp = JSON.stringify({
    method: 'post',
    body: um.body,
    id: um.id,
    operatorId: um.operatorId,
    createdAt: um.createdAt,
    uid: user.uid,
  });
  // sockets.sendUser(user, resp);
  sendUser(user, resp);
  // sockets.broadcastOperators(resp);
  broadcastOperators(resp);
  return res.json({ message: um });
});

export default app;
