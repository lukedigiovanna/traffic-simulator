import { Camera } from "./camera";
import { Point } from "../utils/types";
import { Road, RoadSegment } from "./roadsystem";
import { Tool, toolClick, toolRender } from "./toolmanager";

export type Keyboard = Map<string, boolean>;

export class Engine {
    private canvas: HTMLCanvasElement | null = null;
    private camera: Camera | null = null;
    private mousePosition: Point = {x: 0, y: 0};
    private mouseDown: boolean = false;
    private keyboard: Keyboard = new Map();

    private _tool: Tool = null;

    private roads: Road[] = [];

    constructor() {
        this.render = this.render.bind(this);
    }
    
    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.camera = new Camera(this.canvas);
        this.canvas?.addEventListener("keydown", (e: KeyboardEvent) => {
            this.keyboard.set(e.key, true);
        });
        this.canvas?.addEventListener("keyup", (e: KeyboardEvent) => {
            this.keyboard.set(e.key, false);
        });
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
            const mousePositionInWorld = {
                x: (e.clientX - this.canvas!.offsetLeft) / this.camera!.zoom + this.camera!.position.x,
                y: (e.clientY - this.canvas!.offsetTop) / this.camera!.zoom + this.camera!.position.y
            };
            toolClick(this, mousePositionInWorld, this.keyboard);
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

    setTool(tool: Tool) {
        this._tool = tool;
    }

    get tool() {
        return this._tool;
    }

    add(segment: RoadSegment) {
        const road = new Road();
        road.addSegment(segment);
        this.roads.push(road);
    }

    render() {
        if (this.camera) {
            this.camera.refresh("black");
            for (let i = 0; i < this.roads.length; i++) {
                this.roads[i].render(this.camera);
            }
            const worldPos = {
                x: (this.mousePosition.x - this.canvas!.offsetLeft) / this.camera!.zoom + this.camera!.position.x,
                y: (this.mousePosition.y - this.canvas!.offsetTop) / this.camera!.zoom + this.camera!.position.y
            };
            toolRender(this.tool, this.camera, worldPos);
        }
        window.requestAnimationFrame(this.render);
    }

}

const instance = new Engine();

export default instance;