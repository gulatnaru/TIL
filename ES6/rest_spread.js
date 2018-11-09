/* Rest 나머지 */
const addNumbers = (a, b, c, d, e) => {
    const numbers = [a, b, c, d, e];
    return numbers.reduce((acc, number) => {
        return acc += number;
    }, 0)
};

//addNumbers(1,2,3,4,5,6,7) //err

const addAll = (...numbers) => {
    return numbers.reduce((acc, number) => {
        return acc += number;
    }, 0)
}

addAll(1,2,3,4,5,6,7,8,1,22,3,5,6,1);

/* Speread 펼치다 */
let defaultColors = ['red', 'green', 'blue'];
let myColors = ['black', 'navy', 'gold'];
let iphoneColors = ['rose gold', 'space gray'];

let palette = defaultColors.concat(myColors);

palette = ['brown', 'white', ...defaultColors, ...myColors, ...iphoneColors];

console.log(defaultColors + myColors);
console.log(palette);

/* 실습 */
const showShoppingList = (...items) => {    //rest
    if(items.indexOf('milk' < 0)){
        return ['milk', ...items]   //spread
    }
}

/* 실제 개발에서는 ? */
let MathLibrary = {
    calculateProduct(a, b){
        return a * b;
    }
}

let MathLibrary = {
    multiply(a, b){
        return a * b;
    },

    calculateProduct(...args){
        console.log('Please use method "multiply" instead :)');
        return this.multiply(...args)
    }
}

MathLibrary.calculateProduct(10, 10)

/* 실습 */
const join = (array1, array2) => {
    return array1.concat(array2)
}

/* refactoring */
const join = (array1, array2) => {
    return [...array1, ...array2];
}

/* 실습 */
const unshift = (array, a, b, c, d, e) => {
    return [a, b, c, d, e].concat(array)
}

/* refactoring */
const unshift = (array, ...args) => {
    return [...args, ...array];
}