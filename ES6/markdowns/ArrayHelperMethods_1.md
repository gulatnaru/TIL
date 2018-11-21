# 1) Array Helper Methods_1

## Section 1 : Berfore we get started

### How to run Code.

* Text editor => Chrome JS console

### Ecmascript? ES6? ES2015? Babel?

* **ES6** === EcmaScript V6 === EcmaScript 2015. 3단어는 모두 같은 걸 의미한다.

* EcmaScript 는 Javascript 의 표준(standard) 이다. ES6 는 (2015년에 나온)새로운 버전의 JS 라고 이해해도 무리가 없다.

* 일반적으로 말하는 JS 는 *ES5* 표준을 의미하며, ES5 는 모든 브라우저에서 안전하게 동작한다.

* ES6 는 ES5 보다 더 많은 기능과 새롭고 간결한 문법등을 지원한다. 하지만 아직 모든 브라우저가 ES6 를 완전하게 지원하지는 않는다. 

* 이렇게 브라우저 호환성 문제를 해결해 주는 것이 **Babel** 이다.

  ![Babel](./images/Babel.png)

* **Babel 은 Javascript 컴파일러다(Babel is a JavaScript compiler.)**. 현재 브라우저의 새로운 ES 표준 지원 속도보다 새로운 ES표준의 등장 속도가 더 빠르기 때문에, 현재는 ES6 를 ES5 로 컴파일 하지만, 나중에는 ES7 => ES6, ES8 => ES6 와 같이 더 높은 버전의 ES 표준을 아래 버전으로 컴파일 해주기도 하기 때문에, 계속해서 쓰일 것으로 예상된다.

---

### Array Helper Methods - 더 나은 코드를 작성하는 가장 쉬운 방법

- 과거 ES5 에서 정식으로 지원하지 않아, `_`(underscore) 와 같은 외부 라이브러리를 사용하거나, 직접 `Array` 의 `prototype` 에 작성해 사용했던 메서드들이 ES6 에서 정식으로 지원한다.
- 앞으로 살펴볼 **배열 헬퍼 메서드(Array Helper Methods)**들은 다음과 같다
  - `forEach`
  - `map`
  - `filter`
  - `find`
  - `every`
  - `some`
  - `reduce`
- 위의 메서드들을 잘 익혀서 사용하는 습관을 들이게 되면, 다양한 데이터들의 모음(collections of data)을 다룰 때 엄청나게 편리할 것이다.
- 위 메서드들은 기존의 전통적인 `for` 반복문을 사용하는 걸 피하기 위해 만들어 졌다. 때문에 혹시 `for` 반복문을 통해 모든 배열 관련 문제들을 해결해 왔다면, 의도적으로라도 `for` 반복문 사용을 참고, 새롭게 소개하는 배열 헬퍼 메서드들을 사용하도록 하자.

---

## Section 2 : `forEach` Helper

* `for` loop

  ```js
  var colors = [ 'red', 'blue', 'green' ];
  
  for (var i = 0; i < colors.length; i++) {
      console.log(colors[i]);
  }
  ```

* `forEach`

  ```js
  var colors = [ 'red', 'blue', 'green' ];
  
  colors.forEach(function(color) { // forEach 뒤에 오는 익명함수를 Iterator funciton 이라 부른다.
      console.log(color);
  })
  ```

  * 왜 `forEach` 헬퍼를 사용해야 할까?
    * 우선 코드의 양이 매우 줄었다.
    * 쓸데없는 정보들 (`var i = 0; i < colors.length; i++`)이 사라지고 가장 필요한 코드들만 남아 있다.
    * 더 복잡한 코드를 통해 `forEach` 의 매력을 알아보자.

---

* 익명함수(anonymous function) 사용하기.

  ```js
  // 숫자들이 들어있는 배열을 만든다.
  var numbers = [1,2,3,4,5];
  
  // 배열의 숫자들의 합을 저장할 변수 sum 을 선언한다.
  var sum = 0
  
  // 배열을 반복해서 돌면서, sum 변수에 더해 나간다.
  numbers.forEach(function(number) {
     sum += number; 
  });
  
  // sum 변수를 출력한다.
  console.log(sum);
  ```

  * `forEach` 뒤에 항상 익명함수를 넘겨야만 하는 것은 아니다.
  * 위의 익명함수를 따로 분리하여 함수로 만들고 코드를 작성해 보자.

