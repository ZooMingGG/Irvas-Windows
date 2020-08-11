const countDown = (deadline) => {
    const days = document.querySelector('.days');
    const hours = document.querySelector('.hours');
    const minutes = document.querySelector('.minutes');
    const seconds = document.querySelector('.seconds');

    const getTimeRemaining = (endTime) => {
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
    };

    const setClock = (endTime) => {
        updateClock();

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
    };

    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };

    setClock(deadline);
};

export default countDown;