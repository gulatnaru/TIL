/* ES5 for() */
var numbers = [10, 20, 30];
var sum = 0;

for (var i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}

/* ES6 reduce */
var result = numbers.reduce(function(acc, number) {
  return (acc += number);
}, 0); //쌓을 변수 : acc, 쌓을 변수의 초기화값 : 0

/* map vs reduce */
var myColors = [{ color: "black" }, { color: "red" }, { color: "gold" }];

//var onlyColors = ['black', 'red', 'gold'];
var onlyColors = myColors.map(function(c) {
  return c.color;
});

var oColors = myColors.reduce(function(acc, c) {
  acc.push(c.color);
  return acc;
}, []);

/* 실제로는? */
//올바르게 닫힌 괄호 () )(()) (((())))
function isGoodParens(string) {
  //1. string을 배열로 바꾼다.
  var array = string.split("");
  var result = array.reduce(function(acc, char) {
    if (char === "(") {
      ++acc;
    } else {
      --acc;
    }
    console.log
    //if( acc < 0 ) return acc;
    return acc;
  }, 0);

  if (result === 0) return false;
  else return true;
}
console.log(isGoodParens("(((())))")); //true
console.log(isGoodParens(")((())))())")); //false
console.log(isGoodParens("(()))")); //false

/* 실습 1 */
var trips = [{ distance: 34 }, { distance: 10 }, { distance: 100 }];

var totalDistance = trips.reduce(function(acc, trip) {
  return (acc += trip.distance);
}, 0);

/* 실습 2 */
var desks = [
  { type: "sitting" },
  { type: "standing" },
  { type: "sitting" },
  { type: "sitting" },
  { type: "standing" }
];
var deskTypes = desks.reduce(
  function(acc, desk) {
    if (desk.type === "sitting") {
      acc.sitting++;
    } else {
      acc.standing++;
    }
  },
  { sitting: 0, standing: 0 }
);
// { Sitting: 3, Standing: 2}

/* 실습 3 */
function unique(array) {
  array.reduce(function(uniqArray, element) {
    if (
      !uniqArray.find(function(uniqElement) {
        return element === uniqElement;
      })
    ) {
      uniqArray.push(element);
    }
    return uniqArray;
  }, []);
}
