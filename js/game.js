const Difficulties = Object.freeze({
    EASY: 1,
    MEDIUM: 2,
    HARD: 3
});

const game_statistics = {
    attempts: 100,
    magic_number: -1,
    difficulty_selected: Difficulties.EASY
} 

/*
Easy mode is the basic Magic Number game with no extra rules
*/
function selectEasy() {
    game_statistics.magic_number = Math.floor(Math.random() * 100) + 1;
    game_statistics.attempts = 100;
    game_statistics.difficulty_selected = Difficulties.EASY;
    console.log(game_statistics.magic_number);
}

/*
Medium mode gives you less attempts and the range of the magic number is higher 
*/
function selectMedium() {
    game_statistics.magic_number = Math.floor(Math.random() * 1000) + 1;
    game_statistics.attempts = 20;
    game_statistics.difficulty_selected = Difficulties.MEDIUM;
    console.log(game_statistics.magic_number);
}

/*
Hard mode's hints specify distance, not inequality relationship. 
Player has less attempts than medium mode.
The range of the magic number is wider than in medium mode.
*/
function selectHard() {
    game_statistics.magic_number = Math.floor(Math.random() * 2000) + 1;
    game_statistics.attempts = 15;
    game_statistics.difficulty_selected = Difficulties.HARD;
    console.log(game_statistics.magic_number);
}

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const win_screen = document.getElementById("win-screen");
const attemptsText = document.getElementById("attempts");
const hint = document.getElementById("hint");

/*
Implements the logic of the game following the rules of each mode
explained previously.
*/
function checkAnswer() {
    const answer = Number(
        document.getElementById("magic-number-input").value
    );

    if (game_statistics.difficulty_selected === Difficulties.EASY ||
        game_statistics.difficulty_selected === Difficulties.MEDIUM) {
        if (answer < game_statistics.magic_number) {
            hint.textContent = "Too low!";
            game_statistics.attempts--;
        }
        else if (answer > game_statistics.magic_number) {
            hint.textContent = "Too high!";
            game_statistics.attempts--;
        }
        else {
            showWinScreen();
            return;
        }
    }
    if (game_statistics.difficulty_selected === Difficulties.HARD) {
        let distance_from_magic_number = Math.abs(answer - game_statistics.magic_number);
        if (distance_from_magic_number/game_statistics.magic_number > 0.8) {
            hint.textContent = "Too far!";
            game_statistics.attempts--;
        }
        else if (distance_from_magic_number/game_statistics.magic_number > 0.6) {
            hint.textContent = "Quite far!";
            game_statistics.attempts--;
        }
        else if (distance_from_magic_number/game_statistics.magic_number > 0.5) {
            hint.textContent = "You're halfway!";
            game_statistics.attempts--;
        }
        else if (distance_from_magic_number/game_statistics.magic_number > 0.3) {
            hint.textContent = "You're getting closer!";
            game_statistics.attempts--;
        }
        else if (distance_from_magic_number/game_statistics.magic_number > 0.1) {
            hint.textContent = "Almost there!";
            game_statistics.attempts--;
        }
        else if (distance_from_magic_number/game_statistics.magic_number > 0.05) {
            hint.textContent = "It's really close now!";
            game_statistics.attempts--;
        }
        else if (distance_from_magic_number/game_statistics.magic_number > 0) {
            hint.textContent = "It's here!";
            game_statistics.attempts--;
        }
        else {
           showWinScreen();
        return; 
        }
        
    }

    attemptsText.textContent = 'Attempts left: ' + game_statistics.attempts;

    if (game_statistics.attempts === 0) {
        showGameOver();
    }
}

document.getElementById("easy-button")
    .addEventListener("click", () => startGame(selectEasy));

document.getElementById("medium-button")
    .addEventListener("click", () => startGame(selectMedium));

document.getElementById("hard-button")
    .addEventListener("click", () => startGame(selectHard));

document.getElementById("magic-number-choose-button")
    .addEventListener("click", checkAnswer);

function startGame(selectDifficulty) {
    selectDifficulty();

    menu.style.display = "none";
    game.style.display = "flex";
    document.getElementById("return-button").style.display = "block";

    attemptsText.textContent = 'Attempts left: ' + game_statistics.attempts;
    hint.textContent = "";
    if (game_statistics.difficulty_selected === Difficulties.EASY) {
        document.getElementById("mode-title").innerHTML = "EASY MODE";
        document.getElementById("choose-advice").innerHTML = "Choose a number between 0 and 100";
        document.getElementById("magic-number-input").placeholder = "0 - 100";
    }
    if (game_statistics.difficulty_selected === Difficulties.MEDIUM) {
        document.getElementById("mode-title").innerHTML = "MEDIUM MODE";
        document.getElementById("choose-advice").innerHTML = "Choose a number between 0 and 1000";
        document.getElementById("magic-number-input").placeholder = "0 - 1000";
    }
    if (game_statistics.difficulty_selected === Difficulties.HARD) {
        document.getElementById("mode-title").innerHTML = "HARD MODE";
        document.getElementById("choose-advice").innerHTML = "Choose a number between 0 and 2000";
        document.getElementById("magic-number-input").placeholder = "0 - 2000";
    }
}

function goToMainMenu() {
    game.style.display = "none";
    win_screen.style.display = "none";
    menu.style.display = "flex";
    document.getElementById("return-button").style.display = "none";
}

function showWinScreen() {
    game.style.display = "none";
    win_screen.style.display = "block";
    win_screen.innerHTML = "<h1>You won!<h1>";
    if (game_statistics.difficulty_selected === Difficulties.HARD) {
        win_screen.innerHTML += "Amazing! You beated hard mode!";
    }
    document.getElementById("return-button").style.display = "block";
}

function showGameOver() {
    game.style.display = "none";
    win_screen.style.display = "block";
    win_screen.innerHTML = "<h1>Game Over<h1>";
    document.getElementById("return-button").style.display = "block";
}

document.getElementById("return-button").addEventListener("click", goToMainMenu);