* 이터레이터 함수(iterator function) 사용하기.

  ```js
  // 숫자들이 들어있는 배열을 만든다.
  var numbers = [1,2,3,4,5];
  
  // 배열의 숫자들의 합을 저장할 변수 sum 을 선언한다.
  var sum = 0
  
  // sum 에 배열의 숫자들을 더하는 adder 함수를 만들어 보자.
  function adder(number) {
      sum += number;
  }
  
  // 배열을 반복해서 돌면서, sum 변수에 더해 나간다.
  numbers.forEach(adder);
  
  // sum 변수를 출력한다.
  console.log(sum);
  ```

  * 주의할 점은 `numbers.forEach(adder());` 가 아니라는 점이다. 이렇게 작성할 경우, `adder` 함수가 실제로 실행된 이후, 결과값 만을 넘기게 되는데 이는 우리가 원하는 작업이 아니다.
  * 우리는 `adder` 라는 함수 전체가 `forEach` 헬퍼의 인자로 들어가기 원하기 때문에, `numbers.forEach(adder)` 가 맞다.

* **[실제 개발에서는?]**  이런 `forEach` 헬퍼는 실제 web application 에서 언제 사용될까? 무궁 무진한 사용 예제가 존재하겠지만, 가령 스팸함에 있는 이메일을 모두 지우는 버튼이 있고, 해당 버튼을 클릭하면 다음과 같은 JS 코드가 동작한다고 하면 충분히 짧은 코드지만 해당 기능을 수행할 수 있다는 걸 알 수 있다.

  ```js
  // 스팸 메일들을 저장한 spamMails array
  spamMails.forEach(function(spamMail) {
  	// 특정 Mail 을 삭제하는 deleteMail function
      deleteMail(spamMail);
  });
  ```

---

### Exercises

1. 아래 코드를 `forEach` 문법으로 바꿔본다면?

    ```js
    function handlePosts() {
        var posts = [
          { id: 23, title: 'Daily JS News' },
          { id: 52, title: 'Code Refactor City' },
          { id: 105, title: 'The Brightest Ruby' }
        ];

        for (var i = 0; i < posts.length; i++){
            savePost(posts[i]);
        }
    }
    ```

    ```js
    function handlePosts() {
        var posts = [
          { id: 23, title: 'Daily JS News' },
          { id: 52, title: 'Code Refactor City' },
          { id: 105, title: 'The Brightest Ruby' }
        ];

        posts.forEach(function(post){
            savePost(post);
        })
    }
    ```

  1. 아래 코드의 `images` 배열안에 있는 정보(`height`,`width`)를 곱해 넓이를 구하여 `areas` 배열에 저장하는 코드를 `forEach` 헬퍼를 사용해 작성해 보자.

      ```js
      var images = [
        { height: 10, width: 30 },
        { height: 20, width: 90 },
        { height: 54, width: 32 }
      ];
      
      var areas = [];
      ```

      ```js
      var images = [
        { height: 10, width: 30 },
        { height: 20, width: 90 },
        { height: 54, width: 32 }
      ];
      
      var areas = [];
      
      images.forEach(function(image){
          areas.push(image.height * image.width);
      })
      ```



## Section 3 : `map` Helper
* `for` loop

  ```js
  var numbers = [1,2,3];
  var doubleNumbers = [];
  
  for (var i = 0; i < nubmers.length; i++) {
      doubleNumbers.push(numbers[i] * 2); 
  }
  
  console.log(doubleNumbers);
  ```

* `map`

  ```js
  var numbers = [1,2,3];
  
  var doubleNumbers = numbers.map(function(number) {
     return number * 2; // return 잊지 않기! 모든 요소들에 대하여 연산을 마치고 return
  });
  
  console.log(doubleNumbers);
  ```

---

* 익명함수 사용하기

  ```js
  var cars = [
      { model: 'Damas', price: '1000'},
      { model: 'Camaro', price: '10000'}
  ];
  
  var prices = cars.map(function(car) {
      return car.price;
  });
  
  console.log(prices);
  ```

* 이터레이터 함수 사용하기

  ```js
  var cars = [
      { model: 'Damas', price: '1000'},
      { model: 'Camaro', price: '10000'}
  ];
  
  function pickPrice(car) {
      return car.price;
  }
  
  var prices = cars.map(pickPrice);
  
  console.log(prices);
  ```

