const { isObject, deepClone } = require('./object');

describe('object', () => {
    it('isObject', () => {
        expect(isObject(5)).toEqual(false);
        expect(isObject('')).toEqual(false);
        expect(isObject([])).toEqual(false);
        expect(isObject({})).toEqual(true);
        expect(isObject([{}])).toEqual(false);
        expect(isObject({ a: [] })).toEqual(true);
    });

    it('deepClone', () => {
        const object = {
            a: 1,
            b: 'b',
            c: [1, 2, 3],
            d: [
                {
                    aa: 11,
                    bb: 'b',
                    cc: [2, 4, 5, 6],
                    dd: {
                        aaa: 1,
                        bbb: 2,
                        ccc: [
                            {
                                aaaa: 1111,
                                bbbb: 'bbbb',
                                cccc: [],
                                dddd: null
                            }
                        ]
                    }
                }
            ],
            e: {
                aa: 11,
                bb: 'bb',
            }
        };
        const clone = deepClone(object);
        object.a = 'xxxx';
        object.c[0] = 'xxxx';
        object.e.aa = 'xxxx';
        expect(object.a).not.toEqual(clone.a);
        expect(object.c[0]).not.toEqual(clone.c[0]);
        expect(object.e.aa).not.toEqual(clone.e.aa);
    });
});