const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player
const player = {
    x: canvas.width / 2 - 30,
    y: canvas.height - 60,
    width: 60,
    height: 30,
    dx: 5, // Movement speed
    color: 'white'
};

// Invaders -  Added invaderSpeed and direction
const invaders = [];
const invaderRows = 5;
const invaderCols = 10;
const invaderWidth = 40;
const invaderHeight = 30;
const invaderPadding = 10;
const invaderOffsetTop = 50;
const invaderOffsetLeft = 30;
let invaderSpeed = 0.5; // Initial invader movement speed
let invaderDx = 0.5; // Initial invader movement speed

for (let row = 0; row < invaderRows; row++) {
    for (let col = 0; col < invaderCols; col++) {
        invaders.push({
            x: col * (invaderWidth + invaderPadding) + invaderOffsetLeft,
            y: row * (invaderHeight + invaderPadding) + invaderOffsetTop,
            width: invaderWidth,
            height: invaderHeight,
            color: 'green'
        });
    }
}

// Projectiles
const projectiles = [];
const projectileWidth = 5;
const projectileHeight = 15;
const projectileSpeed = 3;

// Game variables
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
let score = 0;
let gameOver = false;
let gameStarted = false; // Add a flag to track game start

// Event listeners
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (e.key === ' ') {
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (e.key === ' ') {
        spacePressed = false;
    }
}

// Draw functions
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawInvaders() {
    invaders.forEach(invader => {
        ctx.fillStyle = invader.color;
        ctx.fillRect(invader.x, invader.y, invader.width, invader.height);
    });
}

function drawProjectiles() {
    projectiles.forEach(projectile => {
        ctx.fillStyle = 'red';
        ctx.fillRect(projectile.x, projectile.y, projectile.width, projectile.height);
    });
}

function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 10, 30);
}

function drawGameOver() {
    ctx.font = '40px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', canvas.width / 2 - 120, canvas.height / 2);
}

// Update functions
function updatePlayer() {
    if (rightPressed && player.x < canvas.width - player.width) {
        player.x += player.dx;
    } else if (leftPressed && player.x > 0) {
        player.x -= player.dx;
    }
}

function updateInvaders() {
    // Move invaders horizontally
    invaders.forEach(invader => {
        invader.x += invaderSpeed;
    });

    // Check for collisions with walls
    let rightmostInvader = invaders[invaders.length -1];
    let leftmostInvader = invaders[0];
    invaders.forEach(invader => {
        if (rightmostInvader.x + rightmostInvader.width > canvas.width) invaderSpeed = -invaderSpeed;
        if (leftmostInvader.x < 0) invaderSpeed = -invaderSpeed;
    });

    // Move invaders down if they hit the wall
    if (invaderSpeed < 0 && leftmostInvader.x < 0 || invaderSpeed > 0 && rightmostInvader.x + rightmostInvader.width > canvas.width) {
        invaders.forEach(invader => invader.y += invaderHeight);
        invaderSpeed *= -1; // Reverse direction
    }

    // Check for collisions with player
    invaders.forEach(invader => {
        if (
            !gameOver &&
            player.x < invader.x + invader.width &&
            player.x + player.width > invader.x &&
            player.y < invader.y + invader.height &&
            player.y + player.height > invader.y
        ) {
            gameOver = true;
        }
    });

    // Check if any invaders reached the bottom
    if (invaders.some(invader => invader.y + invader.height > canvas.height)) {
        gameOver = true;
    }

    if (invaders.length === 0) gameOver = true; //Win condition
}

function updateProjectiles() {
    // Move projectiles
    projectiles.forEach(projectile => {
        projectile.y -= projectileSpeed;
    });

    // Remove projectiles that go off-screen
    projectiles = projectiles.filter(projectile => projectile.y > 0);

    // Check for collisions with invaders
    projectiles.forEach(projectile => {
        invaders.forEach((invader, index) => {
            if (
                projectile.x < invader.x + invader.width &&
                projectile.x + projectile.width > invader.x &&
                projectile.y < invader.y + invader.height &&
                projectile.y + projectile.height > invader.y
            ) {
                invaders.splice(index, 1); // Remove invader
                projectiles.splice(projectiles.indexOf(projectile), 1); // Remove projectile
                score++;
                invaderSpeed += 0.05 * Math.sign(invaderSpeed); // Increase speed in current direction
            }
        });
    });
}

function createProjectile() {
    if (spacePressed) {
        projectiles.push({
            x: player.x + player.width / 2 - projectileWidth / 2,
            y: player.y,
            width: projectileWidth,
            height: projectileHeight
        });
        spacePressed = false; // Prevent holding space to shoot continuously
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    if (!gameOver) {
        if (!gameStarted) { gameStarted = true; return; } // Prevent immediate game over
        drawPlayer();
        drawInvaders();
        drawProjectiles();
        drawScore();

        updatePlayer();
        if (invaders.length > 0)
        updateInvaders();
        updateProjectiles();
        createProjectile();

        requestAnimationFrame(gameLoop);
    } else {
        drawGameOver();
    }
}

gameLoop();
