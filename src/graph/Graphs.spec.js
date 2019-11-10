const Graph = require('./Graph');
const Node = require('./Node');

describe('Graph', () => {
    it('addNode', () => {
        const graph = new Graph();
        const node = new Node('A');
        graph.addNode(node);
        expect(graph.nodes[node.key]).toEqual('A');
    });

    it('addEdge', () => {
        const graph = new Graph();
        const nodeA = new Node('A');
        const nodeB = new Node('B');
        graph.addNode(nodeA);
        graph.addNode(nodeB);
        graph.addEdge(nodeA.key, nodeB.key);
        expect(graph.edges[nodeA.key][nodeB.key]).toEqual({});
    });

    it('getNodeValue', () => {
        const graph = new Graph();
        const node = new Node('A');
        graph.addNode(node);
        expect(graph.getNodeValue(node.key)).toEqual('A');
    });

    it('adjacentNodes', () => {
        const graph = new Graph();
        const nodeA = new Node('A');
        const nodeB = new Node('B');
        graph.addNode(nodeA);
        graph.addNode(nodeB);
        graph.addEdge(nodeA.key, nodeB.key);
        expect(graph.adjacentNodes(nodeA.key, nodeB.key)).toEqual(true);
    });

    it('nodeCount', () => {
        const graph = new Graph();
        const node = new Node('A');
        graph.addNode(node);
        expect(graph.nodeCount()).toEqual(1);
    });

    it('edgeCount', () => {
        const graph = new Graph();
        const nodeA = new Node('A');
        const nodeB = new Node('B');
        graph.addNode(nodeA);
        graph.addNode(nodeB);
        graph.addEdge(nodeA.key, nodeB.key);
        expect(graph.edgeCount()).toEqual(1);
    });

    it('removeNode', () => {
        const graph = new Graph();
        const node = new Node('A');
        graph.addNode(node);
        graph.removeNode(node.key);
        expect(Object.keys(graph.nodes).length).toEqual(0);
    });

    it('removeEdge', () => {
        const graph = new Graph();
        const nodeA = new Node('A');
        const nodeB = new Node('B');
        graph.addNode(nodeA);
        graph.addNode(nodeB);
        graph.addEdge(nodeA.key, nodeB.key);
        graph.removeEdge(nodeA.key, nodeB.key);
        expect(Object.keys(graph.edges[nodeA.key]).length).toEqual(0);
    });

    it('addBidirectionalEdge', () => {
        const graph = new Graph();
        const nodeA = new Node('A');
        const nodeB = new Node('B');
        graph.addNode(nodeA);
        graph.addNode(nodeB);
        graph.addBidirectionalEdge(nodeA.key, nodeB.key);
        const validation = typeof graph.edges[nodeA.key][nodeB.key] !== 'undefined' && 
            typeof graph.edges[nodeB.key][nodeA.key] !== 'undefined';
        expect(validation).toEqual(true);
    });

    it('addBidirectionalEdge', () => {
        const graph = new Graph();
        const nodeA = new Node('A');
        const nodeB = new Node('B');
        graph.addNode(nodeA);
        graph.addNode(nodeB);
        graph.addBidirectionalEdge(nodeA.key, nodeB.key);
        graph.removeBidirectionalEdge(nodeA.key, nodeB.key);
        const validation = !graph.edges[nodeA.key][nodeB.key] && !graph.edges[nodeB.key][nodeA.key];
        expect(validation).toEqual(true);
    });

    it('goesTo', () => {
        const graph = new Graph();
        const nodeA = new Node('A');
        const nodeB = new Node('B');
        graph.addNode(nodeA);
        graph.addNode(nodeB);
        graph.addEdge(nodeA.key, nodeB.key);
        expect(graph.goesTo(nodeA.key, nodeB.key)).toEqual(true);
    });

    it('redirectTo', () => {
        const graph = new Graph();
        const nodeA = new Node('A');
        const nodeB = new Node('B');
        const nodeC = new Node('C');
        graph.addNode(nodeA);
        graph.addNode(nodeB);
        graph.addNode(nodeC);
        graph.addEdge(nodeA.key, nodeB.key);
        graph.redirectTo(nodeA.key, nodeB.key, nodeC.key);
        const validation = !!graph.edges[nodeA.key][nodeC.key] && !graph.edges[nodeA.key][nodeB.key];
        expect(validation).toEqual(true);
    });

    it('redirectAllNodes', () => {
        const graph = new Graph();
        const nodeA = new Node('A');
        const nodeB = new Node('B');
        const nodeC = new Node('C');
        const nodeD = new Node('D');
        graph.addNode(nodeA);
        graph.addNode(nodeB);
        graph.addNode(nodeC);
        graph.addNode(nodeD);
        graph.addEdge(nodeA.key, nodeB.key);
        graph.addEdge(nodeC.key, nodeB.key);
        graph.addEdge(nodeB.key, nodeD.key);
        graph.redirectAllNodes(nodeB.key, nodeD.key);
        const validation = graph.goesTo(nodeA.key, nodeD.key) &&
            graph.goesTo(nodeB.key, nodeD.key) &&
            graph.goesTo(nodeC.key, nodeD.key);
        expect(validation).toEqual(true);
    });

    it('transpose', () => {
        const graph = new Graph();
        const nodeA = new Node('A');
        const nodeB = new Node('B');
        const nodeC = new Node('C');
        const nodeD = new Node('D');
        graph.addNode(nodeA);
        graph.addNode(nodeB);
        graph.addNode(nodeC);
        graph.addNode(nodeD);
        graph.addEdge(nodeA.key, nodeB.key);
        graph.addEdge(nodeC.key, nodeB.key);
        graph.addEdge(nodeB.key, nodeD.key);
        const transpose = graph.transpose();
        const validation = transpose.nodeCount() === 4 && transpose.edgeCount() === 3;
        expect(validation).toEqual(true);
    });

    it('addWeight', () => {
        const graph = new Graph();
        const nodeA = new Node('A');
        const nodeB = new Node('B');
        graph.addNode(nodeA);
        graph.addNode(nodeB);
        graph.addEdge(nodeA.key, nodeB.key);
        expect(graph.edges[nodeA.key][nodeB.key]).toEqual({});
    });
});