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

const cardsList = document.querySelector('.places__list');

initialCards.forEach((item) => {
    const createdCard = createCard(item, deleteCard);
    cardsList.append(createdCard);
})