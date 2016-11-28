import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';
import passport from 'passport';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/user/:id', passport.authenticate('jwt', {session: false}), userCtrl.getUser);

export default router;
