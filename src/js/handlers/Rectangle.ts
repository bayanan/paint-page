import { Point } from "../type.js";
import { lineWidth } from "../type.js";


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

    isHit(point: Point): boolean {
      const x = Math.min(this.start.x, this.end.x);
      const y = Math.min(this.start.y, this.end.y);
      const width = Math.abs(this.end.x - this.start.x);
      const height = Math.abs(this.end.y - this.start.y);
  
      return point.x >= x && point.x <= x + width &&
             point.y >= y && point.y <= y + height;
    }
  
    move(dx: number, dy: number): void {
      this.start.x += dx;
      this.start.y += dy;
      this.end.x += dx;
      this.end.y += dy;
    }

    resize(x: number, y: number, w: number, h: number): void {
      this.start = { x, y };
      this.end = { x: x + w, y: y + h };
    }
  }