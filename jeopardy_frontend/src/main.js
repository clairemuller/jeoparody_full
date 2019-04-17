const wrapper = document.getElementById('wrapper');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
const overlayContent = document.createElement('div');
overlayContent.classList.add('overlay-content');
overlay.appendChild(overlayContent)
// let questionDiv = document.createElement('div');
// questionDiv.classList.add('question');
// let answerDiv = document.createElement('div');
// answerDiv.classList.add('answer');


fetch('http://localhost:3000/categories')
.then(res => res.json())
.then(categories => {
  renderNewGame(categories);
});

// CREATE NEW GAME BOARD
function renderNewGame(categories) {
  categories = fixClueCount(categories);
  categories = getFive(categories);
  categories.forEach(category => {
    if (category.clues.length > 5) {
      category.clues = getFive(category.clues);
    }
    return category;
  })
  categories.forEach(category =>
    renderColumn(category));
}

// CREATE CLUES FOR COLUMN
function renderClues(category, column) {

  // CREATE EACH CLUE
  let dollar = 0;
  for (let i = 0; i < category.clues.length; i++) {
    dollar += 200;
    const clue = category.clues[i];

    // ADD DOLLAR AMOUNT
    const clueDiv = document.createElement('div');
    clueDiv.classList.add('clue');
    clueDiv.innerText = `$${dollar}`;

    // ADD EVENT LISTENER
    clueDiv.addEventListener('click', () => {
      clueDiv.innerText = '';
      displayQuestion(clue);
      setTimeout(() => displayAnswer(clue), 2000);
    })

    column.appendChild(clueDiv);
  }
}

function displayQuestion(clue) {
  wrapper.style.display = 'none';
  overlay.style.display = 'block';
  overlayContent.innerText = clue.question.toUpperCase();
  document.body.appendChild(overlay);
}

function displayAnswer(clue) {
  overlayContent.innerText = clue.answer.toUpperCase();
  setTimeout(() => finishClue(), 2000);
}

function finishClue() {
  document.body.removeChild(overlay);
  wrapper.style.display = 'block';
}

// CREATE COLUMN
function renderColumn(category) {
  const wrapper = document.querySelector('div');
  const column = document.createElement('div');
  const title = document.createElement('div');

  column.classList.add('column');
  title.classList.add('title');
  title.textContent = category.title.toUpperCase();
  column.appendChild(title);

  renderClues(category, column)
  wrapper.appendChild(column);
}

// REMOVE CATEGORIES WITH LESS THAN 5 CLUES
function fixClueCount(categories) {
  const newCats = categories.filter(category => {
    return category.clues.length >= 5;
  })
  return newCats;
}

// GET FIVE RANDOM CATEGORIES OR CLUES
function getFive(arr) {
  let five = [];
  let numsUsed = [];
  while (five.length < 5) {
    let num = Math.floor(Math.random() * arr.length);
    if (!numsUsed.includes(num)) {
      five.push(arr[num]);
      numsUsed.push(num);
    }
  }
  return five;
}
