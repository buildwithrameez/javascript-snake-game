// Define element of HTML
const board = document.getElementById('game-board');

//variables
let snake = [{x:10, y:10}];

// Functions to draw map, snake and food
function draw() {
    board.innerHTML = '';
    drawsnake();
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