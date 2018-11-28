import { PointGrid } from './point-grid';
import { PointSwapAnimation } from './point-swap-animation';

const backgroundCanvas = document.querySelector('#background-canvas');
const ctx = backgroundCanvas.getContext('2d');

const pointGrid = new PointGrid(100, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
const pointSwapAnimations = [];

setInterval(() => {
  const [firstPoint, secondPoint] = pointGrid.selectVisibleAdjacentPoints();

  if (firstPoint == null || secondPoint == null) return;

  firstPoint.visible = false;
  secondPoint.visible = false;

  pointSwapAnimations.push(new PointSwapAnimation(firstPoint, secondPoint, animation => {
    firstPoint.visible = true;
    secondPoint.visible = true;

    pointSwapAnimations.splice(pointSwapAnimations.indexOf(animation), 1);
  }));
}, 500)

function mainLoop() {
  update();
  render();
  requestAnimationFrame(mainLoop);
}

function update() {
  pointGrid.update();
  pointSwapAnimations.forEach(pointSwapAnimation => pointSwapAnimation.update());
}

function render() {
  clear();
  pointGrid.render(ctx);
  pointSwapAnimations.forEach(pointSwapAnimation => pointSwapAnimation.render(ctx));
}

function clear() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
}

window.addEventListener('resize', resize);
function resize() {
  const displayWidth = window.innerWidth;
  const displayHeight = window.innerHeight;

  backgroundCanvas.width = displayWidth;
  backgroundCanvas.height = displayHeight;

  pointGrid.resize(displayWidth, displayHeight);
}
resize();

mainLoop();
