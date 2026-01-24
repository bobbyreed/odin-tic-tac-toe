function Player(name, mark){
    this.name = name;
    this.mark = mark;
}

const player1 = new Player(prompt("Enter name for Player 1:", "Player 1"), prompt("Enter mark for Player 1:", "X"));
const player2 = new Player(prompt("Enter name for Player 2:", "Player 2"), prompt("Enter mark for Player 2:", "O"));

console.log(`${player1.name} will use ${player1.mark} as mark`);
console.log(`${player2.name} will use ${player2.mark} as mark`);

const p1name = document.getElementById('p1-name');
p1name.innerText = player1.name;
const p1mark = document.getElementById('p1-mark');
p1mark.innerText = player1.mark;
const p2name = document.getElementById('p2-name');
p2name.innerText = player2.name;
const p2mark = document.getElementById('p2-mark');
p2mark.innerText = player2.mark;
