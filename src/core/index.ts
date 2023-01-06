import { Camera } from "./camera";
import { Point } from "../utils/types";

interface Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
}

class Engine {
    private canvas: HTMLCanvasElement | null = null;
    private camera: Camera | null = null;
    private balls: Ball[] = [];
    private dragListeners: any[] = [];
    private mousePosition: Point | null = null;
    private mouseDown: boolean = false;

    constructor() {
        this.render = this.render.bind(this);
        
    }
    
    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.camera = new Camera(this.canvas);
        this.canvas?.addEventListener("mousemove", (e: MouseEvent) => {
            if (this.mousePosition && this.mouseDown) {
                const dx = e.clientX - this.mousePosition.x;
                const dy = e.clientY - this.mousePosition.y;
                this.camera!.position.x -= dx / this.camera!.zoom;
                this.camera!.position.y -= dy / this.camera!.zoom;
            }
            this.mousePosition = { x: e.clientX, y: e.clientY };
        })
        this.canvas?.addEventListener("mousedown", (e: MouseEvent) => {
            this.mouseDown = true;
        });
        this.canvas?.addEventListener("mouseup", (e: MouseEvent) => {
            this.mouseDown = false;
        });
        this.canvas?.addEventListener("mouseleave", (e: MouseEvent) => {
            this.mouseDown = false;
        });
        this.canvas?.addEventListener("wheel", (e: WheelEvent) => {
            // zoom into the mouse position
            const mousePosition = { x: e.clientX, y: e.clientY };
            const mousePositionInWorld = {
                x: (mousePosition.x - this.canvas!.offsetLeft) / this.camera!.zoom + this.camera!.position.x,
                y: (mousePosition.y - this.canvas!.offsetTop) / this.camera!.zoom + this.camera!.position.y
            };
            const zoom = e.deltaY > 0 ? 0.9 : 1.1;
            this.camera!.zoom *= zoom;
            this.camera!.position.x = mousePositionInWorld.x - (mousePosition.x - this.canvas!.offsetLeft) / this.camera!.zoom;
            this.camera!.position.y = mousePositionInWorld.y - (mousePosition.y - this.canvas!.offsetTop) / this.camera!.zoom;
        });
        for (let i = 0; i < 500; i++) {
            this.balls.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: Math.random() * 10 - 5,
                vy: Math.random() * 10 - 5,
                size: Math.random() * 50 + 10,
                color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
            });
        }
    }


    render() {
        if (this.camera) {
            this.camera.refresh("black");
            for (let i = 0; i < this.balls.length; i++) {
                const ball = this.balls[i];
                this.camera.fillRect(ball.x, ball.y, ball.size, ball.size, ball.color);
                ball.x += ball.vx;
                ball.y += ball.vy;
                if (ball.x < 0 || ball.x + ball.size > this.canvas!.width) {
                    ball.vx *= -1;
                }
                if (ball.y < 0 || ball.y + ball.size > this.canvas!.height) {
                    ball.vy *= -1;
                }
                if (ball.x < 0) {
                    ball.x = 0;
                }
                if (ball.y < 0) {
                    ball.y = 0;
                }
                if (ball.x + ball.size > this.canvas!.width) {
                    ball.x = this.canvas!.width - ball.size;
                }
                if (ball.y + ball.size > this.canvas!.height) {
                    ball.y = this.canvas!.height - ball.size;
                }
            }
        }
        window.requestAnimationFrame(this.render);
    }

}

const instance = new Engine();

export default instance;