/*
 Manages the tool system
*/

import { Engine, Keyboard } from ".";
import { Point } from "../utils/types";
import { Camera } from "./camera";
import { RoadSegment } from "./roadsystem";

export type Tool = null | "select" | "build-road" | "destroy";

let buildState: any = {
    start: null, control1: null, control2: null, end: null
};

const buildClick = (core: Engine, position: Point, placeControl: boolean) => {
    if (!buildState.start) {
        buildState.start = position;
    }
    else {
        if (placeControl) {
            if (!buildState.control1) {
                buildState.control1 = position;
            }
            else if (!buildState.control2) {
                buildState.control2 = position;
            }
            else {
                buildState.end = position;
            }
        }
        else {
            buildState.end = position;
        }
    }

    if (buildState.end) {
        // construct the road segment
        const control1 = buildState.control1 ? buildState.control1 : buildState.end;
        const control2 = buildState.control2 ? buildState.control2 : control1;
        const segment = new RoadSegment(
            buildState.start, buildState.end, control1, control2
        );
        core.add(segment);
        // reset the build state
        buildState = {
            start: null, control1: null, control2: null, end: null
        };
    }
}

export const toolClick = (core: Engine, worldPosition: Point, keyboard: Keyboard) => {
    if (core.tool === "build-road") {
        buildClick(core, worldPosition, keyboard.get("Shift") || false);
    }
}

export const toolRender = (tool: Tool, camera: Camera, mouse: Point) => {
    if (tool === "build-road") {
        // look at the build state and draw the bezier curve corresponding to its build state.    
        camera.fillCircle(mouse.x, mouse.y, 5, "gray");
        if (buildState.start) {
            const start = buildState.start;
            const control1 = buildState.control1 ? buildState.control1 : buildState.start;
            const control2 = buildState.control2 ? buildState.control2 : control1;
            camera.fillCircle(start.x, start.y, 5, "green");
            camera.fillCircle(control1.x, control1.y, 5, "pink");
            camera.fillCircle(control2.x, control2.y, 5, "pink");
            const end = mouse;
            camera.drawBezierCurve(start, end, control1, control2, "green", 3);
        }
    }
}