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

    this.xDistance = firstPoint.displayX - secondPoint.displayX;
    this.yDistance = firstPoint.displayY - secondPoint.displayY;
  }

  ease(t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
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
      this.firstPoint.displayX = this.ease(this.frame, this.originalDisplayCoords.firstPoint.displayX, -this.xDistance, this.frameDuration);
      this.firstPoint.displayY = this.ease(this.frame, this.originalDisplayCoords.firstPoint.displayY, -this.yDistance, this.frameDuration);

      this.secondPoint.displayX = this.ease(this.frame, this.originalDisplayCoords.secondPoint.displayX, this.xDistance, this.frameDuration);
      this.secondPoint.displayY = this.ease(this.frame, this.originalDisplayCoords.secondPoint.displayY, this.yDistance, this.frameDuration);
    }
  }

  render(ctx) {
    if (this.isRunning) {
      this.firstPoint.render(ctx);
      this.secondPoint.render(ctx);
    }
  }
}
