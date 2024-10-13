const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const snake = [{ x: 10, y: 10 }];
const food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };

const gridSize = 20;
const snakeColor = 'green';
const foodColor = 'red';

let direction = 'right';

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = snakeColor;
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
    }

    // Draw the food
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function update() {
    let head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
    }

    snake.unshift(head);

    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || checkCollision(head)) {
        gameOver();
    }

    if (head.x === food.x && head.y === food.y) {
        generateFood();
    } else {
        snake.pop();
    }
}

function checkCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function generateFood() {
    food.x = Math.floor(Math.random() * 20);
    food.y = Math.floor(Math.random() * 20);
}

function gameOver() {
    alert('Game Over!');
    clearInterval(gameInterval);
}

function handleKeyDown(event) {
    switch (event.keyCode) {
        case 37:
            if (direction !== 'right') {
                direction = 'left';
            }
            break;
        case 38:
            if (direction !== 'down') {
                direction = 'up';
            }
            break;
        case 39:
            if (direction !== 'left') {
                direction = 'right';
            }
            break;
        case 40:
            if (direction !== 'up') {
                direction = 'down';
            }
            break;
    }
}

document.addEventListener('keydown', handleKeyDown);

let gameInterval = setInterval(function() {
    draw();
    update();
}, 100);
