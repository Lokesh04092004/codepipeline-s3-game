const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const container = document.querySelector('.game-container');

let ballSpeedX = 4; // Horizontal speed
let ballSpeedY = 4; // Vertical speed
let ballPositionX = container.clientWidth / 2;
let ballPositionY = container.clientHeight / 2;

let paddleSpeed = 0;
const paddleSpeedAmount = 8;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        paddleSpeed = -paddleSpeedAmount;
    } else if (e.key === 'ArrowRight') {
        paddleSpeed = paddleSpeedAmount;
    }
});

document.addEventListener('keyup', () => {
    paddleSpeed = 0;
});

function gameLoop() {
    // Update paddle position
    const paddleRect = paddle.getBoundingClientRect();
    let paddleLeft = paddleRect.left + paddleSpeed;

    // Keep paddle within bounds
    if (paddleLeft < container.getBoundingClientRect().left) {
        paddleLeft = container.getBoundingClientRect().left;
    } else if (paddleLeft + paddleRect.width > container.getBoundingClientRect().right) {
        paddleLeft = container.getBoundingClientRect().right - paddleRect.width;
    }
    paddle.style.left = `${paddleLeft}px`;

    // Update ball position
    ballPositionX += ballSpeedX;
    ballPositionY += ballSpeedY;

    // Ball collision with walls
    if (ballPositionX <= 0 || ballPositionX >= container.clientWidth - 20) {
        ballSpeedX = -ballSpeedX; // Reverse direction
    }

    if (ballPositionY <= 0) {
        ballSpeedY = -ballSpeedY; // Reverse direction
    }

    // Ball collision with paddle
    if (ballPositionY >= container.clientHeight - 40 && 
        ballPositionX + 20 > paddleLeft && 
        ballPositionX < paddleLeft + 100) {
        ballSpeedY = -ballSpeedY; // Reverse direction
    }

    // Reset ball if it goes below the paddle
    if (ballPositionY > container.clientHeight) {
        ballPositionX = container.clientWidth / 2;
        ballPositionY = container.clientHeight / 2;
        ballSpeedY = -ballSpeedY; // Start moving up
    }

    ball.style.left = `${ballPositionX}px`;
    ball.style.top = `${ballPositionY}px`;

    requestAnimationFrame(gameLoop);
}

gameLoop();
