import passport from 'passport';
import JwtStrat from './strategies/jwt.strategy.js';

passport.use(JwtStrat);

export default passport;
