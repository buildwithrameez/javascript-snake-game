// Define element of HTML
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const h_score = document.getElementById('highScore');




//variables
let gridSize = 20;
let snake = [{x:10, y:10}];
let food = generateFood();
let highScores = 0;
let direction = 'right';
let gameInterval;
let gamespeedDelay = 200;
let gameStarted = false;


// Functions to draw map, snake and food
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
};

// draw snake
function drawSnake () {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div','snake');
        setPosition(snakeElement,segment);
        board.appendChild(snakeElement);
    });
 
};

// function to create snake or food cube
function createGameElement (tag,className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

// set position
function setPosition (element,position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

};

// test function
// draw();

// function for snakeFood
function drawFood () {
   if (gameStarted) {
    const foodElement = createGameElement('div','food');
    setPosition(foodElement,food);
    board.appendChild(foodElement);
   }
};

// generate Food
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y};
};

// move snake
function move() {
    const head = {...snake[0]};
    switch (direction) {
        case 'up':
           head.y--; 
            break;
    
        case 'down':
           head.y++; 
            break;

        case 'right':
           head.x++; 
            break;  
            
        case 'left':
           head.x--; 
            break;    
    }

   snake.unshift(head);
   
//    snake.pop();
if (head.x == food.x && head.y == food.y) {
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval); // clear past interval
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        },gamespeedDelay);
    }
    else {
        snake.pop();
    }
};

//moving test
// setInterval(() => {
//     move();
//     draw();
// },200);

// start game function
function startGame() {
    gameStarted = true; // keep track of running game
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() =>{
        move();
        checkCollision();
        draw();
    },gamespeedDelay);
};

//keypress event listener
function handlePressKey(event){
    if (
        (!gameStarted && event.code == 'Space') || 
        (!gameStarted && event.key == ' ')
    ) {
        startGame();
    }
    else {
        switch (event.key) {
            case 'ArrowUp' :
                direction = 'up';
                break;
            
            case 'ArrowDown' :
                direction = 'down';
                break;
                
            case 'ArrowRight' :
                direction = 'right';
                break;
                
            case 'ArrowLeft' :
                direction = 'left';
                break;    
        }

    };

};

document.addEventListener('keydown', handlePressKey);

// function to increate the speed of snake 
function increaseSpeed () {
    if (gamespeedDelay > 150) {
        gamespeedDelay -= 5;
    }
    else if (gamespeedDelay > 100) {
        gamespeedDelay -= 3;
    }
    else if (gamespeedDelay > 80) {
        gamespeedDelay -= 2;
    }
    else if (gamespeedDelay > 50) {
        gamespeedDelay -= 1;
    }
};

// function to check if the snake touch the wall or himself
function checkCollision () {
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }  
    }
};

// function to reset the game
function resetGame () {
    updatehighScore();
    stopGame(); 
    snake = [{x : 10, y : 10}];
    food = generateFood();
    direction = 'right';
    gamespeedDelay = 200;
    updateScore();
};

// function to update scores
function updateScore () {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3,'0');
};

// function to stop game
function stopGame() {
    setInterval(gameInterval);
    startGame = false; 
    instructionText.style.display = 'block';
    logo.style.display = 'block';
};

// function to add high score
function  updatehighScore() {
    const currentScore = snake.length -1;
    if (currentScore > highScores) {
        highScores = currentScore;
        h_score.textContent = highScores.toString().padStart(3,'0'); 
    }
};

