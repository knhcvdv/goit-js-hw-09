function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')}`;
  }

  const btnStart = document.querySelector('button[data-start]');
  const btnStop = document.querySelector('button[data-stop]');
  const body = document.querySelector('body');
  let colorSwitch = null;

  btnStart.addEventListener('click', onBtnStart);
  btnStop.addEventListener('click', onBtnStop);

  function onBtnStart() {
  colorSwitch = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    btnStart.disabled = true;
    btnStop.disabled = false;
  }, 1000);
}

function onBtnStop() {
    clearInterval(colorSwitch);
    btnStart.disabled = false;
    btnStop.disabled = true;
}