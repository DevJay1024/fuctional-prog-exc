/**
 * curry를 적용하면
 */
const map = (func, iterator) => {
    const result = [];
    for (const element of iterator) {
        result.push(func(element));
    }
    return result;
};

const filter = (func, iterator) => {
    const result = [];
    for (const element of iterator) {
        if (func(element)) {
            result.push(element);
        }
    }
    return result;
};

const reduce = (func, accumulator, iterator) => {
    if (iterator === undefined) {
        iterator = accumulator[Symbol.iterator]();
        accumulator = iterator.next().value;
    }

    for (const element of iterator) {
        accumulator = func(accumulator, element);
    }
    return accumulator;
};

const pipe = (iter, ...functions) => {
    reduce((prev, func) => func(prev), iter, functions);
};
