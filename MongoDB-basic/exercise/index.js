const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/exercise-basic', { useNewUrlParser: true })
  .then(() => console.log('Exercise TIME!٩(ᐛ)و'))
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

async function getEx1(){
  const courses = await Course
    .find({ isPublished: true, tags: 'backend' }) // publish 된 course 들 중에서 backend 코스인 것들을,
    .sort({ name: 1 }) // 이름 오름차순으로 정렬하고,
    .select({ name: 1, author: 1 }) // name 과 author 만을,

  console.log(courses) // 출력!
}

async function getEx2(){
  const courses = await Course
    .find({ isPublished: true }) // publish 된 course 들 중에서
    .or([{ tags: 'frontend' }, { tags: 'backend' }]) // backend 와 frontend 모두를
    .sort('-price') // price 내림차순으로,
    .select('name price') // name 과 price 만

  console.log(courses); // 출력!
}

async function getEx3(){
  const courses = await Course
  .find()// 모든 course 들 중에서
  .or([
    { price: { $gte: 15 } }, // price 15 이상이거나,
    { name: /.*js.*/i }, // name 에 대소문자 구분없이 'js' 가 들어간 강의들을,
  ])

  console.log(courses)// 출력해보자구!
}

getEx1();
getEx2();
getEx3();