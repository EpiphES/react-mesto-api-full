import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ card, onClose, onConfirmDeletion, isLoading }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onConfirmDeletion(card);
  }
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      acceptMessage="Да"
      onClose={onClose}
      isOpened={card}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={true}
    />
  );
}

export default ConfirmationPopup;
