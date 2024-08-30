import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config } from '../../../config/config.cjs';
import UserService from '../../../services/user.service.js';

const service = new UserService();

const options ={
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtStrat = new JwtStrategy(options, async (payload, done)=> {
  try {
    const user = await service.findByPk(payload.sub);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'User not found or invalid token.' });
    }
  } catch (error) {
    return done(error, false, { message: 'An error occurred while verifying the token.' });
  }
});

export default JwtStrat
