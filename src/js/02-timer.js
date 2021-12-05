import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputRef: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.start.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = selectedDates[0];
    const unixDate = new Date(date).getTime();
    const now = new Date().getTime();

    if (unixDate <= now) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else refs.start.disabled = false;
  },
};

flatpickr(refs.inputRef, options);
const onStart = () => {
  const date = refs.inputRef.value;
  const unixDate = new Date(date).getTime();
  const intId = setInterval(() => {
    const now = new Date().getTime();
    const delta = unixDate - now;
    if (delta > 0) {
      setTimer(convertMs(delta));
    } else {
      clearInterval(intId);
      Notiflix.Notify.success('Timer ended!');
    }
  }, 1000);
};

const setTimer = ({ days, hours, minutes, seconds }) => {
  refs.days.innerHTML = days;
  refs.hours.innerHTML = hours;
  refs.minutes.innerHTML = minutes;
  refs.seconds.innerHTML = seconds;
};

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

refs.start.addEventListener('click', onStart);
