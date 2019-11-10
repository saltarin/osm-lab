const uuidv1 = require('uuid/v1');

class Node {
    constructor(value) {
        this.key = uuidv1();
        this.value = value;
    }

    toString() {
        return this.value.toString();
    }
}

module.exports = Node;