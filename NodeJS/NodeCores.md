# Node.js Core preview

Node.js 개발에  있어서 가장 핵심적인 개념들과 키워드들을 알아보자.

## I. Installation and Recommended Tool Chain

### 1. Node.js 설치와 추천 tools

#### Node 설치 

* https://nodejs.org/en/download : LTS 를 설치하도록 하자.
* macOS 나 Linux 의 경우 `nvm` 이라는 버젼관리시스템을 사용하는것도 가능.

* Node 가 설치되면 npm(Node Package Manager) - Node 패키지들간의 의존성(dependencies)을 관리해주는 Tool 역시 함께 설치될 것이다.

#### Editor 설치

IDE
* VS Code(무료)
* WebStrom(유료)

Editor
* Atom
* Sublime

### 2. MongoDB 설치

* https://www.mongodb.com/download-center
* https://docs.mongodb.com/master/administration/install-community/
* macOS 나 Linux 의 경우 CLI 를 통한 설치 가능

### 3. Before we start

다음 명령어들을 통해 정상 설치 여부를 확인해 보자.
* `node -v`
* `npm -v`
* `mongod --version`

`npm` 을 통한 패키지 설치 테스트를 해보자.

* `npm install -g node-static`  (static-server 모듈 - global 설치)
* `static --version`

## II. Launching Node, Global and Process

### 1. Launching Node code

#### Node 콘솔 (REPL env) :  `$ node`

```js
$ node
> 1 + 1
2
> Math.random()
0.455546657430663
> setTimeout(() => { console.log('Hi')}, 5000)
...
Hi
> let add = (i, j) => i + j;
> add(10, 20)
30
> .exit (ctrl + d)
$ 
```

#### evaluate : `-e` 옵션 (터미널에서 바로 실행) `$ node -e '[js code here]'`

```sh
$ node -e "console.log('hack')"
hack
$ 
```

#### `.js` 파일 실행하기 `$ node [filename.js]`

```sh
$ node noexsist.js
module.js:550
    throw err;
    ^

Error: Cannot find module '/Users/ueh0/TIL/JS/NodeJS/Node_EDX/a.js'
    at Function.Module._resolveFilename (module.js:548:15)
    at Function.Module._load (module.js:475:25)
    at Function.Module.runMain (module.js:694:10)
    at startup (bootstrap_node.js:204:16)
    at bootstrap_node.js:625:3
    
```

Node.js 에서는 모든 파일이 모듈로 인식된다. 때문에 Cannot find module Error 발생!

### 2. Node Globals

JS 표준이 만들어지고 난 이후에 Node.js 가 등장했지만, Node.js 와 브라우저 JS 는 전역(global)상황에서 차이가 있다. 브라우저 JS 는 `window` object 가 있지만,  Node.js 에서는 `window` 가 존재하지 않는다. 하지만 새로운 전역 object/keyword 들을 제공한다. 하나하나 살펴보도록 하자.
* `global`
* `process`
* `module.exports` & `exports`

#### `global`

어떤 Node.js 스크립트나 프로그램에서 사용가능한 `global` 이라는 변수가 있다. 말그대로 전역 객체를 의미하며 `global.process`, `global.require`, `global.console` 처럼 여러 프로퍼티(propertiy) 를 갖는다.

`global` 객체의 최상위 프로퍼티들은 전부 `global.` 이라는 접두사를 떼고 사용 가능하다. `global.process` 와 `process` 는 동일하다. 또한 `GLOBAL` 과 `global` 역시 동일하나, `global` 을 사용하자.

아래가 `global` 의 주요한 프로퍼티들이다. (`console.log()` 와 `setTimeout()` 은 브라우저와 똑같이 동작한다. `process.require()` 과 `module.exports` 는 뒤에서 살펴보자.)
* `process`
* `require()`
* `module`, `module.exports`
* `console`, `console.log()`
* `setTimeout()`, `setInterval()`
* `__dirname`, `__filename`, `process.cwd()`
  * `__dirname` 은 `global` 해당 작성된 파일의 절대경로를 의미하고, 
  * `process.cwd()` 는 스크립트를 실행하는 프로세스의 절대경로를 return 한다
  *  만약, 프로그램을 다른 폴더에서 시작하면, `__dirname` 과 `process.cwd()` 가 다를 수 있다.
  * `__filename` 은 `__dirname` 과 유사하지만, 절대경로 뒤에 현재 실행되고있는 파일이나 스크립트의 이름까지를 의미한다.

### 3. Node process information

모든 작동중인 Node.js 스크립트들은 프로세스이다. 예를들어 `$ ps aux | grep 'node'` 명령어는, 컴퓨터가 실행중인 모든 Node.js 프로그램을 보여주게 된다. 편리하게도, 개발자들은 코드 안에 `process` 객체를 사용하여, 현재 작동중인 Node.js 프로세스의 정보를 뽑아볼 수 있다. ex) `node -e "console.log(process.pid)"` => eval 모드로 실행중인 Node.js 프로세스의 프로세스ID(pid) 를 출력.

####  `process` object

* `process.env` : 환경변수들

  ```js
  console.log(process.env);
  
  /* 출력 결과물
  {
    SHELL: '/bin/bash',
    USER: 'neo',
    HOME: '/Users/neo'
    ...
  }
  */
  ```

  shell 에 설정된 환경변수들을 아래와 같이 Node eval 을 통해 출력해 볼 수 있다.

  ```sh
  $ NODE_ENV=development node -e "console.log(process.enve.NODE_ENV)" 
  devlopment
  $ 
  ```

  NODE_ENV 는 일반적으로 다음과 같이 작성하는것이 규약이다. 몇몇 라이브러리나 프레임워크는 내장하고 있기도 하다(Express.js).
  * development : 개발자들의 디버깅을 위해서 에러메세지와 로그들이 모두 출력된다.
  * production : 민감한 에러메세지와 로그들을 감춘다.

* `argv` : 커맨드라인 인자들(arguments)

  ```sh
  $ node app.js arg1 arg2 arg3=val3
  ```

  * CLI 인자들에 접근하려면, `process.argv` 프로퍼티에 접근하면 배열로 인자들에 접근할 수 있다.

  ```js
  console.log(process.argv);
  
  /* 출력 결과물
  [
    'node', 
    'app.js', 
    'arg1',
    'arg2', 
    'arg3=val3'
  ]
  */
  ```

* `exit()` : 프로세스를 종료/삭제하는 메서드

  ```js
  process.exit();
  ```

  * 우리 app 에서 에러가 났다면, error 코드와 함께 프로세스를 종료하고자 할 것이다.

  ```js
  // 프로세스 실패
  process.exit(1);
  
  // 프로세스 실패 - 다른 코드
  process.exit(129);
  
  // 프로세스 성공적으로 종료
  process.exit(0);
  ```

  * 서로 다른 error 코드들을 통해 프로그램 실패의 종류를 파악할 수 있고, 개발자는 이를 통해 해당 실패에 따른 대응을 할 수있다.



## III. Node Modules

Node.js 는 모듈을 통해 app 을 빌드할 수 있다. `require` 를 통해 다른 모듈이나 파일에서 기능들을 import 하거나, `module.exports`를 통해 모듈에서 다른 파일이나 프로그램으로 export 할 수 있다.

`module.exports = ` 뒤에는 object, array, function 등 어떤것도 할당할 수 있다. 하지만 함수가 object / array 같은 자료구조보다 더 유연하기 때문에 가능하면 함수를 저장하는것이 좋다. (혹은 함수들을 모아놓은 object)

### 1. `module.exports` & `require`

* `module.exports`

  ```js
  // Filename: utility.js
  
  module.exports = function(numbersToSum=[]) {
      let sum = 0;
      numbersToSum.forEach( element => sum += element );
      return sum;
  }
  ```

* `require`

  ```js
  // Filename: servcie.js
  
  const sum = require('./utitlity.js');
  
  let accountA = 100
  let accountB = 300
  let accountC = 400
  
  let totalBalance = sum([accountA, accountB, accountC]);
  console.log(`${totalBalance} 의 잔액!`);
  ```

