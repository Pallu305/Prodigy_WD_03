const squares = document.querySelectorAll('.square');
const message = document.querySelector('.message');
const resetButton = document.querySelector('.reset-button');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function handleClick(event) {
    const index = event.target.id;

    if (board[index] !== '') {
        return;
    }

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkWin();
    checkTie();

    changePlayer();
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
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            message.textContent = `${board[a]} wins!`;
            squares.forEach(square => square.style.pointerEvents = 'none');
        }
    }
}

function checkTie() {
    if (!board.includes('')) {
        message.textContent = 'It\'s a tie!';
        squares.forEach(square => square.style.pointerEvents = 'none');
    }
}

resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    squares.forEach(square => {
        square.textContent = '';
        square.style.pointerEvents = 'all';
    });
    message.textContent = '';
    currentPlayer = 'X';
});

squares.forEach(square => square.addEventListener('click', handleClick));