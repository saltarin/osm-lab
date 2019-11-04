const Graph = require('./graph/Graph');
const Node = require('./graph/Node');

const A = new Node('A');
const B = new Node('B');
const C = new Node('C');
const D = new Node('D');
const E = new Node('E');
const F = new Node('F');

const g = new Graph();

g.addNode(A);
g.addNode(B);
g.addNode(C);
// g.addNode(D);
// g.addNode(E);
// g.addNode(F);

// g.addBidirectionalEdge(A.key, E.key);
// g.addBidirectionalEdge(A.key, B.key);
// g.addBidirectionalEdge(A.key, D.key);
// g.addBidirectionalEdge(E.key, B.key);
// g.addBidirectionalEdge(D.key, C.key);
// g.addBidirectionalEdge(B.key, C.key);
// g.addBidirectionalEdge(B.key, F.key);
// g.addBidirectionalEdge(C.key, F.key);

// g.nodeContraction(D, B, (d, b) => {
//     return d.value + b.value 
// });
g.addEdge(A.key, B.key);
g.addEdge(B.key, C.key);

g.print();
console.log('------------');
g.transpose().print();
//console.log(g.edges[A.key].values());
