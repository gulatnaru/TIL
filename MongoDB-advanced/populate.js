const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/relation', { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.error(error.message));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    required: true,
  },
  github: String,
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(name, github) {
  const author = new Author({ name, github });
  try{ 
    const result = await author.save() 
    console.log(result);
  } catch(error) {
    console.error(error.messgae)
  };
}

async function createCourse(name, author) {
  try {
    const course = new Course({ name, author });
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

// const id = mongoose.Types.ObjectId('5beb8b5c26566471e51d1931')
// createCourse('React', '5beb8b5c26566471e51d1931');

async function listCourses() {
  const courses = await Course
    .find()
    .populate('author')
    .select('name');
  console.log(courses);
}
listCourses();