import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  fieldCalendar: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  readoutTime: document.querySelector('.timer'),
  daysTimer: document.querySelector('[data-days]'),
  hoursTimer: document.querySelector('[data-hours]'),
  minutesTimer: document.querySelector('[data-minutes]'),
  secondsTimer: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
let endTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      endTime = selectedDates[0];
      refs.startBtn.disabled = false;
    }
  },
};

// функція що додає на початок 0, якщо в числі менше 2х знаків
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

flatpickr(refs.fieldCalendar, options);

class Timer {
  constructor() {
    this.intervalId = null,
    refs.startBtn.disabled = true;
  }
  
  start() {
    refs.fieldCalendar.disabled = true;
    refs.startBtn.disabled = true;
    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = endTime - startTime;
      const time = convertMs(deltaTime);
      if (deltaTime <= 1000) {
        clearInterval(this.intervalId);
      }
      this.readoutTime(time);
    }, 1000);
  }
  readoutTime({ days, hours, minutes, seconds }) {
    refs.daysTimer.innerHTML = days;
    refs.hoursTimer.innerHTML = hours;
    refs.minutesTimer.innerHTML = minutes;
    refs.secondsTimer.innerHTML = seconds;
  }
}

const timer = new Timer();
refs.startBtn.addEventListener('click', () => timer.start());