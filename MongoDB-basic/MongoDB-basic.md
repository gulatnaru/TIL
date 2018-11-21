# CRUD Operations Using MongoDB

## MongoDB 소개

```js
const users = [
  { id: 1, name: 'neo' },
  { id: 2, name: 'john' }
]
```

 현재는 Data 를 메모리 위에서 두고 돌리고 있지만, 영구적으로 저장되지 않는다. 서버를 on/off 하면 다 사라진다. DB 를 사용하자. 사용할 수 있는 수많은 DB 가 있지만, 우리는 MongoDB 를 사용할 것이다.

MongoDB 는 Document DB 다. 기존의 RDBMS 와 다르게 NoSQL 이라고 불린다. 단순히 JSON 을 저장할 뿐이다. 실제로 받아오는것도 JSON 일 뿐이다.

# MongoDB 설치

### Windows

https://mongodb.com : windows => 다운로드 msi => complete => Install MongoDB compass

`C:\Program Files\MongoDB\<Version>\bin\mongod`

Windows : View advanced system settings

ENV Var => Path - edit - new => `C:\Program Files\MongoDB\<Version>\bin`

prompt => `mongod`

`md c:\data\db`

### Mac

```sh
$ brew install mongodb
```

MongoDB 는 기본적으로 `/data/db` 에 데이터를 저장한다. 만들자. 

```sh
$ sudo mkdir -p /data/db
$ sudo chown -R `id -un` /data/db
$ mongod 
```

* 직접설치: https://www.mongodb.com/download-center?jmp=nave#compass

* brew cask 설치

  ```sh
  $ brew cask install mongodb-compass
  ```

## MongoDB 연결하기

```sh
$ mkdir MongoDB-basic
$ cd MongoDB-basic
$ npm init -y
$ npm i mongoose
$ touch index.js
```

`/MongoDB-basic/index.js`

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground');
```

Mongoose 라는 ODM 을 통해 연결해야 한다. 이전에 환경변수와 관련된 설정을 다뤘었다. 현재는 개발환경이지만, 실제 배포환경에서는 다른 PORT 및 설정을 적용해야 한다. 이번 섹션에서는 단순함을 위해서 하드코딩 할것이지만 실제로는 이렇게 사용해서는 안된다!

현재 `mongo-basic` 라는 DB 가 없지만, MongoDB 가 알아서 만들어 줄 것이기 때문에 신경쓰지 않아도 된다.

이 `.connect` 는 promise 를 리턴하므로, `.then`, `.catch`

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error.message));
```

지금은 `console.log` 를 사용하지만, 실제로는 `debug` 모듈을 활용해야한다. 이번 단계에서는 순전히 MongoDB 에 집중하기 위해 이렇게 진행한다. 이후에 설정을 스스로 바꿔보자.

```sh
$ mongod
# --- new tab ---
$ node index.js
Connected to MongoDB
```

## Schemas

스키마를 통해 도큐먼트의 모습을 미리 정의해 보자. MongoDB 에는 없는 기능이지만, mongoose 에 있는 기능이다. 

RDBMS 에서는 Table / Row 가 있다면, MongoDB 에서는 Collection / Documents 가 있다.

우리는 `courses` 라는 Collection 안에 Document 들을 추가해 나갈 것이고, 스키마는 Document 의 모양을 정의하는 것이다.

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error.message));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now }, // 타입 뿐만 아니라, 자동으로 생성되는 값도 설정했다.
  isPublished: Boolean,
});
```

`mongoose.Schema` 에서 사용 가능한 데이터 타입들

| Type       | Description            |
| ---------- | ---------------------- |
| `String`   | 문자열                 |
| `Number`   | 숫자                   |
| `Date`     | 날짜                   |
| `Buffer`   | 이진데이터(BinaryData) |
| `Boolean`  | true/false             |
| `ObjectID` | Unique ID (PK 개념)    |
| `Array`    | 배열                   |

## Models

정의한 Course 스키마를 기반으로 모델을 만들어(Compile) 보자.

Model이 뭐지? Class / instance(object) 의 관계로 생각 가능하다. 

| Class   | Object     | Model     | Object          |
| ------- | ---------- | --------- | --------------- |
| `Human` | `taeYoung` | `Courses` | `expressCourse` |

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error.message));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now }, // 타입 뿐만 아니라, 자동으로 생성되는 값도 설정했다.
  isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);
```

