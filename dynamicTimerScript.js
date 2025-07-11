
let count = 1;
let timerTrackerObj = {}

function addTimer() {
    let orderedList = document.getElementById('orderedList');
    let divelement = document.createElement('div');

    divelement.innerHTML = `
<li>
<div >
<button type="button" id="startBtn${count}" onclick="start(startBtn${count}, stopBtn${count}, pauseBtn${count}, resetBtn${count}, 'displayElement${count}')">start</button>
<span id="displayElement${count}">00:00:00</span>
<button type="button" id="stopBtn${count}" onclick="stop(startBtn${count},stopBtn${count}, pauseBtn${count}, resumeBtn${count}, resetBtn${count}, 'displayElement${count}')" disabled>stop</button>
<br>
<br>
<button type="button" id="pauseBtn${count}" onclick="pause(pauseBtn${count}, resumeBtn${count},stopBtn${count}, resetBtn${count}, 'displayElement${count}')" disabled>pause</button>
<button type="button" id="resumeBtn${count}" onclick="resume(resumeBtn${count}, stopBtn${count}, pauseBtn${count}, resetBtn${count}, 'displayElement${count}')" disabled>resume</button>
<button type="button" id="resetBtn${count}" onclick="reset(resetBtn${count}, startBtn${count},stopBtn${count}, pauseBtn${count}, resumeBtn${count}, 'displayElement${count}')" disabled>reset</button>
</div> </li>
<br>
<br>
`;

    orderedList.appendChild(divelement);
    count++;
}


function start(startBtn, stopBtn, pauseBtn, resetBtn, timerDisplayID) {

    // console.log("Timer started ", startBtn)
    const displayElement = document.getElementById(timerDisplayID);

    if (!Object.keys(timerTrackerObj).includes(timerDisplayID)) {
        timerTrackerObj[timerDisplayID] = {
            timerInterval: 0,
            isRunning: false,
            seconds: 0
        };

        // localStorage.setItem(timerDisplayID,JSON.stringify(timerTrackerObj[timerDisplayID]));
        // console.log(JSON.parse(localStorage.getItem(timerDisplayID)))
        // console.log("adding into timerTrackerObj for first time :  ", timerTrackerObj);

    }
    
    if (!timerTrackerObj[timerDisplayID].isRunning) {
        
        timerTrackerObj[timerDisplayID].timerInterval = setInterval(() => {
            timerTrackerObj[timerDisplayID].seconds++;
            const hours = Math.floor(timerTrackerObj[timerDisplayID].seconds / 3600);
            const remainingSecondsAfterHours = timerTrackerObj[timerDisplayID].seconds % 3600;
            const minutes = Math.floor(remainingSecondsAfterHours / 60);
            const seconds = remainingSecondsAfterHours % 60;
            
            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(seconds).padStart(2, '0');
            
            displayElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }, 1000);
        
        timerTrackerObj[timerDisplayID].isRunning = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        pauseBtn.disabled = false;
        resetBtn.disabled = true;
    }
    localStorage.setItem("timerTrackerObj",JSON.stringify(timerTrackerObj));
    console.log(JSON.parse(localStorage.getItem("timerTrackerObj")))

}

function stop(startBtn, stopBtn, pauseBtn, resumeBtn, resetBtn, timerDisplayID) {
    // console.log("Timer stopped ", stopBtn);

    // if (!Object.keys(timerTrackerObj).includes(timerDisplayID)) {
    //     alert("First start the timer " + stopBtn);
    //     return "";
    // }

    const displayElement = document.getElementById(timerDisplayID);
    displayElement.textContent += ` Timer Stopped`;

    clearInterval(timerTrackerObj[timerDisplayID].timerInterval);
    timerTrackerObj[timerDisplayID].timerInterval = null;
    timerTrackerObj[timerDisplayID].isRunning = false;
    timerTrackerObj[timerDisplayID].seconds = 0;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
    resetBtn.disabled = false;

    localStorage.setItem("timerTrackerObj",JSON.stringify(timerTrackerObj));
    console.log(JSON.parse(localStorage.getItem("timerTrackerObj")))
    // console.log(JSON.parse(localStorage.getItem(timerDisplayID)))
}

function pause(pauseBtn, resumeBtn, stopBtn, resetBtn, timerDisplayID) {
    // console.log("Timer paused ",pauseBtn);
    clearInterval(timerTrackerObj[timerDisplayID].timerInterval);
    timerTrackerObj[timerDisplayID].timerInterval = null;
    timerTrackerObj[timerDisplayID].isRunning = false;
    pauseBtn.disabled = true;
    resumeBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
    localStorage.setItem("timerTrackerObj",JSON.stringify(timerTrackerObj));
    console.log(JSON.parse(localStorage.getItem("timerTrackerObj")))
}

function resume(resumeBtn, stopBtn, pauseBtn, resetBtn, timerDisplayID) {
    // console.log("Timer resumed ",resumeBtn);
    resumeBtn.disabled = true;
    resetBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;

    const displayElement = document.getElementById(timerDisplayID);

    if (!timerTrackerObj[timerDisplayID].timerInterval) {
        timerTrackerObj[timerDisplayID].timerInterval = setInterval(() => {
            timerTrackerObj[timerDisplayID].seconds++;
            const hours = Math.floor(timerTrackerObj[timerDisplayID].seconds / 3600);
            const remainingSecondsAfterHours = timerTrackerObj[timerDisplayID].seconds % 3600;
            const minutes = Math.floor(remainingSecondsAfterHours / 60);
            const seconds = remainingSecondsAfterHours % 60;

            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(seconds).padStart(2, '0');

            displayElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }, 1000);
    }
    localStorage.setItem("timerTrackerObj",JSON.stringify(timerTrackerObj));
    console.log(JSON.parse(localStorage.getItem("timerTrackerObj")))
}

function reset(resetBtn, startBtn, stopBtn, pauseBtn, resumeBtn, timerDisplayID) {
    // console.log("Timer reset ",resetBtn);
    const displayElement = document.getElementById(timerDisplayID);
    clearInterval(timerTrackerObj[timerDisplayID].timerInterval);
    timerTrackerObj[timerDisplayID] = {
        timerInterval: null,
        seconds: 0,
        isRunning: false
    }
    displayElement.textContent = `00:00:00`;
    resetBtn.disabled = true;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
    localStorage.setItem("timerTrackerObj",JSON.stringify(timerTrackerObj));
    console.log(JSON.parse(localStorage.getItem("timerTrackerObj")))
}
