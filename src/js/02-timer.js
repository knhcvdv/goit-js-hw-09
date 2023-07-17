import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";


const currentDate = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateOfUser = selectedDates[0];

    if (currentDate > dateOfUser) {
      Notiflix.Notify.warning("Please choose a date in the future");
    } else {
      btnStart.disabled = false;
    }
  },
};

const fp = flatpickr("#datetime-picker", options);

const input = document.querySelector("#datetime-picker")
const btnStart = document.querySelector("button[data-start]")
btnStart.disabled = true;
const daysElement = document.querySelector("span[data-days]");
const hoursElement = document.querySelector("span[data-hours]");
const minutesElement = document.querySelector("span[data-minutes]");
const secondsElement = document.querySelector("span[data-seconds]");



btnStart.addEventListener("click", startTimer);

function startTimer () {
    const selectedDate = fp.selectedDates[0];
    const id = setInterval( () => {
        const current = new Date();
        const timer = convertMs(selectedDate - current);
        if (timer.seconds >= 0) {
            daysElement.textContent = timer.days.toString().padStart(2, "0")
            hoursElement.textContent = timer.hours.toString().padStart(2, "0")
            minutesElement.textContent = timer.minutes.toString().padStart(2, "0")
            secondsElement.textContent = timer.seconds.toString().padStart(2, "0")
        } else {
            clearInterval(id)
            Notiflix.Notify.success("Congratulation! Time is over!")
        }
    }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