* **[실제 개발에서는?]** `map` 헬퍼는 실제로 어디에 사용될까? `map` 헬퍼는 프론트엔드 업데이트 코드에서 특히나 많이 사용된다. 실제로 개발을 진행하다 보면, 결국 데이터들의 리스트(배열)을 보여주는 것 일 경우가 엄청나게 많다. Facebook, Instagram 등 수 많은 App 들이 그러하다. 
  ```js
  posts = [
      { title: 'Happy', content: 'Hacking' },
      { title: 'We will', content: 'Rock You'},
      { title: 'Javascript', content: 'EcmaScript6'}
  ];
  ```

* 위와 같은 데이터 셋(collections of data)이 있을 때, 이 데이터들은 위의 모습으로 DB 에 존재하는 것이 일반적이다. 하지만 실제 사용자에게 보여질 때에는, HTML 에 해당 Data 들이 들어가 있는 형태로 바뀌어야 하는데, 이때 `map` 헬퍼를 사용하면, 원본 데이터는 바꾸지 않고 HTML 안에 들어가 있는 새로운 데이터 셋을 리턴할 수 있다!

---

### Exercises

  1. `map` 헬퍼를 사용해, `images` 배열 안의 Object 들의 `height` 들만 저장되어 있는 `heights` 배열에 저장해 보자.

     ```js
     var images = [
         { height: '34px', width: '39px' },
         { height: '54px', width: '19px' },
         { height: '83px', width: '75px' },
     ];
     
     var heights;
     ```

     ```js
     var images = [
         { height: '34px', width: '39px' },
         { height: '54px', width: '19px' },
         { height: '83px', width: '75px' },
     ];
     
     var heights = images.map(function(image) {
         return image.height;
     });
     
     
     ```

  2. `map` 헬퍼를 사용해서, `distance / time` (속도) 를 저장하는 배열 `speeds` 를 만들어라.

     ```js
     var trips = [
       { distance: 34, time: 10 },
       { distance: 90, time: 50 },
       { distance: 59, time: 25 }
     ];
     
     var speeds;
     ```

     ```js
     var trips = [
       { distance: 34, time: 10 },
       { distance: 90, time: 50 },
       { distance: 59, time: 25 }
     ];
     
     var speeds = trips.map(function(trip) {
         return trip.distance / trip.time;
     });
     ```

  3. **[도전!]** 아래의 `pluck` function 을 완성하라. `pluck` 함수는 배열(`array`)과 요소 이름(key)의 문자열(`property`) 를 인자로 받으며, 요소(value) 들을 저장한 배열을 return 한다. (Hint: object 에서 key 값으로 value에 접근하는 법은 `object.value` 도 있지만, `object[value]` 도 있다는 사실! )

     ```js
     function pluck (array, property) {
         // Fill this up
     }
     
     var paints = [ 
         { color: 'red' }, 
         { color: 'blue' }, 
         { color: 'yellow' }
     ];
     
     pluck(paints, 'color') // Should returns ['red', 'yellow', 'blue']
     ```

     ```js
     function pluck (array, property) {
         var values = array.map(function (element) {
             return element[property];
         });
         return values;
     }
     
     var paints = [ 
         { color: 'red' }, 
         { color: 'blue' }, 
         { color: 'yellow' }
     ];
     
     pluck(paints, 'color') // Should returns ['red', 'yellow', 'blue']
     ```

## Section 4 : `filter` Helper
* `for` loop

  ```js
  var products = [
      { name: 'cucumber', type: 'vegetable'},
      { name: 'banana', type: 'furit'},
      { name: 'carrot', type: 'vegetable'},
      { name: 'apple', type: 'fruit'},
  ];
  var filteredProducts = []; 
  // products array 의 objects 중 type이 fruit 인 요소들만 뽑고자 한다.
  // 다만 products array 자체를 바꾸고 싶은것이 아니라, 원하는 조건에 맞는 데이터들만 골라서 subset 을 만들고자 한다.
  
  for (var i = 0; i < products.length;, i++) {
      if (products[i].type === 'fruit') {
          filterProducts.push(product[i]);
      }
  }
  
  console.log(filteredProducts);
  ```

