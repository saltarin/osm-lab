class Queue {
    constructor() {
        this.queue = [];
    }
    enqueue(value) {
        return this.queue.push(value);
    }
    dequeue() {
        return this.queue.shift();
    }
    isEmpty() {
        return this.queue.length === 0;
    }
    size() {
        return this.queue.length;
    }
    getIterator() {
        return this.queue;
    }
    remove(toRemove) {
        const indexOfValue = this.queue.findIndex((value) => value === toRemove);
        if (indexOfValue === -1) {
            return;
        }
        this.queue.splice(indexOfValue, 1);
    }
    find(value) {
        return this.queue.find(elem => elem === value);
    }
}

module.exports = Queue;