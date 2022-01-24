import React from 'react';
import PopupWithForm from './PopupWithForm';


function InfoTooltip(props) {
  return (
    <PopupWithForm onClose={props.onClose} isOpen={props.isOpen}>
      <img className="infoTooltip__image" alt="Уведомление" src={props.image} />
      <p className="infoTooltip__paragraph">{props.title}</p>
    </PopupWithForm>
  );
}

export default InfoTooltip;
