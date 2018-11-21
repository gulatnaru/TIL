/* ES5 for() */
var numbers = [10, 20, 30];
var sum = 0;

for (var i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}

/* ES6 reduce */
var result = numbers.reduce(function(acc, number){
  return acc + number;
}, 0);

/* map vs reduce */
var myColors = [
  { color: 'black' },
  { color: 'red' },
  { color: 'gold' }
];
// var onlyColors = ['black', 'red', 'gold'];
var onlyColors = myColors.map(function(c){
  return c.color;
});
var oColors = myColors.reduce(function(acc, c){
  acc.push(c.color);
  return acc;
},[]);

/* 실제로는? */
/*  
  올바르게 닫힌 괄호 : (), (()()), (()(()));
  올바르지 않은 괄호 : ), )()()(, ()())
*/
function isGoodParens(string) {
  return !string.split('').reduce(function(acc, char){
    if(acc < 0) {
      return  acc;
    } else if (char ==='(') {
      ++acc;
    } else {
      --acc;
    }
    return acc
  }, 0);
}

isGoodParens('((((()))))') // true
isGoodParens(')((())))())') // false
isGoodParens('(()))') // false

/* 실습 1 */
var trips = [
  { distance: 34 },
  { distance: 10 },
  { distance: 100 },
];

var totalDistance = trips.reduce(function(acc, trip){
  return acc += trip.distance;
}, 0);

/* 실습 2 */
var desks = [
  { type: 'Sitting' },
  { type: 'Standing' },
  { type: 'Sitting' },
  { type: 'Sitting' },
  { type: 'Standing' },
];

var deskTypes = desks.reduce(function(acc, desk) {
  if (desk.type === 'Sitting') {
    acc.sitting++;
  } else {
    acc.standing++;
  }
}, { sitting: 0, standing: 0 });

console.log(deskTypes);

/* 실습 3 */
function unique(array) {
  // Fill me up
  array.reduce(function(uniqArray, element){
    if(!uniqArray.find(function(uniqElement){
        return element === uniqElement;
      })) {
        uniqArray.push(element);
      }
      return uniqArray;
  }, []);
}

var numbers = [4, 1, 3, 2, 2, 1, 3, 3, 4, 4, 4];
unique(numbers); // [1, 2, 3, 4]