# 3) Additional Features

## Section 8 : `const`, `let` and `var`

* ES6 의 개선점은 크게 두가지로 나뉘어 진다.

  1. 새로운 문법적 설탕(syntactic sugar - 내부적으로 같은 기능을 하지만, 이해하기 쉽고 사용하기 쉬운 문법.)의 등장 혹은 코드의 양을 줄여줌.
  2. 새로운 개념, 구성, 기능을 언어에 도입. (`const` & `let` )

* `const` : 한 번 선언된 이후에 다시는 변하지 않을 고정된 상수(constant)

* `let` : 변할 수 있는 변수

* ES5 code

  ```js
  var name = 'Neo';
  var title = 'Junior software engineer';
  var workHour = '9 am to 6 pm';
  ```

  * 위의 Data 중 절대 변하지 않을 내용과 변할 수 있는 내용이 무엇일까?

* ES6 Code

  ```js
  // 이름은 변하지 않을것이라 예상하기에 const 로 선언.
  const name = 'Neo';
  // name = 'Old' 는 불가능(Error).
  
  // 직함은 변할 수 있을것이라 예상하기에 let 으로 선언.
  let title = 'Junior software engineer'; 
  // 시간이 지나고..
  title = 'Senior software engineer';
  
  // 근무 시간 역시 바뀔 수 있을것이라 예상하기에 let 으로 선언
  let workHour = '9 am to 6 pm';
  // 나중에..
  workHour = '11am to 8 pm';
  ```

---

* More complex code.

  ```js
  function count(targetString) {
      var characters = ['a', 'e', 'i', 'o', 'u'];
      var number = 0;
      
      for (var i = 0; i < targetString.length; i ++) {
          if (characters.includes(targetString[i])) {
              number++;
          }
      }
      
      return number;
  }
  
  console.log(count('aesdfjioasjflsf'));
  ```

  ```js
  function count(targetString) {
      const characters = ['a', 'e', 'i', 'o', 'u']; // characters 는 바뀌지 않을것
      let count = targetString.reduce(function(acc, char) {
          if(characters.includes(char)) {
              acc++;
          }
          return acc;
      }, 0);
      
      return count;
  }
  
  console.log(count('aesdfjioasjflsf'));
  ```

---

### Exercises : Refactoring(기능은 같지만, 더 가독성 있고 깔끔한 코드로 바꿔보기)

1. `var` 을 본인의 판단에 맞게 `const` & `let` 으로 바꿔보자.

    ```js
    // Facebook Profile management
    // with var
    var name = 'Your Name';
    var age = 100;
    var dateOfBirth = '0101';

    // with const & let
    const name = 'Your Name';
    let age = 100;
    const dateOfBirth = '0101';
    ```

2. `var` 을 본인의 판단에 맞게 `const` & `let` 으로 바꿔보자.

   ```js
   var statuses = [ 
     { code: 'OK', response: 'Request successful' },
     { code: 'FAILED', response: 'There was an error with your request' },
     { code: 'PENDING', response: 'Your reqeust is still pending' }
   ];
   var message = '';
   var currentCode = 'OK';
   
   for (var i = 0; i < statuses.length; i++) {
     if (statuses[i].code === currentCode) {
       message = statuses[i].response;
     }
   }
   ```

   ```js
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
   ```


## Section 9 : template strings

* ES6 의 개선점은 크게 두가지로 나뉘어 진다.
  1. 새로운 문법적 설탕(syntactic sugar - 내부적으로 같은 기능을 하지만, 이해하기 쉽고 사용하기 쉬운 문법.)의 등장 혹은 코드의 양을 줄여줌. (template strings / template literal)
  2. 새로운 개념, 구성, 기능을 언어에 도입. 

* ES5 code

  ```js
  function getMessage() {
      const year = new Date().getFullYear();
      
      return "The year is " + year;
  }
  ```

* ES6 code

  ```js
  function getMessage() {
      const year = new Date().getFullYear();
      
      return `The year is ${year}`; // back quote!>
  }
  
  function getMessage() {
      return `The year is ${new Date().getFullYear()}`; // back quote!>
  }
  ```

---

