import { PointGrid } from './background/point-grid';
import { PointSwapAnimation } from './background/point-swap-animation';

export class PointGridBackground {
  constructor() {
    this.backgroundCanvas = document.querySelector('#background-canvas');
    this.ctx = backgroundCanvas.getContext('2d');

    this.pointGrid = new PointGrid(100, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    this.pointSwapAnimations = [];
  }

  start() {
    this.addResizeListener();
    this.resize();

    this.startSpawnLoop();

    this.mainLoop();
  }

  addResizeListener() {
    window.addEventListener('resize', resize);
  }

  resize() {
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    this.backgroundCanvas.width = displayWidth;
    this.backgroundCanvas.height = displayHeight;

    this.pointGrid.resize(displayWidth, displayHeight);
  }

  startSpawnLoop() {
    setInterval(() => {
      const [firstPoint, secondPoint] = this.pointGrid.selectVisibleAdjacentPoints();

      if (firstPoint == null || secondPoint == null) return;

      firstPoint.visible = false;
      secondPoint.visible = false;

      pointSwapAnimations.push(new PointSwapAnimation(firstPoint, secondPoint, animation => {
        firstPoint.visible = true;
        secondPoint.visible = true;

        pointSwapAnimations.splice(pointSwapAnimations.indexOf(animation), 1);
      }));
    }, 500)
  }

  mainLoop() {
    this.update();
    this.render();
    requestAnimationFrame(this.mainLoop);
  }

  update() {
    this.pointGrid.update();
    this.pointSwapAnimations.forEach(pointSwapAnimation => pointSwapAnimation.update());
  }

  render() {
    this.clear();
    this.pointGrid.render(this.ctx);
    this.pointSwapAnimations.forEach(pointSwapAnimation => pointSwapAnimation.render(this.ctx));
  }

  clear() {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  }
}
