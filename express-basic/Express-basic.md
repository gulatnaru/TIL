# Express API

## node HTTP

```js
const http = require("http");

const data = {
  ceo: 'john',
  director: 'neo',
};

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Happy Hacking");
    res.end();
  }

  if (req.url === "/api") { // 계속 if..?
    res.write(JSON.stringify(data));
    res.end()
  }
});

server.listen(3000);

console.log("Listening on port 3000");
```

이렇게 서버를 구성할 수 있지만, 라우팅이 늘어날수록 코드가 답이 없어진다.

## Express

### Let's go

이렇게 서버를 구성하는데 도움을 주는 프레임워크중 우리는 Express 를 사용한다.

```sh
$ mkdir express-demo
$ cd express-demo
$ pwd
/.../.../express-demo
$ npm init -y
$ npm i express
$ touch index.js
```

`express-demo/index.js`

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("Happy Hacking!");
});

app.get('/api/courses', (req, res) => {
  res.send({
    neo: 'JavaScript',
    john: 'Block Chain',
    tak: 'Machine Learning',
    chnage: 'Python dJango',
    zzulu: 'Ruby on Rails',
  })
});

app.listen(3000, () => console.log('Listening on port 3000...'));

// app.post();
// app.put();
// app.delete();
```

### Nodemon (node monitor)

계속 껐다키기(ctrl + c) 귀찮아!

```sh
$ node i -g nodemon
$ nodemon index.js
```

### 환경변수 Env var

호스팅 환경에서는 각각 맞는 포트가 제공된다. 이걸 무조건 3000으로 고정하는것은 옳지 않다. 알아서 환경변수 port 를 가져오도록 바꿔보자.

`express-demo/index.js`

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("Happy Hacking!");
});

app.get('/api/courses', (req, res) => {
  res.send({
    neo: 'JavaScript',
    john: 'Block Chain',
    tak: 'Machine Learning',
    chnage: 'Python dJango',
    zzulu: 'Ruby on Rails',
  })
});
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));
```



### Route Parameter

`express-demo/index.js`

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("Happy Hacking!!");
});

app.get('/api/courses', (req, res) => {
  res.send({
    neo: 'JavaScript',
    john: 'Block Chain',
    tak: 'Machine Learning',
    chnage: 'Python dJango',
    zzulu: 'Ruby on Rails',
  })
});

/* /api/courses/1 */
app.get('/api/courses/:id', (req, res) => {
  res.send(req.params.id);
});

/* /api/courses/2018/11 */
app.get('/api/courses/:year/:month', (req, res) => {
  res.send(req.params);
});

