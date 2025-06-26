import { openPopup } from "./modal";

function createCard(cardInfo, deleteCard, clickOnImage, likeHandler){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    cardElement.querySelector('.card__image').src = cardInfo.link;
    cardElement.querySelector('.card__image').alt = cardInfo.name;

    // находим кнопку удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    //нажатие на картинку
    const imageBtn = cardElement.querySelector('.card__image');
    imageBtn.addEventListener('click', () => clickOnImage(cardElement))

    //лайк
    const likeBtn = cardElement.querySelector('.card__like-button');
    likeBtn.addEventListener('click', () => likeHandler(likeBtn))

    return cardElement;
}

function deleteCard(cardElement){
  cardElement.remove();
}

function clickOnImage(cardElement) {
  const popup = document.querySelector('.popup_type_image');
  
  const cardImage = cardElement.querySelector('.card__image');
  const popupImage = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');

  const { src, alt } = cardImage;
  popupImage.src = src;
  popupImage.alt = alt;
  popupCaption.innerHTML = alt;
  cardElement.addEventListener('click', ()=>{openPopup(popup)});  
}

function likeHandler(likeBtn){
  likeBtn.classList.toggle('card__like-button_is-active')
}

export { createCard, deleteCard, clickOnImage, likeHandler }