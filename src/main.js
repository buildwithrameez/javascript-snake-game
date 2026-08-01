// Define element of HTML
const board = document.getElementById('game-board');

//variables
let gridSize = 20;
let snake = [{x:10, y:10}];
let food = generateFood();
let direction = 'right';
let gameInterval;
let gameSpeedDelaye = 200;


// Functions to draw map, snake and food
function draw() {
    board.innerHTML = '';
    drawsnake();
    drawFood();
};

// draw snake
function drawsnake () {
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
draw();

// function for snakeFood
function drawFood () {
    const foodElement = createGameElement('div','food');
    setPosition(foodElement,food);
    board.appendChild(foodElement);

};

// generate Food
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return {x,y};
};

// move snake
function move() {
    const head = {...snake[0] };
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
            
        case 'letf':
           head.x--; 
            break;    
    }

   snake.unshift(head);
   
//    snake.pop();
if (head.x == food.x && head.y == head.food) {
        food = generateFood();
        clearInterval(); // clear past interval
        gameInterval(() => {
            move();
            draw();
        },gameSpeedDelaye);
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
