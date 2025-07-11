

let timerTrackerObj ={};

function toggleTimer(timerDisplayID) {
  const displayElement = document.getElementById(timerDisplayID);
  console.log("timerDisplayID  : ",timerDisplayID);

  if(!Object.keys(timerTrackerObj).includes(timerDisplayID)){
    timerTrackerObj[timerDisplayID] =  {
      timerInterval : 0,
      isRunning : false,
      seconds : 0
    };
    console.log("adding into timerTrackerObj for first time :  ",timerTrackerObj);
  }
  
  if (!timerTrackerObj[timerDisplayID].isRunning) {
    // Start 
    console.log("Timer started.   ",timerTrackerObj);
    timerTrackerObj[timerDisplayID].timerInterval = setInterval(() => {
      timerTrackerObj[timerDisplayID].seconds++;
      displayElement.textContent = `Time: ${timerTrackerObj[timerDisplayID].seconds}s`;
    }, 1000);

    timerTrackerObj[timerDisplayID].isRunning = true;

  } else {
    // Stop
    console.log("Timer stopped.   ",timerTrackerObj);

    timerTrackerObj[timerDisplayID].isRunning = false;
    timerTrackerObj[timerDisplayID].seconds = 0;

    clearInterval(timerTrackerObj[timerDisplayID].timerInterval);
  }
}


