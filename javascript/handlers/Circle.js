import { lineWidth } from "../type.js";
export class Circle {
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
    isHit(point) {
        const { centerX, centerY, radiusX, radiusY } = this.getEllipseParams();
        if (radiusX === 0 || radiusY === 0)
            return false;
        const dx = point.x - centerX;
        const dy = point.y - centerY;
        // Проверка попадания в эллипс
        const norm = (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY);
        return norm <= 1;
    }
    move(dx, dy) {
        this.start.x += dx;
        this.start.y += dy;
        this.end.x += dx;
        this.end.y += dy;
    }
    getBounds() {
        const x = Math.min(this.start.x, this.end.x);
        const y = Math.min(this.start.y, this.end.y);
        const w = Math.abs(this.start.x - this.end.x);
        const h = Math.abs(this.start.y - this.end.y);
        return { x, y, w, h };
    }
    resize(x, y, w, h) {
        this.start = { x, y };
        this.end = { x: x + w, y: y + h };
    }
    getEllipseParams() {
        const x = Math.min(this.start.x, this.end.x);
        const y = Math.min(this.start.y, this.end.y);
        const width = Math.abs(this.start.x - this.end.x);
        const height = Math.abs(this.start.y - this.end.y);
        const radiusX = width / 2;
        const radiusY = height / 2;
        const centerX = x + radiusX;
        const centerY = y + radiusY;
        return { centerX, centerY, radiusX, radiusY };
    }
}
//# sourceMappingURL=Circle.js.map