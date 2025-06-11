import { lineWidth } from "../type.js";
export class Line {
    start;
    end;
    color;
    width;
    constructor(start, end, color, width = lineWidth) {
        this.start = start;
        this.end = end;
        this.color = color;
        this.width = width;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.stroke();
    }
    isHit(point) {
        const x = Math.min(this.start.x, this.end.x);
        const y = Math.min(this.start.y, this.end.y);
        const width = Math.abs(this.end.x - this.start.x);
        const height = Math.abs(this.end.y - this.start.y);
        return point.x >= x && point.x <= x + width &&
            point.y >= y && point.y <= y + height;
    }
    move(dx, dy) {
        this.start.x += dx;
        this.start.y += dy;
        this.end.x += dx;
        this.end.y += dy;
    }
    resize(x, y, w, h) {
        this.start = { x, y };
        this.end = { x: x + w, y: y + h };
    }
}
//# sourceMappingURL=Line.js.map