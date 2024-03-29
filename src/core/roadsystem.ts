import { Point } from "../utils/types";
import { Camera } from "./camera";

/**
 * Defines all code responsible for managing a system of roads and the vehicles
 * contained on the road.
 */

class Vehicle {

}

/*
A road network is stored as a directed graph of road edges.
Edges can be thought of as the "road" part of a road. I.e. a street.
It can store information such as the length of the road and the speed limit.

These edges are multidimensional in that a given vehicle traveling on
this road can choose between lanes of the road to travel on. No two
vehicles can occur at the same lane of the road at the same time.

Nodes store important features where other roads meet or a feature
of a road diverges. These are the common examples when a road node
should be constructed:
    - Any intersection of two or more main roads.
    - When there is a lane change of a road
        (this may occur on highways or when a turn lane opens)

Nodes also need to contain information about the connections among lanes
among adjacent RoadEdge's
*/

/**
 * A road segment is a section of the road defined by a quadratic bezier curve.
 */
export class RoadSegment {
    public readonly control1: Point;
    public readonly control2: Point;
    public readonly start: Point;
    public readonly end: Point;
    public readonly length: number;

    constructor(start: Point, end: Point, control1: Point, control2: Point) {
        this.start = start;
        this.end = end;
        this.control1 = control1;
        this.control2 = control2;
        this.length = this.calculateLength();
    }

    // calculates the length of the road segment
    private calculateLength(): number {
        // TODO
        return 0;
    }
}

export class Road {
    private segments: RoadSegment[];
    private length: number;
    private speedLimit: number;

    constructor() {
        this.segments = [];
        this.length = 0;
        this.speedLimit = 0;
    }

    // adds a segment to the road
    addSegment(segment: RoadSegment) {
        // make sure the segment is connected to the last segment
        if (this.segments.length > 0) {
            const lastSegment = this.segments[this.segments.length - 1];
            if (lastSegment.end.x !== segment.start.x || lastSegment.end.y !== segment.start.y) {
                throw new Error('Road segments must be connected');
            }
        }
        this.segments.push(segment);
        this.length += segment.length;
    }

    render(camera: Camera) {
        for (const segment of this.segments) {
            camera.drawBezierCurve(
                segment.start,
                segment.end, 
                segment.control1, 
                segment.control2, 
            'red', 5);
            camera.drawBezierCurve(segment.start, segment.end, segment.control1, segment.control2, 'red', 5);
        }
    }
}

type LaneType = 'left' | 'straight' | 'right';

class RoadEdge {
    private lanes: LaneType[];
    
    constructor() {
        this.lanes = [];
    }
}

class RoadNode {

}

class Network {

}

class RoadNetwork {
    constructor() {
        
    }
}

export {}
