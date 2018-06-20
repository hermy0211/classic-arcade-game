// 0. Listen for Key Presses

// Listen for key presses
const getKeys = function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
}

document.addEventListener('keyup', getKeys);



// 1. Show Pop Up When Game is Over

// Function to show pop up
function showPopUp() {
  // Show pop up
  const popup = document.querySelector('.popup');
  popup.classList.add("show");

  // Disable key presses while popup is shown
  document.removeEventListener('keyup', getKeys);
}

// Function to close pop up
function closePopUp() {
  // Close pop up
  const popup = document.querySelector('.popup');
  popup.classList.remove("show");

  // Enable key presses again
  document.addEventListener('keyup', getKeys);
}



// 2. Define a Class for Game Objects

class GameObject {
  // Define common properties and methods of game objects
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  render() {
    // Render image
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}



// 3. Enemies the Player Must Avoid

class Enemy extends GameObject {
  // Variables applied to each instance
  constructor(x, y, speed) {
    super(x,y);
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
  }

  update(dt) {
    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    this.x += this.speed*dt;

    // Reset position of enemy once off the screen
    if (this.x > 550) {
      this.x = -101;
      this.speed = Math.floor(Math.random()*500);
    }

    // Check for collisions
    if (
      player.x > this.x - 75 &&
      player.x < this.x + 75 &&
      player.y > this.y - 30 &&
      player.y < this.y + 25
    ) {
      player.x = 200;
      player.y = 380;
    }
  }
}



// 4. Players on the Screen

class Player extends GameObject {
  // Variables applied to each instance
  constructor(x, y) {
    super(x,y);
    this.sprite = 'images/char-cat-girl.png';
  }

  update() {
    // Reset position of player once off the screen
    if (this.x > 400) {
      this.x = 400;
    }

    if (this.x <0) {
      this.x = 0;
    }

    if (this.y > 380) {
      this.y = 380;
    }

    // Win game if player reaches top
    if (this.y < 0) {
      showPopUp();
      this.x = 200;
      this.y = 380;
    }
  }

  handleInput(keyPress) {
    // Move player based on key press
    switch (keyPress) {
      case 'left':
        this.x -= 100;
        break;
      case 'right':
        this.x += 100;
        break;
      case 'up':
        this.y -= 80;
        break;
      case 'down':
        this.y += 80;
        break;
    }
  }
}



// 5. Instantiate Objects

// Create enemy objects
let allEnemies = [];
const enemyPosY = [60, 140, 220];
enemyPosY.forEach(function(posY) {
  let enemy = new Enemy(-100, posY, Math.floor(Math.random()*500));
  allEnemies.push(enemy);
});

// Place the player object in a variable called player
const player = new Player(200, 380);
