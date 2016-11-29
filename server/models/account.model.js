import Promise from 'bluebird';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

/**
 * Account Schema
 */
const AccountSchema = new mongoose.Schema({
  // Cause task doesn't have email, I will use cellphone as unique id for registration
  cellphone: {
    type: String,
    required: true,
    index: { unique: true },
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['female', 'male'],
    required: true,
    trim: true,
  },
  avatar: {
    type: mongoose.Schema.ObjectId,
    ref: 'Avatar',
  }
});

/**
 * Prehook for schema's .save() method
 * Generating salt everytime when password changes
 */
AccountSchema.pre('save', function(next) {
  let account = this;

  // proceed further only if the password is modified or the account is new
  if (!account.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(account.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // replace a password string with hash value
      account.password = hash;

      return next();
    });
  });
});

/**
 * Comparing password method for auth
 */
AccountSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, callback);
}

/**
 * Statics
 */
AccountSchema.statics = {
  /**
   * Get account by cellphone
   * @param {string} cellphone - The cellphone of account.
   * @returns {Promise<Account, APIError>}
   */
  getByCellphone(cellphone) {
    return this.findOne({ cellphone: cellphone })
      .populate('avatar')
      .exec()
      .then((account) => {
        if (account) {
          return account;
        }
        const err = new APIError('No such account exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
};


/**
 * @typedef Account
 */
export default mongoose.model('Account', AccountSchema);