### 2. require usage patterns

`require()`은  로컬 node.js 파일뿐만 아니라 다른 타입의 모듈들을 불러올(import) 수 있다. 

| import 대상           | 예시 코드                                             |
| --------------------- | ----------------------------------------------------- |
| 코어 모듈/패키지      | `const filesystem = require('fs')`                    |
| npm 모듈/패키지       | `const express = require('express')`                  |
| node.js 싱글파일      | `const server = require('./boot/server.js')`          |
| JSON 타입 싱글파일    | `const dbConfig = require('./configs/database.json')` |
| 폴더(안의 `index.js`) | `const routes = require('./routes')`                  |

* 로컬파일 대상으로 `require()` 사용하기

  *  `.` 과 `..` 을 통한 상대경로 표시를 사용한다. 표시하지 않으면 아래 npm / 코어 모듈 리스트에서 찾기때문에 반드시 적어줘야 한다.
  * 가령 `const server = require('./boot/server.js')` 는 해당 코드가 쓰여진 파일기준 같은 디렉토리 아래의 `boot/` 디렉토리 아래의 `server.js` 를 import 한다는 뜻이다.

* npm 이나 코어 모듈/패키지를 대상으로 `require()` 사용하기.

  * `require("모듈/패키지이름")` 으로 사용한다. 경로지정이 필요하지 않다.
  * `const express = require('express')` 는 `express` 라는 이름의 패키지를 불러온다. 
  * 패키지가 만약 시스템 노드 코어 모듈들중에 있다면 / 현재 프로젝트 최상단에 위치한 `node_modules/` 디렉토리에 설치되어 있어야 한다. (`$ npm install 모듈이름`)

### 3. require caching 메커니즘

`require()` 는 파일이름이나 경로에 기반하여 결과물을 캐싱(caching) 한다. `require()`가 import 하는 node.js 파일에서, `module.exports` 에 할당되는 코드를 제외한 코드들은 프로세스 실행해서 딱 한번만 실행된다. 

```js
// Filename: utility.js

console.log("한번만 출력됩니다")

module.exports = function(numbersToSum=[]) {
    let sum = 0;
    numbersToSum.forEach( element => sum += element );
    return sum;
}

console.log("진짜루요")
```

```js
// Filename: servcie.js

const sum = require('./utitlity.js');

let accountA = 100
let accountB = 300
let accountC = 400

let totalBalance = sum([accountA, accountB, accountC]);
console.log(`${totalBalance} 의 잔액!`);
```

* `service.js` 실행결과

```sh
$ node service.js
한번만 출력됩니다
진짜루요
800 의 잔액!
$
```

여기까지는 예상 가능하다. 이번엔 아래와 같이 새로운 `app.js` 라는 파일을 만들어 실행시켜 보자.

```js
// Filiename: app.js

console.log('app.js 실행중..')

const sum = require('./utility.js');
require('./service.js'); // assign 없이도 실행됨.

let num1 = 10000
let num2 = 500000
let num3 = 1000000

let total = sum([num1, num2, num3])
```

`service.js` 역시 `utility.js` 를 불러오기 때문에 이 코드에서 `utility.js` 는 두 번 호출 되는것처럼 보인다. 실행결과는 어떨까?

* `app.js` 실행결과

```sh
$ node app.js
app.js 실행중..
한번만 출력됩니다
진짜루요
800 의 잔액!
15100000
```

보다시피 출력되는 string 들은 `module.exports` 할당에 들어가있지 않기에 두 번 출력되지 않는다. 왜그럴까?

이유는 node.js 가 호출(import)한 내용을 캐싱하기 때문이다! 두 번째 `require`, 즉 `require('./service.js')`가 실행될 때, `utility.js` 를 한번 더 실행하지 않는다. 이미 호출한 모듈의 결과값이 캐싱되어 있기 때문이다.

캐싱에 대한 자세한 내용이 중요한 것이 아니라, 원하지 않는 행동이나 충돌이 나지 않도록, `module.exports` 와 `require()` 가 어떻게 동작하는지만 머릿속에 기억하면 된다.

### 4. Node module export patterns

모듈에서 여러 기능들을 추출(export) 할 때 사용하는 코드 패턴들을 알아보자.

| 추출할 대상         | 코드                                                         |
| ------------------- | ------------------------------------------------------------ |
| 함수(function) 하나 | `module.exports = function(args) { ... }`                    |
| Object 하나         | `module.exports = { ... }`                                   |
| 함수 여러개         | `module.exports.methodA = function(args) { ... }` / `exports.methodA = function(args) { ... }` |
| Object 여러개       | `module.exports.objA = { ... }` / `exports.objA = { ... }`   |

* 한 개의 파일에서 여러개의 함수나 object 를 추출할 때, 즉 `module.exports.[name]`과 같은 코드에서는  `exports.[name] = { ... }` 처럼 `module.`을 생략할 수 있다.
* 하지만, *하나의 함수나 object 만을 호출할 경우에는 생략 불가능*하다. 즉`module.` 없이,  `exports = { … }` 는 틀린 문법이다.

* 코드를 통해 어떻게 여러개의 function 을 추출하는지 확인해 보자.

#### `module.exports` 없이 작성하기.

```js
// Filename: greetgings.js

const sayHelloInKorean = function() {
  return '안녕'
};

const sayHelloInEnglish = function() {
  return 'Hello'
};

const sayHelloInSwedish = function() {
  return 'Hej'
};

console.log(`Swedish: ${sayHelloInSwedish()} & English: ${sayHelloInEnglish()} & Korean: ${sayHelloInKorean()}`);
```

만약 50개의 언어에서의 인사를 추가하면..? 코드관리가 어려워지기 시작할 것이다. 또한 여기 있는 `sayHello...()` 함수들 역시 다른 파일에서는 동작하지 않을 것이다. 이 프로그램을 모듈화(modularize)하여보자.

#### `exports.methodA = function(args) { ... }` 로 메서드들 추출하기.

```js
// Filename: greetings.js

exports.sayHelloInKorean = function() {
  return '안녕'
};

exports.sayHelloInEnglish = function() {
  return 'Hello'
};

exports.sayHelloInSwedish = function() {
  return 'Hej'
};
```

#### `module.exports = { ... }` 을 통해 object 로 묶인 메서드들 추출하기.

```js
// Filename: greetings.js

module.exports = {
  sayHelloInKorean() {
    return '안녕'
  },

  sayHelloInSwedish() {
    return 'Hej'
  },

  sayHelloInEnglish() {
    return 'Hello'
  }
  
};
```

어떤 방식으로 export 하던지 결국 `module.exports` 는 3개의 인사말을 건내는 함수들을 **object 로 제공**하게 된다.

#### `require()` 로 import 하기.

새 파일 `print-greetings.js` 에 `greetings.js` 를 import 해보자. 이 경우에는 object 한개가 될 것이다.

```js
// Filename:  pring-greetings.js
const greetings = require('./greetings.js')

console.log(
    `Swedish: ${greetings.sayHelloInSwedish()} 
	& English: ${greetings.sayHelloInEnglish()} 
	& Korean: ${greetings.sayHelloInKorean()}`
);
```




## IV. Core Modules

Node.js 는 Core(핵심) 모듈들과 함께 설치된다. Core 모듈들은 low-level 기능들과 헬퍼 메서드들을 제공한다. 파일시스템, 네트워킹, 이진데이터, 데이터 스트림, 외부 프로세스 관리, 쿼리 문자열 파싱, 파일 경로, URL 등을 포함하며, HTTP(S) agents/clients 와 서버 생성같은 유용한 태스크들을 처리 가능하다.

해당 모듈들은 다음과 같이 경로지정 없이 import 할 수 있으며, npm 으로 설치하거나 따로 다운로드 받을 필요가 없다.

```js
const http = require('http'); // http 를 다른 모듈 이름으로 교체 가능.
```

이중에서 우리가 살펴보고자 하는 핵심 모듈은 크게 2가지로 `fs`(filesystem) 과 `path`(경로) 모듈이다.

