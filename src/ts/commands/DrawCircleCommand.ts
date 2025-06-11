import { Command } from './Command.js';
import { Circle } from '../handlers/Circle.js';
import { Canvas } from '../utils/Canvas.js';

export class DrawCircleCommand implements Command {
  constructor(private circle: Circle) {}

  execute(): void {
    this.circle.draw(Canvas.getContext());
  }

  undo(): void { }
}
