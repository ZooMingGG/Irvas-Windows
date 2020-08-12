const sendModalCalcData = () => {
    const data = {};
    const calcEndForm = document.querySelector('.calc-end-form');
    const formNotice = calcEndForm.querySelector('.form-notice');
    const nameInput = document.querySelector('.calc-end-name-input');
    const phoneInput = document.querySelector('.calc-end-phone-input');
    const nextCalcBtn = document.querySelector('.popup-calc-next-button');
    const nextProfileBtn = document.querySelector('.popup-calc-profile-next-button');
    const coldCheckbox = document.querySelectorAll('.checkbox')[0];
    const warmCheckbox = document.querySelectorAll('.checkbox')[1];
    const overlay = document.querySelector('.overlay');
    const popupCalcEnd = document.querySelector('.popup-calc-end');
    const customCheckboxList = document.querySelectorAll('.checkbox-custom');
    const widthInput = document.querySelector('#width');
    const heightInput = document.querySelector('#height');

    widthInput.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/, '');
    });

    heightInput.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/, '');
    });

    phoneInput.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/[^0-9+-]/, '');
    });

    const switchCheckbox = (firstCheckbox, secondCheckbox) => {
        if (firstCheckbox.checked === true) {
            data.profile = firstCheckbox.id;

            secondCheckbox.checked = false;
        } 

        customCheckboxList.forEach((item) => {
            item.classList.remove('error');
        });
    };

    coldCheckbox.addEventListener('change', () => {
        switchCheckbox(coldCheckbox, warmCheckbox);
    });

    warmCheckbox.addEventListener('change', () => {
        switchCheckbox(warmCheckbox, coldCheckbox);
    });

    nextCalcBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const form = document.querySelector('.balcon-icons-img .active').dataset.form;

        data.form = form;
        data.width = widthInput.value;
        data.height = heightInput.value;
    });

    nextProfileBtn.addEventListener('click', () => {
        const selectedIndex = document.querySelector('#view-type').selectedIndex;
        const selectedOptions = document.querySelectorAll('#view-type > option');

        data.type = selectedOptions[selectedIndex].value;
    });

    const closeCalcModal = () => {
        popupCalcEnd.classList.remove('modal-visible');
        overlay.classList.remove('overlay-visible');
        document.body.style.overflow = '';
        document.body.style.marginRight = '0px';
        nameInput.value = '';
        phoneInput.value = '';
    };
    
    calcEndForm.addEventListener('submit', (event) => {
        event.preventDefault();

        data.name = nameInput.value;
        data.phone = phoneInput.value;

        firebase.database().ref().child('calculateRequests').push(data);

        formNotice.style.fontSize = '16px';

        setTimeout(closeCalcModal, 1000);
    });
};

export default sendModalCalcData;