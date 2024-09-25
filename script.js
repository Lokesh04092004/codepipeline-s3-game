const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score');

let score = 0;
let isJumping = false;
let gameOver = false;

// Jump function
function jump() {
    if (isJumping) return;
    isJumping = true;

    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                } else {
                    jumpHeight -= 5;
                    dino.style.bottom = `${20 + jumpHeight}px`;
                }
            }, 20);
        } else {
            jumpHeight += 5;
            dino.style.bottom = `${20 + jumpHeight}px`;
        }
    }, 20);
}

// Detect collision
function detectCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.x < cactusRect.x + cactusRect.width &&
        dinoRect.x + dinoRect.width > cactusRect.x &&
        dinoRect.y < cactusRect.y + cactusRect.height &&
        dinoRect.y + dinoRect.height > cactusRect.y
    ) {
        gameOver = true;
        alert(`Game Over! Your score: ${score}`);
        resetGame();
    }
}

// Update score and check for collision
function updateGame() {
    if (!gameOver) {
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
        detectCollision();
    }
}

// Reset game
function resetGame() {
    score = 0;
    scoreDisplay.innerText = `Score: 0`;
    gameOver = false;
    cactus.style.animation = 'none';
    setTimeout(() => {
        cactus.style.animation = '';
        cactus.style.right = '-40px';
    }, 10);
}

// Game loop
setInterval(updateGame, 1000);

// Jump on space bar press
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});
