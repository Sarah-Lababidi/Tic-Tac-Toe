const tds = document.querySelectorAll('td');
const game = document.querySelector('#game');
const gameover = document.querySelector('div#gameover');
const result = document.querySelector('#gameover h1');
const reset = document.querySelector('button#reset');

let board = new Array(9);
let winner = '';
let winningTd = [];
let isGameover = false;

reset.addEventListener('click', resetGame);

for (let td of tds) {
    td.addEventListener('click', () => {
        if (td.innerText === '') {
            td.innerText = 'O';
            board[parseInt(td.getAttribute('id'))] = 'O';
            checkBoard();
            if(!isGameover){
                computerTurn();
                checkBoard();
            }
        }
    });
}

function computerTurn() {
    // check if there is an empty cell 
    let emptyCell = false;
    for (let td of tds) {
        if (td.innerText === '') {
            emptyCell = true;
            break;
        }
    }
    if (emptyCell) {
        // choose an empty random cell at the board
        while (true) {
            let rand = Math.floor(Math.random() * 9);
            if (tds[rand].innerText === '') {
                tds[rand].innerText = "X";
                board[rand] = "X";
                break;
            }
        }
    }
}

function endGame() {
    let color = ''
    switch (winner) {
        case "tie":
            result.innerText = "Tie Game!";
            gameover.classList.add('tie');
            break;
        case "player":
            result.innerText = "You Win!";
            gameover.classList.add('win');
            color = '#96bb7c';
            break;
        case "computer":
            result.innerText = "You Lose!";
            gameover.classList.add('lose');
            color = '#f05454';
            break;
        default:
            result.innerText = "";
    }

    for (let id of winningTd) {
        document.getElementById(id).style.backgroundColor = color;
    }

    game.classList.add('fadeout');
    gameover.classList.remove('hide');
    gameover.classList.add('show');
}

function checkBoard() {

    // check rows
    for (let i = 0; i < 9; i += 3) {

        if (((board[0 + i] === board[1 + i]) && (board[1 + i] === board[2 + i])) && (board[0 + i] !== undefined)) {
            winningTd = [0 + i, 1 + i, 2 + i];
            if (board[0 + i] === 'O') {
                winner = 'player';
            } else {
                winner = 'computer';
            }
            isGameover = true;
            endGame();
            return;
        }
    }
    // check columns
    for (let i = 0; i < 3; i++) {
        if (((board[0 + i] === board[3 + i]) && (board[3 + i] === board[6 + i])) && (board[0 + i] !== undefined)) {
            winningTd = [0 + i, 3 + i, 6 + i];
            if (board[0 + i] === 'O') {
                winner = 'player';
            } else {
                winner = 'computer';
            }
            isGameover = true;
            endGame();
            return;
        }
    }
    // check diagonals
    if (((board[0] === board[4]) && (board[4] === board[8])) && (board[0] !== undefined)) {
        winningTd = [0, 4, 8];
        if (board[0] === 'O') {
            winner = 'player';
        } else {
            winner = 'computer';
        }
        isGameover = true;
        endGame();
        return;
    }
    if (((board[2] === board[4]) && (board[4] === board[6])) && (board[2] !== undefined)) {
        winningTd = [2, 4, 6];
        if (board[2] === 'O') {
            winner = 'player';
        } else {
            winner = 'computer';
        }
        isGameover = true;
        endGame();
        return;
    }
    // check tie game
    let tie = true;
    for (let el of board) {
        if (el === undefined) {
            tie = false;
            break;
        }
    }
    if (tie) {
        winner = "tie";
        isGameover = true;
        endGame();
        return;
    }
}

function resetGame() {
    for (let id of winningTd) {
        document.getElementById(id).style.backgroundColor = '';
    }
    winningTd = [];
    game.classList.remove('fadeout');
    isGameover = false;

    gameover.classList.add('hide');
    gameover.classList.remove('show', 'win', 'lose', 'tie');

    board = new Array(9);

    winner = '';
    for (let td of tds) {
        td.innerText = '';
    }
}


