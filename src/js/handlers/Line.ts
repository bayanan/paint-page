import { Point } from "../type";
import { lineWidth } from "../type";


export class Line {
    constructor(
      public start: Point,
      public end: Point,
      public color: string,
      public width: number = lineWidth,
    ) {}
  
    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.moveTo(this.start.x, this.start.y); 
      ctx.lineTo(this.end.x, this.end.y);     
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.width;
      ctx.stroke();
    }
  }