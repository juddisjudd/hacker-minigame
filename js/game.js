import { generateRandomWord } from "./words.js";
import { printPrompt } from "./authentication.js";
import { handleAuthentication } from "./authentication.js";

let gameRound = 0;
let gameFailures = 0;
let isGameRunning = false;

export function startGame(outputElement, inputForm) {
  if (gameRound < 3) {
    isGameRunning = true;
    const words = generateRandomWord();
    console.log(words); // Debugging line
    outputElement.innerHTML += `<p>Type the following words within 15 seconds: ${words.join(', ')}</p>`;
    const startTime = Date.now();

    const timerElement = document.createElement("div");
    timerElement.classList.add("timer");
    timerElement.innerHTML = "15";
    outputElement.appendChild(timerElement);

    const gameListener = (event) => {
      event.preventDefault();
      const inputElement = document.getElementById("input");
      const userInputWords = inputElement.value.trim().toLowerCase().split(' ');
      console.log("User input: ", userInputWords); // Debugging line

      if (isGameRunning) {
        const elapsedTime = Date.now() - startTime;
        const wordsMatch = words.every((word, index) => word === userInputWords[index]);

        if (wordsMatch) {
          if (elapsedTime <= 15000) {
            outputElement.innerHTML += "<p class='success'>Round completed successfully</p>";
          } else {
            outputElement.innerHTML += "<p class='error'>Round failed: time exceeded</p>";
            gameFailures++;
          }
        } else {
          outputElement.innerHTML += "<p class='error'>Round failed: incorrect words</p>";
          gameFailures++;
        }

        inputElement.value = "";
        gameRound++;

        clearTimeout(timeoutId);
        clearInterval(timerIntervalId);
        if (gameRound < 3 && gameFailures < 2) {
          inputForm.removeEventListener("submit", gameListener);
          startGame(outputElement, inputForm);
        } else {
          if (gameFailures < 2) {
            outputElement.innerHTML += "<p class='success'>Access Granted</p>";
          } else {
            outputElement.innerHTML += "<p class='error'>Failed</p>";
          }
          inputForm.removeEventListener("submit", gameListener);
        }
      } else {
        handleAuthentication(userInputWords.join(' '), outputElement);
      }

      inputElement.value = "";
      // prevent the default behavior of the Enter key
      return false;
    };

    inputForm.removeEventListener("submit", handleAuthentication);
    inputForm.addEventListener("submit", gameListener);

    const timeoutId = setTimeout(() => {
      inputForm.removeEventListener("submit", gameListener);
      outputElement.innerHTML += "<p class='error'>Round failed: time exceeded</p>";
      gameFailures++;
      gameRound++;

      if (gameRound < 3 && gameFailures < 2) {
        startGame(outputElement, inputForm);
      } else {
        if (gameFailures < 2) {
          outputElement.innerHTML += "<p class='success'>Access Granted</p>";
        } else {
          outputElement.innerHTML += "<p class='error'>Failed</p>";
        }
      }
    }, 15000);

    const timerIntervalId = setInterval(() => {
      const remainingTime = Math.max(0, 15 - Math.floor((Date.now() - startTime) / 1000));
      timerElement.innerHTML = remainingTime.toString();
    }, 1000);
  }
}
