const sendRequestData = (form, request) => {
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
};

export default sendRequestData;