const jwt = require('jsonwebtoken');
const WrongLoginData = require('../errors/WrongLoginData');

const auth = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;
  try {
    payload = jwt.verify(
      req.cookies.token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    throw new WrongLoginData('Требуется авторизация.');
  }
  req.user = payload;
  next();
};

module.exports = auth;
