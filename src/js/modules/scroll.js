const scrollTop = () => {
    const scrollBtn = document.querySelector('.scroll-btn');

    let currentCords = 0;

    window.addEventListener('scroll', () => {
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

    scrollBtn.addEventListener('click', () => {
        document.documentElement.scrollTo(0, 0);
        currentCords = 0;
    });
};

export default scrollTop;