import * as Express from 'express';

import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import {
    Strategy as JwtStrategy,
    ExtractJwt,
} from 'passport-jwt';
import { UserDAO } from '../repositories/User';
import { UserMessageDAO, UserMessage } from '../repositories/UserMessage';
import { OperatorDAO } from '../repositories/Operator';

const opRepo = new OperatorDAO();

const secret = 'secret'; // FIXME
const signOptions = {
    issuer: 'accounts.examplesoft.com', // FIXME
    audience: 'yoursite.net', // FIXME
};

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
    ...signOptions,
};
passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    const operator = await opRepo.find(jwtPayload.sub);
    if (operator) {
        done(null, operator);
    } else {
        done(null, false);
    }
}));

const app = Express();
app.use(passport.initialize());

// unsecure API
app.post('/authenticate', async (req, res) => {
    // LOGIN token発行
    const loginId = req.body.loginid;
    const password = req.body.password;
    try {
        const operator = await opRepo.login(loginId, password);
        const token = jwt.sign({ sub: operator.loginId }, secret, signOptions);
        res.json({
            token,
            operator,
            success: true,
        });
    } catch (e) {
        console.log(e);
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
        row.message = await mrepo.latestMessage(user);
        data.push(row);
    }
    res.json({ data });
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
    userMessage.createdAt = createdAt;
    userMessage.operatorId = req.user.id;
    const um = await mrepo.add(userMessage);
    return res.json({ message: um });
});

export default app;
