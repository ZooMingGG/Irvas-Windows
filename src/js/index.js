'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const scrollBtn = document.querySelector('.scroll-btn');
    const overlay = document.querySelector('.overlay');
    const headerPopupEngineerBtn = document.querySelector('.header-popup-btn');
    const callLink = document.querySelector('.call-link');
    const questionsLink = document.querySelector('.questions-link');
    const showCalcModalButton = document.querySelectorAll('.calc-price-button');
    const popupEngineer = document.querySelector('#popup-engineer');
    const popupCall = document.querySelector('#popup-call');
    const popupCalc = document.querySelector('#popup-calc');
    const bigImgModal = document.querySelector('.big-img-modal');
    const bigImgModalIcon = document.querySelector('.big-img-modal-icon');
    const ourWorksItems = document.querySelectorAll('.our-works-item');
    const closeEngineerModalBtn = document.querySelector('.popup-engineer-close');
    const closeCallModalBtn = document.querySelector('.popup-call-close');
    const closeCalcModalBtn = document.querySelector('.popup-calc-close');


/*Function for showing and hiding modal windows*/
    function showModals(trigger, modal, closeBtn) {
        function showModal() {
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
        
        closeCallModalBtn.addEventListener('click', function(event) {
            overlay.classList.remove('overlay-visible');
            popupCall.classList.remove('modal-visible');
            document.body.style.overflow = '';
        });
    }, 60000);

    showModals(headerPopupEngineerBtn, popupEngineer, closeEngineerModalBtn);
    showModals(callLink, popupCall, closeCallModalBtn);
    showModals(questionsLink, popupCall, closeCallModalBtn);
    showModals(showCalcModalButton, popupCalc, closeCalcModalBtn);

/*Function for show and hide scroll button*/
    function showScrollBtn() {
        let currentCords = 0;

        window.addEventListener('scroll', function(event) {
            if (window.pageYOffset > document.documentElement.clientHeight) {
                if (document.documentElement.scrollTop < currentCords) {
                    scrollBtn.classList.add('visible');
                } else {
                    scrollBtn.classList.remove('visible');
                }

                currentCords = document.documentElement.scrollTop;
            } else {
                currentCords = 0;
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', function(event) {
            document.documentElement.scrollTo(0, 0);
            currentCords = 0;
        });
    }

    showScrollBtn();

/*Function for show modal window with big img of work*/
    function showBigImgModal() {
        ourWorksItems.forEach( function(item) {
            item.addEventListener('click', (event) => {
                let currentItem =  event.target.closest('.our-works-item');

                bigImgModalIcon.src = currentItem.getAttribute('big-img-src');
                overlay.classList.add('overlay-visible');
                document.body.style.overflow = 'hidden';
                bigImgModal.classList.add('modal-visible');
            });
        });

        bigImgModal.addEventListener('click', (event) => {
            let bigModalImg = event.target.closest('.big-img-modal-icon');

            if (!bigModalImg) {
                overlay.classList.remove('overlay-visible');
                document.body.style.overflow = '';
                bigImgModal.classList.remove('modal-visible');
            }
        });
    }

    showBigImgModal();
});