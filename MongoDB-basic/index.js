const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hello-mongo', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error(error.message);
    });

// Available schema Datatypes: String, Number. Date, Buffer, Boolean, ObjectId, Array
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema); //model은 'Course' 이고 courseSchema 스키마를 따른다.

async function createCourse(){
    const course = new Course({
        name: '실전 DApp 빌드.',
        author: 'yang',
        tags: ['Ethereum', 'Blockchain', 'DApp'],
        isPublished: false
    });
    try{
        const result = course.save();
        console.log(result);
    } catch(error){
        console.error(error.message);
    }
}

async function getCourses(){
    const courses = await Course
    //  .find({ price: { $lt: 15, $gt: 10 }}) //11~14
    //  .find({ price: { $in: [10, 15]}}) //10~15
    // .find( { isPublished: true })
    // .limit(10)
    // .sort({ name: -1 })
    // .select({ name:1, tags:1 })
    .find({ author: /^ne/i })    //시작이 ne (i붙이면 대문자까지.)
    .find({ author: /hn$/ })    //끝이 hn
    .find({ author: /.*oh.*/})  //앞 뒤 상관없이 oh가 붙어있는 모든것 조회.
    .count()
    console.log(courses);
}

/* 비교 쿼리 연산자
    $eq: equal
    $neq: not equal
    $gt: greater than
    $gte: greater than or equal to
    $lt: less than
    $lte
    $ln
    $nin
*/
/* 논리 쿼리 연산자
    .or
        Course.find()
            .or([{ author: 'neo' }, { isPublished: false }])
    .and
        Course.find()
            .and()
getCourses();
*/


