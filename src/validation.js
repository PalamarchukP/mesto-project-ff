//сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // inputElement.classList.add('popup__input_type_error');

    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;

//   errorElement.classList.add('popup__input-error_active');

    errorElement.classList.add(validationConfig.errorClass);
};

//скрытие ошибки
const hideInputError = (formElement, inputElement) => {
    // console.log('1231313122', inputElement)
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    // inputElement.classList.remove(validationConfig.inputErrorClass);
    // errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

//прокерка валидности
const checkInputValidity = (formElement, inputElement, validationConfig) => {
    const validityState = inputElement.validity
    if (validityState.patternMismatch) { 
        // console.log(inputElement.dataset , )
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else { 
        inputElement.setCustomValidity('')
    }
    if (!validityState.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};

//обработчик событий
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    // console.log('inputElementChecked', inputElement)
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

//включение валидности для всех форм
const enableValidation = (validationConfig) => {
    // console.log("Валидация")
    // console.log(validationConfig)
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    // console.log(formList)
    formList.forEach((fieldSet) => {
      setEventListeners(fieldSet, validationConfig);
    }); 
};

//очистка ошибки валидации
//параметры : DOM-элемент формы, для которой очищаются ошибки валидации и объект с настройками валидации
// Используйте функцию clearValidation при заполнении формы профиля во время её открытия 
// и при очистке формы добавления карточки.

const clearValidation = (formElement , validationConfig) => {
    console.log('Очистка поля')

    //что тут писать
    // inputList.forEach((inputElement) => {
    //     hideInputError(validationConfig, formElement, inputElement);
    // })
    // toggleButtonState(inputList, buttonElement);
}

//проверка на невальдные поля
const hasInvalidInput = (inputList) => {
    // console.log('has invalid', inputList)

    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

//переподключение состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
    // console.log('toggle state', inputList, buttonElement)
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button_disabled');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_disabled');
    };
};

console.log("и мы даже зашли в файл")

export{enableValidation, clearValidation}