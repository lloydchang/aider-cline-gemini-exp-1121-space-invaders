const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Check if canvas context is valid
if (!ctx) {
    console.error("Error: Could not get 2D rendering context. Check your canvas element.");
    throw new Error("Canvas context is invalid.");
}

// Player
class Player {
    constructor(x, y, width, height, dx, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        if (rightPressed && this.x < canvas.width - this.width) {
            this.x += this.dx;
        } else if (leftPressed && this.x > 0) {
            this.x -= this.dx;
        }
    }
}

const player = new Player(canvas.width / 2 - 30, canvas.height - 60, 60, 30, 5, 'white');

// Invaders
class Invader {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(invaderSpeed) {
        this.x += invaderSpeed;
    }
}

const invaders = [];
const invaderRows = 5;
const invaderCols = 10;
const invaderWidth = 40;
const invaderHeight = 30;
const invaderPadding = 10;
const invaderOffsetTop = 50;
const invaderOffsetLeft = 30;
let invaderSpeed = 0.5;
let invaderDx = 0.5;

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
class Projectile {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y -= projectileSpeed;
    }
}

const projectiles = [];
const projectileWidth = 5;
const projectileHeight = 15;
let projectileSpeed = 3;

// Power-up
class PowerUp {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.active = true;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let powerUp;
let powerUpActive = false;
let powerUpTimer;


function generatePowerUp() {
    powerUp = new PowerUp(Math.random() * (canvas.width - 20), 20, 20, 20, 'blue');
    powerUpActive = true;
}

// Game variables
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
let score = 0;
let gameOver = false;
let gameStarted = false;


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
function createProjectile() {
    if (spacePressed) {
        projectiles.push({
            x: player.x + player.width / 2 - projectileWidth / 2,
            y: player.y,
            width: projectileWidth,
            height: projectileHeight
        });
        spacePressed = false;
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!gameOver) {
        if (!gameStarted) {
            gameStarted = true;
            return;
        }
        player.draw();
        invaders.forEach(invader => invader.draw());
        projectiles.forEach(projectile => projectile.draw());
        drawScore();

        player.update();

        // Move invaders horizontally
        invaders.forEach(invader => {
            invader.update(invaderSpeed);
        });

        // Check for collisions with walls
        let rightmostInvader = invaders[invaders.length - 1];
        let leftmostInvader = invaders[0];

        if (rightmostInvader &amp;&amp; rightmostInvader.x + rightmostInvader.width > canvas.width) {
            invaderSpeed = -invaderSpeed;
            invaders.forEach(invader => invader.y += invaderHeight);
        }

        if (leftmostInvader &amp;&amp; leftmostInvader.x < 0) {
            invaderSpeed = -invaderSpeed;
            invaders.forEach(invader => invader.y += invaderHeight);
        }

        // Check for collisions with player
        invaders.forEach(invader => {
            if (
                !gameOver &amp;&amp;
                player.x < invader.x + invader.width &amp;&amp;
                player.x + player.width > invader.x &amp;&amp;
                player.y < invader.y + invader.height &amp;&amp;
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

        // Move projectiles
        projectiles.forEach(projectile => {
            projectile.update();
        });

        // Remove projectiles that go off-screen
        projectiles = projectiles.filter(projectile => projectile.y > 0);

        // Check for collisions with invaders
        projectiles.forEach(projectile => {
            invaders.forEach((invader, index) => {
                if (
                    projectile.x < invader.x + invader.width &amp;&amp;
                    projectile.x + projectile.width > invader.x &amp;&amp;
                    projectile.y < invader.y + invader.height &amp;&amp;
                    projectile.y + projectile.height > invader.y
                ) {
                    invaders.splice(index, 1);
                    projectiles.splice(projectiles.indexOf(projectile), 1);
                    score++;
                    invaderSpeed += 0.05 * Math.sign(invaderSpeed);
                }
            });
        });

        createProjectile();

        // Power-up logic
        if (powerUpActive &amp;&amp; powerUp) { //Check if powerUp exists
            powerUp.draw();

            if (
                player.x < powerUp.x + powerUp.width &amp;&amp;
                player.x + player.width > powerUp.x &amp;&amp;
                player.y < powerUp.y + powerUp.height &amp;&amp;
                player.y + player.height > powerUp.y
            ) {
                powerUpActive = false;
                const originalSpeed = projectileSpeed;
                projectileSpeed *= 2;
                powerUpTimer = setTimeout(() => {
                    projectileSpeed = originalSpeed;
                }, 5000); // Power-up lasts for 5 seconds
            }
        } else if (!powerUpActive &amp;&amp; Math.random() < 0.01) { // 1% chance of spawning
            generatePowerUp();
        }

        requestAnimationFrame(gameLoop);
    } else {
        drawGameOver();
    }
}

gameLoop();
