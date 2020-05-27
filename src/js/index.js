'use strict';

function showScrollBtn() {
    const scrollBtn = document.querySelector('.scroll-btn');

    window.addEventListener('scroll', function(event) {
        if (window.pageYOffset > document.documentElement.clientHeight) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', function(event) {
        document.documentElement.scrollTo(0, 0);
    });
}

showScrollBtn();