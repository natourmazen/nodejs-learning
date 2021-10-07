const mongoose = require('mongoose');
const Joi = require('joi');

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

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: boolean
    });

    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;