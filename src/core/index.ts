import { Camera } from "./camera";
import { Point } from "../utils/types";
import { Road, RoadSegment } from "./roadsystem";

class Engine {
    private canvas: HTMLCanvasElement | null = null;
    private camera: Camera | null = null;
    private mousePosition: Point | null = null;
    private mouseDown: boolean = false;

    private road: Road;

    constructor() {
        this.render = this.render.bind(this);
        this.road = new Road();
        this.road.addSegment(new RoadSegment({ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 50, y: 50 }));
    }
    
    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.camera = new Camera(this.canvas);
        this.canvas?.addEventListener("mousemove", (e: MouseEvent) => {
            if (this.mousePosition && this.mouseDown) {
                if (e.buttons === 1) {
                    // translate
                    const dx = e.clientX - this.mousePosition.x;
                    const dy = e.clientY - this.mousePosition.y;
                    this.camera!.position.x -= dx / this.camera!.zoom;
                    this.camera!.position.y -= dy / this.camera!.zoom;
                }
                else if (e.buttons === 4) {
                    // rotate the camera
                    const dx = e.clientX - this.mousePosition.x;
                    const dy = e.clientY - this.mousePosition.y;
                    this.camera!.rotate(dx / 10);
                    
                }
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
    }


    render() {
        if (this.camera) {
            this.camera.refresh("black");
            this.road.render(this.camera);
        }
        window.requestAnimationFrame(this.render);
    }

}

const instance = new Engine();

export default instance;