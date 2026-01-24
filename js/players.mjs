function Player(name, mark){
    this.name = name;
    this.mark = mark;
}

const player1 = new Player(prompt("Enter name for Player 1:", "Player 1"), prompt("Enter mark for Player 1:", "X"));
const player2 = new Player(prompt("Enter name for Player 2:", "Player 2"), prompt("Enter mark for Player 2:", "O"));

console.log(`${player1.name} will use ${player1.mark} as mark`);
console.log(`${player2.name} will use ${player2.mark} as mark`);