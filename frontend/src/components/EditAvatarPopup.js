import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isOpen={props.isOpen}
      name="change-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <div className="popup__input-container">
        <input
          id="avatar-input"
          type="url"
          name="avatar"
          className="popup__input popup__input_change-avatar"
          placeholder="Ссылка на аватар"
          required
          ref={avatarRef}
        />
        <span className="popup__input-error avatar-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
