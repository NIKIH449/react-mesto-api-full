import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handlePlaceName(e) {
    setName(e.target.value);
  }

  function handlePlaceLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isOpen={props.isOpen}
      name="add-picture"
      title="Новое место"
      buttonText="Создать"
    >
      <div className="popup__input-container">
        <input
          id="place-input"
          type="text"
          name="name"
          className="popup__input popup__input_type_place"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handlePlaceName}
        />
        <span className="popup__input-error place-input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          id="url-input"
          type="url"
          name="link"
          className="popup__input popup__input_type_picture"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handlePlaceLink}
        />
        <span className="popup__input-error url-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
