const modals = (triggerClass, modalClass, closeBtnClass, delay = false) => {
    const overlay = document.querySelector('.overlay');
    const trigger = document.querySelectorAll(triggerClass);
    const modal = document.querySelector(modalClass);
    const closeBtn = document.querySelector(closeBtnClass);

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

    const closeModal = () => {
        modal.addEventListener('click', (event) => {
            let form = event.target.closest('form');

            if (!form) {
                overlay.classList.remove('overlay-visible');
                modal.classList.remove('modal-visible');
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            }
        });
        
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('overlay-visible');
            modal.classList.remove('modal-visible');
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        });
    };

    const showModal = () => {
        document.body.style.marginRight = `${scrollWidth}px`;
        overlay.classList.add('overlay-visible');
        modal.classList.add('modal-visible');
        document.body.style.overflow = 'hidden';

        closeModal();

        clearTimeout(window.timerId);
    }; 

    if (delay) {
        window.timerId = setTimeout(showModal, 60000);
    }

    trigger.forEach((item) => {
        item.addEventListener('click', showModal);
    });
};

export default modals;