* `fs` 모듈같은 경우에, 다. 브라우저는 환경이 완전히 다르기 때문에 이런 작업들은 브라우저 JS 에서는 불가능하다. 

* `path` 모듈은 굉장히 많이 사용하게 될 것이다. `path` 는 플랫폼간(cross-platform) 어플리케이션이나 코드를 작성할때 사용하게 된다. 왜냐하면 운영체제마다 디렉토리 구분슬래시(window: `\`, unix-linux: `/`)가 다른데, `path` 를 활용해 내 디렉토리 경로를 자동으로 변환할 수 있기 때문이다.

### 2. `fs` module

`fs` 모듈은 파일시스템 명령들을 처리한다. 파일을 생성하고 읽고 쓰는등의 작업을 수행할 수 있으며, 동기/비동기 로 처리되는 메서드들로 구성되어 있다.

* `fs.readFile()` : 파일을 비동기적으로 읽는다.
* `fs.writeFile()` : 파일에 비동기적으로 데이터를 쓴다.

#### Node.js 에서 파일 읽고 쓰기

`fs` 모듈에는 파일을 읽기 위해 동기/비동기적으로 처리하는 두가지 종류의 메서드가 있다. 이벤트 루프를 막지 않도록 대부분의 경우에 비동기적인(async) 메서드 사용을 추천한다.

* 파일 읽기

  ```js
  const fs = require('fs');
  const path = requrie('path');
   
  fs.readFile(
      path.join(__dirname, '/data/customers.csv'), 
      { encoding: 'utf-8' },
      function (err, data) {
          if (err) return console.error(err);
          console.log(data);
      }
  );
  ```

* 파일 쓰기

  ```js
  const fs = require('fs');
  
  console.log('Start Writing..');
  fs.writeFile('message.txt', 'HappyHacking', function (err) {
      			if (err) return console.error(err);
  			    console.log('Writing is Done');
  });
  ```

* [Full Documentation](http://nodejs.org/api/fs.html) 

### 3. `path` module

`fs` 에서 파일 읽기 코드에 잠깐 등장했지만, `path` 모듈은 파일과 폴더의 경로를 처리한다. 우리 node.js 코드가 다른 플랫폼/OS 에서 작업하는 동료들의 컴퓨터에서도 잘 동작하도록 하는데 많이 사용된다.

#### `path.join()`

Windows 에서는 경로가 `\`(역슬래시-한국 Windows 에서는 `￦`원화마크)로 구분된다. 반면 Unix(MacOS) 나 Linux 에서는 경로를 `/` (정슬래시) 로 구문해서, 개발/배포하는 컴퓨터의 OS 에 따라 경로관련 문제가 생길 수 있다.

`path.join()` 메서드는 컴퓨터 OS 와 독립적으로 경로를 생성한다. 때문에 하드코딩(직접 입력) 이 아닌 `path.join()` 메서드를 사용해야 한다. `path.join()` 을 사용해 `app/server.js` 를 표시해 보자.

```js
const path = require('path');
const server = require(path.join('app', 'server.js'));
```

또한 `path.join()` 과 `__dirname` 을 사용해 상대경로가 아닌 절대경로를 생성할 수 있다.

```js
const path = require('path');
const server = require(path.join(__dirname, 'app', 'server.js'));
```

* [Full Documentaion](https://nodejs.org/api/path.html)

## V. Event Emitters (optional)

### Event Emitter(emit: 발행하다) 이해하기

이벤트 이미터는 observer pattern([옵저버 패턴](https://ko.wikipedia.org/wiki/%EC%98%B5%EC%84%9C%EB%B2%84_%ED%8C%A8%ED%84%B4) - 디자인 패턴중 하나로 발행-구독 패턴이라고도 한다.)을 구현하기 위한 node.js 핵심 모듈이다. 옵저버 패턴은 observer, event, event emitter 로 구성되어 있다.

옵저버 패턴의 흐름은 다음과 같다.

1. `const EventEmitter = require('events')`
2. `class` 키워드로 클래스를 정의한다.
3. 정의한 클래스가 `extends` 키워드로 EventEmitter 클래스를 상속한다.
4. `new` 키워드로 인스턴스 생성.
5. `.on(eventName, eventHandler)` 를 통해 옵저버(a.k.a **이벤트 리스너**) 생성.
6. `emit(eventName)` 메서드로 이벤트가 발행되고, 옵저버 안의 이벤트 핸들러(함수)가 실행.

#### 단일 이벤트 트리거

* JS code

    ```js
    // Filename: simple-event.js
    const EventEmitter = require('events');

    class Job extends EventEmitter {}
    const job = new Job();

    job.on('warning', (season) => {
        console.log(`${season} is coming right now (${new Date()})`);
    });

    job.emit('warning', 'winter'); 
    job.removeAllListeners(); // job.on() 을 통해 생성된 모든 옵저버(이벤트 리스너) 삭제

    job.emit('warning', 'winter'); // 동작하지 않는다.
    ```

* 출력

  ```sh
  $ node simple-event.js
  winter is coming right now (Wed Oct 17 2018 00:14:36 GMT+0900 (KST))
  $
  ```

#### 여러개의 이벤트 트리거

* JS code

  ```js
  // Filename: multi-events.js
  const EventEmitter = require('events');
  
  class Emitter extends EventEmitter {}
  emitter = new Emitter();
  
  emitter.on('knock', () => {
      console.log('누구세요?');
  });
  
  emitter.on('knock', () => {
      console.log('저리가세요!');
  });
  
  emitter.emit('knock');
  emitter.emit('knock');
  ```

* 출력

  ```sh
  $ node multi-events.js
  누구세요?
  저리가세요!
  누구세요?
  저리가세요!
  $
  ```

#### 옵저버 코드를 한번만 실행

`emitter.once(evnetName, eventHandler)` 는 특정 이벤트가 몇번 발생하던, 옵저버 코드를 단 한번만 실행하게 한다.

* JS code

  ```js
  // Filename: event-once.js
  const EventEmitter = require('events');
  
  class Emitter extends EventEmitter {}
  emitter = new Emitter();
  
  emitter.once('knock', () => {
      console.log('누구세요?');
  });
  
  emitter.emit('knock');
  emitter.emit('knock'); // 동작하지 않는다.
  ```

* 출력

  ```js
  누구세요?
  ```

### 2.Modular events

옵저버 패턴은 코드를 모듈화 할때도 사용된다. 일반적으로 이벤트 이미터 클래스 정의와 이벤트 발행을 모듈과 분리하되, 옵저버(이벤트 리스너)를 메인 프로그램에서 정의할 수 있도록 하는게 일반적인 사용법이다. 이렇게 하면 모듈 코드를 바꾸지 않고 모듈의 행동을 바꿀 수 있다.

`job.js` 에서, 1초 후에 `done` 이벤트를 발행하는 일반적인 `job` 모듈을 생성한다. 하지만 `weekly.js` 에서 옵저버의 이벤트 핸들러를 우리가 커스터마이즈하여 `done` 이벤트가 발동되었을 때 옵저버가 할일을 지정할 수 있다.

* `job.js` : 일반적인 이벤트 이미터를 export

  ```js
  // Filename: job.js
  const EventEmitter = require('events');
  
  class Job extends EventEmitter {
    constructor(options) {
      super(options);
      this.on('start', () => {
        this.process();
      })
    }
      
    process() {
       setTimeout(()=>{
        // job 의 작업 지연을 대행 - 비동기!
        this.emit('done', { completed: new Date() })
      }, 1000)
    }
  }
  
  module.exports = Job;
  ```

  * 위 코드에서 `'start'` 라는 이벤트 트리거를 가진 옵저버는, 발동되면 `process()` 라는 함수를 실행한다.
  * `process()` 함수는 1초 후에 `'done'` 이라는 트리거를 가진 옵저버를 발동하게 되는데, 문제는 코드 어디에도 `.on('done', eventHandler)` 의 형식의 코드가 없다.
  * 위에서 말한대로 메인 프로그램에서 `'done'` 트리거를 가진 옵저버를 생성할 수 있는 것이다!

* `weekly.js` : `job.js` 를 import 하여 옵저버를 작성

  ```js
  // Filename: weekly.js
  const job = require('./job.js'); // import Job class
  const job = new Job();
  
  jop.on('done', (details) => {
      console.log( `Weekly todo was completed at ${details.completed}`)
  });
  
  job.emit('start');
  ```

`weekly.js` 를 실행하면, 직접 작성한 트리거 `done` 에 대한 이벤트가 실행된다. 이렇게 하면, `job.js` 에는 직접 `done` 트리거에 대한 이벤트를 작성할 필요가 없기에  유연한 상태로 유지된다. 모듈 `job.js` 의 소비자, 즉 `weekly.js` 의 작성자는 `done` 이벤트를 원하는대로 커스터마이즈 할 수 있다. 

## VI. HTTP Client with Core http

### 1. `http` 핵심모듈 로 HTTP 클라이언트 구현하기

#### HTTP 클라이언트 & Core `http`

웹 개발에서 다른 웹 서비스에게 HTTP 요청을 보낼일이 종종 있고, node.js 는 핵심모듈로 이러한 요청을 만드는 `http`모듈이 있다. 이 모듈은 이벤트 이미터 패턴을 사용한다. 

요청(request)을 보내면 전체 응답(response)의 body 데이터를, 한 줄씩 작은 덩어리(chunk)로 쪼개서 `data` 이벤트 실행동안 받게 된다. 

주로 용량이 큰 데이터일 경우에는 수신한 데이터를 바로바로 처리(ex: 브라우저 렌더링)하고, 혹은 JSON 형식 데이터일 경우에는 버퍼 변수에 저장한 이후 모든 데이터가 받아졌을 때 합쳐서 처리한다.

* `http-get-no-buff.js` (버퍼 없음)

  ```js
  // Filename: http-get-no-buff.js
  const http = require('http');
  const url = 'http://www.nodejs.org';
  
  http.get(url, (response) => {
    let chunkCount = 0;
    response.on('data', (chunk) => {
      chunkCount++;
      console.log(chunk.toString('utf8'))
    });
    response.on('end', () => {
      console.log(`response has ended with ${chunkCount} chunks`);
    });
      response.on('error', (error) => {
          // 서버에 도착했으나, 내부적으로 일어난 error 에 대한 트리거.
          console.log(`Got error: ${error.message}`);
      })
  }).on('error', (error) => {
    // http.get 이 도착하지 못하고 일어난 error 에 대한 트리거
    console.log(`Got error: ${error.message}`);
  });
  ```

  결과값은 `url` 에 담긴 주소의 HTML 문서다. 눈 깜짝할 새에 출력 되어 인식하기 어렵지만, 요청이  발생한 순간부터 순차적으로 도착한다. 

  `chunkCount` 가 몇개의 덩어리가 도착했는지 저장한 변수이다. 인터넷 상태에 따라 덩어리의 갯수 가 달라질 수 있다.

  버퍼를 쓰지 않았기 때문에 응답이 모두 도착하고 출력되는 것이 아니다! 만약 응답 전체를 기다리고 싶다면, 버퍼 변수를 생성하고, 덩어리(chunks) 들을 저장하면 된다.

*  `http-get.js` (버퍼 있음)

  ```js
  // Filename: http-get.js
  const http = require('http');
  const url = 'http://www.google.com';
  
  http.get(url, (response) => {
    let buff= ''; // 버퍼변수
    response.on('data', (chunk) => {
      buff += chunk;
    });
    response.on('end', () => {
      console.log(buff);
    })
  }).on('error', (error) => {
    console.log(`Got error: ${error.message}`);
  });
  ```

  이번에도 결과값은 똑같지만, 이번에는 요청에 대한 모든 응답이 모두 버퍼변수(`buff`)에 저장되고,  응답이 모두 끝나고 난 이후에 출력되게 된다. 역시나 너무빠른 속도라 알아채기 힘들지만, 응답이 10mb 를 넘어가는 용량이라면, 차이는 명확하게 보일 것이다.

### 2. JSON 파싱으로 HTTP 클라이언트 구현하기

#### HTTP Clinet for JSON

JSON(JavaScript Object Notation)을 처리하려면, 반드시 전체 응답을 기다려야 한다. 그렇지 않으면 응답이 미완성이게 될 경우, JSON 형식이 유효하지 않을 것이기 때문이다. 때문에 JSON 파싱을 위해 버퍼변수를 사용해서 JSON 을 받아 분석(parsing)해 보자.

```js
// Filename: http-json-get.js

const https = require('https');
const url = "https://jsonplaceholder.typicode.com/posts/"

https.get(url, (response) => {
    let buff = '';
    response.on('data', (chunk) => {
        buff += chunk;
    });
    response.on('end', () => {
        try{
	        const parseData = JSON.parse(buff);
    	    console.log(parseData);
        } catch (e) {
            console.error(e.mesasge);
        }
    }).on('error', (error) => {
        console.error(`Got error: ${error.message}`);
    });
```

응답으로 도착한 결과값과 해당 url 을 브라우저로 접속한 결과가 같게 보일수 있지만, `buff` 에 들어있는 데이터는 단순한 String 이고, `parseData` 에 들어있는 데이터는 object 이다. JSON 파싱을 할 경우, `try`/`catch` 문을 사용하여, 응답으로 도착한 JSON 의 형식이 잘못되었을 경우 발생할 에러를 처리해야 한다.

### 3. POST 요청으로 HTTP 클라이언트 구현하기

#### HTTP client POST 요청

지금까지는 우리가 보낸 요청은 GET 요청이라 불리는, 서버에서 데이터를 받고(get)자 하는 요청이었다. GET 요청이 서버에서 데이터를 받기위한 요청이라면, 서버에 데이터를 보낼 수 있는 POST 요청 또한 있다. POST 요청은 일반적으로 데이터를 업로드 하거나 데이터를 서버에 보내고, 서버가 이를 처리한 이후 다시 돌려받고자 할때 사용한다.

`http` 모듈은 보내는 요청의 종류를 설정할 수 있다. 아래 코드는 `options` object 를 사용하여 POST 요청에 보낼 데이터와 목적지를 설정하여 데이터를 서버에 전송하고, 다시 받은 데이터를 출력한다.

```js
// Filename: http-post.js
const http = require('http');
// JSON 을 String 으로 만든다.
const postData = JSON.stringify({ name: 'neo', birthday: '0712' });

const options = {
  hostname: 'mockbin.com',
  port: 80,
  path: '/request',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  }),
  res.on('end', () => {
    console.log('No more data in response.')
  })
}).on('error', (error) => {
  console.error(`problem with request: ${error.message}`);
});

