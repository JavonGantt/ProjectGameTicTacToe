let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let playersTurn = 1;

function startGame() {
    $(".button").off("click"); // Remove previous click event handlers
    $(".button").on("click", function () {
        $("h1").text("Player " + playersTurn);
        $(".space").off("click"); // Remove previous click event handlers
        $(".space").on("click", function () {
            let space = parseInt(this.id);
            let position = "#" + this.id;

            if (boardHasValue(space)) {
                return; // Prevent a player from clicking on a square that has already been selected
            }

            isPicked(space, position, playersTurn);
            playersTurn = playersTurn === 1 ? 2 : 1;
            $("h1").text("Player " + playersTurn);
        });
    });
}

startGame(); // Initial call to start the game

// Need to make a function that will check if position has been picked
function isPicked(space, position, currentPlayer) {
    if (space <= 3) {
        let y = 0;
        let x = space - 1;
        let selectedBoardPosition = board[y][x];
        if (positionCheck(selectedBoardPosition)) {
            board[y][x] = currentPlayer;
            let playerSymbol = currentPlayer === 1 ? 'x' : 'o';
            $(position).prepend('<img src="./images/' + playerSymbol + '.png" class="align-fix" alt="' + playerSymbol + '">');
        }
    } else if(space >= 4 && space <= 6){
        let y = 1;
        let x = space - 4;
        let selectedBoardPosition = board[y][x];
        if (positionCheck(selectedBoardPosition)) {
            board[y][x] = currentPlayer;
            let playerSymbol = currentPlayer === 1 ? 'x' : 'o';
            $(position).prepend('<img src="./images/' + playerSymbol + '.png" class="align-fix" alt="' + playerSymbol + '">');
        }
    } else if(space >= 7 && space <= 9){
        let y = 2;
        let x = space - 7;
        let selectedBoardPosition = board[y][x];
        if (positionCheck(selectedBoardPosition)) {
            board[y][x] = currentPlayer;
            let playerSymbol = currentPlayer === 1 ? 'x' : 'o';
            $(position).prepend('<img src="./images/' + playerSymbol + '.png" class="align-fix" alt="' + playerSymbol + '">');
        }
    }

    // Inside the isPicked function, after updating the board with the player's move
    if (checkWinner(currentPlayer)) {
        $("h1").text("Player " + currentPlayer + " wins!");
        setTimeout(function() {
            resetBoard(); // Reset the board
        }, 2000); // Adjust the delay as needed (in milliseconds)
        requestAnimationFrame(function() {
            $("h1").text("Player " + currentPlayer + " wins!"); // Ensure DOM updates
        });
        return; // Exit the function to prevent further moves
    }
}

function positionCheck(value) {
    return value === 0;
}

function boardHasValue(space) {
    let row = Math.floor((space - 1) / 3);
    let col = (space - 1) % 3;
    return board[row][col] !== 0;
}

function checkWinner(currentPlayer) {
    // Check rows, columns, and diagonals for a win
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
            return true; // Row win
        }
        if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
            return true; // Column win
        }
    }

    if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
        return true; // Diagonal win (top-left to bottom-right)
    }

    if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
        return true; // Diagonal win (top-right to bottom-left)
    }

    return false; // No winner
}

function resetBoard() {
    // Reset the board array to its initial state
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    // Clear the images from the board
    $(".space").html("");

    // Reset the playersTurn to player 1

    $("h1").text("Tic-Tac-Toe")
}