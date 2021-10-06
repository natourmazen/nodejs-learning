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
    const course = await Course
        .find({ isPublished:true })
        .or([
            { price: {$gte: 15} },
            { name: /.*by.*/i }
        ])
        .sort('-price')
        .select({ name: 1, author: 1, price: 1 });
    console.log(course);
}

getCourses();