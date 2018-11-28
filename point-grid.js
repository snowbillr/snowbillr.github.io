import { Point } from './point';

export class PointGrid {
  constructor(pointDistance, displayWidth, displayHeight) {
    this.pointDistance = pointDistance;
    this.resize(displayWidth, displayHeight);
  }

  resize(displayWidth, displayHeight) {
    this.points = [];

    this.horizontalPointCount = Math.ceil(displayWidth / this.pointDistance);
    this.verticalPointCount = Math.ceil(displayHeight / this.pointDistance);

    this.xPadding = (displayWidth - (this.horizontalPointCount - 1) * this.pointDistance) / 2;
    this.yPadding = (displayHeight - (this.verticalPointCount - 1) * this.pointDistance) / 2;

    for (let x = 0; x < this.horizontalPointCount; x++) {
      for (let y = 0; y < this.verticalPointCount; y++) {
        this.points.push(new Point(x, y));
      }
    }
  }

  update() {
    this.points.forEach(point => {
      point.displayX = point.gridX * this.pointDistance + this.xPadding;
      point.displayY = point.gridY * this.pointDistance + this.yPadding;
    });
  }

  render(ctx) {
    this.points.forEach(point => {
      point.render(ctx);
    });
  }

  selectVisibleAdjacentPoints() {
    const firstPoint = this.shuffleArray(this.points.filter(point => point.visible))[0];
    if (firstPoint == null) {
      return [null, null];
    }

    const secondPoint = this.shuffleArray(this.selectVisibleCardinalPoints(firstPoint))[0];

    return [firstPoint, secondPoint];
  }

  selectVisibleCardinalPoints({ gridX, gridY }) {
    return [
      this.findPoint(gridX + 1, gridY),
      this.findPoint(gridX - 1, gridY),
      this.findPoint(gridX, gridY + 1),
      this.findPoint(gridX, gridY - 1),
    ].filter(point => point != null)
     .filter(point => point.visible);
  }

  findPoint(gridX, gridY) {
    return this.points.find(point => point.gridX === gridX && point.gridY === gridY);
  }

  // taken from https://stackoverflow.com/a/6274381/1950372
  shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
