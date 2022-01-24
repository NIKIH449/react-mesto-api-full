const { celebrate, Joi } = require('celebrate');

const regEx = /(http:\/\/|https:\/\/)(www)*.([\w]{3})[a-z0-9\-._~:?#[\]@!$&'()*+,;=]+#*[^а-я]/;

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
});

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regEx),
  }),
});

const avatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regEx),
  }),
});

const userInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});
const idValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});
const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
    avatar: Joi.string().pattern(regEx),
  }),
});

module.exports = {
  idValidation,
  cardValidation,
  loginValidation,
  createUserValidation,
  userInfoValidation,
  avatarValidation,
};
