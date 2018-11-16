import * as Express from 'express';
import { operators } from '../repositories/Operator';

import * as passport from 'passport';
import {
    Strategy as JwtStrategy,
    ExtractJwt,
} from 'passport-jwt';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret', // FIXME
    issuer: 'accounts.examplesoft.com', // FIXME
    audience: 'yoursite.net', // FIXME
};

passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    const operator = operators.find(jwtPayload.sub);
    if (operator) {
        return done(null, operator);
    } else {
        return done(null, false);
    }
}));

const app = Express();

app.post('/histories', (req, res) => {
    const uid = req.body.uid;
    const u = users.findOrCreate(uid);
    return res.json(userMessages.histories(u.id));
});

export default app;
