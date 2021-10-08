const express = require('express');
const { rentalSchema, Rental, validateRental } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', async (req, res) => {
    res.send(await Rental.find());
});

router.post('/', async (req, res) => {
    let { error } = validateRental({
        customerId: req.body.customerId,
        movieId: req.body.movieId
    });
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customerId');

    let movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movieId');

    let rental = new Rental({
        _id: mongoose.Types.ObjectId(),
        customer: customer,
        movie: movie
    });

    rental = await rental.save();

    res.send(rental);
});

module.exports = router;