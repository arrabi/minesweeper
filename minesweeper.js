let minefield = document.getElementById('minefield');
let gameIsOver = false;
class Cell {
    constructor() {
        this.mine = false;
        this.adjacentCells = 0;
        this.revealed = false;
        this.flagged = false;
    }
}
let cells = Array(10).fill().map(() => Array(10).fill(new Cell()));
//cancel right click menu on minefield
minefield.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Function to create a new game
function newGame(numMines) {
    minefield.innerHTML = '';
    createMinefield();
    gameIsOver = false;
    cells = Array(10).fill().map(() => Array(10).fill().map(() => new Cell())); // Modified line
    generateMines(numMines);
    updateAdjacentCells();
    printGameStatus();
}

// Function to generate mines randomly
function generateMines(numMines) {
    for(let i = 0; i < numMines; i++) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        if(cells[x][y].mine) {
            i--;
            continue;
        }
        cells[x][y].mine = true;
    }
}

// Function to create the minefield
function createMinefield() {
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.onclick = () => reveal(i, j);
            cell.oncontextmenu = () => flag(i, j);
            minefield.appendChild(cell);
        }
    }
}

// Function to update the adjacent cells count
function updateAdjacentCells() {
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            let count = 0;
            for(let x = Math.max(i - 1, 0); x <= Math.min(i + 1, 9); x++) {
                for(let y = Math.max(j - 1, 0); y <= Math.min(j + 1, 9); y++) {
                    if(cells[x][y].mine) count++;
                }
            }
            cells[i][j].adjacentCells = count;
        }
    }
}

// Function to check if the game is over
function checkGameOver() {
    let isGameOver = false;
    let isWin = true;

    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            if (cells[i][j].mine && cells[i][j].revealed) {
                isGameOver = true;
                isWin = false;
                break;
            }
            if (!cells[i][j].mine && !cells[i][j].revealed) {
                isWin = false;
            }
            if (cells[i][j].mine && !cells[i][j].flagged) {
                isWin = false;
            }
        }
        if (isGameOver) {
            break;
        }
    }

    if (isGameOver || isWin ) {
        gameIsOver = true;
        if (isWin) {
            showDialog('Congratulations! You won!');
        } else {
            showDialog('Game Over! You lost!');
        }
    }
}

function showDialog(message) {
    // Replace this with your own dialog implementation
    alert(message);
}

//function to reveal adjacent cells
//if the cell is not adjacent to mines, then reveal the adjacent cells
function revealAdjacent(i, j) {
    for(let x = Math.max(i - 1, 0); x <= Math.min(i + 1, 9); x++) {
        for(let y = Math.max(j - 1, 0); y <= Math.min(j + 1, 9); y++) {
            if(!cells[x][y].mine) reveal(x, y);
        }
    }
}

function reveal(i, j) {
    let cell = minefield.childNodes[i * 10 + j];
    if (gameIsOver) return;
    // Add your logic to reveal the cell
    if (cells[i][j].revealed) {
        return; // Do nothing if the cell is already revealed
    }
    cells[i][j].revealed = true;
    if (cells[i][j].mine) {
        cell.classList.add('mine');
    } else {
        let count = cells[i][j].adjacentCells;
        cell.classList.add('revealed');
        cell.textContent = count || '';
        if (!count) revealAdjacent(i, j);
    }
    printGameStatus();
    // Delay the call to checkGameOver
    setTimeout(checkGameOver, 1);
}

//function to flag a cell with right click
function flag(i, j) {
    let cell = minefield.childNodes[i * 10 + j];
    if (gameIsOver) return;
    if(cells[i][j].revealed) {
        return; // Do nothing if the cell is already revealed
    }
    cells[i][j].flagged = !cells[i][j].flagged;
    if(cells[i][j].flagged) {
        cell.classList.add('flag');
    } else {
        cell.classList.remove('flag');
    }
    
    printGameStatus();    
    // Delay the call to checkGameOver
    setTimeout(checkGameOver, 1);
}

function printGameStatus() {
    //show number of mines flagged already in id=messageBox div
    let flaggedMines = 0;
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            if(cells[i][j].flagged) flaggedMines++;
        }
    }
    let totalMines = 0;
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            if(cells[i][j].mine) totalMines++;
        }
    }
    document.getElementById('messageBox').textContent = 'Mines flagged ' + flaggedMines + ' out of ' + totalMines;
}    

newGame(10);
