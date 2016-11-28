import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../../config/env';
import Account from '../models/account.model';
import Avatar from '../models/avatar.model';

/**
 * Return user by id
 * @param req
 * @param res
 * @returns {*}
 */
async function getUser(req, res) {
  try {
    const user = await Account.findById(req.params.id).populate('avatar');

    if (user) {
      // Bad construction
      let plainUser = {
        id: user._id,
        ...user.toObject(),
      }

      delete plainUser._id;
      delete plainUser.password;
      delete plainUser.__v;
      delete plainUser.avatar._id;
      delete plainUser.avatar.__v;

      return res.send(plainUser);
    }
    const error = new APIError('User not exist!', httpStatus[400]);
    return res.send(error);
  }
  catch(e) {
    const error = new APIError('Server error!', httpStatus[400]);
    return res.send(error);
  }
}

export default { getUser };
