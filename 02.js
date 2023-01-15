/**
 * curry의 동작방식
 */

function curry(func) {
    return function (a) {
        return function (b) {
            return func(a, b);
        };
    };
}

function sum(a, b) {
    return a + b;
}

console.log(`curry-sum : ${curry(sum)(2)(3)}`);

// 02-1.html에서 스코프를 확인하라

/**
 * curry는 어떻게 생겼는가
 */

const curry = (func) => {
    (a, ...args) => {
        args.length > 0 ? func(a, ...args) : (...args) => func(a, ...args);
    };
};

function sum3(a, b, c) {
    return a + b + c;
}

// 02-2.html에서 스코프를 확인하라
