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

/**
 * Retrieve a random sample of an array by performing the Fisher-Yates shuffle
 * and then taking a slice of the desired size.
 * 
 * See: https://stackoverflow.com/a/11935263/1730417
 * 
 * @param {Array} arr An array from which to draw samples
 * @param {Integer} n Number of samples to draw from `arr`
 */
function getRandomSample(arr, n) {
    let shuffled = arr.slice(0);
    let i = arr.length;
    let temp, idx;

    while (i--) {
        idx = Math.floor((i+1) * Math.random());
        temp = shuffled[idx];
        shuffled[idx] = shuffled[i];
        shuffled[i] = temp;
    }
    
    return shuffled.slice(0, n);
}


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
        this.startNode = startNode;
        this.endNode = endNode;

        this.x1 = this.startNode.abs_x;
        this.x2 = this.endNode.abs_x;

        this.y1 = this.startNode.abs_y;
        this.y2 = this.endNode.abs_y;
    }

    drawEdge() {
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = globals.edgeColor;
        ctx.edgeWidth = globals.edgeWidth;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }
}

class Graph {
    /**
     * 
     * @param {canvas} cnv <canvas> object where the graph will be drawn
     */
    constructor(cnv) {
        this.nodes = Array();
        this.edges = Array();

        this.canvas = cnv
        this.canvas_height = cnv.height;
        this.canvas_width = cnv.width;
        
    }

    /**
     * 
     * @param {Integer} canvas_x x-coordinate within the associated canvas
     * @param {Integer} canvas_y y-coordinate within the associated canvas
     */
    addNode(canvas_x, canvas_y) {
        this.nodes.push(new Node(canvas_x, canvas_y))
    }

    addRandomNodes(n_nodes) {
        let random_node_coords = Array();
        
        for(var i=0; i < n_nodes; i++) {
            random_node_coords.push([
                Math.random() * this.canvas_width,
                Math.random() * this.canvas_height
            ]);
        }

        random_node_coords.forEach(nc => {
            this.addNode(nc[0], nc[1])
        });
    }

    addEdge(startNodeIndex, endNodeIndex) {
        const startNode = this.nodes[startNodeIndex];
        const endNode = this.nodes[endNodeIndex];
        
        this.edges.push(new Edge(startNode, endNode));
    }

    addRandomEdges(n_edges) {
        let edges = Array();
        
        for(var i=0; i < n_edges; i++) {
            getRandomSample(this.nodes, 2);
        }
    }

    drawGraph() {
        // We draw the edges first, so their tips sit 'behind' the nodes
        this.edges.forEach(e => e.drawEdge());
        this.nodes.forEach(n => n.drawNode());
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

let G = new Graph(canvas);

function start() {
    // drawGraph(node_coords, adjacencies);
    G.addRandomNodes(5);
    G.addRandomEdges(2);

    G.drawGraph();
}

window.setTimeout(start, 100);