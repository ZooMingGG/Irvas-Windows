'use strict';
import firebaseConfig from './modules/firebase-config';
import imagesPopup from './modules/images-popup';
import countDown from './modules/count-down';
import scrollTop from './modules/scroll';
import tabs from './modules/tabs';

document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.overlay');
    const headerPopupEngineerBtn = document.querySelector('.header-popup-btn');
    const callLink = document.querySelector('.call-link');
    const questionsLink = document.querySelector('.questions-link');
    const showCalcModalButton = document.querySelectorAll('.calc-price-button');
    const popupEngineer = document.querySelector('#popup-engineer');
    const popupCall = document.querySelector('#popup-call');
    const popupCalc = document.querySelector('#popup-calc');
    const popupCalcEnd = document.querySelector('.popup-calc-end');
    const popupCalcProfileCloseBtn = document.querySelector('.popup-calc-profile-close');
    const calcProfileModal = document.querySelector('#calc-profile-modal');
    const closeEngineerModalBtn = document.querySelector('.popup-engineer-close');
    const closeCallModalBtn = document.querySelector('.popup-call-close');
    const closeCalcModalBtn = document.querySelector('.popup-calc-close');
    const modalCalcTabsIcons = document.querySelectorAll('.balcon-icons-img > img');
    const endCalcModalCloseBtn = document.querySelector('.calc-end-close-btn');
    const customCheckboxList = document.querySelectorAll('.checkbox-custom');
    const widthInput = document.querySelector('#width');
    const heightInput = document.querySelector('#height');
    const deadline = '2020-08-29';

    firebase.initializeApp(firebaseConfig);

/*Function for showing and hiding modal windows*/
    function showModals(trigger, modal, closeBtn) {
        function showModal() {
            modalCalcTabsIcons[0].classList.add('active');
            overlay.classList.add('overlay-visible');
            modal.classList.add('modal-visible');
            document.body.style.overflow = 'hidden';

            modal.addEventListener('click', function(event) {
                if (modal !== popupCalc) {
                    let form = event.target.closest('form');

                    if (!form) {
                        overlay.classList.remove('overlay-visible');
                        modal.classList.remove('modal-visible');
                        document.body.style.overflow = '';
                    }
                }
            });
            
            closeBtn.addEventListener('click', function() {
                overlay.classList.remove('overlay-visible');
                modal.classList.remove('modal-visible');
                document.body.style.overflow = '';
                modalCalcTabsIcons.forEach( (item) => {
                    item.classList.remove('active');
                });
                widthInput.value = '';
                heightInput.value = '';
            });

            clearTimeout(timerId);
        } 

        if (trigger === showCalcModalButton) {
            trigger.forEach( function(item) {
                item.addEventListener('click', showModal);
            });
        } else {
            trigger.addEventListener('click', showModal);
        }
    }

/*Function for showing popup call when user spend 60 seconds in site*/
    let timerId = setTimeout( () => {
        popupCall.classList.add('modal-visible');
        overlay.classList.add('overlay-visible');
        document.body.style.overflow = 'hidden';

        popupCall.addEventListener('click', function(event) {
            let form = event.target.closest('form');

            if (!form) {
                overlay.classList.remove('overlay-visible');
                popupCall.classList.remove('modal-visible');
                document.body.style.overflow = '';
            }
        });
        
        closeCallModalBtn.addEventListener('click', function() {
            overlay.classList.remove('overlay-visible');
            popupCall.classList.remove('modal-visible');
            document.body.style.overflow = '';
        });
    }, 60000);

    showModals(headerPopupEngineerBtn, popupEngineer, closeEngineerModalBtn);
    showModals(callLink, popupCall, closeCallModalBtn);
    showModals(questionsLink, popupCall, closeCallModalBtn);
    showModals(showCalcModalButton, popupCalc, closeCalcModalBtn);


    scrollTop();

    imagesPopup();
    
    countDown(deadline);

    tabs('.glazing-tab', '.glazing-items');
    tabs('.slider-tab', '.glazing-items');
    tabs('.decoration-tab', '.decoration-item');
    tabs('.decoration-slider-tab', '.decoration-item');
    tabs('.balcon-icons-img > img', '.big-img-icon');