*  **[실제 개발에서는?]** 

  ```js
  const dataES5 = '{ "deviceId": "' + deviceId + '", "gUid": "' + gUid + '", "userName": "' + userName + '" }';
  
  // { "deviceId": "a1234", "gUid": "hh1804", "userName": "Neo" }
  
  const dataES6 = `{ "deviceId": "${deviceId}, "gUid": "${gUid}", "userName": "${userName}" }`
  // { "deviceId": "a1234", "gUid": "hh1804", "userName": "Neo" }
  ```

  ```js
  const year = 2000;
  // const yearMsg = `${year}`; <= 이렇게 쓰는것은 잘못되었다
  const yearMsg = year; 
  ```

---

### Exercises

1. 아래 function 을 template string 으로 refactoring 해보자.

   ```js
   function doubleMesage(number) {
       return "Your number doubled is " + (number * 2);
   }
   ```

   ```js
   function doubleMessage(number) {
       return `Your number doubled is ${number * 2}`;
   }
   ```

2. 아래 function 을 template string 으로 refactoring 해보자.

   ```js
   function fullName(firstName, lastName) {
     return firstName + lastName;
   }
   ```

   ```js
   function fullName(firstName, lastName) {
     return `${firstName} ${lastName}`;
   }
   ```



## Section 10 : Arrow function

* ES6 에서 가장 Hot 한 기능인 arrow function 에 대하여 알아보자!

* ES5 code

  ```js
  const add = function(a, b) {
      return a + b;
  }
  
  add(1, 2);
  ```

* ES6 code

  ```js
  // 기본적으로 function 키워드를 없애고 => 를 () 와 {} 사이에 넣으면 끝!
  const add = (a, b) => { 
      return a + b;
  }
  
  add(1, 2);
  ```

  ```js
  // 그런데 만약, {} 안에 코드가 return 문 *단 1줄!* 이라면, 아래와 같이 {} 를 없애고, return 키워드도 삭제할 수 있다!!
  const add = (a, b) => a + b
  
  add(1, 2);
  ```

---

* More code

  ```js
  const double = function(number) {
      return 2 * number;
  };
  ```

  ```js
  const double = (number) => 2 * number
  ```

  ```js
  const double = number => 2 * number; // 인자가 *단 1개!* 뿐이라면, () 도 생략 가능하다!
  ```

  * 만약 인자가 2개 이상이거나 없다면 `()` 는 생략할 수 없다.

  ```js
  const getYear = () =>  Date().getFullYear()
  const sum = (a, b, c, d) => a + b + c + d;
  ```

* `map` 헬퍼와 같이 사용해 보기

  ```js
  const numbers = [1,2,3];
  
  const doubledNumbers = numbers.map(function(number) {
      return 2 * number;
  });
  ```

  ```js
  const numbers = [1,2,3];
  
  const doubledNumbers = numbers.map( number => return 2 * number )
  ```

* When to user Arrow Functions

  ```js
  const team = {
      members: ['Iron man', 'Hulk', 'Thor', 'Captain America', 'Dr.Starnge'],
      teamName: 'Avengers',
      teamSummary: function() {
          return this.members.map(function(member) {
              return `${member} is the ${this.teamName}`;
          });
      }
  };
  
  team.teamSummary(); // TypeError: Cannot read property 'teamName' of undefined
  ```

  * 위 에러는 `this.teamName` 에서 우리가 생각한 `this` 는 현재 `team`  object 였지만, `map` 의 익명함수 블록 안에서 JS 가 `this` 를 잃어버렸기 때문에 `this` 를 `undefined` 라고 판단해서 뜨는 에러메시지다.
  * ES5 에서 해당 문제를 해결하기 위해서는 `bind()` 나 jQuery 의 `self` 같은 방법들을 사용해야 했지만, ES6 에서 부터는 arrow function 으로 이 문제들을 해결할 수 있다.

  ```js
  const team = {
      members: ['Iron man', 'Hulk', 'Thor', 'Captain America', 'Dr.Starnge'],
      teamName: 'Avengers',
      teamSummary: function() {
          // this === team (lexical this)
          return this.members.map(member => {
              return `${member} 는 ${this.teamName} 멤버이다.`;
          });
      }
  };
  
  team.teamSummary(); // ["Iron man 는 Avengers 멤버이다.","Hulk 는 Avengers 멤버이다.",...]
  ```

---

### Exercises

1. 아래 `function` 을 Arrow function 으로 refactoring 하자.

   ```js
   const fibonacci = function(n) {
     if (n < 3) return 1;
     return fibonacci(n - 1) + fibonacci(n - 2);
   }
   ```

   ```js
   const fibonacci = n => {
     if (n < 3) return 1;
     return fibonacci(n - 1) + fibonacci(n - 2);
   }
   ```

2. 아래 `profile` object 에 `this.name` 을 반환하는 `getName` 이라는 함수를 생성하고자 한다. 기존의 함수작성법(`function() {}`)  과 Arrow function(`() => {}`)  중에서 어떤걸 사용해야 할까?

   ```js
   const profile = {
       name: 'Alex',
       getName: // 
   };
   ```

   ```js
   const profile = {
       name: 'Alex',
       getName: function() {
           return this.name;
       }
   };
   
   profile.getName(); // 'Alex'
   ```

   ```js
   const profile = {
       name: 'Alex',
       getName: () => this.name
   };
   
   profile.getName(); // TypeError: Cannot read property 'name' of undefined
   ```

   * Arrow Function 에서 `this` 는 한단계 위의 object 를 의미한다. 즉 현재 속해있는 `profile` object 가 아니라 그 한단계 위의 object 를 의미하는 것인데, 위 코드의 경우에는 `profile` object 보다 상위에 아무것도 없기 때문에 `undefined` 가 된다. 브라우저 JS콘솔에서는 `this` 는 `Window` DOM 을 의미하게 되는데 이는 추후에 살펴보도록 하자.

## Section 11 : 진화한 Object literals 

* ES5

  ```js
  function createBookShop(books) {
      return {
          books: books,
          booksTotalValue: function() {
              return this.books.reduce((total, book) => total + book.price, 0);
          },
          priceForTitle: function(title) {
              return this.books.find(book => book.title === title).price;
          }
      };
  }
  
  const books = [
      { title: 'Homo Deus', price: 10 },
      { title: 'Eloquent Javascript', price: 15 }
  ];
  
  const bookShop = createBookShop(books);
  
  bookShop.booksTotalValue(); // 25
  bookShpo.priceForTitle('Homo Deus'); // 10
  ```

* ES6

  ```js
  function createBookShop(books) {
      return {
          // books: books, => 만약 key: value 가 같다면, 한번만 적어도 된다.
          books,
          // key: value 에서 value 가 function 이라면, : 과 function 키워드 삭제가능.
          booksTotalValue() {
              return this.books.reduce((total, book) => total + book.price, 0);
          },
          priceForTitle(title) {
              return this.books.find(book => book.title === title).price;
          }
      };
  }
  
  const books = [
      { title: 'Homo Deus', price: 10 },
      { title: 'Eloquent Javascript', price: 15 }
  ];
  
  const bookShop = createBookShop(books);
  
  bookShop.booksTotalValue(); // 25
  bookShpo.priceForTitle('Homo Deus'); // 10
  ```

---

* **[실제 개발에서는?]**

  ```js
  function saveFile(url, data) {
      $.ajax({ method: 'POST', url: url, data: data});
  }
  
  const url = "http://somedrive.com";
  const data = { code: 'HappyHacking' };
  
  saveFile(url, data);
  ```

  ```js
  function saveFile(url, data) {
      $.ajax({ url, data, method: 'POST' });
  }
  
  const url = "http://somedrive.com";
  const data = { code: 'HappyHacking' };
  
  saveFile(url, data);
  ```

---

### Exercises

1. 아래 코드를 refactoring 해보자.

   ```js
   const red = '#ff0000';
   const blue = '#0000ff';
   const filed = ['name', 'title', 'content']
   
   const colors = { red: red, blue: blue, field: field };
   ```

   ```js
   const red = '#ff0000';
   const blue = '#0000ff';
   const filed = ['name', 'title', 'content']
   
   const colors = { red, blue, field };
   ```

2. 아래 코드를 refactoring 해보자.

   ```js
   const color = 'white';
   const model = 'Mercedes S500'
   
   const Car = {
     color: color,
     model: model,
     drive: function() {
       return 'Vroom!';
     },
     getColor: function() {
       return this.color;
     }
      
     getModel: function() {
       return this.model;
     }
   };
   ```

   ```js
   const color = 'white';
   const model = 'Mercedes S500'
   
   const Car = {
     color,
     model,
     drive() {
       return 'Vroom!';
     },
     getColor() {
       return this.color;
     },
     getModel() {
       return this.model;
     }
   };
   ```

## Section 12 : Default Function arguemnts 

* ES5 code

  ```js
  function makeRequest(url, method) {
      if (!method) {
          method = 'GET';
      }
      // 서버에 요청을 보내는 logic
      return method;
  }
  
  makeRequest('google.com/');
  makeRequest('google.com/', 'GET');
  ```

* ES6 code

  ```js
  function makeRequest(url, method='GET') {
      // 서버에 요청을 보내는 logic
      return method;
  }
  
  makeRequest('google.com/'); // GET
  makeRequest('google.com/', null); // nothing..
  makeRequest('google.com/', undefined); // GET
  makeRequest('google.com/', 'POST'); // POST
  ```

---

* More code

  ```js
  function User(id) {
      this.id = id;
  }
  
  function generateId() {
      return Math.random() * 99999;
  }
  
  function createAdminUser(user) {
      user.admin = true;
      return user;
  }
  
  createAdminUser(new User(generateId())); // 호출할 때 너무 지저분하다. 깔끔하게 만드려면?
  ```

  ```js
  function User(id) {
      this.id = id;
  }
  
  function generateId() {
      return Math.random() * 99999;
  }
  
  function createAdminUser(user=new User(generateID())) {
      user.admin = true;
      return user;
  }
  
  createAdminUser(); 
  
  const user = new User(generateId());
  cretaeAdminUser(user);
  ```

---

### Exercises

1. 아래 코드를 default function args 를 사용해 reafactoring 해보자.

   ```js
   function sum(a, b) {
     if (a === undefined) {
       a = 0; 
     }
     
     if (b === undefined) {
       b = 0; 
     }
     
     return a + b;
   }
   ```

   ```js
   function sum(a=0, b=0) {
       return a + b;
   }
   ```

2. 아래 코드를 default function args 를 사용해 reafactoring 해보자.

   ```js
   function addOffset(style) {
     if (!style) {
       style = {}; 
     }
     
     style.offset = '10px';
     
     return style;
   }
   ```

   ```js
   function addOffset(style={}) {
     style.offset = '10px';
     
     return style;
   }
   ```



## Section 13 : Rest and Spread Opertor

- without `...` (Rest) operator

  ```js
  function addNumbers(a,b,c,d,e) {
      const numbers = [a,b,c,d,e];
      return numbers.reduce((sum, number) => { 
      	return sum + number;
      }, 0)
  }
  
  addNumbers(1,2,3,4,5); //만약 5개보다 많다면..?
  ```

- with `...` (Rest) operator

  ```js
  function addNumbers(...numbers) { // 몇개가 들어와도 numbers 라는 배열로 처리한다.
      return numbers.reduce((sum, number) => { 
      	return sum + number;
      }, 0)
  }
  
  addNumbers(1,2,3,4,5,6,7,8,9,10); 
  ```

------

- with `...` (Spread) operator

  ```js
  const defaultColors = ['red', 'green', 'blue'];
  const myFavoriteColors = ['navy', 'black', 'gold', 'white']
  
  let palette = defaultColors.concat(myFavoriteColors); // ["red","green","blue","navy","black","gold","white"]
  
  ```

- with `...` (Spread) operator

  ```js
  const defaultColors = ['red', 'green', 'blue'];
  const myFavoriteColors = ['navy', 'black', 'gold', 'white'];
  
  let palette = [defaultColors, myFavoriteColors]; // [["red","green","blue"],["navy","black","gold","white"]]
  
  palette = [ ...defaultColors, ...myFavoriteColors]; // ["red","green","blue","navy","black","gold","white"]
  ```

- More advantages

  ```js
  const defaultColors = ['red', 'green', 'blue'];
  const myFavoriteColors = ['navy', 'black', 'gold', 'white'];
  const iPhoneColors = ['rose gold', 'space black'];
  
  palette = ['brown', 'gray', ...defaultColors, ...myFavoriteColors, ...iPhoneColors]; // ["red","green","blue","navy","black","gold","white"]
  ```

  ```js
  function validatShoppingList(...items) {
      if (items.indexOf('milk') < 0) {
          return ['milk', ...items];
      }
  }
  
  validateShoppingList('oranges', 'bread', 'eggs');
  ```

------

- **[실제 개발에서는?]**

  - 엄청나게 많은 사람들이 아래 코드로 이루어진 Library 를 사용한다면? 이 함수의 이름을 `multiply` 로 바꾸고 싶어도 쉽게 바꿀 수 없다.

  ```js
  const MathLibrary = {
      calculateProduct(a, b) { 
          return a * b;
      } 
  };
  ```

  ```js
  const MathLibrary {
      multiply(a, b) {
          erturn a * b;
      }
      
      caculateProduct(...args) {
          console.log('Please use the method "multiply" instead :)')
          return this.multiply(...args);
      }
  }
  ```

------

### Exercises

1. 아래 코드를 Rest Operator(`...`) 를 사용해 리팩토링 하자.

   ```js
   function product(a, b, c, d, e) {
     var numbers = [a,b,c,d,e];
     
     return numbers.reduce(function(acc, number) {
       return acc * number;
     }, 1)
   }
   ```

   ```js
   function product(...args) {
     return args.reduce(function(acc, number) {
       return acc * number;
     }, 1)
   }
   ```

2. 아래 코드를 Spread Operator(`...`)를 통해 리팩토링 하자.

   ```js
   function join(array1, array2) {
     return array1.concat(array2);
   }
   ```

   ```js
   function join(array1, array2) {
     return [...array1, ...array2];
   }
   ```

3. 아래 코드를 리팩토링 해보자!

   ```js
   function unshift(array, a, b, c, d, e) {
     return [a, b, c, d, e].concat(array);
   }
   ```

   ```js
   function unshift(array, ...args) {
     return [...args, ...array];
   }
   ```