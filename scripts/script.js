'use strict';

const database = [];

const telo= document.querySelector('body'),
      modalAdd = document.querySelector('.modal__add'), //модальное окно
      addAd = document.querySelector('.add__ad'), //кнопка
      modalBtnSubmit = document.querySelector('.modal__btn-submit'), //кнопка отправки
      modalSubmit = document.querySelector('.modal__submit'),//поля отправки
      card = document.querySelector('.card'),
      catItem = document.querySelector('.modal__item'),
      cat = document.querySelector('.catalog'),
      mbWarning = document.querySelector('.modal__btn-warning');


const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem => {
        return elem.tagName !== 'BUTTON' && elem.type !== 'submit'
    });


addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');  //отслеживаем событие вызова модального окна и удаляем скрытие
    modalBtnSubmit.disabled = true; //блокировка кнопки отправки
});


//перебор значений и запись

modalSubmit.addEventListener('submit', event =>{
    event.preventDefault();
    const itemObj = {};
    for (const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;
    }
    database.push(itemObj);
    modalSubmit.reset();
});


//общая функция закрытия

function closeModal() {
    // функция на закрытие по ESC
    telo.addEventListener ('keydown', (evt) => {
        if(evt.keyCode == 27) {
            modalAdd.classList.add('hide');
            catItem.classList.add('hide');
        }
    });
    modalAdd.addEventListener('click', (event) => {
        const target = event.target;
        if(target.closest('.modal__close') ||
        target === modalAdd) {
        modalAdd.classList.add('hide');// отслеживаем события и навешиваем hide
        modalSubmit.reset(); // перезагрузка формы
       }
    });
    //открытие и закрытие карточки

    cat.addEventListener('click', ()=> {
        catItem.classList.remove('hide');
        });

    telo.addEventListener('click', (event) => {
        const target = event.target;
        if(target.closest('.modal__close') ||
        target === catItem) {
        catItem.classList.add('hide');}
    });
    // перезагрузка формы

    modalAdd.addEventListener('click', (event) => {
        const target = event.target;
        if(target.closest('.modal__close') ||
        target === modalAdd) {
        modalSubmit.reset(); // перезагрузка формы
        }

    });

//проверка внутри формы и разблокировка кнопки

    modalSubmit.addEventListener('input', () => {
        const validForm = elementsModalSubmit.every(elem => elem.value);
        modalBtnSubmit.disabled = !validForm;
        mbWarning.style.display = validForm ? 'none' : '';
    });
    modalBtnSubmit.addEventListener('click', () => {
            modalAdd.classList.remove('hide');  //отслеживаем событие вызова модального окна и удаляем скрытие
            modalBtnSubmit.disabled = true; //блокировка кнопки отправки
            modalSubmit.reset(); // перезагрузка формы
            mbWarning.style.display = '';
    });
};
closeModal();





