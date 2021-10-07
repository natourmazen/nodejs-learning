const express = require('express');
const { boolean } = require('joi');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

router.get('/', async (req, res) => {
    res.send(await Customer.find());
});

router.post('/', async (req, res) => {
    let {error} = validate( {
        'name': req.body.name, 
        'phone': req.body.phone,
        'isGold': req.body.isGold
    } );
    if (error) return res.status(400).send(error.details[0].message);
    
    let genre = new Genre({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    genre = await genre.save();
    
    res.send(genre);
});



module.exports = router;