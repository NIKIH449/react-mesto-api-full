const Card = require('../models/card');
const Forbidden = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFoundError');
const WrongData = require('../errors/WrongData');
const DefaultError = require('../errors/DefaultError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => {
      throw new DefaultError('Произошла ошибка');
    })

    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((cards) => {
      if (req.user._id === cards.owner.toString()) {
        Card.findByIdAndRemove(req.params._id).then((card) => {
          res.send({ data: card });
        });
      } else {
        throw new Forbidden('Нельзя удалять чужую карочку');
      }
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new WrongData('Переданы неверные данные.');
      } else {
        throw new DefaultError('Произошла ошибка');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: owner } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

module.exports = {
  createCard,
  deleteCardById,
  getCards,
  likeCard,
  dislikeCard,
};
