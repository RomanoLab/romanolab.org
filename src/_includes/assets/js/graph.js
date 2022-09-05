/**
 * graph.js
 * Copyright (c) 2022 by Joseph D. Romano
 * 
 * Simple routines for drawing random graphs
 */


// Global variables

const globals = {
    'nodeRadius': 4,
    'nodeSpacing': 25,
    'edgeWidth': 2,
    'edgeColor': '#808080'
};

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const colors = [
    '#e91e63',
    '#fa750f',
    '#ffeb3b',
    '#4caf50',
    '#02b3e4',
    '#c341d8'
]; 


// Data structures

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.left   = this.x - globals.nodeSpacing / 2 + globals.nodeRadius;
        this.top    = this.y - globals.nodeSpacing / 2 + globals.nodeRadius;
        this.right  = this.x + globals.nodeSpacing / 2 - globals.nodeRadius;
        this.bottom = this.y + globals.nodeSpacing / 2 - globals.nodeRadius;

        this.abs_x = this.left + (this.right - this.left) * Math.random();
        this.abs_y = this.top + (this.bottom - this.top) * Math.random();

        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    drawNode() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.abs_x, this.abs_y, globals.nodeRadius, 0, 2 * Math.PI);
        ctx.fill();
    }

}


class Edge {
    constructor(startNode, endNode) {
        console.log(startNode);
        console.log(endNode);
        
        this.startNode = startNode;
        this.endNode = endNode;

        this.x1 = this.startNode.abs_x;
        this.x2 = this.endNode.abs_x;

        this.y1 = this.startNode.abs_y;
        this.y2 = this.endNode.abs_y;
    }

    drawEdge() {
        console.log("DRAWING EDGE: ", this);
        ctx.strokeStyle = globals.edgeColor;
        ctx.edgeWidth = globals.edgeWidth;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.moveTo(this.x2, this.y2);
        ctx.stroke();
    }
}


// Drawing subroutines
function drawNodes(nodes) {
    nodes.forEach(n => n.drawNode());
}

function drawEdges(nodes, adjacency_list) {
    let edges = [];
    
    adjacency_list.forEach(al => {
        edges.push(new Edge(nodes[al[0]], nodes[al[1]]))
    });

    console.log(edges);

    edges.forEach(e => e.drawEdge());
}

function drawGraph(coords, adjacencies) {
    // Draw nodes
    if (coords) {
        let nodes = Array();

        coords.forEach(n => {
            nodes.push(new Node(n[0], n[1]));
        });
        
        drawNodes(nodes);
        drawEdges(nodes, adjacencies);
                
    } else {
        // draw random nodes
        console.log("Shouldn't be printing this yet!!");
    }
}


// Draw a random graph
let node_coords = [
    [30, 85],
    [150, 60],
    [210, 100]
];
let adjacencies = [
    [0, 2],
    [0, 1]
];

function start() {
    drawGraph(node_coords, adjacencies);
}

window.setTimeout(start, 1000);