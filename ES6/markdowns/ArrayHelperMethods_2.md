# 2) Array Helper Methods_2

## Section 5 : `find` Helper

- `for` loop

  ```js
  var users = [
      { name: 'Tony Stark' },
      { name: 'Steve Rogers' },
      { name: 'Thor' }
  ];
  
  var user;
  
  // 아래 코드는 원하는 object 를 찾아도 users 를 끝까지 돌게 된다.
  for (var i = 0; i < users.length; i++) {
      if (users[i].name === 'Tony Stark') {
          user = users[i];
          break; // 브레이크를 걸게되면, 원하는 조건에 도달하면 더 돌지 않는다.
      }
  }
  ```

- `find` 

  ```js
  var users = [
      { name: 'Tony Stark' },
      { name: 'Steve Rogers' },
      { name: 'Thor' }
  ];
  
  users.find(function(user) {
      return user.name === 'Tony Stark';
  });
  ```

  * `find` 헬퍼는 원하는 요소를 찾으면 뒤에 같은 조건을 만족하는 요소가 있더라도, 더 찾지 않고 멈춘다! `filter` 는 조건을 만족하는 모든 요소를 배열로 return 하는 것과 비교해보자.

------

* More complex code

  ```js
  function Car(model) {
      this.model = model;
  }
  
  var cars = [
      new Car('Benz'),
      new Car('Audi'),
      new Car('BMW')
  ];
  
  var car = cars.find(function(car) {
      return car.model ==== 'Benz';
  });
  ```

  ```js
  var posts = [
      { id: 1, title: 'First Post' },
      { id: 2, title: 'Second Post'}
  ];
  
  var comment = { postID: 2, content: 'Great!' };
  
  function postsForComment(posts, comment) {
      return posts.find(function(post) {
          return post.id === comment.postID;
      });
  }
  
  console.log(postForComment(posts, comment)); //{ "id": 1, "title": "First Post" }
  ```

---

* **[실제 개발에서는?]** 직관적으로 생각해도 매우 자주 사용될 것으로 보인다. 가장 대표적인 예는, 여러 게시글들 목록에서 특정 게시글을 누르면 해당 게시글을 자세히 보여주는 게시판 일 것이다.

  * 가령 URL  `http://myblog.com/posts`  은 `myblog` 에 있는 모든 게시글(`posts`) 들의 목록을 보여주는 화면이고,

  * `http://myblog.com/posts/3` 은 여러 게시글들 중에서 id 3번의 게시글을 보는 URL 이라고 하자.

  * DB 에는 아래와 같이 들어가 있다.

  * Posts 테이블

    | id   | title            | content              |
    | ---- | ---------------- | -------------------- |
    | 1    | Motto            | HappyHacking         |
    | 2    | My personal Info | It's secret guys lol |
    | 3    | Ruby vs Python?  | Do what you want!    |
    | 4    | Welcome to the   | Black parade!        |
    | ...  | ...              | ...                  |

  * 해당 데이터 셋에서 `http://myblog.com/posts/3` 의 URL에 대응하기 위해서 아래와 같은 코드가 동작할 것이라는 걸 알 수 있다. (`const` 는 한번 할당되면 바뀌지 않을 상수를 의미한다. 뒤에서 `const` 와 `let` 에 대하여 알아볼 것이다.)

    ```js
    const posts = [
        { id: 1, title: 'Motto', content: 'HappyHacking' },
        { id: 2, title: 'My presonal Info', content: 'It\'s secret guys lol' },
        { id: 3, title: 'Ruby vs Python', content: 'Do what you want!' },
        { id: 4, title: 'Welcome to the', content: 'Black parade' },
        //...
    ];
        
    const postId = getIdFromURL();
    
    const post = posts.find(function(post) {
        return post.id === postID;
    });
    ```

---

