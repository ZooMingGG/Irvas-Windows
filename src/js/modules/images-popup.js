const imagesPopup = () => {
    const bigImgModal = document.querySelector('.big-img-modal');
    const bigImgModalIcon = document.querySelector('.big-img-modal-icon');
    const ourWorksItems = document.querySelectorAll('.our-works-item');
    const overlay = document.querySelector('.overlay');

    const calcScroll = () => {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.append(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    };

    let scrollWidth = calcScroll();

    ourWorksItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            let currentItem =  event.target.closest('.our-works-item');

            bigImgModalIcon.src = currentItem.dataset.bigImgSrc;
            overlay.classList.add('overlay-visible');
            document.body.style.marginRight = `${scrollWidth}px`;
            document.body.style.overflow = 'hidden';
            bigImgModal.classList.add('modal-visible');
        });
    });

    bigImgModal.addEventListener('click', (event) => {
        let bigModalImg = event.target.closest('.big-img-modal-icon');

        if (!bigModalImg) {
            overlay.classList.remove('overlay-visible');
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
            bigImgModal.classList.remove('modal-visible');
        }
    });
};

export default imagesPopup;