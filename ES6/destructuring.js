/* ES5 object */
var computer = {
  model: 'LG gram',
  year: 2017,
}

var model = computer.model;
var year = computer.year;

/* ES6 object */
const laptop = {
  model: 'Macbook Air',
  year: 2018,
}

// const { model } = laptop;
// const { year } = laptop;
// const { model, year } = laptop;

/* ES5 function */
var savedFile = {
  extension: 'jpg',
  name: 'profile',
  size: 29847
}

function fileSummary(file) {
  return `${file.name}.${file.extension} 의 크기는 ${file.size} 입니다.`
}

/* ES6 function */
const myFile = {
  extension: 'jpg',
  name: 'profile',
  size: 29847
};

function summary({ name, extension, size }) {
  return `${name}.${extension} 의 크기는 ${size} 입니다.`
}

summary(myFile);

/* ES6 Array */
const companies = [
  'Google',
  'IBM',
  'Amazon',
  'Apple'
];

let firstCompany = companies[0];
[ firstCompany ] = companies

const  { length } = companies;
console.log(length);

const [ one, ...rest ] = companies;
console.log(one);
console.log(rest);

/* Array & Object */
const wannaGo = [
  { name: 'Google', location: 'Mountain View' },
  { name: 'Facebook', location: 'Menlo Park' },
  { name: 'Apple', location: 'Cupertino' }
];

let [ company ] = wannaGo;
[{ location }] = wannaGo; // wannaGo[0].location

/* 실제 개발에서는? */
const points = [
  [7, 12],
  [-20, 3],
  [8, 0]
];

points.map(([ x, y ]) => {
  return { x, y };
})

function signup ({ username, password, email }) {
  // Create user
}
const user = {
  username: 'neo',
  password: '123123',
  email: 'neo@hphk.kr'
}

signup(user)

/* 실습 1 */
const profile = {
  title: 'Engineer',
  department: 'Blockchain'
};

function isEngineer({ title, department }) {
  // var title = profile.title;
  // var department = profile.department;
  return title === 'Enginner' && department === 'Blockchain';
}

/* 실습 2 */
const classes = [
  [ '실전 DApp' , '9am', 'Mr.john'],
  [ 'React', '1pm', 'neo'],
  [ 'Capstone', '3pm', 'multicampus' ]
]
// [{ subject: 'React', time: '1pm', teacher: 'neo' }, {}, {} ]
const classAsObject = classes.map(([ subject, time, teacher ]) => {
  return { subject, time, teacher };
})

