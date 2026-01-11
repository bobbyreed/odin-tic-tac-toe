const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const setMark = (index, mark) => {
        board[index] = mark;

    }
    const isGameOver = false;
    const gameOver = (isGameOver) => {
        const getGameOver = () => isGameOver;
        const setGameOver = (value) => { isGameOver = value;
    }
        return { getGameOver, setGameOver };
    const reset = () => { board.fill(""); }
    

    return { getBoard, setMark, reset, coinToss };
}})();

const player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark };
}

const Game = (function () {
    const coinToss= () => {
        console.log("Flipping a coin to decide who starts...");
        return Math.random() < 0.5 ? player1 : player2;
    }

    let currentPlayer = coinToss();
    let round = 0;
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

    

    const getCurrentPlayer = () => currentPlayer;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
    
    const checkWin = () => {
        for (const combination of winningCombinations) {
            //deconstructs the combination array into a, b, c to check separately
            const [a, b, c] = combination;
            if (Gameboard.getBoard()[a] && Gameboard.getBoard()[a] === Gameboard.getBoard()[b] && Gameboard.getBoard()[a] === Gameboard.getBoard()[c]) {
                return Gameboard.gameOver(true);
            }
        }
        return;
    }

    const playRound = (index) => {
        if (Gameboard.getBoard()[index] === "") {
            Gameboard.setMark(index, currentPlayer.getMark());
            round++;
            checkWin();
            if (Gameboard.gameOver().getGameOver()) {
                console.log(`${currentPlayer.getName()} wins!`);
                return true;
            } else if (round === 9) {
                console.log("It's a tie!");
                return true;
            } else {
                switchPlayer();
                return false;
            }
        } else {
            console.log("Cell already occupied. Choose another cell.");
            return false;
        }
    }

    const playGame = () => {
        Gameboard.gameOver().setGameOver(false);
        while (!Gameboard.gameOver().getGameOver() && round < 9) {
            const index = parseInt(prompt(`${currentPlayer.getName()}'s turn. Enter a cell index (0-8):`), 10);
            playRound(index);
        }

    const resetGame = () => {
        Gameboard.reset();
        round = 0;
        currentPlayer = coinToss();
    }
    console.log(`${currentPlayer.getName()} starts first!`);
    
    return { getCurrentPlayer, playRound, resetGame };
}});

const player1 = player(prompt("Enter name for Player 1:"), "X");
const player2 = player(prompt("Enter name for Player 2:"), "O");

console.log(`${player1.getName()} is ${player1.getMark()}`);
console.log(`${player2.getName()} is ${player2.getMark()}`);

const game = Game();
game.playGame();