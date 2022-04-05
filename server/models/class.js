const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    id: {type: String, required: true},
    apsc: {type: String},
    name: {type: String},
    description: {type: String}
});

module.exports = mongoose.model('Class', classSchema);