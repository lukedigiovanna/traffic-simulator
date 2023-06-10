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

    rotate(degrees: number) {
        // rotate about the center of the canvas
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.rotate(degrees * Math.PI / 180);
        this.ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2);
        
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

    fillCircle(x: number, y: number, radius: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(
            (x - this.position.x) * this.zoom,
            (y - this.position.y) * this.zoom, 
            radius * this.zoom, 
            0, 2 * Math.PI
        );
        this.ctx.fill();
    }

    drawBezierCurve(start: Point, end: Point, control1: Point, control2: Point, color: string, width: number = 1) {
        this.ctx.strokeStyle  = color;
        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        this.ctx.moveTo((start.x - this.position.x) * this.zoom, (start.y - this.position.y) * this.zoom);
        this.ctx.bezierCurveTo(
            (control1.x - this.position.x) * this.zoom,
            (control1.y - this.position.y) * this.zoom,
            (control2.x - this.position.x) * this.zoom,
            (control2.y - this.position.y) * this.zoom,
            (end.x - this.position.x) * this.zoom,
            (end.y - this.position.y) * this.zoom
        );
        this.ctx.stroke();
    }
}

export { Camera };