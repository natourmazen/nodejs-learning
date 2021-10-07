const { func } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/test')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(() => console.log('Could not connect to MongoDB...'));

const personSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Person' },
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

const author = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: 'Second Person',
    age: 50
});

async function createPerson(name, age) {
    const author = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        age: age
    });
    return await author.save();
}

createPerson('Mazen', 21);

async function createStory(title, author) {
    let person = await author;
    const story = new Story({
        title: title,
        author: person._id
    });

    return await story.save();
}

async function getAuthorByName(name) {
    return await Person.findOne({ name: name }); 
}

async function getStoryByTitle(name) {
    return await Story.findOne({ title: name }); 
}

async function print(ref) {
    let object = await ref;
    console.log(object);
}

print(getStoryByTitle('Hello'))

// createStory('Hello', getAuthorByName('Mazen'));
