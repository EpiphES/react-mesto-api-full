import { useContext, useEffect, useMemo } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const initialFormValues = useMemo(
    () => ({
      name: {
        value: currentUser?.name,
        error: "",
        isValid: true,
      },
      about: {
        value: currentUser?.about,
        error: "",
        isValid: true,
      },
    }),[currentUser]);

  const {values, setValues, handleChange} = useForm(initialFormValues);

  useEffect(() => {
    setValues(initialFormValues)
  }, [isOpen, setValues, initialFormValues]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: values.name.value,
      about: values.about.value,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      acceptMessage="Сохранить"
      onClose={onClose}
      isOpened={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={values.name.isValid && values.about.isValid}>
      <input
        className={`popup__input popup__input_type_name ${
          !values.name.isValid && "popup__input_invalid"
        }`}
        type="text"
        name="name"
        id="name-input"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChange}
        value={values.name.value || ""}
      />
      <span
        className={`popup__input-error name-input-error ${
          !values.name.isValid && "popup__input-error_visible"
        }`}>
        {values.name.error}
      </span>
      <input
        className={`popup__input popup__input_type_about ${
          !values.about.isValid && "popup__input_invalid"
        }`}
        type="text"
        name="about"
        id="about-input"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        onChange={handleChange}
        value={values.about.value || ""}
      />
      <span
        className={`popup__input-error about-input-error ${
          !values.about.isValid && "popup__input-error_visible"
        }`}>
        {values.about.error}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