// reqest 가 가지고 있는 methods
req.write(postData);
req.end();
```

요청(res)으로 `mockbin.com` 에 보낸 데이터가 추가로 더 많은 정보를 담아 응답(req)으로 돌아온 것을 확인할 수 있다.

## VII. HTTP Server with Core `http`

### 1. HTTP 서버 구현하기

#### `http` 모듈과 HTTP 서버

Node.js 는 매우 여러 방면으로 사용될 수 있지만, 가장 주된 목적은 웹 어플리케이션을 구축하는 것이다. Node.js는 비동기 처리 WebApp 이 성행하면서 함께 전성기를 누리고 있고, 빌트인 모듈로 `net` 과 `http` 등을 가지고 있다. Node 는 효율적이며 빠르게 웹 서버를 빌드하는데 탁월하다.

아래 코드는 가장 핵심적인 Hello World 예시이다. 서버 object 를 만들고 request handler(`req` 와 `res` 변수를 가지는 function) 를 정의하고, 요청한 클라이언트에게 다시 데이터를 보내는 모든 일들을 하게 될 것이다.

```js
// Filename: server.js
const http = require('http');
const port = 3000;

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(port);

console.log(`Server is running @ http://localhost:${port}`)
```

한줄 한줄 뜯어보도록 하자.

1. 서버 구현을 위한 `http` 모듈 불러오기

   ```js
   const http = require('http');
   ```

2. 서버 생성 - `req` 와 `res` 를 처리할 callback 함수

   ```js
   http.createServer((req, res) => {
   ```

3. 응답 헤더에 담을 HTTP 상태코드와 내용

   ```js
       res.writeHead(200, {'Content-Type': 'text/plain'});
   ```

4. `Hello World` 와 new line 문자를 출력

   ```js
   	res.end('Hello World\n');
   ```

   `req` 와 `res` 인자들은 HTTP 요청과 응답에 대한 모든 정보를 각각 담고있다.

5. 서버가 `port` 번호로 들어오는 요청을 기다리고(listen), 요청이 들어오면 허용.

   ```
   }).listen(port);
   ```

---

`node server.js` 를 통해 서버를 실행하고, 브라우저로 `localhost:3000` 으로 접속하면, Hello World 를 볼 수 있다. 서버가 실행되면 터미널이 계속해서 프로세스를 실행중이므로 새로운 명령어를 받을 수 없다. `Ctrl - c` 로 서버(프로세스)를 종료할 수 있다.

매번 요청이 들어올 때마다, `createServer` 콜백 함수가 실행된다.

`curl` 메서드를 통해서도 우리 로컬호스트 서버에 요청을 보낼 수 있다.

```sh
$ curl http://localhost:3000
Hello World
$ curl -i http://localhost:3000
HTTP/1.1 200 OK
Content-Type: text/plain
Date: Thu, 18 Oct 2018 00:38:12 GMT
Connection: keep-alive
Transfer-Encoding: chunked

