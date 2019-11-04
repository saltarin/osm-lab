const Node = require('./Node');

class Graph {
    constructor() {
        this.nodes = {};
        this.edges = {};
    }

    getNode(nodeKey) {
        return this.nodes[nodeKey];
    }

    adjacentNodes(nodeKeyA, nodeKeyB) {
        const isAConnectedToB = this.edges[nodeKeyA].size > 0 && 
            this.edges[nodeKeyA].has(nodeKeyB);
        const isBConnectedToA = this.edges[nodeKeyB].size > 0 && 
            this.edges[nodeKeyB].has(nodeKeyA);
        return isAConnectedToB || isBConnectedToA;
    }

    edgeCount() {
        return Object.values(this.edges).reduce((acum, curr) => acum + curr.size, 0);
    }

    nodeCount() {
        return Object.keys(this.nodes).length;
    }

    addNode(node) {
        if (!this.nodes[node.key]) {
            this.nodes[node.key] = node.value;
            this.edges[node.key] = new Set();
        }
    }

    removeNode(nodeKey) {
        delete this.nodes[nodeKey];
        delete this.edges[nodeKey];
        for(let edgeSet of Object.values(this.edges)) {
            edgeSet.delete(nodeKey);
        }
    }

    addEdge(fromNodeKey, toNodeKey) {
        this.edges[fromNodeKey].add(toNodeKey);
    }

    removeEdge(fromNodeKey, toNodeKey) {
        if (this.edges[fromNodeKey]) {
            this.edges[fromNodeKey].delete(toNodeKey);
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

    nodeContraction(nodeA, nodeB, mergeFunc) {
        const edgesFromA = this.edges[nodeA.key].values();
        const edgesFromB = this.edges[nodeB.key].values();
        const edgeSet = new Set();
        [...edgesFromA, ...edgesFromB].forEach( edgeKey => edgeSet.add(edgeKey) );
        const newNode = new Node();
        newNode.value = mergeFunc(nodeA, nodeB);

        this.addNode(newNode);

        this.redirectAllNodes(nodeA.key, newNode.key);
        this.redirectAllNodes(nodeB.key, newNode.key);

        this.removeNode(nodeA.key);
        this.removeNode(nodeB.key);

        this.edges[newNode.key] = edgeSet;
        return newNode;
    }

    pathContraction(path, mergeFunc) {
        throw new Error('Not Implemented');
    }

    transpose() {
        const cloneGraph = new Graph();
        let keyAdapter = {};
        for( const [nodeKey, nodeValue] of Object.entries(this.nodes)) {
            const newNode = new Node(nodeValue);
            cloneGraph.addNode(newNode);
            keyAdapter[nodeKey] = newNode.key;
        }
        for(const [nodeKey, edgeSet] of Object.entries(this.edges)) {
            edgeSet.forEach( edgeKey => cloneGraph.addEdge(keyAdapter[edgeKey], keyAdapter[nodeKey]));
        }
        return cloneGraph;
    }

    lineGraph() {
        throw new Error('Not implemented');
    }

    goesTo(nodeFromKey, nodeToKey) {
        return this.edges[nodeFromKey].has(nodeToKey);
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

    print() {
        for (let [nodekey, value] of Object.entries(this.nodes)) {
            console.log(value);
            const edges = Array.from(this.edges[nodekey]).map(edgeKey => this.nodes[edgeKey]).join(',');
            console.log(`-> ${edges}`);
        }
    }
}

module.exports = Graph;