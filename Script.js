/*LJMS Info Hub Copyright@ 2024 by Jiaxiang X and Mercer K is licensed under Attribution-ShareAlike 4.0 International :D*/

function updateDate() {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('liveDate').textContent = now.toLocaleDateString('en-US', dateOptions);
    document.getElementById('liveTime').textContent = now.toLocaleTimeString('en-US', timeOptions);
}
setInterval(updateDate, 500);


function showListBasedOnDate() {
    const today = new Date().getDate();
    const list1 = document.getElementById('list1');
    const list2 = document.getElementById('list2');

    list1.classList.remove('active');
    list2.classList.remove('active');

    if (today % 2 === 0) {
        list2.classList.add('active');
    } else {
        list1.classList.add('active');
    }
}


function toggleLists() {
    var list1 = document.getElementById('list1');
    var list2 = document.getElementById('list2');
    
    list1.classList.toggle('active');
    list2.classList.toggle('active');
}


document.addEventListener('keydown', function(event) {
    if (event.key === 'c') {
        var consoleElem = document.getElementById('console');
        consoleElem.style.display = consoleElem.style.display === 'block' ? 'none' : 'block';
    }
});




function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

document.addEventListener("fullscreenchange", function() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (document.fullscreenElement) {
        fullscreenBtn.style.display = 'none';
    } else {
        fullscreenBtn.style.display = 'block';
    }
});







document.addEventListener('DOMContentLoaded', function () {
    let pauseUntil = 0;

    // Function to start the timer
    function startTimer(timerElement) {
        console.log('Timer started');
        const timerDuration = 4 * 60; // 4 minutes in seconds
        let secondsRemaining = timerDuration;

        function updateTimerDisplay() {
            const minutes = Math.floor(secondsRemaining / 60);
            const seconds = secondsRemaining % 60;
            timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        updateTimerDisplay();

        const timerInterval = setInterval(function () {
            if (secondsRemaining === 0) {
                clearInterval(timerInterval);
                timerElement.classList.remove('flashing-purple', 'green', 'orange', 'red', 'purple');
                timerElement.classList.add('red');
                console.log('Timer finished');
            } else if (secondsRemaining === 240) {
                timerElement.classList.add('green');
                console.log('Timer reached 4 minutes (green)');
            } else if (secondsRemaining === 120) {
                timerElement.classList.remove('green');
                timerElement.classList.add('orange');
                console.log('Timer reached 2 minutes (orange)');
            } else if (secondsRemaining === 60) {
                timerElement.classList.remove('orange');
                timerElement.classList.add('red');
                console.log('Timer reached 1 minute (red)');
            } else if (secondsRemaining === 30) {
                timerElement.classList.remove('red');
                timerElement.classList.add('purple');
                console.log('Timer reached 30 seconds (purple)');
            } else if (secondsRemaining === 10) {
                timerElement.classList.remove('purple');
                timerElement.classList.add('flashing-purple');
                console.log('Timer reached 10 seconds (flashing purple)');
            }

            secondsRemaining--;
            updateTimerDisplay(); // Update the display after decrementing

        }, 1000);
    }

    // Function to check and start the timer if it's a specified time
    function checkAndStartTimer() {
        if (Date.now() < pauseUntil) {
            console.log('Checking paused. Resuming in 5 minutes.');
            return;
        }

        // Get the current time from the browser
        const currentTime = new Date();
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();

        console.log(`Current time: ${currentHours}:${currentMinutes}`);

        // Define an array of timestamps
        const timestamps = [
            { hours: 7, minutes: 26 },
            { hours: 8, minutes: 55 },
            { hours: 9, minutes: 44 },
            { hours: 10, minutes: 38 },
            { hours: 12, minutes: 45 }
        ];

        // Check if the current time matches any of the specified times
        const isSpecifiedTime = timestamps.some(timestamp => {
            return timestamp.hours === currentHours && timestamp.minutes === currentMinutes;
        });

        console.log(`Is specified time? ${isSpecifiedTime}`);

        if (isSpecifiedTime) {
            // If the current time matches a specified time, start the timer
            const timerElement = document.getElementById('timer');
            if (timerElement) {
                pauseUntil = Date.now() + 5 * 60 * 1000; // Pause checking for 5 minutes
                startTimer(timerElement);
            } else {
                console.error('Timer element not found');
            }
        }
    }

    // Check and start the timer every second
    setInterval(checkAndStartTimer, 1000);

});

updateDate();
showListBasedOnDate();
setInterval(showListBasedOnDate, 60000);