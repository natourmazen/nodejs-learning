const Joi = require('Joi');
const mongoose = require('mongoose');
const { customerSchema } = require('./customer');
const { movieSchema } = require('./movie');

const rentalSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    customer:  {
        type: customerSchema,
        require: true
    },
    movie: {
        type: movieSchema,
        require:true
    },
    dateOut: {
        type: Date,
        require: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental = new mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const Schema = Joi.object( {
       customerId: Joi.string().required(),
       movieId: Joi.string().required()  
    });

    return Schema.validate(rental);
}

exports.rentalSchema = rentalSchema;
exports.Rental = Rental;
exports.validateRental = validateRental;