Hello World
$
```

만약 `server.js` 의 내용을 바꾸고 요청을 보내면 바뀐 내용이 반영되지 않는다. 서버가 한번 실행되면 메모리에 해당 코드가 올라가 있기 때문에, 코드를 수정하면 서버를 껐다 켜야 한다.

`node-dev` 모듈을 npm 을 통해 설치하면, 코드 변경시 자동으로 서버를 갱신한다.

```sh
$ npm i -g node-dev
```

npm 에 대해서는 뒤에서 살펴볼 예정이다.

```sh
$ node-dev server.js
```

이제 `server.js` 코드가 수정되면 자동으로 서버가 갱신될 것이다.

### 2. 서버 요청 이해하기

#### HTTP Request (Server side)

HTTP 서버 request object(클라이언트 request object 와 혼동하지 말자!) 는 서버 입장에서 받게되는 요청에 대한 모든 정보를 가지고 있다. 예를들어 헤더, URL, HTTP 메서드 이름, 전송된 body(payload) 등.. 아래에 주된 특성들(main properties)을 살펴보자.

| `request` / `req` property | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| `request.headers`          | 들어오는 요청의 헤더 내용(Connection, Host, Auth, [etc](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)) |
| `request.method`           | 클라이언트가 보낸 요청 방식(HTTP request method) - **GET, POST, PUT, DELETE**, OPTIONS, HEAD,etc |
| `request.url`              | 들어오는 요청 뒤에 정의된 URL (`/posts`, `/posts/1`, `accounts`, etc) |

```js
// Filename: server.js
const http = require('http');
const port = 3000;

http.createServer((req, res) => {
  console.log('헤더: ', req.headers);
  console.log('HTTP 메서드: ', req.method);
  console.log('URL: ', req.url);

  if (req.method === 'POST') {
    let buff = '';
    req.on('data', (chunk) => {
      buff += chunk;
    });
    req.on('end', () => {
      if (buff === '') {
        console.log('No payloads.. Empty POST request');
        res.end('\nYou sent nothing..\n');
      } else {
        console.log('========== Start accepted Body ==========');
        console.log(`Body: ${buff}`);
        console.log( '=========== End accepted Body ===========');
        res.end('\nBody Accepted!!\n');
      }
    })
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('\nHello World\n');
  }
}).listen(port);

console.log(`Server is running @ http://localhost:${port}`);
```

* Terminal 1

  ```sh
  $ node-dev server.js
  Server is running @ http://localhost:3000
  ```

* Terminal 2

  ```sh
  $ curl localhost:3000
  
  Hello World # check Terminal 1
  
  $ curl -X POST localhost:3000
  
  You sent nothing.. # check Terminal 1
  
  $ curl -X POST -d 'HappyHacking' localhost:3000
  
  Body Accepted! # check Terminal 1
  
  $
  ```

### 3. 서버 응답 이해하기

#### HTTP Response

HTTP 응답은 Node.js 서버가 클라이언트에게 되돌려 보낼 수 있게 한다.

`response.writeHead`는 HTTP 상태코드를 설정하고, 헤더를 생성할 수 있게 해주는 메서드다. 가장 흔한 두 가지 HTTP 헤더들은 `Content-Type` 과 `Content-Length` 이다.

```js
response.writeHead(200, {
    'Content-Type': 'text/plain', // 'text/html' 처럼 다른 종류도 많다.
    'Content-Length': body.length
})
```

응답의 본문(body/payload)은 `write()` 메서드로 응답에 데이터를 추가한다. 이전에 봤던 `end()` 메서드는 인자로 추가된 내용을 마지막으로 응답을 종료하는 메서드이다. HTTP 상태코드는 적절하게 직접 설정할 수 있다.(2xx, 4xx, 5xx, [etc](https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C)..)

아래 코드는 동작하지만, 대략 어떻게 구성될 수 있는지 표현한 코드다.

```js
const http = require('http');
const port = 3000;

http.createServer((req, res) => {
    res.writeHead(404, {
        'Content-Type': 'text/plain',
        'Content-Length': body.length
    });
    res.statusCode = 200;
    res.write('Body Data!');
    res.end('End of response\n');
}).listen(port);

