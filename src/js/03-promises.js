import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      // Fulfill
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      // Reject
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
    }
  });
}

const form = document.querySelector(".form")

const submit = function (event) {
  event.preventDefault()
  let delay = Number(form.delay.value)

  for (let i = 1; i <= form.amount.value; i += 1) {
    createPromise(i, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += Number(form.step.value);
  }
};
form.addEventListener("submit", submit)


