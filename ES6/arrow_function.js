/* ES5 */

const add = function(a, b){
    return a+b;
}

add(1, 2)

/* ES6 */

let multiply = function (a,b){
    return a*b;
}

multiply = (a, b) => {
    return a*b;
}

multiply = (a, b) => a*b;

let double = number => number * 2;
let print = () => 'heungyeong';

const numbers = [1,2,3];

let doubledNumbers = numbers.map(function(number){
    return 2 * number;
});

let doubledNumbers = numbers.map((number) => {
    return 2 * number;
});

doubledNumbers = numbers.map(number => 2 * number)