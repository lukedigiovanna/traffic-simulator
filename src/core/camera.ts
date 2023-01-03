import { Point } from "../utils/types";

class Camera {
    private position: Point = { x: 0, y: 0 };
    private aspectRatio: number = 1;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    refresh(color: string) {
        const { width, height } = this.canvas.getBoundingClientRect();
        this.aspectRatio = width / height;
        
    }
}

export { Camera };