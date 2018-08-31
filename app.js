'use strict';
let timer = null;

let isPlaying = false;
let isWorkActive = true;
let isFirstTime = false;

let primaryWorkSessionLength = 1500;
let primaryBreakSessionLength = 300;

let workSessionLength = 1500;
let breakSessionLength = 300;

let changedSessionLength;

let changedWorkSessionLength = 0;
let changedBreakSessionLength = 0;

let clock = document.getElementById('clock');

let workMinutes = document.getElementById('work_minutes');
let breakMinutes = document.getElementById('break_minutes');

let currentSession = document.getElementById('current_session');

let subWorkMinutesButton = document.querySelector('#subtract_work_minutes');
let addWorkMinutesButton = document.querySelector('#add_work_minutes');

let subBreakMinutesButton = document.querySelector('#subtract_break_minutes');
let addBreakMinutesButton = document.querySelector('#add_break_minutes');

let stopButton = document.querySelector('#stop_button');
let resetButton = document.querySelector('#reset_button');
let playButton = document.querySelector('#play_button');

let sessionSettings = document.querySelector('#session_settings');
let sessionTitles = document.querySelector('#sessions_titles');

function startTimer() {
  if (isFirstTime == false) {
    changedSessionLength = workSessionLength;
    isFirstTime = true;
  }
  playButton.textContent = "Pause";
  if (changedSessionLength > 0) {
    changedSessionLength--;
  } else {
    isWorkActive = !isWorkActive;
    changedSessionLength = switchSession();
  }

  clock.textContent = formatClock(changedSessionLength);

}

function switchSession() {
  if (isWorkActive == true) {
    currentSession.textContent = "Work Session";
    return workSessionLength;

  } else {
    currentSession.textContent = "Break Session";
    return breakSessionLength;

  }
}


function play() {
  if (isPlaying == false) {
    isPlaying = true;
    sessionSettings.classList.add('visibility');
    sessionTitles.classList.add('visibility');
    timer = setInterval(startTimer, 1000);

  } else {
    isPlaying = false;
    pauseTimer();
  }
}


function pauseTimer() {
  isPlaying = false;
  playButton.textContent = "Play";
  clearInterval(timer);
}


function stop() {
  pauseTimer();
  sessionSettings.classList.remove('visibility');
  sessionTitles.classList.remove('visibility');
  clock.textContent = formatClock(workSessionLength);
  changedSessionLength = workSessionLength;

}

function reset() {
  pauseTimer();
  sessionSettings.classList.remove('visibility');
  sessionTitles.classList.remove('visibility');

  isWorkActive = true;
  isFirstTime = false;
  isPlaying = false;

  clock.textContent = formatClock(primaryWorkSessionLength);
  workMinutes.textContent = formatClock(primaryWorkSessionLength);
  breakMinutes.textContent = formatClock(primaryBreakSessionLength);
  changedSessionLength = primaryWorkSessionLength;
  currentSession.textContent = "Work Session";
}




function getPadded(num) {
  num = num.toString();
  return num.length == 1 ? `0${num}` : num;
}

function formatClock(sessionLength) {
  let minutes = Math.floor(sessionLength / 60);
  let seconds = sessionLength % 60;
  return `${getPadded(minutes)}:${getPadded(seconds)}`;
}



function addWorkMinutes() {
  if (workSessionLength >= 3600) {
    alert("Your work time should not exceed 60 minutes");
    return;
  }
  workSessionLength += 60;
  workMinutes.textContent = formatClock(workSessionLength);
  clock.textContent = formatClock(workSessionLength);
}


function subWorkMinutes() {
  if (workSessionLength <= 60) {
    return;
  }
  workSessionLength -= 60;
  workMinutes.textContent = formatClock(workSessionLength);
  clock.textContent = formatClock(workSessionLength);
}


function addBreakkMinutes() {
  if (breakSessionLength >= 1200) {
    alert("Break more than 20 minutes does not make you productive");
    return;
  }
  breakSessionLength += 60;
  breakMinutes.textContent = formatClock(breakSessionLength);
}


function subBreakkMinutes() {
  if (breakSessionLength <= 60) {
    return;
  }
  breakSessionLength -= 60;
  breakMinutes.textContent = formatClock(breakSessionLength);
}


window.onload = reset;

stopButton.addEventListener('click', stop);
playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);

addWorkMinutesButton.addEventListener('click', addWorkMinutes);
subWorkMinutesButton.addEventListener('click', subWorkMinutes);

addBreakMinutesButton.addEventListener('click', addBreakkMinutes);
subBreakMinutesButton.addEventListener('click', subBreakkMinutes);
