(function () {
    // register variables
    var bigTime = 1499; // time in seconds
    var mode = "normal"; // normal vs cooldown
    var animation = "fadeToBlack"; // will be able to change in settings later
    var color = "EC2E2B";
    var cooldownColor = "265E9A";
    var bgColor;
    var percent;
    var divisor = 300;
    var session = 1;
    var mins;
    var secs;
    var task;
    var countdownID;
    // messages
    var messageType;
    var normalMessages = [
    "Session in progress..."
    ];
    var cooldownMessages = [
    "Break in progress..."
    ];
    var endMessages = [
    "Start session?"
    ];
    var quitMessages = [
    "Reset?"
    ];
    // register elements
    var minutes = document.getElementById("minutes");
    var seconds = document.getElementById("seconds");
    var message = document.getElementById("message");
    var sessionNumber = document.getElementById("sessionNumber");
    var task = document.getElementById("taskName");
    // register start button
    var start = document.getElementById("start");
    start.addEventListener("click", startTimer, false);
    // register stop button
    var stop = document.getElementById("stop");
    stop.addEventListener("click", stopTimer, false);
    // register reset button
    var reset = document.getElementById("reset");
    reset.addEventListener("click", resetTimer, false);
    // COUNTER ================================================================
    function counter(eventInfo) {
        // calculate the minutes and seconds from bigTime
        mins = Math.floor(bigTime / 60);
        secs = bigTime - mins * 60;
        // change the HTML to show new minutes and seconds
        minutes.innerHTML = (mins < 10 ? '0' : '') + mins;
        seconds.innerHTML = (secs < 10 ? '0' : ':') + secs;
        // handle the animation
        if (mode == "normal") {
            if (animation == "fadeToBlack") {
                percent = secs / divisor;
                bgColor = shadeColor(bgColor, -percent);
                // decrement divisor
                if (divisor > 0)
                    divisor = divisor - 0.05;
            }
        }
        // change the message at 00
        if (secs == 0) {
            if (mode == "normal") {
                showMessage("normal");
            } else {
                showMessage("cooldown");
            }
        }
        // switch modes when timer expires
        if (bigTime == 0) {
            if (mode == "normal") {
                // go to cooldown
                mode = "cooldown";
                bigTime = 300;
                divisor = 30;
                // change message
                showMessage("cooldown");
            } else {
                resetTimer();
            }
        } else {
            // decrement
            bigTime = bigTime - 1;
        }
    }
    // ACTIONS =============================================================
    function startTimer(eventInfo) {
        bgColor = color;
        bigTime = 1499; // get from app settings
        divisor = 300;
        // start the timer
        countdownID = setInterval(function () { counter(); }, 1000);
        // show message
        showMessage("normal");
        // show stop button
        start.style.display = "none";
        stop.style.display = "block";
        reset.style.display = "none";
    }
    function stopTimer(eventInfo) {
        // change message
        showMessage("quit");
        // stop timer
        clearInterval(countdownID);
        // show reset button
        start.style.display = "none";
        stop.style.display = "none";
        reset.style.display = "block";
    }
    function resetTimer(eventInfo) {
        // switch back to normal mode
        mode = "normal";
        bigTime = 1499;
        bgColor = color;        
        // change styles to normal
        minutes.innerHTML = "25";
        seconds.innerHTML = "00";
        // change message
        showMessage("end");
        // show start button
        start.style.display = "block";
        stop.style.display = "none";
        reset.style.display = "none";
        // stop timer
        clearInterval(countdownID);
    }
    function showMessage(messageType) {
        switch (messageType) {
            case "normal":
            message.innerHTML = normalMessages[Math.floor(Math.random() * normalMessages.length)];
            break;
            case "cooldown":
            message.innerHTML = cooldownMessages[Math.floor(Math.random() * cooldownMessages.length)];
            break;
            case "end":
            message.innerHTML = endMessages[Math.floor(Math.random() * endMessages.length)];
            break;
            case "quit":
            message.innerHTML = quitMessages[Math.floor(Math.random() * quitMessages.length)];
            break;
        }
    }
    // HELPER FUNCTIONS ====================================================
    function shadeColor(color, percent) {
        var num = parseInt(color, 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        B = (num >> 8 & 0x00FF) + amt,
        G = (num & 0x0000FF) + amt;
        return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
    }
})();