import { player1, player2 } from "./players.mjs";

const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const setMark = (index, mark) => {
        board[index] = mark;
        document.getElementById(`cell${index}`).innerText = mark;
    }
    const isGameOver = false;
    const gameOver = (isGameOver) => {
        const getGameOver = () => isGameOver;
        const setGameOver = (value) => { 
            console.log(`gameOver before setting: ${isGameOver}`);
            isGameOver = value; 
            console.log(`gameOver after setting: ${isGameOver}`);
            console.log(`setGameOver get check = ${getGameOver}`);
        }
        return { getGameOver, setGameOver };
}
    const reset = () => { board.fill(""); }
    

    return { getBoard, setMark, reset, gameOver, isGameOver };
})();

const gameboard = Gameboard;

export const Game = (function () {
    gameboard.gameOver().setGameOver(false);
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

    function waitForMove(){
        return new Promise(resolve => {
            const boardElement = document.querySelector('gameboard');
            
            //define listener logic
            const listener = (e) => {
                //1. Check if the thing clicked swa cell
                if(e.target.id.startsWith('cell')){
                    //2. extract the index (e.g. "cell4" ->4)
                    const index= parseInt(e.target.id.replace('cell',''));  //<- This is a typical pattern that you will see when you want to remove something.
                    //3. Remove the listener immediately so it doesn't fire again
                    boardElement.removeEventListener('click', listener);
                    //4. resolvethe promise with the index
                    resolve(index);
                }
            };
            //Attach the listernto the board
            boardElement.addEventListener('click',listener);            
        })
    }

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
                endGame(currentPlayer.name);
                return;
            }
        }
        
        return;
    }

    const playRound = (index) => {
        if (Gameboard.getBoard()[index] === "") {
            Gameboard.setMark(index, currentPlayer.mark);
            console.log(`Board: ${Gameboard.getBoard()[0]} ${Gameboard.getBoard()[1]} ${Gameboard.getBoard()[2]}\n       ${Gameboard.getBoard()[3]} ${Gameboard.getBoard()[4]} ${Gameboard.getBoard()[5]}\n       ${Gameboard.getBoard()[6]} ${Gameboard.getBoard()[7]} ${Gameboard.getBoard()[8]}`);
            document.getElementById(`cell${index}`).innerText = currentPlayer.mark;
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

    const playGame = async () => {
        Gameboard.gameOver().setGameOver(false);
        while (!Gameboard.gameOver().getGameOver() && round < 9) {
            document.getElementById('instructions-text').innerText = `${currentPlayer.name}'s turn. Click a box to set your ${currentPlayer.mark}`;
            console.log("Waiting for user input...");
            const index = await waitForMove();

            console.log(`user clicked cell ${index}`)

            playRound(index);
        }
    }

    const resetGame = () => {
        gameboard.reset();
        round = 0;
        currentPlayer = coinToss();
    }

    const endGame = (currentPlayer) => {
        alert(`${currentPlayer} is victorious!`);
        window.location.reload();
    }
    console.log(`${currentPlayer.name} starts first!`);
    
    return { getCurrentPlayer, playRound, resetGame, playGame };
});

const game = Game();
game.playGame();