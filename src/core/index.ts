import { Camera } from "./camera";

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

    constructor() {
        for (let i = 0; i < 100; i++) {
            this.balls.push({
                x: Math.random() * 600, y: Math.random() * 600,
                vx: Math.random() * 6 - 3, vy: Math.random() * 6 - 3,
                size: 15, color: "blue"
            });
        }
        this.render = this.render.bind(this);
    }
    
    setCanvas(canvas: HTMLCanvasElement | null) {
        this.canvas = canvas;
        this.camera = new Camera(this.canvas);
    }

    private renderLoop(ctx: CanvasRenderingContext2D) {
        if (this.canvas) {
            const { width, height } = this.canvas.getBoundingClientRect();
            ctx.fillStyle = 'green';
            ctx.fillRect(0, 0, width, height);
            this.balls.forEach(ball => {
                if (this.canvas) {
                    ctx.fillStyle = ball.color;
                    ctx.fillRect(ball.x - ball.size / 2, ball.y - ball.size / 2, ball.size, ball.size);
                    ball.x += ball.vx;
                    ball.y += ball.vy;
                    if (ball.x < 0 || ball.x > width / 2) {
                        ball.vx *= -1;
                    }
                    if (ball.y < 0 || ball.y > height / 2) {
                        ball.vy *= -1;
                    }
                }
            })
        }
    }

    render() {
        if (this.canvas) {
            const ctx = this.canvas.getContext("2d");
            if (ctx) {
                this.renderLoop(ctx);
            }
        }
        window.requestAnimationFrame(this.render);
    }

}

const instance = new Engine();

export default instance;