/* ES5 for() */
var products = [
  { name: 'banana', type: 'fruit' },
  { name: 'carrot', type: 'vegetable' },
  { name: 'apple', type: 'fruit' },
  { name: 'eggplant', type: 'vegetable' },
  { name: 'tomato', type: 'fruit' },
];

var fruits = [];
for (var i = 0; i < products.length; i++) {
  if(products[i].type === 'fruit') {
    fruits.push(producs[i]);
  }
}

/* ES6 filter */
var vegetables = products.filter(function(product){
  return product.type === 'vegetable'
});

/* 실제로는? */
var posts = [
  { id: 1, title: 'New post', content: 'Great'},
  { id: 2, title: 'ES6 means..', content: 'EcmaScript V6'}
];

var comments = [
  { postID: 1, content: 'Awesome' },
  { postID: 2, content: 'It\'s also known as EcmaScript2015' },
  { postID: 2, content: 'We need Babel!' },
  { postID: 1, content: 'Brand new :)' },
  { postID: 2, content: 'ES6 supports filter method lol' }
];

// 특정 id 를 갖는 post를 뽑아내는 fucntion
function setPost(id, posts) {
  return posts.filter(function(post) {
      return post.id === id;
  });
}

// 특정 post에 달린 comment들을 뽑아내는 function
function commentsForPost(post, allComments) {
  return allComments.filter(function(comment) {
      return comment.postID === post.id;
  });
}

var my_post = setPost(2, posts)[0]; // setPost()의 결과물이 배열이기 때문에 요소가 하나라도 index 접근이 필요하다.

// id 2 번인 Post의 댓글들을 뽑아내려면?
console.log(commentsForPost(my_post, comments));


/* 실습 1 */
var numbers = [1, 2, 3, 56, 57, 688, 789, 21, 5]
var bigNumbers = numbers.filter(function(number){
  return number > 50
}); 

/* 실습 2 */
var users = [
  {id: 1, admin: true},
  {id: 2, admin: false},
  {id: 3, admin: true},
  {id: 4, admin: true},
  {id: 5, admin: false}
]
// 답 1
var admins = users.filter(function(user){
  return user.admin; // === true
});
// 답 2
var admins = users.filter(user => user.admin);

/* 실습 3 */
var numbers = [10, 20, 30];
[]
function reject(array, iterFunction) {
  var filteredArray = array.filter(function(element){
    return !iterFunction(element)
  });
  return filteredArray;
}

function myFunction (number) {
  return number > 15;
};

myFunction(10) // false
myFunction(20) // true

var lessThan15 = reject(numbers, myFunction);

console.log(lessThan15) // 10
