const imagesPopup = () => {
    const bigImgModal = document.querySelector('.big-img-modal');
    const bigImgModalIcon = document.querySelector('.big-img-modal-icon');
    const ourWorksItems = document.querySelectorAll('.our-works-item');
    const overlay = document.querySelector('.overlay');

    ourWorksItems.forEach((item) => {
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
};

export default imagesPopup;