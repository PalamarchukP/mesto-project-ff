import './pages/index.css';
import { createCard, deleteCard, likeHandler } from "./components/card";
import { openPopup, closePopup, animatePopup } from './components/modal';
import { enableValidation, clearValidation } from './validation';
import { apiMethodsEnum, apiServer } from './api.js';

const cardsList = document.querySelector('.places__list');
let user;

//Пользователь
const nameElement = document.querySelector('.profile__title');
const aboutElement = document.querySelector('.profile__description');
const avatarElement = document.querySelector('.profile__image');

const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupAvatar = document.querySelector('.popup_type_avatar');

const titleName = document.querySelector('.profile__title');
const jobDescription = document.querySelector('.profile__description');

const formProfile = popupEdit.querySelector('.popup__form');
const formElementAdd = popupAdd.querySelector('.popup__form');
const formEditAvatar = popupAvatar.querySelector('.popup__form');

const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const placeNameInput = formElementAdd.querySelector('.popup__input_type_card-name');
const placeUrlInput = formElementAdd.querySelector('.popup__input_type_url');
const avatarUrlInput = formEditAvatar.querySelector('.popup__input_type_url');

const editProfileSaveButton = formProfile.querySelector('.popup__button')
const elementAddSaveButton = formElementAdd.querySelector('.popup__button')
const editAvatarSaveButton = formEditAvatar.querySelector('.popup__button')

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    inputErrorActive: 'popup__input-error_active',
    errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);
animatePopup();

//открытие окна редактировния
profileEditBtn.addEventListener('click',  () => {
    nameInput.value = titleName.textContent;
    jobInput.value = jobDescription.textContent;
    openPopup(popupEdit);
    clearValidation(formProfile, validationConfig);
});

//открытие окна добавления
profileAddBtn.addEventListener('click', () => {
    openPopup(popupAdd);
    formElementAdd.reset();
    clearValidation(formElementAdd, validationConfig);
});

avatarElement.addEventListener('click', () => {
    openPopup(popupAvatar);
    formEditAvatar.reset();
    clearValidation(formEditAvatar, validationConfig);
})


//Редактирование имени и информации о себе
async function handleFormEditProfile(evt) {
    evt.preventDefault();
    isLoading(true, editProfileSaveButton);

    try { 
        const nameValue = nameInput.value;
        const jobValue = jobInput.value;

        const body = { name: nameValue, about: jobValue }
        const userData = await apiServer(apiMethodsEnum.patch, 'users/me', body);

        titleName.textContent = userData.name;
        jobDescription.textContent  = userData.about;

        closePopup();
    } catch (err) {
        console.error(err)
    } finally {
        isLoading(false, editProfileSaveButton);
    }
}

// Прикрепляем обработчик к форме:
formProfile.addEventListener('submit', handleFormEditProfile);

//добавление новых карточек
async function handleFormAddCard(evt){
    evt.preventDefault();
    isLoading(true, elementAddSaveButton);

    try {
        const placeName = placeNameInput.value;
        const placeUrl = placeUrlInput.value;

        const body = { name: placeName, link: placeUrl };
        const item = await apiServer(apiMethodsEnum.post, 'cards', body);

        const userId = user._id;
        const createdCard = createCard(item, deleteCard, clickOnImage, likeHandler, userId);
        cardsList.insertBefore(createdCard, cardsList.firstChild);
        closePopup();   
        evt.target.reset();
    } catch (err) {
        console.error(err)
    } finally {
        isLoading(true, elementAddSaveButton)
    }
}

formElementAdd.addEventListener('submit', handleFormAddCard);

async function handleFormEditAvatar(evt) {
    evt.preventDefault();
    isLoading(true, editAvatarSaveButton);

    try {
        const avatarUrl = avatarUrlInput.value;
        const body = { avatar: avatarUrl };
        const item = await apiServer(apiMethodsEnum.patch, 'users/me/avatar', body);
        
        avatarElement.style.backgroundImage = `url(${item.avatar})`;
        closePopup();
        evt.target.reset();
    } catch (err) {
        console.error(err)
    } finally {
        isLoading(false, editAvatarSaveButton);
    }
}

formEditAvatar.addEventListener('submit', handleFormEditAvatar);

function isLoading(loading, buttonElement) {
    if (loading) {
        buttonElement.textContent = 'Сохранение...';
    } else {
        buttonElement.textContent = 'Сохранить';
    }
}

//клик на картинку
function clickOnImage(cardElement) {
    const cardImage = cardElement.querySelector('.card__image');
    const { src, alt } = cardImage;
    popupImage.src = src;
    popupImage.alt = alt;
    popupCaption.textContent = alt;
    openPopup(popupTypeImage);
}

Promise.all([
    apiServer(apiMethodsEnum.get, 'users/me'), 
    apiServer(apiMethodsEnum.get, 'cards')
])
    .then(([userData, cards]) => {
        user = userData
        cards.forEach(function(item) {
            const createdCard = createCard(item, deleteCard, clickOnImage, likeHandler, user._id);
            cardsList.append(createdCard);
        });
    
    nameElement.textContent = user.name;
    aboutElement.textContent = user.about;
    avatarElement.style.backgroundImage = `url(${user.avatar})`;
    })
    .catch((err) => {
        console.error(err);
    })