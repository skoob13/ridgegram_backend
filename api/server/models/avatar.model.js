import Promise from 'bluebird';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import mongoose from 'mongoose';

/**
 * Avatar Schema
 */
const AvatarSchema = new mongoose.Schema({
  description: {
    type: String,
    default: '',
    trim: true,
  },
  likesCount: {
    type: Number,
    default: 0,
    min: 0,
    trim: true,
  },
  url: {
    type: String,
    default: '',
    trim: true,
  },
});

/**
 * Static method for inc likes count
 */
AvatarSchema.statics = {
  like(id) {
    return this.findOne({ _id: id })
      .exec()
      .then((avatar) => {
        if (avatar) {
          avatar.likesCount++;
          return avatar.save().then((savedAccount) => {
            if (savedAccount) return savedAccount;
            const err = new APIError('Saving error!', httpStatus.NOT_FOUND);
            return Promise.reject(err);
          });
          return avatar;
        }
        const err = new APIError('No such avatar exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

};

/**
 * @typedef Avatar
 */
export default mongoose.model('Avatar', AvatarSchema);