mongoose 를 통해 `model` "Course" 라는 모델을 `courseSchema` 기반으로 생성했다. 이제 instance 를 만들면 된다.

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error.message));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now }, // 타입 뿐만 아니라, 자동으로 생성되는 값도 설정했다.
  isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);
```

RDBMS 였다면, `tags` 를 사용하기 위해 M:N 관계를 설정해야 하고, 3개의 테이블(courses, join-table, tags) 이 필요했을 것이다. 하지만 mongoDB(NoSQL) 에서는 그저 json을 저장하듯이 저장할 수있다. 이것때문에 mongoDB 가 Schema-less 라고 불리운다. 이제 실제 document(data-row) 를 생성해보자.

```js
...
const Course = mongoose.model('Course', courseSchema);
const course = new Course({
  name: 'Express API 과정',
  author: 'Neo',
  tags: ['nodeJS', 'express', 'mongodb'],
  // date: default,
  isPublished: true,
});
```

`date` 는 `default` 값을 사용할 것이기 때문에 설정하지 않는다.

## Saving a Document (Create)

이제 document 를 실제 Collection(Table) 에 저장해보자.

```js
...
const Course = mongoose.model('Course', courseSchema);
const course = new Course({
  name: 'Express API 과정',
  author: 'Neo',
  tags: ['nodeJS', 'express', 'mongodb'],
  // date: default,
  isPublished: true,
});

course.save();
```

`course.save()` 의 return 값은 무엇일까? 당연히 추가로 시간이 걸리지만 non-blocking 해야 하기 때문에 비동기 작업일 것이다. 실제로 promise 를 리턴한다.

```js
...
const Course = mongoose.model('Course', courseSchema);
const course = new Course({
  name: 'Express API 과정',
  author: 'Neo',
  tags: ['nodeJS', 'express', 'mongodb'],
  // date: default,
  isPublished: true,
});

/* CRUD operations */

course.save().then(result => console.log(result));
```

이렇게 사용할 수도 있지만, 이 일련의 저장 작업을 함수로 만들고 `async`/`await`를 사용해보도록 하자.

```js
...
/* CRUD operations */
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Express API 과정',
    author: 'Neo',
    tags: ['nodeJS', 'express', 'mongodb', 'backend'],
    // date: default,
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

createCourse();
```

`$ nodemon` 으로 켜면? 코드 고칠때마다 저장..

```sh
$ node index.js
Connected to MongoDB..
{ tags: [ 'nodeJS', 'express', 'mongodb', 'backend' ],
  _id: 5be7f86873bd2302a1b673fa,
  name: 'Express API 과정',
  author: 'Neo',
  isPublished: true,
  date: 2018-11-11T09:37:44.855Z,
  __v: 0 }
  
$ 
```

MongoDB Compass 에서 확인해보자.

이것이 NoSQL 의 멋짐이다..! 테이블 생성? 관계설정? PK? FK? nono

새로운 도큐먼트를 추가로 생성해보자. 

```js
...
const course = new Course({
    name: 'Express API 과정',
    author: 'Neo',
    tags: ['react', 'redux', 'frontend'],
    // date: default,
    isPublished: false,
  });
...
```

## Querying Documents (Retrieve)

이번에는 데이터를 불러와 보자. course 의 생성을 바라지는 않으므로 주석처리하자.

```js
...
/* CRUD operations */
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'React 과정',
    author: 'Neo',
    tags: ['react', 'redux', 'frontend'],
    // date: default,
    isPublished: false,
  });

  const result = await course.save();
  console.log(result);
}
// createCourse();

