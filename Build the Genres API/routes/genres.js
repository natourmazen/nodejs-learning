const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre');

router.get('/', async (req, res) => {
    res.send(await Genre.find());
});

router.post('/', async (req, res) => {
    let {error} = validate( {'name':req.body.name} );
    if (error) return res.status(400).send(error.details[0].message);
    
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    
    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The Genre with the given ID was not found');

    res.send(genre);
});

router.put('/:id', async (req, res) => {

    let {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!genre) return res.status(404).send('The Genre with the given id was not found');
    
    res.send(genre);

});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The Genre with the given ID was not found');

    res.send(genre);
});


module.exports = router;