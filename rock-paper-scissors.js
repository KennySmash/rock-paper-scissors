// moving some properties into a top level object
let gameState = {
   choiceButton:  {},
   log:           {},
   gamesLeft:      0,
   humanScore:     0,
   compScore:      0
}

function setup(){
   //Setting up the choice button
   gameState.choiceButton = document.querySelector("#choiceButton");

   gameState.choiceButton.addEventListener('click', ()=>{
      // Tells the game we wanna start with 5 rounds
      playGame(5);
   })

   console.log('Setup done', gameState)
}

function getComputerChoice() {
   let number = Math.random();
   if (number < 0.33) {
      return "rock"
   } else if (number < 0.66) {
      return "paper"
   } else {
      return "scissor";
   }
}

//Making the only thing this function does - collecting the player choice
function getHumanChoice() {
   let choice = prompt("Whats your choice?");

   if (["rock", "r"].includes(choice)) return "rock";
   if (["paper", "p"].includes(choice)) return "paper";
   if (["scissors", "s"].includes(choice)) return "scissors";

   return null;
}

// all this does is work out the game text
function evaluateRound(human, comp, callback) {
   switch (human) {
      case "rock":
         if (computerChoice === "scissors") {
            return "You win! Rock beats Scissors.";
         } else if (computerChoice === "paper") {
            return "You lose Paper beats Rock!";
         } else {
            return " It is a tie!"
         }

      case "paper":
         if (computerChoice === "rock") {
            return "You win! Paper beats Rock.";
         } else if (computerChoice === "scissors") {
            return "You lose Scissors beats Paper!";
         } else {
            return " It is a tie!"
         }
      case "scissors":
         if (computerChoice === "paper") {
            return "You win! Rock beats Scissors.";
         } else if (computerChoice === "rock") {
            return "You lose Rock beats Scissors!";
         } else {
            return " It is a tie!"
         }
      default:
         return "Invalid input. Please use 'Rock', 'Paper', 'Scissors'."
   }
}

// we pass in the number of rounds we wanna play
function playGame(rounds) {
   //we're setting up the number of rounds
   gameState.gamesLeft = rounds

   while(gameState.gamesLeft > 0){
      //collect the human choice
      humanSelection = getHumanChoice();
      if (humanSelection === null){ console.error('something went very wrong with the humanChoice')}
      
      //get the bots play
      computerSelection = getComputerChoice();

      //calculate the round and get the result
      let result = evaluateRound(humanSelection, computerSelection)
      
      // run the result though a compare so we can add to the scores
      if (result.contains("You win")){
         gameState.humanScore =+ 1;
      } else if (result.contains("You lose")) {
         gameState.compScore =+ 1;
      }

      // logging this single round
      console.log({ 
         "humanScore": gameState.humanScore, 
         "Comp": cgameState.compScore, 
         "MyHand": humanSelection, 
         "TheirHand": computerSelection 
      }); 

      // Take a game off the gamesleft variable and loop back to the while
      gameState.gamesLeft--;
   }

   // logging the full set of games
   console.log('Here are the Results', "you won ", gameState.humanScore, "out of ", rounds, " games")
   
   //resetting the scoreboards
   gameState.humanScore = 0;
   gameState.computerScore = 0;
}


// running setup once to get it all up
setup();