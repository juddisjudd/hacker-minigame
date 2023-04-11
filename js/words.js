const words = ["banana", "guitar", "ocean", "peacock", "mountain", "candle", "rainbow", "butterfly", "coffee", "dragonfly"];

export function generateRandomWord() {
  const randomWords = [];

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    randomWords.push(words[randomIndex]);
  }

  return randomWords;
}
