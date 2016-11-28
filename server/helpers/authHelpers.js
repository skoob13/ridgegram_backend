import config from '../../config/env';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import Account from '../models/account.model';

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromBodyField('token');
opts.secretOrKey = config.jwtSecret;

const jwtStrategy = new JwtStrategy(opts, (jwt_payload, done) => {
  Account.findOne({ _id: jwt_payload.sub }, function(err, account) {
    if (err) {
        return done(err, false);
    }
    if (account) {
        done(null, account);
    } else {
        done(null, false);
    }
  });
});

export default jwtStrategy;
