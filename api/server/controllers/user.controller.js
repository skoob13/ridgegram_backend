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
      return res.send({
        id: user._id,
        cellphone: user.cellphone,
        fullname: user.fullname,
        gender: user.gender,
        avatar: {
          url: user.avatar.url,
          likesCount: user.avatar.likesCount,
          description: user.avatar.description
        }
      });
    }
    const error = new APIError('User not exist!', httpStatus[400]);
    return res.send(error);
  }
  catch(e) {
    const error = new APIError('Server error!', httpStatus[400]);
    return res.send(error);
  }
}

/**
 * Return user list by gender
 * @param req
 * @param res
 * @returns {*}
 */
async function getUserList(req, res) {
  const gender = req.user.gender === 'female' ? 'male' : 'female';
  const offset = req.query.offset ? req.query.offset : 0;

  try {
    let users = await Account.find({ gender: gender }).populate('avatar').skip(offset).limit(50);
    let newUsers = [];
    users.forEach((user) => {
      newUsers.push({
        id: user._id,
        cellphone: user.cellphone,
        fullname: user.fullname,
        gender: user.gender,
        avatar: {
          url: user.avatar.url,
          likesCount: user.avatar.likesCount,
          description: user.avatar.description
        }
      });
    });
    return res.send(newUsers);
  }
  catch(e) {
    const error = new APIError('Server error!', httpStatus[400]);
    return res.send(error);
  }
}

/**
 * Like user's avatar
 * @param req
 * @param res
 * @returns {*}
 */
async function likeUser(req, res) {
  const id = req.body.id;

  try {
    const user = await Account.findById(id).populate('avatar');
    const avatar = await Avatar.like(user.avatar._id);
    res.send({
      url: avatar.url,
      likesCount: avatar.likesCount,
      description: avatar.description
    });
  }
  catch(e) {
    console.log(e);
    const error = new APIError('Server error!', httpStatus[400]);
    return res.send(error);
  }
}

export default { getUser, getUserList, likeUser };
