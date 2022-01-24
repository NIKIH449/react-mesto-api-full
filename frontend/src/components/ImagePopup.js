import React from 'react';

function ImagePopup(props) {
  return (
    <div
      onClick={props.onClose}
      className={`popup ${
        props.card ? 'popup_opened' : ''
      }  popup_type_picture`}
    >
      <div className="popup__picture" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__button-close popup__button-close_type_picture"
        ></button>
        <img
          className="popup__image"
          src={`${props.card ? props.card.link : '#'}`}
          alt={`${props.card ? props.card.name : ''}`}
        />
        <p className="popup__picture-description">{`${
          props.card ? props.card.name : ''
        }`}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
