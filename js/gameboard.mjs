const htmlBoard = document.querySelector('gameboard');


const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const setMark = (index, mark) => {
        board[index] = mark;

    }
    const isGameOver = false;
    const gameOver = (isGameOver) => {
        const getGameOver = () => isGameOver;
        const setGameOver = (value) => { 
            console.log(`gameOver before setting: ${isGameOver}`);
            isGameOver = value; 
            console.log(`gameOver after setting: ${isGameOver}`);
            console.log(`setGameOver get check = ${getGameOver.value}`);
        }
        return { getGameOver, setGameOver };
}
    const reset = () => { board.fill(""); }
    

    return { getBoard, setMark, reset, gameOver, isGameOver };
})();