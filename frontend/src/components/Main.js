import React, { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import Card from './Card';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар пользователя"
            />
            <button
              onClick={props.onEditAvatar}
              className="profile__button profile__button_type_avatar"
              aria-label="Сменить аватар"
              type="button"
            ></button>
          </div>
          <div className="profile__profile-info">
            <div className="profile__main-info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={props.onEditProfile}
                className="profile__button profile__button_type_edit"
                aria-label="Редактировать"
                type="button"
              ></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__button profile__button_type_plus"
          aria-label="Добавить"
          type="button"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.card.map((item) => (
            <Card
              key={item._id}
              onCardDelete={props.onCardDelete}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              card={item}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
