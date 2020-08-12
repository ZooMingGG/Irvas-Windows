const tabs = (tabsClass, contentClass) => {
    const tabs = document.querySelectorAll(tabsClass);
    const content = document.querySelectorAll(contentClass);

    tabs.forEach((item, index) => {
        item.addEventListener('click', () => {

            tabs.forEach((item) => {
                item.classList.remove('active');
            });

            content.forEach((item) => {
                item.classList.remove('visible');
            });

            item.classList.add('active');
            content[index].classList.add('visible');
        }); 
    }); 
};

export default tabs;