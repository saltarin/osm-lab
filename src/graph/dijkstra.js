const Queue = require('./Queue');

const INFINITE = 'INFINITE';

function getNodeWithMinimumDist(queue, dist) {
    return queue.getIterator().reduce((min, node) => {
        if(dist[node] !== INFINITE && dist[min] > dist[node]) {
            min = node;
        }
        return min;
    }, queue.queue[0]);
}

function dijkstra(graph, source) {
    const unvisitedQueue = new Queue();
    const dist = {};
    const prev = {};
    for(const nodeKey of Object.keys(graph.nodes)) {
        dist[nodeKey] = INFINITE;
        //prev[nodeKey] = undefined;
        unvisitedQueue.enqueue(nodeKey);
    }
    dist[source] = 0;
    while(!unvisitedQueue.isEmpty()) {
        const u = getNodeWithMinimumDist(unvisitedQueue, dist);
        unvisitedQueue.remove(u);
        //for each neighbor v of u:
            //const alt <- dist[u] + length(u, v)
            //if( alt < dist[v]):
                //dist[v] <- alt
                //prev[v] <- u
    }
    //return dist[], prev[]
}