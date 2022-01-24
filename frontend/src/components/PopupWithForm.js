import React, { useEffect } from 'react';

function PopupWithForm(props) {
  useEffect(() => {
    function onEscClose(e) {
      if (e.key === 'Escape') {
        props.onClose();
      }
    }
    window.addEventListener('keydown', onEscClose);
    return () => window.removeEventListener('keydown', onEscClose);
  }, [props]);
  return (
    <div
      className={`popup ${props.isOpen ? 'popup_opened' : ''} popup_type_${
        props.name
      }`}
      onClick={props.onClose}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <button
            type="button"
            onClick={props.onClose}
            className={`popup__button-close popup__button-close_type_${props.name}`}
          ></button>
          {props.title && <h2 className="popup__title">{props.title}</h2>}
          {props.children}
          {props.buttonText && (
            <button
              className={`popup__button-save popup__button-save_type_${props.name}`}
              type="submit"
            >
              {props.buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
