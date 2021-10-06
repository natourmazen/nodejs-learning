const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));


const courseSchema = new mongoose.Schema({
    _id: String,
    name: String,
    author: String, 
    tags: [ String ],
    date: Date, 
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('courses', courseSchema);

// Update Document - Query First
async function updateCourse(id) {
    const course = await Course.findById(id)

    if (!course) return;
    course.isPublished = true;
    course.author = 'Another Author';

    const result = await course.save();

    console.log(result)

}

// Update Document - Update First
async function updateCourse2(id) {
    return await Course.update({ _id: id },{
        $set: {
            author: 'New Author'
        }
    }, {new: true});

}

// Delete Course
async function deleteCourse(id) {
    return await Course.deleteOne({ _id:id });
}


