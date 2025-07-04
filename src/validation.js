const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
    const validityState = inputElement.validity;
    if (validityState.patternMismatch) { 
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else { 
        inputElement.setCustomValidity('')
    }
    if (!validityState.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement);
        });
    });
}; 

const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((fieldSet) => {
      setEventListeners(fieldSet, validationConfig);
    }); 
};

const clearValidation = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    })
    toggleButtonState(inputList, buttonElement);
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button_disabled');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_disabled');
    };
};

export{enableValidation, clearValidation}