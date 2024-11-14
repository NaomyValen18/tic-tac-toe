const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
let cells = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

function createBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.addEventListener('click', () => handleClick(index));
    cellElement.textContent = cell;
    board.appendChild(cellElement);
  });
}

function handleClick(index) {
  if (cells[index] || gameOver) return;
  cells[index] = currentPlayer;
  createBoard();
  if (checkWin()) {
    message.textContent = `Player ${currentPlayer} wins!`;
    gameOver = true;
  } else if (cells.every(cell => cell)) {
    message.textContent = 'It\'s a draw!';
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function restartGame() {
  cells = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  message.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

restartButton.addEventListener('click', restartGame);

createBoard();