* ES6 code

  ```js
  var products = [
      { name: 'cucumber', type: 'vegetable' },
      { name: 'banana', type: 'furit' },
      { name: 'carrot', type: 'vegetable' },
      { name: 'apple', type: 'fruit' },
  ];
  var filteredProducts = products.filter(function(product) {
      return product.type === 'fruit' // 해당 조건문에서 true 를 만족할 경우 return
  });
  ```

  ```js
  var products = [
      { name: 'cucumber', type: 'vegetable', quantity: 0, price: 1 },
      { name: 'banana', type: 'furit', quantity: 10, price: 15 },
      { name: 'carrot', type: 'vegetable', quantity: 20, price: 9 },
      { name: 'apple', type: 'fruit', quantity: 7, price: 6 }
  ];
  
  // type 이 vegetable 인데, 가격이 10 이하이고, 재고가 있는 object 를 필터링
  
  products.filter(function(product) {
      return prodcut.type === 'vegetable' 
      && prudoct.quantity > 0
      && product.price < 10
  });
  ```

---

* **[실제 개발에서는?]** 블로그에서 다음과 같은 DB 스키마 구성일 경우, 특정 `post` 의 `comment` 만을 뽑아내는 코드가 대표적으로 `filter` 헬퍼로 작성된다.

  * Posts

    | id   | title       | content       |
    | ---- | ----------- | ------------- |
    | 1    | New post    | Great         |
    | 2    | ES6 means.. | EcmaScript V6 |

  * Comments

    | postID | content                            |
    | ------ | ---------------------------------- |
    | 1      | Awesome!                           |
    | 2      | It's also known as EcmaScript 2015 |
    | 2      | We need Babel!                     |
    | 1      | Brand new :)                       |
    | 2      | ES6 supports filter method lol     |

* ES6 code

  ```js
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
  function commentsForPost(post, comments) {
      return comments.filter(function(comment) {
          return comment.postID === post.id;
      });
  }
  
  var my_post = setPost(2, posts)[0]; // setPost()의 결과물이 배열이기 때문에 요소가 하나라도 index 접근이 필요하다.
  
  // id 2 번인 Post의 댓글들을 뽑아내려면?
  console.log(commentsForPost(my_post, comments));
  ```

---

### Exercises

1. `filter` 헬퍼를 사용해서, `numbers` 배열중 50보다 큰 값들만 필터링해서 `filteredNumbers` 에 저장하라.

  ```js
  var numbers = [15, 25, 35, 45, 55, 65, 75, 85, 95];
  
  var filteredNumbers;
  ```

  ```js
  var numbers = [15, 25, 35, 45, 55, 65, 75, 85, 95];
  
  var filteredNumbers = numbers.filter(function(number) {
      return number > 50;
  });
  ```

2. `users` 배열에서 `admin` 레벨이 `true` 인 `user` object 들만 `filteredUsers` 에 저장하라.

   ```js
   var users = [
    { id: 1, admin: true },  
    { id: 2, admin: false },
    { id: 3, admin: false },
    { id: 4, admin: false },
    { id: 5, admin: true },
   ];
   
   var filteredUsers;
   ```

   ```js
   var users = [
    { id: 1, admin: true },  
    { id: 2, admin: false },
    { id: 3, admin: false },
    { id: 4, admin: false },
    { id: 5, admin: true },
   ];
   
   var filteredUsers = users.filter(function(user) {
       return user.admin === true
   });
   ```

3. **[도전!]** 아래의 `reject` function 을 완성하라. `filter` 가 조건을 만족하는 요소를 배열로 return한다면, `reject`는 조건을 **만족하지 않는 요소들**만 배열로 return 해야 한다. 

   ```js
   var numbers = [10, 20, 30];
   
   function reject(array, iteratorFunction) {
   	// Fill this up  
   }
   
   var lessThan15 = reject(numbers, function(number) {
       return number > 15
   })
   
   console.log(lessThan15) // [10]
   ```

   ```js
   var numbers = [10, 20, 30];
   
   function reject(array, iteratorFunction) {
       return array.filter(function(element) {
           return !iteratorFunction(element); 
       });
   }
   
   var lessThan15 = reject(numbers, function(number) {
       return number > 15
   });
   
   console.log(lessThan15) // [10]
   ```

   * `iteratorFunction` 의 결과값(Boolean)을 `!` 로 바꾸면 15보다 크면 `true` 를 return 하던 값들이 반대로 `false` 를 return 하게 되므로, 우리가 원하는 결과를 얻을 수 있다!