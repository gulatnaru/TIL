const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hello-mongo', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(error => console.error(error.message));

// Available schema Datatypes 
  // String, Number, Date, Buffer, Boolean, ObjectID, Array
// Available Validatinog options
  // String: minlength, maxlength, match, enum
  // Numbers, Dates: min, max
  // All: reauired
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true , minlength: 2 },
  author: String,
  tags: {
    type: Array,
    // custom Valdator
    validate: {
      validator: function(tags) { 
        const result = tags.every(tag => tag.length > 0);
        return tags && tags.length > 0 && result;
      },
      message: 'A Course should have at least 1 tag'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

/* CRUD Operation */
  /* Create */
async function createCourse() {
  const course = new Course({
    name: 'aa',
    author: 'js',
    tags: ['a', 'b'],
    isPublished: true
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch(error) {
    console.error(error.message);
  }
}

createCourse();

/* Retrieve */
async function getCourses() {
  const courses = await Course
    .find()

  console.log(courses);
}
// getCourses();

/* Update */
// 1. Qurey First: find => change => save
async function updateCourse(id) {
  // Find
  const course = await Course.findById(id)
  // const course = await Course.find({ _id: '3424432432dsafdsds' })
  if(!course) return;

  // Change
  course.author = 'hphk-YEAH';
  course.tags = ['SDFSFD'];
  
  // Save
  const result = await course.save();
  console.log(result);
}

// updateCourse("5bea693dcc15484591576596");

// 2. Update First :직접 Update => result
async function updateCourses(id) {
  const result = await Course.updateMany({ isPublished: true }, {
    $set
  })
}

// updateCourses('5bea693dcc15484591576596');

/* Destroy */
async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  // const course = await Course.findOneAndDelete();
  console.log(result);

}

// removeCourse('5bea693dcc15484591576596');