async function getCourses() {
  const courses = await Course.find(); // Document Query method(like promise)
  console.log(courses);
}

getCourses();
```

`Course.find()` 는 전체를 가져온다. 때문에 모든 `course` 가 출력된다. 이번에는 필터링을 해보자.

```js
...
async function getCourses() {
  const courses = await Course
  	.find({ isPublished: true });
  console.log(courses);
}

getCourses();
```

`.find({ key: value })` 를 사용하면 해당 조건을 만족하는 document 들만 가져온다. 

필터링도 가능하다. 

```js
...
async function getCourses() {
  const courses = await Course
    .find({ isPublished: true })
    .limit(10) // 10개만
    .sort({ name: -1 }) // 1은 오름차순, -1 은 내림차순
  	.select({ name: 1, tags: 1 }); // id 는 자동
  console.log(courses);
}

getCourses();
```

### Comparison Query Operators

더 복잡한 query(질의문)들을 알아보자. MongoDB 에는 다양한 비교 연산자가 있다. mongoose 가 mongoDB 드라이버 위에 설치되어 있기 때문에, 이 mongoDB 연산자들도 당연히 mongoose 를 통해 사용 가능하다.

만약 우리 course 에 가격이 있는 유료강의라고 했을 때, 가격이 10인 강의를 필터링하는 방법은 다음과 같다.

```js
const courses = await Course
    .find({ price: 10 }) ;
```

하지만 만약 가격이 10 보다 큰(초과) 강의들을 모두 가지고 오고 싶다면? 기본적으로 object 는 key-value 짝이기 때문에 이런 비교 연산이 불가능하다. 하지만? mongoDB 에서 제공하는 비교연산자들을 사용하면 가능하다! 사용가능한 연산자들은 대략 다음과 같다.

| 의미                            | operator | in js |
| ------------------------------- | -------- | ----- |
| 같다 - equal                    | `$eq`    | `==`  |
| 같지 않다 - not equal           | `$neq`   | `!=`  |
| 초과 - greater than             | `$gt`    | `>`   |
| 이상 - greater than or equal to | `$gte`   | `>=`  |
| 미만 - less than                | `$lt`    | `<`   |
| 이하 - less than or equal to    | `$lte`   | `<=`  |
| 포함한다 - in                   | `$in`    |       |
| 포함하지 않는다 - not in        | `$nin`   |       |

이것들을 사용하여 작성하면 가격이 10 초과 인 강의들을 필터링 할 수있다.

```js
  .find({ price: { $gt: 10 } })
```

`10 < course.price < 20` 은? 

```js
	.find({ price: { $gt: 10, $lt: 20 } })
```

정확하게 가격이 `10`, `15`, `20` 인 것들만 가져오려면?

```js
  .find({ price: { $in: [10, 15, 20] } })
```

### Logical Query Operators

이번엔 논리 연산자다. `||` , `&&` 는 어떻게 표현해야 할까?

| 의미         | method | In js |
| ------------ | ------ | ----- |
| 그리고 - and | `.and` | `&&`  |
| 아니면 - or  | `.or`  | `||`  |

```js
	.find()
	.or([{ author: 'Neo' }, { isPublished: false }])
```

```js
	.find()
	.and([{ author: 'Neo' }, { isPublished: true }])
```

`.and` 는 `.find({ author: 'Neo', isPublished: true })` 와 같아보이지만, 추후 복잡한 쿼리를 날리게 될 경우 사용하게 된다.

### REGEX

`.find({ author: 'Neo' })` 는 정확하게 author 가 Neo 인 사람을 가져온다. 하지만 만약 author 가 neo, neovansoarer, neov, neoueh0 처럼 'neo-' 로 시작하는 모든 author 들을 가져오고 싶다면? 이런 string 관련해서는 정규표현식만큼 강력한게 없다!

```js
	.find({ author: /^neo/ })
