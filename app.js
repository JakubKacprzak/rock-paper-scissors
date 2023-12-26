const optionOutput = document.querySelectorAll('.player-output');
const optionInput = document.querySelectorAll('.option-svg');

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
      }
      else {
        winner = "player";
        winnerElement = playerMove;
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
      }
      else{
        winner = "player";
        winnerElement = playerMove;
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
      }
      else{
        winner = "computer"
        winnerElement = gameMove;
      };

      break;
  }

  return [winner, winnerElement];
}

const showWinner = (winner, winnerElement) => {
  const colors = {
    win: "#4CAF50",
    lose: "#FF5252",
    draw: "#9E9E9E"
  }

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

optionInput.forEach(element => element.addEventListener("click", (e) => {
  let playerMove = e.target.getAttribute("data-option");
  let gameMove = chooseRandom();

  let winner = checkWinner(playerMove, gameMove)[0];
  let winnerElement = checkWinner(playerMove, gameMove)[1];
  

  console.log(winner, winnerElement)

  optionOutput.forEach(element => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    let optionSVG = document.createElement("img");
    
    element.getAttribute("data-output-svg") == "player" ? optionSVG.setAttribute("src", `svg/${playerMove}.svg`) : optionSVG.setAttribute("src", `svg/${gameMove}.svg`);
    
    element.appendChild(optionSVG);
  });

  showWinner(winner, winnerElement);
}))