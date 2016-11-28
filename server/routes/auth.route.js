import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/auth.controller';
import config from '../../config/env';
import passport from 'passport';

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/signin - Sign in user's account */
router.route('/signin')
  .post(validate(paramValidation.signin), authCtrl.signIn);

/** POST /api/signup - Sign up user's new account */
router.route('/signup')
  .post(validate(paramValidation.signup), authCtrl.signUp);

/** POST /api/signup - Sign up user's new account */
// should be protected
router.route('/signout')
  .post(authCtrl.signOut);

/*router.post('/random', passport.authenticate('jwt', {session: false}), validate(paramValidation.random), function(req, res) {
  res.send(req.user);
});*/

export default router;
