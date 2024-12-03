# Space Invaders - System Patterns

## High-Level Architecture

The game will be implemented using a single HTML file (`index.html`) that includes the game's structure, styling (through an external CSS file, `style.css`), and logic (through an external JavaScript file, `script.js`).

## Core Technical Patterns

- **Canvas Rendering:** The game will be rendered on an HTML5 canvas element.
- **Game Loop:** A game loop will be used to continuously update the game state and redraw the canvas.
- **Event Handling:** User input (keyboard events) will be handled to control the player's ship and shooting.
- **Object-Oriented Programming:** JavaScript objects will be used to represent game entities like the player's ship, invaders, and projectiles.  Improved object management and collision detection logic have been implemented.
- **Game State Management:**  The game state (e.g., score, game over) is now managed more effectively.
- **Collision Detection:** Collision detection algorithms will be implemented to determine when projectiles hit invaders or when invaders collide with the player's ship.  Collision detection has been improved for accuracy and to handle game over conditions.

## Data Flow

1. User input (keyboard events) is captured.
2. Game logic updates the game state based on user input and game rules.
3. The canvas is cleared and redrawn based on the updated game state.
4. The process repeats continuously in the game loop.

## Key Technical Decisions

- **HTML5 Canvas:** Chosen for its flexibility and performance in rendering 2D graphics.
- **JavaScript:** Used for game logic and event handling due to its wide browser support and ease of use.
- **Object-Oriented Approach:** Helps organize and manage game entities effectively.
