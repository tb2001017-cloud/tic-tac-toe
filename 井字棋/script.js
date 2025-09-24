const board = document.getElementById('board');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// 赢的组合
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// 创建棋盘
function createBoard() {
  board.innerHTML = '';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  message.textContent = `玩家 ${currentPlayer} 的回合`;
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

// 处理点击事件
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (gameState[index] !== '' || !gameActive) {
    return;
  }

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWinner()) {
    message.textContent = `玩家 ${currentPlayer} 获胜！`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== '')) {
    message.textContent = '平局！';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `玩家 ${currentPlayer} 的回合`;
}

// 检查胜利条件
function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] === currentPlayer &&
           gameState[b] === currentPlayer &&
           gameState[c] === currentPlayer;
  });
}
audio.muted=true;
// 重置游戏
function resetGame() {
  createBoard();
}

// 初始化游戏
createBoard();