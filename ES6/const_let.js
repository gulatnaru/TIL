/* ES5 */
var name = '유태영';
var title = 'Junior software developer';
var workHour = '9 am to 6 pm';

name = '유유유';
title = 'Senior';

function count (targetString) {
  var characters = ['a', 'e', 'i', 'o', 'u'];
  var number = 0;

  for (var i = 0; i < targetString.length; i++) {
    if (characters.includes(targetString[i])) {
      number++;
    }
  }
  return number;
}

/* ES6 */
const name = '유태영';
let title = 'Junior software developer';
let workHour = '1pm to 6pm';

name = '유유유';

function count (targetString) {
  const characters = ['a', 'e', 'i', 'o', 'u'];
  const number = targetString.split('').reduce(function(acc, char){
    if(characters.includes(char)){
      acc++
    }
    return acc;
  }, 0);
  return number;
}

// Facebook Profile management
// with var
let name = 'Your Name';
let age = 100;
const dateOfBirth = '0101';

// Refactor
const statuses = [ 
  { code: 'OK', response: 'Request successful' },
  { code: 'FAILED', response: 'There was an error with your request' },
  { code: 'PENDING', response: 'Your reqeust is still pending' }
];
let message = '';
const currentCode = 'OK';

for (let i = 0; i < statuses.length; i++) {
  if (statuses[i].code === currentCode) {
    message = statuses[i].response;
  }
}