const darkSwitch = document.querySelector("label");

let cMove = "";
        let pMove = "";
        let pWins = 0;
        let cWins = 0;
        let gameCount = 0;
        let computerMove;

        function getComputerMove(){
            computerMove = Math.floor((Math.random(0,3) * 10) / 3.33);
            //Check randomly created number from line above
                //console.log(computerMove);
            switch(computerMove) {
                case 0:
                 cMove = "paper";
                break;
                case 1:
                 cMove = "rock";
                break;
                case 2:
                 cMove = "scissors";
                break;
                }
            //Check the switch output
        }
        
        function newGame(){
            if(gameCount >= 5){
                if(pWins > cWins){
                    alert("Player wins with " + pWins + " wins to the computer's shameful " + cWins + " wins.")
                }
                else if(cWins>pWins){
                    alert("Computer wins with " + cWins + " wins to the player's shameful " + pWins + " wins.")
                }
                gameOver();
            }
            else{
                getComputerMove();
                //console.log(cMove);
                getPlayerMove();
            }
            
        }
        function gameOver(){
            gameCount = 0;
        }

        function getPlayerMove(){
            pMove = prompt("Paper, rock, or scissors?");
            cMove = cMove.toLowerCase();
            pMove = pMove.toLowerCase();
            //console.log(cMove + " " + pMove);
                switch(cMove){
                    case "rock":
                        switch(pMove){
                            case "paper":
                                alert("You played paper and your opponent played rock. You win!");
                                pWins ++;
                                gameCount++;
                            break;
                            case "rock":
                                alert("You played rock and your opponent played rock. Draw. The worst outcome.");
                                gameCount++;
                            break;
                            case "scissors":
                                alert("You played scissors and your opponent played rock. You lose and have unusable scissors.");
                                cWins++;
                                gameCount++;
                            break;
                        }
                        break;
                    case "paper":
                        switch(pMove){
                            case "paper":
                                alert("Double paper. Draw. The worst outcome.");
                                gameCount++;
                            break;
                            case "rock":
                                alert("Your rock done covered, yo. Computer wins.");
                                gameCount++;
                                cWins++;
                            break;
                            case "scissors":
                                alert("That paper is now confetti. Enjoy your party, computer loser!");
                                gameCount++;
                                pWins++;
                            break;
                        }
                        break;
                    case "scissors":
                        switch(pMove){
                            case "paper":
                                alert("The scissors have cut your paper into confetti. Computer wins.")
                                cWins++;
                                gameCount++;
                            break;
                            case "rock":
                                alert("ROCK SMASH SCISSORS! YOU VICTOR!")
                                pWins++;
                                gameCount++;
                            break;
                            case "scissors":
                                alert("You played scissors and your opponent played scissors. Draw. The worst outcome.")
                                gameCount++;
                            break;
                        }   
                    break;
                }
                newGame();
            }