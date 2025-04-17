export type Point = { x: number; y: number };
const Width = document.getElementById('number') as HTMLInputElement;

export const lineWidth = parseFloat(Width.value);