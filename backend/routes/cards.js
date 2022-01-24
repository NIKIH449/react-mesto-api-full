const cardsRouter = require('express').Router();
const {
  createCard,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { cardValidation, idValidation } = require('../middlewares/errors');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', cardValidation, createCard);
cardsRouter.delete('/cards/:_id', idValidation, deleteCardById);
cardsRouter.put('/cards/:_id/likes', idValidation, likeCard);
cardsRouter.delete('/cards/:_id/likes', idValidation, dislikeCard);

module.exports = cardsRouter;
