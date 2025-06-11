import { Command } from './Command.js';
import { Rectangle } from '../handlers/Rectangle.js';
import { Canvas } from '../utils/Canvas.js';

export class DrawRectangleCommand implements Command {
  constructor(private rectangle: Rectangle) {}

  execute(): void {
    this.rectangle.draw(Canvas.getContext());
  }

  undo(): void { }
}
