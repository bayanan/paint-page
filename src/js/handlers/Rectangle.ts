import { Point } from "../type";
import { lineWidth } from "../type";


export class Rectangle {
    constructor(
      public start: Point,
      public end: Point,
      public color: string,
      public width: number = lineWidth,
    ) {}
  
    draw(ctx: CanvasRenderingContext2D) {
      const x = Math.min(this.start.x, this.end.x);
      const y = Math.min(this.start.y, this.end.y);
      const width = Math.abs(this.start.x - this.end.x);
      const height = Math.abs(this.start.y - this.end.y);
  
      ctx.fillStyle = this.color;
      ctx.lineWidth = this.width;
      ctx.fillRect(x, y, width, height);
      ctx.strokeRect(x, y, width, height);
    }
  }