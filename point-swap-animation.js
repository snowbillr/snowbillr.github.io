export class PointSwapAnimation {
  constructor(firstPoint, secondPoint, callback) {
    this.frameDuration = 60; // in frames
    this.frame = 0;
    this.isRunning = true;

    this.callback = callback;
    this.callbackCalled = false;

    this.firstPoint = firstPoint.clone();
    this.secondPoint = secondPoint.clone();

    this.originalDisplayCoords = {
      firstPoint: {
        displayX: firstPoint.displayX,
        displayY: firstPoint.displayY,
      },
      secondPoint: {
        displayX: secondPoint.displayX,
        displayY: secondPoint.displayY,
      }
    };

    const xDistance = firstPoint.displayX - secondPoint.displayX;
    const yDistance = firstPoint.displayY - secondPoint.displayY;

    this.xStep = xDistance / this.frameDuration;
    this.yStep = yDistance / this.frameDuration;
  }

  update() {
    this.frame += 1;

    if (this.frame > this.frameDuration) {
      this.isRunning = false;

      if (!this.callbackCalled) {
        this.callback(this);
        this.callbackCalled = true;
      }
    } else {
      this.firstPoint.displayX -= this.xStep;
      this.firstPoint.displayY -= this.yStep;

      this.secondPoint.displayX += this.xStep;
      this.secondPoint.displayY += this.yStep;
    }
  }

  render(ctx) {
    if (this.isRunning) {
      this.firstPoint.render(ctx);
      this.secondPoint.render(ctx);
    }
  }
}
