// ============================================
//   Tic-Tac-Toe — Game Logic
// ============================================

const WIN_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],             // diags
];

let board       = Array(9).fill(null);
let current     = 'X';
let gameOver    = false;
let scores      = { X: 0, O: 0, draw: 0 };

// DOM refs
const cells       = document.querySelectorAll('.cell');
const turnBanner  = document.getElementById('turn-banner');
const turnText    = document.getElementById('turn-text');
const overlay     = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlaySub  = document.getElementById('overlay-sub');
const overlayBtn  = document.getElementById('overlay-btn');
const resetBtn    = document.getElementById('reset-btn');
const clearBtn    = document.getElementById('clear-btn');
const scoreX      = document.getElementById('score-x-val');
const scoreO      = document.getElementById('score-o-val');
const scoreDraw   = document.getElementById('score-draw');
const cardX       = document.getElementById('score-x');
const cardO       = document.getElementById('score-o');

// ── Handlers ──────────────────────────────────

cells.forEach(cell => {
  cell.addEventListener('click', () => handleClick(cell));
});

resetBtn.addEventListener('click', resetRound);
clearBtn.addEventListener('click', clearScores);
overlayBtn.addEventListener('click', () => {
  overlay.classList.add('hidden');
  resetRound();
});

// ── Core ──────────────────────────────────────

function handleClick(cell) {
  const idx = Number(cell.dataset.index);
  if (gameOver || board[idx]) return;

  board[idx] = current;
  cell.textContent = current;
  cell.classList.add(current.toLowerCase(), 'taken');

  const winner = checkWinner();

  if (winner) {
    highlightWin(winner.combo);
    scores[current]++;
    updateScoreboard();
    showOverlay(`PLAYER ${current} WINS! 🎉`, 'WINNER');
    gameOver = true;
  } else if (board.every(Boolean)) {
    scores.draw++;
    updateScoreboard();
    showOverlay("IT'S A DRAW", 'DRAW');
    gameOver = true;
  } else {
    current = current === 'X' ? 'O' : 'X';
    updateTurnBanner();
  }
}

function checkWinner() {
  for (const combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], combo };
    }
  }
  return null;
}

function highlightWin(combo) {
  combo.forEach(i => cells[i].classList.add('win-cell'));
}

// ── UI helpers ────────────────────────────────

function updateTurnBanner() {
  turnText.innerHTML = `PLAYER <strong>${current}</strong>'s TURN`;
  cardX.classList.toggle('active-turn', current === 'X');
  cardO.classList.toggle('active-turn', current === 'O');
}

function updateScoreboard() {
  scoreX.textContent  = scores.X;
  scoreO.textContent  = scores.O;
  scoreDraw.textContent = scores.draw;
}

function showOverlay(title, sub) {
  overlayTitle.textContent = title;
  overlaySub.textContent   = sub;
  overlay.classList.remove('hidden');
}

// ── Reset / Clear ─────────────────────────────

function resetRound() {
  board    = Array(9).fill(null);
  current  = 'X';
  gameOver = false;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.className   = 'cell';
  });

  cardX.classList.add('active-turn');
  cardO.classList.remove('active-turn');
  updateTurnBanner();
}

function clearScores() {
  scores = { X: 0, O: 0, draw: 0 };
  updateScoreboard();
  resetRound();
}

// ── Init ──────────────────────────────────────
updateTurnBanner();
