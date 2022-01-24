import React, { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__button-remove ${
    isOwn ? 'element__button-remove' : 'element__button-remove_disable'
  }`;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__button-like ${
    isLiked ? 'element__button-like_active' : 'element__button-like'
  }`;

  return (
    <li className="element">
      <button
        onClick={handleCardDelete}
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="удалить"
      ></button>
      <img
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
        className="element__picture"
      />
      <div className="element__container">
        <h2 className="element__place-name">{props.card.name}</h2>
        <div>
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            aria-label="Лайк"
            type="button"
          ></button>
          <div className="element__likes">
            {props.card.likes.length}
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
