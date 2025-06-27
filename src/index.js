import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, deleteCard, likeHandler } from "./components/card";
import { openPopup, closePopup, animatePopup } from './components/modal';

const cardsList = document.querySelector('.places__list');

initialCards.forEach((item) => {
    const createdCard = createCard(item, deleteCard, clickOnImage, likeHandler);
    cardsList.append(createdCard);
})

const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');

const titleName = document.querySelector('.profile__title');
const jobDescription = document.querySelector('.profile__description');

const formProfile = popupEdit.querySelector('.popup__form');
const formElementAdd = popupAdd.querySelector('.popup__form');

const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const placeNameInput = formElementAdd.querySelector('.popup__input_type_card-name');
const placeUrlInput = formElementAdd.querySelector('.popup__input_type_url');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

animatePopup()

//открытие окна редактировния
profileEditBtn.addEventListener('click',  ()=>{
    nameInput.value = titleName.textContent
    jobInput.value = jobDescription.textContent
    openPopup(popupEdit)
});

//открытие окна добавления
profileAddBtn.addEventListener('click', ()=>{openPopup(popupAdd)});

//Редактирование имени и информации о себе
function handleFormEditProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    titleName.textContent = nameValue;
    jobDescription.textContent  = jobValue;

    closePopup();
}

// Прикрепляем обработчик к форме:
formProfile.addEventListener('submit', handleFormEditProfile);

//добавление новых карточек
function handleFormAddCard(evt){
    evt.preventDefault();

    const placeName = placeNameInput.value;
    const placeUrl = placeUrlInput.value;
    
    const item = { name: placeName, link: placeUrl }
    const createdCard = createCard(item, deleteCard, clickOnImage, likeHandler)
    cardsList.insertBefore(createdCard, cardsList.firstChild);
    closePopup();

    evt.target.reset();
}

formElementAdd.addEventListener('submit', handleFormAddCard);

//клик на картинку
function clickOnImage(cardElement) {
    const cardImage = cardElement.querySelector('.card__image');
    const { src, alt } = cardImage;
    popupImage.src = src;
    popupImage.alt = alt;
    popupCaption.textContent = alt;
    console.log(src, alt);
    openPopup(popupTypeImage)
}
