function animatePopup() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(el => el.classList.add('popup_is-animated'));
}

function openPopup(popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('click', closeByClick);
    document.addEventListener('keydown', closeByKey);
}

function closePopup(){
    const popup = document.querySelector('.popup_is-opened');
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('click', closeByClick);
    document.removeEventListener('keydown', closeByKey);
}

function closeByClick(evt){
    if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')){//?
        closePopup();
    }
}
function closeByKey(evt){
    if(evt.key === "Escape"){
        closePopup();
    }
}

export {openPopup, closePopup, animatePopup}