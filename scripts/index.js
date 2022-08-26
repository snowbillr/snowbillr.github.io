import { PointGridBackground } from './background/point-grid-background';
import { ConsoleMessage } from './console-message';

if (document.readyState === "complete" || document.readyState === "interactive") {
  onReady();
} else {
  document.addEventListener("DOMContentLoaded", onReady);
}

function onReady() {
  const pointGridBackground = new PointGridBackground();
  pointGridBackground.start();

  const consoleMessage = new ConsoleMessage();
  consoleMessage.print();
}