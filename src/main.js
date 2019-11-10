const Graph = require('./graph/Graph');
const Node = require('./graph/Node');

const A = new Node('A');
const B = new Node('B');
const C = new Node('C');

const g = new Graph();

g.addNode(A);
g.addNode(B);
g.addNode(C);
g.addEdge(A.key, B.key);
g.addEdge(B.key, C.key);

g.print();
console.log('------------');
g.transpose().print();
