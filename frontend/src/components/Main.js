import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  const cardsElements = cards.map((item) => {
    return (
      <li key={item._id}>
        <Card
          card={item}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />
      </li>
    );
  });

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar"
          onClick={onEditAvatar}
          style={{
            backgroundImage: `url(${currentUser?.avatar})`,
          }} 
        />
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="редактировать"
              onClick={onEditProfile} 
            />
          </div>
          <p className="profile__about">{currentUser?.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="добавить"
          onClick={onAddPlace} 
        />
      </section>

      <ul className="elements">{cardsElements.reverse()}</ul>
    </main>
  );
}

export default Main;
