export const password = "overextended";
export let isUnlocked = false;
export let failedAttempts = 0;

export function handleAuthentication(command, outputElement) {
  if (!isUnlocked) {
    if (command === password) {
      outputElement.innerHTML += "<p class='success'>Login successful</p>";
      isUnlocked = true;
      failedAttempts = 0;
      printPrompt();
    } else {
      failedAttempts++;
      if (failedAttempts >= 3) {
        outputElement.innerHTML += "<p class='error'>Too many failed attempts. Try again later.</p>";
      } else {
        outputElement.innerHTML += "<p class='error'>Login failed</p>";
        printPrompt();
      }
    }
  }
}

export function printPrompt() {
  const outputElement = document.getElementById("output");
  const promptSymbolElement = document.getElementById("prompt-symbol");

  if (isUnlocked) {
    promptSymbolElement.textContent = "root@kali:~#";
  } else {
    promptSymbolElement.textContent = "$";
    outputElement.innerHTML += "<p>Please enter password to proceed</p>";
  }
}