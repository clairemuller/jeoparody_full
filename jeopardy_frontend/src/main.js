let introDiv = document.getElementById('intro');
let form = document.getElementById('login');
let gameDiv = document.getElementById('game');
let overlay = document.getElementById('overlay');
let overlayContent = document.getElementById('overlay-content');

// 1 - USER CLICKS PLAY NEW GAME
document.getElementById('submit').addEventListener("click", function(e){
  e.preventDefault();
  findUser();
})

// 2 - FIND OR CREATE USER; CREATE NEW GAME
function findUser() {
  let username = document.getElementById('username').value;
  fetch('http://localhost:3000/users', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({username: username})
  })
  startFetch();
}

// 3 - ONCE LOGGED IN
function startFetch() {
  fetch('http://localhost:3000/categories')
  .then(res => res.json())
  .then(categories => {
    renderNewGame(categories)
  });
}

// 4 - CREATE NEW GAME BOARD
function renderNewGame(categories) {
  introDiv.style.display = 'none';
  gameDiv.style.display = 'block';
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

// 5 - REMOVE CATEGORIES WITH LESS THAN 5 CLUES
function fixClueCount(categories) {
  const newCats = categories.filter(category => {
    return category.clues.length >= 5;
  })
  return newCats;
}

// 6 - GET FIVE RANDOM CATEGORIES OR CLUES
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

// 7 - CREATE COLUMN
function renderColumn(category) {
  const column = document.createElement('div');
  const title = document.createElement('div');

  column.classList.add('column');
  title.classList.add('title');
  title.textContent = category.title.toUpperCase();
  column.appendChild(title);

  renderClues(category, column)
  gameDiv.appendChild(column);
}

// 8 - CREATE CLUES FOR COLUMN
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
      // REMOVE EVENT LISTENER
      if (clueDiv.classList.contains('clicked')) {
        return;
      }
      clueDiv.classList.add('clicked')

      displayQuestion(clue);
      setTimeout(() => displayAnswer(clue), 2000);
    })

    column.appendChild(clueDiv);
  }
}

// 9 - ON CLICK DISPLAY QUESTION
function displayQuestion(clue) {
  clue.question = removeHTML(clue.question)
  gameDiv.style.display = 'none';
  overlay.style.display = 'block';
  overlayContent.innerText = clue.question.toUpperCase();
  document.body.appendChild(overlay);
}

// 9.5 - REMOVE HTML TAGS & ESCAPE CHARS
function removeHTML(element) {
  if (element.includes('<i>')) {
    element = element.replace(/<[^>]*>/g, '');
  }
  if (element.includes("\\'")) {
    element = element.replace("\\'", "'");
  }
  return element;
}

// 10 - AFTER 5 SECONDS DISPLAY ANSWER
function displayAnswer(clue) {
  clue.answer = removeHTML(clue.answer)
  overlayContent.innerText = clue.answer.toUpperCase();
  setTimeout(() => finishClue(), 2000);
}

// 11 - BRING BACK GAME BOARD
function finishClue() {
  document.body.removeChild(overlay);
  gameDiv.style.display = 'block';
}
