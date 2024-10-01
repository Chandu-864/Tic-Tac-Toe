const gameCells = document.querySelectorAll(".cell");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
let alertBox = document.querySelector(".alert-box");

let currentPlayer = 'O';
let nextPlayer = 'X';
let playerTurn = currentPlayer;

function startGame() {
    const gameCells = document.querySelectorAll(".cell");
    gameCells.forEach(function(cells){
        cells.addEventListener('click', gameProcess)
    });
};

function gameProcess(e) {
    if(e.target.textContent == ''){
        e.target.textContent = playerTurn;
        if (checkWin()) {
            console.log(`${playerTurn} is winner`);
            alertBox.style.display = 'block';
            alertBox.innerHTML = "Player(" +playerTurn + ") is winner!"
            disable();
        }
        else if (checkTie()){
            console.log("The game is a Tie");
            alertBox.style.display = 'block';
            alertBox.innerHTML = "The game is a Tie!";
            disable();
        }
        else {
            changePlayer();
        }
    }  
};

function changePlayer() {
    if (playerTurn == currentPlayer) {
        playerTurn = nextPlayer;
        alertBox.style.display = 'block';
        alertBox.innerHTML = "turn for player: " + playerTurn;
        gameCellscell.style.display.color = 'white';
    }
    else {
        playerTurn = currentPlayer;
        alertBox.style.display = 'block';
        alertBox.innerHTML = "turn for player: " + playerTurn;
    }
};

function checkWin() {
    const winCond = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (i = 0; i < winCond.length; i++) {
        const[pos1, pos2, pos3] = winCond[i];
        if (gameCells[pos1].textContent != '' && gameCells[pos1].textContent == gameCells[pos2].textContent && gameCells[pos1].textContent == gameCells[pos3].textContent) {
            return true;
        }
    }
    return false;  
}

function checkTie() {
    let emptyCells = 0;
    gameCells.forEach(function(cell){
        if(cell.textContent == ''){
            emptyCells++;
        }
    })
    return emptyCells == 0 && !checkWin();
}

function disable() {
    gameCells.forEach(function(cell) {
        cell.removeEventListener('click', gameProcess)
        cell.classList.add('disabled');
    });
}

function restart() {
    gameCells.forEach(function(cell) {
        cell.textContent = '';
        cell.classList.remove('disabled');
        alertBox.style.display = 'none';
    })
    startGame();
}

document.addEventListener('DOMContentLoaded', function() {
    startGame()
});

