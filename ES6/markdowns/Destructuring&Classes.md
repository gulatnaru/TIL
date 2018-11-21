# 4) Destructuring & Classes

## Section 14 : Destructuring

* ES5 code

  ```js
  var expense = {
      type: 'Business',
      amount: '$45 USD'
  }
  
  var type = expense.type;
  var amount = expense.amount;
  ```

* ES6 code

  ```js
  const macbook = {
      model: 'pro 13" with touch bar',
      year: '2018',
  }
  
  const { model } = macbook; 
  const { year } = macbook;
  
  // 그리고 위의 2줄을 아래와 같이 1줄로 줄일 수 있다!
  const { model, year } = macbook; 
  ```

  * 좌변의 `{}` 는 Object 와 관련없는 새로운 문법이다.
  * `const` / `let { model } = macbook` 은 `model` 이라는 이름의 상수/변수 에 `macbook` 이라는 Object 를 참조하여 `macbook.model` 의 값을 저장한다는 의미이다.
  * 마찬가지로 `const { model, year } = macbook` 역시 `macbook` Object 를 참조하여, `const model = macbook.model`, `const year = macbook.year` 과 같다는 의미이다.
  * 반드시 참조하는 Object 의 Key 값과 변수명이 같을때 만 사용할수 있는가? 당연히 그렇다!

---

* ES5 code

  ```js
  var savedFile = {
      extension: 'jpg',
      name: 'profile',
      size: 29930
  };
  
  function fileSummary(file) {
      return `The file ${file.name}.${file.extension} is size of ${file.size} bytes.`
  }
  
  fileSummary(savedFile);
  ```

* ES6 code

  ```js
  const savedFile = {
      extension: 'jpg',
      name: 'profile',
      size: 29930
  };
  
  function fileSummary({ name, extension, size }) {
      return `The file ${name}.${extension} is size of ${size} bytes.`
  }
  
  fileSummary(savedFile);
  ```

---

* Destructuring Array

  ```js
  const companies = [
      'Google',
      'Facebook',
      'Apple'
  ];
  
  const [ name ] = companies // const name = companies[0]
  const [ name1, name2, name3 ] = companies 
  // const name1 = companies[0]
  // const name2 = companies[1]
  // const name3 = companies[2]
  
  let firstCompany = companies[0];
  [ firstCompany ] = companies;
  
  const { length } = companies; // const length = companies.length => 3
  
  const [ one, ...rest ] = companies;
  console.log(one); // Google
  console.log(rest); // ['Facebook', 'Apple']
  ```

* Destructuring Array & Object

  ```js
  const companies = [
      { name: 'Google', location: 'Mountain View' },
      { name: 'Facebook', location: 'Menlo Park' },
      { name: 'Apple', location: 'Cupertino'}
  ];
  
  let [ location ] = companies // const location = companies[0];
  [{ location }] = companies // const location = companies[0].location
  ```

  ```js
  const Google = {
      locations: ['Mountain View', 'NewYork', 'Seoul']
  };
  
  let { locations } = Google // const location = Google.locations
  { locations: [ location ] } = Google; // const location = Google.locations[0]
  console.log(loacation); // Mountain View
  ```

---

* **[실제 개발에서는?]** (Object)

  ```js
  function signup(username, password, email, dateOfBirth, city) {
      // Create new user
  }
  
  signup('myName', 'myPassword', 'my@mail.com', '1/1/2000', 'Seoul');
  ```

  * 위와 같이 입력 필드가 늘어나면, 인자 순서 맞추기도 힘들고 코드가 점점 길어진다.

  ```js
  function signup({ username, password, email, dateOfBirth, city }) {
      // Create new user
  }
  const user = {
      username: 'myName',
      password: 'myPassword',
      email: 'my@mail.com',
      dateOfBirth: '1/1/2000',
      city: 'Seoul'
  }
  
  signup(user); 
  // { username, password, email, dateOfBirth, city } = user;
  ```

  * 이렇게 되면 배열과 달리, Object 에서 알아서 Key 값을 찾기 때문에, 순서를 신경 쓸 필요가 없어진다.