console.log(`Server is running @ http://localhost:${port}`);
```



## VIII. npm Basics

### 1. npm으로 작업하기 &  npm 기초

#### npm 이 뭐죠?

npm 은 node.js 플랫폼과 함께 설치되는 패키지 매니저(**N**ode **P**ackage **M**anager)다. npm 은 3가지 구성요소로 이루어져 있다.

* 웹 사이트 : https://www.npmjs.com
* Command Line Tool : `$ npm`
* 레지스트리 : Public & Private

npm 커맨드라인 툴은 Node 용 패키지 매니저다. Node 설치이후 따로 설치할 필요가 없다.

레지스트리는 패키지(모듈)들이 저장되어있는 곳이다. 개발자들은 패키지들을 npm 레지스트리에서 다운받고, 자신들의 패키지를 레지스트리에 배포한다.

웹 사이트는 웹기반의 인터페이스와 모듈검색 및 여러 정보&문서를 제공한다.

#### npm 으로 Node.js 모듈 설치하기

` npm` 의 작동방법은 git 이 현재 프로젝트를 찾기위해 working tree 를 가로지르는 것과 비슷하다. 초심자들은, 이것만 기억하자. `$ npm install [모듈 이름]` 을 통해 로컬(내프로젝트)에 모듈 패키지를 설치하려면, `package.json` 파일과 `node_modules` 폴더가 필요하다!

예를 들어, `superagent` 라는 패키지를 설치한다면,

1. *(이미 `$ npm init` 을 통해 `package.json` 이 있다면 이부분은 패스해도 된다.) 완전히 새로운 프로젝트라면, npm 초기화(**init**alize)를 해야한다.  `package.json` 파일을 만들기 위해 프로젝트 디렉토리에서 `$ npm init` => `Enter * 10번` 혹은 `Enter * 10번` 을 생략하려면 `$ npm init -y` 을 입력한다. 
2. 프로젝트 최상단(root) 디렉토리에서, `$ npm install superagent` (줄여서 `$ npm i superagent` 도 가능)
   1. `$ cat package.json` 을 통해 설치된 모듈 패키지들 목록 확인
   2. `$ ls node_modules/` 를 통해 저장-설치된 모듈 패키지들 실제 확인
3. 설치가 완료되었다면 import 하고자 하는 파일에서 `const superagent = require('superagent')` 와 같이 import

npm 의 가장 훌륭한 점은, **로컬에서** 모든 의존성들(dependencies)을 관리한다는 점이다. (만약 모듈 A 가 모듈 B v2.0 에 의존하고, 모듈 C 가 모듈 B v3.0 을 사용하는데, 모듈 B가 v2.0 과 v3.0 이 차이가 엄청날 때, 모듈 A와 C 가 각자 다른 버젼의 모듈 B를 가진다.) Ruby(`gem`, `bundler`) 나 다른 플랫폼에서는 모듈이 로컬설치가 아닌 글로벌 설치가 기본(default)이라는 점과 비교했을 때, npm의 방식이 더 우월하다고 할 수 있다.

Git 을 사용할때, 현재 프로젝트가 다른 개발자들이 app 빌드에 사용할 **모듈을 만드는 거라면,** `node_modules/` 는 git 에 **포함하지 않는것이 옳다.** 반면 현재 프로젝트가 **배포할 app 이라면**, 배포환경에서 혹시모를 모듈간 버젼차이를 방지하기위해 `node_modules/` 는 git 에 **포함하는 것이 옳다.**

#### `$ npm install` 소개

`$ npm i` 를 통해 모듈을 설치하는 데에는 두가지 방법이 있다.

1. Locally(현재 프로젝트에만 사용 가능) : 
   * 프로젝트에서 `require()`로 사용하는 거의 모든 의존 모듈들. (ex: `express`, `request`, `hapi` 등..)
   * 이렇게 설치할 경우, 프로젝트의 `node_modules/` 안에 설치된다.
   * `$ npm install 모듈이름` / `$ npm i 모듈이름`
2. Globally(사용하는 컴퓨터 어디에서든 사용 가능)
   * (거의 보통) 커맨드라인 툴(CLI)에서 사용할 모듈들. (ex: `mocha`, `grunt`, `slc`). 
   * 이렇게 설치하면, 보통 `/usr/local/` 아래의 `node`를 포함하는 디렉토리에 설치된다.
   * `$ npm install -g 모듈이름` / `$ npm i -g 모듈이름` 

몇몇 프레임워크는 CLI 툴을 제공하지만, 거의 대부분 local 에 설치한다. `express` 같은 프레임워크는 `-g` 로 설치하지 말자!

#### 패키지 설치하기 

npm을 통해 모듈을 설치할 때 명령어들간의 차이를 알아보자. `-g` 옵션이 없으면 전부 로컬설치다.

* 기본 설치

  ```sh
  $ npm install express # npm v.5 이상부터는 npm i express --save 로 동작
  ```

* 모듈 삭제

  ```sh
  $ npm uninstall express
  ```

  ```sh
  $ npm rm express # rm, r, un, remove 모두 uninstall 동의어
  ```

* 정확한 버전 명시

  ```sh
  $ npm install express@4.2.0
  ```

  ```sh
  $ npm install express@4 # 4 ver 중 최신을 설치
  ```

* 가장 마지막 버전 설치(이미 해당 모듈이 있지만, 최신으로 업그레이드 하려고 할때 유용하다.)

  ```sh
  $ npm install express@latest
  ```

* `package.json` 에 의존성(dependencies) 명시하며 설치 

  ```sh
  $ npm install express --save # npm v.5 이상부터는 기본으로 적용, -S 와 동일
  ```

* 개발 환경에서 동작하도록 `package.json` 에 의존성 명시. 배포환경(production) 에서는 설치되지 않는다.

  ```sh
  $ npm install express --save-dev # -D 와 동일
  ```

* 정확한 버전 설치하기

  `$ npm i express` 를 실행하고 `package.json` 을 확인해보자.

  ```sh
  $ npm i express
  ....installing....
  $ cat package.json
  {
    "name": "my_project",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "express": "^4.16.4" <<< ??
    }
  }
  ```

  `"dependencies" : { "express": "^4.16.4" }` 에서 express 버전 앞에`^` (caret symbol) 이 붙어있는것을 확인할 수 있다. npm 에서는 `^` 심볼을 semver operator 라고 한다.

  ##### semver (Sementic Version)

  Sementic Versioning 은 버전 형식에 의미를 부여하여 **좀 더 체계적인 버전관리를 위한 제안**이다. 배포 정책이나 시기에 따라 버전이 매겨지거나, 의미 없이 버전이 올라가는 것을 지양하며, 버저닝에 명확한 의미를 부여한다. 

  핵심은 다음과 같다

  * 버전의 형식은 [Major].[Minor].[Patch] 형식
  * 이전 버전과 호환되지 않는 API 변경은 Major 버전 증가 (기존 코드와 충돌)
  * 이전 버전과 호환되면서 기능의 변경 및 추가는 Minor 버전 증가 (아주 가끔 기존 코드와 충돌하나 보통 호환)
  * 버그 수정은 Patch 버전 증가 (절대 충돌해서는 안되..나 semver 가 제안이기 때문에 강제성 없음)

  사용자는 Sementic Versioning 을 따르는 모듈이라면, 숫자만 보고 버전 업데이트를 짐작할 수 있다.

  `^` 가 앞에 붙은 버젼은 호환 가능한 상위 버전이 있으면 해당버전을 가져오라는 의미이다. 마냥 좋은것 같지만, 어플리케이션을 빌드할때는 나중에 의존성간에 문제가 생길 위험도 존재한다. 이렇게 `^` 를 통해 버전에 어느정도 자율성을 부여하지 않고, 정확하게 해당 버전만 사용하도록 할 수 있다.

  ```sh
  $ npm install express --exact # -E 와 동일
  ```

* 글로벌 설치 및 npm 업그레이드

  ```sh
  $ npm install grunt --global # -g 와 동일
  ```

  ```sh
  $ npm install -g npm@latest
  ```

* 설치된 모듈 모두 보기

  ```sh
  $ npm ls # 프로젝트 디렉토리 로컬설치 모듈 리스팅
  $ npm ls -g # 글로벌 모듈 리스팅
  ```

### 2. `package.json` 이해하기

`package.json` 파일은 프로젝트 매니페스트(manifest) 파일이다. `package.json` 에는 설명, 라이센스, 위치, 의존성, 빌드-런칭-실행에 대한 메타데이터(meta data: 데이터에 대한 데이터)를 담고 있다.

```json
{
  "name": "my-cool-app",
  "version": "0.1.0",
  "description": "A great new application",
  "main": "server.js",
  "dependencies": {
    "express": "~4.2.0",
    "ws": "~0.4.25"
  },
  "devDependencies": {
    "grunt": "~0.4.0"
  }
}
```

거의 모든 경우에, 어떤 모듈이 필요한지, 어떤 파일과 명령들이 실행되어야 하는지와 같은 정보들을 `package.json` 을 보기만 해도 알 수 있다. npm 모듈들을 위해 `package.json` 은 반드시 필요하다.

#### 주요 항목

Node 에서 모듈 패키징은 `package.json` 을 통해 완료된다. 우리가 설정할 수 있는 옵션들을 살펴보자.

* name
* version number
* dependencies
* license
* scripts
* etc..

#### `package.json` 생성하기

`package.json`을 생성하기 위해서는 `$ npm init` 명령어를 프로젝트 최상단에서 입력하면 된다.

```sh
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (프로젝트 디렉토리 이름)
```

모든 설정들을 기본값으로 두려면 `$ npm init -y` 로 한번에 모두 설정 가능하다.

##### Private Modules

private 항목은 의도치 않은 퍼블리싱을 방지한다.

```json
{
  "name" : "my-private-module",
  "version": "0.0.1",
  ...
  "private": true,
  ...
}
```

#### `-g` : 글로벌 설치는 언제 사용할까

CLI Tool(터미널에서 사용할 모듈)에서 사용할 경우에만 `-g`를 사용해 설치하자. 보통 `bin` 키값안에 적혀있다.

```json
{
  "name": "stream-adventure",
  "version": "4.0.4",
  "description": "an educational stream adventure",
  "bin": {
    "stream-adventure": "bin/cmd.js"
  },
  "dependencies": {
    ...
```

다시 강조하지만, `require()` 을 통해 import 하고자 하는 모듈은 반드시! 로컬에 설치하자.

### 3. npm 설정하기

npm 은 여러 방법으로 설정할 수 있다.

* flags
* environment variables(환경 변수들)
* `.npmrc` 파일들 (rc: run command)
* `npm config` CLI <= 가장 쉬운방법이다! 몇가지 예시를 통해 살펴보자.

현재 설정들을 나열(list) 하려면:

`$ npm config list`

`$ npm config ls`

글로벌 설정을 나열하려면:

`$ npm config --global list`

`$ npm config -g ls`

많은 설정들이 존재할 수 있다. 예를 들어 법인 프록시가 있거나, private(셀프 호스팅) npm 레지스트리(모듈저장소)가 있는 커다란 기업에서 일할경우 `proxy` 나 `registry` 설정을 사용하게 된다.

npm 설정을 하려면, `$ npm config set <key> <value>` 형태로 사용하면 된다. 레지스트리 값을 설정하려면,

```sh
$ npm config set registry "http://registry.npmjs.org/"
```

설정한 값들 각각을 터미널에서 확인 할 수 있다. (`get`)

```sh
$ npm config get registry
```

설정값을 삭제하려면, `delete` 명령어를 사용하면 된다. 가령 이메일을 지우려면,

```sh
$ npm config delete email
```

## IX. Summary of Module 1: Node Core

Node.js 에 대하 많은 기초지식을 배웠다! 몇가지 중요했던 키워드들을 모아보자.

* Node.js 인스톨러는 다양한 운영체제에 맞게 존재한다.
* Node.js 는 설치할 때 npm(Node Package Manager)을 함께 설치한다.
* Node 코드를 실행하는데는 3가지 방법이 있다. REPL, eval CLI, `.js` 파일 실행하기.
* `process.argv` : 실행할 때 넘어오는 인자들에 접근가능하다.
* `process.env` : 환경변수에 접근한다.
* Node 파일을 import / export하려면, `require()` 과 `module.exports` 를 사용한다.
* OS/플랫폼과 상관없이 동작하는 경로설정은, `path.join()` 을 사용해야 한다.
* HTTP 클라이언트와 서버를 구현하려면, `http` 모듈을 사용한다.
* 새로운 프로젝트를 시작하려면, `$ npm init` 을 통해 `package.json`을 생성하고 시작한다.
* 프로젝트에 npm 모듈을 로컬설치하려면, `$ npm i <package-name>` 을, 삭제하려면 `$ npm r <package-name>`을 적절히 사용한다.

## X. Course 1 Tutorial Lab: Node Web Crawler

이번 실습에서는, 지금까지 배운 스킬들을 사용해 웹 페이지를 다운로드하는 스크립트를 작성할 것이다. 

* 핵심 모듈
* CLI 인자
* Node script 실행하기
* npm 모듈 사용하기
* GET 요청 보내고 응답의 body 처리하기
* 폴더와 파일 만들기

### Node 웹 크롤러

실습 구현은, 다음과 같은 스텝으로 진행된다.

1. `downloaded-pages` 라는 이름의 프로젝트 디렉토리를 생성하고, `crawler.js` 파일을 생성한다.
2. `$ npm init` 을 사용해 `package.json` 을 생성한다.
3. 디렉토리 이름에 랜덤 타임스탬프 값을 사용하기 위해 `uuid` 모듈을 설치한다.
4. 주어진 URL 의 HTML 을 다운로드할 스크립트를 작성한다. URL 은 CLI 인자로 받는다.

시작하자!

---

우선 `$ mkdir` 명령어를 사용하여 디렉토리를 생성하고 안으로 이동하자.

```sh
$ mkdir page-downloader
$ cd page-downloader
```

`crawler.js` 파일을 `$ touch` 명령어로 생성하고 `$ npm init` 을 통해 `package.json`  파일 생성.

```sh
$ touch crawler.js
$ npm init -y
```

`uuid` 모듈을 설치 (Exact 옵션)

```sh
$ npm i uuid@3.1 -E
```

준비는 이걸로 끝이다. 이제 프로그램을 작성해보자. 우선 우리 js 파일은 대략 다음과 같은 큰 틀을 가지게 될 것이다.

```js
const http = require('http');
...

const downloadPage = (url='http://google.com') => {
    ...
};
    
downloadPage(process.argv[2]);
```

이제 실제 구현을 시작해 보자.

`crawler.js`

```js
const http = require('http');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');
```

이제 URL 을 받아서 HTML 을 다운로드하여 새로운 파일로 저장하는 함수를 생성해보자. 함수이름은 `downloadPage`이다. 함수내부는 대략 큰그림으로 다음과 같이 구성될 것이다.

```js
const downloadPage = (url='http://google.com') => {
    const fetchPage = (urlF, callback) => {
        ...
    };
    const folderName = uuidv1();
    fetchPage(url, (error, data) => {
        ...
        fs.writeFileSync(path.join(__dirname, folderName, 'file.html'), data);
        console.log('페이지를 폴더에 다운로드 했습니다.', folderName);
    });
};
```

디테일하게 작성해보자. 우선 CLI로 URL(`process.argv[2]`) 이 넘어오지 않았을 경우를 대비해,  `url` 의 기본값을 `google.com` 으로 설정해 두었다.

다음으로, `fetchPage()` 라는 함수를 만들고, 인자로 URL 과 callback 함수를 받아 GET 요청을 보내도록 한다. 응답으로 도착하는 페이지는, 콜백함수의 두번째 인자로 보내진다.

```js
const downloadPage = (url='http://google.com') => {
    console.log(`Downloading ${url}`);
    const fetchpage = (urlF, callback) => {
        http.get(urlF, res => {
            let buff = '';
            response.on('data', chunk => {
                buff += chunk;
            });
            response.on('end', () => {
                callback(null, buff);
            });
        }).on('error', error => {
            console.error(`Got error: ${error.message}`);
            callback(error);
        });
    };
}
```

`downloadPage` 함수는 아직 완성된것이 아니다. `uuid` 모듈을 사용해서 유니크한 디ㅣ렉토리 이름을 생성하고, `mkdirSync()` 함수를 사용해 실제로 디렉토리를 생성해야 한다.

마지막으로 정의한 `fetchPage` 함수를 콜백함수와 함께 실행한다. `url.txt` 와 `file.html` 파일을 생성하는 로직은 `fetchPage` 의 콜백함수 안에 작성되어야 하는데,`http.get()` 메서드가 *비동기(asynchronous)적으로 동작*하기 때문이다. `mkdirSync()` 와 `writeFileSync()` 메서드는 *동기적(synchronous)으로 동작*한다.

```js
const http = require('http');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

const downloadPage = (url='http://google.com') => {
  console.log(`Downloading ${url}`);
  const fetchPage = (urlF, callback) => {
    http.get(urlF, res => {
      let buff = '';
      res.on('data', chunk => {
        buff += chunk;
      });
      res.on('end', () => {
        callback(null, buff);
      });
    }).on('error', error => {
      console.error(`Got error: ${error.message}`);
      callback(error);
    });
  };

  const folderName = uuidv1();

  fetchPage(url, (error, data) => {
    if (error) return console.error(error);
    fs.mkdirSync(folderName);
    fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url);
    fs.writeFileSync(path.join(__dirname, folderName, 'file.html'), data);
    console.log(`페이지를 ${folderName} 폴더에 다운로드 했습니다`);
  });
};

downloadPage(process.argv[2]); 

```

완성이다! 이제 HTTP(HTTPS 는 안된다!) 프로토콜을 사용하는 웹 페이지를 다운로드 해보자.

```sh
$ node crawler.js http://www.csszengarden.com
$ node crawler.js 
```

URL 은 `url.txt` 파일에, 해당 URL 이 응답으로 전송하는 HTML 파일은 `file.html` 파일에 저장되어 있다!

## XI. Course 1 Assignment Lab: CSV => JSON 변환기

이번 과제에서는 CSV(Comma-Seperated Values) 파일을 JSON 파일로 변환하는 JS 프로그램을 만들어 보자. 이번에는 튜토리얼 랩과는 다르게 단계별로 모든 안내사항을 주지 않을것이다. 하지만 필요한 모든 내용은 이전 코스들에 있다! 스스로 해결해보자.

프로젝트 디렉토리 이름은 `csv-json-converter`, js 스크립트 이름은 `converter.js`다.

### Assignment Instruction

가상화폐(비트코인, 이더 등..) 거래소의 고객명단이 `customer-data.csv` 파일로 다음과 같이 있다.

```csv
id,first_name,last_name,email,gender,ip_address,ssn,credit_card,bitcoin,street_address
1,Ario,Noteyoung,anoteyoung0@nhs.uk,Male,99.5.160.227,509-86-9654,5602256742685208,179BsXQkUuC6NKYNsQkdmKQKbMBPmJtEHB,0227 Kropf Court
2,Minni,Endon,mendon1@netvibes.com,Female,213.62.229.103,765-11-9543,67613037902735554,135wbMcR98R6hqqWgEJXHZHcanQKGRPwE1,90 Sutteridge Way
3,Bartie,Burnard,bburnard2@indiatimes.com,Male,72.201.118.162,332-20-4678,564182465363840885,1Fkat6JVK1FqRuY77CLkeo31SQiBCXCda5,676 Myrtle Drive
...
```

`$ curl https://neovansoarer.github.io/files/customer-data.csv -O  ` 를 통해 `customer-data.csv` 를 프로젝트 디렉토리에 다운로드 하도록 하자.

이제 `converter.js` 파일을 실행하면 `customer-data.csv` 파일을 읽고, csv 파일을 아래와 같은 형식의 `customer-data.json` 파일로 변환하여 저장하면 된다.

```json
[
  {
    "id": "1",
    "first_name": "Ario",
    "last_name": "Noteyoung",
    "email": "anoteyoung0@nhs.uk",
    "gender": "Male",
    "ip_address": "99.5.160.227",
    "ssn": "509-86-9654",
    "credit_card": "5602256742685208",
    "bitcoin": "179BsXQkUuC6NKYNsQkdmKQKbMBPmJtEHB",
    "street_address": "0227 Kropf Court"
  },
  {
    "id": "2",
    "first_name": "Minni",
    "last_name": "Endon",
    "email": "mendon1@netvibes.com",
    "gender": "Female",
    "ip_address": "213.62.229.103",
    "ssn": "765-11-9543",
    "credit_card": "67613037902735554",
    "bitcoin": "135wbMcR98R6hqqWgEJXHZHcanQKGRPwE1",
    "street_address": "90 Sutteridge Way"
  },
  ...
]
```

Hint: 직접 csv 파일을 json 으로 변환하는 함수를 작성해도 좋고, npm 모듈을 검색해서 사용해도 좋다(ex: [csvtojson](https://npmjs.org/csvtojson)). 어떤것을 선택하던 상관은 없다. 필요한 정보를 찾고, 설치하고, 사용하는 법을 배우는 것도 개발자에게 반드시 필요한 소양이다.

---

과제를 완료하고, github 에 올리는것을 추천한다. `README.md` 도 작성하는것이 좋다. 추가로 다음 질문들에도 답을함께 작성하기를 권장한다.(`converter.js` 에 주석으로나 `README.md` 에 작성)

1. 프로젝트의 디자인을 소개해 주세요. 왜 이렇게 디자인 했나요? 어떤 어려운 부분들이 있었나요?
2. 해당 프로그램이 잘 동작하는지 어떻게 테스트 했나요?
3. 의도한데로 동작하지 않는 부분은 어디가 있나요?

## XII. Module 1 Test

### Q1. 다음중 node 코어 모듈인 것들은? (npm 으로 설치 하지 않는 모듈)

1. `fs`
2. `express`
3. `path`
4. `http`
5. `json`

### A1. 1,3,4



### Q2. 다음 코드에서 잘못된 곳은?

```js
const http = require('http');
const port = 3000;
http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('end');
}).listen(port);
```

* 잘못되지 않았다.
* response 가 끝나지 않았다.
* response 가 data를 가지고 있지 않다.
* 'Content-Type' 이 'text/html' 이어야 한다.
* port 가 80이어야 한다.

### A2 . `response.end()` 가 있어야한다.

---

### Q3. request 핸들러의 속성이 아닌 것 두가지는?(`(req, res) => {}`)

1. `req.headers`
2. `req.path`
3. `req.method`
4. `req.url`
5. `req.json`

### A3. 2, 5

---

### Q4. request 핸들러에서 HTTP 상태코드 200을 보내려면? (`(req, res) => {}`)

1. `res.status(200)`
2. `res.statusCode = 200; resonse.end()`
3. `res.end(200)`
4. `res.code(200)`
5. `res.writeStatusCode(200)`

### A4. 2

---

### Q5. npm 모듈을 로컬에 설치하는 명령어 3가지는?

1. `$ npm i -g express`
2. `$ npm install --production`
3. `$ npm install-local mocha`
4. `$ npm i --exact axios@latest --save-dev`
5. `$ npm install -ES superagent@3.6.3`

### A5. 2, 4, 5

---

### Q6. 다음중 모듈을 export 하는 올바른 방법은(4가지)?

1. 함수 Export: `module.exports = function(options) { ... }`
2. Object Export: `exports = { ... }`
3. 함수 여러개 Export: `module.exports.methodA = function(options){ ... }`/ `exports.methodA = function(options){ ... }`
4. 숫자 Export: `module.exports = 3000`
5. Object 여러개 Export: `module.exports.objA = { ... }` / `exports.objA = { ... }`

### A6. 1, 3, 4, 5

---

### Q7. 아래 코드에서 JSON 데이터를 받기위한 POST 요청중 잘못된것은?

```js
const https = require('https')
const url = 'https://gist.githubusercontent.com/azat-co/a3b93807d89fd5f98ba7829f0557e266/raw/43adc16c256ec52264c2d0bc0251369faf02a3e2/gistfile1.txt'
https.get(url, (response) => {
  let rawData = ''
  response.on('data', (chunk) => { 
    rawData = chunk 
  })
  response.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData)
      console.log(parsedData)
    } catch (e) {
      console.error(e.message)
    }
  })
}).on('error', (error) => {
  console.error(`Got error: ${error.message}`)
})
```

1. URL 이 유효하지 않다.
2. 받는 데이터가 완전하지 않다.
3. HTTPS 요청에 필요한 SSL(Secure Socket Layer) KEY 와 인증서가 없다.
4. `response.end()` 가 없다.
5. 에러 처리가 없다.

### A7. 2

---

### Q8. 전역변수(Node 프로그램 어디서든 사용 가능한 변수)인 것 2가지는? 

1. `process`
2. `env.NODE_ENV`
3. `argv`
4. `__dirname`
5. `__pathname`

### A8. 1, 4

---

### Q9. `TODO`를 실행하려면, 어떤 이벤트 핸들러/리스너를 구현해야 할까?

```js
// Fliename: job.js

const EventEmitter = require('events');
const sdk = require('magic-sdk');

class Job extends EventEmitter {
    constructor(options) {
        super(options);
        this.launch();
    }
    launch() {
        sdk.launchMagicJob((error, magicData) => {
            if (!error) return this.emit('finished', magicData);
            else this.emit('error', error);
        });
    }
}

module.exports = Job;
```

```js
const Job = require('./job.js')
const job = new Job()

// TODO: magic job magicData를 받아 console.log 하는 코드를 구현하라.
```

1. `job.on('finished', () => { console.log(magicData) })`
2. `job.on('finished', (details) => { console.log(data) })`
3. `job.on('done', (data) => { console.log(data) })`
4. `job.on('finished', (data) => { console.log(data) })`
5. `job.emit('finished', (data) => { console.log(data) })`

### A9. 4

---

### Q10. 출력데이터로 가능한 2가지는?

```js
const path = require('path');
console.log(path.join(__dirname, 'data', 'customers.csv'));
```

1. `data\customers.csv`
2. `data/customers.csv`
3. `/Users/neo/Documents/Code/data/customers.csv`
4. `file://data/customers.csv`
5. `C:\Documents\data\customers.csv`

### A10. 3, 5