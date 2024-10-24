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
    'edgeColor': '#808080',
    'breathingRoom': 8
};

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 250;

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

        this.abs_x = this.left + globals.breathingRoom + (this.right - this.left) * Math.random();
        this.abs_y = this.top + globals.breathingRoom + (this.bottom - this.top) * Math.random();

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

    getLength() {
        return Math.sqrt(
            Math.pow((this.x1 - this.x2), 2) + Math.pow((this.y1 - this.y2), 2)
        );
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
        this.orphanNodes = Array();

        this.canvas = cnv
        this.canvas_height = cnv.height;
        this.canvas_width = cnv.width;

        this.usable_height = this.canvas_height - (globals.breathingRoom * 2);
        this.usable_width = this.canvas_width - (globals.breathingRoom * 2)
        
        //this.max_path_len = Math.sqrt(Math.pow(this.canvas_height, 2) + Math.pow(this.canvas_width, 2));
        this.max_path_len = Math.sqrt(Math.pow(this.canvas_height, 2) + Math.pow(this.canvas_width, 2)) / 5.;
    }

    /**
     * 
     * @param {Integer} canvas_x x-coordinate within the associated canvas
     * @param {Integer} canvas_y y-coordinate within the associated canvas
     */
    addNode(canvas_x, canvas_y) {
        let thisNode = new Node(canvas_x, canvas_y)
        this.nodes.push(thisNode)
        this.orphanNodes.push(thisNode);
    }

    addRandomNodes(n_nodes) {
        let random_node_coords = Array();
        
        for(var i=0; i < n_nodes; i++) {
            random_node_coords.push([
                Math.random() * this.usable_width,
                Math.random() * this.usable_height
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
        if (this.orphanNodes.includes(startNode)) {
            this.orphanNodes.splice(this.orphanNodes.indexOf(startNode), 1);
        }
        if (this.orphanNodes.includes(endNode)) {
            this.orphanNodes.splice(this.orphanNodes.indexOf(endNode), 1);
        }
    }

    addRandomEdges(n_edges) {
        let randomSample;
        let acceptProb;

        // in its most basic version, we simply randomly select pairs of nodes
        // for(var i=0; i < n_edges; i++) {
        //     randomSample = getRandomSample(this.nodes, 2);
        //     this.edges.push(new Edge(randomSample[0], randomSample[1]));
        // }

        // here, we accept random samples with probability inversely 
        // proportional to the length of the resulting edge
        // for(var i=0; i < n_edges; i++) {
        //     randomSample = getRandomSample(this.nodes, 2);
        //     let candidateEdge = new Edge(randomSample[0], randomSample[1]);
        //     acceptProb = 1 - (candidateEdge.getLength() / this.max_path_len);
        //     if (Math.random() <= acceptProb) {
        //         this.edges.push(candidateEdge);
        //     } else {
        //         console.log("REJECT with probability ", acceptProb);
        //         --i;
        //     }
        // }

        // Same as above, but this time we adjust probability based on logistic
        // curve to more strongly encourage short edges
        // for(var i=0; i < n_edges; i++) {
        //     randomSample = getRandomSample(this.nodes, 2);
        //     let candidateEdge = new Edge(randomSample[0], randomSample[1]);
        //     // acceptProb = 1 - (candidateEdge.getLength() / this.max_path_len);
        //     acceptProb = 1 / (Math.pow(Math.E, 2*(candidateEdge.getLength() / this.max_path_len))+1);
        //     if (Math.random() <= acceptProb) {
        //         this.edges.push(candidateEdge);
        //     } else {
        //         console.log("REJECT with probability ", acceptProb);
        //         --i;
        //     }
        // }

        // Still not quite strong enough.
        for(var i=0; i < n_edges; i++) {
            randomSample = getRandomSample(this.nodes, 2);
            let candidateEdge = new Edge(randomSample[0], randomSample[1]);
            //acceptProb = 1 / (Math.pow(Math.E, 2*(candidateEdge.getLength() / this.max_path_len))+1);
            acceptProb = 1-(Math.tanh(candidateEdge.getLength() / this.max_path_len))
            if (Math.random() <= acceptProb) {
                this.edges.push(candidateEdge);
            } else {
                --i;
            }
        }
    }

    drawGraph() {
        // We draw the edges first, so their tips sit 'behind' the nodes
        this.edges.forEach(e => e.drawEdge());
        this.nodes.forEach(n => n.drawNode());
    }
}


// Draw a random graph
let G = new Graph(canvas);

function start() {
    // drawGraph(node_coords, adjacencies);
    G.addRandomNodes(120);
    G.addRandomEdges(200);

    // get rid of the orphan nodes
    // G.orphanNodes.forEach((o_n, i) => {
    //     G.nodes.splice(G.nodes.indexOf(o_n), 1);
    // })

    // ctx.scale(0.5, 0.5);
    G.drawGraph();
    // ctx.scale(2, 2);
    // G.drawGraph();
}

window.setTimeout(start, 100);