### Exercises

  1. `users` 중에 `admin` 권한을 가진 요소를 찾아서 `admin` 에 저장하자.

     ```js
     var users = [
       { id: 1, admin: false },
       { id: 2, admin: false },
       { id: 3, admin: true }
     ];
     
     var admin;
     ```

     ```js
     var users = [
       { id: 1, admin: false },
       { id: 2, admin: false },
       { id: 3, admin: true }
     ];
     
     var admin = users.find(function(user) {
         return user.admin === true;
     });
     ```

  2. `accounts` 중에서 잔액이 12 인 object 를 `account` 에 저장하자.

     ```js
     var accounts = [
       { balance: -10 },
       { balance: 12 },
       { balance: 0 }
     ];
     
     var account;
     ```

     ```js
     var accounts = [
       { balance: -10 },
       { balance: 12 },
       { balance: 0 }
     ];
     
     var account = accounts.find(function(account) {
         return account.balance === 12;
     })
     ```

  3. **[도전]** 가장 많이 사용되는 `find` 명령은, object 에 대해서 주어진 값을 찾는 것이다. 매번  function 을 다 작성하는 것 보다는, 아예 이런 `find` 의 기능을 하는 함수를 만들어 버리는 것이 더 편하다.

     ```js
     var ladders = [
         { id: 1, height: 20 },
         { id: 3, height: 25 }
     ]
     
     function findWhere(array, criteria) {
     	// Fill this up   
     }
     
     console.log(findWhere(ladders, { height: 20 })); // { id: 1, height: 20 }
     ```

     ```js
     var ladders = [
         { id: 1, height: 20 },
         { id: 3, height: 25 }
     ]
     
     function findWhere(array, criteria) {
         const property = Object.keys(criteria)[0]; // 아래 호출의 경우 { height: 20 } object 에서 'height' 라는 Key 값을  상수 property 에 저장.
         return array.find(function(element) {
             return element[property] === criteria[property];
         });
     }
     
     console.log(findWhere(ladders, { height: 20 })); 
     ```


## Section 6 : `every` & `some`  helper

* `every` 와 `some` 은 기존처럼 대상 배열에서 특정 요소를 뽑거나, 배열을 return 하지 않고, 조건에 대해  boolean 값을 return 한다. (`true` / `false`)

* `for` loop

  ```js
  var computers = [
      { name: 'macbook', ram: 16 },
      { name: 'gram', ram: 8 },
      { name: 'series9', ram: 32 },
  ];
  
  var everyComputersAvailable = true;
  var someComputersAvailable = false;
  
  for (var i = 0; i < computers.lenght; i++) {
      var computer = computers[i];
      
      if (computer.ram < 16) {
          everyComputersAvailable = false;
      } else {
          someComputersAvailable = true;
      }
  }
  ```

* `every` & `some`

  ```js
  var computers = [
      { name: 'macbook', ram: 16 },
      { name: 'gram', ram: 8 },
      { name: 'series9', ram: 32 },
  ];
  
  // (computers[0] > 16) && (computers[1] > 16) && (computers[2] > 16)
  var everyComputersAvailable = computers.every(function(computer) {
      return computer.ram > 16;
  });
  
  // (computers[0] > 16) || (computers[1] > 16) || (computers[2] > 16)
  var someComputersAvailable = computers.some(function(computer) {
      return computer.ram > 16;
  });
  ```

---

* More practicies

  ```js
  var names = [
      'Alex', 
      'Bill',
      'Chris'
  ];
  
  names.every(function(name) {
      return name.lenght > 4;
  }); // false
  
  names.some(function(name) {
      return name.lenght > 4;
  }); // true
  ```