/* /api/posts/2018?q=js&sortBy=name&recommended=true */
app.get('/api/posts/:year', (req, res) => {
  res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```



## HTTP GET & POST

### HTTP GET req

사용자가 데이터를 받는(GET) 요청을 처리해 보자.

`express-demo/index.js`

```js
const express = require('express');
const app = express();

const courses = [
  { id: 1, name: 'HappyHacking' },
  { id: 2, name: 'Real Artist Ships' },
  { id: 3, name: 'See the invisible' },
];

app.get('/', (req, res) => {
  res.send("Happy Hacking!!");
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

/* /api/courses/1 */
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((course) => {
    return course.id === parseInt(req.params.id);
  });
  console.log(course);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```

좋다! 그런데 만약 `parseIng(req.params.id)` 가 3 이상이라면? 이럴 경우에는 error 핸들링을 해줘야 한다. 만약 `.find` 메서드가 원하는 자료를 찾지 못한다면?

```js
course   // undefined
!course  // false
!!course // true
```

```js
const express = require('express');
const app = express();

const courses = [
  { id: 1, name: 'HappyHacking' },
  { id: 2, name: 'Real Artist Ships' },
  { id: 3, name: 'See the invisible' },
];

app.get('/', (req, res) => {
  res.send("Happy Hacking!!");
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

/* /api/courses/1 */
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((course) => {
    return course.id === parseInt(req.params.id);
  });
  if (!course) res.status(404).send(`Course with given ID(${req.params.id}) is not found`);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```

개발자도구 - network - refresh (All)

### HTTP POST req

사용자가 데이터를 보내는(POST) 요청을 처리해 보자.

 ```js
const express = require('express');
const app = express();

app.use(express.json()); // middleware

const courses = [
  { id: 1, name: 'HappyHacking' },
  { id: 2, name: 'Real Artist Ships' },
  { id: 3, name: 'See the invisible' },
];

app.get('/', (req, res) => {
  res.send("Happy Hacking!!");
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

/* /api/courses/1 */
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((course) => {
    return course.id === parseInt(req.params.id);
  });
  if (!course) res.status(404).send(`Course with given ID(${req.params.id}) is not found`);
  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
 ```

현재는 DB 를 사용하고 있지 않기 때문에, id 를 직접 입력한다. db 를 사용하면 id 는 db가 자동으로 입력한다.

`app.use(express.json());` 는 현재는 이해가 가지 않지만, 미들웨어라는 걸 사용하는 중이다. 추후에 더 자세히 알아보자.

마지막으로 `courses` 에 input 을 push 하고, convention 으로 추가한 object 를 보내줘야 한다. 클라이언트가 새로운 resourse 를 알아야 할 필요가 있을때도 있기 때문이다. Get 요청은 테스트하기가 매우 쉽다. 브라우저에서 URL 로 접속하면 되기때문이다. 하지만 POST요청은 터미널 `$ curl` 유틸리티를 사용하거나, 크롬 확장프로그램 POSTman 을 사용하면 된다. Postman 을 설치하고 사용해 보자.



#### Input Validation (입력 유효성 검사)

보안을 위해서, 절대로 무슨일이 있어도 어떠한 상황에서라도! 클라이언트가 보내는 데이터를 믿어서는 안된다.(구글 설문지만 봐도..) 때문에 언제나 사용자가 보내는 요청을 검사해야한다.

```js
const express = require('express');
const app = express();

app.use(express.json()); // middleware

const courses = [
  { id: 1, name: 'HappyHacking' },
  { id: 2, name: 'Real Artist Ships' },
  { id: 3, name: 'See the invisible' },
];

app.get('/', (req, res) => {
  res.send("Happy Hacking!!");
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

/* /api/courses/1 */
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((course) => {
    return course.id === parseInt(req.params.id);
  });
  if (!course) res.status(404).send(`Course with given ID(${req.params.id}) is not found`);
  res.send(course);
});

app.post('/api/courses', (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    // 400 Bad request
    res.status(400).send('Name is required and should be minimum 3 characters');
    return; // 더이상 함수 실행을 하고싶지 않으므로 멈춘다.
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```

다음과 같이 사용자가 POST 하는 데이터를 검사할 수 있다. 하지만, 현실에서는 이것보다 훨씬 복잡한 구조의 요청과 object 를 사용하게 될 것이고, 모든 유효성 검사를 이렇게 처리할 수는 없다. 이런 유효성 검사를 쉽게 해주는 패키지를 받아보자. new request => post => `http://localhost:3000/api/courses` => raw => JSON => `{ "name": "yeap" }` => Send

#### JOI

https://www.npmjs.com/package/joi

```sh
$ pwd
/.../.../express-demo
$ npm i joi
```

`express-demo/index.js`

```js
const Joi = require('joi'); // import 의 결과물이 클래스기 때문에 대문자 J
const express = require('express');
const app = express();
...
```

convention: 클래스 return 은 대문자로 시작. 모든 `require` 문은 맨 위에 작성하여 의존성을 바로 파악할 수 있도록 한다.

우선 스키마를 정의해야 한다. 우리가 사용할 object 의 모양을 정의하는 것이다. 어떤 key-value 로 이루어져 있는지를 미리 확정하는 것이다.

`express-demo/index.js`

```js
...
app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);
  console.log("=========================");
  console.log(result);
  console.log("=========================");
  // if (!req.body.name || req.body.name.length < 3) {
  //   // 400 Bad request
  //   res.status(400).send('Name is required and should be minimum 3 characters');
  //   return; // 더이상 함수 실행을 하고싶지 않으므로 멈춘다.
  // }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
...
```

new request => post => `http://localhost:3000/api/courses` => raw => JSON => `{ "name": "yeap" }` => Send

```
=========================
{ error: null,
  value: { name: 'neo' },
  then: [Function: then],
  catch: [Function: catch] }
=========================
```

error 와 value 라는 프로퍼티가 존재한다. 이 경우에는 유효한 요청을 보냈기 때문에 `error: null` / `value: { name: 'neo' }` 라는 상태가 된다. 만약 잘못된 요청을 보내면 `error: ` 에 값이 들어간다.

```
=========================
{ error: 
   { ValidationError: child "name" fails because ["name" length must be at least 3 characters long]
    at ...
     isJoi: true,
     name: 'ValidationError',
     details: [ [Object] ],
     _object: { name: 'hi' },
     annotate: [Function] },
  value: { name: 'hi' },
  then: [Function: then],
  catch: [Function: catch] }
=========================

```

```js
...
app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
...
```

사용자가 받아보는 body 에 이제 error 가 들어온다. 하지만 너무 길기 때문에, 제일 중요한 `message` 만 보내면 되지 않을까?

```js
...
app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
...
```

`Joi` 로 입력데이터 유효성 검사를 쉽게하자!

## HTTP PATCH & DELETE

### HTTP PUT/PATCH req

사용자가 데이터를 수정하는(PATCH) 요청을 처리해 보자.

```js
...
app.patch("/api/courses/:id", (req, res) => {
  // courses 에서 id 를 찾는다.
  // 없으면 404 : Data not found

  // 아니면 입력 데이터를 검사한다.
  // 유효하지 않으면, 400 : Bad Request
  
  // Good to go, Update 한다.
  // 업데이트 된 course 를 리던한다.
});
...
```

처음부터 한단계 한단계씩 진행해 보자

```js
...
app.patch("/api/courses/:id", (req, res) => {
  
  // courses 에서 id 를 찾는다.
  const course = courses.find(course => course.id === parseInt(req.params.id));
 
  // 없으면 404 : Data not found
  if (!course) res.send(404).send(`The course with the given ID(${req.params.id}) was not found`);
    
  // 아니면 입력 데이터를 검사한다.  
  // 유효하지 않으면, 400 : Bad Request

    
  // Good to go, Update 한다.
  // 업데이트 된 course 를 리던한다.
});
...
```

validation 체크를 위해 또 스키마를 정의해야 한다. 그런데 만약 스키마가 엄청나게 길다면..? 매번 메서드마다 블럭안에 정의..? 일단은 진행하지만 나중에 리팩토링 해보자!

```js
...
app.patch("/api/courses/:id", (req, res) => {
  // courses 에서 id 를 찾는다.
  const course = courses.find(course => course.id === parseInt(req.params.id));
  // 없으면 404 : Data not found
  if (!course) res.send(404).send(`The course with the given ID(${req.params.id}) was not found`);
  
  // 아니면 입력 데이터를 검사한다.
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);   
  // 유효하지 않으면, 400 : Bad Request
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  // Good to go, Update 한다.
  // 업데이트 된 course 를 리던한다.
});
...
```

마지막으로 업데이트 로직을 수행!

```js
...
app.patch("/api/courses/:id", (req, res) => {
  
  // courses 에서 id 를 찾는다.
  const course = courses.find(course => course.id === parseInt(req.params.id));
 
  // 없으면 404 : Data not found
  if (!course) res.send(404).send(`The course with the given ID(${req.params.id}) was not found`);
    
  // 아니면 입력 데이터를 검사한다.
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);  
  
  // 유효하지 않으면, 400 : Bad Request
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
    
  // Good to go, Update 한다.
  
  course.name = req.body.name;
  
  // 업데이트 된 course 를 리던한다.
  res.send(course);
});
...
```

#### Refactoring

리팩토링을 해보자! 유효성검사 부분을 함수로 만들어서 재사용 하도록!

```js
... // 맨 아래
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...٩(ᐛ)و `));
```

```js
...
app.patch("/api/courses/:id", (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send(`The course with the given ID(${req.params.id}) was not found`);

  const result = validateCourse(req.body); // 함수 사용!

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});
...
```

비구조화(Destructuring) 을 사용해서 코드를 한번 더 리팩토링 해보자.

```js
...
app.patch("/api/courses/:id", (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send(`The course with the given ID(${req.params.id}) was not found`);

  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});
...
```

`app.post()` 도 리팩토링!

```js
...
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});
...
```

포스트 맨으로 `patch` 와 `post` 확인!

전체코드

` express-demo/index.js`

```js
const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json()); // middleware

const courses = [
  { id: 1, name: "HappyHacking" },
  { id: 2, name: "Real Artist Ships" },
  { id: 3, name: "See the invisible" }
];

app.get("/", (req, res) => {
  res.send("Happy Hacking!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

/* /api/courses/1 */
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(course => {
    return course.id === parseInt(req.params.id);
  });
  if (!course)
    res.status(404).send(`Course with given ID(${req.params.id}) is not found`);
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.patch("/api/courses/:id", (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send(`The course with the given ID(${req.params.id}) was not found`);

  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...٩(@ᐛ)و `));
```

### HTTP DELETE req

사용자가 데이터를 삭제하는(DELETE) 요청을 처리해 보자.

```js
...
app.delete("/api/courses/:id", (req, res) => {
  // courses 에서 id 를 찾는다.
  const course = courses.find(course => {
  return course.id === parseInt(req.params.id);
  });
  // 없으면 404: Data not found
  if (!course)
    res.status(404).send(`Course with given ID(${req.params.id}) is not found`);
  
  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
 
  // 삭제된 course 를 return
  res.send(course);
});
```

`arr.splice(index, count)` :  arr 에서 index 부터 count 개를 잘라서 return 하며, 원본에서는 해당 부분이 사라진다. 만약 index 가 넘어가면, arr 의 마지막 요소로 처리한다.

완성된것 처럼 보이지만, 실제 우리 코드에는 에러가 많다. 200 이 아닌 다른 status 코드를 보낼 때, 거기서 `app.METHOD` 의 수행이 멈춰야 하는데, 그 뒤를 수행해 버린다. 모두 `return`을 통해 고치자

```js
const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json()); // middleware

const courses = [
  { id: 1, name: "HappyHacking" },
  { id: 2, name: "Real Artist Ships" },
  { id: 3, name: "See the invisible" }
];

app.get("/", (req, res) => {
  res.send("Happy Hacking!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

/* /api/courses/1 */
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(course => {
    return course.id === parseInt(req.params.id);
  });
  if (!course) return res.status(404).send(`Course with given ID(${req.params.id}) is not found`);

  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.patch("/api/courses/:id", (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) return res.status(404).send(`The course with the given ID(${req.params.id}) was not found`);

  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(course => {
    return course.id === parseInt(req.params.id);
  });
  if (!course) return res.status(404).send(`Course with given ID(${req.params.id}) is not found`);

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...٩(@ᐛ)و `));

```

##### Exercise

`/api/courses/:id` url 을 공유하는 `GET`, `PATCH`, `DELETE` 들의 메서드에서 반복되는 부분이 있다. 한번 중복을 제거해보자!

```js
const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json()); // middleware

const courses = [
  { id: 1, name: "HappyHacking" },
  { id: 2, name: "Real Artist Ships" },
  { id: 3, name: "See the invisible" }
];

app.get("/", (req, res) => {
  res.send("Happy Hacking!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

/* /api/courses/1 */
app.get("/api/courses/:id", (req, res) => {
  const course = getCourse(courses, parseInt(req.params.id));
  if (!course) return res.status(404).send(`Course with given ID(${req.params.id}) is not found`);

  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.patch("/api/courses/:id", (req, res) => {
  const course = getCourse(courses, parseInt(req.params.id));
  if (!course) return res.status(404).send(`The course with the given ID(${req.params.id}) was not found`);

  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = getCourse(courses, parseInt(req.params.id));
  if (!course) return res.status(404).send(`Course with given ID(${req.params.id}) is not found`);

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}

function getCourse(courses, id){
  return courses.find(c => {
    return c.id === id
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...٩(@ᐛ)و `));
```

## Project

