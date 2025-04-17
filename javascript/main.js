import { Rectangle } from "./handlers/Rectangle.js";
import { Circle } from "./handlers/Circle.js";
import { Line } from "./handlers/Line.js";
var ShapeType;
(function (ShapeType) {
    ShapeType["Rectangle"] = "rectangle";
    ShapeType["Circle"] = "circle";
    ShapeType["Line"] = "line";
})(ShapeType || (ShapeType = {}));
let currentShape = ShapeType.Rectangle;
const canvas = document.getElementById('canvas');
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
    startPoint = getMousePos(e);
    isDrawing = true;
});
canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing)
        return;
    currentPoint = getMousePos(e);
    redraw();
});
canvas.addEventListener('mouseup', (e) => {
    if (!isDrawing || !startPoint || !currentPoint)
        return;
    const color = colorBtn.value;
    switch (currentShape) {
        case ShapeType.Rectangle:
            shapes.push(new Rectangle(startPoint, currentPoint, color));
            break;
        case ShapeType.Circle:
            shapes.push(new Circle(startPoint, currentPoint, color));
            break;
        case ShapeType.Line:
            shapes.push(new Line(startPoint, currentPoint, color));
            break;
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