export class Line {
    start;
    end;
    color;
    constructor(start, end, color) {
        this.start = start;
        this.end = end;
        this.color = color;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}
//# sourceMappingURL=Line.js.map