import { openPopup } from "./modal";

function createCard(cardInfo, deleteCard, clickOnImage, likeHandler){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image')

    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;

    // находим кнопку удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    //нажатие на картинку
    cardImage.addEventListener('click', () => clickOnImage(cardElement))

    //лайк
    const likeBtn = cardElement.querySelector('.card__like-button');
    likeBtn.addEventListener('click', () => likeHandler(likeBtn))

    return cardElement;
}

function deleteCard(cardElement){
  cardElement.remove();
}

function likeHandler(likeBtn){
  likeBtn.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeHandler };