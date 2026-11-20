
let boxes = [1, 2, 3];

let correctBox = boxes[Math.floor(Math.random() * boxes.length)];

let attempts = 0;
let gameFinished = false;

function checkBox(choice) {

    if (gameFinished) {
        return;
    }

    attempts++;

    document.getElementById("attempts").textContent =
        "Attempts: " + attempts;

    if (choice === correctBox) {

        document.getElementById("message").textContent =
            "🎉 Congratulations! You found the lost phone!";

        gameFinished = true;

    } else {

        document.getElementById("message").textContent =
            "❌ Wrong box! Try again!";
    }
}

function resetGame() {

    correctBox = boxes[Math.floor(Math.random() * boxes.length)];

    attempts = 0;
    gameFinished = false;

    document.getElementById("message").textContent = "";

    document.getElementById("attempts").textContent =
        "Attempts: 0";
}