```

`/<pattern>/` 로 정규표현식을 사용할 수 있으며, 추가 패턴은 직접 찾아보자 ([JS regex](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/%EC%A0%95%EA%B7%9C%EC%8B%9D))

위의 `^` 은 정규표현식에서 starts with 를 의미한다.

```js
	.find({ author: /young$/i })
```

`&` 는 문자열 `young` 로 끝나는 문자열을 의미하며 `/` 뒤의 `i` 는 case-insensitive(대소문자 구분 없음)을 의미한다.

```js
	.find({ author: /.*tae.*/})
```

`.*` 는 0 or more characters 를 의미한다. 앞 뒤로 문자열이 있건 없건 `tae` 가 있으면 된다.  

### Counting

쿼리에 따른 return document 들의 갯수가 궁금할 때는 마지막에 `.count()` 를 붙인다.

```js
const courses = await Course
	.find()
	.count() // 2
```

### Pagination

`.limit` 을 통해 갯수를 제한할 수 있었다. `.skip` 을 사용하면 페이지네이션이 가능하다. [example](https://www.samyangfoods.com/kor/community/story/list.do?seq=&pageIndex=2&pageUnit=20&searchCondition=&searchKeyword=)

```js
async function getCourses() {
	// const pageNumber = req.query.pageNumber
  // const pageSize = req.query.pageSize
	// const { pageNumber, pageSize } = req.query
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course
    .find()
  	.skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  console.log(courses);
}
```

## Exercises

```sh
$ mkdir exercise1
$ mongoimport --db exercise1 --collection courses --drop --file data.json --jsonArray
```

* exercise 1
    1. publish 된 course 들 중에서 backend 코스인 것들을,
    2. 이름 오름차순으로 정렬하고,
    3. name 과 author 만을,
    4. 출력해보자구!

* exercise 2
    1. publish 된 course 들 중에서 backend 와 frontend 모두를,
    2. price 내림차순으로,
    3. name 과 price 만,
    4. 출력해보자구!

* exercise 3
    1. 모든 course 들 중에서
    2. price 15 이상이거나,
    3. name 에 대소문자 구분없이 'js' 가 들어간 강의들을,
    4. 출력해보자구!

### Solutions

* exercise1

  ```js
  const mongoose = require('mongoose');
  
  mongoose.connect('mongodb://localhost/exercise-basic', { useNewUrlParser: true })
    .then(() => console.log('DB connected'))
    .catch(error => console.error(error.message));
  
  const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now() },
    isPublished: Boolean,
    price: Number,
  });
  
  const Course = mongoose.model('Course', courseSchema);
  
  async function getCoursesWithGivenCondition() {
    return await Course
      .find({ isPublished: true, tags: 'backend' })
      .sort({ name: 1 })
      .select({ name: 1, author: 1 });
  }
  
  async function run() {
    const courses = await getCoursesWithGivenCondition();
    console.log(courses);
  }
  
  run();
  
  // console.log(getCoursesWithGivenCondition()); XX
  // getCoursesWithGivenCondition().then(courses => console.log(courses));
  ```

* exercise2

  ```js
  ...
  async function getCoursesWithGivenCondition() {
    return await Course
      // .find({ isPublished: true, tags: { $in: ['frontend', 'backend']  } }) // tags: ['frontend', 'backend'] 둘다 가진놈민!
      .find({ isPublished: true })
      .or([{ tags: 'frontend' }, { tags: 'backend' }])
      .sort('-price')
      .select('name price');
  }
  
  getCoursesWithGivenCondition().then(courses => console.log(courses));
  ```

* exercise3

  ```js
  ...
  async function getCoursesWithGivenCondition() {
    return await Course
      // .find({ isPublished: true, tags: { $in: ['frontend', 'backend']  } }) // tags: ['frontend', 'backend'] 둘다 가진놈민!
      .find()
      .or([
        { price: {$gte: 15 } },
        { name: /.*js.*/i}
      ])
      .select('name price')
  }
  
  getCoursesWithGivenCondition().then(courses => console.log(courses));
  ```

## Updating Documents

조회는 신나게 해 봤으니 이제 update 해보자!

Update 에는 두가지 패턴이 있다. 

* Query First
  1. ` findByID()`
  2. 수정
  3. 저장
* Update First
  1. 직접 수정
  2. Update 된 document 가져오기.

### Query First

가장 흔하게 보는 방식이다. 사용자로부터 입력을 받고, 해당 값의 유효성을 검사하고 싶다면 이 방법을 사용하는 것이 좋다.

```js
...
async function updateCourse(id) {
	const course = await Course.findById(id); // 찾기
  if(!course) return;
  
  // 수정
  course.isPublished = true;
  course.author = 'Another Author';
  
  // 저장
	const result = await course.save;
}

