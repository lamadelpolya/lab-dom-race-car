class Player {
  constructor(gameScreen, left, top, width, height, imageSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src = imageSrc;
    this.element.style.position = "absolute";
    this.element.style.width = this.width + "px";
    this.element.style.height = this.heigth + "px";
    this.element.style.left = this.left + "px";
    this.element.style.top = this.top + "px";
    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.left += this.directionX;
    this.top += this.directionY;
    if (this.left < 10) {
      this.left = 10;
    }
    if (this.top < 10) {
      this.top = 10;
    }
    if (this.left > this.gameScreen.offSetWidth - this.width - 10) {
      this.left = this.gameScreen.offSetWidth - this.width - 10;
    }
    if (this.top > this.gameScreen.offSetHeight - this.height - 10) {
      this.top = this.gameScreen.offSetHeight - this.height - 10;
    }
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.left = this.left + "px";
    this.element.style.top = this.top + "px";
  }
  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect(); //shows where the player is on the screen
    const obstacleRect = obstacle.element.getBoundingClientRect(); //shows where the obstacle is on the screen
    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
