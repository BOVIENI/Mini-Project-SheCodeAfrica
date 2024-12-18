const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Generate a random number between min and max
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Wrap rl.question in a promise for cleaner async/await handling
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Main game logic
async function playGame() {
  console.log("\nWelcome to the Number Guessing Game!");
  console.log("I'm thinking of a number between 1 and 100. Can you guess it?\n");

  const min = 1;
  const max = 100;
  const randomNumber = generateRandomNumber(min, max);
  let attempts = 0;
  let guessedCorrectly = false;

  while (!guessedCorrectly) {
    let input = await askQuestion(`Enter your guess (${min}-${max}): `);
    let guess = parseInt(input);

    // Input validation
    if (isNaN(guess) || guess < min || guess > max) {
      console.log(`Please enter a valid number between ${min} and ${max}.`);
      continue;
    }

    attempts++;

    // Check guess
    if (guess === randomNumber) {
      console.log(`\n🎉 Congratulations! You guessed the correct number ${randomNumber} in ${attempts} attempts.\n`);
      guessedCorrectly = true;
    } else if (guess < randomNumber) {
      console.log("Too low! Try again.");
    } else {
      console.log("Too high! Try again.");
    }
  }
}

// Ask to replay the game
async function askReplay() {
  let input = await askQuestion("Do you want to play again? (yes/no): ");
  return input.toLowerCase().startsWith('y');
}

// Main function
async function main() {
  let replay = true;
  while (replay) {
    await playGame();
    replay = await askReplay();
  }
  console.log("Thanks for playing! Goodbye!");
  rl.close();
}

main();
