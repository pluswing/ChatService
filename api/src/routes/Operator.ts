import * as Express from 'express';
import { operators } from '../repositories/Operator';

import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import {
    Strategy as JwtStrategy,
    ExtractJwt,
} from 'passport-jwt';

// for TEST
operators.create('hogehoge', 'hoge', 'fuga');

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
passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    const operator = operators.find(jwtPayload.sub);
    if (operator) {
        done(null, operator);
    } else {
        done(null, false);
    }
}));

const app = Express();
app.use(passport.initialize());

// unsecure API
app.post('/authenticate', (req, res) => {
    // LOGIN token発行
    const loginId = req.body.loginid;
    const password = req.body.password;
    try {
        const operator = operators.login(loginId, password);
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

app.use(passport.authenticate('jwt', { session: false }));
// secure API
app.post('/hoge', (req, res) => {
    // ログイン必須API
    res.json({ succes: true });
});
app.post('/fuga', (req, res) => {
    // ログイン必須API
    res.json({ succes: true });
});

export default app;
