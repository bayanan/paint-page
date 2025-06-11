export class Canvas {
  private static canvas: HTMLCanvasElement;
  private static ctx: CanvasRenderingContext2D;

  static init(canvas: HTMLCanvasElement): void {
    Canvas.canvas = canvas;
    Canvas.ctx = canvas.getContext('2d')!;
  }

  static getContext(): CanvasRenderingContext2D {
    return Canvas.ctx;
  }

  static clear(): void {
    Canvas.ctx.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
  }
}
