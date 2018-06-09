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
  console.log('Player updated coords are', this.x, this.y);
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
  var goUp = direction === 'up';
  var goDown = direction === 'down';
  var goLeft = direction === 'left';
  var goRight = direction === 'right';

  if (goUp) {
    return this.checkY(-89) ? this.update(0, -89) : null;
  } else if (goDown) {
    return this.checkY(89) ? this.update(0, 89) : null;
  } else if (goLeft) {
    return this.checkX(-101) ? this.update(-101, 0) : null;
  } else if (goRight) {
    return this.checkX(101) ? this.update(101, 0) : null;
  }
};

Player.prototype.setWins = function(num) {
    this.wins = num;
}

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
    allEnemies = makeNewEnemiesArr();
    player = new Player(202, 404);
  }
  return !(yCoord + dy > 492 || yCoord + dy < -42);
};

Player.prototype.updateX = function(dx) {
  this.x = this.x += dx;
};

Player.prototype.updateY = function(dy) {
  this.y = this.y += dy;
};

function makeNewEnemiesArr() {
  return [
    new Enemy(-90, 226, 60),
    new Enemy(-90, 137, 90),
    new Enemy(-90, 48, 120)
  ];
}

var allEnemies = makeNewEnemiesArr();
var player = new Player(202, 404);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  console.log('keyup event');

  player.handleInput(allowedKeys[e.keyCode]);
});
