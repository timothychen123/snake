let snake;
let rez = 10;
let food;
let w;
let h;

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = floor(windowWidth / rez);
  h = floor (windowHeight / rez);
  frameRate(10);
  snake = new Snake();
  foodLocation();
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1);
  }
}


function draw() {
  scale(rez);
  background(210);
  textSize(2);
  text("Score: " + snake.score, 0, 2);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();

  if (snake.endGame()) {
    var txt;
    if (confirm("Game Over! Do you wish to restart?")) {
      snake.newSnake();
    } else {
        noLoop();
        txt = "See you next time!";
        background(210);
        textSize(2);
        fill (0, 0, 0);
        text("Game Ended... Your score was " + snake.score, 0, 2);
    }
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}

class Snake {

  constructor() {
    this.newSnake();
  }

  newSnake() {
    this.len = 1;
    this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xdir = 0;
    this.ydir = 0;
    this.score = 0;
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);

  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.len++;
    this.body.push(head);
    this.score++;
  }

  endGame() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x > w-1 || x < 0 || y > h-1 || y < 0) {
      return true;
    }
    for (let i = 0; i < this.body.length-1; i++) {
      let part = this.body[i];
      if (part.x == x && part.y == y) {
        return true;
      }
    }
    return false;
  }

  eat(pos) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x == pos.x && y == pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }
}