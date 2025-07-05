import { apiMethodsEnum, apiServer } from "./api";

function createCard(cardInfo, deleteCard, clickOnImage, likeHandler, userId) {    
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeCounter = cardElement.querySelector('#like-counter');

    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardLikeCounter.textContent = cardInfo.likes?.length ?? 0

    // находим кнопку удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardInfo, cardElement, userId));

    if (cardInfo.owner._id !== userId)
      cardElement.removeChild(deleteButton);

    //нажатие на картинку
    cardImage.addEventListener('click', () => clickOnImage(cardElement));

    //лайк
    const likeBtn = cardElement.querySelector('.card__like-button');

    if (cardInfo.likes.some(el => el._id === userId))
      likeBtn.classList.toggle('card__like-button_is-active');

    likeBtn.addEventListener('click', () => likeHandler(cardInfo, cardElement, likeBtn));
    return cardElement;
}

async function deleteCard(cardInfo, cardElement, userId) {
  if (cardInfo.owner._id === userId) {
    await apiServer(apiMethodsEnum.delete, 'cards', null, cardInfo._id);
    cardElement.remove();
  }
}

async function likeHandler(cardInfo, cardElement, likeBtn) {
  const cardLikeCounter = cardElement.querySelector('#like-counter');
  if (likeBtn.classList.contains('card__like-button_is-active')) { 
    const { likes } = await apiServer(apiMethodsEnum.delete, 'cards/likes', null, cardInfo._id);
    cardLikeCounter.textContent = likes.length;
  } else {
    const { likes } = await apiServer(apiMethodsEnum.put, 'cards/likes', null, cardInfo._id);
    cardLikeCounter.textContent = likes.length;
  }
  likeBtn.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeHandler};