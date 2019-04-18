let intro = document.createElement('div');

// 1 - DISPLAY JEOPARDY INTRO
function introDisplay(intro) {
  intro.classList.add('intro');
  intro.textContent = 'JEOPARDY';
  document.body.appendChild(intro);
}
