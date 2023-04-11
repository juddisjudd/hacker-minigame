import { handleAuthentication, printPrompt, isUnlocked } from "./authentication.js";
import { startGame } from "./game.js";

const inputForm = document.getElementById("input-form");

function handleCommand(event) {
  event.preventDefault();
  const inputElement = document.getElementById("input");
  const command = inputElement.value.trim();
  const outputElement = document.getElementById("output");

  if (!isUnlocked) {
    handleAuthentication(command, outputElement);
  } else {
    const splitCommand = command.split(" ");
    switch (splitCommand[0]) {
      case "run":
        if (splitCommand[1] === "hacksaw.sh") {
          outputElement.innerHTML += "<p>Running hacksaw.sh...</p>";
          const progressBar = document.createElement("div");
          progressBar.classList.add("progress-bar");
          outputElement.appendChild(progressBar);
          let timeElapsed = 0;
          const maxTime = 15000; // 15 seconds
          const intervalId = setInterval(() => {
            timeElapsed += 500;
            const progressBarWidth = progressBar.offsetWidth;
            const outputWidth = outputElement.offsetWidth;
            if (timeElapsed >= maxTime) {
              clearInterval(intervalId);
              outputElement.removeChild(progressBar);
            } else {
              progressBar.style.width = `${progressBarWidth + 20}px`; // Increased the increment to 20px
            }

            // Directly set the access code without generating a random number
            if (timeElapsed >= maxTime) {
              outputElement.innerHTML += "<p class='success'>Access Granted, Initializing Brute-Force Attack!</p>";
              inputForm.removeEventListener("submit", handleCommand);
              setTimeout(() => {
                startGame(outputElement, inputForm);
              }, 5000); // 5-second delay before starting the game
            }
          }, 500);
        }
        break;
      default:
        outputElement.innerHTML += "<p class='error'>Unknown command</p>";
        break;
    }
  }

  inputElement.value = "";
}

inputForm.addEventListener("submit", handleCommand);

printPrompt();

document.getElementById("input").focus();
