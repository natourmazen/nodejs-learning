const express = require('express');
const Joi = require('joi');

const app = new express();
app.use(express.json());

const genres = [ // Mock Data
    {id: 0, name:'Action'},
    {id: 1, name:'Comedy'},
    {id: 2, name:'Fiction'},
    {id: 3, name:'Horror'},
    {id: 4, name:'Mystery'},
    {id: 5, name:'Romance'}
];

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.post('/api/genres', (req, res) => {
    let {error} = validateGenre( {'name':req.body.name} );
    if (error) return res.status(400).send(error.details[0].message);
    
    let id = parseInt(genres[genres.length - 1].id) + 1;

    const genre = {
        id: id,
        name: req.body.name
    }

    genres.push(genre);
    res.send(genre);
});

app.get('/api/genres/:id', (req, res) => {
    let genre = genres.find( obj => obj.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The Genre with the given id was not found');

    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    let genre = genres.find( obj => obj.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The Genre with the given id was not found');

    let {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);

});

app.delete('/api/genres/:id', (req, res) => {
    let genre = genres.find( obj => obj.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The Genre with the given id was not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    
    res.send(genre);
});


function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().required()
    });

    return schema.validate(genre);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
