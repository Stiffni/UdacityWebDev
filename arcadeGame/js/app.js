// Enemies our player must avoid
var Enemy = function() {
    let randomRoad = Math.floor(Math.random() * 3);
    this.width = 100;
    this.height = 75;
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 60+(randomRoad*83); //This seemed to be the magic number to get the enemy to align nicely on a road
    this.speed = Math.floor((Math.random()*500)+100);
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
    this.width = 60;
    this.blankSpaceOffset = 25; //The image of the player has some blank space to account for
    this.height = 60;
    this.sprite = 'images/char-cat-girl.png';
    this.x = 203;
    this.y = 375;
};

Player.prototype.update = function(){
    let playerWidthMax = this.x + this.blankSpaceOffset + this.playerWidth;
    let playerWidthMin = this.x + this.blankSpaceOffset;
    //Check for collision
    allEnemies.forEach(function(enemy){
        let enemyWidthMax = enemy.x + enemy.width;
        let enemyHeightMax = enemy.y + enemy.height;
        if( (player.y + player.height) > enemy.y && (player.y + player.height) < enemyHeightMax){
            if( (playerWidthMin <= enemyWidthMax && playerWidthMin >= enemy.x) ||
                (playerWidthMax <= enemyWidthMax && playerWidthMax >= enemy.x)){
                player.constructor();
                allEnemies = [];
            }
        }
    });
    //Check for win
    if( player.y < 10 ){
        winModalElement.style.display = 'block';
        replayElement.focus();
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
let allEnemies = [];
const winModalElement = document.getElementsByClassName('winner-modal')[0];
const replayElement = document.getElementsByClassName('play-again')[0];
winModalElement.style.display = 'none';

//Below function modeled after one I saw here: https://stackoverflow.com/questions/6962658/randomize-setinterval-how-to-rewrite-same-random-after-random-interval
(function createEnemies(){
    let randWait = Math.floor((Math.random()*600)+500);
    setTimeout(function(){
        allEnemies.push(new Enemy());
        createEnemies();
    }, randWait);
}());

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

replayElement.addEventListener('click', function(){
    winModalElement.style.display = 'none';
    player.constructor();
    allEnemies = [];
});