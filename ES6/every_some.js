/* ES5 for() */
var computers = [
  { name: "macbook-air", ram: 16 },
  { name: "gram", ram: 8 },
  { name: "series9", ram: 32 }
];

var everyComputersAvailable = true;
var someComputersAvailable = false;

for (var i = 0; i < computers.length; i++) {
  var computer = computers[i];

  if (computer.ram < 16) {
    everyComputersAvailable = false;
  } else {
    someComputersAvailable = true;
  }
}

/* ES6 every & some */

// (computers[0] > 16) && (computers[1] > 16) && (computers[2] > 16)
var everyLaptopAvailable = computers.every(function(computer) {
  return computer.ram > 16;
});

// (computers[0] > 16) || (computers[1] > 16) || (computers[2] > 16)
var someLaptopAvailable = computers.some(function(computer) {
  return computer.ram > 16;
});

var names = ["alex", "bill", "chris"];

names.every(function(name) {
  return name.length > 4;
}); // false

names.some(function(name) {
  return name.length > 4;
}); // true

/* 실제로는? */

function Input(value) {
  this.value = value;
}

// prototype 은 지금당장 몰라도 상관없다. 사용자 입력값(Input)에 대해 입력값이 있는지에 대한 유효성검사(validation)를 한다고 생각하자.
Input.prototype.validate = function() {
  return this.value.length > 0;
};

var username = new Input("");
username.validate(); // false

username = new Input("neo");
username.validate(); // true

// 이런식으로 특정 입력값에 대하여 유효성 검사를 진행할 수 있다.
// 하지만 만약 입력값이 아주 많고, 모두 유효성 검사를 해야한다면?
var password = new Input("123123");
var email = new Input("neo@hphk.kr");
var address = new Input("Seoul Korea");
var birthday = new Input("12, Jul");

// 1. 모두 && 로 검사한다.
if (
  username.validate &&
  password.validate &&
  email.validate &&
  address.validate &&
  birthday.validate
) {
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

/* 실습 1 */
var users = [
  { id: 21, submit: true },
  { id: 33, submit: false },
  { id: 712, submit: true }
];

var allSubmitted = users.every(function(user) {
  return user.submit;
});

/* 실습 2 */
// 하나라도 status 중에 pending 이 하나라도 있으면, inProgress = true
var requests = [
  { url: "/photos", status: "complete" },
  { url: "/albums", status: "pending" },
  { url: "/users", status: "failed" }
];

var inProgress = requests.some(function(req) {
  return req.status === "pending";
});
