const Queue = require('./Queue');

const INFINITE = Number.MAX_SAFE_INTEGER;

function getNodeWithMinimumDist(queue, dist) {
    return queue.getIterator().reduce((min, node) => {
        if (dist[min] > dist[node]) {
            min = node;
        }
        return min;
    }, queue.queue[0]);
}

function createPath(dijkstraResponse, target) {
    const path = [];
    const { previusNode } = dijkstraResponse;
    let iterator = target;
    while (!!iterator) {
        path.push(iterator);
        iterator = previusNode[iterator];
    }
    return path;
}

function createAllPaths(dijkstraResponse) {
    const { previusNode } = dijkstraResponse;
    const paths = {};
    Object.keys(previusNode).forEach(node => {
        paths[node] = createPath(dijkstraResponse, node);
    });
    return paths;
}

function dijkstra(graph, source) {
    const unvisitedQueue = new Queue();
    const dist = {};
    const prev = {};
    const iter = {}
    let currentIter = 0;
    for (const nodeKey of Object.keys(graph.nodes)) {
        dist[nodeKey] = INFINITE;
        prev[nodeKey] = null;
        iter[nodeKey] = null;
        unvisitedQueue.enqueue(nodeKey);
    }
    dist[source] = 0;
    while (!unvisitedQueue.isEmpty()) {
        const u = getNodeWithMinimumDist(unvisitedQueue, dist);
        unvisitedQueue.remove(u);
        iter[u] = currentIter++;
        graph.forEachEdge(u, (node, edge, content) => {
            if (!unvisitedQueue.find(edge)) {
                return;
            }
            const alt = dist[node] + content.weight;
            if (alt < dist[edge]) {
                dist[edge] = alt;
                prev[edge] = node;
            }
        });
    }
    return {
        distance: { ...dist },
        previusNode: { ...prev },
        iteration: { ...iter }
    }
}

function dijkstraShortestPath(graph, source, target) {
    const unvisitedQueue = new Queue();
    const dist = {};
    const prev = {};
    const iter = {};
    let currentIter = 0;
    for (const nodeKey of Object.keys(graph.nodes)) {
        dist[nodeKey] = INFINITE;
        prev[nodeKey] = null;
        iter[nodeKey] = null;
        unvisitedQueue.enqueue(nodeKey);
    }
    dist[source] = 0;
    while (!unvisitedQueue.isEmpty()) {
        const u = getNodeWithMinimumDist(unvisitedQueue, dist);
        unvisitedQueue.remove(u);
        iter[u] = currentIter++;
        if (u === target) {
            break;
        }
        graph.forEachEdge(u, (node, edge, content) => {
            if (!unvisitedQueue.find(edge)) {
                return;
            }
            const alt = dist[node] + content.weight;
            if (alt < dist[edge]) {
                dist[edge] = alt;
                prev[edge] = node;
            }
        });
    }
    return {
        distance: { ...dist },
        previusNode: { ...prev },
        iteration: { ...iter }
    }
}

module.exports = {
    dijkstra,
    dijkstraShortestPath,
    createPath,
    createAllPaths,
    INFINITE
}