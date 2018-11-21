console.log("1번만 출력됩니당")

module.exports = function(numbersToSum=[]) {
  let sum = 0;
  numbersToSum.forEach(number => sum += number);
  return sum;
};

console.log('진짜용');
