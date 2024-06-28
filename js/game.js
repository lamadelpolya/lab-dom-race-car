class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndScreen = document.querySelector("#game-end");
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/car.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacle = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60);
  }
  start() {
    this.gameScreen.style.width = this.width + "px";
    this.gameScreen.style.height = this.height + "px";
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }
  gameLoop() {
    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }
  update() {
    this.player.move();
    for (let i = 0; i < this.obstacle.length; i++) {
      const obstacle = this.obstacle[i];
      obstacle.move();
      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacle.splice(i, 1);
        this.lives--;
        i--;
      } else if (obstacle.top > this.height) {
        this.score++;
        obstacle.element.remove();
        this.obstacle.splice(i, 1);
        i--;
      }
    }
    if (this.lives === 0) {
      this.endGame();
    }
    if (Math.random() > 0.98 && this.obstacle.length < 1) {
      this.obstacle.push(new Obstacle(this.gameScreen));
    }
  }
  endGame() {
    this.player.element.remove();
    this.obstacle.forEach((obstacle) => obstacle.element.remove());
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
