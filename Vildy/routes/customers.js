const express = require('express');
const { boolean } = require('joi');
const router = express.Router();
const { Customer, validateCustomer } = require('../models/customer');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    res.send(await Customer.find());
});


router.post('/', async (req, res) => {
    let {error} = validateCustomer( {
        'name': req.body.name, 
        'phone': req.body.phone,
        'isGold': req.body.isGold
    });
    if (error) return res.status(400).send(error.details[0].message);
    
    let customer = new Customer({ 
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    
    res.send(customer);
});

module.exports = router;