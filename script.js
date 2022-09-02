'use strict';

let diceEl = document.querySelector('.dice');
let btnNewGameEl = document.querySelector('.btn--new');
let btnRollEl = document.querySelector('.btn--roll');
let btnHoldEl = document.querySelector('.btn--hold');

let currentScore0El = document.getElementById('current--0');
let currentScore1El = document.getElementById('current--1');
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');

let sectionPlayer0El = document.querySelector('.player--0');
let sectionPlayer1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

let currentScore0 = 0;
let currentScore1 = 0;
let score0 = 0;
let score1 = 0;

let player0 = true;
let player1 = false;

function init() {
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  diceEl.classList.add('hidden');
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  currentScore0 = 0;
  currentScore1 = 0;
  score0 = 0;
  score1 = 0;
}

init();

/**
 * Generate random numbers between 1 and 6 inclusive
 *
 * @return {*}
 */
function roleDice() {
  return Math.floor(Math.random() * 6) + 1;
}

btnRollEl.addEventListener('click', () => {
  if (playing) {
    const dice = roleDice();
    diceEl.classList.remove('hidden');
    diceEl.setAttribute('src', `dice-${dice}.png`);

    if (player0) {
      if (dice !== 1) {
        currentScore0 += dice;
        currentScore0El.textContent = currentScore0;
      } else {
        switchPlayer();
        currentScore0 = 0;
        currentScore0El.textContent = 0;
      }
    } else {
      if (dice !== 1) {
        currentScore1 += dice;
        currentScore1El.textContent = currentScore1;
      } else {
        switchPlayer();
        currentScore1 = 0;
        currentScore1El.textContent = 0;
      }
    }
  }
});

btnHoldEl.addEventListener('click', () => {
  if (playing) {
    if (player0) {
      score0 += currentScore0;
      if (score0 >= 100) {
        //End game, current player wins
        playing = false;
        console.log('Player1 wins');
      } else {
        switchPlayer();
      }
      score0El.textContent = score0;
      currentScore0 = 0;
      currentScore0El.textContent = 0;
    } else {
      score1 += currentScore1;
      if (score1 >= 100) {
        console.log('Player2 wins');
      } else {
        switchPlayer();
      }
      score1El.textContent = score1;
      currentScore1 = 0;
      currentScore1El.textContent = 0;
    }
  }
});

btnNewGameEl.addEventListener('click', init);

function switchPlayer() {
  if (player0) {
    player0 = false;
    player1 = true;

    sectionPlayer0El.classList.toggle('player--active');
    sectionPlayer1El.classList.toggle('player--active');
  } else {
    player0 = true;
    player1 = false;

    sectionPlayer0El.classList.toggle('player--active');
    sectionPlayer1El.classList.toggle('player--active');
  }
}
