var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MenuSchema = new Schema({
    name: String,
    quantity: Number,
    price: Number,
    type: String,
});

module.exports = MenuSchema;
