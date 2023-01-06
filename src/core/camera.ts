import { Point } from "../utils/types";

class Camera {
    public position: Point = { x: 0, y: 0 };
    public zoom: number = 1;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    refresh(color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    fillRect(x: number, y: number, width: number, height: number, color: string) {
        this.ctx.fillStyle = color;
        // use the scale and position of the camera to calculate the pixel space coordinates
        this.ctx.fillRect(
            (x - this.position.x) * this.zoom,
            (y - this.position.y) * this.zoom,
            width * this.zoom,
            height * this.zoom
        );
    }
}

export { Camera };