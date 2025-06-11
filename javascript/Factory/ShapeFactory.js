import { Rectangle } from ".././handlers/Rectangle.js";
import { Circle } from ".././handlers/Circle.js";
import { Line } from ".././handlers/Line.js";
export var ShapeType;
(function (ShapeType) {
    ShapeType["Rectangle"] = "rectangle";
    ShapeType["Circle"] = "circle";
    ShapeType["Line"] = "line";
})(ShapeType || (ShapeType = {}));
export class ShapeFactory {
    static create(type, start, end, color) {
        let shape;
        switch (type) {
            case ShapeType.Rectangle:
                shape = new Rectangle(start, end, color);
                break;
            case ShapeType.Circle:
                shape = new Circle(start, end, color);
                break;
            case ShapeType.Line:
                shape = new Line(start, end, color);
                break;
            default:
                throw new Error("Unknown shape type");
        }
        return new ShapeWrapper(shape);
    }
}
export class ShapeWrapper {
    shape;
    selected = false;
    selectedHandle = null;
    moving = false;
    moveStart = null;
    constructor(shape) {
        this.shape = shape;
    }
    draw(ctx) {
        this.shape.draw(ctx);
        if (this.selected)
            this.drawBorder(ctx);
    }
    drawBorder(ctx) {
        const { x, y, w, h } = this.getBounds();
        ctx.save();
        ctx.strokeStyle = 'blue';
        ctx.setLineDash([5, 3]);
        ctx.strokeRect(x, y, w, h);
        const size = 8;
        const handles = this.getHandles();
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'blue';
        handles.forEach(({ x, y }) => {
            ctx.fillRect(x - size / 2, y - size / 2, size, size);
            ctx.strokeRect(x - size / 2, y - size / 2, size, size);
        });
        ctx.restore();
    }
    isHit(point) {
        return this.getHandleAt(point) !== null || this.shape.isHit(point);
    }
    getBounds() {
        return this.shape.getBounds();
    }
    move(dx, dy) {
        this.shape.move(dx, dy);
    }
    // --- Добавлено: управление перемещением ---
    startMove(p) {
        this.moving = true;
        this.moveStart = p;
    }
    moveToPoint(p) {
        if (!this.moving || !this.moveStart)
            return;
        const dx = p.x - this.moveStart.x;
        const dy = p.y - this.moveStart.y;
        this.move(dx, dy);
        this.moveStart = p; // Обновляем для плавности
    }
    stopMove() {
        this.moving = false;
        this.moveStart = null;
    }
    isMoving() {
        return this.moving;
    }
    // -------------------------------------------
    resize(x, y, w, h) {
        this.shape.resize(x, y, w, h);
    }
    resizeTo(newX, newY) {
        const bounds = this.getBounds();
        switch (this.selectedHandle) {
            case 'nw':
                this.shape.resize(newX, newY, bounds.x + bounds.w - newX, bounds.y + bounds.h - newY);
                break;
            case 'ne':
                this.shape.resize(bounds.x, newY, newX - bounds.x, bounds.y + bounds.h - newY);
                break;
            case 'sw':
                this.shape.resize(newX, bounds.y, bounds.x + bounds.w - newX, newY - bounds.y);
                break;
            case 'se':
                this.shape.resize(bounds.x, bounds.y, newX - bounds.x, newY - bounds.y);
                break;
        }
    }
    startResize(point) {
        this.selectedHandle = this.getHandleAt(point);
    }
    stopResize() {
        this.selectedHandle = null;
    }
    isResizing() {
        return this.selectedHandle !== null;
    }
    isResizeHandleHit(point) {
        return this.getHandleAt(point) !== null;
    }
    getHandles() {
        const { x, y, w, h } = this.getBounds();
        return [
            { x, y }, // nw
            { x: x + w, y }, // ne
            { x, y: y + h }, // sw
            { x: x + w, y: y + h } // se
        ];
    }
    getHandleAt(point) {
        const handles = ['nw', 'ne', 'sw', 'se'];
        const positions = this.getHandles();
        const size = 8;
        for (let i = 0; i < positions.length; i++) {
            const handle = positions[i];
            if (point.x >= handle.x - size &&
                point.x <= handle.x + size &&
                point.y >= handle.y - size &&
                point.y <= handle.y + size) {
                return handles[i];
            }
        }
        return null;
    }
}
//# sourceMappingURL=ShapeFactory.js.map