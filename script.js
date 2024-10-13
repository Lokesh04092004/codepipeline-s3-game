const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const mapWidth = 800;
const mapHeight = 600;
const playerRadius = 20;
const playerSpeed = 3;
const bulletSpeed = 10;
const bulletRadius = 3;

// Player object
let player = {
    x: mapWidth / 2,
    y: mapHeight / 2,
    angle: 0,
    health: 100,
};

// Bullet objects
let bullets = [];

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, mapWidth, mapHeight);

    // Draw the player
    ctx.beginPath();
    ctx.arc(player.x, player.y, playerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();

    // Update and draw the bullets
    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;

        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bulletRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();

        // Check if the bullet is out of bounds
        if (bullet.x < 0 || bullet.x > mapWidth || bullet.y < 0 || bullet.y > mapHeight) {
            bullets.splice(i, 1);
            i--;
        }
    }

    // Handle player movement
    if (keysDown.left) {
        player.angle -= 0.05;
    }
    if (keysDown.right) {
        player.angle += 0.05;
    }
    if (keysDown.up) {
        player.x += playerSpeed * Math.cos(player.angle);
        player.y += playerSpeed * Math.sin(player.angle);
    }

    // Handle shooting
    if (keysDown.space) {
        const bullet = {
            x: player.x,
            y: player.y,
            dx: bulletSpeed * Math.cos(player.angle),
            dy: bulletSpeed * Math.sin(player.angle),
        };
        bullets.push(bullet);
    }

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Key event handling
let keysDown = {};

window.addEventListener('keydown', (event) => {
    keysDown[event.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (event) => {
    delete keysDown[event.key.toLowerCase()];
});

// Start the game
gameLoop();
