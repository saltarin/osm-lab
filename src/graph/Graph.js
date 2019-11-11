const Node = require('./Node');

class Graph {
    constructor() {
        this.nodes = {};
        this.edges = {};
    }

    addNode(node) {
        if (!this.nodes[node.key]) {
            this.nodes[node.key] = node.value;
            this.edges[node.key] = {};
        }
    }

    addEdge(fromNodeKey, toNodeKey) {
        this.edges[fromNodeKey][toNodeKey] = {};
    }

    addWeight(fromNodeKey, toNodeKey, weight) {
        if (!this.goesTo(fromNodeKey, toNodeKey)) {
            this.addEdge(fromNodeKey, toNodeKey);
        }
        this.edges[fromNodeKey][toNodeKey].weight = weight;
    }

    getNodeValue(nodeKey) {
        return this.nodes[nodeKey];
    }

    adjacentNodes(nodeKeyA, nodeKeyB) {
        const isAConnectedToB = Object.keys(this.edges[nodeKeyA]).length > 0 &&
            typeof this.edges[nodeKeyA][nodeKeyB] !== "undefined";
        const isBConnectedToA = Object.keys(this.edges[nodeKeyB]).length > 0 &&
            typeof this.edges[nodeKeyB][nodeKeyA] !== "undefined";
        return isAConnectedToB || isBConnectedToA;
    }

    edgeCount() {
        return Object.values(this.edges).reduce((acum, edge) => acum + Object.keys(edge).length, 0);
    }

    nodeCount() {
        return Object.keys(this.nodes).length;
    }

    removeNode(nodeKey) {
        delete this.nodes[nodeKey];
        delete this.edges[nodeKey];
        for (let edgeSet of Object.values(this.edges)) {
            edgeSet.delete(nodeKey);
        }
    }

    removeEdge(fromNodeKey, toNodeKey) {
        if (this.edges[fromNodeKey]) {
            delete this.edges[fromNodeKey][toNodeKey];
        }
    }

    addBidirectionalEdge(fromNodeKey, toNodeKey) {
        this.addEdge(fromNodeKey, toNodeKey);
        this.addEdge(toNodeKey, fromNodeKey);
    }

    removeBidirectionalEdge(fromNodeKey, toNodeKey) {
        this.removeEdge(fromNodeKey, toNodeKey);
        this.removeEdge(toNodeKey, fromNodeKey);
    }

    // nodeContraction(nodeA, nodeB, mergeFunc) {
    //missing edgeContraction
    //     const edgesFromA = deepClone(this.edges[nodeA.key]);
    //     const edgesFromB = deepClone(this.edges[nodeB.key]);

    //     const allEdges = {...edgesFromA, ...edgesFromB};
    //     const newEdgeSet = {};
    //     Object.values(allEdges).forEach( edgeKey => {
    //         const edgeContent = deepClone(edge);
    //         newEdgeSet[edgeKey] = edgeContent;
    //     })
    //     const newNode = new Node();
    //     newNode.value = mergeFunc(nodeA, nodeB);
    //     this.addNode(newNode);

    //     this.redirectAllNodes(nodeA.key, newNode.key);
    //     this.redirectAllNodes(nodeB.key, newNode.key);

    //     this.removeNode(nodeA.key);
    //     this.removeNode(nodeB.key);

    //     this.edges[newNode.key] = edgeSet;
    //     return newNode;
    // }

    pathContraction(path, mergeFunc) {
        throw new Error('Not Implemented');
    }

    transpose() {
        const cloneGraph = new Graph();
        let keyAdapter = {};
        for (const [nodeKey, nodeValue] of Object.entries(this.nodes)) {
            const newNode = new Node(nodeValue);
            cloneGraph.addNode(newNode);
            keyAdapter[nodeKey] = newNode.key;
        }
        for (const [nodeKey, edges] of Object.entries(this.edges)) {
            Object.keys(edges).forEach(edgeKey => cloneGraph.addEdge(keyAdapter[edgeKey], keyAdapter[nodeKey]));
        }
        return cloneGraph;
    }

    lineGraph() {
        throw new Error('Not implemented');
    }

    goesTo(nodeFromKey, nodeToKey) {
        if (!this.edges[nodeFromKey]) {
            return false;
        }
        if (!this.edges[nodeFromKey][nodeToKey]) {
            return false;
        }
        return !!this.edges[nodeFromKey][nodeToKey];
    }

    redirectTo(nodeFromKey, nodeToKey, newNodeKey) {
        this.removeEdge(nodeFromKey, nodeToKey);
        this.addEdge(nodeFromKey, newNodeKey)
    }

    redirectAllNodes(toNodeKey, newNodeKey) {
        Object.keys(this.nodes).forEach(nodeKey => {
            if (this.goesTo(nodeKey, toNodeKey)) {
                this.redirectTo(nodeKey, toNodeKey, newNodeKey);
            }
        });
    }

    forEachEdge(nodeKey, func) {
        for (const [edgeKey, edgeContent] of Object.entries(this.edges[nodeKey])) {
            func(nodeKey, edgeKey, edgeContent);
        }
    }

    print() {
        for (let [nodekey, value] of Object.entries(this.nodes)) {
            console.log(value);
            const edges = Object.entries(this.edges[nodekey]).map(entry => `${this.nodes[entry[0]]}|${entry[1].weight}`).join(', ');
            console.log(`-> ${edges}`);
        }
    }
}

module.exports = Graph;