import { Point } from "../type";
import { lineWidth } from "../type";

export class Circle {
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

      const radiusX = width / 2;
      const radiusY = height / 2;

      const centerX = x + radiusX;
      const centerY = y + radiusY;

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.lineWidth = this.width;
      ctx.fill();
      ctx.stroke();
    }
  }