* **[실제 개발에서는?]** 만약 우리가 회원가입 기능을 만든다고 가정해 보자.

  ```js
  function Input(value) {
      this.value = value;
  }
  
  // prototype 은 지금당장 몰라도 상관없다. 사용자 입력값(Input)에 대해 입력값이 있는지에 대한 유효성검사(validation)를 한다고 생각하자.
  Input.prototype.validate = function() {
      return this.value.length > 0;
  }
  
  var username = new Input("");
  username.validate(); // false
  
  username = new Input('neo');
  username.validate(); // true
  
  // 이런식으로 특정 입력값에 대하여 유효성 검사를 진행할 수 있다.
  // 하지만 만약 입력값이 아주 많고, 모두 유효성 검사를 해야한다면?
  var password = new Input("123123");
  var email = new Input("neo@hphk.kr");
  var address = new Input("Seoul Korea")
  var birthday = new Input('12, Jul');
  
  // 1. 모두 && 로 검사한다.
  if (username.validate && password.validate && email.validate && address.validate && birthday.validate) {
      // 회원가입을 시킨다.
      signUp();
  } else {
      // 회원가입을 거절한다.
      rejectSignUp();
  }
  
  // 2. every 헬퍼를 사용한다.
  var inputs = [username, password, email, address, birthday];
  
  var inputsAreValid = inputs.every(function(input) {
      return input.validate;
  });
  
  if (inputsAreValid) {
      // 회원가입을 시킨다.
      signup();
  } else {
      // 회원가입을 거절한다.
      rejectSignUp();
  }
  ```

---

### Exercises

1. `users` 배열에서 모두가 `hasSubmitted` 인지 아닌지를  `hasSubmitted` 에 저장하라

   ```js
   var users = [
       { id: 21, hasSubmitted: true },
       { id: 33, hasSubmitted: false },
       { id: 712, hasSubmitted: true}
   ];
   
   var hasSubmitted;
   ```

   ```js
   var users = [
       { id: 21, hasSubmitted: true },
       { id: 33, hasSubmitted: false },
       { id: 712, hasSubmitted: true}
   ];
   
   var hasSubmitted = users.every(function(user) {
       return user.hasSubmitted;
   });
   ```

2. `requests` 배열에서 각 요청들 중 `status` 가 `pending` 인 요청이 있으면, `inProgress` 변수에 `true` 를 저장하라.

   ```js
   var requests = [
     { url: '/photos', status: 'complete' },
     { url: '/albums', status: 'pending' },
     { url: '/users', status: 'failed' }
   ];
   
   var inProgress;
   ```

   ```js
   var requests = [
     { url: '/photos', status: 'complete' },
     { url: '/albums', status: 'pending' },
     { url: '/users', status: 'failed' }
   ];
   
   var inProgress = requests.some(function(request) {
       return request.status === 'pending';
   });
   ```



## Section 7 : `reduce` helper

* `reduce` 는 가장 어려우면서도 동시에 가장 유연한 헬퍼 메서드다. 이전에 있던 모든 헬퍼들을 `reduce` 로 구현할 수 있을 정도다!

* `for` loop

  ```js
  var numbers = [10, 20, 30];
  var sum = 0;
  
  for (var i = 0; i < numbers.length; i++) {
      sum += numbers[i];
  }
  
  console.log(sum); // 60
  ```

* `reduce`

  ```js
  var numbers = [10, 20, 30];
  
  // reduce 콜백함수의 인자 acc는 accumulator(연산결과를 저장하는 곳)의 줄임말이다.
  var result = numbers.reduce(function(acc, number) {
      return acc + number;
  }, 0); // acc 라는 변수가 선언된 적이 없지만, acc 에 값이 존재하는 것 처럼 동작하는 이유는, reduce 의 두번째 인자인 0 이 acc 의 초기값이기 때문이다.
  
  console.log(result); //60
  
  result = numbers.reduce(function(acc, number) {
      return acc + number;
  }, 100);
  console.log(result); // 160 => acc 의 초기값이 100이기 때문에 100 + 10 + 20 + 30 
  ```

---

