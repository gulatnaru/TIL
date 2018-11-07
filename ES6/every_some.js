/* ES5 for() */
var computers = [
    { name: 'macbook-air', ram: 16},
    { name: 'gram', ram: 8},
    { name: 'series9', ram: 32}
]

var everyComputersAvailable = true;
var someComputersAvailable = false;

for (var i = 0; i < computers.length; i++){
    var computer = computers[i];

    if(computer.ram < 16){
        everyComputersAvailable = false;
    } else {
        someComputersAvailable = true;
    }
}

/* ES6 every */
var everyLaptopAvailable = computers.every(function(computer){  //하나라도 false면 false
    return computer.ram > 16;
})

var someLaptopAvailable = computers.some(function(computer){    //하나라도 true면 true
    return computer.ram > 16;
})

console.log(everyLaptopAvailable);
console.log(someLaptopAvailable);


var names = [
    'alex',
    'bill',
    'chris',
]

names.every(function(name){
    return name.length > 4;
}); // false

names.some(function(name){
    return name.length > 4;
}); // true

/* 실습 1 */
var users = [
    { id: 21, submit: true},
    { id: 33, submit: false},
    { id: 712, submit: true},
];

var allSubmitted = users.every(function(user){
    return user.submit;
})

/* 실습 2 */
//하나라도 status중에 pending이 있으면, inProgress = true
var requests = [
    { url: '/photos', status: 'complete'},
    { url: '/albums', status: 'pending'},
    { url: '/users', status: 'failed'}
]

var inProgress = requests.some(function(request){
    return request.status === 'pending';
});