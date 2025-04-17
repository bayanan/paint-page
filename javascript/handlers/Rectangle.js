export class Rectangle {
    start;
    end;
    color;
    constructor(start, end, color) {
        this.start = start;
        this.end = end;
        this.color = color;
    }
    draw(ctx) {
        const x = Math.min(this.start.x, this.end.x);
        const y = Math.min(this.start.y, this.end.y);
        const width = Math.abs(this.start.x - this.end.x);
        const height = Math.abs(this.start.y - this.end.y);
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
    }
}
//# sourceMappingURL=Rectangle.js.map