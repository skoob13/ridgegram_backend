import Joi from 'joi';

export default {
  // POST /api/signin
  signin: {
    body: {
      cellphone: Joi.string().min(1).required(),
      password: Joi.string().required()
    }
  },

  // POST /api/signup
  signup: {
    body: {
      cellphone: Joi.string().min(1).required(),
      password: Joi.string().required(),
      fullname: Joi.string().min(1).required(),
      gender: Joi.string().required(),
      description: Joi.string(),
      avatarUrl: Joi.string().uri()
    }
  },
};
