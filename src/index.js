import './pages/index.css';
import {initialCards} from './scripts/cards.js';
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


// index.js
// import './styles/index.css'; // добавьте импорт главного файла стилей 