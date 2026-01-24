const Game = (function () {
    Gameboard.gameOver().setGameOver(false);
    playerSetup();
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
    
    const checkWin = (winningCombinations) => {
        console.log("Checking for a win...");
        for (const combination of winningCombinations) {
            //deconstructs the combination array into a, b, c to check separately
            const [a, b, c] = combination;
            console.log(`Checking ${a}, ${b}, and ${c} which are ${Gameboard.getBoard()[a]}, ${Gameboard.getBoard()[b]}, and ${Gameboard.getBoard()[c]} `)
            if (Gameboard.getBoard()[a] && Gameboard.getBoard()[a] === Gameboard.getBoard()[b] && Gameboard.getBoard()[a] === Gameboard.getBoard()[c]) {
                console.log("Winning combo detected!");
                return;
            }
        }
        
        return;
    }

    const playRound = (index) => {
        if (Gameboard.getBoard()[index] === "") {
            Gameboard.setMark(index, currentPlayer.getMark());
            console.log(`Board: ${Gameboard.getBoard()[0]} ${Gameboard.getBoard()[1]} ${Gameboard.getBoard()[2]}\n       ${Gameboard.getBoard()[3]} ${Gameboard.getBoard()[4]} ${Gameboard.getBoard()[5]}\n       ${Gameboard.getBoard()[6]} ${Gameboard.getBoard()[7]} ${Gameboard.getBoard()[8]}`);
            
            round++;
            checkWin(winningCombinations);
            console.log(`isGameOver is ${Gameboard.isGameOver}`);
            if (Gameboard.isGameOver) {
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
        console.log(`Gameboard.gameOver().getGameOver() is ${Gameboard.gameOver().getGameOver()}`);
        while (!Gameboard.gameOver().getGameOver() && round < 9) {
            const index = parseInt(prompt(`${currentPlayer}'s turn. Enter a cell index (0-8):`), 10);
            playRound(index);
        }
    }

    const resetGame = () => {
        Gameboard.reset();
        round = 0;
        currentPlayer = coinToss();
    }

    const endGame = (currentPlayer) => {
        alert(`${currentPlayer} is victorious!`);
        resetGame();
    }
    console.log(`${currentPlayer} starts first!`);
    
    return { getCurrentPlayer, playRound, resetGame, playGame };
});

const game = Game();