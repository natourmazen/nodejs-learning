const express = require('express');
const router = express.Router();
const { Movie, validateMovie } = require('../models/movie');
const mongoose = require('mongoose');
const { Genre } = require('../models/genre');


router.get('/', async (req, res) => {
    res.send(await Movie.find());
});

router.post('/', async (req, res) => {
    let {error} = validateMovie( {'title':req.body.title, 'genreId': req.body.genreId} );
    if (error) return res.status(400).send(error.details[0].message);
    
    let genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre');
    
    let movie = new Movie({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        genre: {
            genreId: genre._id,
            name: genre.name
        }
    });
    movie = await movie.save();
    
    res.send(movie);
});

module.exports = router;