updateCourse();
```

`.set()` 로 도 가능!

```js
...
async function updateCourse1(id) {
	const course = await Course.findById(id); // 찾기
  if(!course) return;
  
  // 수정
  course.set({
    isPublished: true,
    author: 'Anoter Author',
  })
  
  // 저장
	const result = await course.save; // Course instance
}

updateCourse1('<ObjectID>');
```

### Update First

위와 다르게, 유효성 검사를 할 필요가 없고, 그저 도큐먼트를 수정하고 싶다거나, 여러개의 도큐먼트를 한번에 수정하고 싶다면? 가령 모든 강의를 `isPublished: false` 로 만들고 싶다면?

https://docs.mongodb.com/manual/reference/operator/update/

```js
Model.update({ key: value }, { // key 가 value 인 모든 object 들
  $<OPERATOR>: <Value>
}) // object 가 아닌 결과를 return 한다.
```

가령 Facebook 같은경우, 좋아요를 받으면 좋아요를 하나 올리는(`$inc`) 기능이 필요하다! 굳이 하나의 게시물을 찾아서 바꾸고 저장하는 식의 작업은 번거롭다.

하나만 바꿀 때

```js
...
async function updateCourse2(id) {
  const result = await Course.updateOne({ _id: id }, {
    $set: {
    author: 'tak',
      isPublished: false
    }
  });
  console.log(result); // 처리 결과
}

updateCourse2('<ObjectID>');
```

여러개 바꿀 때

```js
...
async function updateCourse2() {
  const result = await Course.updateMany({ isPublished: true }, {
    $set: {
    	author: 'tak',
      isPublished: false
    }
  });
  console.log(result); // 처리 결과
}

updateCourse2('<ObjectID>');
```

처리 결과가 아니라 Course object 를 받고 싶을 때.(Before update)

```js
...
async function updateCourse3(id) {
  // 변수명 course
  const course = await Course.findByIdAndUpdate(id, { 
    $set: {
    	author: 'neo',
      isPublished: true
    }
  });
  console.log(result); // Course object !before update
}

updateCourse2('<ObjectID>');
```

처리 결과가 아니라 Course object 를 받고 싶을 때.(after update)

```js
...
async function updateCourse3(id) {
  // 변수명 course
  const course = await Course.findByIdAndUpdate(id, { 
    $set: {
    	author: 'neo',
      isPublished: true
    }
  }, { new: true });
  console.log(result); // Course object !after update
}

updateCourse2('<ObjectID>');
```



## Removing Documents

```js
...
async function deleteCourse(id) {
  const result = await Course.deleteOne({ _id: id })
  console.log(result);
}
deleteCourse('5beabe00e2368650e12f7430');
```

결과를 출력한다. 삭제한 object 를 받고싶다면

```js
...
async function deleteCourse(id) {
  const course = await Course.findByIdAndDelete(id)
  console.log(course);
}
deleteCourse('5beabe00e2368650e12f7430');
```