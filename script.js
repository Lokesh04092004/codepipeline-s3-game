const dice = document.querySelector('.dice');
const players = document.querySelectorAll('.player');
const pieces = document.querySelectorAll('.pieces');

let currentPlayer = 0;
let isRolling = false;

function rollDice() {
    if (!isRolling) {
        isRolling = true;
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        dice.textContent = randomNumber;

        setTimeout(() => {
            isRolling = false;
            // Implement game logic based on the rolled number
            // Update player positions, check for wins, etc.
        }, 1000);
    }
}

dice.addEventListener('click', rollDice);