* **[실제 개발에서는?]** (Array to Object)

  * 아래의 `points` 는 배열들의 배열이다. 이를 주석처리한 object 들의 배열로  Destructuring 하고자 한다. 

  ```js
  const points = [
      [7, 12],
      [-1, 20],
      [36, 0]
  ];
  
  /* 
  [
    { x: 7, y: 12 },
  	{ x: -1, y: 20 },
    { x: 36, y: 0 }
  ]
  */
  ```

  * 아래가 익명함수를 사용한 가장 기본적인 형태이다.

  ```js
  points.map( pair => {
      const x = pair[0];
      const y = pair[1];
      return { x: x, y: y};
  });
  ```

  * 아래와 같이 묶을 수 있다.

  ```js
  points.map( pair => {
      const [ x, y ] = pair;
      return { x: x, y: y};
  });
  ```

  * 처음부터 `[x, y]` 를 인자로 받아서 object로 return 한다.

  ```js
  points.map(([ x, y ]) => {
      return { x: x, y: y };
  });
  ```

  * Object 의 `key: value` 가 같으므로 중복 제거.

  ```js
  points.map(([ x, y ]) => {
      return { x, y };
  });
  ```

  * 위의 코드는 1줄로 줄일 수 없다. (모두 `undefined`)

---

### Exercises

1. 아래 코드를 Destructuring 해보자.

   ```js
   const profile = {
     title: 'Engineer',
     department: 'Engineering'
   };
   
   function isEngineer(profile) {
     var title = profile.title;
     var department = profile.department;
     return title === 'Engineer' && department === 'Engineering';
   }
   ```

   ```js
   const profile = {
     title: 'Engineer',
     department: 'Engineering'
   };
   
   function isEngineer({ title, department }) {
     return title === 'Engineer' && department === 'Engineering';
   }
   ```

2. 아래 `classes` Array 를 `classesAsObject` Object 로 `map` 헬퍼와 array destructuring을 통해 바꿔보자. `classesAsObject`는 아마`[{ subject: 'Geography', time: '2pm', teacher: 'Mr. Darnick' }]`와 같은 모습일 것이다.

   ```js
   const classes = [
     [ 'Chemistry', '9AM', 'Mr. Darnick' ],
     [ 'Physics', '10:15AM', 'Mrs. Lithun'],
     [ 'Math', '11:30AM', 'Mrs. Vitalis' ]
   ];
   
   const classesAsObject;
   ```

   ```js
   const classes = [
     [ 'Chemistry', '9AM', 'Mr. Darnick' ],
     [ 'Physics', '10:15AM', 'Mrs. Lithun'],
     [ 'Math', '11:30AM', 'Mrs. Vitalis' ]
   ];
   
   const classesAsObject = classes.map(([ subject, time, teacher ]) => {
       return { subject, time, teacher };
   })
   ```



## Section 15 : Classes

* JS 에서 가장 안좋은 점은 역시 상속 시스템이 없다는 점이다. OOP 에 존재하는 상속 개념이 없기에, JS 에서는 비슷한 개념이 존재하는데, 이것이 바로 Prototypal Inheritance 이다.

* 문제는, 이 Prototypal Inheritance 에 대해 10명의 개발자한테 물어보면, 10명이 모두 다른 대답을한다는 점이다. 때문에 이 Prototypal Inheritance 이 무엇인지 보다는, ES6 에서 이 문제를 어떻게 해결했는지를 살펴보고자 한다.

* 아직 코드를 보지 않았지만, 그전에 꼭 이것을 기억하자. Class 를 통해 생성되는 모든 Instance들은 **Object** 이다. (사실 JS 에서는 모든것이 -함수도!- object 이다. )

