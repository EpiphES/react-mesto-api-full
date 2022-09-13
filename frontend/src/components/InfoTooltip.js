function InfoTooltip({message, onClose}) {
  return (
    <div className={`popup popup_type_infotool ${message && "popup_opened"}`}>
      <div className="popup__content popup__content_place_infotool">
        <button
          className="popup__close-button"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
        <img src={message?.icon} alt={message?.text} className="popup__icon" />
        <h2 className="popup__title popup__title_place_tooltip">
          {message?.text}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;