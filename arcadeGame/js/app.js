// Enemies our player must avoid
var Enemy = function() {
    let enemyWidthEmpty = 10;
    let enemyHeightEmpty = 387;
    let enemyWidth = 506;
    let enemyHeight = 330;
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 60;
    this.speed = 100;
    this.hitboxXMin = this.x + enemyWidthEmpty;
    this.hitboxXMax = this.x + enemyWidthEmpty + enemyWidth;
    this.hitboxYMin = this.y + enemyHeightEmpty;
    this.hitboxYMax = this.y + enemyHeightEmpty + enemyHeight;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    let playerWidthEmpty = 50;
    let playerHeightEmpty = 271;
    let playerWidth = 253;
    let playerHeight = 150;
    this.sprite = 'images/char-cat-girl.png';
    this.x = 203;
    this.y = 375;
    this.hitboxXMin = this.x + playerWidthEmpty;
    this.hitboxXMax = this.x + playerWidthEmpty + playerWidth;
    this.hitboxYMin = this.y + playerHeightEmpty;
    this.hitboxYMax = this.y + playerHeightEmpty + playerHeight;
};

Player.prototype.update = function(){
    if( (this.hitboxXMin <= allEnemies[0].hitboxXMax && this.hitboxXMin >= allEnemies[0].hitboxXMin) ||
        (this.hitboxXMax <= allEnemies[0].hitboxXMax && this.hitboxXMax >= allEnemies[0].hitboxXMin)){
        alert('uh oh');
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode){
    numRows = 6;
    numCols = 5;
    let xOffset = ctx.canvas.clientWidth/numCols;
    //Lowest grass row is taller than the other squares, accounting for this with the -109 offset
    let yOffset = (ctx.canvas.clientHeight-109)/numRows;
    switch(keyCode) {
        case 'left':
            if(this.x - xOffset > 0) {
                this.x -= xOffset;
            }
            break;
        case 'right':
            if(this.x + xOffset < ctx.canvas.clientWidth) {
                this.x += xOffset;
            }
            break;
        case 'up':
            if(this.y - yOffset > -50) {
                this.y -= yOffset;
            }
            break;
        case 'down':
            if(this.y + yOffset < (ctx.canvas.clientHeight - 150)) {
                this.y += yOffset;
            }
            break;
    }
}

let player = new Player();
let allEnemies = [new Enemy()];
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
