
var users = [
    { name: 'Tony stark'},
    { name: 'SteveRogers'},
    { name: 'Thor'},
]

/* ES5 */
var user;
for (var i = 0; i < users.length; i++){
    if(users[i].name === 'Thor'){
        user = users[i];
        break;
    }
}

/* ES6 */
var user = users.find(function(user){   //값을 처음 찾으면 바로 뱉음
    return user.name === 'Tony Stark'
});

/* More complex code */
function Car(model){
    this.model = model;
}

var cars = [
    new Car('mercedes'),
    new Car('Ferrari'),
    new Car('BMW'),
    new Car('HK'),
];

var car = cars.find(function(car){
    return car.model === 'HK';
})

/* 실제로는? */
// Get http://myblog.com/articles/
var users = [
    { id: 1, admin: false},
    { id: 2, admin: false},
    { id: 3, admin: true},
]

var account = accounts.find(function(account){
    return account.balance === 12;
});

/* 실습 3 */
var laders = [
    { id: 1, height: 20},
    { id: 3, height: 25},
]

function findWhere(array, standard){
    var property = Object.keys(standard)[0];
    var lader = array.find(function(element){
        return element[property] === standard[property];
    })
}

findWhere(ladders, { height: 20});
findWhere(ladders, { id: 3});