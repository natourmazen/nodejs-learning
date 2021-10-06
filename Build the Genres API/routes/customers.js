const express = require('express');
const { boolean } = require('joi');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: Number,
        required: true,
        min: 4,
        max: 50
    }
  }));

router.get('/', async (req, res) => {
    res.send(await Customer.find());
});

router.post('/', async (req, res) => {
    let {error} = validateGenre( {
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

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: boolean
    });

    return schema.validate(customer);
}

module.exports = router;