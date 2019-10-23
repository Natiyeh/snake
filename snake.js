const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// unit
const box = 32;

// image
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// snake
let snake = [];
snake[0] = {
  x : 9 * box,
  y : 10 * box
}

// food
let food = {
  x : Math.floor(Math.random()*17+1) * box,
  y : Math.floor(Math.random()*15+3) * box,
}
kk
