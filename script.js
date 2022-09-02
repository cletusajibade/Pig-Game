'use strict';

let diceEl = document.querySelector('.dice');
let btnNewGameEl = document.querySelector('.btn--new');
let btnRollEl = document.querySelector('.btn--roll');
let btnHoldEl = document.querySelector('.btn--hold');

let currentScore0El = document.getElementById('current--0');
let currentScore1El = document.getElementById('current--1');
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');

let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');

let player0TitleEl = document.getElementById('name--0');
let player1TitleEl = document.getElementById('name--1');

let score, currentScore, currentPlayer, playing;

function init() {
  score = [0, 0];
  currentPlayer = 0;
  currentScore = 0;
  playing = true;

  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0TitleEl.textContent = 'Player 1';
  player1TitleEl.textContent = 'Player 2';
}

init();

/**
 * Generate random numbers between 1 and 6 inclusive
 * @return {*}
 */
function roleDice() {
  return Math.floor(Math.random() * 6) + 1;
}

btnRollEl.addEventListener('click', () => {
  if (playing) {
    const dice = roleDice();
    showDice(dice);

    if (dice !== 1) {
      setCurrentScore(dice);
    } else {
      resetCurrentScore();
      switchPlayer();
    }
  }
});

btnHoldEl.addEventListener('click', () => {
  if (playing) {
    score[currentPlayer] += currentScore;
    if (score[currentPlayer] >= 20) {
      //End game, current player wins
      playing = false;
      resetCurrentScore();
      setMainScore();
      setWinner();
      hideDice();
    } else {
      resetCurrentScore();
      setMainScore();
      switchPlayer();
    }
  }
});

btnNewGameEl.addEventListener('click', () => {
  init();
  togglePlayerBg();
  hideDice();
});

function showDice(dice) {
  diceEl.classList.remove('hidden');
  diceEl.setAttribute('src', `dice-${dice}.png`);
}

function hideDice() {
  diceEl.classList.add('hidden');
}

function switchPlayer() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  togglePlayerBg();
}

function setCurrentScore(dice) {
  currentScore += dice;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;
}
function resetCurrentScore() {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;
}

function setMainScore() {
  document.getElementById(`score--${currentPlayer}`).textContent =
    score[currentPlayer];
}

function setWinner() {
  document.getElementById(`name--${currentPlayer}`).textContent = `Player ${
    currentPlayer + 1
  } wins`;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--winner');
}

function togglePlayerBg() {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
