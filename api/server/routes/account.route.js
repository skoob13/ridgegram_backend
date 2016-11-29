import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';
import passport from 'passport';

const router = express.Router(); // eslint-disable-line new-cap

// GET user/id - get information about user by id
router.get('/user/:id', passport.authenticate('jwt', {session: false}), userCtrl.getUser);

// GET users?offset=0 - get list of users with specified offset
router.get('/users', passport.authenticate('jwt', {session: false}), validate(paramValidation.users), userCtrl.getUserList);

// POST user/like - like user's avatar
router.post('/user/like', passport.authenticate('jwt', {session: false}), validate(paramValidation.likeUser), userCtrl.likeUser);

export default router;
