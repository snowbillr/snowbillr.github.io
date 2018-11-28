export class Point {
  constructor(gridX, gridY) {
    this.size = 3;

    this.gridX = gridX;
    this.gridY = gridY;

    this.displayX = 0;
    this.displayY = 0;

    this.visible = true;
  }

  clone() {
    const newPoint = new Point(this.gridX, this.gridY);
    newPoint.displayX = this.displayX;
    newPoint.displayY = this.displayY;

    return newPoint;
  }

  render(ctx) {
    if (this.visible) {
      ctx.fillStyle = '#ccc';
      ctx.fillRect(this.displayX, this.displayY, this.size, this.size);
    }
  }
}
