import { PointGridBackground } from './background/point-grid-background';
import { ConsoleMessage } from './console-message';

const pointGridBackground = new PointGridBackground();
pointGridBackground.start();

const consoleMessage = new ConsoleMessage();
consoleMessage.print();
