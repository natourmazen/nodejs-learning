const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String, 
    tags: [ String ],
    date: Date, 
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('courses', courseSchema);


async function getCourses() {
    return await Course
        .find({ isPublished:true, tags: 'backend' })
        .sort({name: 1})
        .select({ name: 1, author: 1 });
}

