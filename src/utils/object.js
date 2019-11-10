function isObject(value) {
    var type = typeof value;
    return type === 'function' || type === 'object' && !!value && !Array.isArray(value);
};

function deepClone(obj) {
    let target = {};
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (isObject(obj[prop])) {
                target[prop] = deepClone(obj[prop]);
            } else if (Array.isArray(obj[prop])) {
                let arrayPropCopy = [];
                obj[prop].forEach(item => {
                    arrayPropCopy.push(deepClone(item))
                });
                target[prop] = arrayPropCopy;
            } else {
                target[prop] = obj[prop];
            }
        }
    }
    return target;
}

module.exports = {
    isObject,
    deepClone
}