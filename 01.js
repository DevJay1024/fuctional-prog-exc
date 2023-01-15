/**
 * map, filter, reduce는 어떻게 생겼는가
 */

const arr = [1, 2, 3, 4, 5];

const result = arr
    .filter((e) => e % 2 === 1)
    .map((e) => e * 5)
    .reduce((prev, curr) => {
        //console.log(`fp-reduce prev: ${prev}`);
        return prev + curr;
    });

console.log(`final : ${result}`);

const map = (func, iterator) => {
    const result = [];
    for (const element of iterator) {
        result.push(func(element));
    }
    return result;
};
console.log(`map func : ${map((e) => e * 5, arr)}`);

const filter = (func, iterator) => {
    const result = [];
    for (const element of iterator) {
        if (func(element)) {
            result.push(element);
        }
    }
    return result;
};
console.log(`filter func : ${filter((e) => e % 2 === 1, arr)}`);

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

console.log(
    `reduce func : ${reduce((prev, curr) => prev + curr, 0, arr)}` // prev * curr이면 1로 넣어줘야
);
console.log(
    `reduce no init-value func : ${reduce((prev, curr) => prev + curr, arr)}`
);

/**
 * pipe는 어떻게 생겼는가
 */

const pipe = (iter, ...functions) => {
    reduce((prev, func) => func(prev), iter, functions);
};

const easyPipe = (iter, ...functions) => {
    for (const func of functions) {
        iter = func(iter);
    }
};

pipe(
    arr,
    (arr1) => filter((e) => e % 2 === 1, arr1),
    (arr2) => map((e) => e * 5, arr2),
    (arr3) => reduce((prev, curr) => prev + curr, arr3),
    (result) => console.log(`pipe : ${result}`)
);

easyPipe(
    arr,
    (arr1) => filter((e) => e % 2 === 1, arr1),
    (arr2) => map((e) => e * 5, arr2),
    (arr3) => reduce((prev, curr) => prev + curr, arr3),
    (result) => console.log(`easy pipe : ${result}`)
);

// 현재 파이프의 문제점 2가지
// 1. 메모리가 많이든다. 왜? 원본 손상을 막기 위해, filter와 map에서 배열을 새로이 생성한다.
// 2. arr1~3을 반복적으로 써 줘야한다. 귀찮음.

// 이를 위해 curry라는 기술을 사용한다.
