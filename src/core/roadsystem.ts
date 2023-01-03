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

type LaneType = 'left' | 'straight' | 'right';

class RoadEdge {
    private lanes: LaneType[];
    
    constructor() {
        this.lanes = [];
    }
}

class RoadNode {

}

class RoadNetwork {
    constructor() {
        
    }
}

export {}
