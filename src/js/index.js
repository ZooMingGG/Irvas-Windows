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
    const popupCalcEnd = document.querySelector('.popup-calc-end');
    const popupCalcProfileCloseBtn = document.querySelector('.popup-calc-profile-close');
    const calcProfileModal = document.querySelector('#calc-profile-modal');
    const bigImgModal = document.querySelector('.big-img-modal');
    const bigImgModalIcon = document.querySelector('.big-img-modal-icon');
    const ourWorksItems = document.querySelectorAll('.our-works-item');
    const closeEngineerModalBtn = document.querySelector('.popup-engineer-close');
    const closeCallModalBtn = document.querySelector('.popup-call-close');
    const closeCalcModalBtn = document.querySelector('.popup-calc-close');
    const days = document.querySelector('.days');
    const hours = document.querySelector('.hours');
    const minutes = document.querySelector('.minutes');
    const seconds = document.querySelector('.seconds');
    const glazingTabs = document.querySelectorAll('.glazing-tab');
    const glazingSliderTabs = document.querySelectorAll('.slider-tab');
    const modalCalcTabs = document.querySelectorAll('.balcon-icons-img');
    const decorationTabs = document.querySelectorAll('.decoration-tab');
    const decorationSliderTabs = document.querySelectorAll('.decoration-slider-tab');
    const modalCalcTabsIcons = document.querySelectorAll('.balcon-icons-img > img');
    const glazingTabsContent = document.querySelectorAll('.glazing-items');
    const decorationTabsContent = document.querySelectorAll('.decoration-item');
    const modalCalcTabsContent = document.querySelectorAll('.big-img-icon');
    const endCalcModalCloseBtn = document.querySelector('.calc-end-close-btn');
    const customCheckboxList = document.querySelectorAll('.checkbox-custom');
    const widthInput = document.querySelector('#width');
    const heightInput = document.querySelector('#height');
    const deadline = '2020-08-01';

/*Initialize Firebase*/
    const firebaseConfig = {
        apiKey: "AIzaSyD1as3gwrYmKuFoBxQ1nvWIkRPnq8mV3iE",
        authDomain: "irvas-windows.firebaseapp.com",
        databaseURL: "https://irvas-windows.firebaseio.com",
        projectId: "irvas-windows",
        storageBucket: "irvas-windows.appspot.com",
        messagingSenderId: "794720514305",
        appId: "1:794720514305:web:f49e4543faf67b5961ab00",
        measurementId: "G-Y64KPCRM58"
    };

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

/*Function for show and hide scroll button*/
    function showScrollBtn() {
        let currentCords = 0;

        window.addEventListener('scroll', function() {
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

        scrollBtn.addEventListener('click', function() {
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

                bigImgModalIcon.src = currentItem.dataset.bigImgSrc;
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

/*Function for countdown timer*/
    function countDown(deadline) {
        function getTimeRemaining(endTime) {
            const time = Date.parse(endTime) - Date.parse( new Date() );
            let seconds = Math.floor((time / 1000) % 60);
            let minutes = Math.floor((time / 1000 / 60) % 60);
            let hours = Math.floor((time / 1000 / 60 / 60) % 24);
            let days = Math.floor((time / 1000 / 60 / 60 / 24));

            return {
                'total': time,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function setClock(endTime) {
            updateClock(endTime);

            const timerId = setInterval(updateClock, 1000);

            function updateClock() {
                const time = getTimeRemaining(endTime);

                days.textContent = addZero(time.days);
                hours.textContent = addZero(time.hours);
                minutes.textContent = addZero(time.minutes);
                seconds.textContent = addZero(time.seconds);

                if (time.total <= 0) {
                    days.textContent = '00';
                    hours.textContent = '00';
                    minutes.textContent = '00';
                    seconds.textContent = '00';

                    clearInterval(timerId);
                }
            }
        }

        function addZero(num) {
            if (num <= 9) {
                return '0' + num;
            } else {
                return num;
            }
        }

        setClock(deadline);
    }

    countDown(deadline);

/*Function for tabs*/
    function tabs(tabs, content) {
        tabs.forEach( (item, index) => {
            item.addEventListener('click', (event) => {
                let glazingTarget = event.target.closest('.tab-item');
                let modalCalcTarget = event.target.closest('.balcon-icons-img');
                let decorationTarget = event.target.closest('.tab');

                tabs.forEach( (item) => {
                    item.classList.remove('active');
                });

                content.forEach( (item) => {
                    item.classList.remove('visible');
                });

                modalCalcTabsIcons.forEach( (item) => {
                    item.classList.remove('active');
                });

                if (glazingTarget === item || modalCalcTarget === item || decorationTarget === item) {
                    if (tabs === modalCalcTabs) {
                        modalCalcTabsIcons[index].classList.add('active');
                    }
                    
                    item.classList.add('active');
                    content[index].classList.add('visible');
                }
            }); 
        }); 
    }

    tabs(glazingTabs, glazingTabsContent);
    tabs(glazingSliderTabs, glazingTabsContent);
    tabs(modalCalcTabs, modalCalcTabsContent);
    tabs(decorationTabs, decorationTabsContent);
    tabs(decorationSliderTabs, decorationTabsContent);

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