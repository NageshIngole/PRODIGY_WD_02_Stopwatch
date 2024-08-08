const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const clearButton = document.getElementsByClassName("clear-all")[0];
const minute = document.getElementsByClassName("min")[0];
const second = document.getElementsByClassName("sec")[0];
const centSecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];

const toggleButton = () => {
  lapButton.classList.remove("hidden");
  resetButton.classList.remove("hidden");
};

let isPlay = false;
let secCounter = 0;
let sec;
let min;
let minuteCounter = 0;
let centiSecCounter = 0;
let centiSec;
let isReset = false;

const play = () => {
  if (!isPlay && !isReset) {
    bg.classList.add("animation-bg");
    playButton.innerHTML = "Pause";
    isPlay = true;
    min = setInterval(() => {
      minute.innerText = `${++minuteCounter} :`;
    }, 60 * 1000);

    sec = setInterval(() => {
      if (secCounter === 60) {
        secCounter = 0;
      }
      second.innerHTML = `&nbsp;${++secCounter} :`;
    }, 1000);

    centiSec = setInterval(() => {
      if (centiSecCounter === 100) {
        centiSecCounter = 0;
      }
      centSecond.innerHTML = `&nbsp;${++centiSecCounter} `;
    }, 10);

    

    toggleButton();
    isReset = true;
  } else {
    playButton.innerHTML = "Play";
    isPlay = false;
    isReset = false;
    clearInterval(sec);
    clearInterval(centiSec);
    clearInterval(min);

    bg.classList.remove("animation-bg");
  }
};


const Reset = () => {
  // Reset the counter variables
  secCounter = 0;
  minuteCounter = 0;
  centiSecCounter = 0;
  
  // Update the display to show the reset state
  second.innerHTML = `&nbsp;0 :`;
  centSecond.innerHTML = `&nbsp;0`;
  minute.innerHTML = `0 :`;

  // Hide the lap and reset buttons
  lapButton.classList.add("hidden");
  resetButton.classList.add("hidden");
  
  // Stop the stopwatch and reset play button state
  isReset = true;
  play();
  // isPlay = false;
  clearInterval(sec);
  clearInterval(centiSec);
  clearInterval(min);
  playButton.innerHTML = "Play";

  // Remove any animations or styles applied during play
  bg.classList.remove("animation-bg");
};


const lap = () => {
  const li = document.createElement("li");
  const number = document.createElement("span");
  const timeStamp = document.createElement("span");

  li.setAttribute("class", "lap-item");
  number.setAttribute("class", "number");
  timeStamp.setAttribute("class", "time-stamp");

  timeStamp.innerHTML = `${minuteCounter} :${secCounter} :${centiSecCounter}`;
  li.append(number, timeStamp);
  laps.append(li);

  clearButton.classList.remove("hidden");
};

const clearAll = () => {
  laps.innerHTML = "";
  laps.append(clearButton);
  clearButton.classList.add("hidden");
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", Reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);
