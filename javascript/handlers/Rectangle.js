import { lineWidth } from "../type.js";
export class Rectangle {
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
        const x = Math.min(this.start.x, this.end.x);
        const y = Math.min(this.start.y, this.end.y);
        const width = Math.abs(this.start.x - this.end.x);
        const height = Math.abs(this.start.y - this.end.y);
        ctx.fillStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
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
//# sourceMappingURL=Rectangle.js.map