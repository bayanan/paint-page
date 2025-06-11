import { Rectangle } from "./handlers/Rectangle.js";
import { Circle } from "./handlers/Circle.js";
import { Line } from "./handlers/Line.js";
import { ShapeFactory } from "./Factory/ShapeFactory.js";
import { ShapeWrapper } from "./Factory/ShapeFactory.js";
import './type.js';
var ShapeType;
(function (ShapeType) {
    ShapeType["Rectangle"] = "rectangle";
    ShapeType["Circle"] = "circle";
    ShapeType["Line"] = "line";
})(ShapeType || (ShapeType = {}));
let currentShape = ShapeType.Rectangle;
let selectedShape = null;
const canvas = document.getElementById('canvas');
canvas.width = 1300;
canvas.height = 680;
const ctx = canvas.getContext('2d');
const colorBtn = document.getElementById('color');
const rectBtn = document.getElementById('rectBtn');
const circleBtn = document.getElementById('circleBtn');
const lineBtn = document.getElementById('lineBtn');
const buttons = [rectBtn, circleBtn, lineBtn];
function setShape(shape, btn) {
    currentShape = shape;
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}
rectBtn.addEventListener('click', () => setShape(ShapeType.Rectangle, rectBtn));
circleBtn.addEventListener('click', () => setShape(ShapeType.Circle, circleBtn));
lineBtn.addEventListener('click', () => setShape(ShapeType.Line, lineBtn));
let isDrawing = false;
let startPoint = null;
let currentPoint = null;
const shapes = [];
canvas.addEventListener('mousedown', (e) => {
    const point = getMousePos(e);
    selectedShape = null;
    // Снимаем выделение у всех фигур
    shapes.forEach(s => s.selected = false);
    // 1. Проверяем клики по "ручкам" изменения размера выделенных фигур
    for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i];
        if (shape.isResizeHandleHit?.(point)) {
            selectedShape = shape;
            shape.selected = true;
            shape.startResize(point);
            redraw();
            return;
        }
        // 2. Проверяем, попали ли по фигуре для перемещения
        if (shape.isHit(point)) {
            selectedShape = shape;
            shape.selected = true;
            shape.startMove(point);
            redraw();
            return;
        }
    }
    // 3. Если не попали ни по одной фигуре, начинаем рисование новой
    isDrawing = true;
    startPoint = point;
    currentPoint = point;
});
canvas.addEventListener('mousemove', (e) => {
    const point = getMousePos(e);
    if (isDrawing) {
        currentPoint = point;
        redraw();
        return;
    }
    if (selectedShape) {
        if (selectedShape.isResizing()) {
            selectedShape.resizeTo(point.x, point.y);
        }
        else if (selectedShape.isMoving()) {
            selectedShape.moveToPoint(point);
        }
        redraw();
    }
});
canvas.addEventListener('mouseup', (e) => {
    if (isDrawing && startPoint && currentPoint) {
        const color = colorBtn.value;
        const shape = ShapeFactory.create(currentShape, startPoint, currentPoint, color);
        const wrapped = new ShapeWrapper(shape);
        wrapped.selected = true;
        shapes.push(wrapped);
    }
    if (selectedShape) {
        selectedShape.stopResize();
        selectedShape.stopMove();
    }
    isDrawing = false;
    startPoint = null;
    currentPoint = null;
    redraw();
});
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}
function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => shape.draw(ctx));
    if (isDrawing && startPoint && currentPoint) {
        const previewColor = 'rgba(0, 0, 0, 0.3)';
        let preview;
        switch (currentShape) {
            case ShapeType.Rectangle:
                preview = new Rectangle(startPoint, currentPoint, previewColor);
                break;
            case ShapeType.Circle:
                preview = new Circle(startPoint, currentPoint, previewColor);
                break;
            case ShapeType.Line:
                preview = new Line(startPoint, currentPoint, previewColor);
                break;
        }
        preview.draw(ctx);
    }
}
//# sourceMappingURL=main.js.map