'use strict';
import firebaseConfig from './modules/firebase-config';
import imagesPopup from './modules/images-popup';
import countDown from './modules/count-down';
import scrollTop from './modules/scroll';
import tabs from './modules/tabs';
import modals from './modules/modals';
import sendRequestData from './modules/send-request-data';
import sendModalCalcData from './modules/send-calc-data';

document.addEventListener('DOMContentLoaded', () =>{
    const deadline = '2020-08-29';

    firebase.initializeApp(firebaseConfig);

    modals('.header-popup-btn', '#popup-engineer', '.popup-engineer-close');
    modals('.call-link', '#popup-call', '.popup-call-close');
    modals('.call-link', '#popup-call', '.popup-call-close', true);
    modals('.questions-link', '#popup-call', '.popup-call-close');
    modals('.calc-price-button', '#popup-calc', '.popup-calc-close');
    modals('.popup-calc-next-button', '.popup-calc-profile', '.popup-calc-profile-close', false, true);
    modals('.popup-calc-profile-next-button', '.popup-calc-end', '.calc-end-close-btn', false, true);

    scrollTop();

    imagesPopup();
    
    countDown(deadline);

    tabs('.glazing-tab', '.glazing-items');
    tabs('.slider-tab', '.glazing-items');
    tabs('.decoration-tab', '.decoration-item');
    tabs('.decoration-slider-tab', '.decoration-item');
    tabs('.balcon-icons-img > img', '.big-img-icon');

    sendRequestData('.call-engineer-form', 'engineerReguests');
    sendRequestData('.decoration-call-engineer-form', 'engineerReguests');
    sendRequestData('.special-offer-call-engineer-form', 'engineerReguests');
    sendRequestData('.modal-call-engineer-form', 'engineerReguests');
    sendRequestData('.modal-call-form', 'callReguests');

    sendModalCalcData();
});