* `map` vs `reduce`

  ```js
  var primaryColors = [
      { color: 'red' },
      { color: 'yellow' },
      { color: 'blue' },
  ];
  
  // Expecting Result : ['red', 'yellow', 'blue']
  // 1. map helper
  primaryColors.map(function(color) {
      return color.color;
  });
  
  // 2. reduce helper 
  primaryColors.reduce(function(acc, color) {
      acc.push(color);
      return acc;
  }, []);
  ```

---

* **[실제 개발에서는?]** : 만약 Technical Interview 때문에 화이트보드 손코딩을 해야하는 상황이다. 주어진 문제는 '올바르게 닫힌 괄호인가?(Are these parenthesis balanced?)' 이다.

  ```js
  function isBalancedParens (string) {
      // reduce 를 사용하여 채워보자! 우선 reduce 는 배열에서 동작하므로, seq 를 배열로 만들어야 한다.
      // split() 메서드를 사용하면 인자에 존재하는 string 으로 문자열을 배열로 쪼갤 수 있다.
      var array = string.split('');
  	// 이제 array 를 reduce 헬퍼를 사용하여 현재 함수를 완성해 보자.
      return array.reduce(function(){}, ?);
  }
  
  var seq1 = "((()()))()";
  var seq2 =  ")()";
  isBalancedParens(seq1); // true
  isBalancedParens(seq2); // false
  ```

  ```js
  function isBalancedParens (string) {
      return !string.split('').reduce(function(acc, char){
          if (acc < 0) {
          	return acc;
          } else if (char === '(') {
              ++acc;
          } else {
              --acc;
          }
          return acc;
      }, 0);
  }
  
  var seq1 = "((()()))()";
  var seq2 =  ")()";
  isBalancedParens(seq1); // true
  isBalancedParens(seq2); // false
  ```

---

### Exercises

1. `reduce` 헬퍼를 사용하여 `trips` 안에 있는 `distance` 들의 합을 구하여 `totalDistance` 에 저장하라.

   ```js
   var trips = [{ distance: 34 }, { distance: 12 } , { distance: 1 }];
   
   var totalDistance;
   ```

   ```js
   var trips = [{ distance: 34 }, { distance: 12 } , { distance: 1 }];
   
   var totalDistance = trips.reduce(function(acc, trip) {
       return acc += trip.distance;
   }, 0);
   ```

2. `reduce` 헬퍼를 사용하여, `desks` 에 있는 object 들의 `type` 이 `'sitting'` 인 것들과 `'standing'` 인 것들의 갯수를 object 로 return 하도록 아래 코드를 완성하라.

   ```js
   var desks = [
     { type: 'sitting' },
     { type: 'standing' },
     { type: 'sitting' },
     { type: 'sitting' },
     { type: 'standing' }
   ];
   
   var deskTypes = desks.reduce(function() {
       
   }, { sitting: 0, standing: 0 });
   ```

   ```js
   var desks = [
     { type: 'sitting' },
     { type: 'standing' },
     { type: 'sitting' },
     { type: 'sitting' },
     { type: 'standing' }
   ];
   
   var deskTypes = desks.reduce(function(acc, desk) {
       if (desk.type === 'sitting') {
           acc.sitting++;
       } else {
           acc.standing++;
       }
       return acc;
   }, { sitting: 0, standing: 0 });
   ```

3. **[도전!]** 아래 `unique` 함수를 완성하라. (`find` 와 `reduce` 헬퍼를 사용하자!)

   ```js
   function unique(array) {
   	    
   }
   
   var numbers = [4, 1, 3, 2, 2, 1, 3, 3, 4, 4, 4];
   console.log(unique(numbers)); // [1, 2, 3, 4]
   ```

   ```js
   function unique(array) {
       return array.reduce(function(acc, element) {
       	if(!acc.find(function(uniqElement) { 
           return element === uniqElement; 
         })) {
            acc.push(element);
       	}
         return acc;
       }, []);
   }
   
   var numbers = [4, 1, 3, 2, 2, 1, 3, 3, 4, 4, 4];
   unique(numbers); // [1, 2, 3, 4]
   ```