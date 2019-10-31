const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// unit
const box = 32;

// image
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// audio
const dead = new Audio();
const eat = new Audio();

dead.src = "audio/dead.mp3"
eat.src = "audio/eat.mp3"

// snake
let snake = [];
snake[0] = {
  x : 9 * box,
  y : 10 * box
}

// food
let food = {
  x : Math.floor(Math.random() * 17 + 1) * box,
  y : Math.floor(Math.random() * 15 + 3) * box
}

// score
let score = 0;

// snake
let d;

document.addEventListener("keydown", direction)

function direction(event) {
  let key = event.keyCode;

  if (key == 37 && d != "RIGHT") {
    d = "LEFT";
  } else if (key == 38 && d != "DOWN") {
    d = "UP";
  } else if (key == 39 && d != "LEFT") {
    d = "RIGHT";
  } else if (key == 40 && d != "UP") {
    d = "DOWN";
  }
}

// collision
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false
}

// canvas
function draw() {
  ctx.drawImage(ground, 0, 0)
  for(let i = 0; i < snake.length; i++){
    ctx.fillStyle = (i == 0)? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;



  // direction
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  // snake eating
  if (snakeX == food.x && snakeY == food.y) {
    score ++;
    eat.play()
    food = {
      x : Math.floor(Math.random() * 17 + 1) * box,
      y : Math.floor(Math.random() * 15 + 3) * box
    }
  } else {
    snake.pop();
  }

 // new head
  let newHead = {
    x : snakeX,
    y : snakeY
  }

  // game over
  if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
    clearInterval(game);
    dead.play();
    //score can be pulled from here
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box)
}

// draw function
let game = setInterval(draw, 100)
