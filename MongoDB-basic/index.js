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

const course = new Course({
    name: '실전 DApp 빌드.',
    author: 'yang',
    tags: ['Ethereum', 'Blockchain', 'DApp'],
    isPublished: false
});

course.save()
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    });
