import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, deleteCard, clickOnImage, likeHandler } from "./components/card";
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

animatePopup()

//открытие окна редактировния
profileEditBtn.addEventListener('click',  ()=>{openPopup(popupEdit)});

//открытие окна добавления
profileAddBtn.addEventListener('click', ()=>{openPopup(popupAdd)});

//Редактирование имени и информации о себе
const formElement = popupEdit.querySelector('.popup__form');

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const titleName = document.querySelector('.profile__title');
    const jobDescription = document.querySelector('.profile__description');

    titleName.innerHTML = nameValue;
    jobDescription.innerHTML  = jobValue;

    closePopup();

    nameInput.value = '';
    jobInput.value  = '';
}

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', handleFormSubmit);

//добавление новых карточек
const formElementAdd = popupAdd.querySelector('.popup__form');

const placeNameInput = formElementAdd.querySelector('.popup__input_type_card-name');
const placeUrlInput = formElementAdd.querySelector('.popup__input_type_url');

function handleFormAddCard(evt){
    evt.preventDefault();

    const placeName = placeNameInput.value;
    const placeUrl = placeUrlInput.value;
    
    const item = { name: placeName, link: placeUrl }
    const createdCard = createCard(item, deleteCard, clickOnImage, likeHandler)
    cardsList.insertBefore(createdCard, cardsList.firstChild);
    closePopup();

    placeNameInput.value = '';
    placeUrlInput.value  = '';

}

formElementAdd.addEventListener('submit', handleFormAddCard);
