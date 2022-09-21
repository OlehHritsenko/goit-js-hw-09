import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
let delayInput = document.querySelector('[name=delay]');
let stepInput = document.querySelector('[name=step]');
let amountInput = document.querySelector('[name=amount]');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  let delay = Number(delayInput.value);
  let step = Number(stepInput.value);
  let amount = Number(amountInput.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })

      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
  }, delay);
  });
}
