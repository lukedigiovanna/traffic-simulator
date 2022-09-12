
class Engine {
    private canvas: HTMLCanvasElement | null = null;
    
    constructor() {
        this.render = this.render.bind(this);
    }

    setCanvas(canvas: HTMLCanvasElement | null) {
        this.canvas = canvas;
    }

    private renderLoop(ctx: CanvasRenderingContext2D) {
        if (this.canvas) {
            ctx.fillStyle = 'red';
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    render() {
        if (this.canvas) {
            const ctx = this.canvas.getContext("2d");
            if (ctx) {
                this.renderLoop(ctx);
            }
        }
    }

}

const instance = new Engine();

export default instance;