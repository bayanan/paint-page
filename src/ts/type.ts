export enum ShapeType {
   Rectangle = 'rectangle',
   Circle = 'circle',
   Line = 'line',
}

export type Point = { x: number; y: number };
//export const isModuleALoaded = true;

let _lineWidth = 1;

export const getLineWidth = () => _lineWidth;


export function initLineWidthListener() {
  const input = document.getElementById('number') as HTMLInputElement | null;

  if (!input) {
    console.warn('Элемент с id="number" не найден');
    return;
  }

  const updateLineWidth = () => {
    const value = parseFloat(input.value);
    if (!isNaN(value)) {
      _lineWidth = value;
      console.log('lineWidth обновлён:', _lineWidth);
    }
  };

  updateLineWidth();

  input.addEventListener('input', updateLineWidth);
}