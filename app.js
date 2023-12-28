let roundCount = 1;
let maxRound = 5;
let playerScore = 0;
let computerScore = 0;

const optionOutput = document.querySelectorAll('.player-output');
const optionInput = document.querySelectorAll('.option-svg');
const endScreen = document.querySelector('.end-window');
const overlay = document.querySelector('.overlay');
const playerScoreOutput = document.querySelector('.player-score');
const computerScoreOutput = document.querySelector('.computer-score');
const resetBtn = document.querySelector('.reset-btn');
const winnerOutput = document.querySelector('.winner');

const chooseRandom = () => {
  const values = ['rock', 'paper', 'scissors'];
  return values[Math.floor((Math.random() * 100) % 3)];
}

const checkWinner = (playerMove, gameMove) => {
  let winner;
  let winnerElement;

  switch (playerMove) {
    case "rock":
      if(gameMove == "rock") {
        winner = "draw";
        winnerElement = null;
      }
      else if(gameMove == "paper"){
        winner = "computer"
        winnerElement = gameMove;
        computerScore++;
      }
      else {
        winner = "player";
        winnerElement = playerMove;
        playerScore++;
      };

      break;
    case "paper":
      if(gameMove == "paper"){
        winner = "draw";
        winnerElement = null;
      }
      else if(gameMove == "scissors"){
        winner = "computer";
        winnerElement = gameMove;
        computerScore++;
      }
      else{
        winner = "player";
        winnerElement = playerMove;
        playerScore++;
      };

      break;
    case "scissors":
      if(gameMove == "scissors") {
        winner = "draw";
        winnerElement = null;
      }
      else if(gameMove == "paper") {
        winner = "player";
        winnerElement = playerMove;
        playerScore++;
      }
      else{
        winner = "computer"
        winnerElement = gameMove;
        computerScore++;
      };

      break;
  }

  return [winner, winnerElement];
}

const colors = {
  win: "#4CAF50",
  lose: "#FF5252",
  draw: "#9E9E9E"
}

const showWinner = (winner, winnerElement) => {
  if(winnerElement){
    optionOutput.forEach(element => {
      if(element.getAttribute("data-output-svg") == winner) element.style.borderColor = colors.win; 
      else element.style.borderColor = colors.lose;
    })
  }else{
    optionOutput.forEach(element => {
      element.style.borderColor = colors.draw;
    })
  }
}

function playGame(playerMove) {
  let gameMove = chooseRandom();
  let temp = checkWinner(playerMove, gameMove);
  let winner = temp[0];
  let winnerElement = temp[1];

  optionOutput.forEach(element => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    let optionSVG = document.createElement("img");

    element.getAttribute("data-output-svg") == "player" ? optionSVG.setAttribute("src", `svg/${playerMove}.svg`) : optionSVG.setAttribute("src", `svg/${gameMove}.svg`);

    element.appendChild(optionSVG);
  });

  showWinner(winner, winnerElement);

  if (winner != "draw") {
    roundCount++;
  }
  if (roundCount > maxRound) {
    endGame(winner);
  }
}

function resetGame() {
  roundCount = 1;
  playerScore = 0;
  computerScore = 0;

  endScreen.classList.remove("active")
  overlay.classList.remove("active")

  optionOutput.forEach(element => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    element.style.borderColor = "#1c1c1c";
  });
}

function endGame(winner){
  endScreen.classList.add("active");
  overlay.classList.add("active");

  winnerOutput.textContent = playerScore > computerScore ? "You won!" : "You lost.";
  playerScoreOutput.textContent = playerScore;
  computerScoreOutput.textContent = computerScore;


  resetBtn.addEventListener('click', resetGame);
}

optionInput.forEach(element => element.addEventListener("click", (e) => {
  let playerMove = e.target.getAttribute("data-option");
  playGame(playerMove);
}));