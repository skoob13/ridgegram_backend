import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/auth.controller';

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/signin - Sign in user's account */
router.route('/signin')
  .post(validate(paramValidation.signin), authCtrl.signIn);

/** POST /api/signup - Sign up user's new account */
router.route('/signup')
  .post(validate(paramValidation.signup), authCtrl.signUp);

export default router;
