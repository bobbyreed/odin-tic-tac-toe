export const Gameboard = (function () {
    const htmlBoard = document.querySelector('gameboard');

    //create array for cells
    const cells = [];
    //assign cell divs to array
    for (let index = 0; index < 9; index++) {
        cells.push(document.getElementById(`cell${index}`));
        cells[index].addEventListener("click", function (e) {
            //todo: Add function call for adding mark to this cell that is current player
            cells[index].innerText = 
            console.log(`cell ${index} clicked`)
        
        });
    }
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



