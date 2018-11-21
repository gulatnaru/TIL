/* ES5 for() */
var users = [
  { name: 'Tony Stark' },
  { name: 'Steve Rogers' },
  { name: 'Thor' },
];

var user;
for (var i = 0; i < users.length; i++) {
  if(users[i].name === 'Tony Stark') {
    user = users[i];
    break; // 다 돌 필요 없어!
  }
}

/* ES6 find() */
var user = users.find(function(user){
  return user.name === 'Tony Stark';
});

/* More complex code */
function Car(model) {
  this.model = model;
}

var cars = [
  new Car('Mercedes'),
  new Car('Ferrari'),
  new Car('BMW'),
  new Car('HK'),
];

var car = cars.find(function(car){
  return car.model === 'HK';
});

/* 실제로는? */
// GET http://myblog.com/articles/1

const articles = [
  { id: 1, title: 'Motto', content: 'HappyHacking' },
  { id: 2, title: 'My presonal Info', content: 'It\'s secret guys lol' },
  { id: 3, title: 'Ruby vs Python', content: 'Do what you want!' },
  { id: 4, title: 'Welcome to the', content: 'Black parade' },
  //...
];
  
const articleId = getIdFromURL();

const article = articles.find(function(article) {
  return article.id === articleID;
});

/* 실습 1 */
var users = [
  { id: 1, admin: false },
  { id: 2, admin: false },
  { id: 3, admin: true },
]

var admin = users.find(function(user){
  return user.admin; // === true
});

/* 실습 2 */
// 잔액이 12 인 계좌를 account 에 저장하자!
var accounts = [
  { balance: -10 },
  { balance: 12 },
  { balance: 0 }
];

var account = accounts.find(function(account){
  return account.balance === 12;
});

/* 실습 3 */
var laders = [
  { id: 1, height: 20 },
  { id: 3, height: 25 },
]

function findWhere(array, standard) {
  var property = Object.keys(standard)[0];
  return array.find(function(element){
    return element[property] === standard[property];
  });
}
// Object.keys({ a: 1, b: 2 })
findWhere(ladders, { height: 20, id : 1});
findWhere(ladders, { id: 3 });