* ES5 code (with out classes)

  ```js
  function Car(options) {
      this.title = options.title;
  }
  
  Car.prototype.drive = function() {
      return 'Vrooom';
  }
  
  const car = new Car({ title: 'Genesis' });
  ```

  ```js
  function Car(options) {
      this.title = options.title;
  }
  
  Car.prototype.drive = function() {
      return 'Vrooom';
  }
  
  function Mercedes(options) {
      Car.call(this, options);
      this.color = options.color;
  }
  
  Mercedes.prototype = Object.create(Car.prototype);
  Mercedes.prototype.constructor = Mercedes;
  
  Mercedes.prototype.honk = function() {
      return 'Baaaaam';
  }
  
  const benz = new Mercedes({ color: 'white', title: 'S500' });
  ```

  * 위 코드를 이해하기보다는 Prototypal Inheritance 코드가 엉망이라는 점만 이해하면 된다..

* ES6 code (with classes)

  ```js
  class Car {
      // 생성자(Constructor) 함수
      constructor({ title }) {
          this.title = title;
      } 
      /* _Destructuring_
      constructor(options) {
          this.title = options.title;
      } 
      */
      
      drive() {
          return 'Vrooom'
      }
  }
  
  const car = new Car({ title: 'A6' });
  console.log(car);
  console.log(typeof car); // object!!!!!!
  ```

  ```js
  class Car {
      // 생성자(Constructor) 함수
      constructor({ title }) {
          this.title = title;
      } 
      /* _Destructuring_
      constructor(options) {
          this.title = options.title;
      } 
      */
      
      drive() {
          return 'Vrooom'
      }
  }
  
  class Audi extends Car {
      constructor(options) { // No Destructuring : Convention
          super(options); // Car.constructor()
          this.color = options.color;
      }
      
      honk() {
          return 'Baaaaam'
      }
  }
  
  const audi = new Audi({ color: 'black', title: 'A8' });
  console.log(audi);
  console.log(typeof audi); // object!!!!!!!
  ```

  ![Class_extends](./images/Class_extends.jpeg)

---

* **[실제 개발에서는?]**

  ```js
  // React.js
  class MyComponent extends Component {
      doSomething() {
          // code
      }
      
      doSomethingElse() {
          // code
      }
  }
  ```

---

### Exercises

1. 게임개발자가 `Monster` class 를 작성중이다. 다음 명세에 따라 생성자(`constructor`) 함수를 작성하자.

   * Monster 는 생성될 때 `health` 가 100 이다.
   * `constructor()` 는 `options` 라는 object 를 받으며 `name` 이라는 key 를 가지고 있다. 생성되는 Monster에게 `name` 을 선언하자.

   ```js
   class Monster {
     
   }
   ```

   ```js
   class Monster {
       constructor(options) {
           this.health = 100;
           this.name = options.name;
       }
   }
   
   // 아래도 같은 코드
   class Monster {
       constructor({ name }) {
           this.health = 100;
           this.name = name;
       }
   }
   ```

2. `Monster` class 가 생성되었다. 이번에는 `Monster` 의 subclass(child class) 인 `Snake` class 를 생성해 보자.

   * `Snake` 의 생성자는 `Monster` 와 똑같다. 추가되는 코드는 없으며, 마찬가지로 `options` 라는 이름의 object 를 받는다.

   * `Snake` 는 `bite()` 라는 메서드를 갖는다. 필요한 인자는 다른 `Snake` 객체 뿐이다.
   * `bite()` 를 통과한 다른 `Snake` 객체는 체력(`health`)이 10 깎인다.

   ```js
   class Monster {
     constructor(options) {
       this.health = 100;
       this.name = options.name;
     }
   }
   
   class Snake extends Monster {
       constructor(options) {
           super(options);
       }
       
       bite(snake) {
           snake.health -= 10; // return it or not
       }
   }
   ```