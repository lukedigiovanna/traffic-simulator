# Traffic Simulator

This web application provides tools to build traffic simulations.

## Project Goals

* Provide functionality for users to draw and connect various road types.
* Experiment with different intersection designs and parameters
* Simulate autonomous driving vehicles that are aware of precision positions and intended paths of all other cars.
  * The purpose of this is to demonstrate how traffic flow can be improved via global car data.
* Provide metrics to determine efficiencies of particular road designs.

## Project Journal

Here I will note my progress and design decisions to communicate how I achieved this project and to collect my thoughts.

### Modeling a System of Roads

The first step in this project is determining how a system of roads and intersections should best be modeled to make it possible to simulate the flow of cars through the network in real time.

<b>Graph</b>

* A system of roads could be fairly well modeled using a graph data structure. This also has the benefit of easily determining shortest paths.
* Need to support the ability of vehicles to transfer between "lanes" of traffic. 
  * The graph can be encoded where some nodes have multiple edges connecting the same nodes. 
  * The order of these nodes must be preserved (i.e. know if we are in the left vs right lane)

