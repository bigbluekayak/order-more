const Joi = require('joi');
const db = require('./connection');

const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    telephone: Joi.string(),
    address: Joi.string().required(),
    town: Joi.string().required()
});

const orders = db.get('orders');

function getAll() {
    return orders.find();
}

function create(order) {
    const result = Joi.validate(order, schema);
    if(result.error == null) {
        return orders.insert(order);
    } else {
        return Promise.reject(result.error);
    }
}

module.exports = {
    create,
    getAll
}