/*Function for send data to database*/
    function sendReguestData(form, request) {
        const data = {};
        const currentForm = document.querySelector(form);
        const formNotice = currentForm.querySelector('.form-notice');
        const nameInput = currentForm.querySelector('.name-input');
        const phoneInput = currentForm.querySelector('.phone-input');

        phoneInput.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/[^0-9+-]/, '');
        });

        currentForm.addEventListener('submit', (event) => {
            event.preventDefault();

            data.name = nameInput.value;
            data.phone = phoneInput.value;

            firebase.database().ref().child(request).push(data);

            nameInput.value = '';
            phoneInput.value = '';

            formNotice.textContent = 'Ми передзвонимо вам через 10 хвилин!';
            formNotice.style.fontSize = '16px';
        });
    }

    sendReguestData('.call-engineer-form', 'engineerReguests');
    sendReguestData('.decoration-call-engineer-form', 'engineerReguests');
    sendReguestData('.special-offer-call-engineer-form', 'engineerReguests');
    sendReguestData('.modal-call-engineer-form', 'engineerReguests');
    sendReguestData('.modal-call-form', 'callReguests');

/*Function for sending data from calc modals to firebase*/
    function sendModalCalcData() {
        const data = {};
        const calcEndForm = document.querySelector('.calc-end-form');
        const formNotice = calcEndForm.querySelector('.form-notice');
        const nameInput = document.querySelector('.calc-end-name-input');
        const phoneInput = document.querySelector('.calc-end-phone-input');
        const nextCalcBtn = document.querySelector('.popup-calc-next-button');
        const nextProfileBtn = document.querySelector('.popup-calc-profile-next-button');
        const coldCheckbox = document.querySelectorAll('.checkbox')[0];
        const warmCheckbox = document.querySelectorAll('.checkbox')[1];

        popupCalcProfileCloseBtn.addEventListener('click', function() {
            calcProfileModal.classList.remove('modal-visible');
            overlay.classList.remove('overlay-visible');
            document.body.style.overflow = '';
            coldCheckbox.checked = false;
            warmCheckbox.checked = false;
        });

        endCalcModalCloseBtn.addEventListener('click', function() {
            popupCalcEnd.classList.remove('modal-visible');
            overlay.classList.remove('overlay-visible');
            document.body.style.overflow = '';
        });

        widthInput.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/[^0-9]/, '');
        });

        heightInput.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/[^0-9]/, '');
        });

        phoneInput.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/[^0-9+-]/, '');
        });

        nextCalcBtn.addEventListener('click', () => {
            if (widthInput.value === '' || heightInput.value === '') {
                widthInput.classList.add('error');
                heightInput.classList.add('error');

                return;
            }

            const form = document.querySelector('.balcon-icons-img .active').dataset.form;

            popupCalc.classList.remove('modal-visible');
            calcProfileModal.classList.add('modal-visible');

            data.form = form;
            data.width = widthInput.value;
            data.height = heightInput.value;

            modalCalcTabsIcons.forEach( (item) => {
                item.classList.remove('active');
            });

            widthInput.value = '';
            heightInput.value = '';
            
            widthInput.classList.remove('error');
            heightInput.classList.remove('error');
        });

        coldCheckbox.addEventListener('change', () => {
            if (coldCheckbox.checked === true) {
                data.profile = coldCheckbox.id;

                warmCheckbox.checked = false;
            }

            customCheckboxList.forEach( (item) => {
                item.classList.remove('error');
            });
        });

        warmCheckbox.addEventListener('change', () => {
            if (warmCheckbox.checked === true) {
                data.profile = warmCheckbox.id;

                coldCheckbox.checked = false;
            }

            customCheckboxList.forEach( (item) => {
                item.classList.remove('error');
            });
        });

        nextProfileBtn.addEventListener('click', () => {
            if (warmCheckbox.checked === false && coldCheckbox.checked === false) {
                customCheckboxList.forEach( (item) => {
                    item.classList.add('error');
                });

                return;
            }

            const selectedIndex = document.querySelector('#view-type').selectedIndex;
            const selectedOptions = document.querySelectorAll('#view-type > option');
           
            calcProfileModal.classList.remove('modal-visible');
            popupCalcEnd.classList.add('modal-visible');

            data.type = selectedOptions[selectedIndex].value;

            coldCheckbox.checked = false;
            warmCheckbox.checked = false;
        });
        
        calcEndForm.addEventListener('submit', (event) => {
            event.preventDefault();

            data.name = nameInput.value;
            data.phone = phoneInput.value;

            firebase.database().ref().child('calculateRequests').push(data);

            formNotice.style.fontSize = '16px';

            setTimeout(closeCalcModal, 1000);
        });

        function closeCalcModal() {
            popupCalcEnd.classList.remove('modal-visible');
            overlay.classList.remove('overlay-visible');
            document.body.style.overflow = '';
            nameInput.value = '';
            phoneInput.value = '';
        }
    }

    sendModalCalcData();
});