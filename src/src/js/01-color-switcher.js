function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let intId = null;
refs.stop.disabled = true;

const onStart = () => {
  ntId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1500);

  refs.start.disabled = true;
  refs.stop.disabled = false;
};

const onStop = () => {
  clearInterval(intId);

  refs.start.disabled = false;
  refs.stop.disabled = true;
};

refs.start.addEventListener('click', onStart);
refs.stop.addEventListener('click', onStop);
