const mongoose = require('mongoose');

const FootballerSchema = new mongoose.Schema({
    Surname: { type: String, required: true },
    Age: { type: Number, required: true, min: 10, max: 120},
    Position: { type: String, required: true },
    Club: { type: String, required: true },
    Goals: { type: Number, required: true, min: 0 },
    Assists: { type: Number, required: true, min: 0},
    Height: { type: Number, required: true, min: 120, max: 250},
    createdBy: { type: String, required: false }
});

module.exports = mongoose.model('Footballer', FootballerSchema);
