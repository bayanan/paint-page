import { Command } from './Command.js';
import { Line } from '../handlers/Line.js';
import { Canvas } from '../utils/Canvas.js';

export class DrawLineCommand implements Command {
  constructor(private line: Line) {}

  execute(): void {
    this.line.draw(Canvas.getContext());
  }

  undo(): void { }
}
