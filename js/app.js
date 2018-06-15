// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  var currentX = this.x;

  if (currentX + this.speed * dt > 505) {
    this.x = -90;
  } else {
    this.x += this.speed * dt;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var Player = function(x, y, wins) {
  this.x = x;
  this.y = y;
  this.wins = wins;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dx, dy) {
  this.updateX(dx);
  this.updateY(dy);
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
  if (direction === 'up') {
    return this.checkY(-89) ? this.update(0, -89) : null;
  } else if (direction === 'down') {
    return this.checkY(89) ? this.update(0, 89) : null;
  } else if (direction === 'left') {
    return this.checkX(-101) ? this.update(-101, 0) : null;
  } else if (direction === 'right') {
    return this.checkX(101) ? this.update(101, 0) : null;
  }
};

Player.prototype.setWins = function(num) {
  this.wins = num;
};

Player.prototype.atEndOfBoard = function(dy) {
  var yCoord = this.y + dy;
  return yCoord < 0;
};

Player.prototype.checkX = function(dx) {
  var xCoord = this.x;
  return !(xCoord + dx > 504 || xCoord + dx < 0);
};

Player.prototype.checkY = function(dy) {
  var yCoord = this.y;
  if (this.atEndOfBoard(dy)) {
    var currentWins = this.wins;

    this.setWins(++currentWins);
    allEnemies = makeNewEnemiesArr();
    player = new Player(202, 404, this.wins);
    updateNumWinsDisplay(`Number of Wins: ${this.wins}`);
  }
  return !(yCoord + dy > 492 || yCoord + dy < -42);
};

Player.prototype.updateX = function(dx) {
  this.x = this.x += dx;
};

Player.prototype.updateY = function(dy) {
  this.y = this.y += dy;
};

// speed constants
var SLOW_SPEED = 60;
var MEDIUM_SPEED = 90;
var FAST_SPEED = 120;
var VERY_FAST_SPEED = 180;

// row x coordinate constants
var LOW_ROW = 226;
var MIDDLE_ROW = 137;
var HIGH_ROW = 48;

function makeNewEnemiesArr() {
  return [
    new Enemy(-90, LOW_ROW, SLOW_SPEED),
    new Enemy(-90, MIDDLE_ROW, MEDIUM_SPEED),
    new Enemy(-90, HIGH_ROW, FAST_SPEED),
    new Enemy(-90, HIGH_ROW, VERY_FAST_SPEED)
  ];
}

var num_wins_display = document.createElement('div');
num_wins_display.setAttribute('class', 'number-of-wins');

function setInnerText(element, content) {
  return (element.innerText = content);
}
function updateNumWinsDisplay(content) {
  return setInnerText(num_wins_display, content);
}

var allEnemies = makeNewEnemiesArr();
var player = new Player(202, 404, 0);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
