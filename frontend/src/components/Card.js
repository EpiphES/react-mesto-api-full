import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  
  const isOwn = (card.owner._id === currentUser._id || card.owner === currentUser._id);
  const cardDeleteButtonClassName = `elements__delete${
    isOwn ? "" : " elements__delete_disabled"
  }`;

  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `elements__like-button${
    isLiked ? " elements__like-button_active" : ""
  }`;

  function handleClick() {
    onCardClick({ src: card.link, title: card.name });
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <div className="elements__item">
      <img
        src={card.link}
        alt={card.name}
        className="elements__photo"
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="удалить"
        onClick={handleDeleteClick} />
      <div className="elements__caption">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-group">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="нравится"
            onClick={handleLikeClick} />
          <span className="elements__like-count">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
