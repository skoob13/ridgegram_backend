import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../../config/env';
import Account from '../models/account.model';
import jwt from 'jsonwebtoken';

/**
 * Sign in to account
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function signIn(req, res, next) {
  const {
    cellphone,
    password
  } = req.body;

  if (cellphone && password) {
    let account;
    try {
      account = await Account.getByCellphone(cellphone);
    }
    catch(e) {
      const error = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
      return res.send(error);
    }

    account.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) {
        const error = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
        return res.send(error);
      }

      let payload = {
        sub: account._id,
      };

      let token = jwt.sign(payload, config.jwtSecret);
      res.send(token);
    });
  } else {
    const error = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
    return res.send(error);
  }
}

/**
 * Sign up to account
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function signUp(req, res, next) {
  let {
    cellphone,
    password,
    fullname,
    gender,
    avatar,
    description,
  } = req.body;

  if (cellphone && password) {
    const existingAccount = await Account.findOne({ cellphone: cellphone });
    if (existingAccount) {
      const error = new APIError('Account already exists', httpStatus[400]);
      return res.send(error);
    }

    const avatar = new Avatar({
      url: avatar,
      description: description,
    });

    avatar.save((error, savedAvatar) => {
      if (error) {
        const error = new APIError('Saving error', httpStatus[400]);
        return res.send(error);
      }

      const account = new Account({
        cellphone: cellphone,
        password: password,
        fullname: fullname,
        gender: gender,
        avatar: savedAvatar
      });

      account.save((err, account) => {
        if (!err) {
          let payload = {
            sub: account._id,
          };

          let token = jwt.sign(payload, config.jwtSecret);
          return res.send(token);
        } else {
          const error = new APIError('Saving error', httpStatus[400]);
          return res.send(error);
        }
      });
    })
  } else {
    const error = new APIError('Some fields are incorrect', httpStatus[400]);
    return res.send(error);
  }
}

/**
 * Sign out to account
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function signOut(req, res, next) {
  req.logout();
  res.status(200).send();
}

export default { signIn, signUp, signOut };
