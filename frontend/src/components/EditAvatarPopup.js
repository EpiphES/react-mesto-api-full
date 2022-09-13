import { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarInput = useRef();
  const [isInputValid, setIsInputValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatarInput.current.value });
  }

  function checkValidity(evt) {
    if (evt.target.validity.valid) {
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
      setErrorMessage(evt.target.validationMessage);
    }
  }

  useEffect(() => {
    avatarInput.current.value = "";
    setIsInputValid(true);
    setErrorMessage("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      acceptMessage="Сохранить"
      onClose={onClose}
      isOpened={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isInputValid && avatarInput.current?.value}>
      <input
        className={`popup__input popup__input_type_avatar-link ${
          !isInputValid && "popup__input_invalid"
        }`}
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        id="avatar-input"
        required
        ref={avatarInput}
        onChange={checkValidity}
      />
      <span
        className={`popup__input-error avatar-input-error ${
          !isInputValid && "popup__input-error_visible"
        }`}>
        {errorMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
