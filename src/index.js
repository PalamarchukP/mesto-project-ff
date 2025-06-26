import './pages/index.css';
<<<<<<< HEAD
import { initialCards } from './components/cards';

const cardsList = document.querySelector('.places__list');

function createCard(cardInfo, deleteCard){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    cardElement.querySelector('.card__image').src = cardInfo.link;
    cardElement.querySelector('.card__image').alt = cardInfo.name;

    // находим кнопку удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    return cardElement;
}

function deleteCard(cardElement){
    cardElement.remove();
}


initialCards.forEach((item) => {
    const createdCard = createCard(item, deleteCard);
    cardsList.append(createdCard);
})

// import {initialCards} from './components/cards.js';
//
//import {initialCards, createdCard, renderCard, deleteCard} from './components/cards.js';
//
//import {openPopup, closePopup, closeByClick, closeByEsc} from './components/modal.js'
//



// // теперь картинки можно импортировать,
// // вебпак добавит в переменные правильные пути
// import jordanImage from './images/jordan.jpg';
// import jamesImage from './images/james.jpg';
// import bryantImage from './images/bryant.jpg';

// const whoIsTheGoat = [
//   // меняем исходные пути на переменные
//   { name: 'Michael Jordan', link: jordanImage },
//   { name: 'Lebron James', link: jamesImage },
//   { name: 'Kobe Bryant', link: bryantImage },
// ];
// Теперь, если попробовать собрать проект командой npm run build, в папке dist появятся используемые изображения:



//Альтернативный способ указать путь к изображению — заполнить атрибут src в теге img. 
// Допустим, в шапке сайта может быть логотип. 
// Логотип вставлен с помощью тега img и обращается в атрибуте src к пути ./images/logo.png. 
// Если вы запустите проект на локальном сервере, изображение не загрузится. 
// Дело в том, что «Вебпак» уже работает с хешированными версиями файлов — найти logo.png не получится. 

//потребуется изменить привычный путь до изображения на такой:
//<img src="<%=require('./images/logo.png')%>" alt="Логотип"> 

