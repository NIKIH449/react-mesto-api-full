const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const NotFoundError = require('../errors/NotFoundError');
const WrongData = require('../errors/WrongData');
const DefaultError = require('../errors/DefaultError');
const SameEmail = require('../errors/SameEmail');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => {
      throw new DefaultError('Произошла ошибка');
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ user }))
    .catch(() => {
      throw new NotFoundError('Данные пользователя не найдены.');
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res
        .cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'None',
          secure: true,
        })
        .send({ token });
    })
    .catch(next);
};

const getUsersById = (req, res, next) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Данные пользователя не найдены.');
      } else {
        res.send({
          data: {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            _id: user._id,
          },
        });
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.status(200).send({
      data: {
        name,
        about,
        avatar,
        email,
      },
    }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        throw new SameEmail('Такой пользователь уже существует.');
      } else if (err.name === 'ValidationError') {
        throw new WrongData('Переданы некорректные данные.');
      } else {
        throw new DefaultError('Произошла ошибка');
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Данные пользователя не найдены.');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new WrongData('Переданы некорректные данные.');
      } else {
        throw new DefaultError('Произошла ошибка');
      }
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const owner = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Произошла ошибка');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new NotFoundError('Данные пользователя не найдены.');
      } else {
        throw new DefaultError('Произошла ошибка');
      }
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUsers,
  getUsersById,
  updateUser,
  updateAvatar,
  login,
  getUser,
};
