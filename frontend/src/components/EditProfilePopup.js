import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isOpen={props.isOpen}
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
    >
      <div className="popup__input-container">
        <input
          id="name-input"
          type="text"
          name="username"
          className="popup__input popup__input_type_name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleChangeName}
        />
        <span className="popup__input-error name-input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          id="desription-input"
          type="text"
          name="description"
          className="popup__input popup__input_type_desription"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={handleChangeDescription}
        />
        <span className="popup__input-error desription-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
