const Queue = require('./Queue');

describe('Queue', () => {
    it('dequeue', () => {
        const queue = new Queue();
        queue.enqueue(1);
        queue.dequeue();
        expect(queue.isEmpty()).toEqual(true);
    });
    it('remove', () => {
        const queue = new Queue();
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        queue.remove(2);
        expect(queue.size()).toEqual(2);
    });
});